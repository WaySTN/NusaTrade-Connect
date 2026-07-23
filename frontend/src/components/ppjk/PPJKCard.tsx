'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { Star, ShieldCheck, Ship, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface PPJKCardProps {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  isVerified: boolean;
  services: string[];
  estimatedCost: string;
  logoUrl?: string;
}

export const PPJKCard = ({
  id,
  name,
  location,
  rating,
  reviews,
  isVerified,
  services,
  estimatedCost,
  logoUrl
}: PPJKCardProps) => {
  const [imgError, setImgError] = React.useState(false);
  const initials = name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

  return (
    <Link href={`/ppjk/${id}`} className="block h-full group">
      <div className="bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden hover:shadow-xl hover-lift hover:border-[var(--color-primary-light)] hover:ring-4 hover:ring-[var(--color-primary-light)]/20 flex flex-col h-full transition-all duration-300">
        
        {/* Header Info */}
        <div className="p-5 flex gap-4">
          <div className="w-14 h-14 rounded-xl bg-white border border-[var(--color-border)] overflow-hidden flex items-center justify-center shrink-0 shadow-sm relative group-hover:border-[var(--color-primary-subtle)] transition-colors duration-300">
            {logoUrl && !imgError ? (
              <img 
                src={logoUrl} 
                alt={name} 
                onError={() => setImgError(true)}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              />
            ) : (
              <div className="w-full h-full bg-emerald-50 text-[var(--color-primary)] flex items-center justify-center font-bold text-sm font-display">
                {initials}
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-1 mb-1">
              <h3 className="font-display font-bold text-sm sm:text-base text-[var(--color-text-primary)] line-clamp-2 leading-snug min-h-[2.5rem] group-hover:text-[var(--color-primary)] transition-colors duration-200">
                {name}
              </h3>
              {isVerified && (
                <ShieldCheck className="w-4 h-4 text-[#C8941A] shrink-0 mt-1" />
              )}
            </div>
            
            <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-secondary)] mb-2">
              <MapPin className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
              <span className="truncate">{location}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-[#D97706] bg-[#FEF3C7] px-1.5 py-0.5 rounded-md">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-xs font-bold">{rating > 0 ? rating.toFixed(1) : 'New'}</span>
              </div>
              <span className="text-xs font-medium text-[var(--color-text-muted)]">
                {reviews > 0 ? `(${reviews} ulasan)` : 'Belum ada ulasan'}
              </span>
            </div>
          </div>
        </div>

        {/* Services Tags */}
        <div className="px-5 pb-5 flex-1 flex flex-col justify-end">
          <div className="flex flex-wrap gap-1.5">
            {services.slice(0, 4).map((service, i) => (
              <span 
                key={i} 
                className="text-[10px] font-bold px-2 py-1 rounded-md bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] border border-[var(--color-border)] group-hover:border-[var(--color-primary-subtle)] transition-colors duration-200"
              >
                {service}
              </span>
            ))}
            {services.length > 4 && (
              <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-[var(--color-accent)]/8 text-[var(--color-accent)] border border-[var(--color-accent)]/15">
                +{services.length - 4} Lainnya
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto p-4 border-t border-[var(--color-border)] bg-slate-50/50 flex items-center justify-between">
          <div className="flex flex-col min-w-0 pr-2">
            <span className="text-[9px] text-[var(--color-text-muted)] uppercase tracking-wider font-extrabold mb-0.5">Estimasi Biaya</span>
            <span className="font-mono text-xs sm:text-sm font-bold text-[var(--color-primary)] truncate">{estimatedCost}</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary-light)] shadow-sm font-bold shrink-0 group-hover:bg-[var(--color-primary)] group-hover:text-white group-hover:border-[var(--color-primary)] transition-all duration-300"
            rightIcon={<ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
          >
            Lihat Profil
          </Button>
        </div>
      </div>
    </Link>
  );
};
