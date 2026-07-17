'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';
import { Search, X } from 'lucide-react';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = "Cari produk ekspor...", 
  className 
}: SearchBarProps) => {
  const [localValue, setLocalValue] = useState(value);

  // Sync local value with prop value if it changes externally
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [localValue, onChange, value]);

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <div className={cn("relative flex items-center w-full group", className)}>
      <div className="absolute left-4 flex items-center justify-center pointer-events-none text-[var(--color-text-placeholder)] group-focus-within:text-[var(--color-primary)] transition-all duration-300 var(--ease-out-quart) group-focus-within:scale-110">
        <Search className="w-5 h-5" />
      </div>
      
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "peer flex h-12 w-full rounded-xl border bg-white pl-12 pr-10 py-2 text-sm font-medium text-[var(--color-text-primary)] transition-all duration-300 var(--ease-out-quart)",
          "placeholder:text-[var(--color-text-placeholder)] placeholder:font-normal",
          "border-[var(--color-border-strong)] hover:border-[var(--color-primary)]",
          "focus:outline-none focus:ring-4 focus:ring-[var(--color-primary-light)]/30 focus:border-[var(--color-primary)] shadow-sm"
        )}
      />
      
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] rounded-lg p-1.5 hover:bg-[var(--color-bg-subtle)] transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
