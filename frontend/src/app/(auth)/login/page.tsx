'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Dummy auth persistence
      if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedIn', 'true');
      }
      router.push('/overview');
    }, 1200);
  };

  return (
    <>
      <div className="mb-10 text-center sm:text-left">
        <h2 className="text-3xl font-display font-extrabold text-[var(--color-text-primary)] mb-3 tracking-tight">
          Selamat Datang
        </h2>
        <p className="text-[var(--color-text-secondary)] font-medium">
          Masuk untuk mengelola aktivitas ekspor Anda.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <Input
          label="Email Bisnis"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nama@perusahaan.com"
          startIcon={Mail}
          required
        />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-[var(--color-text-primary)]">Kata Sandi</label>
            <Link href="/lupa-sandi" className="text-sm font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-light)] transition-colors duration-200">
              Lupa sandi?
            </Link>
          </div>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            startIcon={Lock}
            required
          />
        </div>

        <div className="pt-4">
          <Button 
            type="submit" 
            variant="primary" 
            size="lg" 
            className="w-full shadow-lg shadow-[var(--color-primary)]/20 text-base"
            isLoading={isLoading}
            rightIcon={!isLoading && <ArrowRight className="w-5 h-5" />}
          >
            Masuk ke Dashboard
          </Button>
        </div>
      </form>

      <div className="mt-8 pt-8 border-t border-[var(--color-border)] text-center">
        <p className="text-sm font-medium text-[var(--color-text-secondary)]">
          Belum punya akun?{' '}
          <Link href="/register" className="font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-light)] transition-colors duration-200">
            Daftar Gratis
          </Link>
        </p>
      </div>
    </>
  );
}
