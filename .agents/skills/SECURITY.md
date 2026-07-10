# Security Guide — NusaTrade Connect
## Kebijakan Keamanan untuk Platform E-Katalog Ekspor B2B

**Scope:** End-to-end security dari frontend hingga infrastructure
**Compliance:** UU PDP Indonesia, Regulasi BI (QRIS), Best Practices OWASP Top 10
**Last Updated:** Juli 2026

---

## 1. Security Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                                    │
│  Next.js Frontend                                                       │
│  ├─ HTTPS only (TLS 1.2+ enforced)                                     │
│  ├─ CSP headers                                                         │
│  ├─ Input validation (Zod — client-side UX)                             │
│  ├─ DOMPurify (HTML sanitization)                                       │
│  ├─ No secrets/API keys in frontend code                                │
│  └─ httpOnly cookies for auth tokens                                    │
└─────────────────────────────┬───────────────────────────────────────────┘
                              │ HTTPS
┌─────────────────────────────▼───────────────────────────────────────────┐
│                      API GATEWAY LAYER                                  │
│  NestJS System Service                                                  │
│  ├─ JWT Authentication (access + refresh token)                         │
│  ├─ RBAC Authorization (seller, buyer, ppjk_partner, admin)             │
│  ├─ Rate limiting (@nestjs/throttler)                                   │
│  ├─ Input validation (class-validator — server-side enforcement)        │
│  ├─ CORS (whitelist frontend origin only)                               │
│  ├─ Helmet (security headers)                                           │
│  ├─ Request logging + audit trail                                       │
│  └─ File upload validation (type, size, virus scan)                     │
└─────────────────────────────┬───────────────────────────────────────────┘
                              │ HTTP (internal network)
┌─────────────────────────────▼───────────────────────────────────────────┐
│                      AI SERVICE LAYER                                   │
│  FastAPI AI Service                                                     │
│  ├─ Internal API key authentication (X-Internal-API-Key)                │
│  ├─ NOT exposed to public internet                                      │
│  ├─ Input validation (Pydantic v2)                                      │
│  ├─ Rate limiting per-operation                                         │
│  └─ No user data persistence (stateless processing)                     │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                      DATA LAYER                                         │
│  PostgreSQL (Supabase)                                                  │
│  ├─ Row-Level Security (RLS) where applicable                           │
│  ├─ Encrypted at rest (AES-256)                                         │
│  ├─ Connection via SSL                                                  │
│  ├─ Separate DB roles per service (system_service, ai_service_readonly) │
│  └─ Automated backups (daily)                                           │
│                                                                         │
│  Redis                                                                  │
│  ├─ Password protected                                                  │
│  ├─ No persistence of sensitive data                                    │
│  └─ TTL on all cached data                                              │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Authentication

### 2.1 JWT Strategy

```
┌──────────────┐                    ┌──────────────┐
│   Frontend   │ ── POST /login ──→ │   NestJS     │
│              │ ←── Set Cookies ── │              │
│              │                    │  Verify creds │
│              │                    │  Generate:    │
│              │                    │   - Access    │
│              │                    │     Token     │
│              │                    │   - Refresh   │
│              │                    │     Token     │
└──────────────┘                    └──────────────┘
```

| Token | Tipe | Durasi | Storage | Purpose |
|---|---|---|---|---|
| **Access Token** | JWT | 15 menit | httpOnly cookie / Authorization header | Authenticate API requests |
| **Refresh Token** | Opaque string | 7 hari | httpOnly cookie + DB | Generate new access token |

### 2.2 Token Configuration

```typescript
// JWT Access Token payload
interface JwtPayload {
  sub: string;        // User ID
  email: string;
  role: UserRole;     // SELLER | BUYER | PPJK_PARTNER | ADMIN
  iat: number;        // Issued at
  exp: number;        // Expiry
}

// ❌ JANGAN masukkan di JWT payload:
// - NIB
// - Password hash
// - Rekening bank
// - Data pribadi lengkap
```

### 2.3 Password Policy

