'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';
import { CreditCard, Building2, Wallet } from 'lucide-react';

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'virtual_account' | 'bank_transfer' | 'ewallet';
  icon?: string; // URL for icon
  isPromo?: boolean;
}

export interface PaymentMethodSelectorProps {
  methods: PaymentMethod[];
  selectedId?: string;
  onSelect: (id: string) => void;
  className?: string;
}

export const PaymentMethodSelector = ({
  methods,
  selectedId,
  onSelect,
  className
}: PaymentMethodSelectorProps) => {

  const getIcon = (type: string) => {
    switch (type) {
      case 'virtual_account': return <Building2 className="w-5 h-5 text-blue-600" />;
      case 'ewallet': return <Wallet className="w-5 h-5 text-emerald-600" />;
      case 'bank_transfer':
      default: return <Building2 className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {methods.map((method) => {
        const isSelected = selectedId === method.id;
        
        return (
          <div
            key={method.id}
            onClick={() => onSelect(method.id)}
            className={cn(
              "relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
              isSelected 
                ? "border-[#006B52] bg-[#E6F5F0]/50" 
                : "border-[var(--color-border)] bg-white hover:border-[#006B52]/50 hover:bg-[#F0FAF6]/30"
            )}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-50 border border-[var(--color-border)] mr-4">
              {method.icon ? (
                <img src={method.icon} alt={method.name} className="w-6 h-6 object-contain" />
              ) : (
                getIcon(method.type)
              )}
            </div>
            
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">
                {method.name}
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)] mt-0.5 capitalize">
                {method.type.replace('_', ' ')}
              </p>
            </div>
            
            <div className={cn(
              "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
              isSelected ? "border-[#006B52]" : "border-[var(--color-border-strong)]"
            )}>
              {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#006B52]"></div>}
            </div>

            {method.isPromo && (
              <div className="absolute -top-2.5 right-4 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                PROMO
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
