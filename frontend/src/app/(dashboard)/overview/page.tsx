'use client';

import React from 'react';
import Link from 'next/link';
import { 
  MOCK_SELLER_PROFILE, 
  MOCK_STATS, 
  MOCK_CONVERSATIONS, 
  MOCK_INVOICES 
} from '@/lib/mock-data';
import { NIBReminderBanner } from '@/components/dashboard/NIBReminderBanner';
import { StatCard } from '@/components/dashboard/StatCard';
import { ConversationListItem } from '@/components/chat/ConversationListItem';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Package, MessageCircle, ArrowRight, Eye, Activity, Box, LayoutDashboard } from 'lucide-react';

export default function OverviewPage() {
  
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

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      
      {!MOCK_SELLER_PROFILE.nibVerified && (
        <NIBReminderBanner />
      )}

      {/* Welcome Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-[var(--color-text-primary)]">
            Selamat datang, {MOCK_SELLER_PROFILE.businessName}!
          </h1>
          <p className="text-[var(--color-text-secondary)] mt-1">
            Inilah ringkasan aktivitas ekspor Anda hari ini.
          </p>
        </div>
        
        <div className="flex gap-2">
          <Link href="/toko/produk/baru">
            <Button variant="secondary" leftIcon={<Box className="w-4 h-4" />}>
              Tambah Produk
            </Button>
          </Link>
          <Link href="/chat">
            <Button variant="primary" className="emerald-gradient" leftIcon={<MessageCircle className="w-4 h-4" />}>
              Lihat Pesan
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Transaksi" 
          value={MOCK_STATS.totalTransaksi.toString()} 
          icon={Package} 
          trend="up"
          trendValue="12%" 
        />
        <StatCard 
          title="Nilai Transaksi" 
          value={formatRupiah(MOCK_STATS.nilaiTransaksi)} 
          icon={Activity} 
          trend="up"
          trendValue="8.5%" 
          variant="gold"
        />
        <StatCard 
          title="Produk Aktif" 
          value={MOCK_STATS.produkAktif.toString()} 
          icon={Box} 
          trend="neutral"
          trendValue="0%" 
        />
        <StatCard 
          title="Pesan Baru" 
          value={MOCK_STATS.chatAktif.toString()} 
          icon={MessageCircle} 
          trend="up"
          trendValue="25%" 
          variant="emerald"
        />
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Conversations & Performance) */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Recent Conversations */}
          <div className="bg-white border border-[var(--color-border)] rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between">
              <h3 className="font-bold text-[var(--color-text-primary)]">Pesan Terbaru</h3>
              <Link href="/chat" className="text-xs font-semibold text-[#006B52] hover:underline">
                Lihat Semua
              </Link>
            </div>
            <div className="p-2 flex-1">
              {MOCK_CONVERSATIONS.slice(0, 3).map((conv) => (
                <Link href={`/chat/${conv.id}`} key={conv.id} className="block">
                  <ConversationListItem conversation={conv} />
                </Link>
              ))}
            </div>
          </div>

          {/* Performance Mini-widget */}
          <div className="bg-[var(--color-primary-subtle)] border border-[#006B52]/20 rounded-xl p-5 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Activity className="w-24 h-24 text-[#006B52]" />
            </div>
            <h3 className="font-bold text-[var(--color-text-primary)] mb-4 relative z-10">Performa Toko</h3>
            
            <div className="space-y-4 relative z-10">
              <div>
                <div className="flex justify-between text-xs text-[var(--color-text-secondary)] mb-1">
                  <span>Kunjungan Profil</span>
                  <span className="font-semibold text-[var(--color-text-primary)] flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-[#006B52]" /> 1,247
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/50 rounded-full overflow-hidden">
                  <div className="h-full bg-[#006B52] rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs text-[var(--color-text-secondary)] mb-1">
                  <span>Inquiry Rate (Pesan/Kunjungan)</span>
                  <span className="font-semibold text-[#C8941A]">8.3%</span>
                </div>
                <div className="w-full h-1.5 bg-white/50 rounded-full overflow-hidden">
                  <div className="h-full bg-[#C8941A] rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (Recent Payments/Invoices) */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-[var(--color-border)] rounded-xl shadow-sm flex flex-col h-full">
            <div className="p-5 border-b border-[var(--color-border)] flex items-center justify-between">
              <div>
                <h3 className="font-bold text-[var(--color-text-primary)]">Transaksi Terakhir</h3>
                <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">Pantau status pembayaran invoice Anda.</p>
              </div>
              <Link href="/pembayaran">
                <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Semua
                </Button>
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border)]">
                    <th className="p-4 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Invoice ID</th>
                    <th className="p-4 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Pembeli</th>
                    <th className="p-4 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Total (IDR)</th>
                    <th className="p-4 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                  {MOCK_INVOICES.slice(0, 4).map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-[var(--color-bg-subtle)]/50 transition-colors">
                      <td className="p-4">
                        <Link href={`/pembayaran/${invoice.id}`} className="font-mono text-sm text-[#006B52] font-semibold hover:underline">
                          {invoice.id}
                        </Link>
                      </td>
                      <td className="p-4 text-sm font-medium text-[var(--color-text-primary)]">
                        {invoice.buyerName}
                      </td>
                      <td className="p-4 font-mono text-sm text-[var(--color-text-primary)]">
                        {formatRupiah(invoice.amount)}
                      </td>
                      <td className="p-4 text-right">
                        <Badge variant={getInvoiceBadgeVariant(invoice.status) as any}>
                          {invoice.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
