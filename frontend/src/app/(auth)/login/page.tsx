'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, Store, Globe, AlertCircle, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { getMockPPJKUser, getMockSellerUser, getMockBuyerUser } from '@/lib/mock-data';
import { useT } from '@/i18n/useT';

export default function LoginPage() {
  const router = useRouter();
  const t = useT();
  const [activeRole, setActiveRole] = useState<'seller' | 'buyer'>('buyer');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('buyer@nusatrade.com');
  const [password, setPassword] = useState('buyer123');
  const [loginError, setLoginError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSelectRole = (role: 'seller' | 'buyer') => {
    setActiveRole(role);
    setLoginError('');
    if (role === 'seller') {
      setEmail('seller@nusatrade.com');
      setPassword('seller123');
    } else {
      setEmail('buyer@nusatrade.com');
      setPassword('buyer123');
    }
  };

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
          activePPJKId = 'profil-ppjk';
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
    }, 600);
  };

  return (
    <div className="w-full animate-fade-in">
      {/* Header Section */}
      <div className="mb-7 text-left">
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[var(--color-text-primary)] mb-2.5 tracking-tight">
          {t('auth.login_title')}
        </h2>
        <p className="text-sm font-medium text-[var(--color-text-secondary)] leading-relaxed">
          {t('auth.login_desc')}
        </p>
      </div>

      {/* Main Unified Login Card Container */}
      <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50">
        
        {/* Integrated Segmented Persona Selector Tabs */}
        <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/70 mb-6">
          <button
            type="button"
            onClick={() => handleSelectRole('buyer')}
            className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs font-extrabold transition-all duration-300 cursor-pointer ${
              activeRole === 'buyer'
                ? 'bg-white text-[var(--color-primary)] shadow-sm border border-emerald-500/30'
                : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'
            }`}
          >
            <Globe className={`w-4 h-4 ${activeRole === 'buyer' ? 'text-[var(--color-primary)]' : 'text-slate-400'}`} />
            <span>{t('auth.role_buyer')}</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectRole('seller')}
            className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs font-extrabold transition-all duration-300 cursor-pointer ${
              activeRole === 'seller'
                ? 'bg-white text-amber-700 shadow-sm border border-amber-500/30'
                : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'
            }`}
          >
            <Store className={`w-4 h-4 ${activeRole === 'seller' ? 'text-amber-600' : 'text-slate-400'}`} />
            <span>{t('auth.role_seller')}</span>
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleLogin} className="space-y-5">
          <Input
            label={t('auth.email_label')}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('auth.email_placeholder')}
            startIcon={Mail}
            required
          />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-[var(--color-text-primary)]">{t('auth.password_label')}</label>
              <Link href="/lupa-sandi" className="text-xs font-bold text-[var(--color-primary)] hover:underline transition-colors">
                {t('auth.forgot_password')}
              </Link>
            </div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('auth.password_placeholder')}
              startIcon={Lock}
              required
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-[var(--color-primary)] focus:ring-[var(--color-primary-light)] accent-[var(--color-primary)] cursor-pointer"
              />
              <span className="text-xs font-semibold text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">
                {t('auth.remember_me')}
              </span>
            </label>
          </div>

          {loginError && (
            <div className="flex items-center gap-2.5 text-xs font-semibold text-[var(--color-error)] bg-[var(--color-error-light)] border border-[var(--color-error)]/20 px-4 py-3 rounded-2xl animate-slide-up">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className={`w-full h-12 text-sm font-extrabold tracking-wide rounded-2xl shadow-lg transition-all duration-300 ${
                activeRole === 'buyer'
                  ? 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] shadow-emerald-900/20 text-white'
                  : 'bg-amber-600 hover:bg-amber-700 text-white border-amber-600 shadow-amber-900/20'
              }`}
              isLoading={isLoading}
              rightIcon={!isLoading && <ArrowRight className="w-4 h-4" />}
            >
              {t('auth.login_button')}
            </Button>
          </div>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-100 text-center">
          <p className="text-xs font-semibold text-[var(--color-text-secondary)]">
            {t('auth.no_account')}{' '}
            <Link href="/register" className="font-extrabold text-[var(--color-primary)] hover:underline">
              {t('auth.register_now')}
            </Link>
          </p>
        </div>
      </div>

      {/* Trust Badge Footer */}
      <div className="mt-6 flex items-center justify-center gap-2 text-[11px] font-semibold text-slate-400">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>{t('auth.trust_badge')}</span>
      </div>
    </div>
  );
}

