'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';
import { CreditCard, Lock, CheckCircle2, Building2, ShieldCheck, Check } from 'lucide-react';

export interface EscrowFlowDiagramProps {
  currentStep?: 1 | 2 | 3 | 4; // 1: Pay, 2: Escrow, 3: Confirm, 4: Payout
  className?: string;
  animate?: boolean;
}

export const EscrowFlowDiagram = ({ currentStep = 2, className, animate = false }: EscrowFlowDiagramProps) => {
  const steps = [
    { 
      id: 1, 
      label: 'Buyer Bayar', 
      sublabel: 'Cross-Border QRIS',
      icon: CreditCard, 
      activeBg: 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-4 ring-emerald-100',
      pastBg: 'bg-emerald-600 text-white',
    },
    { 
      id: 2, 
      label: 'Dana Ditahan', 
      sublabel: 'Escrow Vault',
      icon: Lock, 
      activeBg: 'bg-amber-500 text-white shadow-lg shadow-amber-500/30 ring-4 ring-amber-100',
      pastBg: 'bg-emerald-600 text-white',
    },
    { 
      id: 3, 
      label: 'Konfirmasi Buyer', 
      sublabel: 'Barang Diterima',
      icon: CheckCircle2, 
      activeBg: 'bg-teal-600 text-white shadow-lg shadow-teal-600/30 ring-4 ring-teal-100',
      pastBg: 'bg-emerald-600 text-white',
    },
    { 
      id: 4, 
      label: 'Cair ke UMKM', 
      sublabel: 'Rekening Bank',
      icon: Building2, 
      activeBg: 'bg-emerald-700 text-white shadow-lg shadow-emerald-700/30 ring-4 ring-emerald-100',
      pastBg: 'bg-emerald-600 text-white',
    },
  ];

  // Progress line width percentage: step 1 = 0%, step 2 = 33.3%, step 3 = 66.6%, step 4 = 100%
  const progressPercent = ((currentStep - 1) / 3) * 100;

  return (
    <div className={cn("w-full py-6 select-none", className)}>
      <div className="relative max-w-2xl mx-auto px-4 sm:px-8">
        
        {/* Step Icon Circles Container & Connecting Lines */}
        <div className="relative flex items-center justify-between z-10 mb-4">
          {/* Track Line Background */}
          <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1.5 bg-slate-100 rounded-full z-0"></div>
          
          {/* Active Progress Line */}
          <div 
            className="absolute top-1/2 left-6 -translate-y-1/2 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 rounded-full z-0 transition-all duration-700 ease-out shadow-xs"
            style={{ width: `calc(${progressPercent}% * (100% - 48px) / 100)` }}
          ></div>

          {steps.map((step) => {
            const isActive = step.id === currentStep;
            const isPast = step.id < currentStep;

            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <div className={cn(
                  "w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-500 relative border-2",
                  isActive 
                    ? `${step.activeBg} border-transparent scale-110` 
                    : isPast 
                      ? `${step.pastBg} border-transparent shadow-xs` 
                      : "bg-white border-slate-200 text-slate-300 shadow-2xs"
                )}>
                  <step.icon className={cn(
                    "w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300",
                    isActive ? "scale-110" : ""
                  )} />

                  {/* Step Completed Check Badge */}
                  {isPast && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs border-2 border-white">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}

                  {/* Active Step Indicator Pulse Dot */}
                  {isActive && (
                    <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500 border-2 border-white"></span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Labels Row */}
        <div className="grid grid-cols-4 gap-1 text-center">
          {steps.map((step) => {
            const isActive = step.id === currentStep;
            const isPast = step.id < currentStep;

            return (
              <div key={step.id} className="flex flex-col items-center">
                <span className={cn(
                  "text-xs font-bold leading-snug transition-colors duration-300",
                  isActive 
                    ? "text-[var(--color-primary)] font-extrabold" 
                    : isPast 
                      ? "text-[var(--color-text-primary)] font-semibold" 
                      : "text-[var(--color-text-muted)]"
                )}>
                  {step.label}
                </span>
                <span className="text-[10px] font-medium text-[var(--color-text-secondary)] hidden sm:block mt-0.5">
                  {step.sublabel}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
