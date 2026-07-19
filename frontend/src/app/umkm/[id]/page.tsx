'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { getMockUMKM, getMockUMKMProducts, MockUMKM, MockProduct } from '@/lib/mock-data';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Building2, ShieldCheck, MapPin, ArrowLeft, MessageCircle, Calendar, 
  Users, Factory, Globe, Award, CheckCircle2, Mail, Phone, ExternalLink, Package, ArrowUpRight 
} from 'lucide-react';

import { AuthModal } from '@/components/ui/AuthModal';

export default function UMKMDetailPage() {
  const params = useParams();
  const router = useRouter();
  const idOrSlug = typeof params.id === 'string' ? params.id : '';

  const [umkm, setUmkm] = useState<MockUMKM | undefined>(getMockUMKM(idOrSlug));
  const [products, setProducts] = useState<MockProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const data = getMockUMKM(idOrSlug);
    setUmkm(data);
    if (data) {
      setProducts(getMockUMKMProducts(data.id));
    }
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [idOrSlug]);

  const maskNib = (nib: string) => {
    if (!nib || nib.length < 8) return '9120****7364';
    return `${nib.substring(0, 4)}****${nib.substring(nib.length - 4)}`;
  };

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
          <p className="text-[var(--color-text-secondary)] font-bold">Memuat profil UMKM...</p>
        </div>
      </div>
    );
  }

  if (!umkm) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-base)] flex flex-col">
        <PublicNavbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 mt-20 text-center animate-slide-up">
          <Building2 className="w-20 h-20 text-[var(--color-border-strong)] mb-6" />
          <h2 className="text-3xl font-display font-extrabold text-[var(--color-text-primary)] tracking-tight mb-2">UMKM Tidak Ditemukan</h2>
          <p className="text-[var(--color-text-secondary)] font-medium mb-8">Profil UMKM yang Anda cari tidak tersedia atau belum terdaftar.</p>
          <Link href="/umkm">
            <Button variant="primary" className="font-bold" leftIcon={<ArrowLeft className="w-5 h-5" />}>Kembali ke Direktori UMKM</Button>
          </Link>
        </div>
        <PublicFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-base)] flex flex-col">
      <PublicNavbar />

      {/* Background decoration */}
      <div className="fixed inset-0 grid-pattern opacity-30 z-0 pointer-events-none"></div>

      <main className="flex-1 pt-6 pb-20 relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link href="/umkm" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Direktori UMKM
          </Link>
        </div>

        {/* Profile Header Hero Card */}
        <div className="bg-white border border-[var(--color-border)] rounded-3xl overflow-hidden shadow-sm mb-8 animate-slide-up">
          {/* Cover Banner Image */}
          <div className="h-56 sm:h-72 w-full relative overflow-hidden bg-[var(--color-primary-subtle)]">
            <img 
              src={umkm.bannerUrl} 
              alt={umkm.name}
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            
            <div className="absolute top-4 right-4">
              <span className="text-xs font-extrabold uppercase tracking-wider bg-white/90 backdrop-blur-md text-[var(--color-text-primary)] px-3.5 py-1.5 rounded-full shadow-sm">
                {umkm.category}
              </span>
            </div>
          </div>

          {/* Profile Header Main Content */}
          <div className="p-6 sm:p-10 pt-0 relative">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 -mt-16 sm:-mt-20 mb-8 border-b border-[var(--color-border)] pb-8">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
                {/* Profile Logo Avatar */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-white text-[var(--color-primary)] flex items-center justify-center text-4xl sm:text-5xl font-black border-4 border-white shadow-xl shrink-0 font-display">
                  {umkm.name.charAt(0)}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-[var(--color-text-primary)] tracking-tight">
                      {umkm.name}
                    </h1>
                    {umkm.isNibVerified && (
                      <Badge variant="verified" className="px-3 py-1 font-bold text-xs">
                        <ShieldCheck className="w-4 h-4 mr-1 inline" /> Verified NIB
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm font-medium text-[var(--color-text-secondary)]">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[var(--color-primary)]" />
                      {umkm.fullAddress}
                    </span>
                    <span>•</span>
                    <span className="font-mono text-[var(--color-text-muted)]">
                      NIB: <strong className="text-[var(--color-text-primary)]">{maskNib(umkm.nibNumber)}</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full md:w-auto flex items-center gap-3 shrink-0">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full md:w-auto font-bold shadow-lg shadow-[var(--color-primary)]/20 px-6 h-12 text-sm rounded-xl"
                  leftIcon={<MessageCircle className="w-5 h-5" />}
                  onClick={handleContactSeller}
                >
                  Hubungi Penjual
                </Button>
              </div>

            </div>

            {/* Quick Stats Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-[var(--color-bg-subtle)] border border-[var(--color-border)]">
                <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-text-muted)] mb-1">
                  <Calendar className="w-4 h-4 text-[var(--color-primary)]" />
                  Tahun Berdiri
                </div>
                <div className="text-lg font-bold text-[var(--color-text-primary)] font-mono">
                  {umkm.establishedYear} ({new Date().getFullYear() - umkm.establishedYear} Tahun)
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--color-bg-subtle)] border border-[var(--color-border)]">
                <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-text-muted)] mb-1">
                  <Factory className="w-4 h-4 text-[var(--color-primary)]" />
                  Kapasitas Produksi
                </div>
                <div className="text-lg font-bold text-[var(--color-text-primary)] font-mono">
                  {umkm.productionCapacity}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--color-bg-subtle)] border border-[var(--color-border)]">
                <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-text-muted)] mb-1">
                  <Users className="w-4 h-4 text-[var(--color-primary)]" />
                  Jumlah Tenaga Kerja
                </div>
                <div className="text-lg font-bold text-[var(--color-text-primary)] font-mono">
                  {umkm.employeeCount}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--color-bg-subtle)] border border-[var(--color-border)]">
                <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-text-muted)] mb-1">
                  <Globe className="w-4 h-4 text-[var(--color-primary)]" />
                  Tujuan Ekspor Utama
                </div>
                <div className="text-sm font-bold text-[var(--color-text-primary)] truncate">
                  {umkm.exportCountries.join(', ')}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Content Layout: Left Details, Right Product Catalog */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Details & Certifications */}
          <div className="lg:col-span-1 space-y-8">

            {/* About Company */}
            <div className="bg-white border border-[var(--color-border)] rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[var(--color-primary)]" />
                Tentang Usaha
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed font-medium mb-6">
                {umkm.description}
              </p>
              
              <div className="pt-4 border-t border-[var(--color-border)] space-y-2">
                <div className="text-xs font-semibold text-[var(--color-text-muted)]">Pemilik / Penanggung Jawab:</div>
                <div className="text-sm font-bold text-[var(--color-text-primary)]">{umkm.ownerName}</div>
              </div>
            </div>

            {/* Legalities & Certifications */}
            <div className="bg-white border border-[var(--color-border)] rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-[var(--color-primary)]" />
                Legalitas & Sertifikasi
              </h3>

              <div className="space-y-3 mb-6">
                <div className="p-3.5 rounded-2xl bg-[var(--color-primary-subtle)] border border-[var(--color-primary-subtle)] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-[var(--color-primary)] shrink-0" />
                    <div>
                      <div className="text-xs font-extrabold text-[var(--color-primary)] uppercase">Nomor Induk Berusaha (NIB)</div>
                      <div className="text-xs font-mono font-bold text-[var(--color-text-primary)]">{maskNib(umkm.nibNumber)}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold bg-white text-[var(--color-primary)] px-2 py-0.5 rounded-full shadow-xs">
                    TERVERIFIKASI
                  </span>
                </div>

                {umkm.certifications.map((cert, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-[var(--color-bg-subtle)] border border-[var(--color-border)] flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)] shrink-0" />
                    <span className="text-xs font-bold text-[var(--color-text-primary)]">{cert}</span>
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-[var(--color-text-muted)] font-medium leading-normal bg-[var(--color-bg-subtle)] p-3 rounded-xl">
                ✓ Data verifikasi legalitas divalidasi langsung sesuai pendaftaran OSS Kemenkop RI.
              </div>
            </div>

            {/* Contact Info Card */}
            <div className="bg-white border border-[var(--color-border)] rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">
                Informasi Kontak
              </h3>

              <div className="space-y-4 text-xs font-medium">
                <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                  <Mail className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                  <span className="font-mono text-[var(--color-text-primary)]">{umkm.email}</span>
                </div>

                <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                  <Phone className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                  <span className="font-mono text-[var(--color-text-primary)]">+{umkm.whatsapp}</span>
                </div>

                {umkm.website && (
                  <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                    <ExternalLink className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                    <a href={umkm.website} target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] font-bold hover:underline truncate">
                      {umkm.website}
                    </a>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Product Catalog Grid */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between bg-white border border-[var(--color-border)] rounded-2xl p-5 shadow-sm">
              <div>
                <h2 className="text-xl font-bold font-display text-[var(--color-text-primary)] flex items-center gap-2">
                  <Package className="w-5 h-5 text-[var(--color-primary)]" />
                  Katalog Produk ({products.length})
                </h2>
                <p className="text-xs text-[var(--color-text-secondary)] font-medium mt-0.5">
                  Daftar produk siap ekspor buatan {umkm.name}
                </p>
              </div>
            </div>

            {products.length === 0 ? (
              <div className="bg-white border border-[var(--color-border)] rounded-3xl p-12 text-center">
                <Package className="w-12 h-12 text-[var(--color-text-muted)] mx-auto mb-3" />
                <h4 className="font-bold text-[var(--color-text-primary)] mb-1">Belum Ada Listing Produk</h4>
                <p className="text-xs text-[var(--color-text-secondary)] font-medium">UMKM ini belum memperbarui daftar katalog produknya.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {products.map(prod => (
                  <div 
                    key={prod.id} 
                    className="bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col"
                  >
                    <div className="aspect-square w-full relative bg-[var(--color-bg-subtle)] overflow-hidden">
                      <img 
                        src={prod.photoUrl} 
                        alt={prod.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/90 backdrop-blur-md text-[var(--color-primary)] px-2.5 py-1 rounded-full shadow-sm">
                          {prod.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-base text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-primary)] transition-colors line-clamp-1">
                          {prod.name}
                        </h3>
                        
                        <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)] mb-4">
                          <span>MOQ: <strong className="text-[var(--color-text-primary)] font-mono">{prod.moq} Unit</strong></span>
                        </div>

                        <div className="text-xs text-[var(--color-text-muted)] uppercase font-extrabold tracking-wider mb-1">
                          Estimasi Harga
                        </div>
                        <div className="font-mono font-bold text-[var(--color-primary)] text-base mb-4">
                          {formatRupiah(prod.minPrice)} - {formatRupiah(prod.maxPrice)}
                        </div>
                      </div>

                      <Link href={`/katalog/${prod.slug}`}>
                        <Button
                          variant="outline"
                          className="w-full justify-between font-bold text-xs h-10 rounded-xl hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                          rightIcon={<ArrowUpRight className="w-4 h-4" />}
                        >
                          Lihat Detail Produk
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </main>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        redirectUrl="/buyer/dashboard/chat"
        title="Login Diperlukan"
        description="Untuk menginbox dan bernegosiasi langsung dengan UMKM ini, Anda harus masuk (login) sebagai Buyer / Importir terlebih dahulu."
      />

      <PublicFooter />
    </div>
  );
}