```typescript
// Minimum requirements:
const PASSWORD_RULES = {
  minLength: 8,
  maxLength: 128,
  requireUppercase: true,    // Minimal 1 huruf besar
  requireLowercase: true,    // Minimal 1 huruf kecil
  requireNumber: true,       // Minimal 1 angka
  requireSpecial: false,     // Tidak wajib karena target UMKM — jangan persulit
};

// Hashing: bcrypt with salt rounds 12
import * as bcrypt from 'bcrypt';
const SALT_ROUNDS = 12;
const hash = await bcrypt.hash(password, SALT_ROUNDS);
```

### 2.4 Refresh Token Rotation

```typescript
// Setiap kali refresh token dipakai:
// 1. Invalidate refresh token lama
// 2. Generate access token baru
// 3. Generate refresh token baru
// 4. Simpan refresh token baru di DB

// Ini mencegah:
// - Replay attack (token lama tidak bisa dipakai ulang)
// - Session hijacking (jika token dicuri, rotasi memutus akses)

// Endpoint: POST /auth/refresh
async refreshTokens(oldRefreshToken: string): Promise<TokenPair> {
  const storedToken = await this.prisma.refreshToken.findUnique({
    where: { token: oldRefreshToken },
    include: { user: true },
  });

  if (!storedToken || storedToken.expiresAt < new Date()) {
    throw new UnauthorizedException('Invalid or expired refresh token');
  }

  // Delete old token
  await this.prisma.refreshToken.delete({ where: { id: storedToken.id } });

  // Generate new pair
  const newAccessToken = this.jwtService.sign({ sub: storedToken.user.id, ... });
  const newRefreshToken = randomBytes(64).toString('hex');

  // Store new refresh token
  await this.prisma.refreshToken.create({
    data: {
      token: newRefreshToken,
      userId: storedToken.user.id,
      expiresAt: addDays(new Date(), 7),
    },
  });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
}
```

---

## 3. Authorization (RBAC)

### 3.1 Role Definitions

| Role | Akses |
|---|---|
| `SELLER` | Kelola toko, produk, chat, lihat pembayaran sendiri, lihat PPJK |
| `BUYER` | Browse katalog, chat, bayar invoice |
| `PPJK_PARTNER` | Kelola profil PPJK, lihat leads |
| `ADMIN` | Semua akses + user management + audit log |

### 3.2 Endpoint Protection Matrix

```
Legend: ● = allowed, ○ = forbidden

Endpoint                    │ Public │ SELLER │ BUYER │ PPJK │ ADMIN
────────────────────────────┼────────┼────────┼───────┼──────┼──────
GET  /catalog/products      │   ●    │   ●    │   ●   │  ●   │  ●
POST /catalog/products      │   ○    │   ●    │   ○   │  ○   │  ●
PUT  /catalog/products/:id  │   ○    │   ●*   │   ○   │  ○   │  ●
GET  /chat/conversations    │   ○    │   ●    │   ●   │  ○   │  ●
POST /chat/messages         │   ○    │   ●    │   ●   │  ○   │  ●
POST /ai/preview            │   ○    │   ●    │   ○   │  ○   │  ●
POST /payment/invoices      │   ○    │   ●    │   ○   │  ○   │  ●
POST /payment/pay/:id       │   ○    │   ○    │   ●   │  ○   │  ●
GET  /ppjk                  │   ●    │   ●    │   ●   │  ●   │  ●
PUT  /ppjk/profile          │   ○    │   ○    │   ○   │  ●*  │  ●
GET  /admin/users           │   ○    │   ○    │   ○   │  ○   │  ●

* = hanya resource milik sendiri (ownership check)
```

### 3.3 NestJS Guard Implementation

```typescript
// common/guards/roles.guard.ts

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true; // No @Roles decorator = public

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.includes(user.role);
  }
}

// Usage:
@Roles(UserRole.SELLER)
@Post('products')
async createProduct() { ... }
```

### 3.4 Ownership Verification

