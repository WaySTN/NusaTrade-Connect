'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export const DemoNavBar = () => {
  const pathname = usePathname();
  
  const steps = [
    { id: 1, label: 'UMKM', path: '/demo/payment/umkm' },
    { id: 2, label: 'Buyer (QRIS)', path: '/demo/payment/buyer' },
    { id: 3, label: 'Escrow', path: '/demo/payment/escrow' },
  ];

  const currentStepIdx = steps.findIndex(s => s.path === pathname);
  const nextStep = currentStepIdx >= 0 && currentStepIdx < steps.length - 1 ? steps[currentStepIdx + 1] : null;

  return (
    <div className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-[var(--color-border)] shadow-xs">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          <Link href="/" className="inline-flex items-center group">
            <img src="/logo.png" alt="NusaTrade Connect" className="h-10 w-auto object-contain scale-[1.3] origin-left" />
          </Link>
          
          <div className="h-4 w-px bg-[var(--color-border-strong)] mx-1 hidden sm:block"></div>
          
          <Link 
            href="/demo/payment"
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Entry Hub</span>
          </Link>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {steps.map((step, idx) => {
            const isActive = pathname === step.path;
            const isPast = currentStepIdx > idx;

            return (
              <React.Fragment key={step.id}>
                <Link href={step.path}>
                  <div className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer",
                    isActive 
                      ? "bg-[var(--color-primary)] text-white shadow-md shadow-[var(--color-primary)]/20 ring-2 ring-[var(--color-primary-light)]" 
                      : isPast
                        ? "bg-[var(--color-primary-subtle)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/20"
                        : "bg-[var(--color-bg-subtle)] text-[var(--color-text-muted)] border border-[var(--color-border)] hover:text-[var(--color-text-primary)]"
                  )}>
                    <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-mono font-extrabold">
                      {step.id}
                    </span>
                    <span className="hidden md:inline">{step.label}</span>
                  </div>
                </Link>
                {idx < steps.length - 1 && (
                  <ChevronRight className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Right Action: Next Step Button */}
        <div>
          {nextStep ? (
            <Link 
              href={nextStep.path}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold transition-all shadow-sm"
            >
              <span>Lanjut</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link 
              href="/demo-chat"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] text-xs font-bold transition-all"
            >
              <span>Kembali Chat</span>
            </Link>
          )}
        </div>

      </div>
    </div>
  );
};
