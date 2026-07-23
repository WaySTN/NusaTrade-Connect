import React from 'react';
import { cn } from '@/lib/utils/cn';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3 | 4 | 5;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = [
    { num: 1, label: 'Inquiry Buyer' },
    { num: 2, label: 'AI Terjemah & Koreksi' },
    { num: 3, label: 'UMKM Setujui (ID)' },
    { num: 4, label: 'Buyer Terima & Deal' },
    { num: 5, label: 'Lanjut Pembayaran (Escrow)' },
  ];

  return (
    <div className="w-full bg-white border-b border-[var(--color-border)] py-4 px-6 shadow-sm z-10 sticky top-0">
      <div className="max-w-5xl mx-auto relative">
        
        {/* Progress Line Track */}
        <div className="absolute left-[10%] right-[10%] top-4 h-0.5 bg-slate-100 -z-10"></div>
        <div 
          className="absolute left-[10%] top-4 h-0.5 bg-[var(--color-primary)] transition-all duration-500 ease-in-out -z-10"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 80}%` }}
        ></div>

        <div className="grid grid-cols-5 w-full">
          {steps.map((step) => {
            const isDone = step.num < currentStep;
            const isActive = step.num === currentStep;
            
            return (
              <div key={step.num} className="flex flex-col items-center gap-2 relative">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 relative bg-white",
                  isDone ? "bg-blue-500 text-white shadow-md shadow-blue-500/20 ring-4 ring-white" : 
                  isActive ? "bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/30 ring-4 ring-white" : 
                  "bg-slate-100 text-slate-400 border-2 border-white ring-2 ring-slate-100"
                )}>
                  {isDone ? <Check className="w-4 h-4" /> : step.num}
                </div>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-wider text-center leading-tight",
                  isActive ? "text-[var(--color-text-primary)] font-extrabold" : "text-slate-400"
                )}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