```typescript
// Seller hanya bisa edit produk miliknya sendiri
async updateProduct(userId: string, productId: string, dto: UpdateProductDto) {
  const product = await this.prisma.product.findUnique({
    where: { id: productId },
    include: { seller: true },
  });

  if (!product) throw new NotFoundException('Produk tidak ditemukan');
  if (product.seller.userId !== userId) {
    throw new ForbiddenException('Anda tidak memiliki akses ke produk ini');
  }

  return this.prisma.product.update({ where: { id: productId }, data: dto });
}
```

---

## 4. Data Protection

### 4.1 Sensitive Data Classification

| Data | Classification | Handling |
|---|---|---|
| NIB (Nomor Induk Berusaha) | **CONFIDENTIAL** | Stored encrypted, exposed as badge status only |
| Password | **SECRET** | bcrypt hash only, never logged, never returned |
| Bank account / rekening | **CONFIDENTIAL** | Never stored in our DB — handled by PJP |
| Email | **PRIVATE** | Stored plain, masked in public APIs (`a***n@gmail.com`) |
| Phone number | **PRIVATE** | Stored plain, masked in public APIs |
| Chat messages | **PRIVATE** | Stored plain, only accessible by participants |
| API keys (LLM, Payment) | **SECRET** | Environment variables only, never in code/DB |
| Refresh tokens | **SECRET** | Hashed in DB, httpOnly cookie |

### 4.2 Data Masking

```typescript
// utils/masking.ts

// NIB: hanya tampilkan status, bukan nomor
// ❌ "NIB: 1234567890123"
// ✅ Badge: "✓ Terverifikasi"

// Email masking untuk profil publik
export const maskEmail = (email: string): string => {
  const [local, domain] = email.split('@');
  const maskedLocal = local[0] + '***' + local[local.length - 1];
  return `${maskedLocal}@${domain}`;
};
// "alvindarmawan@gmail.com" → "a***n@gmail.com"

// Phone masking
export const maskPhone = (phone: string): string => {
  return phone.slice(0, 4) + '****' + phone.slice(-3);
};
// "081234567890" → "0812****890"
```

### 4.3 Encryption at Rest

```
PostgreSQL (Supabase):
  - Transparent Data Encryption (TDE) enabled
  - Connection via SSL (sslmode=require)

Redis:
  - Tidak simpan data sensitif (hanya cache AI results, session refs)
  - TTL pada semua keys (max 24 jam)
  - Password authentication

File Storage (Supabase Storage / S3):
  - Server-Side Encryption (SSE-S3)
  - Signed URLs untuk akses (expire 1 jam)
  - Bucket policy: no public read on sensitive buckets
```

### 4.4 UU PDP Compliance

```typescript
// ✅ Explicit consent saat registrasi
// - Checkbox wajib: "Saya menyetujui pengumpulan data untuk operasional platform"
// - Checkbox opsional: "Saya bersedia menerima email promosi"
// - Link ke Privacy Policy

// ✅ Right to Access — user bisa download data pribadi
// Endpoint: GET /users/me/data-export
// Response: JSON file with all user data

// ✅ Right to Delete — user bisa hapus akun
// Endpoint: DELETE /users/me
// - Soft delete (30 hari grace period)
// - Hard delete setelah 30 hari (cascade ke semua data)
// - Audit log tetap disimpan (anonymized)

// ✅ Data minimization
// - Hanya collect data yang diperlukan
// - NIB dipakai untuk verifikasi, lalu di-mask
// - Tidak ada tracking analitik di frontend (no GA, no pixel — fase MVP)
```

---

## 5. Input Validation & Sanitization

### 5.1 Validation Layers

```
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│   Frontend    │ ──→ │   NestJS      │ ──→ │   Database    │
│   Zod schema  │     │  class-valid. │     │   Constraints │
│   (UX only)   │     │  (ENFORCED)   │     │   (FAILSAFE)  │
└───────────────┘     └───────────────┘     └───────────────┘

Rule: NEVER trust client-side validation alone.
```

### 5.2 Input Sanitization

