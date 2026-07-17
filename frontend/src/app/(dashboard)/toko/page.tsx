'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Tabs } from '@/components/ui/Tabs';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProductListItem } from '@/components/toko/ProductListItem';
import { MOCK_SELLER_PROFILE, MOCK_PRODUCTS } from '@/lib/mock-data';
import { useToast } from '@/components/ui/Toast';
import { Store, PackagePlus, Box, Save, CheckCircle2 } from 'lucide-react';

export default function TokoPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profil');
  
  // Profil State
  const [formData, setFormData] = useState({
    businessName: MOCK_SELLER_PROFILE.businessName,
    name: MOCK_SELLER_PROFILE.name,
    city: MOCK_SELLER_PROFILE.city
  });
  
  // Produk State
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for products tab
    if (activeTab === 'produk') {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profil Diperbarui",
      description: "Perubahan profil toko Anda telah disimpan.",
      type: "success"
    });
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    toast({
      title: "Produk Dihapus",
      description: "Produk telah berhasil dihapus dari katalog.",
      type: "info"
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto min-h-full flex flex-col bg-[var(--color-bg-base)]">
      
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-[var(--color-text-primary)] tracking-tight">
            Toko Saya
          </h1>
          <p className="text-[var(--color-text-secondary)] font-medium mt-1.5">
            Kelola profil bisnis dan katalog produk ekspor Anda.
          </p>
        </div>
        
        {activeTab === 'produk' && (
          <Link href="/toko/produk/baru" className="animate-slide-up duration-300 var(--ease-out-quart)">
            <Button variant="primary" className="shadow-lg shadow-[var(--color-primary)]/20 font-bold tracking-wide" leftIcon={<PackagePlus className="w-4 h-4" />}>
              Tambah Produk
            </Button>
          </Link>
        )}
      </div>

      <div className="mb-8">
        <Tabs 
          tabs={[
            { id: 'profil', label: 'Profil Toko', icon: <Store className="w-4 h-4" /> },
            { id: 'produk', label: 'Produk Saya', icon: <Box className="w-4 h-4" /> }
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {activeTab === 'profil' && (
        <div className="animate-slide-up duration-300 var(--ease-out-quart) max-w-2xl">
          <form onSubmit={handleSaveProfile} className="bg-white border border-[var(--color-border)] rounded-3xl p-6 sm:p-8 shadow-sm space-y-8 hover:shadow-md transition-shadow duration-300">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--color-border)]">
              <div>
                <h3 className="font-bold text-[var(--color-text-primary)] text-lg">Informasi Bisnis</h3>
                <p className="text-xs font-medium text-[var(--color-text-secondary)] mt-1.5">Data profil ini akan ditampilkan ke pembeli internasional.</p>
              </div>
              
              <div className="flex flex-col sm:items-end">
                <span className="text-[10px] uppercase font-extrabold text-[var(--color-text-muted)] tracking-wider mb-2">Status NIB</span>
                {MOCK_SELLER_PROFILE.nibVerified ? (
                  <Badge variant="verified" className="shadow-sm shadow-[var(--color-success)]/10 px-3 py-1 font-bold">Terverifikasi</Badge>
                ) : (
                  <Badge variant="warning" className="shadow-sm shadow-[var(--color-warning)]/10 px-3 py-1 font-bold">Belum Terverifikasi</Badge>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <Input 
                label="Nama Bisnis / Perusahaan" 
                value={formData.businessName}
                onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                required
              />
              <Input 
                label="Nama Pemilik / Penanggung Jawab" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
              <Input 
                label="Kota Asal" 
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                required
                helperText="Menentukan estimasi biaya logistik domestik ke pelabuhan."
              />
            </div>
            
            <div className="pt-8 border-t border-[var(--color-border)] flex justify-end">
              <Button type="submit" variant="primary" className="font-bold shadow-md shadow-[var(--color-primary)]/20 px-6 py-2.5 h-auto text-base" leftIcon={<Save className="w-5 h-5" />}>
                Simpan Perubahan
              </Button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'produk' && (
        <div className="animate-slide-up duration-300 var(--ease-out-quart) bg-white border border-[var(--color-border)] rounded-3xl shadow-sm overflow-hidden flex flex-col flex-1 hover:shadow-md transition-shadow">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border)]">
                  <th className="p-5 text-[11px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider w-[50%]">Produk</th>
                  <th className="p-5 text-[11px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider hidden sm:table-cell">Harga Dasar (IDR)</th>
                  <th className="p-5 text-[11px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">Status</th>
                  <th className="p-5 text-[11px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {isLoading ? (
                  [...Array(4)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="p-5 flex gap-4"><div className="w-14 h-14 bg-[var(--color-bg-subtle)] rounded-xl"></div><div className="flex-1 space-y-2.5 mt-1"><div className="h-4 bg-[var(--color-bg-subtle)] rounded w-3/4"></div><div className="h-3 bg-[var(--color-bg-subtle)] rounded w-1/4"></div></div></td>
                      <td className="p-5 hidden sm:table-cell"><div className="h-4 bg-[var(--color-bg-subtle)] rounded w-24"></div></td>
                      <td className="p-5"><div className="h-6 bg-[var(--color-bg-subtle)] rounded-full w-16"></div></td>
                      <td className="p-5"><div className="h-8 w-8 bg-[var(--color-bg-subtle)] rounded-lg ml-auto"></div></td>
                    </tr>
                  ))
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-16 text-center">
                      <div className="flex flex-col items-center justify-center animate-slide-up">
                        <div className="w-20 h-20 bg-[var(--color-bg-subtle)] rounded-full flex items-center justify-center mb-4 border border-[var(--color-border)]">
                          <Box className="w-10 h-10 text-[var(--color-text-muted)]" />
                        </div>
                        <h3 className="text-xl font-bold text-[var(--color-text-primary)]">Katalog Kosong</h3>
                        <p className="text-sm font-medium text-[var(--color-text-secondary)] mt-2 mb-6">Anda belum menambahkan produk apapun.</p>
                        <Link href="/toko/produk/baru">
                          <Button variant="outline" className="font-bold border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary-subtle)] shadow-sm">Tambah Produk Pertama</Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ) : (
                  products.map(product => (
                    <ProductListItem 
                      key={product.id} 
                      product={product} 
                      onDelete={handleDeleteProduct} 
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
