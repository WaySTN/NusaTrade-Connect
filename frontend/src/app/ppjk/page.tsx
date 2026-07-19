'use client';

import React, { useState, useEffect } from 'react';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { PPJKCard } from '@/components/ppjk/PPJKCard';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { MOCK_PPJK, MockPPJK } from '@/lib/mock-data';
import { SearchBar } from '@/components/katalog/SearchBar';
import { Ship, Sparkles } from 'lucide-react';
import { useT } from '@/i18n/useT';

// ─── Helper: Read registered PPJK from localStorage ─────────────────────────
function getRegisteredPPJKFromStorage(): MockPPJK[] {
  if (typeof window === 'undefined') return [];
  try {
    const name = localStorage.getItem('ppjk_registered_name');
    const email = localStorage.getItem('ppjk_registered_email');
    if (!name || !email) return [];

    const rawMin = localStorage.getItem('ppjk_registered_cost_min') ?? '0';
    const rawMax = localStorage.getItem('ppjk_registered_cost_max') ?? '0';
    const rawServices = localStorage.getItem('ppjk_registered_services') ?? '[]';

    const costMin = parseInt(rawMin, 10) || 0;
    const costMax = parseInt(rawMax, 10) || 0;
    const services: string[] = JSON.parse(rawServices);

    const registeredPPJK: MockPPJK = {
      id: 'profil-ppjk',
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      city: localStorage.getItem('ppjk_registered_city') ?? '',
      province: localStorage.getItem('ppjk_registered_province') ?? '',
      fullAddress: localStorage.getItem('ppjk_registered_address') ?? '',
      email,
      whatsapp: localStorage.getItem('ppjk_registered_whatsapp') ?? '',
      services,
      rating: 0,
      reviewCount: 0,
      isVerified: false,
      description: localStorage.getItem('ppjk_registered_desc') ?? '',
      estimatedCostMin: costMin,
      estimatedCostMax: costMax,
      costUnit: localStorage.getItem('ppjk_registered_cost_unit') ?? 'per dokumen',
      establishedYear: parseInt(localStorage.getItem('ppjk_registered_year') ?? '0', 10),
      employeeCount: '-',
      certifications: [],
      coverageArea: [],
      portfolioCount: 0,
      operationalHours: localStorage.getItem('ppjk_registered_hours') ?? '',
    };

    return [registeredPPJK];
  } catch {
    return [];
  }
}

export default function PPJKDirectoryPage() {
  const t = useT();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [registeredPPJK, setRegisteredPPJK] = useState<MockPPJK[]>([]);

  useEffect(() => {
    // Load registered PPJK from localStorage after mount
    const registered = getRegisteredPPJKFromStorage();
    setRegisteredPPJK(registered);
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Gabungkan: registered di depan, lalu mock
  const allPPJK = [...registeredPPJK, ...MOCK_PPJK];

  const filteredPPJK = allPPJK.filter(ppjk => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        ppjk.name.toLowerCase().includes(q) ||
        ppjk.city.toLowerCase().includes(q) ||
        ppjk.province.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const formatCost = (val: number) => {
    if (val <= 0) return null;
    if (val >= 1000000) return `${(val / 1000000).toFixed(val % 1000000 === 0 ? 0 : 1)} Jt`;
    return `${(val / 1000).toFixed(0)}rb`;
  };

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
              {t('ppjk.badge') || 'Layanan Ekspor Terintegrasi'}
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-4 tracking-tight">
              {t('ppjk.title') || 'Direktori Mitra PPJK'}
            </h1>
            <p className="text-[var(--color-primary-light)] text-lg md:text-xl font-medium">
              {t('ppjk.subtitle') || 'Temukan Perusahaan Pengurusan Jasa Kepabeanan (PPJK) dan logistik terbaik untuk kelancaran ekspor Anda.'}
            </p>
          </div>
        </div>
      </div>

      <main className="flex-1 -mt-8 relative z-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pb-20">

        <div className="mb-10 max-w-xl mx-auto lg:mx-0 bg-white rounded-2xl p-4 shadow-sm border border-[var(--color-border)]">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={t('ppjk.search_placeholder') || "Cari nama PPJK atau kota..."}
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
            <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">{t('ppjk.not_found') || 'PPJK Tidak Ditemukan'}</h3>
            <p className="text-[var(--color-text-secondary)] max-w-md font-medium">
              {t('ppjk.not_found_desc') || 'Kami tidak dapat menemukan mitra PPJK yang sesuai dengan pencarian Anda'} &quot;{searchQuery}&quot;.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPPJK.map((ppjk, idx) => {
              const isNew = ppjk.id === 'profil-ppjk';
              const minStr = formatCost(ppjk.estimatedCostMin);
              const maxStr = formatCost(ppjk.estimatedCostMax);
              const costString = minStr && maxStr
                ? `Rp ${minStr} - ${maxStr}`
                : minStr
                ? `Rp ${minStr}`
                : t('ppjk.contact_us') || 'Hubungi kami';

              return (
                <div
                  key={ppjk.id}
                  className="animate-slide-up h-full relative"
                  style={{ animationDelay: `${Math.min(idx * 75, 600)}ms` }}
                >
                  {/* Badge "Baru Bergabung" untuk akun registrasi */}
                  {isNew && (
                    <div className="absolute -top-3 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-emerald-500/30">
                      <Sparkles className="w-3 h-3" />
                      {t('ppjk.newly_joined') || 'Baru Bergabung'}
                    </div>
                  )}
                  <PPJKCard
                    id={ppjk.id}
                    name={ppjk.name}
                    location={ppjk.city && ppjk.province ? `${ppjk.city}, ${ppjk.province}` : ppjk.city || ppjk.province || 'Lokasi belum diisi'}
                    rating={ppjk.rating}
                    reviews={ppjk.reviewCount}
                    isVerified={ppjk.isVerified}
                    services={ppjk.services.length > 0 ? ppjk.services : ['Layanan belum diisi']}
                    estimatedCost={costString}
                  />
                </div>
              );
            })}
          </div>
        )}
      </main>

      <PublicFooter variant="light" />
    </div>
  );
}
