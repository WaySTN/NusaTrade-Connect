# UI Mockup — Halaman Per Halaman
## NusaTrade Connect — E-Katalog Ekspor B2B

**Design Language:** Premium Export Platform — "Indonesia Goes Global"
**Color:** Emerald Deep `#006B52` × Gold Ekspor `#C8941A`
**Target:** Terlihat setara platform B2B internasional (Alibaba, IndiaMART, TradeIndia) tapi dengan identitas Indonesia yang kuat

---

## 📐 Layout Grid Global

```
Desktop (≥1280px):
┌─────────────────────────────────────────────────────┐
│ Header (64px tinggi)                                │
├────────────┬────────────────────────────────────────┤
│            │                                        │
│  Sidebar   │         Content Area                   │
│  (260px)   │         (max 1200px, padding 32px)     │
│            │                                        │
│            │                                        │
└────────────┴────────────────────────────────────────┘

Mobile (<768px):
┌─────────────────────────┐
│ Header + Hamburger      │
├─────────────────────────┤
│                         │
│     Content Area        │
│     (full width,        │
│      padding 16px)      │
│                         │
├─────────────────────────┤
│ Bottom Nav (56px)       │
└─────────────────────────┘
```

---

## Halaman 1: Landing Page (Public — Tanpa Login)

### Tujuan
Kesan pertama pembeli internasional dan UMKM Indonesia. Harus terasa **premium, trustworthy, dan berbeda dari marketplace biasa**.

### Hero Section

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  [Nav] Logo NusaTrade Connect    Katalog  Tentang  Mitra PPJK       │
│        (Emerald Deep + Gold)                          [Masuk] [Daftar]
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │                                                                │  │
│  │         Ekspor Produk Kreatif                                  │  │
│  │         Indonesia ke Dunia                                     │  │
│  │                                                                │  │
│  │  ← H1, Plus Jakarta Sans, 48px, Bold, #0F1A2A                │  │
│  │                                                                │  │
│  │  Platform E-Katalog B2B terpadu dengan verifikasi NIB,         │  │
│  │  negosiasi berbantuan AI, dan pembayaran QRIS Antarnegara.     │  │
│  │                                                                │  │
│  │  ← Body, Inter, 18px, #384250                                 │  │
│  │                                                                │  │
│  │  ┌──────────────────────┐  ┌────────────────────────┐         │  │
│  │  │  Jelajahi Katalog    │  │  Daftar Sebagai UMKM   │         │  │
│  │  │  (Emerald Deep bg)   │  │  (Gold Ekspor border)  │         │  │
│  │  └──────────────────────┘  └────────────────────────┘         │  │
│  │                                                                │  │
│  │        ← Primary CTA              ← Secondary CTA             │  │
│  │                                                                │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  Background: gradient dari #F8FAFC ke #E6F5F0 (sangat subtle)       │
│  Pattern: subtle batik motif di kanan bawah (opacity 3-5%)          │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Detail Visual Hero:**
- Background: gradient linear dari `#F8FAFC` (kiri atas) ke `#E6F5F0` (kanan bawah)
- Batik pattern: SVG abstract sangat halus di sudut kanan bawah, opacity 4%, warna `#006B52`
- H1: `Plus Jakarta Sans`, 48px desktop / 32px mobile, Bold (700), color `#0F1A2A`
- Subtitle: `Inter`, 18px, weight 400, color `#384250`, max-width 560px
- Primary CTA: bg `#006B52`, text `#FFFFFF`, padding 14px 28px, radius 6px, hover `#005543`
- Secondary CTA: bg transparent, border 2px `#C8941A`, text `#C8941A`, hover bg `#FEF9E7`
- **TIDAK ADA:** animated counter, trust badge strip, statistik angka besar

### Section: Bagaimana Cara Kerjanya (How It Works)

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│           Bagaimana NusaTrade Connect Bekerja                        │
│           ← H2, Plus Jakarta Sans, 30px, #0F1A2A, center            │
│                                                                      │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────┐ │
│   │      ①       │  │      ②       │  │      ③       │  │   ④    │ │
│   │              │  │              │  │              │  │        │ │
│   │  ┌────────┐  │  │  ┌────────┐  │  │  ┌────────┐  │  │┌──────┐│ │
│   │  │ 🔍 ikon│  │  │  │ 💬 ikon│  │  │  │ 📱 ikon│  │  ││🚢ikon││ │
│   │  │ (48px) │  │  │  │ (48px) │  │  │  │ (48px) │  │  ││(48px)││ │
│   │  └────────┘  │  │  └────────┘  │  │  └────────┘  │  │└──────┘│ │
│   │              │  │              │  │              │  │        │ │
│   │  Verifikasi  │  │  Negosiasi   │  │  Pembayaran  │  │Logistik│ │
│   │  & Daftar    │  │  AI Chat     │  │  QRIS        │  │PPJK   │ │
│   │              │  │              │  │              │  │        │ │
│   │  NIB terveri-│  │  Bahasa bisnis│  │ Scan QR dari│  │Mitra   │ │
│   │  fikasi auto │  │  auto-correct │  │ mana saja   │  │ekspor  │ │
│   │  via OSS API │  │  + translate  │  │ di dunia    │  │resmi   │ │
│   └──────────────┘  └──────────────┘  └──────────────┘  └────────┘ │
│                                                                      │
│  Step card:                                                          │
│  - Background: #FFFFFF                                               │
│  - Border: 1px #E2E8F0                                               │
│  - Radius: 8px                                                       │
│  - Padding: 32px 24px                                                │
│  - Ikon: Lucide icon, 48px, warna #006B52                           │
│  - Step number: 14px, font-mono, #C8941A, bg #FEF9E7,               │
│    radius-full, 28px×28px circle                                     │
│  - Title: 16px, semibold, #0F1A2A                                   │
│  - Desc: 14px, regular, #64748B                                     │
│  - Hover: border color → #006B52, shadow-sm (subtle)                │
│  - TIDAK ADA: tebal shadow, gradient background                     │
│                                                                      │
│  Connector antar step: garis putus-putus horizontal #E2E8F0          │
│  (hanya desktop, hidden di mobile — stack vertikal)                  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Section: Featured Products Preview

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│   Produk Unggulan dari UMKM Terverifikasi                           │
│   ← H2, 30px, #0F1A2A                                              │
│                                         [Lihat Semua Katalog →]     │
│                                         ← text link, #006B52       │
│                                                                      │
│   ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐       │
│   │  📷 foto  │  │  📷 foto  │  │  📷 foto  │  │  📷 foto  │       │
│   │  240px    │  │  240px    │  │  240px    │  │  240px    │       │
│   │  aspect   │  │  aspect   │  │  aspect   │  │  aspect   │       │
│   │  4:3      │  │  4:3      │  │  4:3      │  │  4:3      │       │
│   ├───────────┤  ├───────────┤  ├───────────┤  ├───────────┤       │
│   │           │  │           │  │           │  │           │       │
│   │ Artisan   │  │ Batik     │  │ Rattan    │  │ Silver    │       │
│   │ Keycap    │  │ Premium   │  │ Basket    │  │ Jewelry   │       │
│   │           │  │           │  │           │  │           │       │
│   │ ✓ Keicaps │  │ ✓ Batik.. │  │ ✓ Craft.. │  │ ✓ Silve.. │       │
│   │           │  │           │  │           │  │           │       │
│   │ MOQ: 50   │  │ MOQ: 100  │  │ MOQ: 25   │  │ MOQ: 10   │       │
│   │Rp 150.000 │  │Rp 850.000 │  │Rp 75.000  │  │Rp 450.000 │       │
│   │- 500.000  │  │- 1.200.000│  │- 200.000  │  │- 1.500.000│       │
│   │           │  │           │  │           │  │           │       │
│   └───────────┘  └───────────┘  └───────────┘  └───────────┘       │
│                                                                      │
│  Product Card Design:                                                │
│  - Container: bg #FFF, border 1px #E2E8F0, radius 8px               │
│  - Image: object-cover, radius-t 8px (hanya atas)                   │
│  - Verified badge: inline, ✓ icon 12px + "Keicaps.id"               │
│    bg #E6F5F0, text #006B52, radius-full, font 12px                 │
│  - Product name: 16px, semibold, #0F1A2A, max 2 lines               │
│  - MOQ label: 12px, #64748B, uppercase                               │
│  - Price: font-mono, 14px, semibold, #0F1A2A                        │
│  - Hover: translateY(-2px), shadow-md, border #006B52               │
│  - Transition: 150ms ease                                            │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Section: Trust Bar (Subtle)

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  Background: #F0FAF6 (emerald subtle)                                │
│  Padding: 40px                                                       │
│                                                                      │
│   Terverifikasi oleh        Pembayaran via        Mitra Kepabeanan   │
│   OSS Kemenkop              QRIS BI               PPJK Resmi        │
│                                                                      │
│   ← 3 kolom, ikon + teks, center aligned                            │
│   ← Ikon: 32px, #006B52                                             │
│   ← Title: 14px, semibold, #0F1A2A                                  │
│   ← Subtitle: 13px, #64748B                                         │
│   ← TIDAK ada badge ribbon, tidak ada angka counter                 │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Footer

