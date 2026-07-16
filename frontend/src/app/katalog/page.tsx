'use client';

import React, { useState, useEffect } from 'react';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { ProductGrid } from '@/components/katalog/ProductGrid';
import { FilterPanel, FilterState } from '@/components/katalog/FilterPanel';
import { SearchBar } from '@/components/katalog/SearchBar';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '@/lib/mock-data';

export default function KatalogPage() {
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
      
      {/* Decorative Background */}
      <div className="fixed inset-0 grid-pattern opacity-30 z-0 pointer-events-none"></div>

      <main className="flex-1 pt-[calc(var(--header-height)+2rem)] pb-20 relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-text-primary)] mb-4">
            Katalog Produk Ekspor
          </h1>
          <p className="text-[var(--color-text-secondary)] max-w-2xl text-lg">
            Temukan ribuan produk unggulan dari UMKM Indonesia yang siap bersaing di pasar global.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sidebar / Filters */}
          <div className="w-full lg:w-72 shrink-0 space-y-6 lg:sticky lg:top-[calc(var(--header-height)+2rem)]">
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Cari nama produk..."
            />
            
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
          <div className="flex-1 w-full">
            <div className="mb-4 flex items-center justify-between text-sm text-[var(--color-text-secondary)]">
              <span>Menampilkan <strong>{filteredProducts.length}</strong> produk</span>
            </div>
            <ProductGrid 
              products={filteredProducts} 
              isLoading={isLoading} 
            />
          </div>

        </div>
      </main>
    </div>
  );
}
