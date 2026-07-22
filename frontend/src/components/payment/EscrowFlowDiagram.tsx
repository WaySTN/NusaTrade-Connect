'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';
import { CreditCard, Lock, CheckCircle2, Building2, ChevronRight, ArrowRight } from 'lucide-react';

export interface EscrowFlowDiagramProps {
  currentStep?: 1 | 2 | 3 | 4; // 1: Pay, 2: Escrow, 3: Confirm, 4: Payout
  className?: string;
  animate?: boolean;
}

export const EscrowFlowDiagram = ({ currentStep = 2, className, animate = false }: EscrowFlowDiagramProps) => {
  const steps = [
    { id: 1, label: 'Buyer Bayar', icon: CreditCard, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
    { id: 2, label: 'Dana Ditahan', icon: Lock, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200' },
    { id: 3, label: 'Buyer Konfirmasi', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    { id: 4, label: 'Cair ke UMKM', icon: Building2, color: 'text-[var(--color-primary)]', bg: 'bg-[var(--color-primary-subtle)]', border: 'border-[var(--color-primary)]/30' },
  ];

  return (
    <div className={cn("w-full py-8", className)}>
      <div className="flex items-center justify-between relative max-w-3xl mx-auto px-4 sm:px-12">
        
        {/* Background Line */}
        <div className="absolute top-1/2 left-8 right-8 sm:left-20 sm:right-20 h-1 bg-slate-100 -translate-y-1/2 z-0 rounded-full"></div>
        
        {/* Active Line Progress */}
        <div 
          className="absolute top-1/2 left-8 sm:left-20 h-1 bg-[var(--color-primary)] -translate-y-1/2 z-0 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `calc(${(currentStep - 1) * 33.33}% - ${currentStep === 1 ? '0px' : currentStep === 4 ? '40px' : '20px'})` }}
        ></div>

        {/* Floating Animation Coin (Only if animate=true and step < 4) */}
        {animate && currentStep > 1 && currentStep < 4 && (
          <div className="absolute top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-amber-400 border-2 border-white shadow-md animate-pulse shadow-amber-500/50"
               style={{ 
                 left: `calc(10% + ${(currentStep - 1) * 33.33}%)`,
                 animation: 'slide-coin 2s ease-in-out infinite alternate' 
               }}
          >
            <span className="sr-only">Coin</span>
          </div>
        )}

        {steps.map((step, idx) => {
          const isActive = step.id === currentStep;
          const isPast = step.id < currentStep;
          
          return (
            <div key={step.id} className="relative z-20 flex flex-col items-center gap-3">
              <div className={cn(
                "w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all duration-500",
                isActive ? cn(step.bg, step.border, "border-2 scale-110 shadow-lg") : 
                isPast ? "bg-[var(--color-primary)] text-white scale-100" : 
                "bg-white border-2 border-slate-200 text-slate-300 scale-95"
              )}>
                <step.icon className={cn(
                  "w-5 h-5 sm:w-7 sm:h-7 transition-colors duration-500",
                  isActive ? step.color : isPast ? "text-white" : "text-slate-300"
                )} />
              </div>
              <div className="text-center w-20 sm:w-24">
                <span className={cn(
                  "text-[10px] sm:text-xs font-bold transition-colors duration-500",
                  isActive ? "text-[var(--color-text-primary)]" : isPast ? "text-[var(--color-text-secondary)]" : "text-[var(--color-text-muted)]"
                )}>
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Global CSS animation for coin sliding */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide-coin {
          0% { transform: translate(-50%, -50%) scale(0.9); }
          100% { transform: translate(50%, -50%) scale(1.1); }
        }
      `}} />
    </div>
  );
};
