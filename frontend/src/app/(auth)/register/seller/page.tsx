'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Building, User, Mail, Phone, Lock, CheckCircle2, ArrowRight, ArrowLeft, CreditCard, Camera, FileText, FileBadge } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils/cn';

export default function RegisterSellerPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Step 1
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Step 2 Fields
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');

  // Step 3 Fields
  const [nik, setNik] = useState('');
  const [faceImage, setFaceImage] = useState<File | null>(null);

  // Step 4 Fields
  const [npwp, setNpwp] = useState('');
  const [nib, setNib] = useState('');
  const [isNibVerifying, setIsNibVerifying] = useState(false);
  const [isNibVerified, setIsNibVerified] = useState(false);

  const handleVerifyNib = () => {
    if (nib.length < 13) return;
    setIsNibVerifying(true);
    setTimeout(() => {
      setIsNibVerifying(false);
      setIsNibVerified(true);
    }, 1500);
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', 'seller');
        localStorage.setItem('registered_user_email', email);
        localStorage.setItem('registered_user_password', password);
        localStorage.setItem('registered_user_role', 'seller');
        localStorage.setItem('registered_user_nik', nik);
        localStorage.setItem('registered_user_npwp', npwp);
        localStorage.setItem('registered_user_nib', nib);
        localStorage.setItem('registered_user_nib_verified', isNibVerified.toString());
      }
      router.push('/overview');
    }, 1500);
  };

  const renderSubtitle = () => {
    switch (step) {
      case 1: return 'Lengkapi informasi dasar Anda.';
      case 2: return 'Lengkapi profil bisnis Anda.';
      case 3: return 'Verifikasi identitas diri Anda.';
      case 4: return 'Lengkapi legalitas usaha Anda.';
      default: return '';
    }
  };

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm font-bold text-[var(--color-primary)] mb-6 cursor-pointer hover:underline transition-all duration-200" onClick={() => step === 1 ? router.push('/register') : prevStep()}>
          <ArrowLeft className="w-4 h-4" />
          {step === 1 ? 'Kembali pilih peran' : `Kembali ke tahap ${step - 1}`}
        </div>
        <h2 className="text-3xl font-display font-extrabold text-[var(--color-text-primary)] mb-3 tracking-tight">
          Daftar Eksportir
        </h2>
        <p className="text-[var(--color-text-secondary)] font-medium">
          {renderSubtitle()}
        </p>
      </div>

      <div className="flex gap-2 mb-10">
        {[1, 2, 3, 4].map(s => (
          <div key={s} className="flex-1 flex flex-col gap-1.5">
            <div className={cn(
              'h-2 rounded-full transition-all duration-500',
              step >= s ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border-strong)]'
            )} />
          </div>
        ))}
      </div>

      <form onSubmit={step < 4 ? (e) => { e.preventDefault(); nextStep(); } : handleRegister} className="space-y-6">
        
        {/* STEP 1: Akun */}
        <div className={cn("space-y-6 animate-slide-up duration-300", step === 1 ? 'block' : 'hidden')}>
          <Input
            label="Nama Lengkap"
            type="text"
            placeholder="Budi Santoso"
            startIcon={User}
            required={step === 1}
          />
          <Input
            label="Email Bisnis"
            type="email"
            placeholder="nama@perusahaan.com"
            startIcon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={step === 1}
          />
          <Input
            label="Kata Sandi"
            type="password"
            placeholder="Minimal 8 karakter"
            startIcon={Lock}
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={step === 1}
          />
          <Button type="submit" variant="primary" size="lg" className="w-full shadow-lg shadow-[var(--color-primary)]/20 mt-4 text-base" rightIcon={<ArrowRight className="w-5 h-5" />}>
            Lanjut ke Tahap 2
          </Button>
        </div>

        {/* STEP 2: Profil Bisnis */}
        <div className={cn("space-y-6 animate-slide-up duration-300", step === 2 ? 'block' : 'hidden')}>
          <Input
            label="Nama Usaha / PT / CV"
            type="text"
            placeholder="PT Nusantara Abadi"
            startIcon={Building}
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required={step === 2}
          />
          <Input
            label="No. Telepon / WhatsApp"
            type="tel"
            placeholder="+62 812 3456 7890"
            startIcon={Phone}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required={step === 2}
          />
          <Button type="submit" variant="primary" size="lg" className="w-full shadow-lg shadow-[var(--color-primary)]/20 mt-4 text-base" rightIcon={<ArrowRight className="w-5 h-5" />}>
            Lanjut ke Tahap 3
          </Button>
        </div>

        {/* STEP 3: Verifikasi Identitas */}
        <div className={cn("space-y-6 animate-slide-up duration-300", step === 3 ? 'block' : 'hidden')}>
          <Input
            label="No. KTP / NIK"
            type="text"
            placeholder="16 Digit NIK"
            maxLength={16}
            startIcon={CreditCard}
            value={nik}
            onChange={(e) => setNik(e.target.value.replace(/\D/g, ''))}
            required={step === 3}
          />

          <div className="space-y-2">
            <label className="text-sm font-bold text-[var(--color-text-primary)]">Scan Wajah (Liveness Check)</label>
            <div className="border-2 border-dashed border-[var(--color-border-strong)] rounded-2xl p-6 text-center hover:bg-[var(--color-bg-subtle)] hover:border-[var(--color-primary-subtle)] transition-colors cursor-pointer" onClick={() => document.getElementById('face-upload')?.click()}>
              <input type="file" id="face-upload" accept="image/*" className="hidden" onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFaceImage(e.target.files[0]);
                }
              }} />
              <div className="w-12 h-12 rounded-full bg-[var(--color-primary-subtle)] text-[var(--color-primary)] mx-auto flex items-center justify-center mb-3">
                {faceImage ? <CheckCircle2 className="w-6 h-6" /> : <Camera className="w-6 h-6" />}
              </div>
              <p className="text-sm font-bold text-[var(--color-text-primary)]">
                {faceImage ? 'Foto berhasil diunggah' : 'Klik untuk mengambil foto selfie'}
              </p>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">Pastikan wajah terlihat jelas tanpa aksesoris</p>
            </div>
          </div>
          <Button type="submit" variant="primary" size="lg" className="w-full shadow-lg shadow-[var(--color-primary)]/20 mt-4 text-base" rightIcon={<ArrowRight className="w-5 h-5" />} disabled={nik.length > 0 && nik.length < 16}>
            Lanjut ke Tahap 4
          </Button>
        </div>

        {/* STEP 4: Legalitas Usaha */}
        <div className={cn("space-y-6 animate-slide-up duration-300", step === 4 ? 'block' : 'hidden')}>
          <Input
            label="NPWP (Opsional)"
            type="text"
            placeholder="15 atau 16 Digit NPWP"
            maxLength={16}
            startIcon={FileText}
            value={npwp}
            onChange={(e) => setNpwp(e.target.value.replace(/\D/g, ''))}
          />

          <div className="space-y-2">
            <label className="text-sm font-bold text-[var(--color-text-primary)]">NIB (Nomor Induk Berusaha)</label>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="13 Digit NIB"
                  maxLength={13}
                  startIcon={FileBadge}
                  value={nib}
                  onChange={(e) => setNib(e.target.value.replace(/\D/g, ''))}
                  disabled={isNibVerified}
                  required={step === 4}
                />
              </div>
              <Button 
                type="button" 
                variant={isNibVerified ? "primary" : "outline"} 
                className={cn("h-12 px-4 shrink-0 transition-all", isNibVerified && "bg-emerald-600 border-emerald-600 hover:bg-emerald-700")}
                onClick={handleVerifyNib}
                disabled={nib.length < 13 || isNibVerified || isNibVerifying}
                isLoading={isNibVerifying}
              >
                {isNibVerified ? <CheckCircle2 className="w-5 h-5 text-white" /> : 'Verifikasi'}
              </Button>
            </div>
            {isNibVerified && <p className="text-xs font-medium text-emerald-600 mt-1">NIB berhasil diverifikasi!</p>}

            <div className="mt-3 p-4 rounded-xl bg-amber-50 border border-amber-200/50">
              <p className="text-xs font-bold text-amber-800 mb-1">Belum punya NIB?</p>
              <p className="text-[10px] text-amber-700 mb-3">NIB diperlukan untuk mendaftar sebagai eksportir terverifikasi.</p>
              <div className="flex flex-wrap gap-2">
                <a href="https://oss.go.id" target="_blank" rel="noreferrer" className="text-[10px] font-bold px-3 py-1.5 bg-white text-amber-700 border border-amber-300 rounded-lg hover:bg-amber-100 transition-colors">
                  Daftar via OSS
                </a>
                <Link href="/ppjk" className="text-[10px] font-bold px-3 py-1.5 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
                  Cari Mitra PPJK
                </Link>
              </div>
            </div>
          </div>
          
          <div className="pt-2 text-sm font-medium text-[var(--color-text-secondary)] bg-[var(--color-primary-subtle)]/30 border border-[var(--color-primary-subtle)] p-5 rounded-2xl">
            Dengan mendaftar, Anda menyetujui <Link href="/terms" className="text-[var(--color-primary)] font-bold hover:underline transition-all duration-200">Syarat & Ketentuan</Link> serta Kebijakan Privasi NusaTrade Connect.
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full shadow-lg shadow-[var(--color-primary)]/20 mt-4 text-base" isLoading={isLoading} rightIcon={!isLoading && <CheckCircle2 className="w-5 h-5" />}>
            Selesaikan Pendaftaran
          </Button>
        </div>

      </form>
    </>
  );
}
