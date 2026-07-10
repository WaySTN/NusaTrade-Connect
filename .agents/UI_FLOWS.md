# UI Flow & User Journey — NusaTrade Connect
## Alur Interaksi User dari Awal hingga Transaksi Selesai

**Purpose:** Dokumen ini menjelaskan flow navigasi, state transitions, dan user experience secara end-to-end.

---

## 1. Master User Journey Map

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│  ┌────────┐    ┌──────────┐    ┌──────────┐    ┌───────────┐    ┌───────────┐  │
│  │DISCOVER│───→│ REGISTER │───→│ ONBOARD  │───→│ TRANSACT  │───→│ COMPLETE  │  │
│  │        │    │          │    │          │    │           │    │           │  │
│  │Landing │    │Daftar    │    │Verifikasi│    │Katalog    │    │Pembayaran │  │
│  │Page    │    │Akun      │    │NIB +     │    │Chat AI    │    │QRIS +     │  │
│  │Katalog │    │          │    │Profil    │    │Invoice    │    │PPJK       │  │
│  │Browse  │    │          │    │          │    │           │    │           │  │
│  └────────┘    └──────────┘    └──────────┘    └───────────┘    └───────────┘  │
│                                                                                 │
│  Waktu       <5 menit        <5 menit       Ongoing         Per transaksi      │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Flow: Seller Onboarding

```
┌───────────────────────────────────────────────────────────────────────────┐
│                                                                           │
│  Landing Page                                                             │
│       │                                                                   │
│       ▼                                                                   │
│  [Daftar Sebagai UMKM] ← CTA button                                     │
│       │                                                                   │
│       ▼                                                                   │
│  ┌─────────────────┐                                                     │
│  │ STEP 1: Akun    │                                                     │
│  │                 │                                                     │
│  │ Email ────────  │   Validasi:                                         │
│  │ Password ─────  │   - Email format valid                              │
│  │ Konfirmasi ───  │   - Password min 8 chars, upper+lower+number       │
│  │                 │   - Konfirmasi = Password                           │
│  │ [Lanjut →]      │                                                     │
│  └────────┬────────┘                                                     │
│           │                                                               │
│           ▼                                                               │
│  ┌─────────────────┐                                                     │
│  │ STEP 2: Usaha   │                                                     │
│  │                 │                                                     │
│  │ Nama Usaha ───  │   Validasi:                                         │
│  │ Kota ─────────  │   - Nama usaha min 3 karakter                      │
│  │ Provinsi ─────  │   - Kategori minimal 1                             │
│  │ Kategori ▾ ───  │                                                     │
│  │ Foto Profil ──  │   Upload foto:                                      │
│  │                 │   - Preview setelah pilih                            │
│  │ [← Kembali]     │   - Crop square                                     │
│  │ [Lanjut →]      │   - Max 5MB, JPG/PNG                               │
│  └────────┬────────┘                                                     │
│           │                                                               │
│           ▼                                                               │
│  ┌─────────────────┐                                                     │
│  │ STEP 3: NIB     │                                                     │
│  │                 │                                                     │
│  │ NIB ──────────  │   ┌─── Verifikasi ────────────────────┐            │
│  │ [Verifikasi]    │   │                                    │            │
│  │                 │   │  Input NIB                         │            │
│  │ atau            │   │     │                              │            │
│  │ [Lewati →]      │   │     ▼                              │            │
│  │                 │   │  Loading spinner (2-5 detik)       │            │
│  └────────┬────────┘   │     │                              │            │
│           │            │     ├── ✅ Success ───────────┐    │            │
│           │            │     │   "NIB Terverifikasi!"  │    │            │
│           │            │     │   Badge aktif           │    │            │
│           │            │     │   [Lanjut ke Dashboard] │    │            │
│           │            │     │                         │    │            │
│           │            │     ├── ❌ Not Found ─────────┤    │            │
│           │            │     │   "NIB tidak ditemukan"  │    │            │
│           │            │     │   "Pastikan format 13    │    │            │
│           │            │     │    digit. Daftar di      │    │            │
│           │            │     │    oss.go.id"            │    │            │
│           │            │     │   [Coba Lagi] [Lewati]   │    │            │
│           │            │     │                         │    │            │
│           │            │     └── ⚠️ Service Down ──────┤    │            │
│           │            │         "Layanan OSS sedang    │    │            │
│           │            │          tidak tersedia"       │    │            │
│           │            │         [Coba Lagi Nanti]      │    │            │
│           │            │         [Lewati]               │    │            │
│           │            └────────────────────────────────┘    │            │
│           │                                                               │
│           ▼                                                               │
│  ┌─────────────────┐                                                     │
│  │ ✅ SELESAI      │                                                     │
│  │                 │                                                     │
│  │ Redirect ke     │   Tampilkan toast success:                          │
│  │ Dashboard       │   "Selamat datang di NusaTrade Connect!"            │
│  │ Overview        │                                                     │
│  └─────────────────┘   Jika NIB verified: badge aktif di profil          │
│                        Jika NIB skipped: reminder banner di dashboard    │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
```

