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
      <div className="mb-8 text-center sm:text-left">
        <h2 className="text-3xl font-display font-bold text-[var(--color-text-primary)] mb-2">
          Selamat Datang
        </h2>
        <p className="text-[var(--color-text-secondary)]">
          Masuk untuk mengelola aktivitas ekspor Anda.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        <Input
          label="Email Bisnis"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nama@perusahaan.com"
          startIcon={Mail}
          required
        />

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-[var(--color-text-primary)]">Kata Sandi</label>
            <Link href="/lupa-sandi" className="text-xs font-semibold text-[#006B52] hover:underline">
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

        <div className="pt-2">
          <Button 
            type="submit" 
            variant="primary" 
            size="lg" 
            className="w-full emerald-gradient shadow-md h-12"
            isLoading={isLoading}
            rightIcon={!isLoading && <ArrowRight className="w-4 h-4" />}
          >
            Masuk ke Dashboard
          </Button>
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-[var(--color-border)] text-center">
        <p className="text-sm text-[var(--color-text-secondary)]">
          Belum punya akun?{' '}
          <Link href="/register" className="font-semibold text-[#006B52] hover:underline">
            Daftar Gratis
          </Link>
        </p>
      </div>
    </>
  );
}
