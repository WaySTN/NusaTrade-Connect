'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { Copy, Check, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface BankTransferInstructionProps {
  bankName: string;
  accountNumber: string;
  accountName: string;
  amount: number;
  deadline: string;
  className?: string;
}

export const BankTransferInstruction = ({
  bankName,
  accountNumber,
  accountName,
  amount,
  deadline,
  className
}: BankTransferInstructionProps) => {
  const [copied, setCopied] = useState(false);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("bg-white border border-[var(--color-border)] rounded-xl overflow-hidden", className)}>
      <div className="bg-[#FFFBEB] px-5 py-4 flex items-start gap-3 border-b border-[#C8941A]/20">
        <Clock className="w-5 h-5 text-[#D97706] mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="text-sm font-semibold text-[#D97706] mb-1">Batas Waktu Pembayaran</h4>
          <p className="text-sm text-amber-900 font-medium">{deadline}</p>
        </div>
      </div>

      <div className="p-5 space-y-6">
        <div>
          <h4 className="text-sm text-[var(--color-text-secondary)] mb-2">Total Pembayaran</h4>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-display font-bold text-[#006B52]">
              {formatRupiah(amount)}
            </span>
            <Button 
              variant="ghost" 
              className="text-xs h-8 px-3"
              onClick={() => handleCopy(amount.toString())}
            >
              Salin Jumlah
            </Button>
          </div>
        </div>

        <div className="pt-5 border-t border-[var(--color-border)]">
          <h4 className="text-sm text-[var(--color-text-secondary)] mb-4">Transfer ke</h4>
          
          <div className="bg-[var(--color-bg-subtle)] rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-[var(--color-text-primary)]">{bankName}</span>
            </div>
            <div className="text-xs text-[var(--color-text-secondary)] mb-3">a.n. {accountName}</div>
            
            <div className="flex justify-between items-center">
              <span className="font-mono text-lg font-bold tracking-wider text-[var(--color-text-primary)]">
                {accountNumber}
              </span>
              <button 
                onClick={() => handleCopy(accountNumber)}
                className="flex items-center gap-1.5 text-sm font-medium text-[#006B52] hover:text-[#005543] transition-colors bg-[#E6F5F0] px-3 py-1.5 rounded-md"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Tersalin' : 'Salin'}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-blue-50/50 rounded-lg p-4 text-sm text-[var(--color-text-secondary)] leading-relaxed">
          <strong className="text-[var(--color-text-primary)] block mb-1">Penting:</strong>
          Pastikan Anda mentransfer tepat hingga 3 digit terakhir agar sistem dapat memverifikasi pembayaran Anda secara otomatis.
        </div>
      </div>
    </div>
  );
};