```
┌──────────────────────────────────────────────────────────────────────┐
│  Background: #0F1A2A (ink dark)                                      │
│  Text: #94A3B8 (muted), links #E2E8F0                               │
│                                                                      │
│  NusaTrade Connect              Platform        Legal       Kontak   │
│  E-Katalog Ekspor B2B           Katalog         Syarat      Email    │
│  Indonesia                      Cara Kerja      Privasi     Alamat   │
│                                 Mitra PPJK                           │
│  ← Logo + tagline kecil        ← Nav links     ← Legal      ← Info │
│                                                                      │
│  ─────────────────────────────────────────────────────────────────── │
│  © 2026 NusaTrade Connect — TahuTech                                │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Halaman 2: Login

### Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  Full screen, 2 kolom (desktop) / 1 kolom (mobile)                  │
│                                                                      │
│  ┌─────────────────────────┬─────────────────────────────────────┐  │
│  │                         │                                     │  │
│  │   Brand Panel           │     Form Panel                      │  │
│  │   (45% width)           │     (55% width)                     │  │
│  │                         │                                     │  │
│  │   bg: linear-gradient   │     bg: #FFFFFF                     │  │
│  │   135deg                │                                     │  │
│  │   #006B52 → #004A3A     │     ┌─────────────────────────┐    │  │
│  │                         │     │                         │    │  │
│  │   🏛️ Logo putih besar  │     │  Masuk ke NusaTrade     │    │  │
│  │                         │     │  Connect                │    │  │
│  │   "Hubungkan produk     │     │                         │    │  │
│  │    kreatif Indonesia    │     │  ← H1, 28px, #0F1A2A   │    │  │
│  │    dengan dunia"        │     │                         │    │  │
│  │                         │     │  Akses E-Katalog dan    │    │  │
│  │   ← tagline, 20px,     │     │  mulai berdagang.       │    │  │
│  │     white, max-w 280px  │     │  ← 15px, #64748B       │    │  │
│  │                         │     │                         │    │  │
│  │   Subtle batik pattern  │     │  ┌───────────────────┐  │    │  │
│  │   di bg, opacity 8%     │     │  │ Label: Email      │  │    │  │
│  │                         │     │  │ [input field     ]│  │    │  │
│  │   Accent line:          │     │  └───────────────────┘  │    │  │
│  │   ─── Gold #C8941A ──   │     │                         │    │  │
│  │   (garis horizontal     │     │  ┌───────────────────┐  │    │  │
│  │    tipis 2px, 60px,     │     │  │ Label: Password   │  │    │  │
│  │    di bawah tagline)    │     │  │ [input field  👁️]│  │    │  │
│  │                         │     │  └───────────────────┘  │    │  │
│  │                         │     │                         │    │  │
│  │                         │     │  [Lupa password?]       │    │  │
│  │                         │     │  ← 13px, #006B52       │    │  │
│  │                         │     │                         │    │  │
│  │                         │     │  ┌───────────────────┐  │    │  │
│  │                         │     │  │      MASUK        │  │    │  │
│  │                         │     │  │  (full width btn) │  │    │  │
│  │                         │     │  │  bg #006B52       │  │    │  │
│  │                         │     │  └───────────────────┘  │    │  │
│  │                         │     │                         │    │  │
│  │                         │     │  Belum punya akun?      │    │  │
│  │                         │     │  [Daftar sekarang]      │    │  │
│  │                         │     │  ← 14px, link #006B52  │    │  │
│  │                         │     │                         │    │  │
│  │                         │     └─────────────────────────┘    │  │
│  │                         │                                     │  │
│  └─────────────────────────┴─────────────────────────────────────┘  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Detail Visual:**
- Brand panel: gradient `#006B52` → `#004A3A` (135deg), batik pattern SVG opacity 8%
- Gold accent line: 2px height, 60px width, `#C8941A`, margin-top 24px dari tagline
- Form max-width: 400px, centered di panel kanan
- Input field: height 48px, border 1px `#E2E8F0`, radius 6px, focus border `#006B52` + ring 2px `#E6F5F0`
- Button: height 48px, full-width, bg `#006B52`, radius 6px, font 15px semibold
- Mobile: brand panel hidden, form full-screen dengan emerald accent bar 4px di atas

---

## Halaman 3: Register (Seller / UMKM)

### Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  Sama dengan Login (2 kolom) tapi form lebih panjang                │
│                                                                      │
│  Form panel:                                                         │
│  ┌─────────────────────────────────────┐                            │
│  │                                     │                            │
│  │  Daftar Sebagai UMKM                │                            │
│  │  ← H1, 28px                        │                            │
│  │                                     │                            │
│  │  Mulai ekspor produk kreatifmu.     │                            │
│  │                                     │                            │
│  │  ── Step indicator ──────────────   │                            │
│  │  ●━━━━━━━○━━━━━━━○                  │                            │
│  │  Akun    Usaha   Verifikasi         │                            │
│  │                                     │                            │
│  │  ← Step dots: active = #006B52,     │                            │
│  │    inactive = #E2E8F0,              │                            │
│  │    line connector between           │                            │
│  │                                     │                            │
│  │  STEP 1 — Informasi Akun:          │                            │
│  │  [Email          ]                  │                            │
│  │  [Password       ]                  │                            │
│  │  [Konfirmasi Pass]                  │                            │
│  │                                     │                            │
│  │  STEP 2 — Informasi Usaha:         │                            │
│  │  [Nama Usaha     ]                  │                            │
│  │  [Kota           ] [Provinsi   ]    │                            │
│  │  [Kategori Produk  ▾] ← multi-sel  │                            │
│  │  [Upload foto profil usaha]         │                            │
│  │                                     │                            │
│  │  STEP 3 — Verifikasi NIB:          │                            │
│  │  ┌─────────────────────────────┐   │                            │
│  │  │  📋 Verifikasi NIB          │   │                            │
│  │  │                             │   │                            │
│  │  │  Masukkan NIB untuk         │   │                            │
│  │  │  mendapatkan badge          │   │                            │
│  │  │  terverifikasi.             │   │                            │
│  │  │                             │   │                            │
│  │  │  [NIB: 13 digit   ]        │   │                            │
│  │  │  [Verifikasi Sekarang]      │   │                            │
│  │  │                             │   │                            │
│  │  │  atau [Lewati untuk nanti]  │   │                            │
│  │  │  ← 13px, ghost link        │   │                            │
│  │  └─────────────────────────────┘   │                            │
│  │                                     │                            │
│  │  ☑ Saya menyetujui Syarat &        │                            │
│  │    Ketentuan serta Kebijakan       │                            │
│  │    Privasi NusaTrade Connect        │                            │
│  │                                     │                            │
│  │  [        Daftar Sekarang         ] │                            │
│  │  ← Full width, bg #006B52          │                            │
│  │                                     │                            │
│  │  Sudah punya akun? [Masuk]          │                            │
│  │                                     │                            │
│  └─────────────────────────────────────┘                            │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Detail Step Indicator:**
- Dot active: 12px circle, bg `#006B52`
- Dot inactive: 12px circle, bg `#E2E8F0`
- Line: 2px, active `#006B52`, inactive `#E2E8F0`
- Label: 12px, active `#006B52` semibold, inactive `#64748B`

**NIB Verification Card:**
- Background: `#F0FAF6` (primary subtle)
- Border: 1px `#006B52` opacity 20%
- Radius: 8px
- Icon: 📋 atau ClipboardCheck dari Lucide, 24px, `#006B52`

---

## Halaman 4: Dashboard Overview (Seller)

```
┌──────────────────────────────────────────────────────────────────────┐
│  Header                                                   🔔  👤    │
│  ← NusaTrade logo kecil (kiri)                           notif avatar│
├────────────┬─────────────────────────────────────────────────────────┤
│            │                                                         │
│  SIDEBAR   │  Selamat datang, Keicaps.id                            │
│  (260px)   │  ← H1, 24px, Plus Jakarta Sans, #0F1A2A               │
│            │  ← Subtitle: "Jumat, 11 Juli 2026", 14px, #64748B     │
│  ┌──────┐  │                                                         │
│  │NusaTr│  │  ── 4 Stat Cards (grid 4 kolom) ────────────────────   │
│  │ade   │  │                                                         │
│  │      │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │ Logo │  │  │📦 12     │ │💬 5      │ │💳 3      │ │📈 Rp 15jt│  │
│  └──────┘  │  │Produk    │ │Chat Aktif│ │Transaksi │ │Nilai     │  │
│            │  │Aktif     │ │          │ │Bulan Ini │ │Transaksi │  │
│  ────────  │  │          │ │          │ │          │ │          │  │
│  ● Overview│  │↑ 2 baru  │ │1 unread  │ │↑ vs lalu │ │Bulan Ini │  │
│    E-Katalog│ └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
│    Chat    │                                                         │
│    Pembayar│  Stat Card Design:                                      │
│    Mitra PP│  - bg: #FFFFFF, border: 1px #E2E8F0, radius: 8px       │
│    Kelola T│  - Angka besar: 28px, font-mono, bold, #0F1A2A         │
│            │  - Label: 13px, #64748B                                 │
│  ────────  │  - Sub-label: 12px, #16A34A (hijau) untuk positif      │
│            │  - Ikon: 20px, #006B52, bg #E6F5F0, circle 40px        │
│  ────────  │  - Padding: 24px                                        │
│  Profil    │  - Shadow: NONE (hanya border)                          │
│  [Logout]  │                                                         │
│            │  ── Aktivitas Terbaru ──────────────────────────────    │
│            │                                                         │
│            │  ┌─────────────────────────────────────────────────┐   │
│            │  │                                                 │   │
│            │  │  Hari ini                                       │   │
│            │  │  ─────────────────────────────────────────────  │   │
│            │  │  💬 Pesan baru dari PT. Tech Dist. (SG)        │   │
│            │  │     "Interested in bulk order for Dragon..."    │   │
│            │  │     2 jam yang lalu                             │   │
│            │  │                                                 │   │
│            │  │  💳 Pembayaran diterima — INV-2026-A3X7K9M2    │   │
│            │  │     Rp 7.500.000 dari @techbuyer_sg             │   │
│            │  │     5 jam yang lalu                             │   │
│            │  │                                                 │   │
│            │  │  Kemarin                                        │   │
│            │  │  ─────────────────────────────────────────────  │   │
│            │  │  ✅ NIB berhasil diverifikasi                  │   │
│            │  │     Badge "Terverifikasi" aktif di profil       │   │
│            │  │     Kemarin, 14:30                              │   │
│            │  │                                                 │   │
│            │  └─────────────────────────────────────────────────┘   │
│            │                                                         │
│            │  Activity list:                                         │
│            │  - Container: bg #FFF, border 1px #E2E8F0, radius 8px  │
│            │  - Item: padding 16px, border-bottom 1px #F1F5F9       │
│            │  - Ikon: 16px di circle 32px, color sesuai tipe        │
│            │  - Title: 14px, #0F1A2A                                │
│            │  - Preview text: 13px, #64748B, italic, 1 line truncate│
│            │  - Time: 12px, #94A3B8                                  │
│            │  - Date divider: 12px, uppercase, #94A3B8, bg #F8FAFC  │
│            │                                                         │
└────────────┴─────────────────────────────────────────────────────────┘
```

### Sidebar Detail

