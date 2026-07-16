'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getMockInvoice } from '@/lib/mock-data';
import { QRCodeDisplay } from '@/components/payment/QRCodeDisplay';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Download, CheckCircle2, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export default function InvoiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const invoiceId = typeof params.invoiceId === 'string' ? params.invoiceId : '';
  
  const invoice = getMockInvoice(invoiceId);

  if (!invoice) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Invoice Tidak Ditemukan</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">Invoice yang Anda cari mungkin telah dihapus atau tidak valid.</p>
        <Link href="/pembayaran">
          <Button variant="primary" leftIcon={<ArrowLeft className="w-4 h-4" />}>Kembali ke Pembayaran</Button>
        </Link>
      </div>
    );
  }

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

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

  // Determine current step (1-4)
  const getStepIndex = () => {
    switch(invoice.status) {
      case 'PENDING': return 1;
      case 'PAID': return 2;
      case 'COMPLETED': return 4;
      default: return 0; // EXPIRED/FAILED
    }
  };

  const currentStep = getStepIndex();
  const steps = ['Menunggu Pembayaran', 'Dana Diterima (Escrow)', 'Proses Pengiriman', 'Selesai & Dana Cair'];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] mb-2">
        <Link href="/pembayaran" className="hover:text-[#006B52] transition-colors">Pembayaran</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="font-semibold text-[var(--color-text-primary)]">Detail Invoice</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl sm:text-3xl font-display font-bold font-mono text-[var(--color-text-primary)]">
              {invoice.id}
            </h1>
            <Badge variant={getInvoiceBadgeVariant(invoice.status) as any} className="text-xs">
              {invoice.status}
            </Badge>
          </div>
          <p className="text-[var(--color-text-secondary)]">Diterbitkan pada {invoice.date}</p>
        </div>
        
        <Button 
          variant="outline" 
          leftIcon={<Download className="w-4 h-4" />}
          onClick={() => alert('Fitur download PDF segera hadir!')}
        >
          Download PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Main Content (Left) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Status Tracker */}
          {currentStep > 0 && (
            <div className="bg-white border border-[var(--color-border)] rounded-xl p-6 shadow-sm overflow-x-auto">
              <h3 className="font-bold text-[var(--color-text-primary)] mb-6">Status Pembayaran & Pencairan</h3>
              
              <div className="flex items-center justify-between min-w-[500px] relative">
                {/* Connecting Line */}
                <div className="absolute top-4 left-4 right-4 h-0.5 bg-[var(--color-bg-subtle)] z-0"></div>
                
                {/* Active Line Segment */}
                <div 
                  className="absolute top-4 left-4 h-0.5 bg-[#006B52] z-0 transition-all duration-500" 
                  style={{ width: `${Math.max(0, (currentStep - 1) * 33.33)}%` }}
                ></div>

                {steps.map((step, idx) => {
                  const stepNumber = idx + 1;
                  const isActive = stepNumber === currentStep;
                  const isPast = stepNumber < currentStep;
                  
                  return (
                    <div key={idx} className="flex flex-col items-center relative z-10 w-24">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300",
                        isPast ? "bg-[#006B52] border-[#006B52] text-white" :
                        isActive ? "bg-white border-[#006B52] text-[#006B52] shadow-[0_0_0_4px_rgba(0,107,82,0.1)]" :
                        "bg-white border-[var(--color-border-strong)] text-[var(--color-text-muted)]"
                      )}>
                        {isPast ? <CheckCircle2 className="w-5 h-5" /> : stepNumber}
                      </div>
                      <span className={cn(
                        "text-xs text-center mt-3 font-semibold",
                        isActive || isPast ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)]"
                      )}>
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Invoice Details Table */}
          <div className="bg-white border border-[var(--color-border)] rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-[var(--color-border)]">
              <h3 className="font-bold text-[var(--color-text-primary)]">Rincian Tagihan</h3>
            </div>
            
            <div className="p-5 border-b border-[var(--color-border)]">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">Ditagihkan Kepada</p>
                  <p className="font-semibold text-[var(--color-text-primary)]">{invoice.buyerName}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">Tanggal</p>
                  <p className="font-semibold text-[var(--color-text-primary)]">{invoice.date}</p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border)]">
                    <th className="p-4 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Deskripsi Item</th>
                    <th className="p-4 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider text-right">Qty</th>
                    <th className="p-4 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider text-right">Harga (IDR)</th>
                    <th className="p-4 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                  {invoice.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-4 text-sm font-medium text-[var(--color-text-primary)]">{item.name}</td>
                      <td className="p-4 text-sm text-[var(--color-text-secondary)] text-right">{item.qty}</td>
                      <td className="p-4 text-sm font-mono text-[var(--color-text-secondary)] text-right">{formatRupiah(item.price)}</td>
                      <td className="p-4 text-sm font-mono font-medium text-[var(--color-text-primary)] text-right">{formatRupiah(item.price * item.qty)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-5 bg-[var(--color-bg-subtle)] flex flex-col items-end gap-2 border-t border-[var(--color-border)]">
              <div className="flex justify-between w-full sm:w-1/2 text-sm text-[var(--color-text-secondary)]">
                <span>Subtotal</span>
                <span className="font-mono">{formatRupiah(invoice.amount)}</span>
              </div>
              <div className="flex justify-between w-full sm:w-1/2 text-sm text-[var(--color-text-secondary)]">
                <span>Platform Fee (2%)</span>
                <span className="font-mono text-[#C8941A]">Dibayar terpisah</span>
              </div>
              <div className="flex justify-between w-full sm:w-1/2 mt-2 pt-2 border-t border-[var(--color-border-strong)]">
                <span className="font-bold text-[var(--color-text-primary)]">Total Tagihan</span>
                <span className="font-mono text-xl font-bold text-[#006B52]">{formatRupiah(invoice.amount)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar (Right) */}
        <div className="lg:col-span-1">
          <div className="sticky top-[calc(var(--header-height)+2rem)]">
            <QRCodeDisplay status={invoice.status} />
          </div>
        </div>
        
      </div>
    </div>
  );
}
