import React from 'react';
import { cn } from '@/lib/utils/cn';
import { MockInvoice } from '@/lib/mock-data';
import { QrCode, Copy, ChevronRight, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export interface InvoiceCardChatProps {
  invoice: MockInvoice;
  onViewDetail?: () => void;
  className?: string;
}

export const InvoiceCardChat = ({ invoice, onViewDetail, className }: InvoiceCardChatProps) => {
  const isPaid = invoice.status === 'PAID' || invoice.status === 'COMPLETED';
  const isExpired = invoice.status === 'EXPIRED';
  const isPending = invoice.status === 'PENDING';
  const isFailed = invoice.status === 'FAILED';

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = () => {
    switch (invoice.status) {
      case 'PAID':
      case 'COMPLETED':
        return <Badge variant="success" className="text-[10px] px-2 py-0.5 font-bold tracking-wider">PAID</Badge>;
      case 'EXPIRED':
        return <Badge variant="default" className="text-[10px] px-2 py-0.5 font-bold tracking-wider">EXPIRED</Badge>;
      case 'FAILED':
        return <Badge variant="error" className="text-[10px] px-2 py-0.5 font-bold tracking-wider">FAILED</Badge>;
      case 'PENDING':
      default:
        return <Badge variant="warning" className="text-[10px] px-2 py-0.5 font-bold tracking-wider">WAITING PAYMENT</Badge>;
    }
  };

  const getStatusBorder = () => {
    if (isPaid) return "border-[var(--color-success)]/30 bg-[var(--color-success)]/5";
    if (isExpired) return "border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)]";
    if (isFailed) return "border-[var(--color-error)]/30 bg-[var(--color-error)]/5";
    return "border-[var(--color-warning)]/30 bg-[var(--color-warning)]/5";
  };

  return (
    <div className={cn("w-[280px] sm:w-[320px] rounded-2xl border shadow-sm hover:shadow-md transition-shadow duration-300 var(--ease-out-quart) overflow-hidden", getStatusBorder(), className)}>
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-black/5 bg-white/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-[var(--color-text-primary)]">
            {invoice.id}
          </span>
          <button className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors duration-200">
            <Copy className="w-4 h-4" />
          </button>
        </div>
        {getStatusBadge()}
      </div>

      {/* Body */}
      <div className="p-4 flex gap-4">
        {/* QR Code Placeholder/Thumbnail */}
        <div className="w-16 h-16 shrink-0 bg-white border border-[var(--color-border)] rounded-xl p-1 relative overflow-hidden flex items-center justify-center shadow-sm">
          {isPaid ? (
            <CheckCircle2 className="w-8 h-8 text-[var(--color-success)]" />
          ) : isExpired ? (
            <AlertTriangle className="w-8 h-8 text-[var(--color-text-muted)]" />
          ) : (
            <QrCode className="w-10 h-10 text-[var(--color-text-secondary)]" />
          )}
          
          {isPaid && (
            <div className="absolute inset-0 bg-[var(--color-success)]/10" />
          )}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <p className="text-xs font-medium text-[var(--color-text-secondary)] truncate mb-1">
            {invoice.items[0]?.name} {invoice.items.length > 1 && `+${invoice.items.length - 1} lainnya`}
          </p>
          <div className="font-mono font-extrabold text-base text-[var(--color-text-primary)] tracking-tight">
            {formatRupiah(invoice.amount)}
          </div>
          
          {isPending && (
            <div className="flex items-center gap-1.5 mt-2 text-[10px] font-bold text-[var(--color-warning-hover)] bg-[var(--color-warning)]/20 w-fit px-2 py-0.5 rounded-md">
              <Clock className="w-3.5 h-3.5" />
              Berlaku 23:59:59
            </div>
          )}
        </div>
      </div>

      {/* Footer CTA */}
      <div 
        className={cn(
          "px-4 py-3 border-t border-black/5 flex items-center justify-between text-xs font-bold cursor-pointer transition-colors duration-200",
          isPaid ? "text-[var(--color-success-hover)] bg-[var(--color-success)]/10 hover:bg-[var(--color-success)]/20" : 
          isExpired ? "text-[var(--color-text-secondary)] bg-[var(--color-border)] hover:bg-[var(--color-border-strong)]" :
          "text-[var(--color-warning-hover)] bg-[var(--color-warning)]/10 hover:bg-[var(--color-warning)]/20"
        )}
        onClick={onViewDetail}
      >
        <span>Lihat Detail Invoice</span>
        <ChevronRight className="w-4 h-4" />
      </div>
    </div>
  );
};
