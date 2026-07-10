# Product Requirements Document
## NusaTrade Connect — E-Katalog Ekspor B2B

**Version:** 2.0  
**Team:** TahuTech (S0583)  
**Status:** MVP Development  
**Last Updated:** Juli 2026

---

## 1. Overview

### 1.1 Product Vision
NusaTrade Connect adalah platform E-Katalog Ekspor B2B terpadu yang menghubungkan UMKM menengah sektor ekonomi kreatif Indonesia dengan pembeli internasional melalui tiga pilar utama: verifikasi legalitas otomatis, negosiasi berbantuan AI, dan pembayaran QRIS Antarnegara.

### 1.2 Problem Statement
> *"UMKM Ekonomi Kreatif gagal mendapat pesanan ekspor besar karena pembeli asing ragu — tidak ada etalase resmi terverifikasi, bahasa negosiasi kaku dan informal, dan birokrasi kepabeanan yang membingungkan."*

Pain points tervalidasi (wawancara Keicaps.id / Mas Darmawan):
1. Tidak ada website resmi → pembeli B2B ragu bertransaksi
2. NIB tidak bisa divalidasi mandiri oleh pembeli asing
3. Negosiasi via DM informal → tidak profesional
4. Transfer antarnegara mahal dan lambat
5. Pengurusan dokumen kepabeanan (PEB/PIB) membingungkan
6. Setelah deal pertama, pembeli dan penjual cenderung bypass platform

### 1.3 Solution Summary
Platform end-to-end: Onboarding & NIB Verification → AI Chat Negosiasi → Pembayaran QRIS Antarnegara → Direktori PPJK.

### 1.4 Brand Identity — "Indonesia Goes Global"

| Aspek | Keputusan |
|---|---|
| **Positioning** | Platform ekspor Indonesia ke dunia — bukan marketplace domestik |
| **Differensiator Visual** | Bukan hijau Tokopedia, bukan oranye Shopee, bukan biru korporat |
| **Primary Color** | Emerald Deep `#006B52` — premium, kepercayaan, zamrud Indonesia |
| **Accent Signature** | Gold Ekspor `#C8941A` — ekspor, internasional, prestige |
| **Asosiasi** | Bendera RI (hijau-emas), kepercayaan bisnis, eksotisme nusantara |

---

## 2. User Personas

### Persona 1: Penjual — Mas Darmawan
| Atribut | Detail |
|---|---|
| Nama | Mas Darmawan |
| Usia | 22 tahun |
| Domisili | Jombang, Jawa Timur |
| Bisnis | Keicaps.id — keycaps unik & estetik |
| Legalitas | Sudah memiliki NIB |
| Platform Existing | Tokopedia, Shopee, TikTok Shop, Instagram |
| Pain Point Utama | Trust issue, bahasa Inggris terbatas, birokrasi kepabeanan, biaya transfer mahal |
| Goal | Ekspor B2B ke distributor luar negeri tanpa kerumitan birokrasi |
| Tech Literacy | Medium — terbiasa media sosial dan QRIS domestik |

### Persona 2: Pembeli — International B2B Buyer
| Atribut | Detail |
|---|---|
| Negara | Singapura, Malaysia, Jepang, Tiongkok |
| Profil | Distributor / komunitas hobi / reseller produk kreatif Indonesia |
| Kebutuhan | Verifikasi legalitas penjual, harga transparan, pembayaran mudah |
| Bahasa | Inggris, Mandarin, bahasa lokal |
| Concern Utama | Scam / penipuan, ketidakjelasan legalitas, sulitnya pembayaran lintas negara |

---

## 3. Revenue Model

### 3.1 Sumber Pendapatan Aktif

