'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { Badge } from '@/components/ui/Badge';
import { MockInvoice } from '@/lib/mock-data';
import { Receipt, Calendar, ArrowRight } from 'lucide-react';

export interface InvoiceCardProps {
  invoice: MockInvoice;
  className?: string;
}

export const InvoiceCard = ({ invoice, className }: InvoiceCardProps) => {
  const getInvoiceBadgeVariant = (status: string) => {
    switch(status) {
      case 'PENDING': return 'warning';
      case 'PAID': return 'success';
      case 'EXPIRED': return 'default';
      case 'FAILED': return 'error';
      case 'COMPLETED': return 'premium';
      default: return 'default';
    }
  };

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className={cn(
      "bg-white border border-[var(--color-border)] rounded-xl overflow-hidden hover:shadow-md transition-shadow group flex flex-col sm:flex-row",
      className
    )}>
      
      {/* Icon Area */}
      <div className="hidden sm:flex w-20 bg-[var(--color-bg-subtle)] items-center justify-center border-r border-[var(--color-border)]">
        <Receipt className="w-8 h-8 text-[#006B52]/50 group-hover:text-[#006B52] transition-colors" />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-mono font-bold text-[var(--color-text-primary)]">
              {invoice.id}
            </h3>
            <Badge variant={getInvoiceBadgeVariant(invoice.status) as any}>
              {invoice.status}
            </Badge>
          </div>
          
          <div className="text-sm font-semibold text-[var(--color-text-primary)]">
            {invoice.buyerName}
          </div>
          
          <div className="flex items-center gap-3 text-xs text-[var(--color-text-secondary)]">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {invoice.date}
            </span>
            <span className="w-1 h-1 rounded-full bg-[var(--color-border-strong)]"></span>
            <span>{invoice.items.length} Item</span>
          </div>
        </div>

        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center pt-3 sm:pt-0 border-t sm:border-0 border-[var(--color-border)]">
          <div className="font-mono font-bold text-[#006B52] text-lg sm:mb-2">
            {formatRupiah(invoice.amount)}
          </div>
          <Link href={`/pembayaran/${invoice.id}`} className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-text-muted)] hover:text-[#C8941A] transition-colors">
            Lihat Detail <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
