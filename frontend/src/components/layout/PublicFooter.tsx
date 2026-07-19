import React from 'react';
import Link from 'next/link';
import { Globe2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface PublicFooterProps {
  className?: string;
  variant?: 'light' | 'subtle' | 'dark';
}

export const PublicFooter = ({ className, variant = 'light' }: PublicFooterProps) => {
  const isDark = variant === 'dark';
  
  const bgClasses = {
    light: 'bg-white border-[var(--color-border)]',
    subtle: 'bg-[var(--color-bg-subtle)] border-[var(--color-border)]',
    dark: 'bg-[#0f172a] border-slate-800 text-slate-300'
  };

  return (
    <footer className={cn("border-t pt-16 pb-8 relative z-10", bgClasses[variant], className)}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className={cn("font-display font-extrabold text-2xl inline-flex items-center gap-2 mb-4 group", isDark ? "text-white" : "text-[var(--color-text-primary)]")}>
              <Globe2 className={cn("w-6 h-6 group-hover:rotate-12 transition-transform duration-300", isDark ? "text-emerald-400" : "text-[var(--color-primary)]")} />
              <span className="tracking-tight">Nusa<span className={isDark ? "text-emerald-400" : "text-[var(--color-primary)]"}>Trade</span></span>
            </Link>
            <p className={cn("text-sm leading-relaxed max-w-sm mb-6", isDark ? "text-slate-400" : "text-[var(--color-text-secondary)]")}>
              Memberdayakan UMKM Indonesia melalui platform ekspor B2B yang aman, transparan, dan terintegrasi dengan ekosistem logistik.
            </p>
            <div className="flex gap-4">
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer", isDark ? "bg-slate-800 text-slate-400 hover:bg-emerald-500 hover:text-white" : "bg-[var(--color-bg-subtle)] text-[var(--color-text-muted)] hover:bg-[var(--color-primary)] hover:text-white")}>
                <span className="sr-only">Twitter</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </div>
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer", isDark ? "bg-slate-800 text-slate-400 hover:bg-emerald-500 hover:text-white" : "bg-[var(--color-bg-subtle)] text-[var(--color-text-muted)] hover:bg-[var(--color-primary)] hover:text-white")}>
                <span className="sr-only">LinkedIn</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className={cn("font-bold text-sm uppercase tracking-wider mb-4", isDark ? "text-white" : "text-[var(--color-text-primary)]")}>Platform</h4>
            <ul className={cn("space-y-3 text-sm font-medium", isDark ? "text-slate-400" : "text-[var(--color-text-secondary)]")}>
              <li><Link href="/katalog" className={cn("transition-colors", isDark ? "hover:text-emerald-400" : "hover:text-[var(--color-primary)]")}>Katalog Produk</Link></li>
              <li><Link href="/umkm" className={cn("transition-colors", isDark ? "hover:text-emerald-400" : "hover:text-[var(--color-primary)]")}>Mitra UMKM</Link></li>
              <li><Link href="/ppjk" className={cn("transition-colors", isDark ? "hover:text-emerald-400" : "hover:text-[var(--color-primary)]")}>PPJK</Link></li>
              <li><Link href="/cara-kerja" className={cn("transition-colors", isDark ? "hover:text-emerald-400" : "hover:text-[var(--color-primary)]")}>Cara Kerja</Link></li>
              <li><Link href="/pricing" className={cn("transition-colors", isDark ? "hover:text-emerald-400" : "hover:text-[var(--color-primary)]")}>Biaya & Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className={cn("font-bold text-sm uppercase tracking-wider mb-4", isDark ? "text-white" : "text-[var(--color-text-primary)]")}>Perusahaan</h4>
            <ul className={cn("space-y-3 text-sm font-medium", isDark ? "text-slate-400" : "text-[var(--color-text-secondary)]")}>
              <li><Link href="/tentang" className={cn("transition-colors", isDark ? "hover:text-emerald-400" : "hover:text-[var(--color-primary)]")}>Tentang Kami</Link></li>
              <li><Link href="/karir" className={cn("transition-colors", isDark ? "hover:text-emerald-400" : "hover:text-[var(--color-primary)]")}>Karir</Link></li>
              <li><Link href="/blog" className={cn("transition-colors", isDark ? "hover:text-emerald-400" : "hover:text-[var(--color-primary)]")}>Blog Edukasi Ekspor</Link></li>
              <li><Link href="/contact" className={cn("transition-colors", isDark ? "hover:text-emerald-400" : "hover:text-[var(--color-primary)]")}>Hubungi Sales</Link></li>
            </ul>
          </div>

          <div>
            <h4 className={cn("font-bold text-sm uppercase tracking-wider mb-4", isDark ? "text-white" : "text-[var(--color-text-primary)]")}>Legal</h4>
            <ul className={cn("space-y-3 text-sm font-medium", isDark ? "text-slate-400" : "text-[var(--color-text-secondary)]")}>
              <li><Link href="/terms" className={cn("transition-colors", isDark ? "hover:text-emerald-400" : "hover:text-[var(--color-primary)]")}>Syarat & Ketentuan</Link></li>
              <li><Link href="/privacy" className={cn("transition-colors", isDark ? "hover:text-emerald-400" : "hover:text-[var(--color-primary)]")}>Kebijakan Privasi</Link></li>
              <li><Link href="/security" className={cn("transition-colors", isDark ? "hover:text-emerald-400" : "hover:text-[var(--color-primary)]")}>Keamanan Escrow</Link></li>
            </ul>
          </div>
        </div>
        
        <div className={cn("border-t pt-8 flex flex-col md:flex-row items-center justify-between text-xs font-medium", isDark ? "border-slate-800 text-slate-500" : "border-[var(--color-border)] text-[var(--color-text-muted)]")}>
          <p>&copy; {new Date().getFullYear()} NusaTrade Connect. Hak Cipta Dilindungi.</p>
          <div className="mt-4 md:mt-0 flex gap-6">
            <span>Status Sistem: <span className={isDark ? "text-emerald-500" : "text-[var(--color-success)]"}>● Operasional</span></span>
            <span>Terdaftar di Kominfo</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
