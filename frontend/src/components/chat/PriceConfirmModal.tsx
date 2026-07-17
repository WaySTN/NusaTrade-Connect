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
      <div className="flex flex-col items-center text-center pb-2 pt-6">
        <div className="w-16 h-16 bg-[var(--color-warning)]/10 rounded-full flex items-center justify-center mb-5">
          <AlertTriangle className="w-8 h-8 text-[var(--color-warning)]" />
        </div>
        
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-2">
          Konfirmasi Harga
        </h3>
        
        <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-6">
          Sistem mendeteksi negosiasi harga untuk <strong className="text-[var(--color-text-primary)]">{productName}</strong>. Apakah perhitungan berikut sudah benar?
        </p>

        <div className="w-full bg-[var(--color-bg-subtle)] rounded-2xl p-5 mb-8 border border-[var(--color-border-strong)] text-left shadow-sm">
          <div className="flex justify-between items-center mb-3 text-sm">
            <span className="text-[var(--color-text-muted)] font-bold">Harga per unit</span>
            <span className="font-mono font-medium text-[var(--color-text-primary)]">{formatRupiah(pricePerUnit)}</span>
          </div>
          <div className="flex justify-between items-center mb-4 text-sm">
            <span className="text-[var(--color-text-muted)] font-bold">Jumlah (Unit)</span>
            <span className="font-mono font-medium text-[var(--color-text-primary)]">x {quantity}</span>
          </div>
          <div className="pt-4 border-t border-[var(--color-border-strong)] flex justify-between items-center">
            <span className="font-bold text-[var(--color-text-primary)]">Total Keseluruhan</span>
            <span className="font-mono font-extrabold text-[var(--color-primary)] text-lg">{formatRupiah(total)}</span>
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <Button variant="outline" className="flex-1 font-bold border-[var(--color-border-strong)]" onClick={onClose}>
            Edit
          </Button>
          <Button variant="primary" className="flex-1 font-bold shadow-lg shadow-[var(--color-primary)]/20" onClick={onConfirm}>
            Ya, Kirim ✓
          </Button>
        </div>
      </div>
    </Modal>
  );
};
