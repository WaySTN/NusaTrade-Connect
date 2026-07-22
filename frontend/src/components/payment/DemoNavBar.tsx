'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export const DemoNavBar = () => {
  const pathname = usePathname();
  
  const steps = [
    { id: 1, label: 'Sisi UMKM', path: '/demo/payment/umkm' },
    { id: 2, label: 'Sisi Buyer', path: '/demo/payment/buyer' },
    { id: 3, label: 'Dana Escrow', path: '/demo/payment/escrow' },
  ];

  return (
    <div className="sticky top-0 z-50 w-full bg-[var(--color-bg-base)]/80 backdrop-blur-md border-b border-[var(--color-border)] shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        
        <div className="flex items-center gap-4">
          <Link 
            href="/demo/payment"
            className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Entry</span>
          </Link>
          
          <div className="hidden sm:block h-4 w-px bg-[var(--color-border-strong)]"></div>
          
          <span className="hidden sm:block text-xs font-bold text-[var(--color-text-primary)]">
            Segmen 2.5 - 2.6: Alur Pembayaran
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {steps.map((step, idx) => {
            const isActive = pathname === step.path;
            const isPast = steps.findIndex(s => s.path === pathname) > idx;

            return (
              <React.Fragment key={step.id}>
                <Link href={step.path}>
                  <div className={cn(
                    "flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300",
                    isActive 
                      ? "bg-[var(--color-primary)] text-white shadow-md shadow-[var(--color-primary)]/20" 
                      : isPast
                        ? "bg-[var(--color-primary-subtle)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/20"
                        : "bg-white text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-subtle)]"
                  )}>
                    <span className="hidden sm:inline">Langkah</span> {step.id}
                  </div>
                </Link>
                {idx < steps.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-[var(--color-text-muted)]" />
                )}
              </React.Fragment>
            );
          })}
        </div>

      </div>
    </div>
  );
};
