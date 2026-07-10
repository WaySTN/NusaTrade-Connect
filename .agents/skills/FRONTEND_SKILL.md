# Frontend Skill Guide — NusaTrade Connect
## Untuk AI-Native Engineering di `.agents/`

**Framework:** Next.js 14+ (App Router) + TypeScript + Tailwind CSS v4
**Scope:** Semua keputusan UI/UX, struktur kode, dan implementasi frontend

---

## 1. Filosofi Desain

### Prinsip Utama
NusaTrade Connect adalah platform bisnis serius, bukan aplikasi consumer. Tampilannya harus terasa **seperti alat kerja profesional yang dibangun oleh tim berpengalaman** — bukan seperti template SaaS dari Tailwind UI atau hasil generate AI.

**Tiga kata kunci desain:**
- **Substantif** — setiap elemen punya alasan keberadaannya
- **Tenang** — tidak ramai, tidak agresif, tidak oversell
- **Presisi** — spacing, warna, dan tipografi dipilih dengan sadar bukan defaultnya

### Brand Visual: "Indonesia Goes Global"
Platform ekspor Indonesia ke dunia. Bukan marketplace domestik. Warna dipilih secara deliberate:
- **Bukan hijau Tokopedia** (`#03AC0E`) — terlalu consumer, terlalu lokal
- **Bukan oranye Shopee** (`#EE4D2D`) — terlalu playful, terlalu marketplacey
- **Bukan biru korporat** — generic, tidak punya karakter
- **Emerald Deep + Gold Ekspor** — zamrud Indonesia yang premium + emas kepercayaan internasional

