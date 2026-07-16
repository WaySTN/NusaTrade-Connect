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
      <tr className="hover:bg-[var(--color-bg-subtle)]/50 transition-colors group">
        <td className="p-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[var(--color-bg-subtle)] border border-[var(--color-border)] overflow-hidden shrink-0">
              {product.photoUrl ? (
                <img src={product.photoUrl} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] text-[var(--color-text-muted)]">No Img</div>
              )}
            </div>
            <div className="min-w-0">
              <h4 className="font-semibold text-sm text-[var(--color-text-primary)] truncate max-w-[200px] sm:max-w-[300px]">
                {product.name}
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)]">{product.category}</p>
            </div>
          </div>
        </td>
        
        <td className="p-4 hidden sm:table-cell">
          <div className="text-sm font-mono text-[var(--color-text-primary)]">
            {formatRupiah(product.minPrice)}
          </div>
        </td>
        
        <td className="p-4">
          <Badge variant={isActive ? 'success' : 'default'} className="text-[10px]">
            {isActive ? 'Aktif' : 'Nonaktif'}
          </Badge>
        </td>
        
        <td className="p-4 text-right relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-1.5 rounded-md hover:bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          
          {isDropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setIsDropdownOpen(false)}
              ></div>
              <div className="absolute right-4 top-12 w-48 bg-white border border-[var(--color-border)] rounded-lg shadow-lg z-20 py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                <Link 
                  href={`/toko/produk/${product.id}`}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)] transition-colors"
                >
                  <Edit className="w-4 h-4" /> Edit Produk
                </Link>
                <button 
                  onClick={() => {
                    setIsActive(!isActive);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)] transition-colors"
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
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
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
          <p className="text-[var(--color-text-secondary)] mb-6">
            Apakah Anda yakin ingin menghapus produk <strong>{product.name}</strong>? Tindakan ini tidak dapat dibatalkan.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)}>
              Batal
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirm} leftIcon={<Trash2 className="w-4 h-4" />}>
              Ya, Hapus
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
