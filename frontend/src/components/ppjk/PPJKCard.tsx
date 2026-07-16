'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';
import { Star, ShieldCheck, Ship, MapPin } from 'lucide-react';
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
  name,
  location,
  rating,
  reviews,
  isVerified,
  services,
  estimatedCost
}: PPJKCardProps) => {
  return (
    <div className="bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#006B52]/30 flex flex-col cursor-pointer group">
      
      {/* Header Info */}
      <div className="p-5 flex gap-4">
        <div className="w-14 h-14 rounded-xl bg-[var(--color-bg-subtle)] border border-[var(--color-border-strong)] flex items-center justify-center shrink-0 group-hover:bg-[#E6F5F0] transition-colors">
          <Ship className="w-7 h-7 text-[#006B52]" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-display font-semibold text-base text-[var(--color-text-primary)] truncate">
              {name}
            </h3>
            {isVerified && (
              <ShieldCheck className="w-4 h-4 text-[#C8941A] shrink-0" />
            )}
          </div>
          
          <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)] mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate">{location}</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5 text-[#D97706]">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-xs font-bold">{rating}</span>
            </div>
            <span className="text-xs text-[var(--color-text-muted)]">({reviews} ulasan)</span>
          </div>
        </div>
      </div>

      {/* Services Tags */}
      <div className="px-5 pb-4">
        <div className="flex flex-wrap gap-1.5">
          {services.map((service, i) => (
            <span 
              key={i} 
              className="text-[10px] font-medium px-2 py-1 rounded-md bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
            >
              {service}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto p-4 border-t border-[var(--color-border)] bg-[var(--color-bg-subtle)] flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider font-semibold">Estimasi Biaya</span>
          <span className="font-mono text-sm font-bold text-[var(--color-text-primary)]">{estimatedCost}</span>
        </div>
        <Button variant="secondary" size="sm" className="bg-white hover:bg-[#E6F5F0] hover:text-[#006B52] border-transparent shadow-sm">
          Hubungi
        </Button>
      </div>
    </div>
  );
};