#### Stream 1: Transaction Fee (Primary Revenue)
- **Mekanisme:** Platform mengenakan service fee atas nilai deal yang berhasil closing di dalam platform — ditagihkan terpisah dari MDR QRIS sebagai biaya layanan digital (verifikasi, dokumentasi, escrow konfirmasi harga).
- **Tarif:** 1.5%–2.5% dari nilai transaksi yang closing (dibayar penjual saat invoice terkonfirmasi)
- **Penting:** Ini bukan potongan dari MDR QRIS (yang sepenuhnya milik ekosistem PJP). Ini adalah platform service fee yang legal dan terpisah.
- **Trigger penagihan:** Saat buyer mengkonfirmasi pembayaran QRIS berhasil (webhook dari PJP)
- **Anti-bypass rationale:** Fee hanya muncul saat deal sukses → tidak ada alasan penjual menghindari sistem karena tidak ada biaya di awal

#### Stream 2: PPJK Subscription Fee (Secondary Revenue)
- **Mekanisme:** Mitra PPJK membayar biaya listing bulanan untuk tampil di direktori platform dan mendapat akses warm leads (UMKM yang sudah deal & siap ekspor)
- **Tarif:** Rp 500.000–Rp 1.500.000 / bulan per PPJK (tergantung tier visibilitas)
- **Catatan penting:** Fee ini ditanggung PPJK sendiri sebagai biaya akuisisi klien (customer acquisition cost pengganti marketing), BUKAN dioper ke UMKM. PPJK untung karena mendapat klien siap-pakai tanpa harus marketing sendiri.
- **Target MVP:** 3–5 mitra PPJK

### 3.2 Revenue Supporting / Masa Depan
- **Premium Settlement:** UMKM yang ingin pencairan dana H+0 membayar biaya settlement lebih cepat (legal karena settlement fee adalah komponen terpisah dari MDR, wajar di industri)
- **Institutional Grant:** Inkubator pemerintah & BI (untuk fase MVP sebelum revenue aktif)

### 3.3 Apa yang GRATIS Selamanya (Anti-Bypass Features)
- Registrasi & verifikasi NIB
- Pembuatan profil E-Katalog
- AI Auto-Correction Chat (teks dan suara) — **tidak ada token/kuota**
- Browsing direktori PPJK
- Ekspor Starter Kit (template Invoice & Packing List)

> **Rationale:** Fitur inti harus gratis tanpa batas agar UMKM tidak punya alasan untuk keluar ke WhatsApp/Instagram DM. Revenue diambil di titik keberhasilan (deal closing), bukan di titik penggunaan harian.

---

## 4. Feature Specifications

### 4.1 Modul Onboarding & Verifikasi NIB
**Priority:** P0 (MVP Core)

#### Flow:
```
UMKM Register → Input NIB → API Hit OSS Kemenkop →
  [Success] → Badge "Verified" + Akses E-Katalog
  [Gagal]   → Pesan error spesifik + link panduan NIB
```

#### Requirements:
- Form registrasi: nama usaha, NIB, kategori produk, foto profil usaha
- Validasi NIB real-time via REST API OSS Kementerian Investasi/BKPM
- Badge "Verified" ditampilkan di profil & katalog (NIB di-mask, hanya status yang visible — lindungi dari identity theft)
- Onboarding max 5 menit — semudah upload foto di Instagram
- Error state: pesan jelas + solusi (misal: "NIB tidak ditemukan → cek format atau daftar di OSS")
- Role: `seller` (UMKM) dan `buyer` (pembeli internasional)

#### API Dependency:
- `GET /oss/api/v1/nib/verify?nib={nomor_nib}` — OSS Kemenkop
- Fallback: caching 24 jam untuk toleransi downtime API pemerintah

---

### 4.2 E-Katalog B2B
**Priority:** P0 (MVP Core)

#### Requirements:
- UMKM dapat membuat profil usaha + listing produk
- Setiap listing: nama produk, foto (max 5), deskripsi, MOQ (minimum order quantity), harga range B2B, kategori
- Filter & search: kategori, negara penjual, status verified, range harga
- Halaman profil UMKM: lencana Verified, deskripsi usaha, produk, riwayat transaksi (agregat anonim)
- Pembeli asing bisa browse tanpa login, tapi harus register untuk memulai chat/negosiasi
- SEO-friendly URL: `/katalog/{slug-umkm}/{slug-produk}`

---

