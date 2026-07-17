'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MoreVertical, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { MockProduct } from '@/lib/mock-data';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

export interface ProductListItemProps {
  product: MockProduct;
  onDelete: (id: string) => void;
}

export const ProductListItem = ({ product, onDelete }: ProductListItemProps) => {
  const [isActive, setIsActive] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleDeleteConfirm = () => {
    onDelete(product.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <tr className="hover:bg-[var(--color-bg-subtle)]/60 transition-colors duration-200 group">
        <td className="p-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[var(--color-bg-subtle)] border border-[var(--color-border)] overflow-hidden shrink-0">
              {product.photoUrl ? (
                <img src={product.photoUrl} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-[var(--color-text-muted)]">No Img</div>
              )}
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-[15px] text-[var(--color-text-primary)] truncate max-w-[200px] sm:max-w-[300px]">
                {product.name}
              </h4>
              <p className="text-[13px] font-medium text-[var(--color-text-secondary)] mt-0.5">{product.category}</p>
            </div>
          </div>
        </td>
        
        <td className="p-5 hidden sm:table-cell">
          <div className="text-[15px] font-mono font-bold text-[var(--color-text-primary)]">
            {formatRupiah(product.minPrice)}
          </div>
        </td>
        
        <td className="p-5">
          <Badge variant={isActive ? 'success' : 'default'} className="font-bold tracking-wider px-2 py-0.5 shadow-sm">
            {isActive ? 'Aktif' : 'Nonaktif'}
          </Badge>
        </td>
        
        <td className="p-5 text-right relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-2 rounded-lg hover:bg-white border border-transparent hover:border-[var(--color-border)] hover:shadow-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-all duration-200"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
          
          {isDropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setIsDropdownOpen(false)}
              ></div>
              <div className="absolute right-6 top-14 w-48 bg-white border border-[var(--color-border)] rounded-xl shadow-lg shadow-[var(--color-text-primary)]/5 z-20 py-1.5 animate-slide-up duration-200">
                <Link 
                  href={`/toko/produk/${product.id}`}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-primary)] transition-colors"
                >
                  <Edit className="w-4 h-4" /> Edit Produk
                </Link>
                <button 
                  onClick={() => {
                    setIsActive(!isActive);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)] transition-colors"
                >
                  {isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {isActive ? 'Nonaktifkan' : 'Aktifkan'}
                </button>
                <div className="my-1 border-t border-[var(--color-border)]"></div>
                <button 
                  onClick={() => {
                    setIsDeleteModalOpen(true);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold text-[var(--color-error)] hover:bg-[var(--color-error)]/5 transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> Hapus
                </button>
              </div>
            </>
          )}
        </td>
      </tr>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Hapus Produk"
      >
        <div className="p-6">
          <p className="text-[var(--color-text-secondary)] font-medium mb-6">
            Apakah Anda yakin ingin menghapus produk <strong className="text-[var(--color-text-primary)]">{product.name}</strong>? Tindakan ini tidak dapat dibatalkan.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)} className="font-bold">
              Batal
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirm} className="font-bold shadow-sm" leftIcon={<Trash2 className="w-4 h-4" />}>
              Ya, Hapus
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
