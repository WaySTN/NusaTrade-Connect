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
      "bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 var(--ease-out-quart) group flex flex-col sm:flex-row shadow-sm hover:border-[var(--color-primary)]/20",
      className
    )}>
      
      {/* Icon Area */}
      <div className="hidden sm:flex w-24 bg-[var(--color-bg-subtle)] items-center justify-center border-r border-[var(--color-border)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[var(--color-primary-subtle)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <Receipt className="w-10 h-10 text-[var(--color-primary)]/40 group-hover:text-[var(--color-primary)] transition-all duration-300 group-hover:scale-110 relative z-10" />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10 bg-white">
        
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-mono font-bold text-[var(--color-text-primary)] text-lg">
              {invoice.id}
            </h3>
            <Badge variant={getInvoiceBadgeVariant(invoice.status) as any} className="font-bold tracking-wider px-2 py-0.5">
              {invoice.status}
            </Badge>
          </div>
          
          <div className="text-sm font-bold text-[var(--color-text-primary)]">
            {invoice.buyerName}
          </div>
          
          <div className="flex items-center gap-3 text-xs font-medium text-[var(--color-text-secondary)]">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[var(--color-text-muted)]" />
              {invoice.date}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-border-strong)]"></span>
            <span>{invoice.items.length} Item</span>
          </div>
        </div>

        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center pt-4 sm:pt-0 border-t sm:border-0 border-[var(--color-border)] mt-2 sm:mt-0">
          <div className="font-mono font-extrabold text-[var(--color-primary)] text-xl sm:mb-2.5 tracking-tight">
            {formatRupiah(invoice.amount)}
          </div>
          <Link href={`/pembayaran/${invoice.id}`} className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-warning-hover)] bg-[var(--color-bg-subtle)] hover:bg-[var(--color-warning)]/10 px-4 py-2 rounded-lg transition-all duration-200">
            Lihat Detail <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
