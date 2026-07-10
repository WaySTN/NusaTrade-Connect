# UI Component Library — NusaTrade Connect
## Spesifikasi Komponen Reusable untuk Frontend

**Design System:** Emerald Deep `#006B52` × Gold Ekspor `#C8941A`
**Icon Library:** Lucide React
**Font:** Plus Jakarta Sans (display), Inter (body), JetBrains Mono (mono)

---

## 1. Button

### Variants

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  PRIMARY            SECONDARY          GHOST             ACCENT     │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐  ┌───────┐ │
│  │ Kirim Pesan  │   │ Lihat Detail │   │ Batal        │  │Invoice│ │
│  └──────────────┘   └──────────────┘   └──────────────┘  └───────┘ │
│                                                                     │
│  bg: #006B52        bg: transparent     bg: transparent   bg:#C8941A│
│  text: #FFFFFF      border: 1px         text: #384250    text:#FFF │
│  hover: #005543       #006B52           hover: bg         hover:   │
│                     text: #006B52         #F1F5F9         #A87A15  │
│                     hover: bg #E6F5F0   hover text:                │
│                       text #005543       #0F1A2A                   │
│                                                                     │
│  DANGER             LINK                                            │
│  ┌──────────────┐   ┌──────────────┐                                │
│  │ Hapus Produk │   │ Lihat semua →│                                │
│  └──────────────┘   └──────────────┘                                │
│                                                                     │
│  bg: #DC2626        bg: none           Semua button:                │
│  text: #FFFFFF      text: #006B52      - Height: 40px (sm), 44px   │
│  hover: #B91C1C     underline on         (md), 48px (lg)           │
│                     hover              - Padding: 0 16px (sm),     │
│                                          0 20px (md), 0 28px (lg)  │
│                                        - Radius: 6px               │
│                                        - Font: Inter 14px (sm/md), │
│                                          15px (lg), semibold       │
│                                        - Transition: 150ms         │
│                                        - Disabled: opacity 0.5,    │
│                                          cursor not-allowed        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Button with Icon

```
┌───────────────────┐   ┌─────────────────────┐   ┌────┐
│ 📤 Upload Foto    │   │  Tambah Produk  ＋  │   │ 🗑 │
└───────────────────┘   └─────────────────────┘   └────┘
  leftIcon                 rightIcon                iconOnly

Icon: 16px (sm), 18px (md), 20px (lg)
Gap icon-to-text: 8px
Icon-only button: 40×40px (sm), 44×44px (md), square, radius 6px
```

### Loading State

```
┌──────────────────────┐
│  ◌ Memverifikasi...  │
└──────────────────────┘

- Spinner: 16px, animasi rotate 1s linear infinite
- Text berubah ke loading message
- Button disabled saat loading
- Warna spinner = warna teks button
```

---

## 2. Input

### Text Input

```
Default:
┌─────────────────────────────────────────┐
│ Label                                   │
│ ┌─────────────────────────────────────┐ │
│ │ Placeholder text...                 │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Label: 13px, semibold, #384250, mb 6px  │
│ Input: height 44px, padding 0 14px      │
│ Border: 1px #E2E8F0, radius 6px        │
│ Placeholder: 14px, #94A3B8              │
│ Text: 14px, #0F1A2A                     │
└─────────────────────────────────────────┘

Focus:
┌─────────────────────────────────────────┐
│ Label (warna tetap)                     │
│ ┌─────────────────────────────────────┐ │
│ │ User input text...              ▌   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Border: 1px #006B52                     │
│ Ring: 3px #E6F5F0 (box-shadow)          │
│ Outline: none                           │
└─────────────────────────────────────────┘

Error:
┌─────────────────────────────────────────┐
│ Label                                   │
│ ┌─────────────────────────────────────┐ │
│ │ Invalid input...                    │ │
│ └─────────────────────────────────────┘ │
│ ⚠ Format NIB harus 13 digit angka.     │
│                                         │
│ Border: 1px #DC2626                     │
│ Ring: 3px #FEF2F2                       │
│ Error text: 12px, #DC2626              │
│ Error icon: ⚠ 12px, #DC2626           │
│ aria-describedby → error message ID     │
└─────────────────────────────────────────┘

With Icon (search):
┌─────────────────────────────────────────┐
│ ┌─────────────────────────────────────┐ │
│ │ 🔍  Cari produk...                  │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Left icon: 18px, #94A3B8, left 14px    │
│ Input padding-left: 42px                │
└─────────────────────────────────────────┘
```

