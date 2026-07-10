# Backend Skill Guide — NusaTrade Connect
## Dual Architecture: Python AI Service + NestJS System Service

**Scope:** Semua keputusan arsitektur, konvensi kode, dan implementasi backend
**Architecture:** Microservice (2 service) — komunikasi internal HTTP

---

## 1. Filosofi Arsitektur

### Kenapa Dual Backend?

NusaTrade Connect memiliki dua kategori beban kerja yang sangat berbeda:

| Aspek | AI Workload | System Workload |
|---|---|---|
| **Sifat** | Compute-intensive, async, non-deterministic | I/O-intensive, CRUD, deterministic |
| **Bahasa terbaik** | Python (ekosistem ML/AI mature) | TypeScript (type-safe end-to-end dengan frontend) |
| **Contoh** | Tone-shifting, translation, STT, entity detection | Auth, catalog CRUD, chat messaging, payment, PPJK |
| **Scaling** | Scale horizontal by GPU/CPU | Scale horizontal by request volume |
| **Latency tolerance** | 1–5 detik (user expects AI to "think") | < 200ms (user expects instant response) |

### Prinsip Utama
1. **Frontend hanya bicara ke NestJS** — NestJS adalah API Gateway tunggal
2. **FastAPI tidak exposed ke publik** — hanya accessible dari internal network
3. **Shared database** — PostgreSQL tunggal, kedua service akses dengan role berbeda
4. **Shared cache** — Redis untuk cache, pub/sub, dan task queue
5. **Fail gracefully** — jika AI Service down, system tetap berjalan (chat tetap bisa kirim teks tanpa AI correction)

---

## 2. AI Service (Python — FastAPI)

### 2.1 Teknologi

| Layer | Teknologi | Versi |
|---|---|---|
| **Runtime** | Python | 3.11+ |
| **Framework** | FastAPI | 0.110+ |
| **ASGI Server** | Uvicorn | latest |
| **LLM Orchestration** | LangChain | latest |
| **LLM Provider** | OpenAI GPT-4o / Anthropic Claude | latest API |
| **Speech-to-Text** | OpenAI Whisper API | latest |
| **NLP** | spaCy (id_core_news_sm) | 3.x |
| **Entity Detection** | spaCy + regex patterns | - |
| **Task Queue** | Celery + Redis | 5.x |
| **Cache** | Redis (via redis-py / aioredis) | - |
| **HTTP Client** | httpx (async) | latest |
| **Validation** | Pydantic v2 | 2.x |
| **Testing** | Pytest + httpx (async test) | latest |
| **Linting** | Ruff | latest |
| **Type Checking** | mypy | latest |

### 2.2 Struktur Proyek

```
backend/ai-service/
├── app/
│   ├── __init__.py
│   ├── main.py                   # FastAPI app initialization
│   ├── config.py                 # Settings via pydantic-settings
│   ├── dependencies.py           # Shared dependencies (Redis, LLM client)
│   │
│   ├── api/
│   │   ├── __init__.py
│   │   ├── router.py             # Main API router
│   │   ├── v1/
│   │   │   ├── __init__.py
│   │   │   ├── tone_shift.py     # POST /ai/tone-shift
│   │   │   ├── translate.py      # POST /ai/translate
│   │   │   ├── preview.py        # POST /ai/preview (pipeline gabungan)
│   │   │   ├── speech.py         # POST /ai/speech-to-text
│   │   │   └── entity.py         # POST /ai/entity-detect
│   │   └── health.py             # GET /health
│   │
│   ├── services/
│   │   ├── __init__.py
│   │   ├── llm_service.py        # LangChain wrapper, prompt management
│   │   ├── tone_shift_service.py # Tone-shifting pipeline
│   │   ├── translation_service.py# Translation pipeline
│   │   ├── stt_service.py        # Speech-to-text wrapper
│   │   ├── entity_service.py     # Price/quantity entity detection
│   │   └── cache_service.py      # Redis caching layer
│   │
│   ├── prompts/
│   │   ├── __init__.py
│   │   ├── tone_shift.py         # System prompts untuk tone-shifting
│   │   ├── translate.py          # System prompts untuk translation
│   │   └── entity_detect.py      # Prompts untuk entity detection fallback
│   │
│   ├── models/
│   │   ├── __init__.py
│   │   ├── requests.py           # Pydantic request schemas
│   │   ├── responses.py          # Pydantic response schemas
│   │   └── enums.py              # Language enum, ToneLevel enum
│   │
│   ├── middleware/
│   │   ├── __init__.py
│   │   ├── auth.py               # Internal API key validation
│   │   ├── rate_limit.py         # Rate limiting
│   │   └── logging.py            # Request/response logging
│   │
│   └── utils/
│       ├── __init__.py
│       ├── text_processing.py    # Text cleanup, normalization
│       └── price_parser.py       # Regex patterns untuk harga Indonesia
│
├── tasks/
│   ├── __init__.py
│   ├── celery_app.py             # Celery configuration
│   └── ai_tasks.py               # Async AI processing tasks
│
├── tests/
│   ├── __init__.py
│   ├── conftest.py
│   ├── test_tone_shift.py
│   ├── test_translate.py
│   ├── test_entity.py
│   └── test_preview.py
│
├── .env.example
├── pyproject.toml                # Dependencies & tool config (Ruff, mypy)
├── Dockerfile
├── docker-compose.yml
└── README.md
```

