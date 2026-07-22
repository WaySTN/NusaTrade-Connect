'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DemoNavBar } from '@/components/payment/DemoNavBar';
import { EscrowFlowDiagram } from '@/components/payment/EscrowFlowDiagram';
import { getMockInvoice } from '@/lib/mock-data';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, CheckCircle2, Lock, ArrowRight, Building2, User, Globe, AlertCircle, Package } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export default function DemoPaymentEscrow() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(2);
  const [viewRole, setViewRole] = useState<'buyer' | 'umkm'>('buyer');
  const [isConfirmed, setIsConfirmed] = useState(false);
  
  // Ambil data invoice
  const invoice = getMockInvoice('INV-DEMO-001');
  if (!invoice) return null;

  const finalPriceIdr = invoice.finalPrice || 15000000;
  const platformFeeIdr = finalPriceIdr * 0.02; // 2% fee

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleConfirmOrder = () => {
    setIsConfirmed(true);
    setCurrentStep(3);
    
    // Simulate flow to payout step after short delay
    setTimeout(() => {
      setCurrentStep(4);
      setViewRole('umkm'); // Otomatis pindah view ke UMKM untuk pamer fitur cair
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-base)] flex flex-col">
      <DemoNavBar />
      
      <main className="flex-1 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header & Role Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
            <div>
              <h1 className="text-3xl font-display font-extrabold text-[var(--color-text-primary)]">
                Proteksi Dana Escrow
              </h1>
              <p className="text-sm text-[var(--color-text-secondary)] font-medium mt-2">
                Simulasi penahanan dan pencairan dana demi keamanan kedua belah pihak.
              </p>
            </div>
            
            <div className="bg-white p-1 rounded-xl border border-[var(--color-border)] flex shadow-sm">
              <button
                onClick={() => setViewRole('buyer')}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2",
                  viewRole === 'buyer' ? "bg-[var(--color-primary)] text-white shadow-md" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)]"
                )}
              >
                <Globe className="w-4 h-4" /> View Buyer
              </button>
              <button
                onClick={() => setViewRole('umkm')}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2",
                  viewRole === 'umkm' ? "bg-indigo-600 text-white shadow-md" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)]"
                )}
              >
                <Store className="w-4 h-4" /> View UMKM
              </button>
            </div>
          </div>

          {/* Animated Flow Diagram */}
          <div className="bg-white rounded-3xl p-6 border border-[var(--color-border)] shadow-sm overflow-hidden animate-fade-in relative">
            {/* Confetti if completed */}
            {currentStep === 4 && (
              <div className="absolute inset-0 pointer-events-none opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
            )}
            
            <h3 className="text-center text-sm font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
              Status Dana Real-time
            </h3>
            <EscrowFlowDiagram currentStep={currentStep} animate={currentStep === 2} />
            
            <div className="text-center mt-4">
              <span className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                currentStep === 2 ? "bg-amber-100 text-amber-700" :
                currentStep === 3 ? "bg-emerald-100 text-emerald-700" :
                "bg-[var(--color-primary-subtle)] text-[var(--color-primary)]"
              )}>
                {currentStep === 2 && <><Lock className="w-4 h-4" /> Dana Ditahan Aman</>}
                {currentStep === 3 && <><CheckCircle2 className="w-4 h-4" /> Konfirmasi Diterima</>}
                {currentStep === 4 && <><Building2 className="w-4 h-4" /> Dana Telah Dicairkan</>}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
            
            {/* Action Panel based on Role */}
            {viewRole === 'buyer' ? (
              <div className={cn(
                "bg-white rounded-3xl p-6 sm:p-8 border border-[var(--color-border)] shadow-sm transition-all duration-500",
                isConfirmed ? "opacity-50 pointer-events-none grayscale" : ""
              )}>
                <h3 className="font-bold text-lg text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-[var(--color-primary)]" />
                  Konfirmasi Penerimaan Barang
                </h3>
                
                <p className="text-xs font-medium text-[var(--color-text-secondary)] mb-6">
                  Pastikan Anda telah menerima barang sesuai pesanan sebelum melakukan konfirmasi. Dana akan diteruskan ke penjual setelah konfirmasi ini.
                </p>

                <div className="space-y-3 mb-8">
                  <label className="flex items-start gap-3 p-3 rounded-xl border border-[var(--color-border-strong)] bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                    <input type="checkbox" className="mt-0.5 rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)] w-4 h-4 border-slate-300" defaultChecked />
                    <span className="text-xs font-medium text-[var(--color-text-primary)]">Kemasan dan kondisi produk dalam keadaan baik (tidak rusak).</span>
                  </label>
                  <label className="flex items-start gap-3 p-3 rounded-xl border border-[var(--color-border-strong)] bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                    <input type="checkbox" className="mt-0.5 rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)] w-4 h-4 border-slate-300" defaultChecked />
                    <span className="text-xs font-medium text-[var(--color-text-primary)]">Kuantitas sesuai pesanan ({invoice.items[0].qty} kg).</span>
                  </label>
                  <label className="flex items-start gap-3 p-3 rounded-xl border border-[var(--color-border-strong)] bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                    <input type="checkbox" className="mt-0.5 rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)] w-4 h-4 border-slate-300" defaultChecked />
                    <span className="text-xs font-medium text-[var(--color-text-primary)]">Dokumen pendukung ekspor lengkap.</span>
                  </label>
                </div>

                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-full h-14 rounded-xl text-sm font-bold shadow-lg shadow-[var(--color-primary)]/20"
                  leftIcon={<CheckCircle2 className="w-5 h-5" />}
                  onClick={handleConfirmOrder}
                  disabled={isConfirmed}
                >
                  Konfirmasi Pesanan Diterima
                </Button>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[var(--color-border)] shadow-sm relative overflow-hidden transition-all duration-500">
                {currentStep < 4 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-8">
                    <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mb-4">
                      <Lock className="w-10 h-10 text-amber-500" />
                    </div>
                    <h3 className="font-bold text-lg text-[var(--color-text-primary)] mb-2">Dana Sedang Ditahan</h3>
                    <p className="text-sm font-medium text-[var(--color-text-secondary)]">
                      Menunggu konfirmasi penerimaan dari pihak buyer (Global Imports LLC) di negara tujuan.
                    </p>
                  </div>
                ) : (
                  <div className="h-full flex flex-col animate-fade-in">
                    <h3 className="font-bold text-lg text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                      Pencairan Dana Berhasil
                    </h3>
                    
                    <div className="bg-[var(--color-bg-subtle)] p-5 rounded-2xl border border-[var(--color-border)] mb-6">
                      <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase mb-1">Total Cair ke Rekening UMKM</p>
                      <p className="font-mono text-3xl font-black text-emerald-600 tracking-tight">{formatRupiah(finalPriceIdr)}</p>
                      <p className="text-xs font-medium text-[var(--color-text-secondary)] mt-2">
                        Telah ditransfer ke rekening Bank Mandiri a.n. Budi Santoso (Kopi Nusantara Abadi)
                      </p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex gap-3 text-sm text-blue-800">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <p className="font-medium">Selamat! Transaksi ekspor Anda telah selesai sepenuhnya dengan aman.</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* General Info Panel */}
            <div className="bg-[var(--color-bg-subtle)] rounded-3xl p-6 sm:p-8 border border-[var(--color-border)] flex flex-col justify-center">
              <h4 className="font-bold text-[var(--color-text-primary)] mb-4">Ringkasan Transaksi Escrow</h4>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-[var(--color-border-strong)]">
                  <span className="text-sm font-medium text-[var(--color-text-secondary)]">ID Invoice</span>
                  <span className="font-mono font-bold text-[var(--color-text-primary)]">{invoice.id}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-[var(--color-border-strong)]">
                  <span className="text-sm font-medium text-[var(--color-text-secondary)]">Nilai Transaksi</span>
                  <span className="font-mono font-bold text-[var(--color-text-primary)]">{formatRupiah(finalPriceIdr)}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-[var(--color-border-strong)]">
                  <span className="text-sm font-medium text-[var(--color-text-secondary)]">Status</span>
                  <span className="font-bold text-[var(--color-primary)]">
                    {currentStep === 2 ? 'Menunggu Konfirmasi' : currentStep === 4 ? 'Selesai (Cair)' : 'Memproses...'}
                  </span>
                </div>
              </div>

              {currentStep === 4 && viewRole === 'umkm' && (
                <div className="mt-8 pt-6 border-t border-[var(--color-border-strong)] text-center animate-fade-in">
                  <Link href="/demo/payment">
                    <Button variant="outline" className="w-full">
                      Selesai & Kembali ke Awal
                    </Button>
                  </Link>
                </div>
              )}
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}

// Tambahan komponen icon Store jika diperlukan (kalau lucide-react tidak support di atas, tapi seharusnya lucide-react punya Store)
import { Store as StoreIcon } from 'lucide-react';
const Store = StoreIcon;
