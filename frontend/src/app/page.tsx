import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Globe2, ShieldCheck, TrendingUp, Lock, CheckCircle2, ArrowRight, Star, ChevronRight, BarChart3, Truck, Building2 } from 'lucide-react';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { MOCK_STATS } from '@/lib/mock-data';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col w-full bg-[var(--color-bg-base)] relative overflow-x-hidden">
      <PublicNavbar />
      
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 grid-pattern opacity-40"></div>
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] bg-[var(--color-primary)] rounded-full blur-[150px] opacity-[0.07]"></div>
        <div className="absolute top-[20%] left-[-10%] w-[30%] h-[40%] bg-[var(--color-accent)] rounded-full blur-[120px] opacity-[0.05]"></div>
      </div>
      
      {/* Hero Section - Asymmetric Layout */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 lg:px-8 z-10 relative pt-14 pb-16 lg:pt-16 lg:pb-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left: Text Content */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[var(--color-border)] text-[var(--color-text-secondary)] text-sm font-semibold shadow-sm animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-primary)]"></span>
              </span>
              Platform Ekspor B2B No. 1 di Indonesia
            </div>
            
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-display font-extrabold text-[var(--color-text-primary)] leading-[1.1] tracking-tight animate-slide-up" style={{ animationDelay: '100ms' }}>
              Bawa Produk <br className="hidden lg:block"/> UMKM ke <br className="hidden lg:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-active)]">
                Pasar Global
              </span>
            </h1>
            
            <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium animate-slide-up" style={{ animationDelay: '200ms' }}>
              Ekspor lebih mudah, aman, dan terpercaya. Kami menghubungkan jutaan pembeli internasional dengan produk-produk terbaik dari Indonesia.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
              <Link href="/register" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full text-base emerald-gradient h-14 px-8 rounded-xl" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Mulai Ekspor Sekarang
                </Button>
              </Link>
              <Link href="/katalog" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full text-base h-14 px-8 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white">
                  Jelajahi Katalog
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-6 animate-fade-in" style={{ animationDelay: '500ms' }}>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-[var(--color-bg-subtle)] flex items-center justify-center overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}&backgroundColor=transparent`} alt="User" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="text-sm font-semibold text-[var(--color-text-secondary)]">
                Bergabung dengan <span className="text-[var(--color-text-primary)] font-bold">1,200+</span> eksportir lainnya
              </div>
            </div>
          </div>
          
          {/* Right: Visual */}
          <div className="lg:col-span-6 relative animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="relative rounded-2xl bg-white border border-[var(--color-border)] shadow-2xl overflow-hidden aspect-[4/3] lg:aspect-square xl:aspect-[4/3]">
              {/* Abstract Dashboard UI Mockup */}
              <div className="absolute top-0 inset-x-0 h-12 border-b border-[var(--color-border)] bg-[var(--color-bg-subtle)] flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <div className="mx-auto w-1/3 h-5 bg-white rounded-md border border-[var(--color-border)]"></div>
              </div>
              <div className="p-6 pt-18 h-full flex flex-col gap-6 bg-slate-50/50">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-[var(--color-border)] shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center mb-3">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div className="h-2 w-16 bg-[var(--color-bg-subtle)] rounded mb-2"></div>
                    <div className="h-6 w-24 bg-[var(--color-primary-subtle)] rounded"></div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-[var(--color-border)] shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-accent-light)] text-[var(--color-accent)] flex items-center justify-center mb-3">
                      <Globe2 className="w-4 h-4" />
                    </div>
                    <div className="h-2 w-16 bg-[var(--color-bg-subtle)] rounded mb-2"></div>
                    <div className="h-6 w-24 bg-[var(--color-accent-light)] rounded"></div>
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-xl border border-[var(--color-border)] shadow-sm p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-4 w-32 bg-[var(--color-bg-subtle)] rounded"></div>
                    <div className="h-6 w-16 bg-[var(--color-success-light)] rounded-full"></div>
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[var(--color-bg-subtle)]"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-3 w-1/2 bg-[var(--color-bg-subtle)] rounded"></div>
                          <div className="h-2 w-1/4 bg-[var(--color-border)] rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Floating Element */}
              <div className="absolute right-4 bottom-4 bg-white p-4 rounded-xl shadow-xl border border-[var(--color-border)] flex items-center gap-4 animate-rise" style={{ animationDelay: '800ms' }}>
                <div className="w-12 h-12 rounded-full bg-[var(--color-success-light)] flex items-center justify-center text-[var(--color-success)]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[var(--color-text-primary)]">Transaksi Berhasil</div>
                  <div className="text-xs text-[var(--color-text-secondary)] font-medium">Pembeli dari Singapura</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Social Proof Logos */}
      <section className="border-y border-[var(--color-border)] bg-white py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-8">Dipercaya Oleh Berbagai Institusi & Buyer Global</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Logos Placeholders */}
            <div className="flex items-center gap-2 font-display font-bold text-xl text-[var(--color-text-primary)]"><Building2 className="w-6 h-6"/> APINDO</div>
            <div className="flex items-center gap-2 font-display font-bold text-xl text-[var(--color-text-primary)]"><Globe2 className="w-6 h-6"/> KADIN</div>
            <div className="flex items-center gap-2 font-display font-bold text-xl text-[var(--color-text-primary)]"><ShieldCheck className="w-6 h-6"/> Bea Cukai</div>
            <div className="flex items-center gap-2 font-display font-bold text-xl text-[var(--color-text-primary)]"><Truck className="w-6 h-6"/> Pelindo</div>
          </div>
        </div>
      </section>

      {/* Stats Section - Horizontal Strip */}
      <section className="py-20 bg-[var(--color-primary-subtle)] border-b border-[var(--color-border)] relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 divide-y md:divide-y-0 md:divide-x divide-[var(--color-border-strong)]">
            {[
              { label: 'Total Transaksi', value: MOCK_STATS.nilaiTransaksi },
              { label: 'Eksportir Aktif', value: '1,200+' },
              { label: 'Produk Premium', value: MOCK_STATS.produkAktif.toString() + '+' },
              { label: 'Buyer Internasional', value: '850+' },
            ].map((stat, i) => (
              <div key={i} className="flex-1 w-full py-4 md:py-0 md:px-8 text-center first:pl-0 last:pr-0">
                <div className="text-4xl lg:text-5xl font-mono font-bold text-[var(--color-primary)] mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-[var(--color-text-secondary)] uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Editorial Layout */}
      <section className="py-24 lg:py-32 bg-white relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl lg:text-5xl font-display font-bold mb-6 text-[var(--color-text-primary)] tracking-tight">
              Kenapa Memilih <span className="text-[var(--color-primary)]">NusaTrade</span>?
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
              Kami memecahkan tiga masalah terbesar dalam ekspor: Logistik, Komunikasi, dan Keamanan Pembayaran.
            </p>
          </div>

          <div className="space-y-24">
            {/* Feature 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 relative">
                <div className="aspect-[4/3] rounded-2xl bg-[var(--color-bg-subtle)] border border-[var(--color-border)] shadow-lg flex items-center justify-center p-8">
                  <div className="w-full h-full rounded-xl bg-white shadow-sm border border-[var(--color-border)] p-6">
                    <div className="flex items-center gap-4 border-b border-[var(--color-border)] pb-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center"><Truck className="w-6 h-6"/></div>
                      <div>
                        <div className="font-bold text-[var(--color-text-primary)]">PT Logistik Global Indo</div>
                        <div className="text-sm text-[var(--color-text-muted)]">Forwarder & PPJK</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-4 bg-[var(--color-bg-subtle)] rounded w-3/4"></div>
                      <div className="h-4 bg-[var(--color-bg-subtle)] rounded w-1/2"></div>
                      <div className="h-4 bg-[var(--color-bg-subtle)] rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2 space-y-6">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center font-display font-bold text-xl">01</div>
                <h3 className="text-3xl font-display font-bold text-[var(--color-text-primary)] tracking-tight">Terintegrasi Langsung dengan PPJK</h3>
                <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                  Tidak perlu pusing mencari forwarder. Sistem kami menghubungkan Anda dengan ratusan mitra PPJK terverifikasi yang siap mengurus dokumen kepabeanan dan pengiriman barang Anda hingga sampai ke tangan pembeli.
                </p>
                <ul className="space-y-3 pt-2">
                  {['Verifikasi ketat mitra PPJK', 'Tracking status pengiriman real-time', 'Transparansi biaya logistik'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-[var(--color-text-secondary)] font-medium">
                      <CheckCircle2 className="w-5 h-5 text-[var(--color-success)] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-light)] text-[var(--color-accent)] flex items-center justify-center font-display font-bold text-xl">02</div>
                <h3 className="text-3xl font-display font-bold text-[var(--color-text-primary)] tracking-tight">AI Translator Assistant di Chat</h3>
                <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                  Bahasa bukan lagi penghalang. Fitur chat kami dilengkapi dengan AI yang secara otomatis menerjemahkan pesan Anda ke bahasa bisnis yang profesional, memastikan komunikasi lancar dengan buyer internasional.
                </p>
                <Link href="/chat" className="inline-flex items-center gap-2 font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors">
                  Lihat cara kerja AI <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl bg-[var(--color-bg-subtle)] border border-[var(--color-border)] shadow-lg flex flex-col justify-end p-8">
                  <div className="w-3/4 self-end bg-[var(--color-primary)] text-white p-4 rounded-2xl rounded-tr-sm mb-4 relative shadow-sm">
                    "Saya ingin pesan 500 pcs kerajinan rotan"
                    <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow border border-[var(--color-border)] flex items-center justify-center">
                      <span className="text-xs font-bold text-[var(--color-primary)]">AI</span>
                    </div>
                  </div>
                  <div className="w-3/4 self-end bg-white border border-[var(--color-border)] p-4 rounded-2xl rounded-tr-sm shadow-sm relative">
                    <span className="text-xs font-semibold text-[var(--color-text-muted)] block mb-1">Translated & Polished (English)</span>
                    "We would like to place an order for 500 pieces of rattan handicrafts."
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 relative">
                <div className="aspect-[4/3] rounded-2xl bg-[var(--color-bg-subtle)] border border-[var(--color-border)] shadow-lg flex items-center justify-center p-8">
                  <div className="w-full bg-white rounded-xl shadow border border-[var(--color-border)] p-6 text-center">
                    <Lock className="w-12 h-12 text-[var(--color-success)] mx-auto mb-4" />
                    <div className="text-2xl font-bold font-mono text-[var(--color-text-primary)] mb-1">Escrow System</div>
                    <div className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-6">Secured by NusaTrade</div>
                    <div className="flex items-center justify-between text-sm font-medium border-t border-[var(--color-border)] pt-4">
                      <span className="text-[var(--color-text-secondary)]">Status Dana</span>
                      <span className="px-3 py-1 bg-[var(--color-success-light)] text-[var(--color-success)] rounded-full">Ditahan dengan Aman</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2 space-y-6">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-success-light)] text-[var(--color-success)] flex items-center justify-center font-display font-bold text-xl">03</div>
                <h3 className="text-3xl font-display font-bold text-[var(--color-text-primary)] tracking-tight">Pembayaran 100% Aman</h3>
                <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                  Sistem rekening bersama (Escrow) memastikan dana buyer aman hingga barang diterima, dan menjamin seller pasti dibayar. Transaksi lintas negara kini bebas dari rasa khawatir.
                </p>
                <ul className="space-y-3 pt-2">
                  {['Virtual account multi-currency', 'Pencairan dana otomatis & cepat', 'Perlindungan dari penipuan (fraud)'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-[var(--color-text-secondary)] font-medium">
                      <CheckCircle2 className="w-5 h-5 text-[var(--color-success)] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[var(--color-text-primary)] relative z-10 overflow-hidden">
        <div className="absolute inset-0 futuristic-bg opacity-20"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6 text-white tracking-tight">
            Siap Membawa Produk Anda ke Dunia?
          </h2>
          <p className="text-xl text-[var(--color-text-placeholder)] mb-10 leading-relaxed">
            Bergabunglah sekarang, buat profil perusahaan yang profesional, dan mulai negosiasi dengan pembeli dari berbagai negara dalam hitungan menit.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full text-base emerald-gradient h-14 px-10 rounded-xl" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Daftar Sebagai Eksportir
              </Button>
            </Link>
            <span className="text-[var(--color-text-muted)] font-medium">atau</span>
            <Link href="/contact" className="text-white hover:text-[var(--color-primary-light)] font-semibold underline underline-offset-4 transition-colors">
              Hubungi Tim Sales
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter variant="subtle" />
    </div>
  );
}