```
Sidebar (260px, bg #F1F5F9):

┌────────────────────┐
│                    │
│  [NusaTrade Logo]  │  ← 140px wide, Emerald Deep + Gold accent
│  Connect           │  ← 12px, #64748B, tracking wide
│                    │
│  ════════════════  │  ← border 1px #E2E8F0
│                    │
│  ● Overview        │  ← Active: text #006B52, bg #F0FAF6,
│                    │     left-border 3px #006B52
│  ○ E-Katalog       │  ← Inactive: text #384250, hover bg #F8FAFC
│  ○ Chat Negosiasi  │
│  ○ Pembayaran      │     Setiap item:
│  ○ Mitra PPJK      │     - Height: 44px
│                    │     - Padding: 0 16px
│  ════════════════  │     - Icon: 20px Lucide, margin-right 12px
│                    │     - Font: 14px, Inter
│  ○ Kelola Toko     │     - Radius: 6px (untuk bg highlight)
│                    │
│  ════════════════  │
│                    │
│  ┌──────────────┐  │
│  │ 👤 Keicaps.id│  │  ← User info: avatar 32px + nama 14px
│  │ ✓ Verified   │  │  ← Verified badge: 11px, #006B52
│  │ [↗ Logout]   │  │  ← 13px, #64748B, hover #DC2626
│  └──────────────┘  │
│                    │
└────────────────────┘
```

---

## Halaman 5: E-Katalog (Browse — Buyer View)

```
┌──────────────────────────────────────────────────────────────────────┐
│  Header + Sidebar (same as dashboard)                                │
├────────────┬─────────────────────────────────────────────────────────┤
│            │                                                         │
│  Sidebar   │  E-Katalog Produk                                      │
│            │  ← H1, 24px                                            │
│            │                                                         │
│            │  ┌──────────────────────────────────────────────────┐  │
│            │  │ 🔍 Cari produk, kategori, atau penjual...        │  │
│            │  └──────────────────────────────────────────────────┘  │
│            │  ← Search bar: 48px height, full width, icon kiri     │
│            │    border 1px #E2E8F0, radius 8px, focus #006B52      │
│            │                                                         │
│            │  ── Filter Bar (horizontal) ────────────────────────   │
│            │                                                         │
│            │  [Semua Kategori ▾] [Verified ◉] [Harga ▾] [Urutkan ▾]│
│            │                                                         │
│            │  Filter chip style:                                     │
│            │  - Inactive: bg #F1F5F9, text #384250, border #E2E8F0  │
│            │  - Active: bg #E6F5F0, text #006B52, border #006B52    │
│            │  - Height: 36px, radius: 6px, padding: 0 14px          │
│            │  - Dropdown: shadow-md, bg white, max-h 320px          │
│            │                                                         │
│            │  ── Hasil: 48 produk ditemukan ─────────────────────   │
│            │  ← 13px, #64748B                                       │
│            │                                                         │
│            │  ── Product Grid (3 kolom desktop, 2 tablet, 1 mobile)  │
│            │                                                         │
│            │  ┌─────────┐ ┌─────────┐ ┌─────────┐                  │
│            │  │         │ │         │ │         │                  │
│            │  │ 📷 foto │ │ 📷 foto │ │ 📷 foto │                  │
│            │  │ 4:3     │ │ 4:3     │ │ 4:3     │                  │
│            │  │         │ │         │ │         │                  │
│            │  ├─────────┤ ├─────────┤ ├─────────┤                  │
│            │  │✓ Keicaps│ │✓ Batik..│ │  CraftID│  ← No ✓ = unverified
│            │  │         │ │         │ │         │                  │
│            │  │ Artisan │ │ Premium │ │ Handwov.│                  │
│            │  │ Keycap  │ │ Cloth   │ │ Basket  │                  │
│            │  │ Dragon  │ │ Mega    │ │ Set     │                  │
│            │  │         │ │         │ │         │                  │
│            │  │MOQ: 50  │ │MOQ: 100 │ │MOQ: 25  │                  │
│            │  │Rp150rb  │ │Rp850rb  │ │Rp75rb   │                  │
│            │  │- 500rb  │ │- 1.2jt  │ │- 200rb  │                  │
│            │  │         │ │         │ │         │                  │
│            │  │[Hubungi]│ │[Hubungi]│ │[Hubungi]│                  │
│            │  └─────────┘ └─────────┘ └─────────┘                  │
│            │                                                         │
│            │  "Hubungi" button:                                      │
│            │  - bg transparent, border 1px #006B52, text #006B52    │
│            │  - Hover: bg #006B52, text white                        │
│            │  - 13px, radius 6px, full-width di card                │
│            │                                                         │
│            │  ── Pagination ──────────────────────────────────────   │
│            │                                                         │
│            │         ← 1  2  3  ...  8 →                            │
│            │  Active page: bg #006B52, text white, circle            │
│            │  Inactive: text #384250, hover bg #F1F5F9               │
│            │                                                         │
└────────────┴─────────────────────────────────────────────────────────┘
```

---

## Halaman 6: Product Detail