```typescript
// NestJS — Global validation pipe
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,          // Strip unknown properties
  forbidNonWhitelisted: true, // Reject unknown properties
  transform: true,          // Auto-transform types
  transformOptions: {
    enableImplicitConversion: false, // Explicit types only
  },
}));

// SQL Injection: Prisma handles parameterized queries by default ✅
// JANGAN pernah: prisma.$queryRawUnsafe(`SELECT * FROM users WHERE id = '${userInput}'`)
// ✅ SELALU: prisma.$queryRaw`SELECT * FROM users WHERE id = ${userInput}`

// XSS Prevention:
// - React auto-escapes JSX output ✅
// - Jangan pakai dangerouslySetInnerHTML tanpa DOMPurify
// - Chat messages: plain text only, no HTML rendering
// - Product descriptions: plain text only (markdown di-render di frontend, bukan raw HTML)
```

### 5.3 File Upload Security

```typescript
// upload/upload.service.ts

const UPLOAD_CONFIG = {
  // Allowed MIME types
  allowedMimeTypes: [
    'image/jpeg',
    'image/png',
    'image/webp',
  ],

  // Max file size
  maxFileSize: 5 * 1024 * 1024, // 5MB

  // Voice recording (for STT)
  voiceAllowedMimeTypes: [
    'audio/webm',
    'audio/wav',
    'audio/mp4',
    'audio/mpeg',
  ],
  voiceMaxFileSize: 10 * 1024 * 1024, // 10MB
  voiceMaxDuration: 120, // 2 minutes
};

async validateFile(file: Express.Multer.File, type: 'image' | 'voice'): Promise<void> {
  const config = type === 'image' ? UPLOAD_CONFIG : /* voice config */;

  // 1. Check MIME type (from header)
  if (!config.allowedMimeTypes.includes(file.mimetype)) {
    throw new BadRequestException(`Format file ${file.mimetype} tidak didukung`);
  }

  // 2. Check file size
  if (file.size > config.maxFileSize) {
    throw new BadRequestException(`Ukuran file melebihi ${config.maxFileSize / 1024 / 1024}MB`);
  }

  // 3. Verify actual file type (magic bytes) — jangan percaya extension/mimetype saja
  const fileType = await fileTypeFromBuffer(file.buffer);
  if (!fileType || !config.allowedMimeTypes.includes(fileType.mime)) {
    throw new BadRequestException('File type mismatch — kemungkinan file dipalsukan');
  }

  // 4. Image: strip EXIF metadata (privacy — bisa mengandung GPS location)
  if (type === 'image') {
    await stripExifData(file.buffer);
  }
}
```

---

## 6. API Security

### 6.1 Rate Limiting

```typescript
// app.module.ts — Global rate limiting

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,   // 1 detik
        limit: 10,    // Max 10 requests per detik
      },
      {
        name: 'medium',
        ttl: 60000,  // 1 menit
        limit: 100,   // Max 100 requests per menit
      },
      {
        name: 'long',
        ttl: 3600000, // 1 jam
        limit: 1000,  // Max 1000 requests per jam
      },
    ]),
  ],
})

// Per-endpoint override untuk sensitive operations
@Throttle({ short: { limit: 3, ttl: 60000 } }) // 3x per menit
@Post('auth/login')
async login() { ... }

@Throttle({ short: { limit: 5, ttl: 60000 } }) // 5x per menit
@Post('auth/register')
async register() { ... }

// AI endpoint: soft limit di chat
@Throttle({ medium: { limit: 100, ttl: 3600000 } }) // 100 pesan per jam
@Post('ai/preview')
async aiPreview() { ... }
```

### 6.2 CORS Configuration

```typescript
// main.ts

app.enableCors({
  origin: [
    process.env.FRONTEND_URL,  // http://localhost:3000 (dev)
    'https://nusatrade.id',     // Production
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
  credentials: true,            // Allow cookies
  maxAge: 86400,                // Cache preflight 24 jam
});
```

### 6.3 Security Headers

```typescript
// Menggunakan Helmet
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://*.supabase.co"],
      connectSrc: ["'self'", process.env.FRONTEND_URL],
    },
  },
  hsts: {
    maxAge: 31536000,            // 1 tahun
    includeSubDomains: true,
    preload: true,
  },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  frameguard: { action: 'deny' }, // Prevent clickjacking
}));
```

