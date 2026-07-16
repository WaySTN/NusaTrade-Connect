'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  label?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function Select({
  label,
  options,
  value,
  onChange,
  error,
  placeholder = "Pilih salah satu...",
  disabled,
  className
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    onChange?.(val);
    setIsOpen(false);
  };

  return (
    <div className={cn("flex flex-col gap-1.5 w-full relative", className)} ref={dropdownRef}>
      {label && (
        <label className={cn("text-sm font-medium", disabled ? "text-[var(--color-text-muted)]" : "text-[var(--color-text-secondary)]")}>
          {label}
        </label>
      )}
      
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          "flex h-11 w-full items-center justify-between rounded-lg border bg-white px-3 py-2 text-sm transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-[#006B52] focus:border-transparent",
          "disabled:cursor-not-allowed disabled:bg-[var(--color-bg-subtle)] disabled:text-[var(--color-text-muted)]",
          error ? "border-red-500 focus:ring-red-500" : "border-[var(--color-border)] hover:border-[var(--color-border-strong)]",
          !selectedOption && "text-[#94A3B8]"
        )}
      >
        <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown 
          className={cn(
            "w-5 h-5 text-[var(--color-text-muted)] transition-transform duration-200", 
            isOpen && "transform rotate-180"
          )} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 w-full z-50 animate-slide-up rounded-lg border border-[var(--color-border)] bg-white shadow-lg overflow-hidden max-h-60 overflow-y-auto">
          {options.length === 0 ? (
            <div className="px-3 py-3 text-sm text-[var(--color-text-muted)] text-center">Tidak ada opsi</div>
          ) : (
            <div className="py-1">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={cn(
                    "flex w-full items-center px-3 py-2.5 text-sm text-left transition-colors hover:bg-[var(--color-bg-subtle)]",
                    opt.value === value ? "bg-[#F0FAF6] text-[#006B52] font-medium" : "text-[var(--color-text-primary)]"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
