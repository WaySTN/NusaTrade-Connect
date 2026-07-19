'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, LogIn, X, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  redirectUrl?: string;
  actionText?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  title = 'Autentikasi Diperlukan',
  description = 'Anda harus masuk (login) atau mendaftar akun terlebih dahulu untuk dapat mengirim pesan dan bernegosiasi dengan UMKM penjual.',
  redirectUrl = '/buyer/dashboard/chat',
  actionText = 'Masuk / Login Sekarang'
}) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleProceedLogin = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('redirectAfterLogin', redirectUrl);
    }
    onClose();
    router.push(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal Card Container */}
      <div 
        className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-[var(--color-border)] animate-scale-up z-10 text-center space-y-6"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[var(--color-text-muted)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon Badge */}
        <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary-subtle)] text-[var(--color-primary)] flex items-center justify-center mx-auto shadow-sm border border-[var(--color-primary-subtle)]">
          <Lock className="w-8 h-8 text-[var(--color-primary)] animate-pulse" />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-2xl font-display font-extrabold text-[var(--color-text-primary)] tracking-tight">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] font-medium leading-relaxed">
            {description}
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-[var(--color-bg-subtle)] p-3.5 rounded-2xl border border-[var(--color-border)] text-left flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[var(--color-primary)] shrink-0 mt-0.5" />
          <div className="text-xs text-[var(--color-text-secondary)] font-medium">
            <strong className="text-[var(--color-text-primary)] block mb-0.5">Keamanan Transaksi Ekspor</strong>
            Fitur komunikasi NusaTrade Connect menggunakan enkripsi dan AI terjemahan otomatis khusus pengguna terautentikasi.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <Button
            variant="primary"
            className="w-full justify-center font-bold text-sm h-12 rounded-xl shadow-lg shadow-[var(--color-primary)]/20 emerald-gradient"
            leftIcon={<LogIn className="w-4 h-4" />}
            onClick={handleProceedLogin}
          >
            {actionText}
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-center font-semibold text-xs h-10 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
            onClick={onClose}
          >
            Batal / Nanti Saja
          </Button>
        </div>

      </div>
    </div>
  );
};