### 4.3 AI Business Chat (Auto-Correction & Translation)
**Priority:** P0 (MVP Core)

#### Flow:
```
Penjual ketik/kirim voice (Bahasa Indonesia kasual)
  → Speech-to-Text (jika voice)
  → LLM Pipeline:
      1. Tone-Shifting: informal → bahasa bisnis ekspor baku
      2. Translation: ID → bahasa buyer (EN/CN/MY/JP)
      3. Entity Recognition: deteksi angka harga → trigger konfirmasi
  → Preview pesan untuk penjual
  → [Konfirmasi] → Kirim ke buyer
```

#### Requirements:
- Native chat dalam platform (tidak redirect ke WA/Telegram)
- Input: teks dan voice
- AI processing: transparan — penjual **selalu melihat preview pesan yang sudah dikoreksi** sebelum dikirim
- Price confirmation pop-up: jika AI mendeteksi angka (harga/kuantitas), wajib konfirmasi sebelum send
- AI gratis unlimited — tidak ada token/kuota/hard limit
- Soft rate limit untuk abuse prevention: 100 pesan/jam per sesi (silent, tidak memblokir)
- Riwayat chat tersimpan dan bisa diexport sebagai dokumen negosiasi (PDF)
- Notifikasi real-time via WebSocket

#### API Dependency:
- Enterprise LLM API (OpenAI/Anthropic/Azure) — prompt engineering untuk tone-shifting
- Speech-to-Text API (Whisper/Google STT)

---

### 4.4 QRIS Antarnegara Payment
**Priority:** P0 (MVP Core)

#### Flow:
```
Deal harga tercapai di chat
  → Penjual klik "Buat Invoice & QR"
  → System generate invoice (otomatis isi dari data katalog & chat)
  → Generate QR Code via Payment Gateway berlisensi BI
  → Buyer scan QR dengan aplikasi lokal (GoPay/DuitNow/PayNow/Alipay)
  → Webhook dari PJP: konfirmasi sukses
  → Platform catat transaksi → trigger platform service fee invoice
  → Platform arahkan ke direktori PPJK
```

#### Requirements:
- Generate invoice otomatis dari data produk + hasil negosiasi
- QR Code dengan countdown timer (expire 24 jam untuk B2B)
- Status tracker: Pending → Paid → Processing → Completed
- Notifikasi sukses/gagal ke penjual dan pembeli
- Platform service fee ditagih terpisah via invoice platform (bukan dipotong dari nilai QRIS)
- Settlement: dana QRIS langsung ke rekening UMKM (sesuai skema PJP), platform fee ditagih T+1
- Aman: seluruh payment flow via Payment Gateway berlisensi BI (tidak handle dana sendiri)

#### API Dependency:
- Payment Gateway (Midtrans/Xendit/Doku) yang mendukung QRIS Antarnegara
- Webhook endpoint untuk payment confirmation

---

### 4.5 Direktori Mitra PPJK
**Priority:** P0 (MVP Core)

#### Requirements:
- Listing PPJK: nama, kota, layanan (PEB, PIB, cukai, logistik), rating, kontak
- Filter: kota, jenis layanan, ketersediaan
- After payment success: sistem otomatis rekomendasi PPJK terdekat/terelevant
- PPJK dapat manage profil mereka (login terpisah sebagai role `ppjk_partner`)
- Review system: UMKM bisa rate PPJK setelah transaksi selesai
- Badge "Verified Partner" untuk PPJK berlisensi Ditjen Bea Cukai

---

### 4.6 Dashboard UMKM
**Priority:** P1 (MVP Support)

#### Requirements:
- Ringkasan: total transaksi, nilai transaksi, produk aktif, chat aktif
- Notifikasi center: inquiry baru, status pembayaran, update PPJK
- Riwayat transaksi dengan status lengkap
- Performa katalog: views, inquiry rate, conversion rate
- Download dokumen: invoice, chat export, packing list template

---

## 5. Non-Functional Requirements