### 2.3 API Endpoints

#### `POST /ai/tone-shift`
Mengubah bahasa Indonesia informal/kasual menjadi bahasa bisnis ekspor formal.

```python
# Request
class ToneShiftRequest(BaseModel):
    text: str                          # Teks informal dari seller
    context: str = "export_business"   # Konteks untuk prompt
    preserve_numbers: bool = True      # Jangan ubah angka

# Response
class ToneShiftResponse(BaseModel):
    original: str
    corrected: str
    changes: list[ToneChange]          # Daftar perubahan yang dilakukan
    confidence: float                  # 0.0 - 1.0
```

**Contoh:**
```json
// Input
{ "text": "bos mau pesen brp biji? kalo banyak gw kasih diskon deh" }

// Output
{
  "original": "bos mau pesen brp biji? kalo banyak gw kasih diskon deh",
  "corrected": "Berapa unit yang ingin Anda pesan? Kami menawarkan diskon khusus untuk pemesanan dalam jumlah besar.",
  "changes": [
    { "from": "bos", "to": "Anda", "type": "formality" },
    { "from": "brp biji", "to": "berapa unit", "type": "business_term" },
    { "from": "gw kasih diskon deh", "to": "Kami menawarkan diskon khusus", "type": "professionalism" }
  ],
  "confidence": 0.94
}
```

#### `POST /ai/translate`
Terjemahan konteks bisnis — bukan Google Translate generic.

```python
# Request
class TranslateRequest(BaseModel):
    text: str                          # Teks yang sudah di-tone-shift
    source_lang: Language = "id"
    target_lang: Language              # en, zh, ms, ja
    domain: str = "export_business"    # Konteks bisnis

# Response
class TranslateResponse(BaseModel):
    source_text: str
    translated_text: str
    source_lang: Language
    target_lang: Language
    glossary_used: list[GlossaryEntry] # Istilah bisnis yang di-translate khusus
```

#### `POST /ai/preview`
Pipeline gabungan: tone-shift → translate → entity detection. **Endpoint utama yang dipanggil oleh NestJS.**

```python
# Request
class PreviewRequest(BaseModel):
    text: str                          # Teks mentah dari seller
    target_lang: Language              # Bahasa buyer
    detect_entities: bool = True       # Deteksi harga/kuantitas

# Response
class PreviewResponse(BaseModel):
    original: str                      # Teks asli
    formal: str                        # Setelah tone-shift
    translated: str                    # Setelah translation
    entities: list[DetectedEntity]     # Harga/kuantitas yang terdeteksi
    requires_price_confirm: bool       # True jika ada harga terdeteksi
    processing_time_ms: int
```

#### `POST /ai/speech-to-text`
Konversi audio ke teks.

```python
# Request: multipart/form-data
# - audio: file (wav, mp3, webm, m4a)
# - language: str = "id"

# Response
class STTResponse(BaseModel):
    text: str
    language: Language
    duration_seconds: float
    confidence: float
```

#### `POST /ai/entity-detect`
Deteksi entitas bisnis (harga, kuantitas, tanggal) dari teks.

```python
# Request
class EntityDetectRequest(BaseModel):
    text: str
    detect_types: list[EntityType] = ["price", "quantity", "date"]

# Response
class EntityDetectResponse(BaseModel):
    entities: list[DetectedEntity]

class DetectedEntity(BaseModel):
    type: EntityType                   # "price" | "quantity" | "date"
    value: str                         # "5000000" (normalized)
    display: str                       # "Rp 5.000.000"
    original_text: str                 # "5jt" atau "lima juta"
    position: tuple[int, int]          # Character position in text
    confidence: float
```

### 2.4 Prompt Engineering

