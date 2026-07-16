import React from 'react';
import { cn } from '@/lib/utils/cn';
import { Check } from 'lucide-react';

export interface StepperProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn("flex items-center w-full", className)}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const isLast = index === steps.length - 1;

        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center relative">
              <div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-300 z-10",
                  isCompleted ? "bg-[#006B52] text-white border-2 border-[#006B52]" : 
                  isActive ? "bg-white text-[#006B52] border-2 border-[#006B52]" : 
                  "bg-white text-[var(--color-text-muted)] border-2 border-[var(--color-border)]"
                )}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : (index + 1)}
              </div>
              <span 
                className={cn(
                  "absolute top-10 w-24 text-center text-xs font-medium",
                  (isCompleted || isActive) ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)]"
                )}
              >
                {step}
              </span>
            </div>

            {!isLast && (
              <div className="flex-1 h-0.5 mx-2 bg-[var(--color-border)]">
                <div 
                  className="h-full bg-[#006B52] transition-all duration-300 ease-out" 
                  style={{ width: isCompleted ? '100%' : '0%' }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
