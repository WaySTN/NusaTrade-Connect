'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Building, User, Mail, Phone, Lock, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function RegisterSellerPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedIn', 'true');
      }
      router.push('/overview');
    }, 1500);
  };

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#006B52] mb-4 cursor-pointer hover:underline" onClick={() => step === 1 ? router.push('/register') : prevStep()}>
          <ArrowLeft className="w-4 h-4" />
          {step === 1 ? 'Kembali pilih peran' : 'Kembali ke tahap 1'}
        </div>
        <h2 className="text-3xl font-display font-bold text-[var(--color-text-primary)] mb-2">
          Daftar Eksportir
        </h2>
        <p className="text-[var(--color-text-secondary)]">
          {step === 1 ? 'Lengkapi informasi dasar Anda.' : 'Lengkapi informasi bisnis Anda.'}
        </p>
      </div>

      <div className="flex gap-2 mb-8">
        <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-[#006B52]' : 'bg-[var(--color-border-strong)]'}`}></div>
        <div className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${step >= 2 ? 'bg-[#006B52]' : 'bg-[var(--color-border-strong)]'}`}></div>
      </div>

      <form onSubmit={step === 1 ? (e) => { e.preventDefault(); nextStep(); } : handleRegister} className="space-y-5">
        
        <div className={`space-y-5 animate-in fade-in slide-in-from-right-8 duration-300 ${step === 1 ? 'block' : 'hidden'}`}>
          <Input
            label="Nama Lengkap"
            type="text"
            placeholder="Budi Santoso"
            startIcon={User}
            required
          />
          <Input
            label="Email Bisnis"
            type="email"
            placeholder="nama@perusahaan.com"
            startIcon={Mail}
            required
          />
          <Input
            label="Kata Sandi"
            type="password"
            placeholder="Minimal 8 karakter"
            startIcon={Lock}
            minLength={8}
            required
          />
          <Button type="submit" variant="primary" size="lg" className="w-full emerald-gradient mt-2 h-12" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Lanjut ke Tahap 2
          </Button>
        </div>

        <div className={`space-y-5 animate-in fade-in slide-in-from-right-8 duration-300 ${step === 2 ? 'block' : 'hidden'}`}>
          <Input
            label="Nama Usaha / PT / CV"
            type="text"
            placeholder="PT Nusantara Abadi"
            startIcon={Building}
            required
          />
          <Input
            label="No. Telepon / WhatsApp"
            type="tel"
            placeholder="+62 812 3456 7890"
            startIcon={Phone}
            required
          />
          
          <div className="pt-2 text-sm text-[var(--color-text-secondary)] bg-[var(--color-bg-subtle)] p-4 rounded-lg">
            Dengan mendaftar, Anda menyetujui <Link href="/terms" className="text-[#006B52] font-semibold hover:underline">Syarat & Ketentuan</Link> serta Kebijakan Privasi NusaTrade Connect.
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full emerald-gradient mt-2 h-12" isLoading={isLoading} rightIcon={!isLoading && <CheckCircle2 className="w-4 h-4" />}>
            Selesaikan Pendaftaran
          </Button>
        </div>

      </form>
    </>
  );
}
