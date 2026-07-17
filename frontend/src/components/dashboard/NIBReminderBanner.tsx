'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { AlertTriangle, X } from 'lucide-react';
import Link from 'next/link';

export const NIBReminderBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className={cn(
      "bg-[var(--color-warning)]/10 border border-[var(--color-warning)]/20 border-l-4 border-l-[var(--color-warning)] rounded-r-2xl p-5 flex items-start sm:items-center justify-between gap-4 animate-slide-up duration-300 var(--ease-out-quart) shadow-sm"
    )}>
      <div className="flex items-start sm:items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-[var(--color-warning)]/20 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
          <AlertTriangle className="w-5 h-5 text-[var(--color-warning)]" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-[var(--color-warning-hover)]">NIB Belum Terverifikasi</h4>
          <p className="text-xs font-medium text-[var(--color-warning-hover)]/80 mt-1">
            Verifikasi NIB Anda untuk membuka akses penuh ke fitur pembayaran internasional dan pengurusan PPJK.
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-4 shrink-0">
        <Link 
          href="/toko/verifikasi"
          className="text-sm font-bold text-[var(--color-warning)] hover:text-[var(--color-warning-hover)] hover:underline transition-colors duration-200"
        >
          Verifikasi Sekarang
        </Link>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-[var(--color-warning-hover)]/60 hover:text-[var(--color-warning-hover)] hover:bg-[var(--color-warning)]/10 p-1.5 rounded-lg transition-colors duration-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
