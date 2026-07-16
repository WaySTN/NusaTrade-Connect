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
      "bg-[#FFFBEB] border border-[#D97706]/20 border-l-4 border-l-[#D97706] rounded-r-lg p-4 flex items-start sm:items-center justify-between gap-4 animate-in fade-in duration-300"
    )}>
      <div className="flex items-start sm:items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
          <AlertTriangle className="w-4 h-4 text-[#D97706]" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-amber-900">NIB Belum Terverifikasi</h4>
          <p className="text-xs text-amber-800 mt-0.5">
            Verifikasi NIB Anda untuk membuka akses penuh ke fitur pembayaran internasional dan pengurusan PPJK.
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-3 shrink-0">
        <Link 
          href="/toko/verifikasi"
          className="text-sm font-medium text-[#D97706] hover:text-amber-700 hover:underline"
        >
          Verifikasi Sekarang
        </Link>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-amber-500 hover:text-amber-700 hover:bg-amber-100 p-1 rounded-md transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
