import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Globe2, ShieldCheck, TrendingUp, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { MOCK_STATS } from '@/lib/mock-data';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col w-full bg-[var(--color-bg-base)] relative">
      <PublicNavbar />
      
      {/* Background elements container to prevent scroll overflow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 grid-pattern opacity-50"></div>

        {/* Futuristic Background Accents */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[var(--color-primary-light)] rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-[var(--color-accent-light)] rounded-full blur-[100px] opacity-60"></div>
      </div>
      
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 z-10 relative pt-32 pb-20">
        <div className="max-w-4xl space-y-8">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[var(--color-primary-subtle)] text-[var(--color-primary)] text-xs font-bold uppercase tracking-widest mb-2 shadow-sm cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-primary)]"></span>
            </span>
            Indonesia Goes Global
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-display font-extrabold text-[var(--color-text-primary)] leading-[1.1] tracking-tight drop-shadow-sm">
            Hubungkan Bisnis Anda ke <br className="hidden lg:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#006B52] to-[#16A34A]">
              Pasar Global
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed font-medium">
            Platform ekspor B2B premium yang dirancang untuk mempermudah transaksi internasional, mempertemukan UMKM Indonesia dengan pembeli dari seluruh dunia.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/register" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full text-base emerald-gradient shadow-lg hover:-translate-y-1 transition-all h-14 px-8" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Mulai Ekspor Sekarang
              </Button>
            </Link>
            <Link href="/katalog" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full text-base h-14 px-8 bg-white hover:-translate-y-1 transition-all shadow-sm">
                Lihat Katalog Produk
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Preview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mt-24 max-w-6xl w-full border-t border-[var(--color-border-strong)] pt-16 relative">
          {[
            { label: 'Total Transaksi', value: MOCK_STATS.nilaiTransaksi, icon: <TrendingUp className="w-6 h-6 text-[#C8941A]" /> },
            { label: 'Eksportir Aktif', value: '1,200+', icon: <ShieldCheck className="w-6 h-6 text-[#006B52]" /> },
            { label: 'Produk Premium', value: MOCK_STATS.produkAktif.toString() + '+', icon: <Globe2 className="w-6 h-6 text-blue-500" /> },
            { label: 'Keamanan', value: '100%', icon: <Lock className="w-6 h-6 text-emerald-500" /> },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center text-center p-6 bg-white rounded-2xl shadow-sm border border-[var(--color-border)] hover:-translate-y-2 transition-transform duration-300 cursor-default">
              <div className="w-12 h-12 rounded-full bg-[var(--color-bg-subtle)] flex items-center justify-center mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl lg:text-4xl font-mono font-bold text-[var(--color-text-primary)] mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Features Section */}
      <section className="py-24 bg-white border-y border-[var(--color-border)] relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-16 text-[var(--color-text-primary)]">
            Mengapa Memilih <span className="text-[#006B52]">NusaTrade</span>?
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: 'Terintegrasi PPJK', desc: 'Sistem logistik dan kepabeanan yang terhubung langsung dengan ratusan mitra PPJK terverifikasi.' },
              { title: 'AI Translator Assistant', desc: 'Komunikasi tanpa hambatan dengan AI yang siap menerjemahkan chat Anda ke bahasa bisnis internasional.' },
              { title: 'Pembayaran Aman', desc: 'Escrow system dengan virtual account multi-currency memastikan pembayaran 100% aman.' }
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-[#F0FAF6] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle2 className="w-8 h-8 text-[#006B52]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[var(--color-text-primary)]">{f.title}</h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--color-text-primary)] text-white pt-20 pb-10 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <Link href="/" className="font-display font-bold text-3xl inline-flex items-center gap-2 mb-6">
                <Globe2 className="w-8 h-8 text-[#C8941A]" />
                NusaTrade
              </Link>
              <p className="text-gray-400 max-w-md leading-relaxed">
                Platform ekspor B2B yang mendigitalkan UMKM Indonesia untuk menembus pasar global dengan mudah, aman, dan efisien.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Layanan</h4>
              <ul className="space-y-4 text-gray-400">
                <li><Link href="/katalog" className="hover:text-[#C8941A] transition-colors">Katalog Produk</Link></li>
                <li><Link href="/ppjk" className="hover:text-[#C8941A] transition-colors">Direktori PPJK</Link></li>
                <li><Link href="/register" className="hover:text-[#C8941A] transition-colors">Daftar UMKM</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Bantuan</h4>
              <ul className="space-y-4 text-gray-400">
                <li><Link href="/faq" className="hover:text-[#C8941A] transition-colors">FAQ</Link></li>
                <li><Link href="/contact" className="hover:text-[#C8941A] transition-colors">Hubungi Kami</Link></li>
                <li><Link href="/terms" className="hover:text-[#C8941A] transition-colors">Syarat & Ketentuan</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
            <p>&copy; 2026 NusaTrade Connect. All rights reserved.</p>
            <p>Dibuat dengan ❤️ di Indonesia</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
