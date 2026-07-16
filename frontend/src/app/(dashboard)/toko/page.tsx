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
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto min-h-full flex flex-col">
      
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-[var(--color-text-primary)]">
            Toko Saya
          </h1>
          <p className="text-[var(--color-text-secondary)] mt-1">
            Kelola profil bisnis dan katalog produk ekspor Anda.
          </p>
        </div>
        
        {activeTab === 'produk' && (
          <Link href="/toko/produk/baru">
            <Button variant="primary" className="emerald-gradient shadow-sm" leftIcon={<PackagePlus className="w-4 h-4" />}>
              Tambah Produk
            </Button>
          </Link>
        )}
      </div>

      <div className="mb-6">
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
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl">
          <form onSubmit={handleSaveProfile} className="bg-white border border-[var(--color-border)] rounded-2xl p-6 shadow-sm space-y-6">
            
            <div className="flex items-center justify-between pb-6 border-b border-[var(--color-border)]">
              <div>
                <h3 className="font-bold text-[var(--color-text-primary)]">Informasi Bisnis</h3>
                <p className="text-xs text-[var(--color-text-secondary)] mt-1">Data profil ini akan ditampilkan ke pembeli internasional.</p>
              </div>
              
              <div className="flex flex-col items-end">
                <span className="text-[10px] uppercase font-bold text-[var(--color-text-muted)] tracking-wider mb-1">Status NIB</span>
                {MOCK_SELLER_PROFILE.nibVerified ? (
                  <Badge variant="verified">Terverifikasi</Badge>
                ) : (
                  <Badge variant="warning">Belum Terverifikasi</Badge>
                )}
              </div>
            </div>

            <div className="space-y-5">
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
            
            <div className="pt-6 border-t border-[var(--color-border)] flex justify-end">
              <Button type="submit" variant="primary" leftIcon={<Save className="w-4 h-4" />}>
                Simpan Perubahan
              </Button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'produk' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white border border-[var(--color-border)] rounded-2xl shadow-sm overflow-hidden flex flex-col flex-1">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border)]">
                  <th className="p-4 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider w-[50%]">Produk</th>
                  <th className="p-4 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider hidden sm:table-cell">Harga Dasar (IDR)</th>
                  <th className="p-4 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {isLoading ? (
                  [...Array(4)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="p-4 flex gap-4"><div className="w-12 h-12 bg-[var(--color-bg-subtle)] rounded-lg"></div><div className="flex-1 space-y-2"><div className="h-4 bg-[var(--color-bg-subtle)] rounded w-3/4"></div><div className="h-3 bg-[var(--color-bg-subtle)] rounded w-1/4"></div></div></td>
                      <td className="p-4 hidden sm:table-cell"><div className="h-4 bg-[var(--color-bg-subtle)] rounded w-24"></div></td>
                      <td className="p-4"><div className="h-5 bg-[var(--color-bg-subtle)] rounded w-16"></div></td>
                      <td className="p-4"><div className="h-8 w-8 bg-[var(--color-bg-subtle)] rounded ml-auto"></div></td>
                    </tr>
                  ))
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Box className="w-12 h-12 text-[var(--color-text-muted)] mb-3" />
                        <h3 className="font-bold text-[var(--color-text-primary)]">Katalog Kosong</h3>
                        <p className="text-sm text-[var(--color-text-secondary)] mt-1 mb-4">Anda belum menambahkan produk apapun.</p>
                        <Link href="/toko/produk/baru">
                          <Button variant="outline" size="sm">Tambah Produk Pertama</Button>
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
