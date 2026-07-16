import React from 'react';
import Link from 'next/link';
import { Store, ShoppingCart, ArrowRight } from 'lucide-react';

export default function RegisterRoleSelectPage() {
  return (
    <>
      <div className="mb-8 text-center sm:text-left">
        <h2 className="text-3xl font-display font-bold text-[var(--color-text-primary)] mb-2">
          Pilih Peran Anda
        </h2>
        <p className="text-[var(--color-text-secondary)]">
          Bagaimana Anda ingin menggunakan NusaTrade Connect?
        </p>
      </div>

      <div className="space-y-4">
        <Link href="/register/seller" className="block group">
          <div className="flex items-center p-5 border-2 border-[var(--color-border)] rounded-2xl bg-white hover:border-[#006B52] hover:bg-[#F0FAF6] transition-all duration-300">
            <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center shrink-0 group-hover:bg-[#006B52] transition-colors">
              <Store className="w-7 h-7 text-[#006B52] group-hover:text-white transition-colors" />
            </div>
            <div className="ml-5 flex-1">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-[#006B52] transition-colors">
                Sebagai Penjual (Eksportir)
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">
                Saya ingin menawarkan dan menjual produk ke pasar global.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[#006B52] transition-colors transform group-hover:translate-x-1" />
          </div>
        </Link>

        <Link href="/register/buyer" className="block group">
          <div className="flex items-center p-5 border-2 border-[var(--color-border)] rounded-2xl bg-white hover:border-[#C8941A] hover:bg-[#FEF9E7] transition-all duration-300">
            <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center shrink-0 group-hover:bg-[#C8941A] transition-colors">
              <ShoppingCart className="w-7 h-7 text-[#C8941A] group-hover:text-white transition-colors" />
            </div>
            <div className="ml-5 flex-1">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-[#C8941A] transition-colors">
                Sebagai Pembeli (Importir)
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">
                Saya mencari produk berkualitas dari supplier Indonesia.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[#C8941A] transition-colors transform group-hover:translate-x-1" />
          </div>
        </Link>
      </div>

      <div className="mt-8 pt-6 border-t border-[var(--color-border)] text-center">
        <p className="text-sm text-[var(--color-text-secondary)]">
          Sudah punya akun?{' '}
          <Link href="/login" className="font-semibold text-[#006B52] hover:underline">
            Masuk
          </Link>
        </p>
      </div>
    </>
  );
}