```
┌──────────────────────────────────────────────────────────────────────┐
│  Header + Sidebar                                                    │
├────────────┬─────────────────────────────────────────────────────────┤
│            │                                                         │
│  Sidebar   │  ← Breadcrumb: E-Katalog > Keycaps > Artisan Dragon   │
│            │     ← 13px, #64748B, link #006B52                      │
│            │                                                         │
│            │  ┌────────────────────┬─────────────────────────────┐  │
│            │  │                    │                             │  │
│            │  │   Image Gallery    │   Product Info              │  │
│            │  │   (50% width)      │   (50% width)              │  │
│            │  │                    │                             │  │
│            │  │   ┌──────────────┐ │   ✓ Keicaps.id             │  │
│            │  │   │              │ │   ← Verified badge inline  │  │
│            │  │   │  Main Image  │ │   ← 13px, #006B52, bg     │  │
│            │  │   │  400px       │ │     #E6F5F0, pill shape    │  │
│            │  │   │  aspect 1:1  │ │                             │  │
│            │  │   │              │ │   Artisan Keycap —          │  │
│            │  │   │              │ │   Dragon Scale Edition      │  │
│            │  │   └──────────────┘ │   ← H1, 28px, #0F1A2A     │  │
│            │  │                    │                             │  │
│            │  │   ○ ● ○ ○ ○       │   ────────────────────────  │  │
│            │  │   ← dot indicator │                             │  │
│            │  │   ← active #006B52│   Rentang Harga B2B         │  │
│            │  │   ← inactive#E2E8F│   ← 12px, uppercase, #64748│  │
│            │  │                    │                             │  │
│            │  │   [thumb][thumb]   │   Rp 150.000 — 500.000     │  │
│            │  │   [thumb][thumb]   │   ← font-mono, 24px, bold  │  │
│            │  │   ← 64px, radius  │     #0F1A2A                │  │
│            │  │     4px, border    │                             │  │
│            │  │     active#006B52  │   per unit                  │  │
│            │  │                    │   ← 13px, #64748B           │  │
│            │  │                    │                             │  │
│            │  │                    │   ────────────────────────  │  │
│            │  │                    │                             │  │
│            │  │                    │   Minimum Order (MOQ)       │  │
│            │  │                    │   50 unit                   │  │
│            │  │                    │   ← label 12px #64748B,    │  │
│            │  │                    │     value 16px semi #0F1A2A│  │
│            │  │                    │                             │  │
│            │  │                    │   Kategori                  │  │
│            │  │                    │   Keycaps & Accessories     │  │
│            │  │                    │   ← badge pill, bg #F1F5F9 │  │
│            │  │                    │                             │  │
│            │  │                    │   Lokasi                    │  │
│            │  │                    │   Jombang, Jawa Timur 🇮🇩   │  │
│            │  │                    │                             │  │
│            │  │                    │   ┌───────────────────────┐ │  │
│            │  │                    │   │   Hubungi Penjual     │ │  │
│            │  │                    │   │   ← Primary btn, full │ │  │
│            │  │                    │   │     width, bg #006B52 │ │  │
│            │  │                    │   └───────────────────────┘ │  │
│            │  │                    │                             │  │
│            │  │                    │   ┌───────────────────────┐ │  │
│            │  │                    │   │   Lihat Profil Toko   │ │  │
│            │  │                    │   │   ← Ghost btn, border │ │  │
│            │  │                    │   │     #E2E8F0           │ │  │
│            │  │                    │   └───────────────────────┘ │  │
│            │  │                    │                             │  │
│            │  └────────────────────┴─────────────────────────────┘  │
│            │                                                         │
│            │  ── Deskripsi Produk ────────────────────────────────   │
│            │                                                         │
│            │  ┌─────────────────────────────────────────────────┐   │
│            │  │  Hand-painted artisan keycap dengan desain naga  │   │
│            │  │  khas Indonesia. Setiap unit dibuat secara       │   │
│            │  │  handmade dengan resin berkualitas tinggi.       │   │
│            │  │                                                 │   │
│            │  │  Spesifikasi:                                   │   │
│            │  │  • Material: Resin + pewarna premium             │   │
│            │  │  • Profile: SA Row 1                             │   │
│            │  │  • Stem: Cherry MX compatible                    │   │
│            │  │  • Packaging: individual box + bubble wrap       │   │
│            │  │                                                 │   │
│            │  │  ← 15px, Inter, #384250, line-height 1.6        │   │
│            │  └─────────────────────────────────────────────────┘   │
│            │                                                         │
└────────────┴─────────────────────────────────────────────────────────┘
```

---

## Halaman 7: Chat Negosiasi

### Ini halaman paling penting — inti platform.

```
┌──────────────────────────────────────────────────────────────────────┐
│  Header                                                              │
├────────────┬──────────────┬──────────────────────────────────────────┤
│            │              │                                          │
│  Sidebar   │ Chat List    │  Chat Window                             │
│  (260px)   │ (300px)      │  (flex-1)                                │
│            │              │                                          │
│            │ ┌──────────┐ │  ┌──────────────────────────────────┐   │
│            │ │🔍 Cari.. │ │  │  👤 PT. Tech Distributors (SG)   │   │
│            │ └──────────┘ │  │  ● Online    ✓ Verified Buyer    │   │
│            │              │  │  ← Header: 64px, bg #FFF,        │   │
│            │ ┌──────────┐ │  │    border-bottom #E2E8F0         │   │
│            │ │          │ │  └──────────────────────────────────┘   │
│            │ │ PT. Tech │ │                                          │
│            │ │ Distrib. │ │  ── Message Area (scrollable) ────────   │
│            │ │ "Interes │ │                                          │
│            │ │ ted in.."│ │       ┌──────────────────────────┐      │
│            │ │ 14:30  ●2│ │       │ Hi, I'm interested in   │      │
│            │ │          │ │       │ your Dragon Scale keycap.│      │
│            │ ├──────────┤ │       │ Can you do 200 units?    │      │
│            │ │          │ │       │                          │      │
│            │ │ Craft    │ │       │ 10:30                    │      │
│            │ │ Haven MY │ │       └──────────────────────────┘      │
│            │ │ "Can you │ │       ← Buyer message: bg #FFFFFF,      │
│            │ │ ship to."│ │         border 1px #E2E8F0, radius 8px  │
│            │ │ Kemarin  │ │         padding 12px 16px, max-w 70%    │
│            │ │          │ │         align LEFT                       │
│            │ ├──────────┤ │                                          │
│            │ │          │ │  ┌──────────────────────────┐           │
│            │ │ empty... │ │  │ Terima kasih atas        │           │
│            │ │          │ │  │ ketertarikan Anda. Untuk │           │
│            │ │          │ │  │ pemesanan 200 unit, kami  │           │
│            │ │          │ │  │ dapat menawarkan harga    │           │
│            │ │          │ │  │ Rp 350.000 per unit.     │           │
│            │ │          │ │  │                          │           │
│            │ │          │ │  │ 🔄 Dikoreksi AI          │           │
│            │ │          │ │  │ [Lihat teks asli]        │           │
│            │ │          │ │  │                          │           │
│            │ │          │ │  │ ✓✓ 10:32                 │           │
│            │ │          │ │  └──────────────────────────┘           │
│            │ │          │ │  ← Own message: bg #F0FAF6 (emerald    │
│            │ │          │ │    subtle), border-left 3px #006B52,    │
│            │ │          │ │    align RIGHT, max-w 70%                │
│            │ │          │ │                                          │
│            │ │          │ │  "Lihat teks asli" → 11px, #64748B,    │
│            │ │          │ │  underline, click → expand panel di     │
│            │ │          │ │  bawah bubble:                           │
│            │ │          │ │  ┌ Asli: "makasih bos, kalo 200        │
│            │ │          │ │  │ biji gw kasih 350rb per pc deh"     │
│            │ │          │ │  └ ← bg #F8FAFC, 12px, italic, #94A3B8│
│            │ │          │ │                                          │
│            │ │          │ │  "🔄 Dikoreksi AI" badge:              │
│            │ │          │ │  ← 11px, bg #FEF9E7, text #C8941A,    │
│            │ │          │ │    pill shape, padding 2px 8px          │
│            │ │          │ │                                          │
│            │ │          │ │  Read receipt:                           │
│            │ │          │ │  ✓ = terkirim (#94A3B8)                 │
│            │ │          │ │  ✓✓ = dibaca (#006B52)                  │
│            │ │          │ │                                          │
│            │ │          │ │  ── Chat Input Area ──────────────────   │
│            │ │          │ │                                          │
│            │ │          │ │  ┌──────────────────────────────────┐   │
│            │ │          │ │  │                                  │   │
│            │ │          │ │  │  🎤  [Ketik pesan...        ] ➤  │   │
│            │ │          │ │  │                                  │   │
│            │ │          │ │  │  mic  input field         send   │   │
│            │ │          │ │  │                                  │   │
│            │ │          │ │  └──────────────────────────────────┘   │
│            │ │          │ │                                          │
│            │ │          │ │  Input area:                             │
│            │ │          │ │  - bg #FFF, border-top 1px #E2E8F0     │
│            │ │          │ │  - Padding: 12px 16px                   │
│            │ │          │ │  - Mic button: 40px circle, #64748B,   │
│            │ │          │ │    hover #006B52                        │
│            │ │          │ │  - Input: flex-1, 44px, no border,     │
│            │ │          │ │    placeholder #94A3B8                   │
│            │ │          │ │  - Send button: 40px circle, bg #006B52│
│            │ │          │ │    arrow icon white, disabled #E2E8F0   │
│            │ │          │ │                                          │
│            │ └──────────┘ │  Chat list item:                        │
│            │              │  - height: 72px                          │
│            │              │  - active: bg #F0FAF6, left border 3px  │
│            │              │    #006B52                                │
│            │              │  - avatar: 40px circle                   │
│            │              │  - name: 14px semi, #0F1A2A             │
│            │              │  - preview: 13px, #64748B, 1 line       │
│            │              │  - time: 12px, #94A3B8                   │
│            │              │  - unread dot: 8px circle #C8941A       │
│            │              │    atau badge count bg #C8941A text white│
│            │              │                                          │
└────────────┴──────────────┴──────────────────────────────────────────┘
```