### Textarea

```
┌─────────────────────────────────────────┐
│ Label                                   │
│ ┌─────────────────────────────────────┐ │
│ │                                     │ │
│ │ Multiline text...                   │ │
│ │                                     │ │
│ │                                     │ │
│ └─────────────────────────────────────┘ │
│ 0/500 karakter                          │
│                                         │
│ Min-height: 100px, resize vertical      │
│ Padding: 12px 14px                      │
│ Counter: 12px, #94A3B8, right-aligned   │
│ Counter near limit: #D97706             │
│ Counter at limit: #DC2626               │
└─────────────────────────────────────────┘
```

### Select / Dropdown

```
Closed:
┌─────────────────────────────────────────┐
│ Kategori Produk                         │
│ ┌─────────────────────────────────────┐ │
│ │ Pilih kategori                   ▾  │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Chevron icon: 16px, #64748B, right 14px │
│ Same height/styling as text input       │
└─────────────────────────────────────────┘

Open:
┌─────────────────────────────────────────┐
│ Kategori Produk                         │
│ ┌─────────────────────────────────────┐ │
│ │ Pilih kategori                   ▴  │ │
│ ├─────────────────────────────────────┤ │
│ │ Keycaps & Accessories              │ │  ← hover: bg #F1F5F9
│ │ Batik & Textile                    │ │
│ │ Handwoven & Rattan        ✓        │ │  ← selected: text #006B52,
│ │ Silver & Jewelry                   │ │     ✓ icon right, bg #E6F5F0
│ │ Wood Carving                       │ │
│ │ Pottery & Ceramics                 │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Dropdown: bg #FFF, border 1px #E2E8F0,  │
│ radius 6px, shadow-md                   │
│ Max-height: 240px, overflow scroll      │
│ Item height: 40px, padding 0 14px       │
│ Animation: fadeIn + slideDown 150ms     │
└─────────────────────────────────────────┘
```

---

## 3. Badge

```
Verified NIB:
┌────────────────────┐
│ ✓ Terverifikasi    │
│                    │
│ bg: #E6F5F0        │
│ text: #006B52      │
│ border: none       │
│ icon: CheckCircle  │
│ 12px, radius-full  │
│ padding: 4px 10px  │
│ font: 12px semi    │
└────────────────────┘

Premium Partner (PPJK):
┌────────────────────┐
│ ✓ Verified Partner │
│                    │
│ bg: #FEF9E7        │
│ text: #C8941A      │
│ border: 1px #C8941A│
│   opacity 20%      │
│ 12px, radius-full  │
└────────────────────┘

Status Badges:
┌─────────────────┐  ┌─────────────┐  ┌─────────────────┐  ┌─────────┐
│ ● Menunggu      │  │ ● Lunas     │  │ ● Diproses PPJK │  │ ● Gagal │
│                 │  │             │  │                 │  │         │
│ bg: #FFFBEB     │  │ bg: #F0FDF4 │  │ bg: #EFF6FF     │  │bg:#FEF2F│
│ text: #D97706   │  │ text:#16A34A│  │ text: #2563EB   │  │tx:#DC262│
│ dot: #D97706    │  │ dot:#16A34A │  │ dot: #2563EB    │  │dt:#DC262│
└─────────────────┘  └─────────────┘  └─────────────────┘  └─────────┘

All badges: radius-full, padding 4px 12px, font 12px semibold
Dot: 6px circle, margin-right 6px
```

---

## 4. Card

### Product Card

