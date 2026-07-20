'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import {
  Globe2, ShieldCheck, TrendingUp, Lock, CheckCircle2, ArrowRight,
  Star, ChevronRight, ChevronLeft, BarChart3, Truck, Building2, QrCode, Sparkles,
  Award, MapPin, Package, ArrowUpRight, MessageSquare
} from 'lucide-react';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { MOCK_STATS, MOCK_UMKM, MOCK_PRODUCTS } from '@/lib/mock-data';
import { LiveAiDemo } from '@/components/landing/LiveAiDemo';
import { AnimatedCounter } from '@/components/landing/AnimatedCounter';
import { useT } from '@/i18n/useT';
import { useLanguage } from '@/i18n/LanguageContext';
import { DynamicText } from '@/components/ui/DynamicText';

export default function Home() {
  const [activePillar, setActivePillar] = React.useState<number>(0);
  const [currentProductIndex, setCurrentProductIndex] = React.useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = React.useState(false);
  const t = useT();

  // Auto-advance step-by-step product slider every 3.5 seconds
  React.useEffect(() => {
    if (isCarouselPaused) return;
    const interval = setInterval(() => {
      setCurrentProductIndex((prev) => (prev + 1) % MOCK_PRODUCTS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isCarouselPaused]);

  const handlePrevProduct = () => {
    setCurrentProductIndex((prev) => (prev - 1 + MOCK_PRODUCTS.length) % MOCK_PRODUCTS.length);
  };

  const handleNextProduct = () => {
    setCurrentProductIndex((prev) => (prev + 1) % MOCK_PRODUCTS.length);
  };

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
              <span>🇮🇩 {t('hero.badge')}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-display font-black text-[var(--color-text-primary)] leading-[1.08] tracking-tight animate-slide-up">
              {t('hero.title1')} <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] via-[#008f6b] to-[var(--color-accent)]">
                {t('hero.title2')}
              </span> <br />
              {t('hero.title3')}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium animate-slide-up">
              {t('hero.subtitle')}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2 animate-slide-up">
              <Link href="/katalog" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto text-sm font-bold emerald-gradient h-14 px-8 rounded-2xl shadow-xl shadow-[var(--color-primary)]/20 hover:scale-[1.02] transition-transform"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  {t('hero.cta_katalog')}
                </Button>
              </Link>

              <Link href="/login" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-sm font-bold h-14 px-8 rounded-2xl bg-white/80 backdrop-blur-sm border-[var(--color-border)] hover:bg-white hover:border-[var(--color-primary-subtle)]"
                  leftIcon={<Building2 className="w-5 h-5 text-[var(--color-primary)]" />}
                >
                  {t('hero.cta_login')}
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
                {t('hero.social_proof')}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Hero Mockup Showcase */}
          <div className="lg:col-span-6 relative animate-fade-in">

            {/* ─── Floating Commodity Badges (Indonesian Commodities) ─────────── */}

            {/* 1. Top-Left Badge (Kopi Gayo) */}
            <div className="absolute -top-6 -left-6 z-20 hidden sm:flex items-center gap-3 bg-white/85 backdrop-blur-md border border-white/90 p-3 px-4 rounded-2xl shadow-xl animate-float-slow hover:scale-105 transition-transform">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center text-lg font-bold shadow-xs">☕</div>
              <div>
                <div className="text-xs font-bold text-[var(--color-text-primary)]">{t('hero_mockup.badge_1_title') || 'Kopi Specialty Gayo'}</div>
                <div className="text-[10px] text-[var(--color-primary)] font-extrabold uppercase tracking-wider">{t('hero_mockup.badge_1_subtitle') || 'Komoditas Aceh'}</div>
              </div>
            </div>

            {/* 2. Top-Right Badge (Rotan Bali) */}
            <div className="absolute -top-8 -right-6 z-20 hidden sm:flex items-center gap-3 bg-white/85 backdrop-blur-md border border-white/90 p-3 px-4 rounded-2xl shadow-xl animate-float-delayed hover:scale-105 transition-transform">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center text-lg font-bold shadow-xs">🛋️</div>
              <div>
                <div className="text-xs font-bold text-[var(--color-text-primary)]">{t('hero_mockup.badge_2_title') || 'Rotan Alami Bali'}</div>
                <div className="text-[10px] text-amber-600 font-extrabold uppercase tracking-wider">{t('hero_mockup.badge_2_subtitle') || 'Furniture & Craft'}</div>
              </div>
            </div>

            {/* 3. Middle-Right Badge (Batik Solo) */}
            <div className="absolute top-1/2 -right-8 -translate-y-1/2 z-20 hidden md:flex items-center gap-3 bg-white/85 backdrop-blur-md border border-white/90 p-3 px-4 rounded-2xl shadow-xl animate-float-slow hover:scale-105 transition-transform">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center text-lg font-bold shadow-xs">🥋</div>
              <div>
                <div className="text-xs font-bold text-[var(--color-text-primary)]">{t('hero_mockup.badge_3_title') || 'Batik Sutra Solo'}</div>
                <div className="text-[10px] text-purple-600 font-extrabold uppercase tracking-wider">{t('hero_mockup.badge_3_subtitle') || 'Fashion & Textile'}</div>
              </div>
            </div>

            {/* 4. Bottom-Left Badge (Rempah Banda) */}
            <div className="absolute -bottom-6 -left-6 z-20 hidden sm:flex items-center gap-3 bg-white/85 backdrop-blur-md border border-white/90 p-3 px-4 rounded-2xl shadow-xl animate-float-delayed hover:scale-105 transition-transform">
              <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-800 flex items-center justify-center text-lg font-bold shadow-xs">🌶️</div>
              <div>
                <div className="text-xs font-bold text-[var(--color-text-primary)]">{t('hero_mockup.badge_4_title') || 'Pala & Rempah Banda'}</div>
                <div className="text-[10px] text-orange-600 font-extrabold uppercase tracking-wider">{t('hero_mockup.badge_4_subtitle') || 'Agrikultur Maluku'}</div>
              </div>
            </div>

            {/* 5. Bottom-Right Badge (Atsiri Sumatera) */}
            <div className="absolute -bottom-8 -right-4 z-20 hidden sm:flex items-center gap-3 bg-white/85 backdrop-blur-md border border-white/90 p-3 px-4 rounded-2xl shadow-xl animate-float-slow hover:scale-105 transition-transform">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center text-lg font-bold shadow-xs">🌿</div>
              <div>
                <div className="text-xs font-bold text-[var(--color-text-primary)]">{t('hero_mockup.badge_5_title') || 'Minyak Atsiri Nilam'}</div>
                <div className="text-[10px] text-teal-600 font-extrabold uppercase tracking-wider">{t('hero_mockup.badge_5_subtitle') || 'Essential Sumatera'}</div>
              </div>
            </div>

            <div className="relative rounded-3xl bg-white border border-[var(--color-border)] shadow-2xl p-6 sm:p-8 space-y-6 overflow-hidden z-10">

              {/* Header Bar Mockup */}
              <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  <span className="text-xs font-mono text-[var(--color-text-muted)] font-bold ml-2">nusatrade-connect.id</span>
                </div>
                <div className="bg-[var(--color-primary-subtle)] text-[var(--color-primary)] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  {t('hero_mockup.live_dashboard') || 'LIVE DASHBOARD'}
                </div>
              </div>

              {/* Grid Demo Cards */}
              <div className="grid grid-cols-2 gap-4">

                <div className="bg-[var(--color-bg-subtle)] p-4 rounded-2xl border border-[var(--color-border)] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-[var(--color-primary)]">
                    <ShieldCheck className="w-4 h-4" /> {t('hero_mockup.nib_legality') || 'Legalitas NIB'}
                  </div>
                  <div className="text-sm font-bold font-mono text-[var(--color-text-primary)]">9120****7364</div>
                  <div className="text-[10px] font-semibold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-md w-fit">
                    {t('hero_mockup.oss_verified') || 'Terverifikasi OSS'}
                  </div>
                </div>

                <div className="bg-[var(--color-bg-subtle)] p-4 rounded-2xl border border-[var(--color-border)] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-amber-600">
                    <QrCode className="w-4 h-4" /> {t('hero_mockup.qris') || 'QRIS Antarnegara'}
                  </div>
                  <div className="text-sm font-bold font-mono text-[var(--color-text-primary)]">DuitNow / PayNow</div>
                  <div className="text-[10px] font-semibold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-md w-fit">
                    {t('hero_mockup.realtime') || 'Settlement Real-Time'}
                  </div>
                </div>

              </div>

              {/* AI Chat Preview Card */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-5 rounded-2xl space-y-3 shadow-md">
                <div className="flex items-center justify-between text-xs border-b border-slate-700 pb-2">
                  <span className="font-bold flex items-center gap-1.5 text-emerald-400">
                    <Sparkles className="w-4 h-4" /> {t('hero_mockup.ai_assistant') || 'AI Negotiation Assistant'}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{t('hero_mockup.buyer_usa') || 'Buyer from USA'}</span>
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
                  <div className="text-xs sm:text-sm font-bold text-[var(--color-text-primary)]">{t('hero_mockup.success_title') || 'Transaksi Ekspor Berhasil'}</div>
                  <div className="text-xs text-[var(--color-text-secondary)] font-medium">{t('hero_mockup.success_desc') || 'Pembeli dari Singapura • $15,000 USD'}</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* ─── 2. SOCIAL PROOF INSTITUTION STRIP (INFINITE MARQUEE WITH PAUSE ON HOVER) ── */}
      <section className="border-y border-[var(--color-border)] bg-white py-10 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="text-xs font-extrabold text-[var(--color-text-muted)] uppercase tracking-widest">
            {t('landing.supported_by') || 'Didukung Oleh Ekosistem Perdagangan & Instansi Resmi Indonesia'}
          </p>

          {/* Marquee Outer Container with Gradient Mask */}
          <div className="relative w-full overflow-hidden mask-linear-fade">

            {/* Left & Right Gradient Fade Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            {/* Sliding Track (Duplicated Array for Infinite Loop) */}
            <div className="animate-marquee flex items-center gap-6 sm:gap-8 py-2">
              {[
                { name: 'APINDO', src: '/apindo-logo.png' },
                { name: 'KADIN Indonesia', src: '/kadin.png' },
                { name: 'Bea Cukai RI', src: '/beacukai.png' },
                { name: 'Pelindo', src: '/pelindo.webp' },
                { name: 'Mitra PPJK', src: '/ppjk.webp' },
                { name: 'QRIS Bank Indonesia', src: '/QRIS_logo.svg.webp' },

                // Duplicate for seamless infinite loop
                { name: 'APINDO', src: '/apindo-logo.png' },
                { name: 'KADIN Indonesia', src: '/kadin.png' },
                { name: 'Bea Cukai RI', src: '/beacukai.png' },
                { name: 'Pelindo', src: '/pelindo.webp' },
                { name: 'Mitra PPJK', src: '/ppjk.webp' },
                { name: 'QRIS Bank Indonesia', src: '/QRIS_logo.svg.webp' },
              ].map((logo, index) => (
                <div
                  key={index}
                  className="h-16 sm:h-20 w-36 sm:w-44 px-4 py-3 shrink-0 flex items-center justify-center rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-[var(--color-primary)] hover:shadow-md transition-all duration-300 group hover:scale-105 cursor-pointer"
                  title={logo.name}
                >
                  <img
                    src={logo.src}
                    alt={`${logo.name} Logo`}
                    className="max-h-10 sm:max-h-12 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ─── 3. LIVE INTERACTIVE AI DEMO SECTION ────────────────────────────── */}
      <section className="py-20 bg-[var(--color-bg-base)] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary-subtle)] text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> {t('landing.ai_solution_title') || 'Solusi Kendala Bahasa'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[var(--color-text-primary)] tracking-tight">
              {t('landing.ai_solution_subtitle') || 'Tanpa Hambatan Bahasa Dalam Bernegosiasi'}
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] font-medium">
              {t('landing.ai_solution_desc') || 'Uji coba langsung bagaimana AI NusaTrade mengubah kalimat informal UMKM lokal menjadi bahasa Inggris profesional.'}
            </p>
          </div>

          <LiveAiDemo />
        </div>
      </section>

      {/* ─── 4. FEATURED PRODUCTS & UMKM SHOWCASE (AUTOMATIC STEP-BY-STEP SLIDER) ── */}
      <section className="py-20 bg-white border-y border-[var(--color-border)] relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary-subtle)] text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider mb-2">
                <Award className="w-4 h-4" /> {t('landing.products_title') || 'Produk Ekspor Unggulan'}
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[var(--color-text-primary)] tracking-tight">
                {t('landing.products_subtitle') || 'Karya Kreatif Nusantara Pilihan'}
              </h2>
            </div>

            {/* Slider Navigation & View All Link */}
            <div className="flex items-center gap-3">
              {/* Prev Button */}
              <button 
                onClick={handlePrevProduct}
                className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-100 hover:border-slate-300 flex items-center justify-center text-slate-700 transition-colors shadow-xs"
                title="Produk Sebelumnya"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Button */}
              <button 
                onClick={handleNextProduct}
                className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-100 hover:border-slate-300 flex items-center justify-center text-slate-700 transition-colors shadow-xs"
                title="Produk Selanjutnya"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <Link href="/katalog">
                <Button variant="outline" className="font-bold text-xs h-10 px-5 rounded-xl hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]">
                  {t('landing.view_all_catalog') || 'Lihat Seluruh Katalog'} <ArrowRight className="w-4 h-4 ml-1 inline" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Product Carousel Slider Track */}
          <div 
            className="relative w-full overflow-hidden"
            onMouseEnter={() => setIsCarouselPaused(true)}
            onMouseLeave={() => setIsCarouselPaused(false)}
          >
            <div 
              className="flex transition-transform duration-500 ease-out gap-6"
              style={{
                transform: `translateX(-${currentProductIndex * (100 / (typeof window !== 'undefined' && window.innerWidth < 640 ? 1 : typeof window !== 'undefined' && window.innerWidth < 1024 ? 2 : 4))}%)`
              }}
            >
              {MOCK_PRODUCTS.map((product, idx) => (
                <div
                  key={product.id}
                  className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] shrink-0 bg-white border border-[var(--color-border)] rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:border-[var(--color-primary-subtle)] hover:scale-[1.02] transition-all duration-300 flex flex-col group"
                >
                  <div className="aspect-square w-full relative bg-[var(--color-bg-subtle)] overflow-hidden">
                    <img
                      src={product.photoUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        // Fallback image if broken
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/90 backdrop-blur-md text-[var(--color-primary)] px-2.5 py-1 rounded-full shadow-sm">
                        <DynamicText text={product.category} />
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-bold text-base text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-1 mb-1">
                        <DynamicText text={product.name} />
                      </h3>

                      <div className="text-xs text-[var(--color-text-secondary)] font-medium flex items-center gap-1.5 mb-3">
                        <Building2 className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0" />
                        <span className="truncate"><DynamicText text={product.sellerName} /></span>
                      </div>

                      <div className="text-[10px] text-[var(--color-text-muted)] uppercase font-extrabold tracking-wider">
                        {t('landing.est_price') || 'Estimasi Harga B2B'}
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
                        {t('landing.product_details') || 'Detail Produk'}
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {MOCK_PRODUCTS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentProductIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentProductIndex === idx
                    ? 'w-8 bg-[var(--color-primary)]'
                    : 'w-2 bg-slate-200 hover:bg-slate-300'
                }`}
                title={`Ke Produk ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ─── 5. 3-PILLAR FEATURES SECTION ───────────────────────────────────── */}
      <section className="py-24 bg-[var(--color-bg-base)] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[var(--color-text-primary)] tracking-tight">
              {t('features.title')}
            </h2>
            <p className="text-base text-[var(--color-text-secondary)] font-medium">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">

            {/* Pillar 1 */}
            <div
              className="w-full max-w-[409px] p-[24px_20px] flex flex-col items-start gap-5 transition-all duration-300 space-y-2 relative overflow-hidden group hover:scale-[1.03] hover:-translate-y-1.5 hover:shadow-2xl hover:border-[var(--color-primary)]"
              style={{
                borderRadius: '16px',
                border: '3px solid rgba(28, 28, 28, 0.32)',
                background: 'linear-gradient(96deg, rgba(255, 255, 255, 0.95) 0.5%, rgba(245, 245, 245, 0.90) 100.02%)',
                backdropFilter: 'blur(12px)'
              }}
            >
              {/* Top Animated Glow Bar on Hover */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[var(--color-primary)] via-emerald-400 to-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>

              <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-black text-2xl bg-[var(--color-primary-subtle)] text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white group-hover:shadow-md transition-all duration-300">
                01
              </div>

              <h3 className="text-xl font-bold font-display text-[var(--color-text-primary)]">
                {t('features.f1_title')}
              </h3>

              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] font-medium leading-relaxed">
                {t('features.f1_desc')}
              </p>

              <ul className="space-y-2 pt-2 text-xs font-semibold text-[var(--color-text-secondary)] w-full">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)]" /> {t('features.f1_b1')}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)]" /> {t('features.f1_b2')}
                </li>
              </ul>
            </div>

            {/* Pillar 2 */}
            <div
              className="w-full max-w-[409px] p-[24px_20px] flex flex-col items-start gap-5 transition-all duration-300 space-y-2 relative overflow-hidden group hover:scale-[1.03] hover:-translate-y-1.5 hover:shadow-2xl hover:border-[var(--color-accent)]"
              style={{
                borderRadius: '16px',
                border: '3px solid rgba(28, 28, 28, 0.32)',
                background: 'linear-gradient(96deg, rgba(255, 255, 255, 0.95) 0.5%, rgba(245, 245, 245, 0.90) 100.02%)',
                backdropFilter: 'blur(12px)'
              }}
            >
              {/* Top Animated Glow Bar on Hover */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[var(--color-accent)] via-amber-300 to-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>

              <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-black text-2xl bg-[var(--color-accent-light)] text-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-white group-hover:shadow-md transition-all duration-300">
                02
              </div>

              <h3 className="text-xl font-bold font-display text-[var(--color-text-primary)]">
                {t('features.f2_title')}
              </h3>

              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] font-medium leading-relaxed">
                {t('features.f2_desc')}
              </p>

              <ul className="space-y-2 pt-2 text-xs font-semibold text-[var(--color-text-secondary)] w-full">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" /> {t('features.f2_b1')}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" /> {t('features.f2_b2')}
                </li>
              </ul>
            </div>

            {/* Pillar 3 */}
            <div
              className="w-full max-w-[409px] p-[24px_20px] flex flex-col items-start gap-5 transition-all duration-300 space-y-2 relative overflow-hidden group hover:scale-[1.03] hover:-translate-y-1.5 hover:shadow-2xl hover:border-blue-600"
              style={{
                borderRadius: '16px',
                border: '3px solid rgba(28, 28, 28, 0.32)',
                background: 'linear-gradient(96deg, rgba(255, 255, 255, 0.95) 0.5%, rgba(245, 245, 245, 0.90) 100.02%)',
                backdropFilter: 'blur(12px)'
              }}
            >
              {/* Top Animated Glow Bar on Hover */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-600 via-sky-300 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>

              <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-black text-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-md transition-all duration-300">
                03
              </div>

              <h3 className="text-xl font-bold font-display text-[var(--color-text-primary)]">
                {t('features.f3_title')}
              </h3>

              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] font-medium leading-relaxed">
                {t('features.f3_desc')}
              </p>

              <ul className="space-y-2 pt-2 text-xs font-semibold text-[var(--color-text-secondary)] w-full">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" /> {t('features.f3_b1')}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" /> {t('features.f3_b2')}
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
              <AnimatedCounter
                end={125}
                prefix="Rp "
                suffix=" M+"
                duration={2200}
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-mono font-black mb-1 whitespace-nowrap tracking-tight"
              />
              <div className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-emerald-200">
                {t('stats.title1')}
              </div>
            </div>

            <div className="p-3 sm:p-4 pt-6 sm:pt-4 flex flex-col items-center justify-center">
              <AnimatedCounter
                end={1200}
                suffix="+"
                duration={2000}
                formattingFn={(v) => v.toLocaleString('id-ID')}
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-mono font-black mb-1 whitespace-nowrap tracking-tight"
              />
              <div className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-emerald-200">
                {t('stats.title2')}
              </div>
            </div>

            <div className="p-3 sm:p-4 pt-6 sm:pt-4 flex flex-col items-center justify-center">
              <AnimatedCounter
                end={150}
                suffix="+"
                duration={1800}
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-mono font-black mb-1 whitespace-nowrap tracking-tight"
              />
              <div className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-emerald-200">
                {t('stats.title3')}
              </div>
            </div>

            <div className="p-3 sm:p-4 pt-6 sm:pt-4 flex flex-col items-center justify-center">
              <AnimatedCounter
                end={50}
                suffix="+"
                duration={1500}
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-mono font-black mb-1 whitespace-nowrap tracking-tight"
              />
              <div className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-emerald-200">
                {t('stats.title4')}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 7. GRAND CTA BANNER ────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2.5rem] bg-gradient-to-br from-[#004635] via-[#005743] to-[#003628] p-8 sm:p-14 text-white text-center space-y-6 shadow-2xl shadow-emerald-950/20 relative overflow-hidden border border-emerald-800/40">
            
            {/* Ambient Glowing Orbs */}
            <div className="absolute top-[-30%] left-[-10%] w-[60%] h-[70%] bg-emerald-400/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-30%] right-[-10%] w-[50%] h-[60%] bg-amber-400/15 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Interconnected Digital Trade Grid & Nodes SVG Overlay */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="cta-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-emerald-300" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#cta-grid)" />
                <circle cx="15%" cy="35%" r="4" className="fill-amber-400 animate-pulse" />
                <circle cx="80%" cy="25%" r="3" className="fill-emerald-300 animate-pulse" />
                <circle cx="88%" cy="70%" r="5" className="fill-teal-300 animate-pulse" />
              </svg>
            </div>

            {/* Floating Badge */}
            <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest text-emerald-200 shadow-sm mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>EKOSISTEM EKSPOR B2B INDONESIA</span>
            </div>

            {/* Heading */}
            <h2 className="relative z-10 text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight max-w-4xl mx-auto leading-[1.12]">
              {t('cta_bottom.title')}
            </h2>

            {/* Subtitle */}
            <p className="relative z-10 text-emerald-100/90 text-sm sm:text-base lg:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
              {t('cta_bottom.subtitle')}
            </p>

            {/* Action Buttons */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/register" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto font-extrabold text-sm h-14 px-9 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 hover:from-emerald-300 hover:to-teal-300 shadow-xl shadow-emerald-400/25 border-0 hover:scale-[1.02] transition-transform"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  {t('cta_bottom.btn_register')}
                </Button>
              </Link>

              <Link href="/umkm" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto font-bold text-sm h-14 px-8 rounded-2xl bg-white/10 backdrop-blur-md text-white border-white/20 hover:bg-white/20 hover:border-white/30"
                >
                  {t('cta_bottom.btn_umkm')}
                </Button>
              </Link>
            </div>

            {/* Micro Trust Indicators */}
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-white/10 text-xs font-semibold text-emerald-200/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>NIB Legalitas Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-amber-300" />
                <span>AI Multi-Language Chat</span>
              </div>
              <div className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-teal-300" />
                <span>QRIS Cross-Border BI</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
