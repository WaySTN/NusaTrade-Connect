'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { SearchBar } from '@/components/katalog/SearchBar';
import { Button } from '@/components/ui/Button';
import { MapPin, Building2, Package, Award, ArrowRight, ShieldCheck, Search, Filter } from 'lucide-react';
import { MOCK_UMKM, MOCK_CATEGORIES, getMockUMKMProducts } from '@/lib/mock-data';
import { DynamicText } from '@/components/ui/DynamicText';
import { useT } from '@/i18n/useT';

export default function UMKMDirectoryPage() {
  const t = useT();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredUMKM = MOCK_UMKM.filter(umkm => {
    // Search query filter
    const matchesSearch = !searchQuery || (
      umkm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      umkm.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      umkm.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
      umkm.ownerName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Category filter
    const matchesCategory = selectedCategory === 'All' || umkm.category === selectedCategory;

    // Verified filter
    const matchesVerified = !verifiedOnly || umkm.isNibVerified;

    return matchesSearch && matchesCategory && matchesVerified;
  });

  return (
    <div className="min-h-screen bg-[var(--color-bg-base)] flex flex-col">
      <PublicNavbar />

      {/* Hero Header Banner */}
      <div className="relative pt-32 pb-16 bg-[var(--color-primary)] overflow-hidden">
        <div className="absolute inset-0 futuristic-bg opacity-30 mix-blend-overlay"></div>
        <div className="absolute -right-10 -bottom-10 opacity-10">
          <Building2 className="w-80 h-80 text-white" />
        </div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="max-w-2xl animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-widest mb-4">
              <Building2 className="w-3.5 h-3.5" />
              {t('umkm.badge') || 'Direktori Ekspor Indonesia'}
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-4 tracking-tight">
              {t('umkm.title') || 'Mitra UMKM Ekspor'}
            </h1>
            <p className="text-[var(--color-primary-light)] text-lg md:text-xl font-medium">
              {t('umkm.subtitle') || 'Jelajahi profil produsen dan UMKM Ekonomi Kreatif Indonesia yang terverifikasi legalitas NIB dan siap bersaing di pasar global.'}
            </p>
          </div>
        </div>
      </div>

      <main className="flex-1 -mt-8 relative z-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pb-20">
        
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[var(--color-border)] mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full md:flex-1">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder={t('umkm.search_placeholder') || "Cari nama UMKM, kota, atau nama pemilik..."}
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-bold transition-all w-full md:w-auto justify-center ${
                  verifiedOnly
                    ? 'bg-[var(--color-primary-subtle)] border-[var(--color-primary)] text-[var(--color-primary)] shadow-sm'
                    : 'bg-white border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-[var(--color-primary)]" />
                {t('umkm.verified_nib') || 'Terverifikasi NIB'}
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 no-scrollbar border-t border-[var(--color-border)]">
            <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> {t('umkm.category') || 'Kategori'}:
            </span>
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all ${
                selectedCategory === 'All'
                  ? 'bg-[var(--color-primary)] text-white shadow-sm'
                  : 'bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]'
              }`}
            >
              {t('umkm.all_categories') || 'Semua Kategori'}
            </button>
            {MOCK_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all ${
                  selectedCategory === cat
                    ? 'bg-[var(--color-primary)] text-white shadow-sm'
                    : 'bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]'
                }`}
              >
                <DynamicText text={cat} />
              </button>
            ))}
          </div>
        </div>

        {/* Directory Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-96 bg-white border border-[var(--color-border)] rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : filteredUMKM.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center border border-dashed border-[var(--color-border-strong)] rounded-3xl bg-[var(--color-bg-subtle)]">
            <Building2 className="w-16 h-16 text-[var(--color-text-muted)] mb-4" />
            <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">{t('umkm.not_found') || 'UMKM Tidak Ditemukan'}</h3>
            <p className="text-[var(--color-text-secondary)] max-w-md font-medium mb-6">
              {t('umkm.not_found_desc') || 'Tidak ada mitra UMKM yang sesuai dengan kriteria pencarian atau filter yang Anda pilih.'}
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setVerifiedOnly(false);
              }}
            >
              {t('umkm.reset_filter') || 'Reset Filter'}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUMKM.map(umkm => {
              const products = getMockUMKMProducts(umkm.id);
              return (
                <div
                  key={umkm.id}
                  className="bg-white border border-[var(--color-border)] rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:border-[var(--color-primary-subtle)] transition-all duration-300 flex flex-col group"
                >
                  {/* Banner Image */}
                  <div className="h-36 w-full relative overflow-hidden bg-[var(--color-bg-subtle)]">
                    <img
                      src={umkm.bannerUrl}
                      alt={umkm.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/90 backdrop-blur-md text-[var(--color-text-primary)] px-2.5 py-1 rounded-full shadow-sm">
                        <DynamicText text={umkm.category} />
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 pt-0 flex-1 flex flex-col relative">
                    {/* UMKM Avatar / Initial */}
                    <div className="-mt-10 mb-4 flex justify-between items-end">
                      <div className="w-16 h-16 rounded-2xl bg-white text-[var(--color-primary)] flex items-center justify-center text-2xl font-black border-4 border-white shadow-md font-display">
                        {umkm.name.charAt(0)}
                      </div>
                      
                      {umkm.isNibVerified && (
                        <div className="bg-[var(--color-primary-subtle)] text-[var(--color-primary)] px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 border border-[var(--color-primary-subtle)]">
                          <ShieldCheck className="w-4 h-4 shrink-0 text-[var(--color-primary)]" />
                          <span>{t('umkm.verified_nib') || 'Verified NIB'}</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-xl font-bold font-display text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-primary)] transition-colors">
                      <DynamicText text={umkm.name} />
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)] font-medium mb-3">
                      <MapPin className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                      <span><DynamicText text={umkm.city} />, <DynamicText text={umkm.province} /></span>
                    </div>

                    <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed mb-5 flex-1 font-medium">
                      <DynamicText text={umkm.description} />
                    </p>

                    {/* Features Badges */}
                    <div className="pt-4 border-t border-[var(--color-border)] space-y-3 mb-5">
                      <div className="flex items-center justify-between text-xs font-semibold text-[var(--color-text-secondary)]">
                        <span className="flex items-center gap-1.5 text-[var(--color-text-muted)]">
                          <Package className="w-3.5 h-3.5" /> {t('umkm.active_products') || 'Produk Aktif'}
                        </span>
                        <span className="font-mono text-[var(--color-text-primary)]">{products.length} {t('umkm.products_count') || 'Produk'}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-semibold text-[var(--color-text-secondary)]">
                        <span className="flex items-center gap-1.5 text-[var(--color-text-muted)]">
                          <Award className="w-3.5 h-3.5" /> {t('umkm.certification') || 'Sertifikasi'}
                        </span>
                        <span className="font-mono text-[var(--color-primary)]">{umkm.certifications.length} {t('umkm.cert_count') || 'Sertifikat'}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link href={`/umkm/${umkm.id}`} className="mt-auto">
                      <Button
                        variant="primary"
                        className="w-full justify-center font-bold text-xs h-11 rounded-xl group-hover:emerald-gradient"
                        rightIcon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                      >
                        {t('umkm.view_profile') || 'Lihat Profil UMKM'}
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <PublicFooter />
    </div>
  );
}
