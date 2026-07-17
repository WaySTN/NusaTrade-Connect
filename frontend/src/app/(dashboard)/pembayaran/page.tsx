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
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto min-h-full bg-[var(--color-bg-base)]">
      
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-[var(--color-text-primary)] tracking-tight">
          Daftar Pembayaran
        </h1>
        <p className="text-[var(--color-text-secondary)] font-medium mt-1.5">
          Pantau status invoice, pembayaran, dan pencairan dana Anda.
        </p>
      </div>

      <div className="mb-8">
        <Tabs 
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-white border border-[var(--color-border)] rounded-2xl shadow-sm animate-pulse"></div>
          ))}
        </div>
      ) : filteredInvoices.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-[var(--color-border-strong)] rounded-3xl bg-[var(--color-bg-subtle)] mt-8 animate-slide-up duration-300 var(--ease-out-quart)">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-5 shadow-sm border border-[var(--color-border)]">
            <Receipt className="w-10 h-10 text-[var(--color-text-muted)]" />
          </div>
          <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
            Belum Ada Transaksi
          </h3>
          <p className="text-sm font-medium text-[var(--color-text-secondary)] max-w-sm">
            {activeTab === 'all' 
              ? 'Anda belum memiliki transaksi atau invoice yang diterbitkan.' 
              : `Tidak ada transaksi dengan status ${tabs.find(t => t.id === activeTab)?.label.toLowerCase()}.`}
          </p>
        </div>
      ) : (
        <div className="space-y-5 animate-slide-up duration-300 var(--ease-out-quart)">
          {filteredInvoices.map(invoice => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </div>
      )}

      {/* Info Banner */}
      <div className="mt-10 bg-blue-50/50 border border-blue-200 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
        <div className="w-10 h-10 rounded-full bg-blue-100/50 flex items-center justify-center shrink-0">
          <AlertCircle className="w-5 h-5 text-blue-600" />
        </div>
        <div className="text-sm text-blue-800 leading-relaxed">
          <p className="font-bold mb-1.5 text-base">Pencairan Dana Ekspor</p>
          <p className="font-medium opacity-90">
            Dana dari invoice berstatus PAID akan ditahan di rekening bersama (Escrow) NusaTrade Connect. Dana otomatis cair setelah status pesanan COMPLETED (dokumen PEB & pengiriman divalidasi).
          </p>
        </div>
      </div>

    </div>
  );
}