```
┌─────────────────────────┐
│                         │
│  ┌───────────────────┐  │   Image area:
│  │                   │  │   - Aspect ratio 4:3
│  │    Product Image  │  │   - object-fit: cover
│  │    (4:3 ratio)    │  │   - border-radius: 8px 8px 0 0
│  │                   │  │
│  └───────────────────┘  │
│                         │
│  ✓ Keicaps.id           │   Verified inline:
│                         │   - 12px, #006B52, bg #E6F5F0, pill
│  Artisan Keycap         │   Product name:
│  Dragon Scale           │   - 15px, semibold, #0F1A2A
│                         │   - max 2 lines, line-clamp-2
│  MOQ: 50 unit           │   MOQ:
│                         │   - 12px, #64748B
│  Rp 150.000 — 500.000  │   Price:
│                         │   - font-mono, 14px, semibold, #0F1A2A
│  ┌───────────────────┐  │
│  │    Hubungi ✉      │  │   CTA button:
│  └───────────────────┘  │   - Secondary style, full-width
│                         │   - 36px height (compact)
└─────────────────────────┘

Container:
- bg: #FFFFFF
- border: 1px #E2E8F0
- border-radius: 8px
- padding (body): 16px
- gap (body items): 8px
- shadow: none
- hover: translateY(-2px), border #006B52, shadow-sm
- transition: 150ms ease
- width: flexible (grid responsive)
```

### Stat Card (Dashboard)

```
┌─────────────────────────┐
│                         │
│  ┌────┐                 │   Icon container:
│  │ 📦 │   12            │   - 40×40px circle
│  └────┘   Produk Aktif  │   - bg #E6F5F0
│                         │   - icon 20px #006B52
│           ↑ 2 baru      │
│                         │   Number:
└─────────────────────────┘   - font-mono, 28px, bold, #0F1A2A
                              Label:
                              - 13px, #64748B
                              Sub-info:
                              - 12px, #16A34A (positive), #DC2626 (negative)
                              Container:
                              - bg #FFF, border 1px #E2E8F0
                              - radius 8px, padding 24px
                              - NO shadow
```

### PPJK Card

```
┌─────────────────────────────┐
│                             │
│  PT. Buana Ekspor Global    │   Company name: 16px semi #0F1A2A
│  ✓ Verified Partner         │   Gold verified badge
│                             │
│  📍 Jakarta, DKI Jakarta    │   Location: 13px, #64748B
│                             │
│  ★★★★★ 4.8 (23 ulasan)    │   Stars: 14px, filled #C8941A,
│                             │   empty #E2E8F0
│  Layanan:                   │   Count: 13px, #64748B
│  [PEB] [PIB] [Cukai]       │
│                             │   Service pills:
│  ┌───────────────────────┐  │   - 11px, bg #F1F5F9, text #384250
│  │      Hubungi          │  │   - radius-full, padding 4px 10px
│  └───────────────────────┘  │
│                             │
└─────────────────────────────┘

Container: same as product card
```

---

## 5. Modal

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  Overlay: bg rgba(15, 26, 42, 0.5), backdrop-filter blur(4px)       │
│                                                                      │
│       ┌──────────────────────────────────────────┐                  │
│       │                                          │                  │
│       │  Modal Title                    [✕]      │                  │
│       │  ← 18px semi #0F1A2A      close btn     │                  │
│       │                                          │                  │
│       │  ─────────────────────────────────────── │                  │
│       │                                          │                  │
│       │  Modal content area                      │                  │
│       │  ← 14px, #384250                        │                  │
│       │                                          │                  │
│       │  ─────────────────────────────────────── │                  │
│       │                                          │                  │
│       │       [Batal]        [Konfirmasi]        │                  │
│       │       ghost btn       primary btn        │                  │
│       │                                          │                  │
│       └──────────────────────────────────────────┘                  │
│                                                                      │
│  Modal: bg #FFF, radius 12px, shadow-lg                             │
│  Width: 480px (sm), 560px (md), 720px (lg)                          │
│  Padding: 24px (sm), 32px (md/lg)                                   │
│  Close button: 32×32px, ghost style, top-right                      │
│  Divider: 1px #E2E8F0                                               │
│  Footer: flex justify-end, gap 12px                                  │
│  Animation enter: fadeIn (200ms) + scaleUp from 0.95 (200ms)        │
│  Animation exit: fadeOut (150ms)                                     │
│  Focus trap: enabled                                                 │
│  ESC key: close                                                      │
│  Mobile: full-screen (100vw × 100vh), radius 0                      │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 6. Toast / Notification