### NIB Reminder Banner (jika di-skip)

```
Dashboard top:
┌──────────────────────────────────────────────────────────────────┐
│  ⚠️  NIB belum diverifikasi. Pembeli tidak dapat melihat       │
│     badge terverifikasi di profil toko Anda.                    │
│     [Verifikasi Sekarang]                                [✕]   │
│                                                                  │
│  bg: #FFFBEB, border 1px #D97706 20%, border-left 4px #D97706  │
│  text: 14px #384250, link: #006B52                               │
│  Dismissible: ✕ button, tapi muncul lagi besoknya               │
└──────────────────────────────────────────────────────────────────┘
```

---

## 3. Flow: Buyer Onboarding

```
┌───────────────────────────────────────────────────────────────┐
│                                                               │
│  Landing Page / Katalog Browse                                │
│       │                                                       │
│       ▼                                                       │
│  [Hubungi Penjual] atau [Daftar] ← trigger                  │
│       │                                                       │
│       ▼                                                       │
│  ┌─────────────────┐                                         │
│  │ Register Buyer  │                                         │
│  │                 │                                         │
│  │ Email ────────  │   Simpler than seller (no NIB,          │
│  │ Password ─────  │   no business profile setup)            │
│  │ Nama / Company  │                                         │
│  │ Negara ▾ ─────  │   Country affects:                      │
│  │ Bahasa ▾ ─────  │   - Default chat translation target     │
│  │                 │   - Preferred currency display           │
│  │ [Daftar]        │                                         │
│  └────────┬────────┘                                         │
│           │                                                   │
│           ▼                                                   │
│  Dashboard → Langsung bisa browse katalog & chat              │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

---

## 4. Flow: AI Chat Negosiasi (Core Flow)

```
┌───────────────────────────────────────────────────────────────────────────┐
│                                                                           │
│  SELLER opens chat with BUYER (or vice versa)                            │
│       │                                                                   │
│       ▼                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐         │
│  │                     CHAT WINDOW                              │         │
│  │                                                             │         │
│  │  Seller types message (Indonesian informal)                  │         │
│  │  ┌───────────────────────────────────────────┐              │         │
│  │  │ "bos mau pesen brp biji? kalo 200 gw     │              │         │
│  │  │  kasih 350rb per biji deh"                │              │         │
│  │  └───────────────────────────────────┬───────┘              │         │
│  │                                      │                      │         │
│  │                                      ▼                      │         │
│  │  Seller clicks Send (➤) button                              │         │
│  │       │                                                     │         │
│  │       ▼                                                     │         │
│  │  ┌─ AI PROCESSING ────────────────────────────────────┐    │         │
│  │  │                                                     │    │         │
│  │  │  Request ke backend: POST /ai/preview               │    │         │
│  │  │  Loading: shimmer di preview area (1-3 detik)       │    │         │
│  │  │                                                     │    │         │
│  │  │  Pipeline:                                          │    │         │
│  │  │  1. Tone-shift: informal → formal bisnis            │    │         │
│  │  │  2. Translate: ID → EN (buyer's language)           │    │         │
│  │  │  3. Entity detect: menemukan "350rb" → Rp 350.000   │    │         │
│  │  │                                                     │    │         │
│  │  └──────────────────────────────┬──────────────────────┘    │         │
│  │                                 │                           │         │
│  │                                 ▼                           │         │
│  │  ┌─ AI PREVIEW OVERLAY (slide up from bottom) ──────────┐  │         │
│  │  │                                                       │  │         │
│  │  │  Preview Pesan                            [✕ Tutup]  │  │         │
│  │  │                                                       │  │         │
│  │  │  Asli:                                                │  │         │
│  │  │  "bos mau pesen brp biji? kalo 200 gw kasih..."      │  │         │
│  │  │                                                       │  │         │
│  │  │       ↓ (gold arrow)                                  │  │         │
│  │  │                                                       │  │         │
│  │  │  Bahasa Bisnis:                                       │  │         │
│  │  │  "Berapa jumlah yang ingin Anda pesan? Untuk          │  │         │
│  │  │   pemesanan 200 unit, kami dapat menawarkan            │  │         │
│  │  │   harga Rp 350.000 per unit."                         │  │         │
│  │  │                                                       │  │         │
│  │  │       ↓ (gold arrow)                                  │  │         │
│  │  │                                                       │  │         │
│  │  │  English:                                             │  │         │
│  │  │  "How many units would you like to order? For an      │  │         │
│  │  │   order of 200 units, we can offer a price of         │  │         │
│  │  │   IDR 350,000 per unit."                              │  │         │
│  │  │                                                       │  │         │
│  │  │  [Edit Ulang]              [Kirim Pesan →]            │  │         │
│  │  │                                                       │  │         │
│  │  └───────────────────────┬───────────────────────────────┘  │         │
│  │                          │                                  │         │
│  │          ┌───────────────┤                                  │         │
│  │          │               │                                  │         │
│  │          ▼               ▼                                  │         │
│  │                                                             │         │
│  │   [Edit Ulang]    [Kirim Pesan]                             │         │
│  │        │                │                                   │         │
│  │        ▼                │                                   │         │
│  │   Close overlay,       │                                   │         │
│  │   focus back to        │                                   │         │
│  │   input field          │                                   │         │
│  │                        ▼                                   │         │
│  │              ┌─── HARGA TERDETEKSI? ───┐                   │         │
│  │              │                          │                   │         │
│  │          YA (Rp 350.000)            TIDAK                  │         │
│  │              │                          │                   │         │
│  │              ▼                          │                   │         │
│  │    ┌─ PRICE CONFIRM MODAL ─┐           │                   │         │
│  │    │                        │           │                   │         │
│  │    │  ⚠️ Konfirmasi Harga  │           │                   │         │
│  │    │                        │           │                   │         │
│  │    │  Rp 350.000 / unit    │           │                   │         │
│  │    │  × 200 unit            │           │                   │         │
│  │    │  Total: Rp 70.000.000 │           │                   │         │
│  │    │                        │           │                   │         │
│  │    │  [Edit]  [Ya, Kirim ✓]│           │                   │         │
│  │    │                        │           │                   │         │
│  │    └──────┬─────────────────┘           │                   │         │
│  │           │                             │                   │         │
│  │           ▼                             ▼                   │         │
│  │    ┌─── KIRIM PESAN ──────────────────────────┐            │         │
│  │    │                                           │            │         │
│  │    │  WebSocket: emit 'send_message'           │            │         │
│  │    │  Store: original + corrected + translated  │            │         │
│  │    │  UI: pesan muncul di bubble (kanan)        │            │         │
│  │    │  Badge: "🔄 Dikoreksi AI" di bubble       │            │         │
│  │    │  Read receipt: ✓ (terkirim)                │            │         │
│  │    │                                           │            │         │
│  │    │  Buyer receives → sees translated text     │            │         │
│  │    │  Buyer reads → ✓✓ (dibaca, hijau)         │            │         │
│  │    │                                           │            │         │
│  │    └───────────────────────────────────────────┘            │         │
│  │                                                             │         │
│  └─────────────────────────────────────────────────────────────┘         │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Flow: Voice Message

```
┌───────────────────────────────────────────────────────────────┐
│                                                               │
│  Seller taps 🎤 mic button in chat input                     │
│       │                                                       │
│       ▼                                                       │
│  ┌─ RECORDING STATE ─────────────────────────────┐           │
│  │                                                │           │
│  │  Mic button → red with pulse animation         │           │
│  │  Timer starts: 00:00 → counting up             │           │
│  │  Audio waveform bars appear                     │           │
│  │  Input text placeholder: "Merekam..."           │           │
│  │  Max duration: 2 menit                          │           │
│  │                                                │           │
│  │  [■ Stop] ← tap to stop                        │           │
│  │                                                │           │
│  └────────────────────────────┬───────────────────┘           │
│                               │                               │
│                               ▼                               │
│  ┌─ PROCESSING ─────────────────────────────────┐            │
│  │                                               │            │
│  │  1. Upload audio → POST /upload/audio         │            │
│  │  2. Speech-to-Text → POST /ai/speech-to-text  │            │
│  │  3. Result text populates input field          │            │
│  │                                               │            │
│  │  UI: spinner in input area, "Mengolah audio..." │            │
│  │                                               │            │
│  └──────────────────────────┬────────────────────┘            │
│                              │                                │
│                              ▼                                │
│  ┌─ TEXT IN INPUT ──────────────────────────────┐             │
│  │                                               │             │
│  │  Recognized text appears in chat input        │             │
│  │  Seller can edit before sending               │             │
│  │  Then normal send flow (AI preview, etc.)     │             │
│  │                                               │             │
│  │  [Send ➤] → triggers AI preview like normal   │             │
│  │                                               │             │
│  └───────────────────────────────────────────────┘             │
│                                                               │
│  Error states:                                                │
│  - Mic permission denied: toast "Izinkan akses mikrofon"     │
│  - Audio too short (<1s): toast "Rekaman terlalu pendek"      │
│  - STT failed: toast "Gagal mengenali suara. Coba ketik."    │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

---

## 6. Flow: Payment & Invoice

```
┌───────────────────────────────────────────────────────────────────────────┐
│                                                                           │
│  Deal harga tercapai di chat                                             │
│       │                                                                   │
│       ▼                                                                   │
│  Seller clicks [Buat Invoice & QR] button in chat                        │
│  ← Button muncul di chat header saat percakapan                          │
│     sudah ada angka harga yang di-confirm                                │
│       │                                                                   │
│       ▼                                                                   │
│  ┌─ INVOICE GENERATOR (Side Panel / Modal) ──────────────────┐          │
│  │                                                            │          │
│  │  Buat Invoice                                              │          │
│  │                                                            │          │
│  │  Pembeli: PT. Tech Distributors (SG) ← auto-filled        │          │
│  │                                                            │          │
│  │  ── Item ──────────────────────────────────────            │          │
│  │  Produk: [Artisan Keycap Dragon Scale ▾]                   │          │
│  │  ← dropdown from seller's product catalog                 │          │
│  │                                                            │          │
│  │  Jumlah:  [200    ]  unit                                 │          │
│  │  Harga:   [350.000]  /unit  ← auto dari chat detected     │          │
│  │                                                            │          │
│  │  [+ Tambah Item]                                           │          │
│  │                                                            │          │
│  │  ── Ringkasan ─────────────────────────────────            │          │
│  │  Subtotal:     Rp 70.000.000                               │          │
│  │  Service Fee:   Rp  1.400.000  (2%)                       │          │
│  │  ───────────────────────────                               │          │
│  │  Total:        Rp 71.400.000                               │          │
│  │  ← font-mono, semibold                                    │          │
│  │                                                            │          │
│  │  Catatan (opsional):                                       │          │
│  │  [                                        ]                │          │
│  │                                                            │          │
│  │  [Batal]                     [Generate QR & Kirim]         │          │
│  │  ghost                       primary + accent gradient     │          │
│  │                                                            │          │
│  └─────────────────────────────────┬──────────────────────────┘          │
│                                    │                                      │
│                                    ▼                                      │
│  ┌─ PROCESSING ─────────────────────────────────────────────┐            │
│  │  Loading: "Membuat invoice dan QR code..."                │            │
│  │  POST /payment/invoices                                   │            │
│  │  Response: invoice data + QRIS payload                    │            │
│  └──────────────────────────────────┬────────────────────────┘            │
│                                     │                                     │
│                                     ▼                                     │
│  ┌─ INVOICE CREATED ────────────────────────────────────────┐            │
│  │                                                           │            │
│  │  ✅ Invoice berhasil dibuat!                              │            │
│  │                                                           │            │
│  │  INV-2026-A3X7K9M2                                       │            │
│  │  ← font-mono, copy button                                │            │
│  │                                                           │            │
│  │  QR Code sudah dikirim ke chat.                           │            │
│  │  Buyer dapat scan untuk membayar.                         │            │
│  │                                                           │            │
│  │  [Lihat Invoice] [Kembali ke Chat]                       │            │
│  │                                                           │            │
│  └───────────────────────────────────────────────────────────┘            │
│                                                                           │
│  Invoice juga muncul di chat sebagai card message:                       │
│  ┌─ INVOICE CARD (in chat) ─────────────────────────────────┐            │
│  │                                                           │            │
│  │  📄 Invoice INV-2026-A3X7K9M2                            │            │
│  │                                                           │            │
│  │  Artisan Keycap Dragon Scale × 200                        │            │
│  │  Total: Rp 71.400.000                                     │            │
│  │  ● Menunggu Pembayaran                                    │            │
│  │                                                           │            │
│  │  ┌──────────┐                                             │            │
│  │  │ QR Code  │   Scan untuk membayar                       │            │
│  │  │ 120×120  │   Berlaku: 23:59:59                         │            │
│  │  └──────────┘                                             │            │
│  │                                                           │            │
│  │  bg: #FEF9E7, border 1px #C8941A 20%, radius 8px        │            │
│  │  ← Gold accent untuk highlight invoice card               │            │
│  │                                                           │            │
│  └───────────────────────────────────────────────────────────┘            │
│                                                                           │
│  ── PAYMENT STATUS UPDATES ──────────────────────────────────            │
│                                                                           │
│  Webhook received → real-time update via WebSocket:                      │
│                                                                           │
│  ● PAID → toast "Pembayaran diterima! 🎉"                               │
│           → invoice card in chat updates to "✓ Lunas"                    │
│           → invoice card turns green border (#16A34A)                    │
│           → PPJK recommendation banner appears:                          │
│             ┌───────────────────────────────────────────┐                │
│             │  🚢 Transaksi berhasil! Butuh jasa        │                │
│             │     kepabeanan untuk ekspor?               │                │
│             │     [Lihat Mitra PPJK →]                  │                │
│             │                                           │                │
│             │  bg #E6F5F0, border 1px #006B52 20%       │                │
│             └───────────────────────────────────────────┘                │
│                                                                           │
│  ● EXPIRED → toast "QR Code kedaluwarsa"                                 │
│              → invoice status: "Kedaluwarsa"                             │
│              → [Buat QR Baru] button appears                             │
│                                                                           │
│  ● FAILED → toast error "Pembayaran gagal"                               │
│             → [Coba Lagi] button                                         │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Flow: Product Management (Seller)

```
┌───────────────────────────────────────────────────────────┐
│                                                           │
│  Kelola Toko → Tab "Produk Saya"                         │
│       │                                                   │
│       ▼                                                   │
│  ┌─ PRODUCT LIST ───────────────────────────────────┐    │
│  │                                                   │    │
│  │  [+ Tambah Produk]           🔍 Cari produk...   │    │
│  │                                                   │    │
│  │  ┌───┬──────────────┬──────────┬────────┐        │    │
│  │  │📷 │ Product Name  │ Price    │ Status │        │    │
│  │  ├───┼──────────────┼──────────┼────────┤        │    │
│  │  │   │ Artisan Key..│ Rp 150rb │ ● Aktif│ [⋮]   │    │
│  │  │   │ Keycap Way.. │ Rp 200rb │ ● Aktif│ [⋮]   │    │
│  │  └───┴──────────────┴──────────┴────────┘        │    │
│  │                                                   │    │
│  │  [⋮] Menu:                                       │    │
│  │  ├─ Edit Produk                                   │    │
│  │  ├─ Nonaktifkan / Aktifkan                        │    │
│  │  └─ Hapus ← merah, dengan konfirmasi modal       │    │
│  │                                                   │    │
│  └───────────────────────────────────────────────────┘    │
│       │                                                   │
│       │ Click [+ Tambah Produk]                          │
│       ▼                                                   │
│  ┌─ PRODUCT FORM (Full page) ───────────────────────┐    │
│  │                                                   │    │
│  │  Tambah Produk Baru                               │    │
│  │  ← H1, 24px                                      │    │
│  │                                                   │    │
│  │  ┌─ Upload Foto ──────────────────────────────┐  │    │
│  │  │                                             │  │    │
│  │  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ │  │    │
│  │  │  │  +  │ │     │ │     │ │     │ │     │ │  │    │
│  │  │  │foto │ │     │ │     │ │     │ │     │ │  │    │
│  │  │  │     │ │     │ │     │ │     │ │     │ │  │    │
│  │  │  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ │  │    │
│  │  │  Max 5 foto, JPG/PNG/WebP, max 5MB         │  │    │
│  │  │  Drag & drop atau klik untuk upload         │  │    │
│  │  │  ← dashed border #E2E8F0, hover #006B52    │  │    │
│  │  │  First photo = foto utama (draggable order) │  │    │
│  │  └─────────────────────────────────────────────┘  │    │
│  │                                                   │    │
│  │  Nama Produk *                                    │    │
│  │  [                                    ]           │    │
│  │                                                   │    │
│  │  Deskripsi *                                      │    │
│  │  [                                    ]           │    │
│  │  [                                    ]           │    │
│  │  0/2000 karakter                                  │    │
│  │                                                   │    │
│  │  ┌──────────────────┐ ┌──────────────────┐       │    │
│  │  │ Kategori *    ▾  │ │ MOQ *            │       │    │
│  │  └──────────────────┘ └──────────────────┘       │    │
│  │                                                   │    │
│  │  Rentang Harga B2B *                              │    │
│  │  ┌──────────────────┐ ┌──────────────────┐       │    │
│  │  │ Harga Min (Rp)   │ │ Harga Max (Rp)   │       │    │
│  │  └──────────────────┘ └──────────────────┘       │    │
│  │  ← font-mono di input, format otomatis           │    │
│  │                                                   │    │
│  │  ────────────────────────────────────────         │    │
│  │                                                   │    │
│  │  [Batal]                    [Simpan Produk]       │    │
│  │  ghost                      primary #006B52       │    │
│  │                                                   │    │
│  └───────────────────────────────────────────────────┘    │
│                                                           │
│  Success → redirect ke product list                      │
│  Toast: "Produk berhasil ditambahkan!"                   │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

---

## 8. Navigation Map

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                    NusaTrade Connect                             │
│                    Navigation Structure                          │
│                                                                 │
│  ┌─ PUBLIC (no auth) ──────────────────────────────────────┐   │
│  │                                                          │   │
│  │  / ──────────────────── Landing Page                     │   │
│  │  /katalog ──────────── E-Katalog Browse (read-only)      │   │
│  │  /katalog/:slug ────── Product Detail (read-only)        │   │
│  │  /ppjk ─────────────── PPJK Directory (read-only)        │   │
│  │  /login ─────────────  Login                              │   │
│  │  /register ──────────  Register (choose: seller/buyer)    │   │
│  │  /register/seller ───  Register Seller (3-step)           │   │
│  │  /register/buyer ────  Register Buyer (1-step)            │   │
│  │                                                          │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─ SELLER (auth required, role=SELLER) ───────────────────┐   │
│  │                                                          │   │
│  │  /overview ──────────── Dashboard Overview                │   │
│  │  /katalog ──────────── E-Katalog Browse (+ "Hubungi")    │   │
│  │  /katalog/:slug ────── Product Detail (+ "Hubungi")      │   │
│  │  /chat ──────────────── Chat Inbox (list conversations)   │   │
│  │  /chat/:conversationId  Chat Window                       │   │
│  │  /pembayaran ────────── Invoice List                      │   │
│  │  /pembayaran/:invoiceId Invoice Detail + QR               │   │
│  │  /ppjk ──────────────── PPJK Directory                    │   │
│  │  /toko ──────────────── Kelola Toko (profil + produk)     │   │
│  │  /toko/produk/baru ──── Tambah Produk Baru                │   │
│  │  /toko/produk/:id ───── Edit Produk                       │   │
│  │                                                          │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─ BUYER (auth required, role=BUYER) ─────────────────────┐   │
│  │                                                          │   │
│  │  /overview ──────────── Dashboard (inquiry history)       │   │
│  │  /katalog ──────────── Browse + Hubungi                   │   │
│  │  /chat ──────────────── Chat Inbox                        │   │
│  │  /chat/:conversationId  Chat Window                       │   │
│  │  /pembayaran ────────── Invoice List (pay)                │   │
│  │  /pembayaran/:invoiceId Invoice Detail + Scan QR          │   │
│  │  /ppjk ──────────────── PPJK Directory (read-only)        │   │
│  │                                                          │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─ PPJK PARTNER (auth required, role=PPJK_PARTNER) ──────┐   │
│  │                                                          │   │
│  │  /overview ──────────── Dashboard (leads, reviews)        │   │
│  │  /ppjk/profil ──────── Manage Own Profile                 │   │
│  │                                                          │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 9. State Transitions — Key Pages

### Page Loading States

```
State 1: LOADING (first visit)
┌───────────────────┐
│  ░░░░░░░░░░░░░░░  │  Skeleton shimmer
│  ░░░░░░░░         │  (opacity pulse 0.5→1→0.5)
│  ░░░░░░░░░░       │  Duration: 1.5s infinite
│  ░░░░░            │
└───────────────────┘

State 2: SUCCESS (data loaded)
┌───────────────────┐
│  Content renders   │
│  normally          │
└───────────────────┘

State 3: EMPTY (no data)
┌───────────────────┐
│      📦           │  Icon + message + CTA
│  Belum ada data   │
│  [Tambah ...]     │
└───────────────────┘

State 4: ERROR (fetch failed)
┌───────────────────┐
│      ⚠️           │  Icon + message + retry
│  Gagal memuat     │
│  [Coba Lagi]      │
└───────────────────┘
```

### Chat Message States

```
SENDING:     bubble appears, opacity 0.7, spinner icon
SENT:        opacity 1.0, ✓ (gray check)
DELIVERED:   ✓ (gray check — same as sent for now)
READ:        ✓✓ (green double check, #006B52)
FAILED:      bubble with red border, ⚠ icon, [Kirim Ulang] link
```

### Payment Status Colors

```
PENDING     → bg #FFFBEB, text #D97706, dot #D97706
PAID        → bg #F0FDF4, text #16A34A, dot #16A34A
PROCESSING  → bg #EFF6FF, text #2563EB, dot #2563EB
COMPLETED   → bg #E6F5F0, text #006B52, dot #006B52
FAILED      → bg #FEF2F2, text #DC2626, dot #DC2626
EXPIRED     → bg #F1F5F9, text #64748B, dot #64748B
```

---

## 10. Micro-Interactions & Animations

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Interaction              Animation                    Duration │
│  ─────────────────────────────────────────────────────────────  │
│  Button hover             bg color darken              150ms    │
│  Button press             scale(0.98)                  100ms    │
│  Card hover               translateY(-2px) + shadow    150ms    │
│  Sidebar item hover       bg color change              100ms    │
│  Tab switch               underline slide              200ms    │
│  Modal open               fadeIn + scale(0.95→1)       200ms    │
│  Modal close              fadeOut                      150ms    │
│  Toast enter              slideInRight                 200ms    │
│  Toast exit               fadeOut + slideRight          150ms    │
│  AI Preview open          slideUp from bottom          250ms    │
│  AI Preview close         slideDown                    150ms    │
│  Skeleton shimmer         opacity pulse                1500ms   │
│  Read receipt appear      fadeIn                       200ms    │
│  Price confirm modal      fadeIn + scale               200ms    │
│  Payment status update    pulse + color change          300ms    │
│  Dropdown open            fadeIn + slideDown            150ms    │
│  Dropdown close           fadeOut                      100ms    │
│  Image gallery slide      slideLeft/Right              300ms    │
│  Voice recording pulse    opacity pulse (red dot)      1000ms   │
│  Badge verify appear      fadeIn + scale(0.8→1)       300ms    │
│  Page transition          fadeIn                       200ms    │
│                                                                 │
│  Easing:                                                        │
│  - Default: cubic-bezier(0.4, 0, 0.2, 1)                      │
│  - Bounce (toast): cubic-bezier(0.34, 1.56, 0.64, 1)          │
│  - Exit: cubic-bezier(0.4, 0, 1, 1)                           │
│                                                                 │
│  JANGAN animate:                                                │
│  - Page content shift (layout thrashing)                        │
│  - Long loading spinners (use skeleton instead)                 │
│  - Animated counters/numbers                                    │
│  - Parallax scroll                                              │
│  - Auto-playing carousels                                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```
