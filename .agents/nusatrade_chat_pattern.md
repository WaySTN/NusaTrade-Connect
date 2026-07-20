# NusaTrade Connect — Pola Chat Demo (Pitchdeck)

> **Konteks**: Dokumen ini adalah blueprint vibe coding untuk AI/developer.
> Generate ulang komponen ini sesuai tech stack yang dipakai (React, Next.js, Vue, dsb).
> Fokus: tampilan demo pitchdeck, bukan produksi penuh.

---

## Arsitektur Halaman

```
[ChatDemoPage]
  ├── [StepIndicator]          → progress bar 4 langkah
  ├── [ChatLayout]             → dua panel side-by-side
  │     ├── [BuyerPanel]       → sisi buyer (China / luar negeri)
  │     └── [SellerPanel]      → sisi UMKM (Indonesia)
  └── (state global bersama kedua panel)
```

---

## State yang Dibutuhkan

```ts
type Message = {
  id: string
  from: 'buyer' | 'seller' | 'system'
  lang: 'zh' | 'id' | 'en' | 'ai'
  content: string
  timestamp: string
  type: 'original' | 'translated' | 'corrected' | 'sent'
}

type Step = 1 | 2 | 3 | 4

// State utama
buyerMessages: Message[]       // ditampilkan di BuyerPanel
sellerMessages: Message[]      // ditampilkan di SellerPanel
currentStep: Step              // untuk StepIndicator
showAIAlert: boolean           // apakah AI correction box muncul
aiCorrectedText: string        // isi teks yang sudah dikoreksi AI
```

---

## Alur Utama (Happy Path Demo)

```
LANGKAH 1 — Buyer kirim pesan (Mandarin)
  Trigger : buyer klik tombol kirim
  Output  :
    → BuyerPanel  : tambah bubble KANAN dengan label "Mandarin (pesan asli)"
    → SellerPanel : tambah dua bubble KIRI berurutan:
        [1] label "Pesan asli buyer (Mandarin)"  → tampilkan teks asli Mandarin (style abu/italic)
        [2] label "Terjemahan AI → Bahasa Indonesia" → tampilkan teks terjemahan
    → Step berubah ke 2

LANGKAH 2 — AI Auto-Correction muncul di SellerPanel
  Trigger : otomatis setelah pesan buyer masuk (simulasi 500ms delay)
  Output  :
    → SellerPanel : tampilkan [AIAlertBox]
        - Teks asli UMKM (informal, dicoret)
        - Teks versi bisnis AI (dalam Mandarin, siap kirim ke buyer)
        - Tombol: [Setujui & Kirim] | [Edit dulu]
    → Step tetap di 2

LANGKAH 3 — UMKM klik "Setujui & Kirim"
  Trigger : klik tombol Setujui
  Output  :
    → SellerPanel : [AIAlertBox] hilang, tambah bubble KANAN:
        label "AI → Mandarin (terkirim ke buyer)"
        isi: teks versi bisnis dalam Mandarin
    → BuyerPanel  : setelah delay 1000ms, tambah bubble KIRI:
        label "Balasan UMKM (Mandarin)"
        isi: teks yang sama, diterima buyer dalam Mandarin
    → Step berubah ke 3 → lalu ke 4

LANGKAH 4 — Buyer membalas (konfirmasi order)
  Trigger : otomatis setelah delay 800ms dari langkah 3
  Output  :
    → BuyerPanel  : tambah bubble KANAN buyer (Mandarin) berisi konfirmasi alamat
    → SellerPanel : tambah dua bubble KIRI:
        [1] Pesan asli buyer Mandarin
        [2] Terjemahan AI ke Bahasa Indonesia
    → Step selesai di 4
```

---

## Spesifikasi Komponen

### `<StepIndicator>`

```
Props: currentStep (1–4)

Tampilkan 4 langkah horizontal:
  1. "Buyer kirim (Mandarin)"
  2. "AI terjemah + koreksi"
  3. "UMKM setujui"
  4. "Buyer terima balasan"

Style:
  - done  → titik biru (#378ADD), teks abu
  - active → titik hijau (#1D9E75), teks hitam bold
  - pending → titik abu, teks muted
```

---

### `<ChatPanel side="buyer" | "seller">`

```
Layout: flex column, tinggi 580px
Header:
  - Avatar (inisial, bulat)
  - Nama + Kota / Status NIB
  - Dot hijau (online)

Messages area:
  - overflow-y: auto
  - gap antar bubble: 8px

Bubble kanan (pesan keluar): warna solid (biru buyer / hijau seller)
Bubble kiri (pesan masuk) : warna muted / border tipis

Setiap bubble punya:
  - Label badge kecil di atas (bahasa / sumber)
  - Isi teks
  - Timestamp + status centang

Input area bawah:
  - Textarea autosize
  - Tombol send (ikon kirim, bulat)
  - Placeholder sesuai panel:
      buyer  → "Ketik dalam Mandarin / Inggris..."
      seller → "Balas pakai Bahasa Indonesia biasa, AI yang koreksi..."
```

---

### `<AIAlertBox>`