```
Success:                               Error:
┌────────────────────────────────┐     ┌────────────────────────────────┐
│ ✓  Pesan berhasil dikirim.    │     │ ✕  Gagal upload gambar.       │
│    Buyer akan menerima        │     │    Ukuran file melebihi 5MB.  │
│    notifikasi.                │     │                                │
└────────────────────────────────┘     └────────────────────────────────┘

Warning:                               Info:
┌────────────────────────────────┐     ┌────────────────────────────────┐
│ ⚠  QR Code akan kedaluwarsa   │     │ ℹ  Fitur baru: Voice Chat     │
│    dalam 1 jam.               │     │    sekarang tersedia.          │
└────────────────────────────────┘     └────────────────────────────────┘

Styling:
- Position: top-right, 16px from edges
- Width: 380px max
- Border-left: 4px solid (status color)
- bg: status light color
- Radius: 8px
- Shadow: shadow-md
- Padding: 14px 16px
- Icon: 18px, status color, margin-right 12px
- Title text: 14px, semibold, #0F1A2A
- Body text: 13px, #384250
- Auto dismiss: 5 seconds (success/info), 8 seconds (warning/error)
- Animation: slideInRight 200ms ease-out
- Dismiss: fade + slideRight 150ms
- Stack: max 3 visible, newest on top, gap 8px
- Close button: ✕ 14px, #94A3B8, top-right 8px
```

---

## 7. Tabs

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  [Semua]   [Menunggu]   [Lunas]   [Selesai]             │
│   ────       ────                                        │
│  active     active underline = 2px #C8941A               │
│  text =     (bottom border, not bg color)                │
│  #006B52                                                 │
│                                                          │
│  Inactive: text #64748B, hover text #384250              │
│  Tab item: padding 12px 0, margin-right 24px             │
│  Font: 14px, semibold (active), medium (inactive)        │
│  Border-bottom container: 1px #E2E8F0                    │
│                                                          │
│  Mobile: horizontal scroll if overflow                   │
│  Animation: underline slide 200ms ease                   │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 8. Avatar

```
┌─────┐   ┌───┐   ┌──┐
│     │   │   │   │  │
│ 80  │   │ 40│   │32│   Sizes: 80px (profile), 40px (list),
│     │   │   │   │  │          32px (inline/sidebar), 24px (compact)
└─────┘   └───┘   └──┘

- Shape: circle (radius-full)
- Border: 2px #FFFFFF (when on colored bg)
- Fallback (no image): bg #E6F5F0, text #006B52,
  initials 2 chars, font-size 40% of container
  Example: "KI" for Keicaps.id
- Verified overlay (optional): small ✓ badge at
  bottom-right corner of avatar, 16px, bg #006B52,
  text white, border 2px white
```

---

## 9. Pagination

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│      ←  1  [2]  3  4  ...  12  →                      │
│                                                        │
│  Active page [2]:                                      │
│  - bg #006B52, text #FFFFFF                            │
│  - 36×36px, radius 6px                                 │
│                                                        │
│  Inactive page:                                        │
│  - bg transparent, text #384250                        │
│  - hover: bg #F1F5F9                                   │
│  - 36×36px                                             │
│                                                        │
│  Arrow buttons: ← →                                   │
│  - 36×36px, ghost style, #64748B                       │
│  - disabled (first/last): #E2E8F0, cursor not-allowed  │
│                                                        │
│  Ellipsis: "..." text #94A3B8, not clickable           │
│  Gap: 4px between items                                │
│  Font: 14px, Inter                                     │
│  Align: center                                         │
│                                                        │
└────────────────────────────────────────────────────────┘
```

---

## 10. Filter Chip

```
Inactive:                     Active:
┌──────────────────┐          ┌──────────────────┐
│ Semua Kategori ▾ │          │ ✕ Keycaps       │
└──────────────────┘          └──────────────────┘

