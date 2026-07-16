'use client';

import React from 'react';
import { CheckCircle2, ChevronRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export interface PaymentSuccessStateProps {
  invoiceId: string;
  amount: number;
  paymentMethod: string;
  date: string;
  onBackToDashboard?: () => void;
}

export const PaymentSuccessState = ({
  invoiceId,
  amount,
  paymentMethod,
  date,
  onBackToDashboard
}: PaymentSuccessStateProps) => {

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center animate-scale-in max-w-md mx-auto">
      {/* Icon with rings animation */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-emerald-100 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
        <div className="relative w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="w-12 h-12 text-emerald-500" />
        </div>
      </div>

      <h2 className="font-display font-bold text-2xl text-[var(--color-text-primary)] mb-2">
        Pembayaran Berhasil!
      </h2>
      <p className="text-[var(--color-text-secondary)] mb-8">
        Terima kasih, pembayaran Anda untuk invoice <strong className="font-mono text-[var(--color-text-primary)]">{invoiceId}</strong> telah kami terima.
      </p>

      {/* Details Card */}
      <div className="w-full bg-[var(--color-bg-subtle)] rounded-xl border border-[var(--color-border)] p-5 mb-8 text-left space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-[var(--color-text-muted)]">Tanggal Waktu</span>
          <span className="text-sm font-medium text-[var(--color-text-primary)]">{date}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-[var(--color-text-muted)]">Metode Pembayaran</span>
          <span className="text-sm font-medium text-[var(--color-text-primary)]">{paymentMethod}</span>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-[var(--color-border-strong)]">
          <span className="text-sm font-semibold text-[var(--color-text-primary)]">Total Dibayar</span>
          <span className="font-mono font-bold text-lg text-[#006B52]">{formatRupiah(amount)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col w-full gap-3">
        <Link href={`/toko/orders/${invoiceId}`} className="w-full">
          <Button variant="primary" className="w-full emerald-gradient" rightIcon={<ChevronRight className="w-4 h-4" />}>
            Lihat Status Pesanan
          </Button>
        </Link>
        <Link href="/overview" className="w-full">
          <Button variant="ghost" className="w-full" onClick={onBackToDashboard}>
            Kembali ke Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};
