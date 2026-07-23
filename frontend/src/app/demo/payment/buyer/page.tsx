'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DemoNavBar } from '@/components/payment/DemoNavBar';
import { getMockInvoice } from '@/lib/mock-data';
import { Button } from '@/components/ui/Button';
import { Globe, CreditCard, ShieldCheck, QrCode, Building2, CheckCircle2, ArrowRight, Clock, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export default function DemoPaymentBuyer() {
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'bank' | null>('qris');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [timeLeft, setTimeLeft] = useState(899); // 14:59 seconds
  
  // Timer countdown simulation
  useEffect(() => {
    if (isPaid || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [isPaid, timeLeft]);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Ambil data invoice
  const invoice = getMockInvoice('INV-DEMO-001');
  if (!invoice) return null;

  const finalPriceIdr = invoice.finalPrice || 68000000;
  const platformFeeIdr = finalPriceIdr * 0.02; // 2% fee
  const totalIdr = finalPriceIdr + platformFeeIdr;
  
  // Konversi dummy (Rate: 1 USD = 16.000 IDR, 1 CNY = 2.222 IDR)
  const rateUsd = invoice.exchangeRate || 16000;
  const rateCny = 2222;
  const totalUsd = totalIdr / rateUsd;
  const totalCny = totalIdr / rateCny;

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

  const formatCny = (amount: number) => {
    return `¥ ${new Intl.NumberFormat('zh-CN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)}`;
  };

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-base)] flex flex-col font-body">
      <DemoNavBar />
      
      <main className="flex-1 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-200 shadow-2xs">
                <Globe className="w-4 h-4 text-amber-600" />
                Sisi Buyer (Beijing Trading — China 🇨🇳)
              </div>
              <h1 className="text-3xl font-display font-extrabold text-[var(--color-text-primary)]">
                Tagihan Final Cross-Border
              </h1>
              <p className="text-sm text-[var(--color-text-secondary)] font-medium mt-2">
                Bayar aman dengan mata uang lokal (CNY/USD/IDR) melalui QRIS Antarnegara & Escrow.
              </p>
            </div>
            
            {isPaid && (
              <Link href="/demo/payment/escrow">
                <Button variant="primary" className="shadow-lg shadow-[var(--color-primary)]/20 animate-slide-up bg-emerald-600 hover:bg-emerald-700 font-bold" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Pantau Status Escrow & Pencairan
                </Button>
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left: Invoice Breakdown */}
            <div className="bg-white rounded-3xl border border-[var(--color-border)] shadow-sm overflow-hidden flex flex-col animate-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="p-6 border-b border-[var(--color-border)] bg-[var(--color-bg-subtle)] flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-1">Penjual (UMKM)</p>
                  <p className="font-bold text-sm text-[var(--color-text-primary)] flex items-center gap-2">
                    Kopi Nusantara Abadi
                    <img src="https://flagcdn.com/id.svg" className="w-4 h-3 rounded-xs shadow-2xs" alt="ID" />
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-1">Pembeli (Importir)</p>
                  <p className="font-bold text-sm text-[var(--color-text-primary)] flex items-center gap-2 justify-end">
                    Beijing Trading (Ye Lin)
                    <img src="https://flagcdn.com/cn.svg" className="w-4 h-3 rounded-xs shadow-2xs" alt="CN" />
                  </p>
                </div>
              </div>

              <div className="p-6 flex-1 space-y-6">
                <div className="flex gap-4">
                  <img src={invoice.productImage} alt="Product" className="w-20 h-20 rounded-2xl object-cover border border-[var(--color-border)] shadow-xs" />
                  <div>
                    <h4 className="font-bold text-[var(--color-text-primary)] leading-snug">{invoice.items[0].name}</h4>
                    <p className="text-xs font-medium text-[var(--color-text-secondary)] mt-1">Kuantitas: <strong className="text-[var(--color-text-primary)]">500 kg (Grade 1 Green Beans)</strong></p>
                    <p className="text-xs font-medium text-[var(--color-text-secondary)]">Sertifikasi: Organik, CoO, GrainPro Bag</p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-[var(--color-border-strong)]">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-text-secondary)] font-medium">Nilai Barang (500kg x Rp 136rb)</span>
                    <span className="font-mono font-bold text-[var(--color-text-primary)]">{formatRupiah(finalPriceIdr)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-text-secondary)] font-medium flex items-center gap-1.5">
                      Biaya Layanan Platform (2%)
                    </span>
                    <span className="font-mono font-bold text-[var(--color-text-primary)]">{formatRupiah(platformFeeIdr)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 via-teal-50/60 to-emerald-100/50 p-6 border-t border-emerald-200">
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800 block mb-1">Total Tagihan Cross-Border</span>
                    <span className="text-2xl font-black font-mono tracking-tight text-[var(--color-primary)]">{formatCny(totalCny)}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold font-mono text-emerald-950">{formatUsd(totalUsd)}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-[11px] font-medium text-emerald-800/90 pt-2.5 border-t border-emerald-200/80 font-mono">
                  <span>Setara dengan {formatRupiah(totalIdr)}</span>
                  <span className="text-emerald-700 font-extrabold flex items-center gap-1 bg-white/70 px-2 py-0.5 rounded-full border border-emerald-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Escrow Protected
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Payment Method & Action */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[var(--color-border)] shadow-sm animate-slide-up" style={{ animationDelay: '200ms' }}>
              
              {isPaid ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-5 animate-fade-in py-6">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center shadow-inner ring-8 ring-emerald-50">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-extrabold text-[var(--color-text-primary)]">Pembayaran QRIS Berhasil!</h3>
                    <p className="text-xs text-emerald-700 font-bold uppercase tracking-wider mt-1">Payment ID: TX-2026-8891-CN</p>
                  </div>
                  <p className="text-sm font-medium text-[var(--color-text-secondary)] max-w-sm leading-relaxed">
                    Dana sebesar <strong className="text-[var(--color-text-primary)]">{formatCny(totalCny)}</strong> ({formatUsd(totalUsd)}) telah dikonfirmasi dan ditahan dengan aman di **Escrow Vault NusaTrade Connect**.
                  </p>
                  
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-start gap-3 text-left w-full">
                    <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <p className="text-xs font-medium text-blue-900 leading-relaxed">
                      <strong>Garansi Keamanan Buyer:</strong> Dana Anda tidak akan ditransfer ke UMKM hingga barang sampai di pelabuhan dan Anda mengonfirmasi penerimaan.
                    </p>
                  </div>

                  <Link href="/demo/payment/escrow" className="w-full">
                    <Button variant="primary" className="w-full h-12 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 shadow-md">
                      Lanjut Pantau Status Escrow →
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg text-[var(--color-text-primary)]">Metode Pembayaran Cross-Border</h3>
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{formatTimer(timeLeft)}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {/* Method 1: QRIS */}
                    <button 
                      onClick={() => setPaymentMethod('qris')}
                      className={cn(
                        "w-full flex items-start gap-4 p-4 rounded-2xl border-2 text-left transition-all cursor-pointer",
                        paymentMethod === 'qris' ? "border-[var(--color-primary)] bg-[var(--color-primary-subtle)] shadow-xs" : "border-[var(--color-border)] bg-white hover:border-[var(--color-primary)]/50"
                      )}
                    >
                      <div className="w-10 h-10 rounded-xl bg-white border border-[var(--color-border)] flex items-center justify-center shrink-0 shadow-2xs">
                        <QrCode className={cn("w-5 h-5", paymentMethod === 'qris' ? "text-[var(--color-primary)]" : "text-slate-400")} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-[var(--color-text-primary)] text-sm">QRIS Cross-Border (🇮🇩 ⇄ 🇨🇳)</h4>
                          <span className="text-[9px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Rekomendasi</span>
                        </div>
                        <p className="text-xs font-medium text-[var(--color-text-secondary)] leading-relaxed">
                          Scan langsung memakai WeChat Pay, Alipay, UnionPay, atau e-Wallet terhubung. Kurs konversi otomatis real-time.
                        </p>
                      </div>
                    </button>

                    {/* Method 2: Bank Transfer */}
                    <button 
                      onClick={() => setPaymentMethod('bank')}
                      className={cn(
                        "w-full flex items-start gap-4 p-4 rounded-2xl border-2 text-left transition-all cursor-pointer",
                        paymentMethod === 'bank' ? "border-[var(--color-primary)] bg-[var(--color-primary-subtle)] shadow-xs" : "border-[var(--color-border)] bg-white hover:border-[var(--color-primary)]/50"
                      )}
                    >
                      <div className="w-10 h-10 rounded-xl bg-white border border-[var(--color-border)] flex items-center justify-center shrink-0 shadow-2xs">
                        <Building2 className={cn("w-5 h-5", paymentMethod === 'bank' ? "text-[var(--color-primary)]" : "text-slate-400")} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-[var(--color-text-primary)] text-sm mb-1">Transfer Bank SWIFT (CNY / USD)</h4>
                        <p className="text-xs font-medium text-[var(--color-text-secondary)] leading-relaxed">
                          Transfer Bank Internasional ke Virtual Account Escrow (Bank of China, ICBC, Citibank).
                        </p>
                      </div>
                    </button>
                  </div>

                  {paymentMethod === 'qris' && (
                    <div className="flex flex-col items-center animate-fade-in bg-[var(--color-bg-subtle)] p-5 rounded-2xl border border-[var(--color-border)]">
                      <div className="flex items-center gap-2 mb-3 text-xs font-bold text-[var(--color-text-secondary)]">
                        <img src="https://flagcdn.com/id.svg" className="w-4 h-3 rounded-2xs" alt="ID" />
                        <span>QRIS Cross-Border Indonesia ⇄ China</span>
                        <img src="https://flagcdn.com/cn.svg" className="w-4 h-3 rounded-2xs" alt="CN" />
                      </div>

                      {/* Real QR Code Graphic */}
                      <div className="bg-white p-3.5 rounded-2xl border border-[var(--color-border)] shadow-md mb-4 flex flex-col items-center justify-center">
                        <img 
                          src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=00020101021226680016ID.CO.NUSATRADE01189360091430000000005204581253033605802ID5920KopiNusantaraAbadi6008BEIJING6304A1B2" 
                          alt="QRIS Cross-Border" 
                          className="w-44 h-44 object-contain rounded-xl shadow-2xs" 
                        />
                        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
                          <span className="text-[10px] font-mono font-black text-emerald-800 tracking-widest uppercase">NusaTrade QRIS Interoperable</span>
                        </div>
                      </div>
                      
                      <Button 
                        variant="primary" 
                        size="lg" 
                        disabled={isProcessing}
                        className="w-full h-13 rounded-xl text-sm font-bold shadow-lg shadow-[var(--color-primary)]/20 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]"
                        leftIcon={isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <CreditCard className="w-5 h-5" />}
                        onClick={handleSimulatePayment}
                      >
                        {isProcessing ? 'Memproses Pembayaran Cross-Border...' : 'Simulasi Scan & Bayar via QRIS'}
                      </Button>
                    </div>
                  )}

                  {paymentMethod === 'bank' && (
                    <div className="animate-fade-in space-y-4">
                      <div className="space-y-2.5">
                        <p className="text-xs font-bold text-[var(--color-text-secondary)]">Pilih Bank Penerima Escrow:</p>
                        
                        {[
                          { id: 'boc', name: 'Bank of China (中国银行)', swift: 'BKCHCNBJ', va: '6217 0000 8891 2026', flag: 'https://flagcdn.com/cn.svg', currency: 'CNY (¥)' },
                          { id: 'icbc', name: 'ICBC Industrial Bank (中国工商银行)', swift: 'ICBCCNBJ', va: '6222 0802 9912 4011', flag: 'https://flagcdn.com/cn.svg', currency: 'CNY (¥)' },
                          { id: 'citi', name: 'Citibank N.A. (Singapore Branch)', swift: 'CITISGSG', va: '8812 0000 1234 5678', flag: 'https://flagcdn.com/sg.svg', currency: 'USD ($)' },
                        ].map((b, idx) => (
                          <div key={b.id} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-500 transition-colors">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-xs text-slate-900 flex items-center gap-2">
                                <img src={b.flag} className="w-4 h-3 rounded-xs shadow-2xs" alt="flag" />
                                {b.name}
                              </span>
                              <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">{b.currency}</span>
                            </div>
                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200 text-xs">
                              <span className="text-slate-500 font-mono text-[11px]">SWIFT: <strong>{b.swift}</strong></span>
                              <span className="font-mono font-bold text-[var(--color-primary)] text-sm">{b.va}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Button 
                        variant="primary" 
                        size="lg" 
                        disabled={isProcessing}
                        className="w-full h-13 rounded-xl text-sm font-bold shadow-lg shadow-[var(--color-primary)]/20 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]"
                        leftIcon={isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : undefined}
                        onClick={handleSimulatePayment}
                      >
                        {isProcessing ? 'Memproses Verifikasi Transfer...' : 'Simulasi Transfer Bank Berhasil'}
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
