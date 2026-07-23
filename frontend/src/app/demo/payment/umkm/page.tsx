'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DemoNavBar } from '@/components/payment/DemoNavBar';
import { EscrowFlowDiagram } from '@/components/payment/EscrowFlowDiagram';
import { getMockInvoice } from '@/lib/mock-data';
import { Button } from '@/components/ui/Button';
import { Store, Send, FileEdit, CheckCircle2, Package, ArrowRight, ShieldCheck, MessageSquare, Ship, CreditCard, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export default function DemoPaymentUMKM() {
  const [isSent, setIsSent] = useState(false);
  const [price, setPrice] = useState(136000); // Harga per kg (500kg x 136rb = 68 Jt / $4,250 USD)
  
  const invoice = getMockInvoice('INV-DEMO-001');
  if (!invoice) return null;

  const qty = invoice.items[0].qty;
  const subtotal = price * qty;
  const platformFee = subtotal * 0.02; // 2%
  const total = subtotal; // Platform fee dibayar terpisah oleh buyer di simulasi ini, tapi umkm hanya lihat nilai transaksinya
  
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleSendInvoice = () => {
    setIsSent(true);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-base)] flex flex-col">
      <DemoNavBar />
      
      <main className="flex-1 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3">
                <Store className="w-4 h-4" />
                Sisi UMKM (Kopi Nusantara Abadi)
              </div>
              <h1 className="text-3xl font-display font-extrabold text-[var(--color-text-primary)]">
                Manajemen Pesanan
              </h1>
              <p className="text-sm text-[var(--color-text-secondary)] font-medium mt-2">
                Update harga final sesuai hasil negosiasi di chat sebelum mengirim tagihan ke buyer.
              </p>
            </div>
            
            {isSent && (
              <Link href="/demo/payment/buyer">
                <Button variant="primary" className="shadow-lg shadow-[var(--color-primary)]/20 animate-slide-up bg-emerald-600 hover:bg-emerald-700 font-bold" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Lihat Tampilan Buyer →
                </Button>
              </Link>
            )}
          </div>

          {/* Flow Diagram 5-Step Harmonized */}
          <div className="bg-white rounded-3xl p-6 border border-[var(--color-border)] shadow-sm animate-fade-in select-none">
            <div className="relative max-w-2xl mx-auto px-2 sm:px-6">
              
              {/* Background Track Line (From Col 1 center to Col 5 center) */}
              <div className="absolute top-[20px] sm:top-[24px] left-[10%] right-[10%] h-1.5 bg-slate-100 rounded-full z-0"></div>
              
              {/* Active Progress Line (50% for Step 3 center) */}
              <div 
                className="absolute top-[20px] sm:top-[24px] left-[10%] h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full z-0 transition-all duration-700 ease-out shadow-xs"
                style={{ width: '40%' }}
              ></div>

              {/* 5-Columns Grid (Badge + Label together) */}
              <div className="grid grid-cols-5 relative z-10">
                {[
                  { id: 1, label: 'Negosiasi', done: true },
                  { id: 2, label: 'Pilih PPJK', done: true },
                  { id: 3, label: 'Update Harga', active: true },
                  { id: 4, label: 'Pembayaran', pending: true },
                  { id: 5, label: 'Dana Cair', pending: true },
                ].map((step) => (
                  <div key={step.id} className="flex flex-col items-center text-center">
                    {/* Step Badge */}
                    <div className={cn(
                      "w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 relative border-2 mb-2 bg-white",
                      step.done ? "bg-emerald-600 border-emerald-600 text-white shadow-xs" :
                      step.active ? "bg-[var(--color-primary)] border-transparent text-white scale-110 shadow-lg shadow-[var(--color-primary)]/30 ring-4 ring-[var(--color-primary-light)]" :
                      "bg-white border-slate-200 text-slate-300 shadow-2xs"
                    )}>
                      {step.done ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : (
                        <span className={cn("font-bold text-xs sm:text-sm font-display", step.active ? "text-white" : "text-slate-400")}>
                          {step.id}
                        </span>
                      )}

                      {/* Active Indicator Pulse Dot */}
                      {step.active && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500 border-2 border-white"></span>
                        </span>
                      )}
                    </div>

                    {/* Step Label */}
                    <span 
                      className={cn(
                        "text-[11px] sm:text-xs font-bold leading-snug transition-colors max-w-[90px]",
                        step.active ? "text-[var(--color-primary)] font-extrabold" :
                        step.done ? "text-[var(--color-text-primary)] font-semibold" :
                        "text-[var(--color-text-muted)]"
                      )}
                    >
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Order Details & Update Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
            
            {/* Left: Order Info */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[var(--color-border)] shadow-sm space-y-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4 mb-5">
                  <h3 className="font-bold text-[var(--color-text-primary)]">Detail Pesanan & Ekspor</h3>
                  <span className="text-xs font-mono font-extrabold text-[var(--color-primary)] bg-[var(--color-primary-subtle)] px-2.5 py-1 rounded-full">{invoice.id}</span>
                </div>
                
                <div className="flex gap-4 mb-6">
                  <img src={invoice.productImage} alt="Product" className="w-20 h-20 rounded-2xl object-cover border border-[var(--color-border)] shadow-xs" />
                  <div>
                    <h4 className="font-bold text-[var(--color-text-primary)] text-lg leading-snug mb-1">{invoice.items[0].name}</h4>
                    <p className="text-xs font-medium text-[var(--color-text-secondary)] flex items-center gap-1.5">
                      Buyer: <strong className="text-[var(--color-text-primary)]">{invoice.buyerName}</strong>
                      <img src="https://flagcdn.com/cn.svg" className="w-3.5 h-2.5 rounded-2xs" alt="CN" />
                    </p>
                    <p className="text-xs font-medium text-[var(--color-text-secondary)] mt-0.5">PPJK: {invoice.ppjkName}</p>
                  </div>
                </div>

                {/* Export Spec Metrics Grid */}
                <div className="grid grid-cols-2 gap-2.5 mb-6">
                  <div className="bg-[var(--color-bg-subtle)] p-3 rounded-2xl border border-[var(--color-border)]">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Kuantitas</p>
                    <p className="text-xs font-extrabold text-[var(--color-text-primary)] mt-0.5">500 kg (Grade 1)</p>
                  </div>
                  <div className="bg-[var(--color-bg-subtle)] p-3 rounded-2xl border border-[var(--color-border)]">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Incoterm</p>
                    <p className="text-xs font-extrabold text-[var(--color-text-primary)] mt-0.5">FOB Belawan Port</p>
                  </div>
                  <div className="bg-[var(--color-bg-subtle)] p-3 rounded-2xl border border-[var(--color-border)]">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Tujuan Ekspor</p>
                    <p className="text-xs font-extrabold text-[var(--color-text-primary)] mt-0.5 flex items-center gap-1">
                      Beijing, China 🇨🇳
                    </p>
                  </div>
                  <div className="bg-[var(--color-bg-subtle)] p-3 rounded-2xl border border-[var(--color-border)]">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Dokumen</p>
                    <p className="text-xs font-extrabold text-[var(--color-text-primary)] mt-0.5">CoO + GrainPro</p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/80">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs font-medium text-emerald-950">
                    <strong className="text-emerald-900 block mb-0.5">Proteksi Escrow Aktif</strong>
                    Dana buyer ditahan aman oleh sistem NusaTrade dan otomatis dicairkan setelah buyer mengonfirmasi penerimaan barang.
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Update Form */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[var(--color-border)] shadow-sm flex flex-col relative overflow-hidden">
              
              {isSent && (
                <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center animate-fade-in p-6 text-center">
                  {/* Animated Checkmark */}
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20 ring-8 ring-emerald-50 animate-bounce">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  
                  <h3 className="text-2xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Tagihan Terkirim!</h3>
                  <p className="text-xs font-medium text-[var(--color-text-secondary)] max-w-xs mb-5">
                    Tagihan final senilai Rp 68.000.000 telah terhubung ke portal pembeli {invoice.buyerName}.
                  </p>

                  {/* Digital Invoice Snapshot Card */}
                  <div className="w-full max-w-xs bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-2 font-mono text-xs shadow-2xs mb-2">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                      <span className="text-[10px] font-bold uppercase text-slate-500">Invoice ID</span>
                      <span className="font-bold text-slate-800">INV-DEMO-001</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Total Tagihan</span>
                      <span className="font-bold text-emerald-700 text-sm">Rp 68.000.000</span>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-slate-500">Status Bayar</span>
                      <span className="font-bold bg-amber-100 text-amber-800 text-[9px] uppercase px-2 py-0.5 rounded-full">Menunggu QRIS</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 mb-6 text-[var(--color-primary)]">
                <FileEdit className="w-5 h-5" />
                <h3 className="font-bold text-lg text-[var(--color-text-primary)]">Update Harga Final</h3>
              </div>
              
              <div className="space-y-5 flex-1">
                <div>
                  <label className="block text-xs font-bold text-[var(--color-text-secondary)] mb-2">
                    Kuantitas (Sesuai Kesepakatan)
                  </label>
                  <div className="w-full bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-xl px-4 py-3 flex items-center justify-between">
                    <span className="font-bold text-[var(--color-text-primary)]">{qty} kg</span>
                    <Package className="w-4 h-4 text-[var(--color-text-muted)]" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--color-text-secondary)] mb-2">
                    Harga Satuan Final (IDR)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-[var(--color-text-muted)]">Rp</span>
                    <input 
                      type="number" 
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full bg-white border-2 border-[var(--color-border-strong)] rounded-xl px-12 py-3 font-mono font-bold text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:ring-0 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-[var(--color-bg-subtle)] p-5 rounded-2xl border border-[var(--color-border)]">
                <div className="flex justify-between text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  <span>Subtotal ({qty} kg)</span>
                  <span className="font-mono font-bold">{formatRupiah(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-[var(--color-text-secondary)] mb-4 pb-4 border-b border-[var(--color-border-strong)]">
                  <span>Platform Fee (2%)</span>
                  <span className="text-xs text-[var(--color-text-muted)]">Ditanggung Buyer</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-[var(--color-text-primary)]">Total Diterima UMKM</span>
                  <span className="font-mono text-xl font-black text-[var(--color-primary)] tracking-tight">{formatRupiah(total)}</span>
                </div>
              </div>

              <Button 
                variant="primary" 
                size="lg"
                className="w-full mt-6 h-14 rounded-xl text-sm font-bold shadow-lg shadow-[var(--color-primary)]/20"
                leftIcon={<Send className="w-5 h-5" />}
                onClick={handleSendInvoice}
              >
                Kirim Tagihan Final
              </Button>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
