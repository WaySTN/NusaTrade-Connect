'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Store, CreditCard, ShieldCheck, ArrowRight, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { PublicFooter } from '@/components/layout/PublicFooter';

export default function DemoPaymentEntry() {
  const flowSteps = [
    {
      id: 1,
      title: 'Update Harga Final (UMKM)',
      description: 'UMKM memperbarui harga setelah sepakat di chat, kemudian mengirim tagihan final ke buyer.',
      icon: Store,
      path: '/demo/payment/umkm',
      segment: 'Segmen 2.5',
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200'
    },
    {
      id: 2,
      title: 'Pembayaran Tagihan (Buyer)',
      description: 'Buyer menerima tagihan, melihat detail, dan membayar via QRIS Antarnegara.',
      icon: CreditCard,
      path: '/demo/payment/buyer',
      segment: 'Segmen 2.5',
      color: 'bg-amber-50 text-amber-600 border-amber-200'
    },
    {
      id: 3,
      title: 'Dana Escrow & Pencairan',
      description: 'Dana ditahan aman oleh platform. Cair ke UMKM setelah buyer konfirmasi pesanan.',
      icon: ShieldCheck,
      path: '/demo/payment/escrow',
      segment: 'Segmen 2.6',
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-base)] flex flex-col">
      <PublicNavbar />
      
      <main className="flex-1 flex items-center py-20">
        <div className="max-w-4xl mx-auto w-full px-4 sm:px-6">
          
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-primary-subtle)] text-[var(--color-primary)] text-xs font-bold uppercase tracking-widest mb-6">
              <PlayCircle className="w-4 h-4" />
              Interactive Demo Flow
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-[var(--color-text-primary)] mb-4 tracking-tight">
              Sistem Alur Pembayaran & Escrow
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] font-medium max-w-2xl mx-auto">
              Simulasi end-to-end proses checkout, pembayaran cross-border, dan keamanan dana escrow (Segmen 2.5 & 2.6).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-24 left-[15%] right-[15%] h-1 bg-[var(--color-border-strong)] z-0 rounded-full border border-dashed"></div>

            {flowSteps.map((step, idx) => (
              <div 
                key={step.id}
                className="relative z-10 bg-white rounded-3xl p-6 border border-[var(--color-border)] shadow-sm hover:shadow-lg hover:border-[var(--color-primary-subtle)] transition-all duration-300 var(--ease-out-quart) group flex flex-col h-full animate-slide-up"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="flex flex-col items-center text-center mb-6">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border transition-transform duration-300 group-hover:scale-110",
                    step.color
                  )}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                    Langkah {step.id} • {step.segment}
                  </span>
                  <h3 className="text-xl font-bold font-display text-[var(--color-text-primary)]">
                    {step.title}
                  </h3>
                </div>

                <p className="text-sm text-[var(--color-text-secondary)] font-medium text-center mb-8 flex-1">
                  {step.description}
                </p>

                <Link href={step.path} className="mt-auto">
                  <Button 
                    variant={idx === 0 ? "primary" : "outline"} 
                    className={cn(
                      "w-full h-12 rounded-xl font-bold transition-all",
                      idx === 0 ? "shadow-lg shadow-[var(--color-primary)]/20" : "border-[var(--color-border-strong)] bg-[var(--color-bg-base)]"
                    )}
                    rightIcon={idx === 0 ? <ArrowRight className="w-4 h-4" /> : undefined}
                  >
                    {idx === 0 ? 'Mulai Demo' : 'Buka Halaman'}
                  </Button>
                </Link>
              </div>
            ))}
          </div>

        </div>
      </main>
      
      <PublicFooter />
    </div>
  );
}
