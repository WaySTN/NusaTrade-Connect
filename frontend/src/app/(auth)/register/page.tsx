import React from 'react';
import Link from 'next/link';
import { Store, Globe, Ship, ArrowRight, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useT } from '@/i18n/useT';

export default function RegisterRoleSelectPage() {
  const t = useT();
  
  return (
    <div className="w-full animate-fade-in">
      {/* Header Section */}
      <div className="mb-7 text-left">
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[var(--color-text-primary)] mb-2.5 tracking-tight">
          {t('auth.register_title', 'Pilih Peran Anda')}
        </h2>
        <p className="text-sm font-medium text-[var(--color-text-secondary)] leading-relaxed">
          {t('auth.register_desc', 'Pilih jenis akun untuk memulai perjalanan perdagangan internasional di NusaTrade Connect.')}
        </p>
      </div>

      {/* Main Unified Card Container */}
      <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50">
        
        <div className="space-y-4">
          {/* Card Eksportir */}
          <Link href="/register/seller" className="block group">
            <div className="flex items-center p-5 border-2 border-slate-200/80 rounded-2xl bg-white hover:border-amber-500 hover:bg-amber-50/40 hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5">
              <div className="w-12 h-12 bg-amber-100/70 border border-amber-200 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:border-amber-500 transition-colors duration-300 shadow-xs">
                <Store className="w-6 h-6 text-amber-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-[var(--color-text-primary)] group-hover:text-amber-600 transition-colors duration-200">
                    {t('auth.role_seller', 'Sebagai Penjual (Eksportir)')}
                  </h3>
                  <span className="px-2 py-0.5 text-[10px] font-extrabold bg-amber-100 text-amber-800 rounded-full">UMKM RI</span>
                </div>
                <p className="text-xs font-medium text-[var(--color-text-secondary)] mt-0.5">
                  Tampilkan katalog terverifikasi NIB & jual produk ke pasar global.
                </p>
              </div>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 group-hover:bg-amber-500 transition-colors duration-300 shrink-0 ml-2">
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors transform group-hover:translate-x-0.5 duration-300" />
              </div>
            </div>
          </Link>

          {/* Card Buyer */}
          <Link href="/register/buyer" className="block group">
            <div className="flex items-center p-5 border-2 border-slate-200/80 rounded-2xl bg-white hover:border-[var(--color-primary)] hover:bg-emerald-50/40 hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5">
              <div className="w-12 h-12 bg-emerald-100/70 border border-emerald-200 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[var(--color-primary)] group-hover:border-[var(--color-primary)] transition-colors duration-300 shadow-xs">
                <Globe className="w-6 h-6 text-[var(--color-primary)] group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors duration-200">
                    {t('auth.role_buyer', 'Sebagai Pembeli (Importir)')}
                  </h3>
                  <span className="px-2 py-0.5 text-[10px] font-extrabold bg-emerald-100 text-emerald-800 rounded-full">Buyer Asing</span>
                </div>
                <p className="text-xs font-medium text-[var(--color-text-secondary)] mt-0.5">
                  Cari produk supplier Indonesia dengan negosiasi AI & QRIS.
                </p>
              </div>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 group-hover:bg-[var(--color-primary)] transition-colors duration-300 shrink-0 ml-2">
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors transform group-hover:translate-x-0.5 duration-300" />
              </div>
            </div>
          </Link>

          {/* Hidden PPJK Register Option */}
          {false && (
            <Link href="/register/ppjk" className="block group">
              <div className="flex items-center p-5 border-2 border-[var(--color-border)] rounded-2xl bg-white hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)] transition-colors duration-300">
                  <Ship className="w-6 h-6 text-[var(--color-accent)] group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-base font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-200">
                    {t('auth.role_ppjk', 'Sebagai Mitra PPJK')}
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-transparent group-hover:bg-white/50 transition-colors duration-300">
                  <ArrowRight className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors transform group-hover:translate-x-0.5 duration-300" />
                </div>
              </div>
            </Link>
          )}
        </div>

        <div className="mt-6 pt-5 border-t border-slate-100 text-center">
          <p className="text-xs font-semibold text-[var(--color-text-secondary)]">
            {t('auth.has_account', 'Sudah memiliki akun?')} <Link href="/login" className="font-extrabold text-[var(--color-primary)] hover:underline">
              {t('auth.login_now', 'Masuk di sini')}
            </Link>
          </p>
        </div>
      </div>

      {/* Trust Badge Footer */}
      <div className="mt-6 flex items-center justify-center gap-2 text-[11px] font-semibold text-slate-400">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>{t('auth.trust_badge', 'Keamanan Terenkripsi • Terintegrasi OSS & QRIS BI')}</span>
      </div>
    </div>
  );
}
