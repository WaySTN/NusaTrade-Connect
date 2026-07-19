'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { 
  Globe2, ShieldCheck, TrendingUp, Lock, CheckCircle2, ArrowRight, 
  Star, ChevronRight, BarChart3, Truck, Building2, QrCode, Sparkles, 
  Award, MapPin, Package, ArrowUpRight, MessageSquare 
} from 'lucide-react';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { MOCK_STATS, MOCK_UMKM, MOCK_PRODUCTS } from '@/lib/mock-data';
import { LiveAiDemo } from '@/components/landing/LiveAiDemo';

export default function Home() {
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="flex-1 flex flex-col w-full bg-[var(--color-bg-base)] relative overflow-x-hidden">
      <PublicNavbar />
      
      {/* Dynamic Background Glows & Patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 grid-pattern opacity-30"></div>
        <div className="absolute inset-0 batik-pattern opacity-[0.03]"></div>
        <div className="absolute top-[-10%] right-[-5%] w-[45%] h-[60%] bg-[var(--color-primary)] rounded-full blur-[160px] opacity-[0.09]"></div>
        <div className="absolute top-[25%] left-[-10%] w-[35%] h-[45%] bg-[var(--color-accent)] rounded-full blur-[140px] opacity-[0.07]"></div>
      </div>
      
      {/* ─── 1. HERO SECTION ────────────────────────────────────────────────── */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative pt-8 pb-16 lg:pt-14 lg:pb-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[var(--color-border)] text-[var(--color-text-primary)] text-xs sm:text-sm font-bold shadow-xs animate-fade-in">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--color-primary)]"></span>
              </span>
              <span>🇮🇩 Platform Ekspor B2B Ekonomi Kreatif Indonesia</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-display font-black text-[var(--color-text-primary)] leading-[1.08] tracking-tight animate-slide-up">
              Bawa Produk <br className="hidden sm:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] via-[#008f6b] to-[var(--color-accent)]">
                Kreatif Nusantara
              </span> <br />
              ke Panggung Dunia
            </h1>
            
            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium animate-slide-up">
              Menghubungkan UMKM Indonesia dengan pembeli internasional melalui verifikasi legalitas NIB, AI Chat Auto-Translation, dan QRIS Antarnegara.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2 animate-slide-up">
              <Link href="/register" className="w-full sm:w-auto">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-full sm:w-auto text-sm font-bold emerald-gradient h-14 px-8 rounded-2xl shadow-xl shadow-[var(--color-primary)]/20 hover:scale-[1.02] transition-transform" 
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Mulai Ekspor Sekarang
                </Button>
              </Link>
              
              <Link href="/umkm" className="w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto text-sm font-bold h-14 px-8 rounded-2xl bg-white/80 backdrop-blur-sm border-[var(--color-border)] hover:bg-white hover:border-[var(--color-primary-subtle)]"
                  leftIcon={<Building2 className="w-5 h-5 text-[var(--color-primary)]" />}
                >
                  Lihat Mitra UMKM
                </Button>
              </Link>
            </div>
            
            {/* Social Proof Avatars */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4 animate-fade-in">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden shadow-sm">
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=Ekspor${i}&backgroundColor=transparent`} alt="User" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-[var(--color-text-secondary)] text-left">
                Bergabung bersama <span className="text-[var(--color-primary)] font-bold">1,200+ UMKM Eksportir</span> & 850+ International Buyers
              </div>
            </div>

          </div>
          
          {/* Right Column: Interactive Hero Mockup Showcase */}
          <div className="lg:col-span-6 relative animate-fade-in">
            <div className="relative rounded-3xl bg-white border border-[var(--color-border)] shadow-2xl p-6 sm:p-8 space-y-6 overflow-hidden">
              
              {/* Header Bar Mockup */}
              <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  <span className="text-xs font-mono text-[var(--color-text-muted)] font-bold ml-2">nusatrade-connect.id</span>
                </div>
                <div className="bg-[var(--color-primary-subtle)] text-[var(--color-primary)] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  LIVE DASHBOARD
                </div>
              </div>

              {/* Grid Demo Cards */}
              <div className="grid grid-cols-2 gap-4">
                
                <div className="bg-[var(--color-bg-subtle)] p-4 rounded-2xl border border-[var(--color-border)] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-[var(--color-primary)]">
                    <ShieldCheck className="w-4 h-4" /> Legalitas NIB
                  </div>
                  <div className="text-sm font-bold font-mono text-[var(--color-text-primary)]">9120****7364</div>
                  <div className="text-[10px] font-semibold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-md w-fit">
                    Terverifikasi OSS
                  </div>
                </div>

                <div className="bg-[var(--color-bg-subtle)] p-4 rounded-2xl border border-[var(--color-border)] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-amber-600">
                    <QrCode className="w-4 h-4" /> QRIS Antarnegara
                  </div>
                  <div className="text-sm font-bold font-mono text-[var(--color-text-primary)]">DuitNow / PayNow</div>
                  <div className="text-[10px] font-semibold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-md w-fit">
                    Settlement Real-Time
                  </div>
                </div>

              </div>

              {/* AI Chat Preview Card */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-5 rounded-2xl space-y-3 shadow-md">
                <div className="flex items-center justify-between text-xs border-b border-slate-700 pb-2">
                  <span className="font-bold flex items-center gap-1.5 text-emerald-400">
                    <Sparkles className="w-4 h-4" /> AI Negotiation Assistant
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Buyer from USA</span>
                </div>
                
                <div className="text-xs space-y-2 font-medium">
                  <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700 text-slate-300">
                    🇮🇩 &quot;Mas sy mau jual kopi gayo 100kg harganya berapa?&quot;
                  </div>
                  <div className="bg-[var(--color-primary)] text-white p-2.5 rounded-xl text-xs font-semibold shadow-xs">
                    🌐 &quot;Dear Buyer, We can supply 100kg of Specialty Gayo Coffee at $12/kg with organic certification.&quot;
                  </div>
                </div>
              </div>

              {/* Floating Success Notification Card */}
              <div className="bg-white p-4 rounded-2xl shadow-xl border border-[var(--color-border)] flex items-center gap-4 animate-rise">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-[var(--color-text-primary)]">Transaksi Ekspor Berhasil</div>
                  <div className="text-xs text-[var(--color-text-secondary)] font-medium">Pembeli dari Singapura • $15,000 USD</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* ─── 2. SOCIAL PROOF INSTITUTION STRIP ─────────────────────────────── */}
      <section className="border-y border-[var(--color-border)] bg-white py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-extrabold text-[var(--color-text-muted)] uppercase tracking-widest mb-6">
            Didukung Oleh Ekosistem Perdagangan & Instansi Resmi Indonesia
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2 font-display font-bold text-lg text-[var(--color-text-primary)]"><Building2 className="w-5 h-5 text-[var(--color-primary)]"/> APINDO</div>
            <div className="flex items-center gap-2 font-display font-bold text-lg text-[var(--color-text-primary)]"><Globe2 className="w-5 h-5 text-[var(--color-primary)]"/> KADIN Indonesia</div>
            <div className="flex items-center gap-2 font-display font-bold text-lg text-[var(--color-text-primary)]"><ShieldCheck className="w-5 h-5 text-[var(--color-primary)]"/> Bea Cukai RI</div>
            <div className="flex items-center gap-2 font-display font-bold text-lg text-[var(--color-text-primary)]"><Truck className="w-5 h-5 text-[var(--color-primary)]"/> Pelindo</div>
            <div className="flex items-center gap-2 font-display font-bold text-lg text-[var(--color-text-primary)]"><QrCode className="w-5 h-5 text-[var(--color-primary)]"/> QRIS Bank Indonesia</div>
          </div>
        </div>
      </section>

      {/* ─── 3. LIVE INTERACTIVE AI DEMO SECTION ────────────────────────────── */}
      <section className="py-20 bg-[var(--color-bg-base)] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary-subtle)] text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Solusi Kendala Bahasa
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[var(--color-text-primary)] tracking-tight">
              Tanpa Hambatan Bahasa Dalam Bernegosiasi
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] font-medium">
              Uji coba langsung bagaimana AI NusaTrade mengubah kalimat informal UMKM lokal menjadi bahasa Inggris profesional.
            </p>
          </div>

          <LiveAiDemo />
        </div>
      </section>

      {/* ─── 4. FEATURED PRODUCTS & UMKM SHOWCASE ─────────────────────────── */}
      <section className="py-20 bg-white border-y border-[var(--color-border)] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary-subtle)] text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider mb-2">
                <Award className="w-4 h-4" /> Produk Ekspor Unggulan
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[var(--color-text-primary)] tracking-tight">
                Karya Kreatif Nusantara Pilihan
              </h2>
            </div>

            <Link href="/umkm">
              <Button variant="outline" className="font-bold text-xs h-11 px-5 rounded-xl hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]">
                Lihat Seluruh Direktori UMKM <ArrowRight className="w-4 h-4 ml-1 inline" />
              </Button>
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_PRODUCTS.slice(0, 4).map(product => (
              <div 
                key={product.id}
                className="bg-white border border-[var(--color-border)] rounded-3xl overflow-hidden shadow-xs hover:shadow-lg hover:border-[var(--color-primary-subtle)] transition-all duration-300 flex flex-col group"
              >
                <div className="aspect-square w-full relative bg-[var(--color-bg-subtle)] overflow-hidden">
                  <img 
                    src={product.photoUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/90 backdrop-blur-md text-[var(--color-primary)] px-2.5 py-1 rounded-full shadow-sm">
                      {product.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-base text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-1 mb-1">
                      {product.name}
                    </h3>

                    <div className="text-xs text-[var(--color-text-secondary)] font-medium flex items-center gap-1.5 mb-3">
                      <Building2 className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0" />
                      <span className="truncate">{product.sellerName}</span>
                    </div>

                    <div className="text-[10px] text-[var(--color-text-muted)] uppercase font-extrabold tracking-wider">
                      Estimasi Harga B2B
                    </div>
                    <div className="font-mono font-bold text-[var(--color-primary)] text-sm">
                      {formatRupiah(product.minPrice)} - {formatRupiah(product.maxPrice)}
                    </div>
                  </div>

                  <Link href={`/katalog/${product.slug}`}>
                    <Button 
                      variant="outline" 
                      className="w-full justify-between font-bold text-xs h-10 rounded-xl group-hover:border-[var(--color-primary)] group-hover:text-[var(--color-primary)]"
                      rightIcon={<ArrowUpRight className="w-4 h-4" />}
                    >
                      Detail Produk
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── 5. 3-PILLAR FEATURES SECTION ───────────────────────────────────── */}
      <section className="py-24 bg-[var(--color-bg-base)] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[var(--color-text-primary)] tracking-tight">
              Kenapa Memilih <span className="text-[var(--color-primary)]">NusaTrade</span>?
            </h2>
            <p className="text-base text-[var(--color-text-secondary)] font-medium">
              Solusi end-to-end memecahkan kendala utama ekspor: Legalitas, Komunikasi, dan Logistik Kepabeanan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pillar 1 */}
            <div className="bg-white p-8 rounded-3xl border border-[var(--color-border)] shadow-xs hover:shadow-md transition-shadow space-y-4 relative overflow-hidden group">
              <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary-subtle)] text-[var(--color-primary)] flex items-center justify-center font-display font-black text-2xl group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
                01
              </div>
              <h3 className="text-xl font-bold font-display text-[var(--color-text-primary)]">
                Verifikasi Legalitas NIB OSS
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] font-medium leading-relaxed">
                Seluruh profil UMKM terhubung langsung dengan validasi NIB Kemenkop/OSS RI untuk menjamin legalitas bisnis di mata buyer internasional.
              </p>
              <ul className="space-y-2 pt-2 text-xs font-semibold text-[var(--color-text-secondary)]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)]" /> Lencana Verified NIB Resmi
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)]" /> Pengurusan Sertifikat Organik & ISO
                </li>
              </ul>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white p-8 rounded-3xl border border-[var(--color-border)] shadow-xs hover:shadow-md transition-shadow space-y-4 relative overflow-hidden group">
              <div className="w-14 h-14 rounded-2xl bg-[var(--color-accent-light)] text-[var(--color-accent)] flex items-center justify-center font-display font-black text-2xl group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors">
                02
              </div>
              <h3 className="text-xl font-bold font-display text-[var(--color-text-primary)]">
                AI Business Chat & Translation
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] font-medium leading-relaxed">
                Negosiasi harga dan spesifikasi tanpa kendala bahasa. AI secara otomatis mengonversi kalimat kasual menjadi terjemahan bisnis profesional.
              </p>
              <ul className="space-y-2 pt-2 text-xs font-semibold text-[var(--color-text-secondary)]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" /> Terjemahan Real-Time 50+ Bahasa
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" /> Penyesuaian Tone Bisnis B2B
                </li>
              </ul>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white p-8 rounded-3xl border border-[var(--color-border)] shadow-xs hover:shadow-md transition-shadow space-y-4 relative overflow-hidden group">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-display font-black text-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                03
              </div>
              <h3 className="text-xl font-bold font-display text-[var(--color-text-primary)]">
                QRIS Antarnegara & PPJK Hub
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] font-medium leading-relaxed">
                Kemudahan pembayaran lintas negara menggunakan QRIS BI serta integrasi langsung dengan mitra Perusahaan Pengurusan Jasa Kepabeanan (PPJK).
              </p>
              <ul className="space-y-2 pt-2 text-xs font-semibold text-[var(--color-text-secondary)]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" /> QRIS Cross-Border (MY, SG, CN)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" /> Pengurusan Dokumen PEB / PIB
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* ─── 6. ANIMATED COUNTER STATS SECTION ─────────────────────────────── */}
      <section className="py-16 bg-[var(--color-primary)] text-white relative z-10 overflow-hidden">
        <div className="absolute inset-0 futuristic-bg opacity-30 mix-blend-overlay"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/20 text-center">
            
            <div className="p-3 sm:p-4 flex flex-col items-center justify-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-mono font-black mb-1 whitespace-nowrap tracking-tight">
                Rp 125 M+
              </div>
              <div className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-emerald-200">
                Nilai Transaksi Ekspor
              </div>
            </div>

            <div className="p-3 sm:p-4 pt-6 sm:pt-4 flex flex-col items-center justify-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-mono font-black mb-1 whitespace-nowrap tracking-tight">
                1,200+
              </div>
              <div className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-emerald-200">
                Eksportir UMKM Terdaftar
              </div>
            </div>

            <div className="p-3 sm:p-4 pt-6 sm:pt-4 flex flex-col items-center justify-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-mono font-black mb-1 whitespace-nowrap tracking-tight">
                150+
              </div>
              <div className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-emerald-200">
                Mitra PPJK Terverifikasi
              </div>
            </div>

            <div className="p-3 sm:p-4 pt-6 sm:pt-4 flex flex-col items-center justify-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-mono font-black mb-1 whitespace-nowrap tracking-tight">
                50+
              </div>
              <div className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-emerald-200">
                Negara Tujuan Ekspor
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 7. GRAND CTA BANNER ────────────────────────────────────────────── */}
      <section className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 sm:p-14 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 batik-pattern opacity-10 pointer-events-none"></div>

            <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight max-w-3xl mx-auto">
              Siap Membawa Produk Anda Menguasai Pasar Dunia?
            </h2>

            <p className="text-slate-300 text-sm sm:text-base font-medium max-w-xl mx-auto leading-relaxed">
              Bergabunglah bersama ribuan UMKM Ekonomi Kreatif Indonesia dan rasakan kemudahan ekspor B2B berbasis AI.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/register" className="w-full sm:w-auto">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-full sm:w-auto font-bold text-sm h-14 px-8 rounded-2xl emerald-gradient shadow-xl shadow-[var(--color-primary)]/30"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Daftar Akun Gratis Sekarang
                </Button>
              </Link>

              <Link href="/umkm" className="w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto font-bold text-sm h-14 px-8 rounded-2xl bg-white/10 text-white border-white/20 hover:bg-white/20"
                >
                  Jelajahi Mitra UMKM
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
