'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Building, User, Mail, Globe, Lock, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function RegisterBuyerPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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
        <div className="flex items-center gap-2 text-sm font-semibold text-[#C8941A] mb-4 cursor-pointer hover:underline" onClick={() => router.push('/register')}>
          <ArrowLeft className="w-4 h-4" />
          Kembali pilih peran
        </div>
        <h2 className="text-3xl font-display font-bold text-[var(--color-text-primary)] mb-2">
          Daftar Importir
        </h2>
        <p className="text-[var(--color-text-secondary)]">
          Lengkapi informasi perusahaan Anda untuk mulai mencari produk.
        </p>
      </div>

      <form onSubmit={handleRegister} className="space-y-5 animate-in fade-in slide-in-from-right-8 duration-300">
        
        <Input
          label="Nama Lengkap"
          type="text"
          placeholder="John Doe"
          startIcon={User}
          required
        />

        <Input
          label="Email Perusahaan"
          type="email"
          placeholder="john@company.com"
          startIcon={Mail}
          required
        />

        <Input
          label="Nama Perusahaan"
          type="text"
          placeholder="Global Imports LLC"
          startIcon={Building}
          required
        />

        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-[var(--color-text-primary)]">Negara</label>
          <div className="relative">
            <Globe className="absolute left-3.5 top-3.5 w-5 h-5 text-[var(--color-text-placeholder)]" />
            <select className="w-full h-12 pl-11 pr-4 bg-white border border-[var(--color-border-strong)] rounded-xl focus:ring-2 focus:ring-[#C8941A] focus:outline-none appearance-none cursor-pointer" required defaultValue="">
              <option value="" disabled>Pilih Negara Asal</option>
              <option value="usa">Amerika Serikat (USA)</option>
              <option value="sg">Singapura (SG)</option>
              <option value="my">Malaysia (MY)</option>
              <option value="jp">Jepang (JP)</option>
              <option value="kr">Korea Selatan (KR)</option>
            </select>
          </div>
        </div>

        <Input
          label="Kata Sandi"
          type="password"
          placeholder="Minimal 8 karakter"
          startIcon={Lock}
          minLength={8}
          required
        />
        
        <div className="pt-2 text-sm text-[var(--color-text-secondary)] bg-[var(--color-bg-subtle)] p-4 rounded-lg">
          Dengan mendaftar, Anda menyetujui <Link href="/terms" className="text-[#C8941A] font-semibold hover:underline">Syarat & Ketentuan</Link> serta Kebijakan Privasi NusaTrade Connect.
        </div>

        <Button type="submit" variant="accent" size="lg" className="w-full mt-2 h-12 shadow-md hover:shadow-lg" isLoading={isLoading} rightIcon={!isLoading && <ArrowRight className="w-4 h-4" />}>
          Selesaikan Pendaftaran
        </Button>

      </form>
    </>
  );
}
