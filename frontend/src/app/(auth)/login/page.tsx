'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, Ship, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { getMockPPJKUser, getMockSellerUser, getMockBuyerUser } from '@/lib/mock-data';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    setTimeout(() => {
      if (typeof window !== 'undefined') {
        const trimmedEmail = email.toLowerCase().trim();
        const trimmedPassword = password.trim();

        // 1. Cek apakah cocok dengan Mitra PPJK (Registrasi Baru / Mock)
        const registeredPpjkEmail = localStorage.getItem('ppjk_registered_email');
        const registeredPpjkPassword = localStorage.getItem('ppjk_registered_password');
        
        let isPPJK = false;
        let activePPJKId = '';

        if (registeredPpjkEmail && registeredPpjkPassword && 
            registeredPpjkEmail.toLowerCase().trim() === trimmedEmail && 
            registeredPpjkPassword.trim() === trimmedPassword) {
          isPPJK = true;
          activePPJKId = 'profil-ppjk'; // Gunakan ID khusus agar data registrasi terbaca
        } else {
          const ppjkUser = getMockPPJKUser(trimmedEmail, trimmedPassword);
          if (ppjkUser) {
            isPPJK = true;
            activePPJKId = ppjkUser.ppjkId;
          }
        }

        if (isPPJK) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userRole', 'ppjk');
          localStorage.setItem('ppjkId', activePPJKId);
          setIsLoading(false);
          router.push('/ppjk/dashboard');
          return;
        }

        // 2. Cek apakah cocok dengan Eksportir / Seller (Registrasi Baru / Mock)
        const registeredSellerEmail = localStorage.getItem('registered_user_email');
        const registeredSellerPassword = localStorage.getItem('registered_user_password');
        const registeredSellerRole = localStorage.getItem('registered_user_role');
        
        let isSeller = false;
        if (registeredSellerEmail && registeredSellerPassword && registeredSellerRole === 'seller' &&
            registeredSellerEmail.toLowerCase().trim() === trimmedEmail &&
            registeredSellerPassword.trim() === trimmedPassword) {
          isSeller = true;
        } else {
          const sellerUser = getMockSellerUser(trimmedEmail, trimmedPassword);
          if (sellerUser) isSeller = true;
        }

        if (isSeller) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userRole', 'seller');
          setIsLoading(false);
          router.push('/overview');
          return;
        }

        // 3. Cek apakah cocok dengan Importir / Buyer (Registrasi Baru / Mock)
        let isBuyer = false;
        if (registeredSellerEmail && registeredSellerPassword && registeredSellerRole === 'buyer' &&
            registeredSellerEmail.toLowerCase().trim() === trimmedEmail &&
            registeredSellerPassword.trim() === trimmedPassword) {
          isBuyer = true;
        } else {
          const buyerUser = getMockBuyerUser(trimmedEmail, trimmedPassword);
          if (buyerUser) isBuyer = true;
        }

        if (isBuyer) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userRole', 'buyer');
          localStorage.setItem('authToken', 'mock-buyer-jwt-token-987654321');
          localStorage.setItem('userName', 'Global Imports LLC');

          const urlParams = new URLSearchParams(window.location.search);
          const redirectQuery = urlParams.get('redirect');
          const storedRedirect = localStorage.getItem('redirectAfterLogin');
          const targetRedirect = redirectQuery || storedRedirect || '/buyer/dashboard';
          localStorage.removeItem('redirectAfterLogin');

          setIsLoading(false);
          router.push(targetRedirect);
          return;
        }

        // 4. Jika tidak cocok sama sekali, tampilkan error
        setLoginError('Surel (email) atau kata sandi yang Anda masukkan salah.');
        setIsLoading(false);
      }
    }, 1000);
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

        {loginError && (
          <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-error)] bg-[var(--color-error-light)] px-4 py-3 rounded-xl animate-slide-up">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {loginError}
          </div>
        )}

        <div className="pt-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full shadow-lg shadow-[var(--color-primary)]/20 text-base font-bold"
            isLoading={isLoading}
            rightIcon={!isLoading && <ArrowRight className="w-5 h-5" />}
          >
            Masuk ke Dashboard
          </Button>
        </div>
      </form>

      {/* Panduan Akun Uji Coba (Dummy Accounts Guide) */}
      <div className="mt-6 p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] text-xs space-y-2">
        <p className="font-bold text-[var(--color-text-primary)] flex items-center gap-1">
          💡 Gunakan akun uji coba di bawah atau buat akun baru:
        </p>
        <div className="grid grid-cols-1 gap-2 pt-1 font-medium text-[var(--color-text-secondary)]">
          <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-1.5">
            <div>
              <span className="font-bold text-[var(--color-accent)]">Mitra PPJK</span>
              <p>info@sinarjayadok.co.id</p>
            </div>
            <span className="font-mono bg-[var(--color-bg-base)] px-2 py-0.5 rounded border border-[var(--color-border-strong)]">sinarjaya123</span>
          </div>
          <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-1.5">
            <div>
              <span className="font-bold text-[var(--color-primary)]">Eksportir (Seller)</span>
              <p>seller@nusatrade.com</p>
            </div>
            <span className="font-mono bg-[var(--color-bg-base)] px-2 py-0.5 rounded border border-[var(--color-border-strong)]">seller123</span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <span className="font-bold text-[var(--color-warning-hover)]">Importir (Buyer)</span>
              <p>buyer@nusatrade.com</p>
            </div>
            <span className="font-mono bg-[var(--color-bg-base)] px-2 py-0.5 rounded border border-[var(--color-border-strong)]">buyer123</span>
          </div>
        </div>
      </div>

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