```python
# prompts/tone_shift.py

TONE_SHIFT_SYSTEM_PROMPT = """
Kamu adalah asisten bahasa bisnis ekspor Indonesia.

TUGAS:
Ubah teks bahasa Indonesia informal/kasual menjadi bahasa bisnis ekspor yang formal,
profesional, dan sopan — cocok untuk komunikasi B2B internasional.

ATURAN:
1. Pertahankan makna asli 100% — jangan tambah atau kurangi informasi
2. Ganti bahasa gaul/slang dengan padanan formal
3. Jangan ubah angka, nama produk, atau istilah teknis
4. Gunakan kata ganti "Kami" (untuk penjual) dan "Anda" (untuk pembeli)
5. Jika ada harga, pertahankan format aslinya
6. Tone: profesional tapi tetap hangat — bukan kaku seperti surat resmi pemerintah
7. Jika teks sudah formal, kembalikan apa adanya

CONTOH:
Input: "bro mau brp? gw ada stok 500 pcs nih, kalo lo mau ambil 100+ gw disc 15%"
Output: "Berapa jumlah yang Anda butuhkan? Saat ini kami memiliki stok 500 pcs.
         Untuk pemesanan minimal 100 unit, kami dapat memberikan diskon 15%."
"""

TRANSLATE_SYSTEM_PROMPT = """
Kamu adalah penerjemah bisnis ekspor profesional.

TUGAS:
Terjemahkan teks bisnis dari {source_lang} ke {target_lang}.

ATURAN:
1. Gunakan terminologi bisnis/perdagangan yang tepat
2. Pertahankan angka, mata uang, dan satuan dalam format internasional
3. Nama produk Indonesia JANGAN diterjemahkan (keycap, batik, dll tetap bahasa asli)
4. Nama brand/usaha JANGAN diterjemahkan
5. Gunakan tone formal namun approachable — bukan terlalu stiff
6. Untuk Mandarin: gunakan Simplified Chinese (简体中文)
7. Untuk Jepang: gunakan level keigo yang sopan (です/ます) bukan terlalu kaku (である)
"""
```

### 2.5 Caching Strategy

```python
# services/cache_service.py

class AICacheService:
    """Cache AI results to reduce LLM API calls and latency."""

    # Cache key pattern: ai:{operation}:{hash(input)}
    # TTL: 1 jam untuk tone-shift, 2 jam untuk translation
    # Rationale: teks bisnis yang sama sering di-reuse

    CACHE_TTL = {
        "tone_shift": 3600,      # 1 jam
        "translate": 7200,       # 2 jam
        "entity_detect": 86400,  # 24 jam (deterministic, jarang berubah)
    }

    async def get_or_compute(
        self,
        operation: str,
        input_text: str,
        compute_fn: Callable,
        **kwargs
    ) -> Any:
        cache_key = f"ai:{operation}:{hashlib.sha256(input_text.encode()).hexdigest()[:16]}"
        cached = await self.redis.get(cache_key)
        if cached:
            return json.loads(cached)

        result = await compute_fn(input_text, **kwargs)
        await self.redis.setex(cache_key, self.CACHE_TTL[operation], json.dumps(result))
        return result
```

### 2.6 Konvensi Kode Python

```python
# ✅ Type hints everywhere
async def tone_shift(text: str, context: str = "export_business") -> ToneShiftResponse:
    ...

# ✅ Pydantic v2 untuk semua I/O
class ToneShiftRequest(BaseModel):
    model_config = ConfigDict(strict=True)
    text: str = Field(..., min_length=1, max_length=5000)
    context: str = Field(default="export_business")

# ✅ Async semua I/O operations
async def get_llm_response(prompt: str) -> str:
    async with httpx.AsyncClient() as client:
        response = await client.post(...)
    return response.json()

# ✅ Structured logging
import structlog
logger = structlog.get_logger()

logger.info("tone_shift_completed",
    input_length=len(text),
    output_length=len(result),
    confidence=result.confidence,
    processing_time_ms=elapsed_ms
)

# ✅ Error handling
from fastapi import HTTPException

class AIServiceError(Exception):
    """Base exception for AI service."""
    pass

class LLMTimeoutError(AIServiceError):
    """LLM provider didn't respond in time."""
    pass

# ✅ Naming conventions
# Files: snake_case.py
# Classes: PascalCase
# Functions: snake_case
# Constants: SCREAMING_SNAKE_CASE
# Private: _leading_underscore
```

### 2.7 Internal Authentication

```python
# middleware/auth.py
# AI Service hanya menerima request dari NestJS — tidak dari publik

from fastapi import Security, HTTPException
from fastapi.security import APIKeyHeader

API_KEY_HEADER = APIKeyHeader(name="X-Internal-API-Key")

async def verify_internal_key(api_key: str = Security(API_KEY_HEADER)):
    if api_key != settings.INTERNAL_API_KEY:
        raise HTTPException(status_code=403, detail="Invalid internal API key")
    return api_key
```

---

## 3. System Service (NestJS — TypeScript)

### 3.1 Teknologi

| Layer | Teknologi | Versi |
|---|---|---|
| **Runtime** | Node.js | 20 LTS |
| **Framework** | NestJS | 10+ |
| **Language** | TypeScript | 5.x |
| **ORM** | Prisma | 5.x |
| **Database** | PostgreSQL | 15+ (via Supabase) |
| **Auth** | JWT (@nestjs/jwt + passport-jwt) | latest |
| **Validation** | class-validator + class-transformer | latest |
| **API Docs** | Swagger (@nestjs/swagger) | latest |
| **WebSocket** | Socket.io (@nestjs/websockets) | latest |
| **File Storage** | Supabase Storage / AWS S3 (@aws-sdk/client-s3) | latest |
| **Payment** | Midtrans / Xendit Node SDK | latest |
| **Email** | Nodemailer (@nestjs-modules/mailer) | latest |
| **Rate Limiting** | @nestjs/throttler | latest |
| **Cache** | Redis (@nestjs/cache-manager + cache-manager-redis-store) | latest |
| **HTTP Client** | @nestjs/axios (untuk call FastAPI) | latest |
| **Testing** | Jest + Supertest | latest |
| **Linting** | ESLint + Prettier | latest |

