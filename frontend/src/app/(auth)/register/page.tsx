import React from 'react';
import Link from 'next/link';
import { Store, ShoppingCart, Ship, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export default function RegisterRoleSelectPage() {
  return (
    <>
      <div className="mb-10 text-center sm:text-left">
        <h2 className="text-3xl font-display font-extrabold text-[var(--color-text-primary)] mb-3 tracking-tight">
          Pilih Peran Anda
        </h2>
        <p className="text-[var(--color-text-secondary)] font-medium">
          Bagaimana Anda ingin menggunakan NusaTrade Connect?
        </p>
      </div>

      <div className="space-y-4">
        <Link href="/register/seller" className="block group">
          <div className="flex items-center p-6 border-2 border-[var(--color-border)] rounded-2xl bg-white hover:border-[var(--color-primary-light)] hover:bg-[var(--color-primary-subtle)] hover:shadow-lg transition-all duration-300 var(--ease-out-quart)">
            <div className="w-16 h-16 bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-full flex items-center justify-center shrink-0 group-hover:bg-[var(--color-primary)] group-hover:border-[var(--color-primary)] transition-colors duration-300">
              <Store className="w-8 h-8 text-[var(--color-primary)] group-hover:text-white transition-colors duration-300" />
            </div>
            <div className="ml-5 flex-1">
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors duration-200">
                Sebagai Penjual (Eksportir)
              </h3>
              <p className="text-sm font-medium text-[var(--color-text-secondary)] mt-1">
                Saya ingin menawarkan dan menjual produk ke pasar global.
              </p>
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent group-hover:bg-white/50 transition-colors duration-300">
              <ArrowRight className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors transform group-hover:translate-x-1 duration-300 var(--ease-out-quart)" />
            </div>
          </div>
        </Link>

        <Link href="/register/buyer" className="block group">
          <div className="flex items-center p-6 border-2 border-[var(--color-border)] rounded-2xl bg-white hover:border-[var(--color-warning)] hover:bg-[var(--color-warning)]/5 hover:shadow-lg transition-all duration-300 var(--ease-out-quart)">
            <div className="w-16 h-16 bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-full flex items-center justify-center shrink-0 group-hover:bg-[var(--color-warning)] group-hover:border-[var(--color-warning)] transition-colors duration-300">
              <ShoppingCart className="w-8 h-8 text-[var(--color-warning)] group-hover:text-white transition-colors duration-300" />
            </div>
            <div className="ml-5 flex-1">
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-warning)] transition-colors duration-200">
                Sebagai Pembeli (Importir)
              </h3>
              <p className="text-sm font-medium text-[var(--color-text-secondary)] mt-1">
                Saya mencari produk berkualitas dari supplier Indonesia.
              </p>
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent group-hover:bg-white/50 transition-colors duration-300">
              <ArrowRight className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-warning)] transition-colors transform group-hover:translate-x-1 duration-300 var(--ease-out-quart)" />
            </div>
          </div>
        </Link>

        <Link href="/register/ppjk" className="block group">
          <div className="flex items-center p-6 border-2 border-[var(--color-border)] rounded-2xl bg-white hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 hover:shadow-lg transition-all duration-300 var(--ease-out-quart)">
            <div className="w-16 h-16 bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-full flex items-center justify-center shrink-0 group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)] transition-colors duration-300">
              <Ship className="w-8 h-8 text-[var(--color-accent)] group-hover:text-white transition-colors duration-300" />
            </div>
            <div className="ml-5 flex-1">
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-200">
                Sebagai Mitra PPJK
              </h3>
              <p className="text-sm font-medium text-[var(--color-text-secondary)] mt-1">
                Saya adalah perusahaan jasa kepabeanan (PPJK) yang ingin menawarkan layanan logistik ekspor.
              </p>
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent group-hover:bg-white/50 transition-colors duration-300">
              <ArrowRight className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors transform group-hover:translate-x-1 duration-300 var(--ease-out-quart)" />
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-10 pt-8 border-t border-[var(--color-border)] text-center">
        <p className="text-sm font-medium text-[var(--color-text-secondary)]">
          Sudah punya akun?{' '}
          <Link href="/login" className="font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-light)] transition-colors duration-200">
            Masuk
          </Link>
        </p>
      </div>
    </>
  );
}
