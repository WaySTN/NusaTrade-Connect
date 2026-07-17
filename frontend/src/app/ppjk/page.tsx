'use client';

import React, { useState, useEffect } from 'react';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { PPJKCard } from '@/components/ppjk/PPJKCard';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { MOCK_PPJK } from '@/lib/mock-data';
import { SearchBar } from '@/components/katalog/SearchBar';
import { Ship } from 'lucide-react';

export default function PPJKDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate network loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredPPJK = MOCK_PPJK.filter(ppjk => {
    if (searchQuery && !ppjk.name.toLowerCase().includes(searchQuery.toLowerCase()) && !ppjk.city.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[var(--color-bg-base)] flex flex-col">
      <PublicNavbar />
      
      {/* Hero Header */}
      <div className="relative pt-32 pb-16 bg-[var(--color-primary)] overflow-hidden">
        <div className="absolute inset-0 futuristic-bg opacity-30 mix-blend-overlay"></div>
        <div className="absolute -right-10 -bottom-10 opacity-10">
          <Ship className="w-80 h-80 text-white" />
        </div>
        
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="max-w-2xl animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-widest mb-4">
              <Ship className="w-3.5 h-3.5" />
              Layanan Ekspor Terintegrasi
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-4 tracking-tight">
              Direktori Mitra PPJK
            </h1>
            <p className="text-[var(--color-primary-light)] text-lg md:text-xl font-medium">
              Temukan Perusahaan Pengurusan Jasa Kepabeanan (PPJK) dan logistik terbaik untuk kelancaran ekspor Anda.
            </p>
          </div>
        </div>
      </div>

      <main className="flex-1 -mt-8 relative z-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pb-20">
        
        <div className="mb-10 max-w-xl mx-auto lg:mx-0 bg-white rounded-2xl p-4 shadow-sm border border-[var(--color-border)]">
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari nama PPJK atau kota..."
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-white border border-[var(--color-border)] rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : filteredPPJK.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center border border-dashed border-[var(--color-border-strong)] rounded-3xl bg-[var(--color-bg-subtle)]">
            <Ship className="w-16 h-16 text-[var(--color-text-muted)] mb-4" />
            <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">PPJK Tidak Ditemukan</h3>
            <p className="text-[var(--color-text-secondary)] max-w-md font-medium">
              Kami tidak dapat menemukan mitra PPJK yang sesuai dengan pencarian Anda "{searchQuery}".
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPPJK.map((ppjk, idx) => (
              <div key={ppjk.id} className="animate-slide-up h-full" style={{ animationDelay: `${Math.min(idx * 75, 600)}ms` }}>
                <PPJKCard 
                  id={ppjk.id}
                  name={ppjk.name}
                  location={ppjk.city + ", Indonesia"}
                  rating={ppjk.rating}
                  reviews={Math.floor(Math.random() * 200) + 15}
                  isVerified={ppjk.isVerified}
                  services={ppjk.services}
                  estimatedCost={idx % 2 === 0 ? "Rp 500rb - 2Jt" : "Sesuai Negosiasi"}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      <PublicFooter variant="light" />
    </div>
  );
}