### 3.2 Struktur Proyek

```
backend/system-service/
├── prisma/
│   ├── schema.prisma              # Database schema
│   ├── migrations/                # Migration files
│   └── seed.ts                    # Seed data (PPJK, categories, etc.)
│
├── src/
│   ├── main.ts                    # Bootstrap NestJS app
│   ├── app.module.ts              # Root module
│   │
│   ├── common/                    # Shared utilities
│   │   ├── decorators/
│   │   │   ├── roles.decorator.ts      # @Roles('seller', 'buyer')
│   │   │   ├── current-user.decorator.ts # @CurrentUser()
│   │   │   └── public.decorator.ts     # @Public() — skip auth
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   ├── roles.guard.ts          # RBAC guard
│   │   │   └── throttle.guard.ts
│   │   ├── interceptors/
│   │   │   ├── transform.interceptor.ts # Wrap response in { data, message, success }
│   │   │   └── logging.interceptor.ts
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts # Global error handler
│   │   ├── pipes/
│   │   │   └── validation.pipe.ts
│   │   └── dto/
│   │       ├── pagination.dto.ts       # PaginationQuery, PaginatedResponse
│   │       └── api-response.dto.ts
│   │
│   ├── config/
│   │   ├── config.module.ts
│   │   ├── database.config.ts
│   │   ├── jwt.config.ts
│   │   ├── redis.config.ts
│   │   └── ai-service.config.ts       # FastAPI base URL & API key
│   │
│   ├── auth/                      # 🔐 Authentication & Authorization
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── strategies/
│   │   │   ├── jwt.strategy.ts
│   │   │   └── jwt-refresh.strategy.ts
│   │   └── dto/
│   │       ├── register.dto.ts
│   │       ├── login.dto.ts
│   │       └── token.dto.ts
│   │
│   ├── users/                     # 👤 User Management
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── dto/
│   │       ├── update-profile.dto.ts
│   │       └── user-response.dto.ts
│   │
│   ├── catalog/                   # 📦 E-Katalog (Produk + Toko)
│   │   ├── catalog.module.ts
│   │   ├── products/
│   │   │   ├── products.controller.ts
│   │   │   ├── products.service.ts
│   │   │   └── dto/
│   │   │       ├── create-product.dto.ts
│   │   │       ├── update-product.dto.ts
│   │   │       └── product-filter.dto.ts
│   │   └── shops/
│   │       ├── shops.controller.ts
│   │       ├── shops.service.ts
│   │       └── dto/
│   │           └── update-shop.dto.ts
│   │
│   ├── chat/                      # 💬 Chat & Real-time Messaging
│   │   ├── chat.module.ts
│   │   ├── chat.controller.ts     # REST: get conversations, history
│   │   ├── chat.service.ts
│   │   ├── chat.gateway.ts        # WebSocket Gateway (Socket.io)
│   │   └── dto/
│   │       ├── send-message.dto.ts
│   │       └── conversation.dto.ts
│   │
│   ├── ai-proxy/                  # 🤖 Proxy ke FastAPI AI Service
│   │   ├── ai-proxy.module.ts
│   │   ├── ai-proxy.controller.ts
│   │   └── ai-proxy.service.ts    # HTTP calls ke FastAPI
│   │
│   ├── payment/                   # 💳 QRIS & Invoice
│   │   ├── payment.module.ts
│   │   ├── payment.controller.ts
│   │   ├── payment.service.ts
│   │   ├── invoice.service.ts
│   │   ├── webhook.controller.ts  # Payment gateway webhooks
│   │   └── dto/
│   │       ├── create-invoice.dto.ts
│   │       └── payment-status.dto.ts
│   │
│   ├── nib/                       # ✅ NIB Verification
│   │   ├── nib.module.ts
│   │   ├── nib.controller.ts
│   │   └── nib.service.ts         # OSS API integration + caching
│   │
│   ├── ppjk/                      # 🚚 PPJK Directory
│   │   ├── ppjk.module.ts
│   │   ├── ppjk.controller.ts
│   │   ├── ppjk.service.ts
│   │   └── dto/
│   │       ├── ppjk-filter.dto.ts
│   │       └── ppjk-review.dto.ts
│   │
│   ├── notification/              # 🔔 Notifications
│   │   ├── notification.module.ts
│   │   ├── notification.service.ts
│   │   └── notification.gateway.ts # WebSocket notifications
│   │
│   └── upload/                    # 📁 File Upload
│       ├── upload.module.ts
│       ├── upload.controller.ts
│       └── upload.service.ts      # S3/Supabase Storage
│
├── test/
│   ├── auth.e2e-spec.ts
│   ├── catalog.e2e-spec.ts
│   └── chat.e2e-spec.ts
│
├── .env.example
├── nest-cli.json
├── package.json
├── tsconfig.json
├── tsconfig.build.json
├── Dockerfile
└── README.md
```

