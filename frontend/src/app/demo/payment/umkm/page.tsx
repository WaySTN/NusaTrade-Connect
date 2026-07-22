'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DemoNavBar } from '@/components/payment/DemoNavBar';
import { EscrowFlowDiagram } from '@/components/payment/EscrowFlowDiagram';
import { getMockInvoice } from '@/lib/mock-data';
import { Button } from '@/components/ui/Button';
import { Store, Send, FileEdit, CheckCircle2, Package, ArrowRight, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export default function DemoPaymentUMKM() {
  const [isSent, setIsSent] = useState(false);
  const [price, setPrice] = useState(150000); // Harga per kg
  
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
                <Button variant="primary" className="shadow-lg shadow-[var(--color-primary)]/20 animate-slide-up" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Lihat Tampilan Buyer
                </Button>
              </Link>
            )}
          </div>

          {/* Flow Diagram Mini */}
          <div className="bg-white rounded-3xl p-6 border border-[var(--color-border)] shadow-sm animate-fade-in">
             <div className="flex items-center justify-between relative max-w-2xl mx-auto px-4 sm:px-12 mb-2">
                <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>
                <div className="absolute top-1/2 left-10 h-0.5 bg-[var(--color-primary)] -translate-y-1/2 z-0 transition-all duration-1000" style={{ width: '40%' }}></div>
                
                {[
                  { label: 'Negosiasi', done: true },
                  { label: 'Pilih PPJK', done: true },
                  { label: 'Update Harga', active: true },
                  { label: 'Pembayaran', pending: true },
                  { label: 'Dana Cair', pending: true },
                ].map((s, i) => (
                  <div key={i} className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all",
                      s.done ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-white" :
                      s.active ? "bg-white border-[var(--color-primary)] text-[var(--color-primary)] scale-125 shadow-sm" :
                      "bg-white border-slate-200 text-slate-300"
                    )}>
                      {s.done ? <CheckCircle2 className="w-4 h-4" /> : (i + 1)}
                    </div>
                    <span className={cn(
                      "text-[9px] font-bold absolute -bottom-5 w-20 text-center",
                      s.active ? "text-[var(--color-primary)]" : s.done ? "text-[var(--color-text-secondary)]" : "text-slate-400"
                    )}>{s.label}</span>
                  </div>
                ))}
             </div>
          </div>

          {/* Order Details & Update Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
            
            {/* Left: Order Info */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[var(--color-border)] shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
                <h3 className="font-bold text-[var(--color-text-primary)]">Detail Pesanan</h3>
                <span className="text-xs font-mono font-bold text-[var(--color-text-muted)]">{invoice.id}</span>
              </div>
              
              <div className="flex gap-4">
                <img src={invoice.productImage} alt="Product" className="w-20 h-20 rounded-xl object-cover border border-[var(--color-border)]" />
                <div>
                  <h4 className="font-bold text-[var(--color-text-primary)] text-lg leading-tight mb-1">{invoice.items[0].name}</h4>
                  <p className="text-sm font-medium text-[var(--color-text-secondary)]">Buyer: <strong className="text-[var(--color-text-primary)]">{invoice.buyerName}</strong></p>
                  <p className="text-sm font-medium text-[var(--color-text-secondary)]">PPJK: {invoice.ppjkName}</p>
                </div>
              </div>

              <div className="bg-[var(--color-bg-subtle)] p-4 rounded-xl border border-[var(--color-border)]">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div className="text-xs font-medium text-[var(--color-text-secondary)]">
                    <strong className="text-[var(--color-text-primary)] block mb-1">Proteksi Escrow Aktif</strong>
                    Dana dari buyer akan ditahan dengan aman oleh sistem NusaTrade dan diteruskan kepada Anda setelah buyer mengonfirmasi penerimaan barang.
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Update Form */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[var(--color-border)] shadow-sm flex flex-col relative overflow-hidden">
              
              {isSent && (
                <div className="absolute inset-0 z-20 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in p-6 text-center">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-display font-extrabold text-[var(--color-text-primary)] mb-2">Tagihan Terkirim!</h3>
                  <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-8">
                    Tagihan final telah dikirim ke {invoice.buyerName}. Menunggu pembayaran buyer via QRIS Antarnegara.
                  </p>
                  <Link href="/demo/payment/buyer">
                    <Button variant="primary" size="lg" className="shadow-lg shadow-[var(--color-primary)]/20 rounded-xl" rightIcon={<ArrowRight className="w-5 h-5" />}>
                      Lanjutkan ke Tampilan Buyer
                    </Button>
                  </Link>
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
