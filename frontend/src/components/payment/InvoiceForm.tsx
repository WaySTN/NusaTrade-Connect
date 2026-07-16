'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { X, Plus, Trash2, Receipt, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { MockProduct } from '@/lib/mock-data';

export interface InvoiceFormProps {
  buyerName?: string;
  suggestedItems?: { name: string; qty: number; price: number }[];
  products: MockProduct[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const InvoiceForm = ({
  buyerName = '',
  suggestedItems = [],
  products = [],
  isOpen,
  onClose,
  onSubmit
}: InvoiceFormProps) => {
  const [buyer, setBuyer] = useState(buyerName);
  const [items, setItems] = useState<{ name: string; qty: number; price: number }[]>(
    suggestedItems.length > 0 ? suggestedItems : [{ name: '', qty: 1, price: 0 }]
  );

  if (!isOpen) return null;

  const addItem = () => {
    setItems([...items, { name: '', qty: 1, price: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items];
    (newItems[index] as any)[field] = value;
    
    // Auto-fill price if product selected
    if (field === 'name' && products) {
      const product = products.find(p => p.name === value);
      if (product) {
        newItems[index].price = product.minPrice;
        if (newItems[index].qty < product.moq) {
          newItems[index].qty = product.moq;
        }
      }
    }
    
    setItems(newItems);
  };

  const subtotal = items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const serviceFee = subtotal * 0.02; // 2% service fee
  const total = subtotal + serviceFee;

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      buyerName: buyer,
      items,
      subtotal,
      serviceFee,
      total
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl relative z-10 animate-in fade-in scale-in duration-200 max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FEF9E7] flex items-center justify-center border border-[#C8941A]/20">
              <Receipt className="w-5 h-5 text-[#C8941A]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[var(--color-text-primary)] leading-tight">Buat Invoice Baru</h2>
              <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">Generate QR cross-border dengan kurs terkini.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--color-bg-subtle)] text-[var(--color-text-muted)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          
          <Input
            label="Nama Pembeli"
            value={buyer}
            onChange={(e) => setBuyer(e.target.value)}
            placeholder="Nama perusahaan pembeli..."
            required
          />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm text-[var(--color-text-primary)]">Item Produk</h3>
              <Button type="button" variant="ghost" size="sm" onClick={addItem} leftIcon={<Plus className="w-4 h-4" />}>
                Tambah Item
              </Button>
            </div>

            <div className="space-y-3">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-xl relative group">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-3">
                    
                    <div className="sm:col-span-6 space-y-1.5">
                      <label className="text-xs font-semibold text-[var(--color-text-secondary)]">Produk</label>
                      <div className="relative">
                        <select 
                          className="w-full h-10 px-3 bg-white border border-[var(--color-border-strong)] rounded-lg text-sm focus:ring-2 focus:ring-[#006B52]"
                          value={item.name}
                          onChange={(e) => updateItem(idx, 'name', e.target.value)}
                          required
                        >
                          <option value="" disabled>Pilih dari katalog...</option>
                          <optgroup label="Katalog Anda">
                            {products.map(p => (
                              <option key={p.id} value={p.name}>{p.name}</option>
                            ))}
                          </optgroup>
                          <optgroup label="Custom">
                            {suggestedItems.map(si => si.name).filter(n => !products.find(p => p.name === n)).map(n => (
                              <option key={n} value={n}>{n}</option>
                            ))}
                          </optgroup>
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="text-xs font-semibold text-[var(--color-text-secondary)]">Qty</label>
                      <input 
                        type="number" 
                        min="1"
                        required
                        className="w-full h-10 px-3 bg-white border border-[var(--color-border-strong)] rounded-lg text-sm focus:ring-2 focus:ring-[#006B52]"
                        value={item.qty || ''}
                        onChange={(e) => updateItem(idx, 'qty', parseInt(e.target.value) || 0)}
                      />
                    </div>

                    <div className="sm:col-span-4 space-y-1.5">
                      <label className="text-xs font-semibold text-[var(--color-text-secondary)]">Harga Satuan (IDR)</label>
                      <input 
                        type="number" 
                        min="0"
                        required
                        className="w-full h-10 px-3 bg-white border border-[var(--color-border-strong)] rounded-lg text-sm focus:ring-2 focus:ring-[#006B52]"
                        value={item.price || ''}
                        onChange={(e) => updateItem(idx, 'price', parseInt(e.target.value) || 0)}
                      />
                    </div>

                  </div>
                  
                  {items.length > 1 && (
                    <button 
                      type="button"
                      onClick={() => removeItem(idx)}
                      className="mt-6 w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-text-muted)] hover:bg-red-50 hover:text-red-600 transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="bg-emerald-50 rounded-xl p-5 mt-2 space-y-3 border border-emerald-100">
            <div className="flex justify-between text-sm text-[var(--color-text-secondary)]">
              <span>Subtotal</span>
              <span className="font-mono font-medium">{formatRupiah(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-[var(--color-text-secondary)]">
              <span>Platform Fee (2%)</span>
              <span className="font-mono font-medium text-[#C8941A]">{formatRupiah(serviceFee)}</span>
            </div>
            <div className="pt-3 border-t border-emerald-200 flex justify-between items-center">
              <span className="font-bold text-[var(--color-text-primary)]">Total Tagihan</span>
              <span className="font-mono text-xl font-bold text-[#006B52]">{formatRupiah(total)}</span>
            </div>
          </div>

        </form>

        {/* Footer Actions */}
        <div className="p-6 border-t border-[var(--color-border)] bg-[var(--color-bg-base)] flex items-center justify-end gap-3">
          <Button type="button" variant="ghost" onClick={onClose}>
            Batal
          </Button>
          <Button 
            type="submit" 
            variant="primary" 
            className="gold-gradient shadow-md shadow-amber-500/20"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={handleSubmit}
          >
            Generate QR & Kirim
          </Button>
        </div>

      </div>
    </div>
  );
};