### 3.3 Database Schema (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ═══════════════════════════════════════
// USER & AUTH
// ═══════════════════════════════════════

enum UserRole {
  SELLER
  BUYER
  PPJK_PARTNER
  ADMIN
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  passwordHash  String    @map("password_hash")
  role          UserRole
  isActive      Boolean   @default(true) @map("is_active")
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")

  // Relations
  sellerProfile SellerProfile?
  buyerProfile  BuyerProfile?
  ppjkProfile   PPJKProfile?
  refreshTokens RefreshToken[]

  @@map("users")
}

model RefreshToken {
  id        String   @id @default(cuid())
  token     String   @unique
  userId    String   @map("user_id")
  expiresAt DateTime @map("expires_at")
  createdAt DateTime @default(now()) @map("created_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("refresh_tokens")
}

// ═══════════════════════════════════════
// SELLER (UMKM)
// ═══════════════════════════════════════

model SellerProfile {
  id            String   @id @default(cuid())
  userId        String   @unique @map("user_id")
  businessName  String   @map("business_name")
  slug          String   @unique
  nib           String?  @unique
  nibVerified   Boolean  @default(false) @map("nib_verified")
  nibVerifiedAt DateTime? @map("nib_verified_at")
  description   String?
  city          String?
  province      String?
  profileImage  String?  @map("profile_image")
  categories    String[] // Array of category slugs
  createdAt     DateTime @default(now()) @map("created_at")
  updatedAt     DateTime @updatedAt @map("updated_at")

  user     User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  products Product[]

  @@map("seller_profiles")
}

// ═══════════════════════════════════════
// BUYER
// ═══════════════════════════════════════

model BuyerProfile {
  id          String   @id @default(cuid())
  userId      String   @unique @map("user_id")
  companyName String?  @map("company_name")
  country     String
  language    String   @default("en") // Preferred language
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("buyer_profiles")
}

// ═══════════════════════════════════════
// PRODUCT & CATALOG
// ═══════════════════════════════════════

model Product {
  id            String   @id @default(cuid())
  sellerId      String   @map("seller_id")
  slug          String   @unique
  name          String
  description   String
  moq           Int      @default(1) // Minimum Order Quantity
  priceRangeMin Int      @map("price_range_min") // dalam Rupiah
  priceRangeMax Int      @map("price_range_max")
  images        String[] // Array of image URLs
  category      String
  isActive      Boolean  @default(true) @map("is_active")
  viewCount     Int      @default(0) @map("view_count")
  inquiryCount  Int      @default(0) @map("inquiry_count")
  createdAt     DateTime @default(now()) @map("created_at")
  updatedAt     DateTime @updatedAt @map("updated_at")

  seller SellerProfile @relation(fields: [sellerId], references: [id], onDelete: Cascade)

  @@index([category])
  @@index([sellerId])
  @@map("products")
}

// ═══════════════════════════════════════
// CHAT & MESSAGING
// ═══════════════════════════════════════

model Conversation {
  id          String   @id @default(cuid())
  sellerId    String   @map("seller_id")
  buyerId     String   @map("buyer_id")
  productId   String?  @map("product_id") // Optional: terkait produk tertentu
  isActive    Boolean  @default(true) @map("is_active")
  lastMessage String?  @map("last_message")
  lastAt      DateTime @default(now()) @map("last_at")
  createdAt   DateTime @default(now()) @map("created_at")

  messages Message[]

  @@unique([sellerId, buyerId])
  @@map("conversations")
}

model Message {
  id              String    @id @default(cuid())
  conversationId  String    @map("conversation_id")
  senderId        String    @map("sender_id")
  originalText    String    @map("original_text")     // Teks asli
  correctedText   String?   @map("corrected_text")    // Setelah tone-shift
  translatedText  String?   @map("translated_text")   // Setelah translate
  targetLang      String?   @map("target_lang")
  isVoice         Boolean   @default(false) @map("is_voice")
  audioUrl        String?   @map("audio_url")
  readAt          DateTime? @map("read_at")
  createdAt       DateTime  @default(now()) @map("created_at")

  conversation Conversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)

  @@index([conversationId])
  @@map("messages")
}

// ═══════════════════════════════════════
// PAYMENT & INVOICE
// ═══════════════════════════════════════

enum PaymentStatus {
  PENDING
  PAID
  PROCESSING
  COMPLETED
  FAILED
  EXPIRED
}

