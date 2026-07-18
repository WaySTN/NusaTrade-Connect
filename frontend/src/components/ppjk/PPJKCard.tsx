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
}

export const PPJKCard = ({
  id,
  name,
  location,
  rating,
  reviews,
  isVerified,
  services,
  estimatedCost
}: PPJKCardProps) => {
  return (
    <Link href={`/ppjk/${id}`} className="block h-full group">
      <div className="bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden hover:shadow-xl hover-lift hover:border-[var(--color-primary-light)] hover:ring-4 hover:ring-[var(--color-primary-light)]/20 flex flex-col h-full transition-all duration-300">
        
        {/* Header Info */}
        <div className="p-5 flex gap-4">
          <div className="w-14 h-14 rounded-xl bg-[var(--color-bg-subtle)] border border-[var(--color-border)] flex items-center justify-center shrink-0 group-hover:bg-[var(--color-primary-light)] group-hover:text-[var(--color-primary)] transition-colors duration-300">
            <Ship className="w-7 h-7 text-[var(--color-primary)] group-hover:text-white transition-colors duration-300" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <h3 className="font-display font-bold text-base text-[var(--color-text-primary)] truncate group-hover:text-[var(--color-primary)] transition-colors duration-200">
                {name}
              </h3>
              {isVerified && (
                <ShieldCheck className="w-4 h-4 text-[#C8941A] shrink-0" />
              )}
            </div>
            
            <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-secondary)] mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span className="truncate">{location}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-[#D97706] bg-[#FEF3C7] px-1.5 py-0.5 rounded-md">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-xs font-bold">{rating}</span>
              </div>
              <span className="text-xs font-medium text-[var(--color-text-muted)]">({reviews} ulasan)</span>
            </div>
          </div>
        </div>

        {/* Services Tags */}
        <div className="px-5 pb-5 flex-1">
          <div className="flex flex-wrap gap-2">
            {services.map((service, i) => (
              <span 
                key={i} 
                className="text-[10px] font-bold px-2 py-1 rounded-md bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] border border-[var(--color-border)] group-hover:border-[var(--color-primary-subtle)] transition-colors duration-200"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto p-4 border-t border-[var(--color-border)] bg-slate-50/50 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider font-bold mb-0.5">Estimasi Biaya</span>
            <span className="font-mono text-sm font-bold text-[var(--color-primary)]">{estimatedCost}</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary-light)] shadow-sm font-bold group-hover:bg-[var(--color-primary)] group-hover:text-white group-hover:border-[var(--color-primary)] transition-all duration-300"
            rightIcon={<ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
          >
            Lihat Profil
          </Button>
        </div>
      </div>
    </Link>
  );
};