### 5.1 Performance
- Page load (LCP): < 2.5 detik
- AI response (tone-shifting + translation): < 3 detik
- QRIS QR generation: < 1 detik
- API OSS response timeout: 5 detik (dengan fallback caching)

### 5.2 Security
- Auth: JWT dengan refresh token (access token expire 15 menit)
- Role-Based Access Control (RBAC): `seller`, `buyer`, `ppjk_partner`, `admin`
- Data sensitif (NIB, rekening): tidak pernah diekspos ke frontend — di-mask menjadi badge status
- Semua request API external melalui backend proxy (tidak expose key ke client)
- Input sanitization & rate limiting di semua endpoint publik
- HTTPS wajib, TLS 1.2+ minimum
- Password: bcrypt hash, minimum 8 karakter + kompleksitas
- File upload: validasi tipe, max 5MB per file, virus scan
- Audit log untuk semua transaksi finansial

### 5.3 Compliance
- UU Pelindungan Data Pribadi (UU PDP): explicit consent saat registrasi
- Regulasi BI: semua payment via PJP berlisensi, tidak handle dana sendiri
- Ekspor data user hanya dengan consent eksplisit

### 5.4 Reliability
- Target uptime: 99.5% (MVP phase)
- Fallback mode untuk API OSS down: caching last-known + notifikasi admin
- Async processing untuk LLM (tidak block UI)

---

## 6. Tech Stack

### 6.1 Frontend
- **Framework:** Next.js 14+ (App Router, TypeScript)
- **Styling:** Tailwind CSS v4 + CSS Custom Properties
- **State Management:** Zustand (client state), TanStack Query (server state)
- **Real-time:** Socket.io client
- **Form:** React Hook Form + Zod validation
- **Icons:** Lucide React
- **Font:** Plus Jakarta Sans (display), Inter (body), JetBrains Mono (monospace)
- **Testing:** Vitest + Testing Library

### 6.2 Backend — Dual Architecture

Arsitektur backend dibagi menjadi dua service berdasarkan tanggung jawab:

#### 🐍 AI Service (Python — FastAPI)
**Scope:** Semua operasi yang melibatkan AI, NLP, dan ML.

| Komponen | Teknologi |
|---|---|
| **Framework** | FastAPI (Python 3.11+) |
| **AI/LLM** | OpenAI GPT-4o / Anthropic Claude (via LangChain) |
| **Speech-to-Text** | OpenAI Whisper API |
| **Translation** | LLM-based (bukan Google Translate — konteks bisnis lebih akurat) |
| **Tone-Shifting** | Custom prompt engineering pipeline |
| **Entity Detection** | spaCy + regex (deteksi harga, kuantitas, tanggal) |
| **Task Queue** | Redis + Celery (async AI processing) |
| **Cache** | Redis (cache translation & tone-shift results) |
| **Testing** | Pytest + httpx (async test client) |

**Endpoints AI Service:**
- `POST /ai/tone-shift` — koreksi bahasa informal → formal bisnis
- `POST /ai/translate` — terjemahan konteks bisnis multi-bahasa
- `POST /ai/preview` — pipeline gabungan (tone-shift + translate + entity detection)
- `POST /ai/speech-to-text` — konversi audio → teks
- `POST /ai/entity-detect` — deteksi harga & kuantitas dari teks

**Rationale Python untuk AI:** Ekosistem ML/AI Python jauh lebih mature — LangChain, spaCy, Whisper, tiktoken, semua native. Tidak ada alasan menjalankan ini di Node.js.

---

#### ⚙️ System Service (NestJS — TypeScript)
**Scope:** Semua operasi CRUD, autentikasi, bisnis logic, payment, dan real-time.

| Komponen | Teknologi |
|---|---|
| **Framework** | NestJS 10+ (TypeScript, modular architecture) |
| **Database** | PostgreSQL (via Supabase atau self-hosted) |
| **ORM** | Prisma (type-safe, auto-generate types, migration) |
| **Auth** | JWT (access + refresh token) via @nestjs/jwt |
| **Validation** | class-validator + class-transformer |
| **File Storage** | Supabase Storage / AWS S3 |
| **Real-time** | Socket.io (@nestjs/websockets) |
| **Payment** | Midtrans / Xendit SDK (QRIS Antarnegara) |
| **Email** | Nodemailer + template engine |
| **API Docs** | Swagger (@nestjs/swagger — auto-generate) |
| **Rate Limiting** | @nestjs/throttler |
| **Testing** | Jest + Supertest |