Inactive: bg #F1F5F9, text #384250, border 1px #E2E8F0
Active: bg #E6F5F0, text #006B52, border 1px #006B52
Height: 36px, radius 6px, padding 0 14px
Font: 13px, medium
Chevron/close icon: 14px, margin-left 6px
Hover inactive: bg #E2E8F0
Hover active: bg #D0EBE3
Gap between chips: 8px
```

---

## 11. Breadcrumb

```
E-Katalog  >  Keycaps  >  Artisan Dragon Scale
  #006B52      #006B52      #64748B (current = muted, no link)

Font: 13px, Inter
Separator: > (or ChevronRight icon 12px), color #94A3B8
Link hover: underline
Current page: not a link, #64748B
Gap: 6px (between separator and text)
```

---

## 12. Voice Recorder Button (Chat)

```
Idle:                    Recording:                 Processing:
┌────────────────┐       ┌────────────────┐         ┌─────────────────┐
│                │       │                │         │                 │
│  🎤 (40px)    │       │  ■ 00:23      │         │  ◌ Mengolah...  │
│               │       │  (recording)   │         │                 │
│  ghost circle │       │  red pulse     │         │  spinner        │
│  #64748B      │       │  bg #FEF2F2    │         │  #006B52        │
│               │       │  border #DC2626│         │                 │
│  hover:       │       │  dot #DC2626   │         └─────────────────┘
│  bg #F1F5F9   │       │  pulse anim    │
│  text #006B52 │       │                │
└────────────────┘       │  timer: font-  │
                         │  mono 14px     │
                         └────────────────┘

Recording animation: red dot pulse (opacity 0.5→1→0.5, 1s infinite)
Audio waveform (optional): 3-5 bars, animate height, #DC2626
```

---

## 13. Payment Status Tracker

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  ●━━━━━━━━━━◎━━━━━━━━━━○━━━━━━━━━━○                            │
│  Dibuat     Dibayar    Diproses    Selesai                      │
│  ✓ 10 Jul   Menunggu   —           —                            │
│                                                                  │
│  Step styles:                                                    │
│  ● Done: 16px circle, bg #006B52, checkmark #FFF inside         │
│  ◎ Current: 16px circle, border 2px #C8941A, inner dot 8px      │
│     #C8941A, subtle pulse animation (scale 1→1.2→1, 2s)         │
│  ○ Pending: 16px circle, border 2px #E2E8F0                     │
│                                                                  │
│  Connector lines:                                                │
│  Done segment: 2px solid #006B52                                │
│  Pending segment: 2px solid #E2E8F0                             │
│                                                                  │
│  Labels:                                                         │
│  Done: 13px, #006B52, semibold                                  │
│  Current: 13px, #C8941A, semibold                               │
│  Pending: 13px, #94A3B8                                         │
│                                                                  │
│  Sub-label (date/status): 12px, #94A3B8                         │
│                                                                  │
│  Mobile: vertical layout (top-to-bottom)                        │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 14. Logo Specification

```
┌──────────────────────────────────────┐
│                                      │
│  NusaTrade                           │  Full logo:
│  ─── (gold line) ───                 │  - "NusaTrade": Plus Jakarta Sans
│  Connect                             │    24px, Bold, #006B52
│                                      │  - Gold accent line: 40px × 2px,
│                                      │    #C8941A, centered
│  Text mark only,                     │  - "Connect": Plus Jakarta Sans
│  no icon/symbol                      │    14px, Medium, #64748B,
│                                      │    letter-spacing 3px, uppercase
│                                      │
│  Compact (sidebar):                  │  Compact:
│  NTC  ← monogram, 3 letters,       │  - Only in collapsed sidebar
│         font-mono, bold, #006B52    │  - 32px container
│         inside 40px square           │
│         bg #E6F5F0, radius 8px      │
│                                      │
│  On dark bg (footer, auth panel):    │  Inverted:
│  NusaTrade → #FFFFFF                 │  - Same structure
│  ─── → #C8941A                       │  - NusaTrade text white
│  Connect → #94A3B8                   │  - Gold line stays #C8941A
│                                      │
└──────────────────────────────────────┘
```