### 6.4 API Key Management

```
Semua API keys disimpan di environment variables — TIDAK PERNAH di:
  ❌ Source code (hardcoded)
  ❌ Frontend environment (NEXT_PUBLIC_*)
  ❌ Database
  ❌ Git repository
  ❌ Chat messages / logs

Rotasi:
  - LLM API keys: rotasi setiap 90 hari
  - Payment gateway keys: rotasi setiap 90 hari
  - Internal API key (NestJS ↔ FastAPI): rotasi setiap 30 hari
  - JWT secret: rotasi jika ada suspicion of compromise

Storage:
  - Development: .env file (git-ignored)
  - Production: Railway / Fly.io secrets management
  - Future: HashiCorp Vault / AWS Secrets Manager
```

---

## 7. Payment Security

### 7.1 Payment Flow Security

```
Prinsip #1: NusaTrade TIDAK pernah menyentuh uang user.
Semua payment flow via Payment Gateway berlisensi BI (Midtrans/Xendit).

┌──────────┐     ┌──────────┐     ┌──────────────┐     ┌──────────┐
│  Seller  │     │  NestJS  │     │ Payment      │     │  Buyer   │
│          │     │          │     │ Gateway (PJP)│     │          │
└────┬─────┘     └────┬─────┘     └──────┬───────┘     └────┬─────┘
     │                │                   │                  │
     │ Create Invoice │                   │                  │
     │ ──────────────→│                   │                  │
     │                │ Create QRIS       │                  │
     │                │ ─────────────────→│                  │
     │                │ ←── QR Data ──────│                  │
     │ ←── QR Code ───│                   │                  │
     │                │                   │                  │
     │                │                   │    Scan QR       │
     │                │                   │ ←────────────────│
     │                │                   │    Process Pay   │
     │                │                   │ ──────────────→  │
     │                │                   │                  │
     │                │ Webhook: SUCCESS  │                  │
     │                │ ←─────────────────│                  │
     │                │                   │                  │
     │ ←── Notif ─────│                   │                  │
     │                │ Log transaction   │                  │
     │                │ Calculate fee     │                  │
     │                │ Invoice fee       │                  │
```

### 7.2 Webhook Security

```typescript
// payment/webhook.controller.ts

@Post('webhook/midtrans')
async handleMidtransWebhook(
  @Body() body: MidtransWebhookPayload,
  @Headers('x-midtrans-signature') signature: string,
) {
  // 1. Verify webhook signature
  const expectedSignature = crypto
    .createHash('sha512')
    .update(`${body.order_id}${body.status_code}${body.gross_amount}${serverKey}`)
    .digest('hex');

  if (signature !== expectedSignature) {
    throw new ForbiddenException('Invalid webhook signature');
  }

  // 2. Verify with GET to Midtrans API (double-check)
  const verified = await this.paymentService.verifyWithGateway(body.order_id);
  if (!verified) {
    throw new BadRequestException('Transaction verification failed');
  }

  // 3. Process payment status update
  await this.paymentService.updatePaymentStatus(body);

  // 4. Audit log
  await this.auditService.log({
    action: 'payment_webhook_received',
    invoiceId: body.order_id,
    status: body.transaction_status,
    details: body,
  });

  return { status: 'ok' };
}
```

### 7.3 Invoice Number Generation

```typescript
// Deterministic, unique, not guessable
// Format: INV-{YEAR}-{RANDOM_8_CHARS}
// Example: INV-2026-A3X7K9M2

const generateInvoiceNumber = (): string => {
  const year = new Date().getFullYear();
  const random = crypto.randomBytes(4).toString('hex').toUpperCase();
  return `INV-${year}-${random}`;
};

// ❌ JANGAN: sequential (INV-001, INV-002) — bisa di-enumerate
// ❌ JANGAN: timestamp-based — predictable
```

---

## 8. Session & Cookie Security

### 8.1 Cookie Configuration

