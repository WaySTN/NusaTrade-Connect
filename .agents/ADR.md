# Architecture Decision Records — NusaTrade Connect

**Version:** 1.0
**Last Updated:** Juli 2026

---

## ADR-001: Dual Backend Architecture (Python + NestJS)

### Status: Accepted

### Context
NusaTrade Connect memiliki dua kategori workload yang sangat berbeda:
1. **AI/ML workload** — tone-shifting, translation, speech-to-text, entity detection
2. **System workload** — CRUD, authentication, payment, real-time chat

### Decision
Menggunakan **dual backend architecture**:
- **FastAPI (Python)** untuk AI Service — semua operasi AI/ML/NLP
- **NestJS (TypeScript)** untuk System Service — CRUD, auth, payment, WebSocket

### Rationale
- **Python untuk AI:** Ekosistem ML/AI Python mature (LangChain, spaCy, Whisper, tiktoken native). Menjalankan AI pipeline di Node.js akan memaksa wrapper yang suboptimal.
- **NestJS untuk System:** Type-safe end-to-end dengan frontend (TypeScript). Prisma ORM auto-generate types. Modular architecture cocok untuk domain-driven design. WebSocket native.
- **Separation of concerns:** AI Service bisa scale independen dari System Service.

### Consequences
- **Positif:** Best tool for each job, independent scaling, clear domain boundary
- **Negatif:** Kompleksitas deployment (2 service), perlu Docker Compose, latency inter-service HTTP call

### Mitigasi
- Docker Compose untuk development environment
- Internal API key untuk komunikasi antar service
- Graceful fallback jika AI Service down (kirim pesan tanpa AI correction)

---

## ADR-002: Brand Color — Emerald Deep + Gold Ekspor

### Status: Accepted

### Context
Platform ekspor Indonesia ke dunia membutuhkan identitas visual yang unik:
- Bukan hijau Tokopedia (`#03AC0E`)
- Bukan oranye Shopee (`#EE4D2D`)
- Bukan biru korporat generic

### Decision
- **Primary:** Emerald Deep `#006B52` — zamrud Indonesia, lebih gelap dan premium
- **Accent:** Gold Ekspor `#C8941A` — emas kepercayaan internasional

### Rationale
- Kombinasi hijau zamrud + emas memiliki asosiasi kuat dengan Indonesia (bendera, batik, kerajaan) tanpa meniru platform existing
- Emerald Deep cukup gelap untuk WCAG AA contrast pada white background (5.64:1)
- Gold sebagai accent memberi kesan premium dan internasional — cocok untuk B2B

### Consequences
- Gold (`#C8941A`) gagal contrast ratio AA untuk body text pada putih (3.42:1) — hanya boleh untuk dekorasi, ikon, dan large text
- Palette harus konsisten di semua touchpoint (web, email, dokumen)

---

## ADR-003: NestJS sebagai API Gateway (bukan FastAPI)

### Status: Accepted

### Context
Frontend perlu satu entry point untuk semua API calls. Pilihan: FastAPI sebagai gateway, NestJS sebagai gateway, atau API gateway terpisah (Kong/Traefik).

### Decision
NestJS sebagai API Gateway tunggal. Frontend hanya berkomunikasi dengan NestJS.

### Rationale
- NestJS sudah handle 90%+ endpoint (CRUD, auth, payment, chat) — natural sebagai gateway
- AI requests di-proxy via NestJS (`ai-proxy` module) — frontend tidak perlu tahu FastAPI exists
- Satu titik auth verification — token checking di NestJS, bukan di dua tempat
- Menghindari kompleksitas API gateway terpisah (overkill untuk MVP)

### Consequences
- Semua AI requests punya +1 hop (frontend → NestJS → FastAPI) — tambah ~5-10ms latency
- NestJS menjadi single point of failure untuk semua traffic
- Acceptable untuk MVP; evaluasi API gateway terpisah di scale phase

---

## ADR-004: Prisma sebagai ORM (bukan TypeORM/Drizzle)

### Status: Accepted

### Context
NestJS perlu ORM untuk PostgreSQL. Opsi: TypeORM (NestJS default), Prisma, Drizzle, raw SQL.

### Decision
Prisma ORM.

### Rationale
- **Type generation:** `prisma generate` menghasilkan TypeScript types langsung dari schema — zero drift antara DB dan code
- **Migration:** `prisma migrate` lebih predictable dan reversible
- **Query builder:** Prisma Client API lebih intuitif dibanding TypeORM (terutama untuk relasi)
- **Developer experience:** Schema-first approach, visual Studio extension, Prisma Studio untuk inspeksi data

### Consequences
- Prisma belum support semua PostgreSQL features (misalnya: CTEs, recursive queries)
- Untuk query kompleks, gunakan `prisma.$queryRaw` dengan template literals (tetap parameterized)

---

## ADR-005: Shared Database (Single PostgreSQL)

### Status: Accepted

### Context
Dual backend bisa share satu database atau masing-masing punya database sendiri.

### Decision
Single PostgreSQL database, shared oleh NestJS (read-write) dan FastAPI (read-only jika perlu).

### Rationale
- MVP phase — kesederhanaan operasional lebih penting daripada isolation sempurna
- AI Service sebagian besar stateless (tidak perlu akses DB secara reguler)
- Menghindari data synchronization complexity

### Consequences
- Database bisa menjadi bottleneck jika kedua service heavy query bersamaan
- Mitigasi: Redis caching di AI Service, connection pooling
- Evaluasi database-per-service di scale phase

---

## ADR-006: AI Gratis Unlimited (No Token/Quota)

### Status: Accepted

### Context
Fitur AI (tone-shifting, translation) adalah core value proposition. Pilihan: freemium (limit kuota) vs gratis unlimited.

### Decision
AI fitur **gratis unlimited** tanpa token/kuota visible ke user.

### Rationale
- **Anti-bypass:** Jika AI ada kuota, UMKM akan bypass ke WhatsApp setelah kuota habis → platform kehilangan user dan revenue dari transaction fee
- **Competitive moat:** Tidak ada platform lain yang kasih AI business translation gratis
- **Revenue model:** Revenue dari transaction fee (1.5-2.5% per deal), bukan dari AI usage

### Cost Mitigasi
- Redis caching untuk AI results (reduce LLM API calls ~40-60%)
- Soft rate limit: 100 pesan/jam per sesi (silent, tidak memblokir UX)
- Batch processing untuk translation yang sama
- Model fallback: GPT-4o-mini jika cost naik, GPT-4o untuk high-value conversations

---

## ADR-007: QRIS Antarnegara via Payment Gateway (No Self-Processing)

### Status: Accepted

### Context
Platform perlu menerima pembayaran dari buyer internasional via QRIS.

### Decision
Semua payment processing via Payment Gateway berlisensi BI (Midtrans/Xendit). NusaTrade **tidak pernah menyentuh uang user**.

### Rationale
- Regulasi BI: hanya PJP berlisensi yang boleh memproses transaksi QRIS
- Risiko hukum dan operasional sangat tinggi jika self-processing
- Platform hanya generate invoice dan QR code via API — settlement langsung ke rekening UMKM

### Consequences
- Ketergantungan pada availability Payment Gateway
- Platform fee ditagih terpisah (bukan dipotong dari payment) — perlu mekanisme invoice fee
- Mitigasi: abstraksi payment layer agar bisa switch gateway tanpa ubah core logic
