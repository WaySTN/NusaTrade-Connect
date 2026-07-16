'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';

export interface PriceConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
  pricePerUnit: number;
  quantity: number;
}

export const PriceConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  productName,
  pricePerUnit,
  quantity
}: PriceConfirmModalProps) => {
  
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const total = pricePerUnit * quantity;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="flex flex-col items-center text-center pb-2 pt-4">
        <div className="w-12 h-12 bg-[#FEF9E7] rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6 text-[#C8941A]" />
        </div>
        
        <h3 className="text-lg font-display font-bold text-[var(--color-text-primary)] mb-2">
          Konfirmasi Harga
        </h3>
        
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">
          Sistem mendeteksi negosiasi harga untuk <strong>{productName}</strong>. Apakah perhitungan berikut sudah benar?
        </p>

        <div className="w-full bg-[var(--color-bg-subtle)] rounded-lg p-4 mb-6 border border-[var(--color-border)] text-left">
          <div className="flex justify-between items-center mb-2 text-sm">
            <span className="text-[var(--color-text-muted)]">Harga per unit</span>
            <span className="font-mono font-medium">{formatRupiah(pricePerUnit)}</span>
          </div>
          <div className="flex justify-between items-center mb-3 text-sm">
            <span className="text-[var(--color-text-muted)]">Jumlah (Unit)</span>
            <span className="font-mono font-medium">x {quantity}</span>
          </div>
          <div className="pt-3 border-t border-[var(--color-border-strong)] flex justify-between items-center">
            <span className="font-semibold text-[var(--color-text-primary)]">Total Keseluruhan</span>
            <span className="font-mono font-bold text-[#006B52] text-base">{formatRupiah(total)}</span>
          </div>
        </div>

        <div className="flex gap-3 w-full">
          <Button variant="ghost" className="flex-1" onClick={onClose}>
            Edit
          </Button>
          <Button variant="primary" className="flex-1 emerald-gradient" onClick={onConfirm}>
            Ya, Kirim ✓
          </Button>
        </div>
      </div>
    </Modal>
  );
};
