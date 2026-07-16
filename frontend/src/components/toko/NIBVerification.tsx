'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { ShieldCheck, UploadCloud, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface NIBVerificationProps {
  initialState?: 'unverified' | 'pending' | 'verified';
}

export const NIBVerification = ({ initialState = 'unverified' }: NIBVerificationProps) => {
  const [state, setState] = useState(initialState);
  const [nib, setNib] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nib && file) {
      setState('pending');
    }
  };

  if (state === 'verified') {
    return (
      <div className="bg-white border border-[var(--color-border)] rounded-2xl p-8 flex flex-col items-center text-center max-w-md mx-auto">
        <div className="w-20 h-20 bg-[#E6F5F0] rounded-full flex items-center justify-center mb-6">
          <ShieldCheck className="w-10 h-10 text-[#006B52]" />
        </div>
        <h3 className="text-xl font-display font-bold text-[var(--color-text-primary)] mb-2">
          Terverifikasi Resmi
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">
          Toko Anda telah terverifikasi sebagai Eksportir Valid. Anda dapat melakukan transaksi dengan keamanan penuh.
        </p>
        <div className="bg-[var(--color-bg-subtle)] w-full py-3 rounded-lg border border-[var(--color-border)]">
          <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider block mb-1">Nomor Induk Berusaha</span>
          <span className="font-mono font-bold tracking-widest">91203019283741</span>
        </div>
      </div>
    );
  }

  if (state === 'pending') {
    return (
      <div className="bg-white border border-[var(--color-border)] rounded-2xl p-8 flex flex-col items-center text-center max-w-md mx-auto">
        <div className="w-20 h-20 bg-[#FEF9E7] rounded-full flex items-center justify-center mb-6">
          <div className="w-10 h-10 border-4 border-[#C8941A] border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h3 className="text-xl font-display font-bold text-[var(--color-text-primary)] mb-2">
          Sedang Diproses
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Dokumen NIB Anda sedang ditinjau oleh tim kami. Proses ini biasanya memakan waktu 1-2 hari kerja.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[var(--color-border)] rounded-2xl p-6 md:p-8 max-w-2xl mx-auto">
      <div className="flex items-start gap-4 mb-8">
        <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center shrink-0">
          <AlertCircle className="w-6 h-6 text-[#D97706]" />
        </div>
        <div>
          <h3 className="text-xl font-display font-bold text-[var(--color-text-primary)]">
            Verifikasi Identitas Bisnis (NIB)
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Untuk melakukan ekspor, Anda diwajibkan memiliki Nomor Induk Berusaha (NIB).
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">
            Nomor Induk Berusaha (NIB)
          </label>
          <input
            type="text"
            value={nib}
            onChange={(e) => setNib(e.target.value)}
            placeholder="Masukkan 13 digit NIB"
            className="w-full h-12 rounded-xl border border-[var(--color-border)] px-4 focus:outline-none focus:ring-2 focus:ring-[#006B52] focus:border-transparent font-mono tracking-widest text-lg"
            maxLength={13}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">
            Unggah Dokumen NIB (PDF/JPG)
          </label>
          <div className="border-2 border-dashed border-[var(--color-border-strong)] rounded-xl p-8 text-center hover:bg-[var(--color-bg-subtle)] transition-colors cursor-pointer group">
            <input 
              type="file" 
              accept=".pdf,.jpg,.jpeg,.png" 
              className="hidden" 
              id="nib-upload"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setFile(e.target.files[0]);
                }
              }}
            />
            <label htmlFor="nib-upload" className="cursor-pointer flex flex-col items-center w-full h-full">
              {file ? (
                <>
                  <div className="w-12 h-12 bg-[#E6F5F0] rounded-full flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-6 h-6 text-[#006B52]" />
                  </div>
                  <span className="text-sm font-medium text-[var(--color-text-primary)]">{file.name}</span>
                  <span className="text-xs text-[var(--color-text-muted)] mt-1">Klik untuk mengganti file</span>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-[#E6F5F0] transition-colors">
                    <UploadCloud className="w-6 h-6 text-[var(--color-text-muted)] group-hover:text-[#006B52] transition-colors" />
                  </div>
                  <span className="text-sm font-medium text-[var(--color-primary)]">Klik untuk mengunggah</span>
                  <span className="text-xs text-[var(--color-text-secondary)] mt-1">atau seret dan lepas file di sini</span>
                  <span className="text-[10px] text-[var(--color-text-muted)] mt-2">Maks. ukuran 5MB</span>
                </>
              )}
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--color-border)]">
          <Button 
            type="submit" 
            variant="primary" 
            size="lg" 
            className="w-full emerald-gradient"
            disabled={!nib || !file}
          >
            Kirim Pengajuan Verifikasi
          </Button>
        </div>
      </form>
    </div>
  );
};