### Apa yang Harus Dihindari
Ini adalah tanda-tanda desain terasa "buatan AI" atau template — **jangan lakukan ini:**
- Background krem/warm cream (#F4F1EA) dengan aksen terracotta
- Hero section dengan gradient besar + angka statistik + badge trust
- Card dengan drop shadow tebal di semua tempat
- Border radius bulat berlebihan (> 8px untuk container utama)
- Semua section pakai judul H2 bold di atas + deskripsi abu-abu di bawah
- Animated counter angka saat scroll
- Emoji/ikon di setiap baris teks
- Color palette biru #3B82F6 (Tailwind blue-500) sebagai primary — ini default yang terlalu umum
- Teal generic (#1B6B5A, #0D9488) — sudah terlalu banyak startup yang pakai

### Penempatan Emoji & Ikon
Emoji/ikon **boleh** dipakai tapi hanya di tempat yang secara konteks natural:
- Sidebar navigasi: ikon SVG (bukan emoji)
- Card data di dashboard: ikon kecil sebagai label kategori
- Button logout/destruktif: ikon visual (bukan emoji teks)
- Status badge: ikon ✓ atau ikon dari library (Lucide)
- Toast notification: ikon status (success/error)
- Halaman kosong (empty state): satu ikon besar sebagai ilustrasi
- **Jangan:** emoji di heading, di label form, di paragraph body text, di nav utama

---

## 2. Design System

### 2.1 Color Palette — Emerald Deep × Gold Ekspor

```css
:root {
  /* ═══════════════════════════════════════════════
     PRIMARY — Emerald Deep
     Zamrud Indonesia yang premium. Bukan teal generic,
     bukan hijau Tokopedia. Lebih gelap, lebih serius.
     ═══════════════════════════════════════════════ */
  --color-primary:         #006B52;  /* Emerald Deep — trust, ekspor, Indonesia */
  --color-primary-hover:   #005543;  /* Darker for hover states */
  --color-primary-active:  #004A3A;  /* Pressed/active state */
  --color-primary-light:   #E6F5F0;  /* Background highlight, verified badge bg */
  --color-primary-subtle:  #F0FAF6;  /* Sidebar active bg, table row highlight */

  /* ═══════════════════════════════════════════════
     ACCENT — Gold Ekspor
     Emas kepercayaan internasional. Signature color
     untuk CTA premium, badge, dan highlight penting.
     ═══════════════════════════════════════════════ */
  --color-accent:          #C8941A;  /* Gold Ekspor — premium, prestige */
  --color-accent-hover:    #A87A15;  /* Hover state */
  --color-accent-light:    #FEF9E7;  /* Background accent highlight */
  --color-accent-subtle:   #FFFDF0;  /* Surface accent subtle */

  /* ═══════════════════════════════════════════════
     NEUTRALS — Slate-toned, bukan gray murni
     ═══════════════════════════════════════════════ */
  --color-text-primary:    #0F1A2A;  /* Ink — heading, primary text */
  --color-text-secondary:  #384250;  /* Charcoal — body text */
  --color-text-muted:      #64748B;  /* Slate — secondary text, captions */
  --color-text-placeholder:#94A3B8;  /* Mist — placeholders, muted labels */
  --color-border:          #E2E8F0;  /* Ash — default borders */
  --color-border-strong:   #CBD5E1;  /* Stronger border for emphasis */
  --color-bg-base:         #F8FAFC;  /* Snow — page background */
  --color-bg-surface:      #FFFFFF;  /* White — card/panel surface */
  --color-bg-subtle:       #F1F5F9;  /* Cloud — background subtle, sidebar bg */

  /* ═══════════════════════════════════════════════
     STATUS COLORS
     ═══════════════════════════════════════════════ */
  --color-success:         #16A34A;
  --color-success-light:   #F0FDF4;
  --color-error:           #DC2626;
  --color-error-light:     #FEF2F2;
  --color-warning:         #D97706;
  --color-warning-light:   #FFFBEB;
  --color-info:            #2563EB;
  --color-info-light:      #EFF6FF;

  /* ═══════════════════════════════════════════════
     SEMANTIC — Verified & Special States
     ═══════════════════════════════════════════════ */
  --color-verified:        #006B52;  /* Same as primary — NIB verified badge */
  --color-verified-bg:     #E6F5F0;
  --color-premium:         #C8941A;  /* Gold — premium PPJK, featured listing */
  --color-premium-bg:      #FEF9E7;
}
```

**Kapan pakai Primary vs Accent:**
| Konteks | Warna |
|---|---|
| Primary button (CTA utama) | `--color-primary` (Emerald Deep) |
| Secondary button | Border `--color-primary` + text `--color-primary` |
| Navigation active state | `--color-primary` text + `--color-primary-subtle` bg |
| Badge "Verified NIB" | `--color-verified` + `--color-verified-bg` |
| Badge "Premium Partner" | `--color-premium` + `--color-premium-bg` |
| CTA accent (highlight) | `--color-accent` (Gold Ekspor) |
| Harga & nilai transaksi besar | `--color-text-primary` + font-mono (BUKAN gold) |
| Link text | `--color-primary` |
| Hover link | `--color-primary-hover` |
| Selected tab / active filter | Bottom border `--color-accent` |
| Star rating | `--color-accent` |
| Toast success | `--color-success` |

### 2.2 Typography

```css
:root {
  /* Font stack — Plus Jakarta Sans untuk display, Inter untuk body */
  --font-display: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;

  /* Type Scale */
  --text-xs:   0.75rem;   /* 12px — label kecil, caption */
  --text-sm:   0.875rem;  /* 14px — body kecil, metadata */
  --text-base: 1rem;      /* 16px — body utama */
  --text-lg:   1.125rem;  /* 18px — body besar, subheading */
  --text-xl:   1.25rem;   /* 20px — heading kecil */
  --text-2xl:  1.5rem;    /* 24px — heading section */
  --text-3xl:  1.875rem;  /* 30px — page title */
  --text-4xl:  2.25rem;   /* 36px — hero / angka besar dashboard */

  /* Line Height */
  --leading-tight:  1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;

  /* Font Weight */
  --weight-normal:   400;
  --weight-medium:   500;
  --weight-semibold: 600;
  --weight-bold:     700;
}
```

**Aturan penggunaan font:**
- **Display (`Plus Jakarta Sans`):** H1, H2, H3, angka besar dashboard, nama brand
- **Body (`Inter`):** Paragraf, label, button text, form input
- **Mono (`JetBrains Mono`):** Harga, NIB, nomor invoice, ID transaksi, kode — ini membedakan platform bisnis dari template

### 2.3 Spacing & Layout

```css
:root {
  /* Spacing scale — konsisten, jangan campur px sewenang-wenang */
  --space-0:  0;
  --space-1:  0.25rem;   /* 4px */
  --space-2:  0.5rem;    /* 8px */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-5:  1.25rem;   /* 20px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */

  /* Layout */
  --max-width-content: 1200px;
  --sidebar-width: 260px;
  --sidebar-collapsed-width: 72px;
  --header-height: 64px;
  --content-padding: var(--space-8);  /* 32px */

  /* Border radius — konsisten, tidak berlebihan */
  --radius-sm:   4px;    /* Chip, badge kecil */
  --radius-md:   6px;    /* Button, input */
  --radius-lg:   8px;    /* Card */
  --radius-xl:   12px;   /* Modal, panel besar */
  --radius-2xl:  16px;   /* Dialog besar */
  --radius-full: 9999px; /* Hanya untuk avatar, toggle, pill badge */
}
```

### 2.4 Shadow — Gunakan Hemat

```css
:root {
  /* Shadow minimal — hanya ada 4 level */
  --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.04);
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04);

  /* Penggunaan:
     - Card di dashboard: shadow-xs atau shadow-sm
     - Dropdown, popover: shadow-md
     - Modal, dialog: shadow-lg
     - Jangan pakai shadow untuk hover state card — pakai border color change
     - Sidebar: TIDAK pakai shadow — pakai border-right saja */
}
```

### 2.5 Transition & Animation

```css
:root {
  /* Durasi — tidak ada yang lebih dari 300ms untuk micro-interaction */
  --duration-fast:   100ms;
  --duration-normal: 150ms;
  --duration-slow:   200ms;
  --duration-enter:  250ms;  /* Modal/panel enter */
  --duration-exit:   150ms;  /* Modal/panel exit — lebih cepat dari enter */

  /* Easing */
  --ease-default:    cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in:         cubic-bezier(0.4, 0, 1, 1);
  --ease-out:        cubic-bezier(0, 0, 0.2, 1);
  --ease-bounce:     cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Penggunaan:
   - Button hover/active: duration-fast
   - Border/background color change: duration-normal
   - Sidebar expand/collapse: duration-slow
   - Modal fade-in: duration-enter with ease-out
   - Toast slide-in: duration-enter with ease-bounce (subtle)
   - Jangan: animasi yang block user interaction */
```

---

## 3. Struktur Proyek

```
frontend/src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Route group — halaman auth (no sidebar)
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── register/seller/page.tsx    # Registrasi seller + NIB
│   │   ├── register/buyer/page.tsx     # Registrasi buyer internasional
│   │   └── layout.tsx
│   ├── (dashboard)/              # Route group — halaman setelah login
│   │   ├── katalog/
│   │   │   ├── page.tsx          # Browse katalog (buyer view)
│   │   │   └── [slug]/page.tsx   # Detail produk
│   │   ├── toko/
│   │   │   ├── page.tsx          # Profil toko UMKM (seller view)
│   │   │   └── produk/
│   │   │       ├── page.tsx      # Kelola produk
│   │   │       └── [id]/page.tsx
│   │   ├── chat/
│   │   │   ├── page.tsx          # Inbox chat
│   │   │   └── [conversationId]/page.tsx
│   │   ├── pembayaran/
│   │   │   ├── page.tsx
│   │   │   └── [invoiceId]/page.tsx
│   │   ├── ppjk/page.tsx         # Direktori PPJK
│   │   ├── overview/page.tsx     # Dashboard overview
│   │   └── layout.tsx            # Layout dengan sidebar
│   ├── api/                      # API Routes Next.js (proxy ke backend)
│   │   ├── auth/[...nextauth]/route.ts
│   │   └── proxy/[...path]/route.ts
│   ├── globals.css
│   └── layout.tsx                # Root layout
│
├── components/
│   ├── ui/                       # Komponen dasar — atom
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Toast.tsx
│   │   ├── Skeleton.tsx
│   │   ├── Select.tsx
│   │   ├── Textarea.tsx
│   │   ├── Avatar.tsx
│   │   ├── Tooltip.tsx
│   │   ├── Tabs.tsx
│   │   ├── Dropdown.tsx
│   │   └── index.ts
│   ├── layout/                   # Komponen struktur halaman
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── PageHeader.tsx
│   │   ├── MobileNav.tsx
│   │   └── index.ts
│   ├── katalog/                  # Komponen domain: E-Katalog
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── FilterPanel.tsx
│   │   ├── ProductDetail.tsx
│   │   └── VerifiedBadge.tsx
│   ├── chat/                     # Komponen domain: Chat
│   │   ├── ChatWindow.tsx
│   │   ├── MessageBubble.tsx
│   │   ├── AIPreviewOverlay.tsx  # Preview pesan sebelum send
│   │   ├── PriceConfirmModal.tsx # Pop-up konfirmasi harga
│   │   ├── VoiceRecorder.tsx
│   │   ├── ChatInput.tsx
│   │   └── ChatSidebar.tsx       # List conversations
│   ├── pembayaran/               # Komponen domain: Payment
│   │   ├── QRISDisplay.tsx
│   │   ├── InvoiceCard.tsx
│   │   ├── InvoiceGenerator.tsx
│   │   └── PaymentStatusTracker.tsx
│   ├── ppjk/                     # Komponen domain: PPJK
│   │   ├── PPJKCard.tsx
│   │   └── PPJKDirectory.tsx
│   └── dashboard/                # Komponen domain: Dashboard
│       ├── StatCard.tsx
│       ├── RecentActivity.tsx
│       └── TransactionTable.tsx
│
├── hooks/
│   ├── useAuth.ts
│   ├── useChat.ts                # WebSocket chat management
│   ├── useNIBVerification.ts
│   ├── useQRIS.ts
│   ├── useDebounce.ts
│   └── useMediaQuery.ts
│
├── lib/
│   ├── api/                      # API client layer
│   │   ├── client.ts             # Axios/fetch instance dengan auth header
│   │   ├── auth.ts
│   │   ├── katalog.ts
│   │   ├── chat.ts
│   │   └── payment.ts
│   ├── stores/                   # Zustand stores
│   │   ├── authStore.ts
│   │   ├── chatStore.ts
│   │   └── uiStore.ts
│   ├── validations/              # Zod schemas
│   │   ├── auth.ts
│   │   ├── produk.ts
│   │   └── payment.ts
│   └── utils/
│       ├── format.ts             # formatRupiah, formatDate, dll
│       ├── cn.ts                 # className utility (clsx + twMerge)
│       └── constants.ts
│
├── types/
│   ├── api.ts                    # Response types dari backend
│   ├── domain.ts                 # Domain types (User, Product, Chat, dll)
│   └── index.ts
│
└── middleware.ts                  # Auth middleware Next.js
```

---

## 4. Konvensi Kode

### 4.1 TypeScript

```typescript
// ✅ Selalu definisikan types — jangan pakai `any`
interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  moq: number;
  priceRangeMin: number;  // dalam Rupiah
  priceRangeMax: number;
  images: string[];
  category: ProductCategory;
  seller: SellerProfile;
  isVerified: boolean;
  createdAt: string;      // ISO 8601
}

// ✅ Gunakan const enum untuk nilai tetap
export const enum UserRole {
  SELLER = 'seller',
  BUYER = 'buyer',
  PPJK_PARTNER = 'ppjk_partner',
  ADMIN = 'admin',
}

// ✅ API response wrapper selalu typed
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ✅ Error handling dengan discriminated union
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };
```

### 4.2 Component Pattern

```tsx
// ✅ Struktur komponen yang konsisten
// 1. Import
// 2. Types/interfaces
// 3. Komponen function
// 4. Export

import { type FC } from 'react';
import { formatRupiah } from '@/lib/utils/format';
import { Badge } from '@/components/ui/Badge';
import type { Product } from '@/types/domain';

interface ProductCardProps {
  product: Product;
  onInquiry: (productId: string) => void;
  className?: string;
}

export const ProductCard: FC<ProductCardProps> = ({
  product,
  onInquiry,
  className,
}) => {
  return (
    <article className={cn('product-card', className)}>
      {/* content */}
    </article>
  );
};

// ✅ Jangan default export untuk komponen — gunakan named export
// Kecuali: page.tsx dan layout.tsx (Next.js convention)
```

### 4.3 Tailwind Class Ordering

Ikuti urutan: positioning → display/flex/grid → size → spacing → border → bg → text → effects → interaksi

```tsx
// ✅ Urutan kelas yang konsisten
<div className="
  relative
  flex items-center gap-3
  w-full min-h-[48px]
  px-4 py-3
  border border-[var(--color-border)] rounded-[var(--radius-lg)]
  bg-[var(--color-bg-surface)]
  text-sm text-[var(--color-text-primary)]
  shadow-[var(--shadow-sm)]
  hover:border-[var(--color-border-strong)]
  transition-colors duration-[var(--duration-normal)]
">
```

### 4.4 Naming Conventions

```
Files:
  Component:    PascalCase.tsx     → ProductCard.tsx
  Hook:         camelCase.ts       → useChat.ts
  Utility:      camelCase.ts       → format.ts
  Page:         page.tsx           → (Next.js convention)
  Type file:    camelCase.ts       → domain.ts

Variables:
  Component:    PascalCase         → ProductCard
  Function:     camelCase          → handleSendMessage
  Constant:     SCREAMING_SNAKE    → MAX_FILE_SIZE
  Type/Interface: PascalCase       → ProductCardProps
  Boolean:      is/has/can prefix  → isVerified, hasPermission
```

### 4.5 API Client Pattern

```typescript
// lib/api/client.ts
// ✅ Satu instance axios dengan interceptor auth
import axios from 'axios';
import { useAuthStore } from '@/lib/stores/authStore';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // NestJS backend URL
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Inject token otomatis
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 → refresh token atau redirect login
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // refresh token logic
    }
    return Promise.reject(error);
  }
);

// ✅ Setiap domain punya file API sendiri
// lib/api/chat.ts
export const chatApi = {
  getConversations: () =>
    apiClient.get<ApiResponse<Conversation[]>>('/chats'),

  sendMessage: (conversationId: string, payload: SendMessagePayload) =>
    apiClient.post<ApiResponse<Message>>(`/chats/${conversationId}/messages`, payload),

  // AI endpoints di-proxy melalui NestJS → FastAPI (frontend tidak langsung ke FastAPI)
  getAIPreview: (text: string, targetLang: Language) =>
    apiClient.post<ApiResponse<AIPreviewResult>>('/ai/preview', { text, targetLang }),
};
```

---

## 5. UI Component Guidelines

### 5.1 Button

```tsx
// Gunakan variant — jangan inline style
// Variants: primary | secondary | ghost | danger | accent | link

// ✅ Primary action — Emerald Deep
<Button variant="primary" size="md" onClick={handleSubmit}>
  Kirim Pesan
</Button>

// ✅ Accent action — Gold Ekspor (untuk CTA premium)
<Button variant="accent" size="md">
  Buat Invoice
</Button>

// ✅ Ghost button with icon
<Button variant="ghost" size="sm" leftIcon={<LogOutIcon />}>
  Keluar
</Button>

// ❌ Jangan tulis Tailwind langsung di tempat pemakaian untuk button
<button className="bg-green-600 text-white px-4 py-2 rounded">Kirim</button>
```

### 5.2 Badge Status

```tsx
// Badge hanya untuk: Verified, status transaksi, role user
// Jangan pakai badge untuk dekorasi

// ✅ Status verified NIB — Emerald Deep
<Badge variant="verified">
  <CheckIcon size={12} />
  Terverifikasi
</Badge>

// ✅ Premium partner badge — Gold Ekspor
<Badge variant="premium">
  <ShieldCheckIcon size={12} />
  Verified Partner
</Badge>

// ✅ Status transaksi
<Badge variant="pending">Menunggu Pembayaran</Badge>
<Badge variant="success">Lunas</Badge>
<Badge variant="processing">Diproses PPJK</Badge>
```

### 5.3 Form & Input

```tsx
// ✅ Selalu pair label + input + error message
// Jangan placeholder sebagai pengganti label

<div className="form-field">
  <label htmlFor="nib" className="form-label">
    Nomor Induk Berusaha (NIB)
  </label>
  <input
    id="nib"
    type="text"
    placeholder="Contoh: 1234567890123"
    aria-describedby="nib-error"
    className={cn('form-input', errors.nib && 'form-input--error')}
    {...register('nib')}
  />
  {errors.nib && (
    <p id="nib-error" className="form-error" role="alert">
      {errors.nib.message}
    </p>
  )}
</div>
```

### 5.4 Empty States

```tsx
// ✅ Empty state yang informatif dan actionable
<EmptyState
  icon={<PackageIcon size={40} />}
  title="Belum ada produk"
  description="Mulai tambahkan produk ke katalog agar pembeli internasional bisa menemukanmu."
  action={<Button variant="primary">Tambah Produk Pertama</Button>}
/>
```

### 5.5 Loading States

```tsx
// ✅ Skeleton loading — bukan spinner di tengah halaman untuk konten
// Spinner hanya untuk: button submit, full-page blocking action

// Untuk list/card: skeleton
<ProductCard.Skeleton />

// Untuk button saat submit
<Button isLoading={isSubmitting}>
  {isSubmitting ? 'Memverifikasi...' : 'Daftar Sekarang'}
</Button>
```

---

## 6. Chat UI — Aturan Khusus

Chat adalah fitur inti — implementasinya harus benar.

### 6.1 AI Preview Flow

```tsx
// Alur pesan: ketik → preview AI → konfirmasi → kirim
// Jangan langsung kirim tanpa preview

const ChatInput = () => {
  const [draft, setDraft] = useState('');
  const [preview, setPreview] = useState<AIPreviewResult | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handlePreviewRequest = async () => {
    // Ambil preview dari AI sebelum show ke user
    // Route: Frontend → NestJS → FastAPI AI Service
    const result = await chatApi.getAIPreview(draft, targetLanguage);
    setPreview(result.data);
    setShowPreview(true);
  };

  // User lihat preview → konfirmasi → baru kirim
};

// Preview overlay menampilkan:
// - Teks asli (Indonesia informal)
// - Teks yang sudah dikoreksi (formal)
// - Teks yang sudah diterjemahkan (bahasa buyer)
// - Tombol "Kirim" dan "Edit Ulang"
```

### 6.2 Price Confirmation

```tsx
// Jika AI detect angka harga dalam pesan → wajib konfirmasi
const PriceConfirmModal = ({ detectedPrice, onConfirm, onEdit }) => (
  <Modal title="Konfirmasi Harga">
    <p className="text-[var(--color-text-secondary)]">
      Sistem mendeteksi angka harga dalam pesanmu:
    </p>
    <p className="text-2xl font-mono font-semibold text-[var(--color-text-primary)] mt-2">
      {formatRupiah(detectedPrice)}
    </p>
    <p className="text-sm text-[var(--color-text-muted)] mt-1">
      Pastikan ini sudah benar sebelum dikirim ke buyer.
    </p>
    <div className="flex gap-3 mt-6">
      <Button variant="ghost" onClick={onEdit}>Edit Pesan</Button>
      <Button variant="primary" onClick={onConfirm}>Ya, Kirim</Button>
    </div>
  </Modal>
);
```

### 6.3 Message Bubbles

```tsx
// Tampilkan teks yang sudah dikoreksi AI — bukan teks mentah asli
// Tapi sediakan tombol kecil "Lihat teks asli" untuk transparansi

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

// Visual:
// - Bubble kanan (own): bg Emerald Deep subtle, border left Emerald Deep
// - Bubble kiri (other): bg white, border default
// - Timestamp: hanya jam:menit
// - Read status: centang abu = terkirim, centang Emerald = dibaca
```

---

## 7. Security di Frontend

```typescript
// 7.1 Jangan pernah simpan data sensitif di localStorage
// ✅ Gunakan httpOnly cookie untuk token (diset oleh NestJS backend)
// ✅ Zustand hanya untuk state session non-sensitif (user display name, role)

// 7.2 Environment variables
// NEXT_PUBLIC_* → hanya untuk yang benar-benar boleh publik (API base URL)
// Secret keys → tidak pernah di frontend, selalu di backend

// 7.3 Sanitasi output HTML
import DOMPurify from 'dompurify';
const safeHTML = DOMPurify.sanitize(userInputHTML);

// 7.4 CSRF protection
// Gunakan SameSite=Strict pada cookie auth
// Untuk mutating requests, sertakan CSRF token dari header

// 7.5 Input validation — selalu di kedua sisi
// Frontend: Zod schema validation (untuk UX feedback cepat)
// Backend: NestJS class-validator validasi ulang (jangan percaya client)

// 7.6 File upload
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const validateFile = (file: File) => {
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    throw new Error('Format file tidak didukung');
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('Ukuran file melebihi 5MB');
  }
};
```

---

## 8. Performance

```typescript
// 8.1 Image optimization — selalu pakai next/image
import Image from 'next/image';

<Image
  src={product.images[0]}
  alt={`Foto ${product.name}`}
  width={320}
  height={240}
  className="object-cover"
  loading="lazy"
/>

// 8.2 Code splitting — lazy load komponen berat
const ChatWindow = dynamic(() => import('@/components/chat/ChatWindow'), {
  loading: () => <ChatWindow.Skeleton />,
});

// 8.3 TanStack Query — caching & stale time yang wajar
const { data: products } = useQuery({
  queryKey: ['products', filters],
  queryFn: () => katalogApi.getProducts(filters),
  staleTime: 5 * 60 * 1000, // 5 menit
});

// 8.4 Debounce search input
const debouncedSearch = useDebounce(searchQuery, 300);
```

---

## 9. Accessibility (a11y)

```tsx
// Minimum yang wajib dipenuhi:
// 9.1 Semua gambar punya alt text yang deskriptif
// 9.2 Form fields selalu punya label (bukan hanya placeholder)
// 9.3 Focus visible — jangan hapus outline focus, pakai custom focus ring:
//     focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2
// 9.4 Warna: contrast ratio minimum 4.5:1 untuk text
//     ✅ #006B52 on #FFFFFF = 5.64:1 (PASS AA)
//     ✅ #0F1A2A on #FFFFFF = 16.4:1 (PASS AAA)
//     ✅ #C8941A on #FFFFFF = 3.42:1 (FAIL — hanya untuk dekoratif, BUKAN text body)
// 9.5 Keyboard navigable — semua aksi bisa tanpa mouse
// 9.6 ARIA labels untuk ikon tanpa teks

<button aria-label="Hapus produk">
  <TrashIcon size={16} />
</button>

// 9.7 Error messages terhubung ke input via aria-describedby
// 9.8 Modal: focus trap + ESC untuk close + aria-modal="true"
// 9.9 Loading states: aria-busy="true" + sr-only text
```

> **PENTING:** Gold Ekspor (`#C8941A`) gagal contrast ratio AA untuk body text pada background putih. Gunakan HANYA untuk:
> - Ikon dekoratif (bintang rating, badge icon)
> - Border/underline accent
> - Background subtle (`--color-accent-light` / `--color-accent-subtle`)
> - Large text (heading ≥ 18px bold — lolos AA Large Text 3:1)
>
> Untuk text di atas background putih, gunakan `--color-text-primary` atau `--color-primary`.

---

## 10. Layout: Sidebar + Content Area

```tsx
// Struktur layout dashboard yang konsisten
// Sidebar: 260px fixed — navigasi utama, collapsible ke 72px
// Content: flex-1, max-width 1200px, padding 32px

// Sidebar items:
const SIDEBAR_NAV = [
  { href: '/overview',    icon: LayoutDashboardIcon, label: 'Overview' },
  { href: '/katalog',     icon: StoreIcon,           label: 'E-Katalog' },
  { href: '/chat',        icon: MessageSquareIcon,   label: 'Chat Negosiasi' },
  { href: '/pembayaran',  icon: CreditCardIcon,      label: 'Pembayaran' },
  { href: '/ppjk',        icon: TruckIcon,           label: 'Mitra PPJK' },
  { href: '/toko',        icon: SettingsIcon,        label: 'Kelola Toko' },
] as const;

// Sidebar styling:
// - Background: --color-bg-subtle (#F1F5F9)
// - Active item: --color-primary text + --color-primary-subtle bg + left border 3px --color-primary
// - Hover: --color-bg-base
// - Border right: --color-border
// - NO shadow on sidebar

// Header:
// - Height: 64px
// - Background: --color-bg-surface
// - Border bottom: --color-border
// - Contains: breadcrumb, notification bell, user avatar
```

---

## 11. Format Angka & Tanggal

```typescript
// Konsisten di seluruh aplikasi — import dari satu tempat

// lib/utils/format.ts

export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};
// Output: "Rp 5.000.000"

export const formatUSD = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};
// Output: "$5,000.00"

export const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateString));
};
// Output: "15 Juli 2026"

export const formatRelativeTime = (dateString: string): string => {
  // Gunakan date-fns formatDistanceToNow dengan locale id
  // Output: "3 menit yang lalu", "kemarin"
};

// Angka harga SELALU pakai font-mono di JSX:
<span className="font-mono font-medium">
  {formatRupiah(product.priceRangeMin)}
</span>
```

---

## 12. Error Handling Pattern

```tsx
// 12.1 API errors — tampilkan pesan yang helpful
const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? 'Terjadi kesalahan. Coba lagi.';
  }
  return 'Terjadi kesalahan tidak terduga.';
};

// 12.2 Error boundary untuk crash prevention
// Wrap section besar dengan ErrorBoundary

// 12.3 Toast untuk notifikasi ringan (success/error action)
// Modal untuk error yang butuh aksi user
// Inline error untuk form validation

// 12.4 Pesan error harus actionable:
// ❌ "Error 500"
// ❌ "Something went wrong"
// ✅ "NIB tidak ditemukan. Pastikan format NIB sudah benar (13 digit angka)."
// ✅ "Koneksi gagal. Periksa internet dan coba lagi."
```

---

## 13. Responsive Breakpoints

```css
/* Tailwind v4 default breakpoints — gunakan konsisten */
/* sm: 640px   — mobile landscape */
/* md: 768px   — tablet portrait */
/* lg: 1024px  — tablet landscape / small desktop */
/* xl: 1280px  — desktop */
/* 2xl: 1536px — large desktop */

/* Aturan:
   - Mobile-first: tulis default untuk mobile, override ke atas
   - Sidebar: hidden di < lg, tampil di ≥ lg
   - Content grid: 1 col mobile, 2 col tablet, 3-4 col desktop
   - Chat: full-screen di mobile (hide sidebar), split view di desktop
   - Modal: full-screen di mobile, centered dialog di ≥ md */
```

---

## 14. Checklist Sebelum Commit

**Kode:**
- [ ] Tidak ada `any` type di TypeScript
- [ ] Tidak ada `console.log` tersisa (kecuali dev-only dengan guard)
- [ ] Semua props komponen typed dengan interface
- [ ] Import diurutkan: external → internal → relative
- [ ] Tidak ada inline style kecuali nilai dinamis

**UI/UX:**
- [ ] Warna pakai CSS variables (bukan hardcode hex)
- [ ] Semua gambar punya `alt` text
- [ ] Semua form punya label
- [ ] Error state dengan pesan jelas
- [ ] Loading state untuk semua async action
- [ ] Empty state informatif + CTA
- [ ] Responsive sampai 375px

**Security:**
- [ ] Tidak ada secret/API key di kode frontend
- [ ] File upload divalidasi tipe dan ukuran
- [ ] User-generated content di-sanitize

**Performa:**
- [ ] Gambar pakai `next/image`
- [ ] Komponen berat di-lazy load
- [ ] Dependency array useEffect/useCallback benar
