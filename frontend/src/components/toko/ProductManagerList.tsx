'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { Edit2, Trash2, Package, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { MockProduct } from '@/lib/mock-data';

export interface ProductManagerListProps {
  products: MockProduct[];
  onAddProduct?: () => void;
  onEditProduct?: (id: string) => void;
  onDeleteProduct?: (id: string) => void;
  onToggleStatus?: (id: string, active: boolean) => void;
}

export const ProductManagerList = ({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onToggleStatus
}: ProductManagerListProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden flex flex-col">
      {/* Header Actions */}
      <div className="p-4 sm:p-6 border-b border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[var(--color-bg-subtle)]">
        <div className="relative w-full sm:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-[var(--color-text-muted)]" />
          </div>
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B52]"
          />
        </div>
        
        <Button variant="primary" className="emerald-gradient shadow-md" onClick={onAddProduct} leftIcon={<Plus className="w-4 h-4" />}>
          Tambah Produk
        </Button>
      </div>

      {/* List Container */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-[var(--color-border)] text-xs uppercase tracking-wider text-[var(--color-text-muted)] bg-gray-50/50">
              <th className="px-6 py-4 font-semibold w-[40%]">Produk</th>
              <th className="px-6 py-4 font-semibold">Harga / MOQ</th>
              <th className="px-6 py-4 font-semibold">Stok</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-[var(--color-text-secondary)]">
                  <Package className="w-8 h-8 text-[var(--color-border-strong)] mx-auto mb-3" />
                  <p>Tidak ada produk ditemukan.</p>
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-[var(--color-bg-subtle)] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 border border-[var(--color-border)] overflow-hidden shrink-0 flex items-center justify-center">
                        {product.photoUrl ? (
                          <img src={product.photoUrl} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <Package className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold text-[var(--color-text-primary)] truncate" title={product.name}>
                          {product.name}
                        </span>
                        <span className="text-xs text-[var(--color-text-muted)] mt-0.5 truncate">{product.category}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-mono font-medium text-[var(--color-text-primary)]">
                        {formatRupiah(product.minPrice)}
                      </span>
                      <span className="text-xs text-[var(--color-text-muted)] mt-0.5">MOQ: {product.moq} unit</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--color-text-secondary)]">
                    Tersedia
                  </td>
                  <td className="px-6 py-4">
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input type="checkbox" className="sr-only" defaultChecked={true} onChange={(e) => onToggleStatus && onToggleStatus(product.id, e.target.checked)} />
                        <div className="w-10 h-5 bg-[#006B52] rounded-full shadow-inner transition-colors"></div>
                        <div className="absolute w-3.5 h-3.5 bg-white rounded-full shadow right-1 top-0.5 transition-transform"></div>
                      </div>
                    </label>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onEditProduct && onEditProduct(product.id)}
                        className="p-1.5 text-[var(--color-text-muted)] hover:text-[#006B52] hover:bg-[#E6F5F0] rounded-md transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onDeleteProduct && onDeleteProduct(product.id)}
                        className="p-1.5 text-[var(--color-text-muted)] hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
