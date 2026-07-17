'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';
import { ChevronDown } from 'lucide-react';

export interface DropdownItem {
  id: string | number;
  label: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
}

export interface DropdownProps {
  trigger: React.ReactNode | ((isOpen: boolean) => React.ReactNode);
  items: DropdownItem[];
  align?: 'left' | 'right';
  className?: string;
}

export const Dropdown = ({ trigger, items, align = 'left', className }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={cn("relative inline-block text-left", className)} ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer inline-flex items-center"
      >
        {typeof trigger === 'function' ? trigger(isOpen) : trigger}
      </div>

      {isOpen && (
        <div 
          className={cn(
            "absolute z-50 mt-2 w-56 rounded-2xl bg-white border border-[var(--color-border)] shadow-lg shadow-[var(--color-text-primary)]/5 overflow-hidden animate-slide-up duration-200 var(--ease-out-quart) p-1.5",
            align === 'left' ? 'left-0 origin-top-left' : 'right-0 origin-top-right'
          )}
        >
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                item.onClick?.();
                setIsOpen(false);
              }}
              className={cn(
                "w-full text-left px-3 py-2.5 text-sm font-bold flex items-center gap-2.5 rounded-xl transition-colors duration-200",
                item.danger 
                  ? "text-[var(--color-error)] hover:bg-[var(--color-error)]/10" 
                  : "text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-primary)]"
              )}
            >
              {item.icon && <span className="w-4 h-4">{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
