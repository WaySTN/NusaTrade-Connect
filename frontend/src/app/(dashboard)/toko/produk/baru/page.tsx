'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PhotoUpload } from '@/components/toko/PhotoUpload';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { ChevronRight, Save, X, PackagePlus } from 'lucide-react';
import { MOCK_CATEGORIES } from '@/lib/mock-data';

export default function TambahProdukPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    moq: '',
    minPrice: '',
    maxPrice: '',
    description: ''
  });
  
  const [photos, setPhotos] = useState<string[]>([]);

  const isFormDirty = Object.values(formData).some(val => val !== '') || photos.length > 0;

  const handleCancel = () => {
    if (isFormDirty) {
      if (confirm('Anda memiliki perubahan yang belum disimpan. Yakin ingin membatalkan?')) {
        router.push('/toko');
      }
    } else {
      router.push('/toko');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Produk Berhasil Ditambahkan",
        description: `Produk "${formData.name}" kini tayang di katalog publik.`,
        type: "success"
      });
      router.push('/toko');
    }, 1000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto min-h-full flex flex-col space-y-6">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
        <Link href="/toko" className="hover:text-[#006B52] transition-colors">Toko Saya</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="font-semibold text-[var(--color-text-primary)]">Tambah Produk Baru</span>
      </div>

      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-[var(--color-text-primary)]">
          Tambah Produk Ekspor
        </h1>
        <p className="text-[var(--color-text-secondary)] mt-1">
          Lengkapi detail produk Anda agar mudah ditemukan oleh pembeli internasional.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-[var(--color-border)] rounded-2xl shadow-sm overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <div className="p-6 sm:p-8 border-b border-[var(--color-border)] space-y-8">
          
          <PhotoUpload maxPhotos={5} onPhotosChange={setPhotos} />
          
          <div className="pt-8 border-t border-[var(--color-border)] space-y-6">
            <h3 className="font-bold text-[var(--color-text-primary)] mb-2 flex items-center gap-2">
              <PackagePlus className="w-5 h-5 text-[#006B52]" />
              Informasi Dasar
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <Input 
                  label="Nama Produk" 
                  placeholder="Contoh: Kopi Luwak Premium Gayo"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-1.5">
                  Kategori Produk <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select 
                    className="w-full h-11 px-4 bg-[var(--color-bg-base)] border border-[var(--color-border-strong)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#006B52]/50 focus:border-[#006B52] transition-all appearance-none"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  >
                    <option value="" disabled>Pilih Kategori...</option>
                    {MOCK_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <ChevronRight className="w-4 h-4 text-[var(--color-text-muted)] absolute right-4 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                </div>
              </div>

              <div>
                <Input 
                  label="Minimum Order Quantity (MOQ)" 
                  type="number"
                  min="1"
                  placeholder="Contoh: 50"
                  value={formData.moq}
                  onChange={(e) => setFormData({...formData, moq: e.target.value})}
                  helperText="Jumlah minimum unit per pesanan."
                  required
                />
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[var(--color-border)] space-y-6">
            <h3 className="font-bold text-[var(--color-text-primary)] mb-2 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-100 text-[#D97706] flex items-center justify-center font-bold text-xs">$</span>
              Estimasi Harga
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input 
                label="Harga Minimum (IDR)" 
                type="number"
                min="0"
                placeholder="0"
                value={formData.minPrice}
                onChange={(e) => setFormData({...formData, minPrice: e.target.value})}
                required
              />
              <Input 
                label="Harga Maksimum (IDR)" 
                type="number"
                min="0"
                placeholder="0"
                value={formData.maxPrice}
                onChange={(e) => setFormData({...formData, maxPrice: e.target.value})}
                required
              />
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] -mt-4">
              Pembeli dapat menegosiasikan harga aktual di dalam chat berdasarkan volume pesanan.
            </p>
          </div>

        </div>

        <div className="p-6 sm:px-8 bg-[var(--color-bg-subtle)] flex flex-col sm:flex-row items-center justify-end gap-3">
          <Button 
            type="button" 
            variant="ghost" 
            className="w-full sm:w-auto text-[var(--color-text-secondary)]" 
            onClick={handleCancel}
            disabled={isLoading}
          >
            Batal
          </Button>
          <Button 
            type="submit" 
            variant="primary" 
            className="w-full sm:w-auto emerald-gradient shadow-md" 
            leftIcon={isLoading ? undefined : <Save className="w-4 h-4" />}
            disabled={isLoading}
          >
            {isLoading ? 'Menyimpan...' : 'Simpan Produk'}
          </Button>
        </div>

      </form>
    </div>
  );
}
