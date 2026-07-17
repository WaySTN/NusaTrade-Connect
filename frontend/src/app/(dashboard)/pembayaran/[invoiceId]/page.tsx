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
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-[var(--color-bg-base)]">
        <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Invoice Tidak Ditemukan</h2>
        <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-4">Invoice yang Anda cari mungkin telah dihapus atau tidak valid.</p>
        <Link href="/pembayaran">
          <Button variant="primary" className="shadow-lg shadow-[var(--color-primary)]/20 font-bold" leftIcon={<ArrowLeft className="w-4 h-4" />}>Kembali ke Pembayaran</Button>
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
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 lg:space-y-8 bg-[var(--color-bg-base)] min-h-full">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] mb-2">
        <Link href="/pembayaran" className="hover:text-[var(--color-primary)] transition-colors duration-200">Pembayaran</Link>
        <ChevronRight className="w-4 h-4 text-[var(--color-text-muted)]" />
        <span className="font-bold text-[var(--color-text-primary)]">Detail Invoice</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold font-mono text-[var(--color-text-primary)] tracking-tight">
              {invoice.id}
            </h1>
            <Badge variant={getInvoiceBadgeVariant(invoice.status) as any} className="text-xs font-bold tracking-wider px-2 py-0.5">
              {invoice.status}
            </Badge>
          </div>
          <p className="text-[var(--color-text-secondary)] font-medium">Diterbitkan pada {invoice.date}</p>
        </div>
        
        <Button 
          variant="outline" 
          className="font-bold border-[var(--color-border-strong)] bg-white hover:bg-[var(--color-bg-subtle)]"
          leftIcon={<Download className="w-4 h-4" />}
          onClick={() => alert('Fitur download PDF segera hadir!')}
        >
          Download PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Main Content (Left) */}
        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
          
          {/* Status Tracker */}
          {currentStep > 0 && (
            <div className="bg-white border border-[var(--color-border)] rounded-2xl p-6 shadow-sm overflow-x-auto hover:shadow-md transition-shadow duration-300 var(--ease-out-quart)">
              <h3 className="font-bold text-[var(--color-text-primary)] text-lg mb-8">Status Pembayaran & Pencairan</h3>
              
              <div className="flex items-center justify-between min-w-[500px] relative mt-2 mb-4 mx-4">
                {/* Connecting Line */}
                <div className="absolute top-4 left-0 right-0 h-1 bg-[var(--color-bg-subtle)] z-0 rounded-full"></div>
                
                {/* Active Line Segment */}
                <div 
                  className="absolute top-4 left-0 h-1 bg-[var(--color-primary)] z-0 transition-all duration-700 ease-in-out rounded-full" 
                  style={{ width: `${Math.max(0, (currentStep - 1) * 33.33)}%` }}
                ></div>

                {steps.map((step, idx) => {
                  const stepNumber = idx + 1;
                  const isActive = stepNumber === currentStep;
                  const isPast = stepNumber < currentStep;
                  
                  return (
                    <div key={idx} className="flex flex-col items-center relative z-10 w-28">
                      <div className={cn(
                        "w-9 h-9 rounded-full flex items-center justify-center text-sm font-extrabold border-[3px] transition-all duration-500 var(--ease-out-quart)",
                        isPast ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-white scale-100 shadow-[0_0_15px_var(--color-primary)]/20" :
                        isActive ? "bg-white border-[var(--color-primary)] text-[var(--color-primary)] scale-110 shadow-[0_0_0_6px_var(--color-primary-subtle)]" :
                        "bg-white border-[var(--color-border-strong)] text-[var(--color-text-muted)] scale-90"
                      )}>
                        {isPast ? <CheckCircle2 className="w-5 h-5" /> : stepNumber}
                      </div>
                      <span className={cn(
                        "text-xs text-center mt-4 font-bold transition-colors duration-300",
                        isActive ? "text-[var(--color-primary)]" : isPast ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)]"
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
          <div className="bg-white border border-[var(--color-border)] rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 var(--ease-out-quart)">
            <div className="p-5 sm:p-6 border-b border-[var(--color-border)]">
              <h3 className="font-bold text-[var(--color-text-primary)] text-lg">Rincian Tagihan</h3>
            </div>
            
            <div className="p-5 sm:p-6 border-b border-[var(--color-border)] bg-[var(--color-bg-subtle)]/50">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5">Ditagihkan Kepada</p>
                  <p className="font-bold text-[var(--color-text-primary)]">{invoice.buyerName}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5">Tanggal</p>
                  <p className="font-bold text-[var(--color-text-primary)]">{invoice.date}</p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="bg-white border-b border-[var(--color-border)]">
                    <th className="p-5 text-[11px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">Deskripsi Item</th>
                    <th className="p-5 text-[11px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider text-right">Qty</th>
                    <th className="p-5 text-[11px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider text-right">Harga (IDR)</th>
                    <th className="p-5 text-[11px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                  {invoice.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[var(--color-bg-subtle)]/50 transition-colors duration-150">
                      <td className="p-5 text-sm font-bold text-[var(--color-text-primary)]">{item.name}</td>
                      <td className="p-5 text-sm font-medium text-[var(--color-text-secondary)] text-right">{item.qty}</td>
                      <td className="p-5 text-sm font-mono font-medium text-[var(--color-text-secondary)] text-right">{formatRupiah(item.price)}</td>
                      <td className="p-5 text-sm font-mono font-extrabold text-[var(--color-text-primary)] text-right">{formatRupiah(item.price * item.qty)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-5 sm:p-6 bg-[var(--color-bg-subtle)] flex flex-col items-end gap-3 border-t border-[var(--color-border)]">
              <div className="flex justify-between w-full sm:w-2/3 md:w-1/2 text-sm font-medium text-[var(--color-text-secondary)]">
                <span>Subtotal</span>
                <span className="font-mono font-bold text-[var(--color-text-primary)]">{formatRupiah(invoice.amount)}</span>
              </div>
              <div className="flex justify-between w-full sm:w-2/3 md:w-1/2 text-sm font-medium text-[var(--color-text-secondary)]">
                <span>Platform Fee (2%)</span>
                <span className="font-mono font-bold text-[var(--color-warning)]">Dibayar terpisah</span>
              </div>
              <div className="flex justify-between w-full sm:w-2/3 md:w-1/2 mt-3 pt-4 border-t border-[var(--color-border-strong)] items-center">
                <span className="font-extrabold text-[var(--color-text-primary)]">Total Tagihan</span>
                <span className="font-mono text-2xl font-extrabold text-[var(--color-primary)]">{formatRupiah(invoice.amount)}</span>
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
