'use client';

import React, { useState, useEffect } from 'react';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { PPJKCard } from '@/components/ppjk/PPJKCard';
import { MOCK_PPJK } from '@/lib/mock-data';
import { SearchBar } from '@/components/katalog/SearchBar';
import { Ship, ShieldCheck, MapPin } from 'lucide-react';

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
      
      {/* Decorative Background */}
      <div className="fixed inset-0 grid-pattern opacity-30 z-0 pointer-events-none"></div>

      <main className="flex-1 pt-[calc(var(--header-height)+2rem)] pb-20 relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        <div className="mb-8 text-center sm:text-left animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E6F5F0] border border-[#006B52]/20 text-[#006B52] text-xs font-bold uppercase tracking-widest mb-4">
            <Ship className="w-3.5 h-3.5" />
            Layanan Ekspor Terintegrasi
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-[var(--color-text-primary)] mb-4 leading-tight">
            Direktori Mitra PPJK <br className="hidden md:block"/> Terpercaya
          </h1>
          <p className="text-[var(--color-text-secondary)] text-lg">
            Temukan Perusahaan Pengurusan Jasa Kepabeanan (PPJK) dan logistik terbaik untuk kelancaran ekspor Anda.
          </p>
        </div>

        <div className="mb-10 max-w-xl">
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari nama PPJK atau kota..."
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-white border border-[var(--color-border)] rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : filteredPPJK.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-dashed border-[var(--color-border)] rounded-2xl bg-[var(--color-bg-subtle)]">
            <Ship className="w-16 h-16 text-[var(--color-border-strong)] mb-4" />
            <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">PPJK Tidak Ditemukan</h3>
            <p className="text-[var(--color-text-secondary)] max-w-md">
              Kami tidak dapat menemukan mitra PPJK yang sesuai dengan pencarian Anda "{searchQuery}".
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPPJK.map((ppjk, idx) => (
              <PPJKCard 
                key={ppjk.id}
                id={ppjk.id}
                name={ppjk.name}
                location={ppjk.city + ", Indonesia"}
                rating={ppjk.rating}
                reviews={Math.floor(Math.random() * 200) + 15}
                isVerified={ppjk.isVerified}
                services={ppjk.services}
                estimatedCost={idx % 2 === 0 ? "Rp 500rb - 2Jt" : "Sesuai Negosiasi"}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
