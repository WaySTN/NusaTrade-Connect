'use client';

import React from 'react';
import Link from 'next/link';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { useT } from '@/i18n/useT';
import { ShieldCheck, Bot, CreditCard, Sparkles, Globe, TrendingUp } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const t = useT();

  return (
    <div className="h-screen flex flex-row overflow-hidden bg-slate-50 font-body">

      {/* Left Pane — Hero Panel (Hidden on mobile) */}
      <div className="hidden lg:flex flex-col w-[46%] xl:w-[42%] flex-shrink-0 h-full relative z-10 p-10 xl:p-14 overflow-hidden justify-between text-white bg-[#004635] border-r border-emerald-800/40 shadow-2xl">
        
        {/* Background Visuals — AI & Trade Network Gradient Blurs */}
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[70%] bg-emerald-500/25 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[60%] bg-amber-500/15 rounded-full blur-[130px] pointer-events-none"></div>
        <div className="absolute top-[40%] left-[20%] w-[50%] h-[50%] bg-teal-400/15 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Interconnected Digital Trade Grid & Nodes SVG Overlay */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-emerald-300" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            {/* Global Trade Nodes */}
            <circle cx="20%" cy="30%" r="4" className="fill-amber-400 animate-pulse" />
            <circle cx="75%" cy="25%" r="3" className="fill-emerald-300 animate-pulse" />
            <circle cx="85%" cy="65%" r="5" className="fill-teal-300 animate-pulse" />
            <circle cx="35%" cy="75%" r="4" className="fill-amber-300 animate-pulse" />
            {/* Connecting Trade Arcs */}
            <path d="M 200 240 Q 400 150 750 200" fill="none" stroke="rgba(52, 211, 153, 0.4)" strokeWidth="1.5" strokeDasharray="6 4" />
            <path d="M 350 600 Q 550 450 850 520" fill="none" stroke="rgba(251, 191, 36, 0.4)" strokeWidth="1.5" strokeDasharray="6 4" />
          </svg>
        </div>

        {/* Top Branding / Tag */}
        <div className="z-10 pt-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest text-emerald-200 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>PLATFORM EKSPOR B2B</span>
          </div>
        </div>

        {/* Center Hero Content */}
        <div className="z-10 max-w-xl my-auto py-6">
          <h1 className="text-4xl xl:text-5xl font-display font-extrabold leading-[1.15] mb-5 tracking-tight">
            {t('auth.banner_title1', 'Buka Peluang Bisnis')} {' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 drop-shadow-xs">
              {t('auth.banner_title2', 'Anda ke Pasar Global')}
            </span>
          </h1>

          <p className="text-emerald-100/90 text-base xl:text-lg font-medium leading-relaxed mb-8">
            {t('auth.banner_desc', 'Bergabung dengan ribuan eksportir Indonesia yang telah sukses melakukan transaksi lintas negara dengan mudah, aman, dan terpercaya.')}
          </p>

          {/* Floating Feature Glass Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:border-emerald-400/40 transition-all duration-300 group">
              <ShieldCheck className="w-5 h-5 text-emerald-300 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-white">{t('auth.badge_nib_title', 'NIB Verified')}</div>
              <div className="text-[10px] text-emerald-200/80 font-medium mt-0.5">{t('auth.badge_nib_desc', 'Verifikasi Legalitas')}</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:border-amber-400/40 transition-all duration-300 group">
              <Bot className="w-5 h-5 text-amber-300 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-white">{t('auth.badge_ai_title', 'AI Business Chat')}</div>
              <div className="text-[10px] text-emerald-200/80 font-medium mt-0.5">{t('auth.badge_ai_desc', 'Auto-Tone & Translate')}</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:border-teal-400/40 transition-all duration-300 group">
              <CreditCard className="w-5 h-5 text-teal-300 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-white">{t('auth.badge_qris_title', 'QRIS Cross-Border')}</div>
              <div className="text-[10px] text-emerald-200/80 font-medium mt-0.5">{t('auth.badge_qris_desc', 'Pembayaran Instan')}</div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="z-10 pb-4 flex items-center justify-between text-xs font-semibold text-emerald-200/70 border-t border-emerald-800/60 pt-5">
          <span>{t('auth.copyright', '© 2026 NusaTrade Connect')}</span>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-white transition-colors">
              {t('auth.term_cond', 'Syarat & Ketentuan')}
            </Link>
            <span>•</span>
            <Link href="/katalog" className="hover:text-white transition-colors">
              {t('auth.b2b_catalog', 'Katalog B2B')}
            </Link>
          </div>
        </div>
      </div>

      {/* Right Pane — Interactive Form Panel */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50">
        <PublicNavbar />

        {/* Form Container Scrollable */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col items-center justify-start relative p-4 sm:p-6 lg:p-8">
          {/* Ambient Lighting Background */}
          <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-[140px] pointer-events-none"></div>
          <div className="absolute bottom-[10%] left-[10%] w-[350px] h-[350px] bg-amber-400/10 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="w-full max-w-lg relative z-10 pt-6 lg:pt-8 pb-8">
            {children}
          </div>
        </div>
      </div>

    </div>
  );
}
