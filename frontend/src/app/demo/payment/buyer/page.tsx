'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DemoNavBar } from '@/components/payment/DemoNavBar';
import { getMockInvoice } from '@/lib/mock-data';
import { Button } from '@/components/ui/Button';
import { Globe, CreditCard, ShieldCheck, QrCode, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export default function DemoPaymentBuyer() {
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'bank' | null>('qris');
  const [isPaid, setIsPaid] = useState(false);
  
  // Ambil data invoice
  const invoice = getMockInvoice('INV-DEMO-001');
  if (!invoice) return null;

  // Asumsikan UMKM menset finalPrice ke 15.000.000 (dari page sebelumnya)
  const finalPriceIdr = invoice.finalPrice || 15000000;
  const platformFeeIdr = finalPriceIdr * 0.02; // 2% fee
  const totalIdr = finalPriceIdr + platformFeeIdr;
  
  // Konversi dummy (Rate: 1 USD = 15.000 IDR)
  const rate = invoice.exchangeRate || 15000;
  const totalUsd = totalIdr / rate;

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const formatUsd = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const handleSimulatePayment = () => {
    setIsPaid(true);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-base)] flex flex-col">
      <DemoNavBar />
      
      <main className="flex-1 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-200">
                <Globe className="w-4 h-4" />
                Sisi Buyer (Global Imports LLC)
              </div>
              <h1 className="text-3xl font-display font-extrabold text-[var(--color-text-primary)]">
                Tagihan Final
              </h1>
              <p className="text-sm text-[var(--color-text-secondary)] font-medium mt-2">
                Pilih metode pembayaran dengan mata uang lokal Anda. Dana akan ditahan aman di Escrow.
              </p>
            </div>
            
            {isPaid && (
              <Link href="/demo/payment/escrow">
                <Button variant="primary" className="shadow-lg shadow-[var(--color-primary)]/20 animate-slide-up" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Pantau Status Escrow
                </Button>
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left: Invoice Breakdown */}
            <div className="bg-white rounded-3xl border border-[var(--color-border)] shadow-sm overflow-hidden flex flex-col animate-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="p-6 border-b border-[var(--color-border)] bg-[var(--color-bg-subtle)] flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[var(--color-text-secondary)] mb-1">Dari</p>
                  <p className="font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                    Kopi Nusantara Abadi
                    <img src="https://flagcdn.com/id.svg" className="w-4" alt="ID" />
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-[var(--color-text-secondary)] mb-1">Kepada</p>
                  <p className="font-bold text-[var(--color-text-primary)] flex items-center gap-2 justify-end">
                    Global Imports LLC
                    <img src="https://flagcdn.com/gb.svg" className="w-4" alt="UK" />
                  </p>
                </div>
              </div>

              <div className="p-6 flex-1 space-y-6">
                <div className="flex gap-4">
                  <img src={invoice.productImage} alt="Product" className="w-16 h-16 rounded-xl object-cover border border-[var(--color-border)]" />
                  <div>
                    <h4 className="font-bold text-[var(--color-text-primary)] leading-tight">{invoice.items[0].name}</h4>
                    <p className="text-xs font-medium text-[var(--color-text-secondary)] mt-1">Qty: {invoice.items[0].qty} kg</p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-[var(--color-border-strong)]">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-text-secondary)] font-medium">Subtotal Barang</span>
                    <span className="font-mono font-bold text-[var(--color-text-primary)]">{formatRupiah(finalPriceIdr)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-text-secondary)] font-medium flex items-center gap-1.5">
                      Platform Fee (2%)
                    </span>
                    <span className="font-mono font-bold text-[var(--color-text-primary)]">{formatRupiah(platformFeeIdr)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--color-bg-subtle)] p-6 border-t border-[var(--color-border)]">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-extrabold text-[var(--color-text-primary)] uppercase tracking-wider">Total Tagihan</span>
                  <span className="text-2xl font-black font-mono text-[var(--color-primary)] tracking-tight">{formatUsd(totalUsd)}</span>
                </div>
                <div className="flex justify-end text-xs font-medium text-[var(--color-text-muted)] font-mono">
                  Setara dengan {formatRupiah(totalIdr)} (Rate: 1 USD = Rp 15.000)
                </div>
              </div>
            </div>

            {/* Right: Payment Method & Action */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[var(--color-border)] shadow-sm animate-slide-up" style={{ animationDelay: '200ms' }}>
              
              {isPaid ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-display font-extrabold text-[var(--color-text-primary)]">Pembayaran Berhasil</h3>
                  <p className="text-sm font-medium text-[var(--color-text-secondary)] max-w-xs">
                    Dana sebesar {formatUsd(totalUsd)} telah kami terima dan ditahan aman dalam sistem Escrow.
                  </p>
                  
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3 text-left">
                    <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <p className="text-xs font-medium text-blue-800 leading-relaxed">
                      Langkah selanjutnya: Tunggu pesanan dikirimkan. Dana Anda baru akan diteruskan ke penjual setelah Anda mengonfirmasi penerimaan barang.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="font-bold text-lg text-[var(--color-text-primary)] mb-4">Pilih Metode Pembayaran</h3>
                  
                  <div className="space-y-3 mb-8">
                    {/* Method 1: QRIS */}
                    <button 
                      onClick={() => setPaymentMethod('qris')}
                      className={cn(
                        "w-full flex items-start gap-4 p-4 rounded-2xl border-2 text-left transition-all",
                        paymentMethod === 'qris' ? "border-[var(--color-primary)] bg-[var(--color-primary-subtle)]" : "border-[var(--color-border)] bg-white hover:border-[var(--color-primary)]/50"
                      )}
                    >
                      <div className="w-10 h-10 rounded-xl bg-white border border-[var(--color-border)] flex items-center justify-center shrink-0">
                        <QrCode className={cn("w-5 h-5", paymentMethod === 'qris' ? "text-[var(--color-primary)]" : "text-slate-400")} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-[var(--color-text-primary)]">QRIS Cross-Border</h4>
                          <span className="text-[9px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Recommended</span>
                        </div>
                        <p className="text-xs font-medium text-[var(--color-text-secondary)] leading-relaxed">
                          Scan dengan aplikasi DuitNow, PayNow, Alipay, atau bank digital yang mendukung QRIS. Rate otomatis konversi.
                        </p>
                      </div>
                    </button>

                    {/* Method 2: Bank Transfer */}
                    <button 
                      onClick={() => setPaymentMethod('bank')}
                      className={cn(
                        "w-full flex items-start gap-4 p-4 rounded-2xl border-2 text-left transition-all",
                        paymentMethod === 'bank' ? "border-[var(--color-primary)] bg-[var(--color-primary-subtle)]" : "border-[var(--color-border)] bg-white hover:border-[var(--color-primary)]/50"
                      )}
                    >
                      <div className="w-10 h-10 rounded-xl bg-white border border-[var(--color-border)] flex items-center justify-center shrink-0">
                        <Building2 className={cn("w-5 h-5", paymentMethod === 'bank' ? "text-[var(--color-primary)]" : "text-slate-400")} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-[var(--color-text-primary)] mb-1">Bank Transfer (SWIFT)</h4>
                        <p className="text-xs font-medium text-[var(--color-text-secondary)] leading-relaxed">
                          Transfer langsung ke Virtual Account USD NusaTrade Connect. Proses 1-2 hari kerja.
                        </p>
                      </div>
                    </button>
                  </div>

                  {paymentMethod === 'qris' && (
                    <div className="flex flex-col items-center animate-fade-in">
                      <div className="w-48 h-48 bg-white p-3 rounded-2xl border border-[var(--color-border)] shadow-sm mb-4 relative overflow-hidden group">
                        <div className="w-full h-full border-4 border-slate-900 flex flex-col justify-between p-2 opacity-90 transition-opacity group-hover:opacity-100">
                          <div className="flex justify-between">
                            <div className="w-8 h-8 bg-slate-900 border-2 border-white"></div>
                            <div className="w-8 h-8 bg-slate-900 border-2 border-white"></div>
                          </div>
                          <div className="text-center font-mono text-[9px] font-bold text-[var(--color-primary)]">
                            SCAN TO PAY
                          </div>
                          <div className="flex justify-between items-end">
                            <div className="w-8 h-8 bg-slate-900 border-2 border-white"></div>
                            <div className="w-6 h-6 bg-slate-900"></div>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        variant="primary" 
                        size="lg" 
                        className="w-full h-14 rounded-xl text-sm font-bold shadow-lg shadow-[var(--color-primary)]/20"
                        leftIcon={<CreditCard className="w-5 h-5" />}
                        onClick={handleSimulatePayment}
                      >
                        Simulasi Scan & Bayar Berhasil
                      </Button>
                    </div>
                  )}

                  {paymentMethod === 'bank' && (
                    <div className="animate-fade-in space-y-4">
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Bank Beneficiary</p>
                        <p className="font-bold text-slate-800 mb-3">Citibank N.A. (Singapore Branch)</p>
                        
                        <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">SWIFT Code</p>
                        <p className="font-mono font-bold text-slate-800 mb-3">CITISGSG</p>

                        <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Virtual Account (USD)</p>
                        <div className="flex items-center justify-between bg-white p-2 border border-slate-200 rounded-lg">
                          <span className="font-mono font-bold text-lg text-[var(--color-primary)] tracking-widest">8812 0000 1234 5678</span>
                        </div>
                      </div>

                      <Button 
                        variant="primary" 
                        size="lg" 
                        className="w-full h-14 rounded-xl text-sm font-bold shadow-lg shadow-[var(--color-primary)]/20"
                        onClick={handleSimulatePayment}
                      >
                        Simulasi Transfer Berhasil
                      </Button>
                    </div>
                  )}
                </>
              )}

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