**Modules NestJS:**
```
src/
├── auth/          # Login, register, JWT, refresh token, RBAC guard
├── users/         # User management, profile, roles
├── catalog/       # Produk, listing, search, filter
├── chat/          # Chat rooms, messages, WebSocket gateway
├── payment/       # Invoice, QRIS, webhook handler, transaction log
├── ppjk/          # PPJK directory, listing, review
├── nib/           # NIB verification (proxy ke OSS API)
├── notification/  # Push notification, email, in-app
├── upload/        # File upload, validation, S3/Supabase storage
├── common/        # Guards, decorators, pipes, filters, interceptors
└── config/        # Environment config, database config
```

**Rationale NestJS untuk System:**
- **Type-safe end-to-end:** TypeScript di frontend (Next.js) + backend (NestJS) + ORM (Prisma) — shared types tanpa manual sync
- **Modular architecture:** Setiap domain (auth, catalog, chat, payment) adalah module terpisah — scalable dan testable
- **Decorator-based:** Mirip Spring Boot / .NET — RBAC guards, validation pipes, logging interceptors semua deklaratif
- **Prisma integration:** Auto-generate TypeScript types dari schema database — zero drift antara DB dan code
- **WebSocket native:** @nestjs/websockets + Socket.io — cocok untuk real-time chat
- **Enterprise-ready:** Swagger auto-docs, health checks, graceful shutdown, dependency injection

---

#### 🔗 Komunikasi Antar Service

```
┌──────────────┐     HTTP/REST      ┌──────────────┐
│   Frontend   │ ←───────────────→  │  NestJS API  │
│  (Next.js)   │                    │  (System)    │
└──────────────┘                    └──────┬───────┘
                                          │
                                   Internal HTTP
                                   (private network)
                                          │
                                   ┌──────▼───────┐
                                   │  FastAPI      │
                                   │  (AI Service) │
                                   └──────────────┘
```

- **Frontend ↔ NestJS:** Semua request dari client masuk ke NestJS sebagai API Gateway
- **NestJS → FastAPI:** NestJS memanggil AI Service secara internal (private network, tidak exposed ke publik)
- **Shared:** Redis (cache + pub/sub), PostgreSQL (single database, shared schema)
- **Protocol:** REST (HTTP) untuk semua komunikasi — gRPC dipertimbangkan untuk v2 jika latency jadi concern

### 6.3 Infrastructure
- **Database:** PostgreSQL (Supabase managed)
- **Cache/Queue:** Redis (Upstash / self-hosted)
- **File Storage:** Supabase Storage
- **Deployment:** Docker Compose (development), Railway / Fly.io (production)
- **CI/CD:** GitHub Actions
- **Monitoring:** Sentry (error tracking), Prometheus + Grafana (metrics — post-MVP)

### 6.4 External APIs
- OSS Kemenkop API (NIB verification)
- Enterprise LLM API — OpenAI GPT-4o / Anthropic Claude
- Speech-to-Text — OpenAI Whisper API
- Payment Gateway — Midtrans / Xendit (QRIS Antarnegara support)

---

## 7. MVP Scope

### Included in MVP
- [x] Registrasi & verifikasi NIB via OSS API
- [x] E-Katalog (profil UMKM + listing produk)
- [x] AI Auto-Correction Chat (teks + voice)
- [x] Price confirmation pop-up
- [x] QRIS Antarnegara payment (sandbox)
- [x] Direktori PPJK (3–5 mitra)
- [x] Dashboard UMKM basic
- [x] Platform service fee invoicing

