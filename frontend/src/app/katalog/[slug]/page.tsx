'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { MOCK_PRODUCTS, getMockProduct } from '@/lib/mock-data';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Package, ShieldCheck, MessageCircle, MapPin, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  
  const [product, setProduct] = useState(getMockProduct(slug));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate network delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleContactSeller = () => {
    const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      router.push('/chat/c1'); // Mock conversation 1
    } else {
      router.push('/login');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-base)] flex flex-col items-center justify-center">
        <PublicNavbar />
        <div className="flex flex-col items-center mt-20">
          <div className="w-12 h-12 rounded-full border-4 border-[var(--color-border)] border-t-[#006B52] animate-spin mb-4"></div>
          <p className="text-[var(--color-text-secondary)]">Memuat detail produk...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-base)] flex flex-col">
        <PublicNavbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 mt-20 text-center">
          <Package className="w-16 h-16 text-[var(--color-border-strong)] mb-4" />
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Produk Tidak Ditemukan</h2>
          <p className="text-[var(--color-text-secondary)] mb-6">Produk yang Anda cari mungkin telah dihapus atau tidak tersedia.</p>
          <Link href="/katalog">
            <Button variant="primary" leftIcon={<ArrowLeft className="w-4 h-4" />}>Kembali ke Katalog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-base)] flex flex-col">
      <PublicNavbar />
      
      {/* Decorative Background */}
      <div className="fixed inset-0 grid-pattern opacity-30 z-0 pointer-events-none"></div>

      <main className="flex-1 pt-[calc(var(--header-height)+2rem)] pb-20 relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        <div className="mb-6">
          <Link href="/katalog" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text-secondary)] hover:text-[#006B52] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Katalog
          </Link>
        </div>

        <div className="bg-white border border-[var(--color-border)] rounded-2xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col lg:flex-row">
            
            {/* Image Gallery Area */}
            <div className="w-full lg:w-[45%] bg-[var(--color-bg-subtle)] p-6 flex flex-col gap-4 border-r border-[var(--color-border)]">
              <div className="aspect-square w-full rounded-xl overflow-hidden bg-white border border-[var(--color-border)] flex items-center justify-center relative">
                {product.photoUrl ? (
                  <img src={product.photoUrl} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <Package className="w-16 h-16 text-[var(--color-text-muted)] opacity-20" />
                )}
                
                {product.isVerified && (
                  <div className="absolute top-4 left-4">
                    <Badge variant="verified" className="shadow-md">Verified Seller</Badge>
                  </div>
                )}
              </div>
              
              {/* Dummy thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`aspect-square rounded-lg border-2 overflow-hidden bg-white flex items-center justify-center ${i === 0 ? 'border-[#006B52]' : 'border-[var(--color-border)] cursor-pointer hover:border-[var(--color-border-strong)]'}`}>
                     {product.photoUrl ? (
                      <img src={product.photoUrl} alt="thumbnail" className="w-full h-full object-cover opacity-80" />
                    ) : (
                      <Package className="w-6 h-6 text-[var(--color-text-muted)] opacity-20" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info Area */}
            <div className="w-full lg:w-[55%] p-6 sm:p-10 flex flex-col">
              <div className="mb-2">
                <span className="text-xs font-semibold text-[#006B52] uppercase tracking-wider bg-[#E6F5F0] px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-[var(--color-text-primary)] leading-tight mb-4">
                {product.name}
              </h1>
              
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 py-6 border-y border-[var(--color-border)] mb-8">
                <div>
                  <div className="text-sm font-semibold text-[var(--color-text-secondary)] mb-1 uppercase tracking-wider">
                    Estimasi Harga
                  </div>
                  <div className="font-mono font-bold text-[#006B52] text-2xl sm:text-3xl flex items-baseline flex-wrap gap-x-2">
                    {formatRupiah(product.minPrice)}
                    <span className="text-lg text-[var(--color-text-secondary)] font-body font-normal">-</span>
                    {formatRupiah(product.maxPrice)}
                  </div>
                </div>
                <div className="bg-[var(--color-bg-subtle)] px-4 py-3 rounded-lg border border-[var(--color-border)]">
                  <div className="text-xs text-[var(--color-text-secondary)] mb-1 font-semibold uppercase tracking-wider">Minimum Order (MOQ)</div>
                  <div className="font-mono font-bold text-[var(--color-text-primary)] text-lg">{product.moq} Unit</div>
                </div>
              </div>

              <div className="space-y-6 mb-8 flex-1">
                <div>
                  <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">Deskripsi Produk</h3>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm">
                    Produk kualitas ekspor terbaik dari Indonesia. Dibuat dengan standar internasional dan telah melewati proses quality control yang ketat. Cocok untuk pasar global dengan spesifikasi yang dapat disesuaikan dengan kebutuhan importir.
                  </p>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#006B52] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-[var(--color-text-primary)]">Sertifikasi</h4>
                      <p className="text-xs text-[var(--color-text-secondary)]">ISO 9001, BPOM, Halal MUI</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#006B52] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-[var(--color-text-primary)]">Kapasitas Produksi</h4>
                      <p className="text-xs text-[var(--color-text-secondary)]">10,000 unit / bulan</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seller Box */}
              <div className="bg-[var(--color-bg-subtle)] rounded-xl p-5 border border-[var(--color-border)] mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-primary-light)] text-[#006B52] flex items-center justify-center text-xl font-bold border border-[var(--color-primary-subtle)] shrink-0">
                    {product.sellerName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--color-text-primary)] flex items-center gap-1.5">
                      {product.sellerName}
                      {product.isVerified && <ShieldCheck className="w-4 h-4 text-[#006B52]" />}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)] mt-1">
                      <MapPin className="w-3.5 h-3.5" />
                      Jakarta Raya, Indonesia
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-full emerald-gradient shadow-md h-14 text-base"
                  leftIcon={<MessageCircle className="w-5 h-5" />}
                  onClick={handleContactSeller}
                >
                  Hubungi Penjual
                </Button>
                <p className="text-center text-xs text-[var(--color-text-muted)] mt-3">
                  Anda harus masuk/mendaftar untuk dapat mengirim pesan ke penjual.
                </p>
              </div>

            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
