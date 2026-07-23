'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { ChevronDown, ChevronUp, SlidersHorizontal, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useT } from '@/i18n/useT';
import { DynamicText } from '@/components/ui/DynamicText';

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
  const t = useT();
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    onChange({ ...filters, categories: newCategories });
  };

  return (
    <div className={cn("bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-sm", className)}>
      <div 
        className="flex items-center justify-between p-5 cursor-pointer hover:bg-[var(--color-bg-subtle)] transition-colors duration-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2 font-display font-bold text-[var(--color-text-primary)]">
          <SlidersHorizontal className="w-5 h-5 text-[var(--color-primary)]" />
          {t('katalog.filter') || 'Filter Katalog'}
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-[var(--color-text-muted)]" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[var(--color-text-muted)]" />
        )}
      </div>

      <div className={cn(
        "transition-all duration-300 var(--ease-out-quart)",
        isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
      )}>
        <div className="p-5 pt-0 space-y-8">
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
                  "w-11 h-6 rounded-full transition-colors duration-300 var(--ease-out-quart)",
                  filters.isVerified ? "bg-[var(--color-primary)]" : "bg-[var(--color-border-strong)]"
                )}></div>
                <div className={cn(
                  "absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-300 var(--ease-out-quart) shadow-sm",
                  filters.isVerified ? "transform translate-x-5" : ""
                )}></div>
              </div>
              <span className="text-sm font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors duration-200">
                {t('katalog.only_verified') || 'Hanya NIB Verified'}
              </span>
            </label>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold text-[var(--color-text-muted)] mb-4 uppercase tracking-wider">
              {t('katalog.category') || 'Kategori Produk'}
            </h4>
            <div className="space-y-3">
              {categories.map((category) => {
                const isChecked = filters.categories.includes(category);
                return (
                  <label key={category} className="flex items-center gap-3 cursor-pointer group">
                    <div className={cn(
                      "w-5 h-5 rounded-[6px] border flex items-center justify-center transition-all duration-200",
                      isChecked 
                        ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-white" 
                        : "border-[var(--color-border-strong)] bg-white group-hover:border-[var(--color-primary)] group-hover:shadow-[0_0_0_3px_var(--color-primary-subtle)]"
                    )}>
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-sm font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors duration-200">
                      <DynamicText text={category} />
                    </span>
                    <input 
                      type="checkbox"
                      className="sr-only"
                      checked={isChecked}
                      onChange={() => toggleCategory(category)}
                    />
                  </label>
                );
              })}
            </div>
          </div>

          {/* Price Range (Simplified for mockup) */}
          <div>
            <h4 className="text-xs font-bold text-[var(--color-text-muted)] mb-4 uppercase tracking-wider">
              {t('katalog.price_range') || 'Rentang Harga'}
            </h4>
            <div className="flex items-center gap-3">
              <input 
                type="number" 
                placeholder="Min"
                className="w-full text-sm font-medium rounded-xl border border-[var(--color-border)] px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)] focus:border-[var(--color-primary)] transition-colors"
                value={filters.minPrice || ''}
                onChange={(e) => onChange({ ...filters, minPrice: e.target.value ? Number(e.target.value) : undefined })}
              />
              <span className="text-[var(--color-text-muted)] font-bold">-</span>
              <input 
                type="number" 
                placeholder="Max"
                className="w-full text-sm font-medium rounded-xl border border-[var(--color-border)] px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)] focus:border-[var(--color-primary)] transition-colors"
                value={filters.maxPrice || ''}
                onChange={(e) => onChange({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : undefined })}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-[var(--color-border)]">
            <Button 
              variant="outline" 
              className="w-full justify-center text-[var(--color-text-primary)] font-bold" 
              onClick={onReset}
            >
              {t('katalog.reset_filter') || 'Reset Filter'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