model Invoice {
  id              String        @id @default(cuid())
  invoiceNumber   String        @unique @map("invoice_number") // INV-2026-XXXXX
  sellerId        String        @map("seller_id")
  buyerId         String        @map("buyer_id")
  conversationId  String?       @map("conversation_id")
  items           Json          // Array of invoice items
  subtotal        Int           // dalam Rupiah
  platformFee     Int           @map("platform_fee")    // 1.5-2.5%
  total           Int
  currency        String        @default("IDR")
  status          PaymentStatus @default(PENDING)
  qrisData        String?       @map("qris_data")       // QR payload
  qrisExpiry      DateTime?     @map("qris_expiry")
  paidAt          DateTime?     @map("paid_at")
  gatewayRef      String?       @map("gateway_ref")     // Payment gateway reference
  createdAt       DateTime      @default(now()) @map("created_at")
  updatedAt       DateTime      @updatedAt @map("updated_at")

  auditLogs TransactionAuditLog[]

  @@index([sellerId])
  @@index([buyerId])
  @@index([status])
  @@map("invoices")
}

model TransactionAuditLog {
  id        String   @id @default(cuid())
  invoiceId String   @map("invoice_id")
  action    String   // "created", "paid", "refunded", "fee_charged"
  details   Json?
  actorId   String?  @map("actor_id")
  createdAt DateTime @default(now()) @map("created_at")

  invoice Invoice @relation(fields: [invoiceId], references: [id], onDelete: Cascade)

  @@map("transaction_audit_logs")
}

// ═══════════════════════════════════════
// PPJK DIRECTORY
// ═══════════════════════════════════════

model PPJKProfile {
  id          String   @id @default(cuid())
  userId      String   @unique @map("user_id")
  companyName String   @map("company_name")
  slug        String   @unique
  city        String
  province    String
  services    String[] // ["PEB", "PIB", "Cukai", "Logistik"]
  description String?
  contact     Json     // { phone, email, website }
  isVerified  Boolean  @default(false) @map("is_verified")
  tier        String   @default("basic") // basic, premium
  avgRating   Float    @default(0) @map("avg_rating")
  reviewCount Int      @default(0) @map("review_count")
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  user    User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  reviews PPJKReview[]

  @@map("ppjk_profiles")
}

model PPJKReview {
  id       String   @id @default(cuid())
  ppjkId   String   @map("ppjk_id")
  userId   String   @map("user_id") // Seller yang review
  rating   Int      // 1-5
  comment  String?
  createdAt DateTime @default(now()) @map("created_at")

  ppjk PPJKProfile @relation(fields: [ppjkId], references: [id], onDelete: Cascade)

  @@unique([ppjkId, userId])
  @@map("ppjk_reviews")
}
```

### 3.4 NestJS Patterns

#### Controller Pattern
```typescript
// catalog/products/products.controller.ts

