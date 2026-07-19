'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { MOCK_PRODUCTS, getMockProduct, getMockUMKM } from '@/lib/mock-data';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Package, ShieldCheck, MessageCircle, MapPin, ArrowLeft, CheckCircle2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { AuthModal } from '@/components/ui/AuthModal';
import { DynamicText } from '@/components/ui/DynamicText';
import { useT } from '@/i18n/useT';

export default function ProductDetailPage() {
  const t = useT();
  const params = useParams();
  const router = useRouter();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  
  const [product, setProduct] = useState(getMockProduct(slug));
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

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
      router.push('/buyer/dashboard/chat');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-base)] flex flex-col items-center justify-center">
        <PublicNavbar />
        <div className="flex flex-col items-center mt-20">
          <div className="w-14 h-14 rounded-full border-[4px] border-[var(--color-border)] border-t-[var(--color-primary)] animate-spin mb-4"></div>
          <p className="text-[var(--color-text-secondary)] font-bold">Memuat detail produk...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-base)] flex flex-col">
        <PublicNavbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 mt-20 text-center animate-slide-up duration-300 var(--ease-out-quart)">
          <Package className="w-20 h-20 text-[var(--color-border-strong)] mb-6" />
          <h2 className="text-3xl font-display font-extrabold text-[var(--color-text-primary)] tracking-tight mb-2">Produk Tidak Ditemukan</h2>
          <p className="text-[var(--color-text-secondary)] font-medium mb-8">Produk yang Anda cari mungkin telah dihapus atau tidak tersedia.</p>
          <Link href="/katalog">
            <Button variant="primary" className="font-bold shadow-md shadow-[var(--color-primary)]/20" leftIcon={<ArrowLeft className="w-5 h-5" />}>Kembali ke Katalog</Button>
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
        
        <div className="mb-8">
          <Link href="/katalog" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Katalog
          </Link>
        </div>

        <div className="bg-white border border-[var(--color-border)] rounded-3xl shadow-sm overflow-hidden animate-slide-up duration-300 var(--ease-out-quart) hover:shadow-md transition-shadow">
          <div className="flex flex-col lg:flex-row">
            
            {/* Image Gallery Area */}
            <div className="w-full lg:w-[45%] bg-[var(--color-bg-subtle)] p-6 sm:p-8 flex flex-col gap-6 lg:border-r border-[var(--color-border)]">
              <div className="aspect-square w-full rounded-2xl overflow-hidden bg-white border border-[var(--color-border)] flex items-center justify-center relative shadow-sm group">
                {product.photoUrl ? (
                  <img src={product.photoUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 var(--ease-out-quart) group-hover:scale-105" />
                ) : (
                  <Package className="w-20 h-20 text-[var(--color-text-muted)] opacity-20" />
                )}
                
                {product.isVerified && (
                  <div className="absolute top-4 left-4">
                    <Badge variant="verified" className="shadow-lg shadow-[var(--color-success)]/20 px-3 py-1 font-bold">Verified Seller</Badge>
                  </div>
                )}
              </div>
              
              {/* Dummy thumbnails */}
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`aspect-square rounded-xl border-[3px] overflow-hidden bg-white flex items-center justify-center transition-all duration-200 var(--ease-out-quart) ${i === 0 ? 'border-[var(--color-primary)] shadow-md shadow-[var(--color-primary)]/10' : 'border-[var(--color-border)] cursor-pointer hover:border-[var(--color-primary-subtle)]'}`}>
                     {product.photoUrl ? (
                      <img src={product.photoUrl} alt="thumbnail" className={`w-full h-full object-cover ${i === 0 ? 'opacity-100' : 'opacity-70 hover:opacity-100 transition-opacity'}`} />
                    ) : (
                      <Package className="w-6 h-6 text-[var(--color-text-muted)] opacity-20" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info Area */}
            <div className="w-full lg:w-[55%] p-6 sm:p-10 flex flex-col">
              <div className="mb-4">
                <span className="text-[11px] font-extrabold text-[var(--color-primary)] uppercase tracking-wider bg-[var(--color-primary-subtle)] px-3 py-1.5 rounded-full shadow-sm">
                  <DynamicText text={product.category} />
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-[var(--color-text-primary)] leading-tight tracking-tight mb-6">
                <DynamicText text={product.name} />
              </h1>
              
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 py-8 border-y border-[var(--color-border)] mb-8">
                <div>
                  <div className="text-xs font-bold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">
                    Estimasi Harga
                  </div>
                  <div className="font-mono font-bold text-[var(--color-primary)] text-3xl sm:text-4xl flex items-baseline flex-wrap gap-x-2 drop-shadow-sm">
                    {formatRupiah(product.minPrice)}
                    <span className="text-xl text-[var(--color-text-secondary)] font-body font-normal opacity-50">-</span>
                    {formatRupiah(product.maxPrice)}
                  </div>
                </div>
                <div className="bg-[var(--color-bg-base)] px-5 py-4 rounded-2xl border border-[var(--color-border-strong)] shadow-sm">
                  <div className="text-[10px] text-[var(--color-text-secondary)] mb-1.5 font-extrabold uppercase tracking-widest">{t('katalog.moq') || 'Minimum Order (MOQ)'}</div>
                  <div className="font-mono font-bold text-[var(--color-text-primary)] text-xl">{product.moq} {t('katalog.unit') || 'Unit'}</div>
                </div>
              </div>

              <div className="space-y-8 mb-8 flex-1">
                <div>
                  <h3 className="font-bold text-[var(--color-text-primary)] text-lg mb-3">{t('landing.product_details') || 'Deskripsi Produk'}</h3>
                  <p className="text-[var(--color-text-secondary)] font-medium leading-relaxed text-[15px]">
                    <DynamicText text="Produk kualitas ekspor terbaik dari Indonesia. Dibuat dengan standar internasional dan telah melewati proses quality control yang ketat. Cocok untuk pasar global dengan spesifikasi yang dapat disesuaikan dengan kebutuhan importir." />
                  </p>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-[var(--color-bg-subtle)] border border-[var(--color-border)]">
                    <CheckCircle2 className="w-6 h-6 text-[var(--color-primary)] shrink-0" />
                    <div>
                      <h4 className="text-[15px] font-bold text-[var(--color-text-primary)] mb-0.5">{t('katalog.certifications') || 'Sertifikasi'}</h4>
                      <p className="text-[13px] font-medium text-[var(--color-text-secondary)]"><DynamicText text="ISO 9001, BPOM, Halal MUI" /></p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-[var(--color-bg-subtle)] border border-[var(--color-border)]">
                    <CheckCircle2 className="w-6 h-6 text-[var(--color-primary)] shrink-0" />
                    <div>
                      <h4 className="text-[15px] font-bold text-[var(--color-text-primary)] mb-0.5">{t('katalog.production_capacity') || 'Kapasitas Produksi'}</h4>
                      <p className="text-[13px] font-medium text-[var(--color-text-secondary)]"><DynamicText text="10,000 unit / bulan" /></p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seller Box */}
              {(() => {
                const targetUmkm = getMockUMKM(product.sellerId || '') || getMockUMKM(product.sellerName);
                const umkmUrl = targetUmkm ? `/umkm/${targetUmkm.id}` : '/umkm';
                const locationText = targetUmkm ? `${targetUmkm.city}, ${targetUmkm.province}` : 'Jakarta Raya, Indonesia';

                return (
                  <Link 
                    href={umkmUrl}
                    className="group bg-[var(--color-bg-subtle)] hover:bg-white rounded-2xl p-6 border border-[var(--color-border)] hover:border-[var(--color-primary-subtle)] mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-full bg-white text-[var(--color-primary)] flex items-center justify-center text-2xl font-bold border-2 border-[var(--color-primary-light)] group-hover:border-[var(--color-primary)] shrink-0 shadow-sm transition-colors font-display">
                        {product.sellerName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-[17px] text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] flex items-center gap-2 transition-colors">
                          <DynamicText text={product.sellerName} />
                          {product.isVerified && <ShieldCheck className="w-5 h-5 text-[var(--color-primary)]" />}
                        </h4>
                        <p className="text-sm text-[var(--color-text-secondary)] font-medium mt-1 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          <DynamicText text={locationText} />
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-[var(--color-primary)] group-hover:translate-x-1 transition-transform">
                      <span>{t('katalog.view_profile') || 'Lihat Profil UMKM'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </Link>
                );
              })()}

              <div className="mt-auto pt-4 border-t border-[var(--color-border)]">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-full font-bold shadow-xl shadow-[var(--color-primary)]/25 h-14 text-base rounded-2xl hover:scale-[1.02] transition-transform duration-300 var(--ease-out-quart)"
                  leftIcon={<MessageCircle className="w-5 h-5" />}
                  onClick={handleContactSeller}
                >
                  {t('katalog.contact_seller') || 'Hubungi Penjual'}
                </Button>
                <p className="text-center text-xs font-medium text-[var(--color-text-muted)] mt-4">
                  {t('katalog.contact_notice') || 'Anda harus masuk/mendaftar untuk dapat mengirim pesan ke penjual.'}
                </p>
              </div>

            </div>
          </div>
        </div>

      </main>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        redirectUrl="/buyer/dashboard/chat"
        title="Login Diperlukan"
        description="Untuk mengirim pesan dan bernegosiasi langsung dengan UMKM ini, Anda harus masuk (login) sebagai Buyer / Importir terlebih dahulu."
      />
    </div>
  );
}
