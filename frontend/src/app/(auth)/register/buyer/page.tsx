'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Building, User, Mail, Globe, Lock, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

export default function RegisterBuyerPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', 'buyer');
        localStorage.setItem('registered_user_email', email);
        localStorage.setItem('registered_user_password', password);
        localStorage.setItem('registered_user_role', 'buyer');
      }
      router.push('/buyer/dashboard');
    }, 1500);
  };

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm font-bold text-[var(--color-warning)] mb-6 cursor-pointer hover:text-[var(--color-warning-hover)] transition-colors duration-200" onClick={() => router.push('/register')}>
          <ArrowLeft className="w-4 h-4" />
          Kembali pilih peran
        </div>
        <h2 className="text-3xl font-display font-extrabold text-[var(--color-text-primary)] mb-3 tracking-tight">
          Daftar Importir
        </h2>
        <p className="text-[var(--color-text-secondary)] font-medium">
          Lengkapi informasi perusahaan Anda untuk mulai mencari produk.
        </p>
      </div>

      <form onSubmit={handleRegister} className="space-y-6 animate-slide-up duration-300">
        
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label="Nama Perusahaan"
          type="text"
          placeholder="Global Imports LLC"
          startIcon={Building}
          required
        />

        <Select
          label="Negara"
          value={country}
          onChange={setCountry}
          placeholder="Pilih Negara Asal"
          options={[
            { value: 'usa', label: 'Amerika Serikat (USA)' },
            { value: 'sg', label: 'Singapura (SG)' },
            { value: 'my', label: 'Malaysia (MY)' },
            { value: 'jp', label: 'Jepang (JP)' },
            { value: 'kr', label: 'Korea Selatan (KR)' },
            { value: 'cn', label: 'Tiongkok (CN)' },
            { value: 'au', label: 'Australia (AU)' },
            { value: 'de', label: 'Jerman (DE)' },
            { value: 'uk', label: 'Inggris (UK)' },
            { value: 'ae', label: 'Uni Emirat Arab (AE)' }
          ]}
        />

        <Input
          label="Kata Sandi"
          type="password"
          placeholder="Minimal 8 karakter"
          startIcon={Lock}
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <div className="pt-2 text-sm font-medium text-[var(--color-text-secondary)] bg-amber-50/50 border border-amber-200/50 p-5 rounded-2xl">
          Dengan mendaftar, Anda menyetujui <Link href="/terms" className="text-[var(--color-warning)] font-bold hover:text-[var(--color-warning-hover)] transition-colors duration-200">Syarat & Ketentuan</Link> serta Kebijakan Privasi NusaTrade Connect.
        </div>

        <Button type="submit" variant="accent" size="lg" className="w-full mt-4 h-12 shadow-lg shadow-[var(--color-warning)]/20 text-base" isLoading={isLoading} rightIcon={!isLoading && <ArrowRight className="w-5 h-5" />}>
          Selesaikan Pendaftaran
        </Button>

      </form>
    </>
  );
}
