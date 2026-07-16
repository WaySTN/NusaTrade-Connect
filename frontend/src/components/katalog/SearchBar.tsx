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
    <div className={cn("relative flex items-center w-full", className)}>
      <div className="absolute left-3 flex items-center justify-center pointer-events-none text-[var(--color-text-muted)]">
        <Search className="w-5 h-5" />
      </div>
      
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "flex h-12 w-full rounded-xl border bg-white px-10 py-2 text-base text-[var(--color-text-primary)] transition-all",
          "placeholder:text-[#94A3B8]",
          "border-[var(--color-border)] hover:border-[var(--color-border-strong)]",
          "focus:outline-none focus:ring-2 focus:ring-[#006B52] focus:border-transparent shadow-sm"
        )}
      />
      
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] rounded-full p-1 hover:bg-[var(--color-bg-subtle)] transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