### Excluded from MVP (Post-MVP)
- [ ] Dashboard analitik prediktif pasar
- [ ] Live tracking pengiriman (MVP: laporan manual PPJK)
- [ ] Mobile native app (MVP: responsive web)
- [ ] Multi-bahasa UI (MVP: Bahasa Indonesia + English)
- [ ] Seller rating system dari buyer

---

## 8. KPI & Success Metrics

| KPI | Target | Timeframe |
|---|---|---|
| Onboarding Rate (NIB success) | > 85% | Bulan 1 |
| AI Tone-Shifting Accuracy | > 90% | Bulan 3 |
| Transaksi QRIS Sukses | > 10 transaksi | Bulan 6 |
| Total Nilai Transaksi | Rp 50 juta | Bulan 6 |
| PPJK Terintegrasi | 3–5 mitra | Bulan 4 |
| UMKM Terdaftar | 50 UMKM | Bulan 6 |
| Lost Deals Recovery | > 20% | Bulan 6 |
| Retention Rate (repeat transaction di platform) | > 30% | Bulan 6 |

---

## 9. Development Roadmap

### Fase 1: Foundation (Minggu 1–4 Hackathon)
- Backend System (NestJS): setup project, database schema, Prisma, JWT auth, RBAC
- Backend AI (FastAPI): setup project, LLM pipeline, tone-shift + translation endpoints
- Integrasi API OSS (mock/sandbox)
- UI dasar E-Katalog + onboarding UMKM
- AI Chat pipeline (teks, tone-shifting, translation)
- **Deliverable:** Demo end-to-end dari registrasi → katalog → chat → mock payment

### Fase 2: Growth Pilot (Bulan 2–3)
- Integrasi QRIS Antarnegara sandbox (payment gateway nyata)
- Kurasi 3–5 mitra PPJK
- Onboarding 50 UMKM pilot
- UAT bersama komunitas ekraf

### Fase 3: Scale (Bulan 4–6)
- Platform service fee billing system
- Monitoring & analitik basic
- Performance optimization
- Security audit
- Ekspansi PPJK dan UMKM

---

## 10. Risks & Mitigations

| Risiko | Impact | Mitigasi |
|---|---|---|
| API OSS pemerintah down | High | Caching 24 jam + fallback mode |
| LLM latency tinggi untuk voice | Medium | Async processing + streaming response |
| UMKM bypass setelah deal pertama | High | Semua fitur core gratis + value dari PPJK direktori |
| PPJK tidak mau bayar subscription | Medium | Model referral-based + pilot gratis 3 bulan |
| Perubahan regulasi QRIS BI | Medium | Abstraksi payment layer — ganti gateway tanpa ubah core |
| Kompleksitas dual backend | Medium | Docker Compose untuk dev, shared types via OpenAPI spec |

---

## Appendix A: Color System Reference

```
Primary Palette:
  Emerald Deep     #006B52    — Primary actions, branding, trust
  Emerald Hover    #005543    — Hover state primary
  Emerald Light    #E6F5F0    — Background highlight, badges
  Emerald Subtle   #F0FAF6    — Surface alt, sidebar active bg

Accent Palette:
  Gold Ekspor      #C8941A    — CTA accent, premium badge, highlight
  Gold Hover       #A87A15    — Hover state accent
  Gold Light       #FEF9E7    — Background accent highlight
  Gold Subtle      #FFFDF0    — Surface accent alt

Neutral Palette:
  Ink              #0F1A2A    — Heading, primary text
  Charcoal         #384250    — Body text
  Slate            #64748B    — Secondary text, captions
  Mist             #94A3B8    — Muted text, placeholders
  Ash              #E2E8F0    — Borders
  Cloud            #F1F5F9    — Background subtle
  Snow             #F8FAFC    — Page background
  White            #FFFFFF    — Card surface

Status:
  Success          #16A34A    — Verified, payment success
  Success BG       #F0FDF4
  Error            #DC2626    — Validation error, payment fail
  Error BG         #FEF2F2
  Warning          #D97706    — Pending, attention needed
  Warning BG       #FFFBEB
  Info             #2563EB    — Informational, tips
  Info BG          #EFF6FF
```