```typescript
// auth/auth.service.ts

const COOKIE_OPTIONS = {
  httpOnly: true,          // Tidak bisa diakses JavaScript
  secure: true,            // Hanya via HTTPS
  sameSite: 'strict',      // Prevent CSRF
  path: '/',
  maxAge: 15 * 60 * 1000,  // 15 menit (access token)
};

const REFRESH_COOKIE_OPTIONS = {
  ...COOKIE_OPTIONS,
  path: '/api/auth/refresh', // Hanya dikirim ke refresh endpoint
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
};
```

### 8.2 Session Management

```typescript
// Concurrent session limit: max 3 active sessions per user
// Jika login di device ke-4, invalidate session tertua

// Force logout semua session:
// POST /auth/logout-all — invalidate semua refresh tokens
async logoutAll(userId: string): Promise<void> {
  await this.prisma.refreshToken.deleteMany({
    where: { userId },
  });
}
```

---

## 9. Logging & Audit

### 9.1 Audit Log Requirements

**Semua operasi finansial WAJIB di-audit:**

```typescript
// Audit log entries:
interface AuditLogEntry {
  id: string;
  timestamp: Date;
  action: string;          // "invoice_created", "payment_received", "fee_charged"
  actorId: string;         // User ID yang melakukan aksi
  actorRole: UserRole;
  resourceType: string;    // "invoice", "payment", "user"
  resourceId: string;
  details: Record<string, any>; // Data sebelum & sesudah
  ipAddress: string;
  userAgent: string;
}

// Aksi yang di-audit:
const AUDITED_ACTIONS = [
  // Financial
  'invoice_created',
  'invoice_updated',
  'payment_initiated',
  'payment_succeeded',
  'payment_failed',
  'platform_fee_charged',
  'refund_initiated',

  // Auth
  'user_registered',
  'user_login',
  'user_login_failed',
  'password_changed',
  'token_refreshed',

  // Data
  'nib_verified',
  'nib_verification_failed',
  'user_data_exported',
  'user_account_deleted',

  // Admin
  'user_role_changed',
  'user_suspended',
  'ppjk_verified',
];
```

### 9.2 Logging Rules

```
✅ DO log:
  - Authentication events (login, logout, failed attempts)
  - Authorization failures (403)
  - Payment events (all states)
  - NIB verification attempts
  - File uploads
  - Admin actions
  - Error stack traces (server-side only)

❌ DO NOT log:
  - Passwords (even hashed)
  - Full API keys
  - NIB numbers (log masked: "NIB: 1234...0123")
  - Chat message content (privacy)
  - Credit card / bank account numbers
  - Full JWT tokens (log only last 8 chars for reference)
```

---

## 10. Infrastructure Security

### 10.1 Network

```
Production architecture:

Internet → CDN/WAF → Load Balancer → NestJS (public) → FastAPI (internal)
                                         ↓                    ↓
                                    PostgreSQL (private)  Redis (private)
                                    Supabase Storage      Celery Workers

Rules:
  - FastAPI: NOT accessible from internet — internal network only
  - PostgreSQL: NOT accessible from internet — only from service containers
  - Redis: NOT accessible from internet — only from service containers
  - Supabase Storage: signed URLs only — no public bucket
```

### 10.2 Environment Isolation

```
Development:  docker-compose local, mock APIs, sandbox payment
Staging:      mirror production, sandbox payment, seeded test data
Production:   real APIs, real payment gateway, monitoring active

Rules:
  - Production secrets NEVER in development env
  - Development cannot connect to production DB
  - Staging uses separate Supabase project, separate Redis instance
```

### 10.3 Dependency Security

```bash
# Rutin check vulnerability di dependencies

# Node.js (NestJS)
npm audit
npm audit fix

# Python (FastAPI)
pip-audit
safety check

# Automated:
# GitHub Dependabot enabled untuk semua repositories
# CI/CD: fail build jika ada vulnerability severity HIGH/CRITICAL
```

---

## 11. Incident Response

### 11.1 Severity Levels