```
Tampil: di SellerPanel, setelah pesan buyer masuk
Warna : background amber muda, border amber

Isi:
  [Header]  → ikon wand + "AI Auto-Correction — pratinjau sebelum kirim"
  [Body]    → keterangan singkat (1–2 kalimat)
  [Label]   → "Balasan asli Anda (informal)"
  [Teks asli] → dicoret, warna abu
  [Label]   → "✦ Versi bisnis oleh AI (akan dikirim ke buyer dalam Mandarin)"
  [Teks AI] → border biru, bisa diedit (contenteditable atau textarea)
  [Tombol]  → [Setujui & Kirim] hijau  |  [Edit dulu] ghost

Aksi "Setujui & Kirim":
  → sembunyikan box ini
  → jalankan LANGKAH 3 (lihat alur utama)

Aksi "Edit dulu":
  → aktifkan contenteditable pada [Teks AI]
  → fokus ke sana
```

---

## Label Badge per Tipe Pesan

| Tipe | Label | Warna |
|------|-------|-------|
| Pesan asli buyer (Mandarin) di panel seller | "Pesan asli buyer (Mandarin)" | amber muda / teks amber tua |
| Terjemahan ke Indonesia | "Terjemahan AI → Bahasa Indonesia" | hijau muda / teks hijau tua |
| Balasan UMKM sudah dikoreksi (di panel seller) | "AI → Mandarin (terkirim ke buyer)" | ungu muda / teks ungu tua |
| Balasan diterima buyer (di panel buyer) | "Balasan UMKM (Mandarin)" | amber muda / teks amber tua |
| Pesan keluar buyer | "Mandarin (pesan asli)" | biru muda / teks biru tua |

---

## Konten Demo (Hard-coded untuk Pitchdeck)

### Pesan buyer pertama
```
Mandarin (asli):
你好！我对你们的 keycaps 很感兴趣。
请问可以批量购买吗？最低订购量是多少？价格是怎么计算的？

Terjemahan Indonesia (untuk UMKM):
Halo! Saya tertarik dengan keycaps kalian.
Apakah bisa pesan dalam jumlah besar?
Berapa minimum order-nya dan bagaimana perhitungan harganya?
```

### Balasan UMKM (sebelum koreksi AI / informal)
```
"bisa kok, min order 50 pcs, harga $4.5/pcs,
ongkir tergantung negara tujuan"
```

### Balasan UMKM setelah dikoreksi AI (Mandarin, terkirim ke buyer)
```
尊敬的叶琳女士，

感谢您对我们 Keicaps 系列产品的关注。我们接受批量订购，
最低起订量 (MOQ) 为 50 件，单价 4.50 美元/件。

运费将依据目的地地址另行计算，
烦请提供收货地址以便我们为您出具精确报价。

此致，
Darmawan — Keicaps.id
```

### Balasan buyer kedua (konfirmasi)
```
Mandarin (asli):
非常感谢！50件起订量完全可以接受。
我的收货地址是中国广州市天河区。
请问能提供包含运费的完整报价单吗？

叶琳

Terjemahan Indonesia (untuk UMKM):
Terima kasih banyak! MOQ 50 unit sangat bisa diterima.
Alamat saya di Guangzhou, Tianhe District, China.
Bisakah Anda mengirimkan penawaran lengkap termasuk ongkos kirim?

Ye Lin
```

---

## Urutan Render Bubble di SellerPanel

```
1. [bubble-l] Pesan asli buyer (Mandarin) — style italic / abu
2. [bubble-l] Terjemahan AI → Bahasa Indonesia
3. [AIAlertBox] — muncul otomatis
   ↓ setelah klik "Setujui & Kirim"
4. [bubble-r] Teks AI dalam Mandarin — "terkirim ke buyer"
   ↓ setelah buyer balas (delay)
5. [bubble-l] Pesan asli buyer ke-2 (Mandarin)
6. [bubble-l] Terjemahan AI → Bahasa Indonesia ke-2
```

## Urutan Render Bubble di BuyerPanel

```
1. [bubble-r] Pesan keluar buyer (Mandarin)
   ↓ setelah UMKM approve (delay 1000ms)
2. [bubble-l] Balasan UMKM (Mandarin) — diterima dari sistem
   ↓ setelah delay 800ms
3. [bubble-r] Pesan keluar buyer ke-2 (Mandarin) — konfirmasi
```

---

## Catatan Implementasi

- **Tidak perlu API real** untuk demo pitchdeck. Semua konten hard-coded.
- Gunakan `setTimeout` untuk simulasi delay AI (500–1200ms) agar terasa natural.
- Jika pakai React: state `messages` array terpisah untuk buyer dan seller, update via `setState`.
- Jika pakai Next.js + Tailwind: semua warna bisa diganti dengan class Tailwind (`bg-amber-50`, `text-green-800`, dst).
- Komponen `AIAlertBox` bisa dijadikan modal di mobile view.
- Untuk presentasi fullscreen: sembunyikan StepIndicator, gunakan tombol manual "Next Step" untuk kontrol presenter.

---

## Ekstensi Opsional (post-MVP)

| Fitur | Keterangan |
|-------|------------|
| Pilih bahasa buyer | Dropdown: Mandarin / Inggris / Melayu |
| Animasi typing indicator | "AI sedang mengoreksi..." dengan 3 titik animasi |
| Konfirmasi harga pop-up | Alert jika AI mendeteksi angka nominal dalam pesan |
| Sound notifikasi | Suara "ding" saat pesan masuk (opsional demo) |
| Dark mode toggle | Untuk presentasi di ruangan gelap |
