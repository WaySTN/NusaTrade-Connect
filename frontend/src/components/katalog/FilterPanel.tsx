'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { ChevronDown, ChevronUp, SlidersHorizontal, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface FilterState {
  categories: string[];
  minPrice?: number;
  maxPrice?: number;
  isVerified: boolean;
}

export interface FilterPanelProps {
  categories: string[];
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  className?: string;
}

export const FilterPanel = ({
  categories,
  filters,
  onChange,
  onReset,
  className
}: FilterPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    onChange({ ...filters, categories: newCategories });
  };

  return (
    <div className={cn("bg-white border border-[var(--color-border)] rounded-xl overflow-hidden", className)}>
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-[var(--color-bg-subtle)] transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2 font-display font-semibold text-[var(--color-text-primary)]">
          <SlidersHorizontal className="w-5 h-5 text-[#006B52]" />
          Filter Katalog
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-[var(--color-text-muted)]" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[var(--color-text-muted)]" />
        )}
      </div>

      <div className={cn(
        "transition-all duration-300 ease-in-out",
        isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
      )}>
        <div className="p-4 pt-0 space-y-6">
          {/* Verified Seller Toggle */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input 
                  type="checkbox" 
                  className="sr-only"
                  checked={filters.isVerified}
                  onChange={(e) => onChange({ ...filters, isVerified: e.target.checked })}
                />
                <div className={cn(
                  "w-10 h-5 rounded-full transition-colors duration-200 ease-in-out",
                  filters.isVerified ? "bg-[#006B52]" : "bg-[var(--color-border-strong)]"
                )}></div>
                <div className={cn(
                  "absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out shadow-sm",
                  filters.isVerified ? "transform translate-x-5" : ""
                )}></div>
              </div>
              <span className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[#006B52] transition-colors">
                Hanya Seller Terverifikasi
              </span>
            </label>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3 uppercase tracking-wider text-xs">
              Kategori Produk
            </h4>
            <div className="space-y-2">
              {categories.map((category) => {
                const isChecked = filters.categories.includes(category);
                return (
                  <label key={category} className="flex items-center gap-2 cursor-pointer group">
                    <div className={cn(
                      "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                      isChecked 
                        ? "bg-[#006B52] border-[#006B52] text-white" 
                        : "border-[var(--color-border-strong)] bg-white group-hover:border-[#006B52]"
                    )}>
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)]">
                      {category}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Price Range (Simplified for mockup) */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3 uppercase tracking-wider text-xs">
              Rentang Harga
            </h4>
            <div className="flex items-center gap-2">
              <input 
                type="number" 
                placeholder="Min"
                className="w-full text-sm rounded-md border border-[var(--color-border)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#006B52]"
                value={filters.minPrice || ''}
                onChange={(e) => onChange({ ...filters, minPrice: e.target.value ? Number(e.target.value) : undefined })}
              />
              <span className="text-[var(--color-text-muted)]">-</span>
              <input 
                type="number" 
                placeholder="Max"
                className="w-full text-sm rounded-md border border-[var(--color-border)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#006B52]"
                value={filters.maxPrice || ''}
                onChange={(e) => onChange({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : undefined })}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-[var(--color-border)]">
            <Button 
              variant="ghost" 
              className="w-full justify-center text-[var(--color-text-secondary)]" 
              onClick={onReset}
            >
              Reset Filter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