| Level | Contoh | Response Time | Escalation |
|---|---|---|---|
| **P0 - Critical** | Data breach, payment compromise, auth bypass | < 15 menit | Seluruh tim |
| **P1 - High** | Service down, API key leaked, DDOS | < 1 jam | Lead dev + ops |
| **P2 - Medium** | Partial outage, rate limit bypass, minor vuln | < 4 jam | Lead dev |
| **P3 - Low** | UI bug, non-critical vuln, log anomaly | < 24 jam | Assigned dev |

### 11.2 Breach Response Checklist

```
Jika terjadi data breach:

1. CONTAIN — Isolate affected systems immediately
   □ Revoke compromised API keys
   □ Invalidate all user sessions (force re-login)
   □ Block suspicious IPs
   □ Take affected service offline if needed

2. ASSESS — Determine scope
   □ What data was accessed?
   □ How many users affected?
   □ What was the attack vector?
   □ Is the vulnerability still open?

3. NOTIFY — Per UU PDP requirements
   □ Notify affected users within 3×24 jam
   □ Notify relevant authorities (Kominfo / BI if payment-related)
   □ Prepare public statement if needed

4. REMEDIATE — Fix and prevent recurrence
   □ Patch the vulnerability
   □ Rotate all secrets
   □ Update firewall rules
   □ Post-mortem document
   □ Update security procedures
```

---

## 12. Security Checklist — Per Sprint

### Frontend
- [ ] Tidak ada API keys di kode frontend
- [ ] Tidak ada `console.log` dengan data sensitif
- [ ] Input validation dengan Zod di semua form
- [ ] HTML sanitization dengan DOMPurify di semua user-generated content
- [ ] File upload: validasi tipe dan ukuran
- [ ] Tidak pakai `dangerouslySetInnerHTML` tanpa sanitization
- [ ] Environment variables: hanya `NEXT_PUBLIC_API_URL` yang public

### Backend (NestJS)
- [ ] Semua endpoint punya auth guard (kecuali yang sengaja @Public)
- [ ] RBAC guard di semua mutating endpoints
- [ ] Input validation via class-validator + ValidationPipe
- [ ] Rate limiting aktif
- [ ] CORS configured correctly (whitelist, bukan wildcard)
- [ ] Helmet security headers aktif
- [ ] No raw SQL queries — pakai Prisma parameterized
- [ ] Password hashed dengan bcrypt (salt rounds 12)
- [ ] JWT secret minimal 32 karakter
- [ ] Refresh token rotation implemented
- [ ] File upload: magic bytes validation + EXIF stripping
- [ ] Audit log untuk semua transaksi finansial

### Backend (FastAPI)
- [ ] Internal API key authentication aktif
- [ ] Service NOT exposed to public internet
- [ ] Pydantic validation di semua endpoints
- [ ] No user data persistence (stateless)
- [ ] Rate limiting per-operation

### Infrastructure
- [ ] HTTPS enforced (TLS 1.2+ minimum)
- [ ] Database connection via SSL
- [ ] Redis password protected
- [ ] Secrets in environment variables (not in code)
- [ ] `npm audit` / `pip-audit` — no HIGH/CRITICAL vulnerabilities
- [ ] Git: no secrets committed (`.gitignore` + secret scanning)
- [ ] Backups: daily automated backup verified

---

## 13. Tools & Resources

| Category | Tool | Purpose |
|---|---|---|
| **Secret Scanning** | GitHub Secret Scanning | Auto-detect leaked keys in repo |
| **Dependency Audit** | Dependabot, npm audit, pip-audit | Vulnerability detection |
| **WAF** | Cloudflare (free tier) | DDoS protection, bot filtering |
| **Error Tracking** | Sentry | Runtime error monitoring |
| **SSL Certificate** | Let's Encrypt (via Cloudflare/Railway) | Free TLS certificates |
| **Password Hashing** | bcrypt (NestJS) | Industry-standard hashing |
| **JWT** | @nestjs/jwt (jsonwebtoken) | Token generation & verification |
| **Validation** | class-validator (NestJS), Pydantic (FastAPI) | Input sanitization |
| **Security Headers** | Helmet.js | HTTP security headers |
