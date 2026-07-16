'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Tabs } from '@/components/ui/Tabs';
import { MOCK_INVOICES } from '@/lib/mock-data';
import { InvoiceCard } from '@/components/payment/InvoiceCard';
import { Receipt, AlertCircle } from 'lucide-react';

export default function PembayaranPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const tabs = [
    { id: 'all', label: 'Semua Transaksi' },
    { id: 'PENDING', label: 'Belum Dibayar' },
    { id: 'PAID', label: 'Sudah Dibayar' },
    { id: 'COMPLETED', label: 'Selesai' },
  ];

  const filteredInvoices = useMemo(() => {
    if (activeTab === 'all') return MOCK_INVOICES;
    return MOCK_INVOICES.filter(inv => inv.status === activeTab);
  }, [activeTab]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto min-h-full">
      
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-[var(--color-text-primary)]">
          Daftar Pembayaran
        </h1>
        <p className="text-[var(--color-text-secondary)] mt-1">
          Pantau status invoice, pembayaran, dan pencairan dana Anda.
        </p>
      </div>

      <div className="mb-6">
        <Tabs 
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-white border border-[var(--color-border)] rounded-xl animate-pulse"></div>
          ))}
        </div>
      ) : filteredInvoices.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-[var(--color-border)] rounded-2xl bg-[var(--color-bg-subtle)] mt-8 animate-in fade-in duration-500">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm border border-[var(--color-border)]">
            <Receipt className="w-8 h-8 text-[var(--color-text-muted)]" />
          </div>
          <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">
            Belum Ada Transaksi
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] max-w-sm">
            {activeTab === 'all' 
              ? 'Anda belum memiliki transaksi atau invoice yang diterbitkan.' 
              : `Tidak ada transaksi dengan status ${tabs.find(t => t.id === activeTab)?.label.toLowerCase()}.`}
          </p>
        </div>
      ) : (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {filteredInvoices.map(invoice => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </div>
      )}

      {/* Info Banner */}
      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
        <div className="text-sm text-blue-800">
          <p className="font-semibold mb-1">Pencairan Dana Ekspor</p>
          <p>
            Dana dari invoice berstatus PAID akan ditahan di rekening bersama (Escrow) NusaTrade Connect. Dana otomatis cair setelah status pesanan COMPLETED (dokumen PEB & pengiriman divalidasi).
          </p>
        </div>
      </div>

    </div>
  );
}
