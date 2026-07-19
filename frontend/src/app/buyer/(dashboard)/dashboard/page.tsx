'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, MessageSquare, Receipt, ShieldCheck, ArrowUpRight, 
  Clock, CheckCircle2, QrCode, Globe, Sparkles, X, CreditCard, ChevronRight, Package 
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MOCK_UMKM, MOCK_INVOICES, MockInvoice } from '@/lib/mock-data';
import { useT } from '@/i18n/useT';

export default function BuyerDashboardOverview() {
  const t = useT();
  const [selectedInvoice, setSelectedInvoice] = useState<MockInvoice | null>(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleOpenQrModal = (inv: MockInvoice) => {
    setSelectedInvoice(inv);
    setPaymentSuccess(false);
    setIsQrModalOpen(true);
  };

  const handleSimulatePayment = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      if (selectedInvoice) {
        selectedInvoice.status = 'PAID';
      }
    }, 300);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[var(--color-primary)] via-[#005543] to-[#004033] p-6 sm:p-8 text-white overflow-hidden shadow-md">
        <div className="absolute inset-0 futuristic-bg opacity-20 mix-blend-overlay"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              {t('buyer_dashboard.verified') || 'Verified International B2B Buyer'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight">
              {t('buyer_dashboard.welcome') || 'Selamat Datang'}, Global Imports LLC
            </h2>
            <p className="text-emerald-100 text-sm font-medium leading-relaxed">
              {t('buyer_dashboard.welcome_desc') || 'Kelola negosiasi berbantuan AI, bayar tagihan via QRIS Antarnegara, dan pantau pengiriman produk kreatif Indonesia.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link href="/buyer/dashboard/chat">
              <Button variant="secondary" className="font-bold bg-white text-[var(--color-primary)] hover:bg-emerald-50 h-11 px-5 rounded-xl shadow-sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                {t('buyer_dashboard.open_chat') || 'Buka Chat Negosiasi'}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-white p-6 rounded-3xl border border-[var(--color-border)] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">{t('buyer_dashboard.active_negotiation') || 'Negosiasi Aktif'}</span>
            <div className="w-10 h-10 rounded-2xl bg-[var(--color-primary-subtle)] text-[var(--color-primary)] flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-display font-black text-[var(--color-text-primary)] font-mono">3</div>
          <div className="text-xs font-medium text-[var(--color-primary)] mt-2 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> AI Tone-Shift & Translation Aktif
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[var(--color-border)] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">{t('buyer_dashboard.total_invoice') || 'Total Tagihan'}</span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Receipt className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-display font-black text-[var(--color-text-primary)] font-mono">5</div>
          <div className="text-xs font-medium text-amber-600 mt-2 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> 1 Menunggu Pembayaran QRIS
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[var(--color-border)] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">{t('buyer_dashboard.estimated_deal') || 'Estimasi Deal'}</span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
          </div>
          <div className="text-xl font-display font-bold text-[var(--color-text-primary)] font-mono">$15,500 USD</div>
          <div className="text-xs font-medium text-[var(--color-text-muted)] mt-1 font-mono">
            {formatRupiah(232500000)}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[var(--color-border)] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">{t('buyer_dashboard.msme_partners') || 'Mitra UMKM'}</span>
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-display font-black text-[var(--color-text-primary)] font-mono">4</div>
          <div className="text-xs font-medium text-emerald-600 mt-2 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Terverifikasi NIB OSS
          </div>
        </div>

      </div>

      {/* Main Grid: Section Chat Recent & Section Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left 2 Cols: Active Negosiasi Chat */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-[var(--color-border)] rounded-3xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold font-display text-[var(--color-text-primary)] flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[var(--color-primary)]" />
                  {t('buyer_dashboard.popular_chat') || 'Negosiasi Chat Terpopuler (AI Translation)'}
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)] font-medium mt-0.5">
                  {t('buyer_dashboard.chat_desc') || 'Pesan bahasa Indonesia otomatis diterjemahkan ke Bahasa Inggris bisnis untuk Anda.'}
                </p>
              </div>

              <Link href="/buyer/dashboard/chat">
                <Button variant="ghost" className="text-xs font-bold text-[var(--color-primary)]">
                  {t('buyer_dashboard.view_all_chat') || 'Lihat Semua Chat'} <ChevronRight className="w-4 h-4 ml-1 inline" />
                </Button>
              </Link>
            </div>

            {/* Chat Items */}
            <div className="space-y-4">
              
              {/* Item 1 */}
              <div className="p-4 rounded-2xl bg-[var(--color-bg-subtle)] border border-[var(--color-border)] hover:border-[var(--color-primary-subtle)] transition-colors">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white text-[var(--color-primary)] font-bold flex items-center justify-center border border-[var(--color-border)] font-display">
                      K
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[var(--color-text-primary)] flex items-center gap-1.5">
                        Kopi Nusantara Abadi
                        <ShieldCheck className="w-4 h-4 text-[var(--color-primary)]" />
                      </h4>
                      <span className="text-[11px] text-[var(--color-text-muted)] font-medium">Kopi Luwak Premium Gayo</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-[var(--color-text-muted)]">10:30 AM</span>
                </div>

                {/* AI Message Preview */}
                <div className="bg-white rounded-xl p-3 border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--color-primary)]">
                    <Sparkles className="w-3 h-3 text-[var(--color-primary)]" /> AI Auto-Translated to English:
                  </div>
                  <p className="font-medium italic text-[var(--color-text-primary)]">
                    &quot;We can provide official certificate of origin and organic certification for 50kg trial shipment.&quot;
                  </p>
                  <div className="text-[10px] text-[var(--color-text-muted)] font-mono">
                    (Asli Bahasa Indonesia: &quot;Kami bisa menyediakan sertifikat asal barang dan sertifikat organik resmi untuk sampel 50kg.&quot;)
                  </div>
                </div>

                <div className="mt-3 flex justify-end">
                  <Link href="/buyer/dashboard/chat">
                    <Button variant="outline" className="h-8 text-xs font-bold rounded-lg px-3">
                      {t('buyer_dashboard.reply_chat') || 'Balas Negosiasi'}
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Item 2 */}
              <div className="p-4 rounded-2xl bg-[var(--color-bg-subtle)] border border-[var(--color-border)] hover:border-[var(--color-primary-subtle)] transition-colors">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white text-[var(--color-primary)] font-bold flex items-center justify-center border border-[var(--color-border)] font-display">
                      B
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[var(--color-text-primary)] flex items-center gap-1.5">
                        Bali Rattan Craft
                        <ShieldCheck className="w-4 h-4 text-[var(--color-primary)]" />
                      </h4>
                      <span className="text-[11px] text-[var(--color-text-muted)] font-medium">Set Kursi Rotan Minimalis</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-[var(--color-text-muted)]">Kemarin</span>
                </div>

                <div className="bg-white rounded-xl p-3 border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--color-primary)]">
                    <Sparkles className="w-3 h-3 text-[var(--color-primary)]" /> AI Auto-Translated to English:
                  </div>
                  <p className="font-medium italic text-[var(--color-text-primary)]">
                    &quot;Invoice INV-2026-0002 for 50 rattan sets has been paid. Shipping is being processed via PPJK.&quot;
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right 1 Col: Tagihan & Simulasi Bayar QRIS */}
        <div className="space-y-6">
          <div className="bg-white border border-[var(--color-border)] rounded-3xl p-6 shadow-xs">
            <h3 className="text-lg font-bold font-display text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-[var(--color-primary)]" />
              {t('buyer_dashboard.invoice_title') || 'Tagihan & QRIS Antarnegara'}
            </h3>

            <div className="space-y-4">
              {MOCK_INVOICES.slice(0, 3).map((inv) => (
                <div key={inv.id} className="p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-[var(--color-text-primary)]">{inv.id}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      inv.status === 'PAID' ? 'bg-emerald-100 text-emerald-700' :
                      inv.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {inv.status}
                    </span>
                  </div>

                  <div className="text-sm font-bold text-[var(--color-text-primary)]">
                    {formatRupiah(inv.amount)}
                  </div>

                  {inv.status === 'PENDING' ? (
                    <Button 
                      variant="primary" 
                      className="w-full h-9 text-xs font-bold rounded-xl justify-center"
                      leftIcon={<QrCode className="w-4 h-4" />}
                      onClick={() => handleOpenQrModal(inv)}
                    >
                      {t('buyer_dashboard.pay_qris') || 'Bayar via QRIS Antarnegara'}
                    </Button>
                  ) : (
                    <div className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {t('buyer_dashboard.paid') || 'Terkonfirmasi Lunas'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Modal QRIS Antarnegara */}
      {isQrModalOpen && selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[var(--color-border)] shadow-2xl animate-scale-up space-y-6 relative">
            
            <button 
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-[var(--color-text-muted)] hover:bg-[var(--color-bg-subtle)]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-primary-subtle)] text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider">
                <QrCode className="w-4 h-4" /> {t('buyer_dashboard.qris_badge') || 'QRIS Antarnegara BI'}
              </div>
              <h3 className="text-2xl font-display font-extrabold text-[var(--color-text-primary)]">
                {t('buyer_dashboard.payment_title') || 'Pembayaran Tagihan'}
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] font-medium">
                {t('buyer_dashboard.payment_desc') || 'Scan kode QRIS di bawah menggunakan aplikasi e-wallet / bank internasional Anda.'}
              </p>
            </div>

            {/* QR Code Container */}
            <div className="bg-slate-50 border border-[var(--color-border)] rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4">
              {paymentSuccess ? (
                <div className="py-8 flex flex-col items-center animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-lg font-bold text-emerald-700">{t('buyer_dashboard.payment_success') || 'Pembayaran Berhasil!'}</h4>
                  <p className="text-xs text-[var(--color-text-secondary)] font-medium mt-1">
                    {t('buyer_dashboard.payment_success_desc') || 'Status tagihan'} {selectedInvoice.id} {t('buyer_dashboard.payment_success_desc2') || 'otomatis diperbarui menjadi LUNAS.'}
                  </p>
                </div>
              ) : (
                <>
                  <div className="w-56 h-56 bg-white p-3 rounded-2xl border border-slate-200 shadow-md flex items-center justify-center">
                    {/* Simulated QR Code SVG */}
                    <div className="w-full h-full border-4 border-slate-900 p-2 flex flex-col justify-between">
                      <div className="flex justify-between">
                        <div className="w-10 h-10 bg-slate-900 border-2 border-white"></div>
                        <div className="w-10 h-10 bg-slate-900 border-2 border-white"></div>
                      </div>
                      <div className="text-center text-[10px] font-extrabold font-mono text-slate-900 uppercase">
                        QRIS CROSS-BORDER
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="w-10 h-10 bg-slate-900 border-2 border-white"></div>
                        <div className="w-8 h-8 bg-slate-900"></div>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-[var(--color-text-secondary)] font-medium">
                    Dukungan E-Wallet Antarnegara: <br />
                    <strong className="text-[var(--color-text-primary)]">DuitNow (MY) • PayNow (SG) • Alipay (CN) • GoPay (ID)</strong>
                  </div>
                </>
              )}
            </div>

            {/* Amount Breakdown */}
            <div className="bg-[var(--color-bg-subtle)] p-4 rounded-2xl space-y-2 text-xs font-semibold">
              <div className="flex justify-between text-[var(--color-text-secondary)]">
                <span>{t('buyer_dashboard.invoice_value') || 'Nilai Invoice'} ({selectedInvoice.id}):</span>
                <span className="font-mono text-[var(--color-text-primary)]">{formatRupiah(selectedInvoice.amount)}</span>
              </div>
              <div className="flex justify-between text-[var(--color-text-secondary)]">
                <span>{t('buyer_dashboard.platform_fee') || 'Platform Service Fee'} (1.5%):</span>
                <span className="font-mono text-[var(--color-primary)]">{t('buyer_dashboard.fee_separate') || 'Terpisah'}</span>
              </div>
              <div className="border-t border-[var(--color-border)] pt-2 flex justify-between text-sm font-bold text-[var(--color-text-primary)]">
                <span>{t('buyer_dashboard.total_pay') || 'Total Bayar'}:</span>
                <span className="font-mono text-[var(--color-primary)]">{formatRupiah(selectedInvoice.amount)}</span>
              </div>
            </div>

            {!paymentSuccess ? (
              <Button 
                variant="primary" 
                className="w-full h-12 text-sm font-bold rounded-xl justify-center shadow-lg shadow-[var(--color-primary)]/20"
                onClick={handleSimulatePayment}
              >
                {t('buyer_dashboard.simulate_payment') || 'Simulasi Pembayaran Selesai'}
              </Button>
            ) : (
              <Button 
                variant="outline" 
                className="w-full h-12 text-sm font-bold rounded-xl justify-center"
                onClick={() => setIsQrModalOpen(false)}
              >
                {t('buyer_dashboard.close_modal') || 'Tutup Modal'}
              </Button>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
