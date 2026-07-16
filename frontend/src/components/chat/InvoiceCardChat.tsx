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
        return <Badge variant="success" className="text-[10px] px-1.5 py-0">PAID</Badge>;
      case 'EXPIRED':
        return <Badge variant="default" className="text-[10px] px-1.5 py-0">EXPIRED</Badge>;
      case 'FAILED':
        return <Badge variant="error" className="text-[10px] px-1.5 py-0">FAILED</Badge>;
      case 'PENDING':
      default:
        return <Badge variant="warning" className="text-[10px] px-1.5 py-0">WAITING PAYMENT</Badge>;
    }
  };

  const getStatusBorder = () => {
    if (isPaid) return "border-emerald-200 bg-emerald-50/50";
    if (isExpired) return "border-gray-200 bg-gray-50/50";
    if (isFailed) return "border-red-200 bg-red-50/50";
    return "border-[#C8941A]/30 bg-[#FEF9E7]"; // PENDING (Gold Accent)
  };

  return (
    <div className={cn("w-[280px] sm:w-[320px] rounded-xl border shadow-sm overflow-hidden", getStatusBorder(), className)}>
      {/* Header */}
      <div className="px-3 py-2 flex items-center justify-between border-b border-black/5 bg-white/50">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold text-[var(--color-text-primary)]">
            {invoice.id}
          </span>
          <button className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
        {getStatusBadge()}
      </div>

      {/* Body */}
      <div className="p-3 flex gap-3">
        {/* QR Code Placeholder/Thumbnail */}
        <div className="w-16 h-16 shrink-0 bg-white border border-[var(--color-border)] rounded-lg p-1 relative overflow-hidden flex items-center justify-center">
          {isPaid ? (
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          ) : isExpired ? (
            <AlertTriangle className="w-8 h-8 text-gray-400" />
          ) : (
            <QrCode className="w-10 h-10 text-[var(--color-text-secondary)]" />
          )}
          
          {isPaid && (
            <div className="absolute inset-0 bg-emerald-500/10" />
          )}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <p className="text-xs text-[var(--color-text-secondary)] truncate mb-0.5">
            {invoice.items[0]?.name} {invoice.items.length > 1 && `+${invoice.items.length - 1} lainnya`}
          </p>
          <div className="font-mono font-bold text-sm text-[var(--color-text-primary)]">
            {formatRupiah(invoice.amount)}
          </div>
          
          {isPending && (
            <div className="flex items-center gap-1 mt-1.5 text-[10px] font-medium text-amber-700 bg-amber-100/50 w-fit px-1.5 py-0.5 rounded">
              <Clock className="w-3 h-3" />
              Berlaku 23:59:59
            </div>
          )}
        </div>
      </div>

      {/* Footer CTA */}
      <div 
        className={cn(
          "px-3 py-2 border-t border-black/5 flex items-center justify-between text-xs font-medium cursor-pointer transition-colors",
          isPaid ? "text-emerald-700 bg-emerald-100/30 hover:bg-emerald-100/50" : 
          isExpired ? "text-gray-600 bg-gray-100/50 hover:bg-gray-100" :
          "text-[#A87A15] bg-[#C8941A]/5 hover:bg-[#C8941A]/10"
        )}
        onClick={onViewDetail}
      >
        <span>Lihat Detail Invoice</span>
        <ChevronRight className="w-4 h-4" />
      </div>
    </div>
  );
};
