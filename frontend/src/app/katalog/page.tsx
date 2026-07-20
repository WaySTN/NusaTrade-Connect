'use client';

import React, { useState, useEffect } from 'react';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { ProductGrid } from '@/components/katalog/ProductGrid';
import { FilterPanel, FilterState } from '@/components/katalog/FilterPanel';
import { SearchBar } from '@/components/katalog/SearchBar';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '@/lib/mock-data';
import { Globe2, ChevronDown } from 'lucide-react';
import { Dropdown } from '@/components/ui/Dropdown';
import { cn } from '@/lib/utils/cn';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { useT } from '@/i18n/useT';

export default function KatalogPage() {
  const t = useT();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    isVerified: false
  });
  
  const [isLoading, setIsLoading] = useState(true);

  // Simulate network loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    // Search
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    // Categories
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false;
    }
    // Verified
    if (filters.isVerified && !product.isVerified) {
      return false;
    }
    // Price
    if (filters.minPrice && product.minPrice < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && product.minPrice > filters.maxPrice) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[var(--color-bg-base)] flex flex-col">
      <PublicNavbar />
      
      {/* Hero Header */}
      <div className="relative -mt-16 lg:-mt-20 pt-28 sm:pt-32 lg:pt-36 pb-16 bg-[var(--color-primary)] overflow-hidden">
        <div className="absolute inset-0 futuristic-bg opacity-30 mix-blend-overlay"></div>
        <div className="absolute -right-20 -bottom-20 opacity-10">
          <Globe2 className="w-96 h-96 text-white" />
        </div>
        
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-4 tracking-tight">
              {t('katalog.title') || 'Katalog Produk Ekspor'}
            </h1>
            <p className="text-[var(--color-primary-light)] text-lg md:text-xl font-medium">
              {t('katalog.subtitle') || 'Eksplorasi ribuan produk unggulan dari UMKM Indonesia yang siap memenuhi standar pasar global.'}
            </p>
          </div>
        </div>
      </div>

      <main className="flex-1 -mt-8 relative z-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pb-20">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sidebar / Filters */}
          <div className="w-full lg:w-72 shrink-0 space-y-6 lg:sticky lg:top-[calc(var(--header-height)+2rem)]">
            <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] p-5">
              <SearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder={t('katalog.search_placeholder') || "Cari nama produk..."}
              />
            </div>
            
            <FilterPanel
              categories={MOCK_CATEGORIES}
              filters={filters}
              onChange={setFilters}
              onReset={() => {
                setFilters({ categories: [], isVerified: false });
                setSearchQuery('');
              }}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 w-full mt-8 lg:mt-0">
            <div className="mb-6 flex items-center justify-between text-sm text-[var(--color-text-secondary)] bg-white px-4 py-3 rounded-xl border border-[var(--color-border)] shadow-sm">
              <span>{t('katalog.showing') || 'Menampilkan'} <strong className="text-[var(--color-text-primary)]">{filteredProducts.length}</strong> {t('katalog.products') || 'produk'}</span>
              <div className="flex items-center gap-2">
                <Dropdown 
                  align="left"
                  trigger={(isOpen) => (
                    <div className="flex items-center gap-1.5 font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors cursor-pointer bg-[var(--color-bg-subtle)] px-3 py-1.5 rounded-lg border border-[var(--color-border)]">
                      {t('katalog.sort_newest') || 'Terbaru'} <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isOpen && "rotate-180")} />
                    </div>
                  )}
                  items={[
                    { id: 'newest', label: t('katalog.sort_newest') || 'Terbaru' },
                    { id: 'lowest', label: t('katalog.sort_lowest') || 'Harga Terendah' },
                    { id: 'highest', label: t('katalog.sort_highest') || 'Harga Tertinggi' },
                  ]}
                />
              </div>
            </div>
            <ProductGrid 
              products={filteredProducts} 
              isLoading={isLoading} 
            />
          </div>

        </div>
      </main>

      <PublicFooter variant="light" />
    </div>
  );
}