### AI Preview Overlay (Muncul sebelum kirim pesan)

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  Overlay muncul dari bawah, slide-up animation (250ms, ease-out)    │
│  Background: #FFFFFF, shadow-lg, radius-t 16px                      │
│  Tinggi: ~280px, fixed di bawah chat window                         │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                                                              │   │
│  │  Preview Pesan                                    [✕ Tutup] │   │
│  │  ← 16px, semibold, #0F1A2A                                  │   │
│  │                                                              │   │
│  │  ┌─ Teks Asli ─────────────────────────────────────────────┐│   │
│  │  │ "bos mau pesen brp biji? kalo 200 gw kasih 350rb deh"  ││   │
│  │  │ ← 14px, #64748B, italic, bg #F8FAFC, padding 12px      ││   │
│  │  └─────────────────────────────────────────────────────────┘│   │
│  │                                                              │   │
│  │       ↓ (arrow icon, #C8941A, 16px)                         │   │
│  │                                                              │   │
│  │  ┌─ Bahasa Bisnis ────────────────────────────────────────┐ │   │
│  │  │ "Berapa jumlah yang ingin Anda pesan? Untuk pemesanan  │ │   │
│  │  │  200 unit, kami dapat menawarkan harga Rp 350.000      │ │   │
│  │  │  per unit."                                            │ │   │
│  │  │ ← 14px, #0F1A2A, bg #F0FAF6, border-left 3px #006B52 │ │   │
│  │  └────────────────────────────────────────────────────────┘ │   │
│  │                                                              │   │
│  │       ↓ (arrow icon, #C8941A, 16px)                         │   │
│  │                                                              │   │
│  │  ┌─ English Translation ──────────────────────────────────┐ │   │
│  │  │ "How many units would you like to order? For an order  │ │   │
│  │  │  of 200 units, we can offer a price of IDR 350,000    │ │   │
│  │  │  per unit."                                            │ │   │
│  │  │ ← 14px, #0F1A2A, bg #EFF6FF, border-left 3px #2563EB │ │   │
│  │  └────────────────────────────────────────────────────────┘ │   │
│  │                                                              │   │
│  │  ┌──────────────────┐  ┌────────────────────────────────┐  │   │
│  │  │   Edit Ulang     │  │       Kirim Pesan              │  │   │
│  │  │   ← Ghost btn    │  │   ← Primary btn, bg #006B52   │  │   │
│  │  └──────────────────┘  └────────────────────────────────┘  │   │
│  │                                                              │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Price Confirmation Modal

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  Modal overlay: bg rgba(15, 26, 42, 0.5) — backdrop blur 4px       │
│                                                                      │
│  ┌────────────────────────────────────┐                              │
│  │                                    │                              │
│  │  ⚠️ Konfirmasi Harga              │                              │
│  │  ← 18px, semibold, #0F1A2A       │                              │
│  │                                    │                              │
│  │  Sistem mendeteksi angka harga     │                              │
│  │  dalam pesanmu:                    │                              │
│  │  ← 14px, #384250                 │                              │
│  │                                    │                              │
│  │  ┌──────────────────────────────┐ │                              │
│  │  │                              │ │                              │
│  │  │    Rp 350.000 / unit         │ │                              │
│  │  │    × 200 unit                │ │                              │
│  │  │    ═══════════════           │ │                              │
│  │  │    Total: Rp 70.000.000      │ │                              │
│  │  │                              │ │                              │
│  │  │  ← font-mono, 24px title,   │ │                              │
│  │  │    16px detail, bg #FEF9E7,  │ │                              │
│  │  │    border 1px #C8941A 20%,   │ │                              │
│  │  │    radius 8px, center        │ │                              │
│  │  └──────────────────────────────┘ │                              │
│  │                                    │                              │
│  │  Pastikan harga ini sudah benar    │                              │
│  │  sebelum dikirim ke buyer.         │                              │
│  │  ← 13px, #64748B                 │                              │
│  │                                    │                              │
│  │  ┌────────────┐ ┌────────────────┐│                              │
│  │  │ Edit Pesan │ │  Ya, Kirim ✓   ││                              │
│  │  │ ← Ghost    │ │ ← Primary btn  ││                              │
│  │  └────────────┘ └────────────────┘│                              │
│  │                                    │                              │
│  └────────────────────────────────────┘                              │
│                                                                      │
│  Modal: max-w 420px, bg #FFF, radius 12px, shadow-lg,               │
│  padding 32px, center screen                                         │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Halaman 8: Pembayaran & Invoice

```
┌──────────────────────────────────────────────────────────────────────┐
│  Header + Sidebar                                                    │
├────────────┬─────────────────────────────────────────────────────────┤
│            │                                                         │
│  Sidebar   │  Pembayaran                                            │
│            │  ← H1, 24px                                            │
│            │                                                         │
│            │  ── Tab Bar ─────────────────────────────────────────   │
│            │  [Semua] [Menunggu] [Lunas] [Selesai]                  │
│            │  ← Active tab: text #006B52, border-bottom 2px #C8941A│
│            │  ← Inactive: text #64748B, hover #384250              │
│            │                                                         │
│            │  ── Invoice List ────────────────────────────────────   │
│            │                                                         │
│            │  ┌─────────────────────────────────────────────────┐   │
│            │  │                                                 │   │
│            │  │  INV-2026-A3X7K9M2         ● Menunggu Pembayaran│   │
│            │  │  ← font-mono, 14px         ← badge warning      │   │
│            │  │                                                 │   │
│            │  │  PT. Tech Distributors (SG)                     │   │
│            │  │  Artisan Keycap Dragon Scale × 200 unit          │   │
│            │  │  ← 14px, #384250                                │   │
│            │  │                                                 │   │
│            │  │  Rp 70.000.000              Expire: 23:45:12    │   │
│            │  │  ← font-mono, 20px, bold   ← countdown merah   │   │
│            │  │                              jika < 1 jam        │   │
│            │  │                                                 │   │
│            │  │  10 Juli 2026          [Lihat Detail →]          │   │
│            │  │  ← 13px, #94A3B8      ← text link #006B52      │   │
│            │  │                                                 │   │
│            │  └─────────────────────────────────────────────────┘   │
│            │                                                         │
│            │  Invoice card:                                          │
│            │  - bg #FFF, border 1px #E2E8F0, radius 8px             │
│            │  - padding 24px                                         │
│            │  - Hover: border #CBD5E1                                │
│            │  - Status badges:                                       │
│            │    PENDING: bg #FFFBEB, text #D97706, border #D97706   │
│            │    PAID: bg #F0FDF4, text #16A34A, border #16A34A      │
│            │    COMPLETED: bg #E6F5F0, text #006B52, border #006B52 │
│            │    FAILED: bg #FEF2F2, text #DC2626, border #DC2626   │
│            │                                                         │
└────────────┴─────────────────────────────────────────────────────────┘
```

### Invoice Detail + QRIS Display

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  ┌────────────────────────┬──────────────────────────────────────┐  │
│  │                        │                                      │  │
│  │   QRIS QR Code         │   Detail Invoice                    │  │
│  │   (40% width)          │   (60% width)                       │  │
│  │                        │                                      │  │
│  │   ┌────────────────┐   │   INV-2026-A3X7K9M2                │  │
│  │   │                │   │   ← font-mono, 18px, #0F1A2A       │  │
│  │   │   ┌──────────┐ │   │                                      │  │
│  │   │   │ QR CODE  │ │   │   ● Menunggu Pembayaran             │  │
│  │   │   │ 240×240  │ │   │                                      │  │
│  │   │   │          │ │   │   ─────────────────────────────────  │  │
│  │   │   └──────────┘ │   │                                      │  │
│  │   │                │   │   Dari: Keicaps.id (Jombang)         │  │
│  │   │   Scan QR ini  │   │   Kepada: PT. Tech Dist. (SG)       │  │
│  │   │   dengan app   │   │                                      │  │
│  │   │   pembayaran   │   │   ─────────────────────────────────  │  │
│  │   │   Anda         │   │                                      │  │
│  │   │                │   │   Item:                               │  │
│  │   │  ← 13px,#64748B│   │   Artisan Keycap Dragon Scale       │  │
│  │   │                │   │   200 × Rp 350.000  = Rp 70.000.000 │  │
│  │   │   Berlaku:      │   │   ← font-mono untuk angka           │  │
│  │   │   23:45:12      │   │                                      │  │
│  │   │   ← countdown   │   │   ─────────────────────────────────  │  │
│  │   │   font-mono,    │   │   Subtotal:    Rp 70.000.000        │  │
│  │   │   20px, bold    │   │   Service Fee:  Rp  1.400.000 (2%)  │  │
│  │   │   #D97706 jika  │   │   ═══════════════════════════════   │  │
│  │   │   < 1 jam       │   │   Total:       Rp 71.400.000        │  │
│  │   │                │   │   ← Total: font-mono, 20px, bold    │  │
│  │   └────────────────┘   │                                      │  │
│  │                        │   ─────────────────────────────────  │  │
│  │   QR container:        │                                      │  │
│  │   - bg #FFF            │   Metode: QRIS Antarnegara           │  │
│  │   - border 2px #006B52 │   Gateway: Midtrans                  │  │
│  │   - radius 12px        │   Dibuat: 10 Juli 2026, 14:30        │  │
│  │   - padding 32px       │                                      │  │
│  │   - Shadow: none       │   [Download Invoice PDF]             │  │
│  │   - Center aligned     │   ← Ghost button, icon download     │  │
│  │                        │                                      │  │
│  └────────────────────────┴──────────────────────────────────────┘  │
│                                                                      │
│  ── Payment Status Tracker ──────────────────────────────────────   │
│                                                                      │
│  ●━━━━━━━━━━○━━━━━━━━━━○━━━━━━━━━━○                                │
│  Dibuat     Dibayar    Diproses   Selesai                           │
│  ✓ 10 Jul   Menunggu   —          —                                 │
│                                                                      │
│  Step tracker:                                                       │
│  - Done: ● #006B52, line #006B52                                    │
│  - Current: ○ border #C8941A, pulse animation subtle                │
│  - Pending: ○ #E2E8F0, line #E2E8F0                                │
│  - Label done: 13px #006B52, label pending: 13px #94A3B8           │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Halaman 9: Direktori Mitra PPJK

```
┌──────────────────────────────────────────────────────────────────────┐
│  Header + Sidebar                                                    │
├────────────┬─────────────────────────────────────────────────────────┤
│            │                                                         │
│  Sidebar   │  Mitra PPJK — Jasa Kepabeanan                         │
│            │  ← H1, 24px                                            │
│            │  Temukan mitra PPJK terpercaya untuk                   │
│            │  mengurus dokumen ekspor Anda.                          │
│            │  ← 15px, #64748B                                       │
│            │                                                         │
│            │  ── Filter ──────────────────────────────────────────   │
│            │  [Semua Kota ▾] [Layanan ▾] [Verified ◉]              │
│            │                                                         │
│            │  ── PPJK Cards (2 kolom) ────────────────────────────  │
│            │                                                         │
│            │  ┌────────────────────┐  ┌────────────────────────┐    │
│            │  │                    │  │                        │    │
│            │  │  PT. Buana Ekspor  │  │  CV. Lintas Nusantara  │    │
│            │  │  ✓ Verified Partner│  │  ✓ Verified Partner    │    │
│            │  │                    │  │                        │    │
│            │  │  📍 Jakarta       │  │  📍 Surabaya           │    │
│            │  │                    │  │                        │    │
│            │  │  ★★★★★ 4.8 (23)  │  │  ★★★★☆ 4.2 (15)      │    │
│            │  │  ← stars #C8941A  │  │                        │    │
│            │  │                    │  │                        │    │
│            │  │  Layanan:          │  │  Layanan:              │    │
│            │  │  [PEB] [PIB]      │  │  [PEB] [Logistik]     │    │
│            │  │  [Cukai]          │  │  [Cukai]              │    │
│            │  │  ← pills, 11px,  │  │                        │    │
│            │  │    bg #F1F5F9,    │  │                        │    │
│            │  │    text #384250   │  │                        │    │
│            │  │                    │  │                        │    │
│            │  │  [Hubungi]        │  │  [Hubungi]            │    │
│            │  │  ← outline btn   │  │                        │    │
│            │  │    #006B52        │  │                        │    │
│            │  │                    │  │                        │    │
│            │  └────────────────────┘  └────────────────────────┘    │
│            │                                                         │
│            │  Verified Partner badge:                                │
│            │  - ✓ icon + "Verified Partner"                         │
│            │  - bg #FEF9E7, text #C8941A, border 1px #C8941A 20%   │
│            │  - Pill shape, 12px, semibold                           │
│            │                                                         │
│            │  PPJK card:                                             │
│            │  - bg #FFF, border 1px #E2E8F0, radius 8px             │
│            │  - Padding 24px                                         │
│            │  - Stars: #C8941A (filled), #E2E8F0 (empty)            │
│            │  - Hover: border #006B52, shadow-xs                    │
│            │                                                         │
└────────────┴─────────────────────────────────────────────────────────┘
```

---

## Halaman 10: Kelola Toko (Seller)

```
┌──────────────────────────────────────────────────────────────────────┐
│  Header + Sidebar                                                    │
├────────────┬─────────────────────────────────────────────────────────┤
│            │                                                         │
│  Sidebar   │  Kelola Toko                                           │
│            │  ← H1, 24px                                            │
│            │                                                         │
│            │  ── Tab Bar ─────────────────────────────────────────   │
│            │  [Profil Toko] [Produk Saya] [Pengaturan]              │
│            │                                                         │
│            │  === Tab: Profil Toko ===                               │
│            │                                                         │
│            │  ┌─────────────────────────────────────────────────┐   │
│            │  │                                                 │   │
│            │  │  ┌────┐  Keicaps.id                            │   │
│            │  │  │foto│  ✓ NIB Terverifikasi                   │   │
│            │  │  │80px│  Jombang, Jawa Timur                    │   │
│            │  │  └────┘                                         │   │
│            │  │                                    [Edit Profil]│   │
│            │  │  ← Avatar 80px circle, bg #E6F5F0 fallback     │   │
│            │  │  ← Business name 20px semi #0F1A2A             │   │
│            │  │  ← Verified badge same as catalog              │   │
│            │  │  ← City 14px #64748B                           │   │
│            │  │                                                 │   │
│            │  └─────────────────────────────────────────────────┘   │
│            │                                                         │
│            │  === Tab: Produk Saya ===                               │
│            │                                                         │
│            │  [+ Tambah Produk]     🔍 Cari produk...               │
│            │  ← Primary btn,        ← search input                  │
│            │    bg #006B52                                           │
│            │                                                         │
│            │  ┌─────────────────────────────────────────────────┐   │
│            │  │  📷 │ Artisan Keycap   │ Rp 150-500rb │ ● Aktif │   │
│            │  │  60px│ Dragon Scale     │ MOQ: 50      │  [⋮]   │   │
│            │  │     │ 234 views, 12 inq│              │         │   │
│            │  ├─────┼──────────────────┼──────────────┼─────────┤   │
│            │  │  📷 │ Keycap Wayang    │ Rp 200-600rb │ ● Aktif │   │
│            │  │     │ Shadow Puppet    │ MOQ: 30      │  [⋮]   │   │
│            │  │     │ 156 views, 8 inq │              │         │   │
│            │  └─────┴──────────────────┴──────────────┴─────────┘   │
│            │                                                         │
│            │  Table/list style:                                      │
│            │  - bg #FFF, border 1px #E2E8F0, radius 8px             │
│            │  - Row: padding 16px, border-bottom 1px #F1F5F9        │
│            │  - Thumbnail: 60×60px, radius 6px, object-cover        │
│            │  - Status dot: ● 8px, #16A34A = aktif, #D97706 = draft│
│            │  - ⋮ more menu: dropdown [Edit, Nonaktifkan, Hapus]    │
│            │  - Stats (views, inquiries): 12px, #94A3B8             │
│            │                                                         │
└────────────┴─────────────────────────────────────────────────────────┘
```

---

## Responsive: Mobile (< 768px)

### Key Differences

```
Mobile Navigation:
- Sidebar: hidden, replaced by bottom nav bar (56px)
- Bottom nav: 5 items max (Overview, Katalog, Chat, Payment, More)
- Ikon 24px + label 10px di bawah
- Active: #006B52, inactive: #94A3B8
- bg #FFFFFF, border-top 1px #E2E8F0

Mobile Chat:
- Chat list dan chat window TIDAK side-by-side
- Halaman 1: list conversations (full width)
- Tap conversation → push ke halaman 2: chat window (full width)
- Back button di header untuk kembali ke list
- AI preview: bottom sheet (full width, slide up)

Mobile Product Grid:
- 1 kolom (full width cards)
- Atau 2 kolom compact (gambar + nama + harga, tanpa description)

Mobile Invoice:
- QR dan detail stacked vertical (QR di atas, detail di bawah)
- QR code 200×200px centered

Mobile Forms:
- Semua input full width
- Step indicator simplified (nomor saja, tanpa label)
```

---

## Komponen: Toast Notification

```
┌──────────────────────────────────┐
│                                  │
│  ✓  NIB berhasil diverifikasi   │  ← Success toast
│     Badge aktif di profil.       │
│                                  │
│  bg #F0FDF4, border-left 4px    │
│  #16A34A, text #0F1A2A          │
│  icon ✓ 16px #16A34A            │
│  radius 8px, shadow-md          │
│  position: top-right, 16px      │
│  auto-dismiss 5 detik           │
│  slide-in dari kanan (200ms)    │
│                                  │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│                                  │
│  ✕  Gagal mengirim pesan.       │  ← Error toast
│     Periksa koneksi internet.    │
│                                  │
│  bg #FEF2F2, border-left 4px    │
│  #DC2626                        │
│                                  │
└──────────────────────────────────┘
```

---

## Komponen: Empty State

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│                   📦                                  │
│                  (48px, #94A3B8)                      │
│                                                      │
│            Belum ada produk                           │
│            ← 18px, semibold, #0F1A2A                 │
│                                                      │
│   Mulai tambahkan produk ke katalog agar              │
│   pembeli internasional bisa menemukan usahamu.       │
│   ← 14px, #64748B, center, max-w 400px              │
│                                                      │
│         [+ Tambah Produk Pertama]                     │
│         ← Primary btn, bg #006B52                    │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## Komponen: Skeleton Loading

```
Product Card Skeleton:
┌───────────────┐
│  ░░░░░░░░░░░  │  ← bg #E2E8F0, animate pulse
│  ░░░░░░░░░░░  │    (opacity 0.5 → 1 → 0.5, 1.5s)
│  ░░░░░░░░░░░  │
├───────────────┤
│  ░░░░░░░░     │  ← 12px height, 60% width
│  ░░░░░░░░░░   │  ← 16px height, 80% width
│  ░░░░░        │  ← 14px height, 40% width
│               │
│  ░░░░░░░░░░░  │  ← button placeholder
└───────────────┘

Radius semua placeholder: 4px
Gap antar placeholder: 8px
```