@ApiTags('Catalog')
@Controller('catalog/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Public() // Buyer bisa browse tanpa login
  @ApiOperation({ summary: 'Browse product catalog' })
  @ApiQuery({ type: ProductFilterDto })
  async findAll(
    @Query() filter: ProductFilterDto,
  ): Promise<PaginatedResponse<ProductResponseDto>> {
    return this.productsService.findAll(filter);
  }

  @Post()
  @Roles(UserRole.SELLER)
  @ApiOperation({ summary: 'Create new product listing' })
  async create(
    @CurrentUser() user: JwtPayload,
    @Body() dto: CreateProductDto,
  ): Promise<ApiResponse<ProductResponseDto>> {
    return this.productsService.create(user.sub, dto);
  }

  @Patch(':id')
  @Roles(UserRole.SELLER)
  async update(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<ApiResponse<ProductResponseDto>> {
    return this.productsService.update(user.sub, id, dto);
  }
}
```

#### Service Pattern
```typescript
// catalog/products/products.service.ts

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheManager: Cache,
  ) {}

  async findAll(filter: ProductFilterDto): Promise<PaginatedResponse<ProductResponseDto>> {
    const { page = 1, limit = 20, category, search, verified } = filter;

    const where: Prisma.ProductWhereInput = {
      isActive: true,
      ...(category && { category }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(verified && { seller: { nibVerified: true } }),
    };

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: { seller: { select: { businessName: true, slug: true, nibVerified: true } } },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data: products.map(this.toResponseDto),
      message: 'Products retrieved',
      success: true,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
```

#### AI Proxy Pattern
```typescript
// ai-proxy/ai-proxy.service.ts

@Injectable()
export class AIProxyService {
  constructor(
    @Inject(AI_SERVICE_CONFIG) private readonly config: AIServiceConfig,
    private readonly httpService: HttpService,
  ) {}

  async getPreview(text: string, targetLang: string): Promise<AIPreviewResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.config.baseUrl}/ai/preview`,
          { text, target_lang: targetLang, detect_entities: true },
          {
            headers: { 'X-Internal-API-Key': this.config.apiKey },
            timeout: 10000, // 10 detik timeout untuk AI
          },
        ),
      );
      return response.data;
    } catch (error) {
      // Fallback: kembalikan teks asli tanpa AI processing
      this.logger.error('AI Service unavailable', error);
      return {
        original: text,
        formal: text,
        translated: text,
        entities: [],
        requires_price_confirm: false,
        processing_time_ms: 0,
      };
    }
  }
}
```

#### WebSocket Gateway Pattern
```typescript
// chat/chat.gateway.ts

@WebSocketGateway({
  cors: { origin: process.env.FRONTEND_URL },
  namespace: '/chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    // Verify JWT from handshake
    const token = client.handshake.auth.token;
    try {
      const payload = this.jwtService.verify(token);
      client.data.userId = payload.sub;
      // Join user's conversation rooms
      const conversations = await this.chatService.getUserConversations(payload.sub);
      conversations.forEach(conv => client.join(`conversation:${conv.id}`));
    } catch {
      client.disconnect();
    }
  }

  @SubscribeMessage('send_message')
  async handleMessage(
    client: Socket,
    payload: { conversationId: string; text: string; isVoice: boolean },
  ) {
    const message = await this.chatService.createMessage(
      client.data.userId,
      payload,
    );

    // Broadcast to conversation room
    this.server
      .to(`conversation:${payload.conversationId}`)
      .emit('new_message', message);

    return message;
  }
}
```

### 3.5 Konvensi Kode NestJS

```typescript
// ✅ Naming conventions
// Files: kebab-case (NestJS convention)
//   products.controller.ts
//   create-product.dto.ts
//   jwt-auth.guard.ts

// Classes: PascalCase
//   ProductsController
//   CreateProductDto
//   JwtAuthGuard

// ✅ DTO selalu pakai class-validator decorators
import { IsString, IsInt, IsOptional, Min, Max, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Artisan Keycap Dragon Scale' })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({ example: 'Hand-painted artisan keycap dengan desain naga...' })
  @IsString()
  @MinLength(10)
  description: string;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(1)
  moq: number;

  @ApiProperty({ example: 150000 })
  @IsInt()
  @Min(0)
  priceRangeMin: number;

  @ApiProperty({ example: 500000 })
  @IsInt()
  @Min(0)
  priceRangeMax: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  category?: string;
}

// ✅ Response selalu wrapped
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// ✅ Semua endpoint punya Swagger docs
// ✅ Semua mutating endpoint punya RBAC guard
// ✅ Semua input divalidasi via DTO + class-validator
```

### 3.6 Environment Variables

```bash
# .env.example — System Service (NestJS)

# App
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/nusatrade_connect

# JWT
JWT_SECRET=your-jwt-secret-min-32-chars
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your-refresh-secret-min-32-chars
JWT_REFRESH_EXPIRES_IN=7d

# Redis
REDIS_URL=redis://localhost:6379

# AI Service (internal)
AI_SERVICE_URL=http://localhost:8000
AI_SERVICE_API_KEY=internal-api-key-min-32-chars

# OSS API (NIB Verification)
OSS_API_URL=https://oss.go.id/api/v1
OSS_API_KEY=your-oss-api-key

# Payment Gateway (Midtrans Sandbox)
MIDTRANS_SERVER_KEY=SB-Mid-server-xxxxx
MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxxx
MIDTRANS_IS_PRODUCTION=false

# Supabase Storage
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-key

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@nusatrade.id
SMTP_PASS=app-specific-password
```

```bash
# .env.example — AI Service (FastAPI)

# App
ENVIRONMENT=development
PORT=8000

# Internal Auth
INTERNAL_API_KEY=internal-api-key-min-32-chars

# Redis
REDIS_URL=redis://localhost:6379

# LLM Provider
OPENAI_API_KEY=sk-xxxxx
# atau
ANTHROPIC_API_KEY=sk-ant-xxxxx

# LLM Config
LLM_PROVIDER=openai          # openai | anthropic
LLM_MODEL=gpt-4o             # gpt-4o | claude-3-5-sonnet
LLM_MAX_TOKENS=2000
LLM_TEMPERATURE=0.3          # Low temperature untuk konsistensi bisnis

# Whisper
WHISPER_MODEL=whisper-1

# Celery
CELERY_BROKER_URL=redis://localhost:6379/1
CELERY_RESULT_BACKEND=redis://localhost:6379/2
```

---

## 4. API Architecture

### 4.1 Request Flow

```
┌────────────────────────────────────────────────────────────────────┐
│ Client (Next.js Frontend)                                         │
│ ─ Semua request ke NestJS, tidak pernah langsung ke FastAPI       │
└──────────────┬─────────────────────────────────────────────────────┘
               │
               │ HTTPS (public)
               │
┌──────────────▼─────────────────────────────────────────────────────┐
│ NestJS System Service (API Gateway)              PORT: 3001       │
│                                                                    │
│  ┌─ Auth Module ──────── JWT verification, RBAC                    │
│  ├─ Catalog Module ──── Product CRUD, search                       │
│  ├─ Chat Module ──────── Messages, WebSocket                       │
│  ├─ Payment Module ──── Invoice, QRIS, webhook                     │
│  ├─ NIB Module ────────  OSS API proxy + cache                     │
│  ├─ PPJK Module ──────── Directory, reviews                        │
│  ├─ Upload Module ────── File upload, S3                           │
│  └─ AI Proxy Module ─── Forward ke FastAPI ──────────────┐        │
│                                                           │        │
└───────────────────────────────────────────────────────────┼────────┘
                                                            │
                                    HTTP (internal network) │
                                    X-Internal-API-Key      │
                                                            │
┌───────────────────────────────────────────────────────────▼────────┐
│ FastAPI AI Service                               PORT: 8000       │
│                                                                    │
│  ┌─ Tone-Shift ────── Informal → formal bisnis                     │
│  ├─ Translation ────── Multi-bahasa konteks bisnis                 │
│  ├─ Preview ────────── Pipeline gabungan                           │
│  ├─ Speech-to-Text ── Audio → teks                                │
│  └─ Entity Detection ─ Harga, kuantitas, tanggal                  │
│                                                                    │
│  [Redis Cache] ── Cache AI results (1-2 jam TTL)                  │
│  [Celery Queue] ── Async processing untuk request berat           │
└────────────────────────────────────────────────────────────────────┘
```

### 4.2 API Versioning
```
NestJS:  /api/v1/auth/login
         /api/v1/catalog/products
         /api/v1/chat/conversations
         /api/v1/ai/preview        ← proxy ke FastAPI

FastAPI: /ai/tone-shift            ← internal only
         /ai/translate
         /ai/preview
         /health
```

### 4.3 Error Response Standard

```json
// Error response dari NestJS — konsisten di semua endpoint
{
  "success": false,
  "message": "NIB tidak ditemukan. Pastikan format NIB sudah benar (13 digit angka).",
  "error": {
    "code": "NIB_NOT_FOUND",
    "details": {
      "nib": "123456789",
      "suggestion": "Format NIB yang benar: 13 digit angka. Daftar NIB di oss.go.id"
    }
  },
  "statusCode": 404,
  "timestamp": "2026-07-10T16:30:00.000Z"
}
```

---

## 5. Development Workflow

### 5.1 Docker Compose (Development)

```yaml
# docker-compose.yml (root project)
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: nusatrade_connect
      POSTGRES_USER: nusatrade
      POSTGRES_PASSWORD: dev_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  system-service:
    build: ./backend/system-service
    ports:
      - "3001:3001"
    environment:
      - DATABASE_URL=postgresql://nusatrade:dev_password@postgres:5432/nusatrade_connect
      - REDIS_URL=redis://redis:6379
      - AI_SERVICE_URL=http://ai-service:8000
    depends_on:
      - postgres
      - redis

  ai-service:
    build: ./backend/ai-service
    ports:
      - "8000:8000"
    environment:
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
    depends_on:
      - system-service

volumes:
  postgres_data:
```

### 5.2 Running Locally (Tanpa Docker)

```bash
# Terminal 1: PostgreSQL & Redis (via Docker minimal)
docker-compose up postgres redis

# Terminal 2: AI Service
cd backend/ai-service
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# Terminal 3: System Service
cd backend/system-service
npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev

# Terminal 4: Frontend
cd frontend
npm install
npm run dev
```

---

## 6. Testing Strategy

### 6.1 AI Service Testing
```python
# tests/test_tone_shift.py

@pytest.mark.asyncio
async def test_tone_shift_informal_to_formal():
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post("/ai/tone-shift", json={
            "text": "bos mau pesen brp biji?",
        }, headers={"X-Internal-API-Key": "test-key"})

    assert response.status_code == 200
    data = response.json()
    assert data["confidence"] > 0.8
    assert "Anda" in data["corrected"] or "pesan" in data["corrected"]
    assert "bos" not in data["corrected"]
```

### 6.2 System Service Testing
```typescript
// test/catalog.e2e-spec.ts

describe('ProductsController (e2e)', () => {
  it('should allow browsing products without auth', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/catalog/products')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.pagination).toBeDefined();
  });

  it('should require SELLER role to create product', async () => {
    await request(app.getHttpServer())
      .post('/api/v1/catalog/products')
      .set('Authorization', `Bearer ${buyerToken}`)
      .send(createProductDto)
      .expect(403);
  });
});
```

---

## 7. Checklist Sebelum Commit

**Python (AI Service):**
- [ ] Type hints di semua function signatures
- [ ] Pydantic model untuk semua request/response
- [ ] Async functions untuk semua I/O operations
- [ ] Unit test untuk setiap endpoint
- [ ] Ruff linting pass
- [ ] mypy type checking pass
- [ ] Tidak ada hardcoded API keys

**TypeScript (System Service):**
- [ ] DTO dengan class-validator untuk semua input
- [ ] Swagger decorator di semua endpoint
- [ ] RBAC guard di semua mutating endpoints
- [ ] Error handling dengan meaningful messages
- [ ] E2E test untuk critical paths
- [ ] ESLint + Prettier pass
- [ ] Prisma migration up to date
- [ ] Tidak ada hardcoded secrets
