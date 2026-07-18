'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User, Mail, Lock, Building2, FileText, MapPin, Phone, Calendar,
  ArrowRight, ArrowLeft, CheckCircle2, Ship, FileCheck, Anchor,
  Package, Plane, Warehouse, Shield, Leaf, Flame, Award
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils/cn';

// Daftar layanan yang tersedia beserta ikon & deskripsi
const AVAILABLE_SERVICES = [
  { id: 'PEB', label: 'PEB', desc: 'Pemberitahuan Ekspor Barang', icon: FileCheck },
  { id: 'PIB', label: 'PIB', desc: 'Pemberitahuan Impor Barang', icon: FileText },
  { id: 'Bea Cukai', label: 'Bea Cukai', desc: 'Pengurusan dokumen kepabeanan', icon: Shield },
  { id: 'Logistik Laut', label: 'Logistik Laut', desc: 'Pengiriman via kapal laut', icon: Anchor },
  { id: 'Logistik Udara', label: 'Logistik Udara', desc: 'Pengiriman via pesawat udara', icon: Plane },
  { id: 'Pergudangan', label: 'Pergudangan', desc: 'Penyimpanan & manajemen stok', icon: Warehouse },
  { id: 'Asuransi Kargo', label: 'Asuransi Kargo', desc: 'Perlindungan barang pengiriman', icon: Package },
  { id: 'Karantina', label: 'Karantina', desc: 'Pengurusan karantina pertanian', icon: Leaf },
  { id: 'Fumigasi', label: 'Fumigasi', desc: 'Perlakuan fumigasi ekspor', icon: Flame },
  { id: 'Certificate of Origin (COO)', label: 'COO', desc: 'Certificate of Origin', icon: Award },
];

const COST_UNITS = ['per dokumen', 'per pengiriman', 'per kontainer'];

export default function RegisterPPJKPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Step 1 — Akun
  const [picName, setPicName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Step 2 — Instansi
  const [companyName, setCompanyName] = useState('');
  const [nib, setNib] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [year, setYear] = useState('');

  // Step 3 — Layanan & Profil
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [costMin, setCostMin] = useState('');
  const [costMax, setCostMax] = useState('');
  const [costUnit, setCostUnit] = useState('per dokumen');
  const [description, setDescription] = useState('');
  const [operationalHours, setOperationalHours] = useState('');
  const [agreed, setAgreed] = useState(false);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError('Kata sandi tidak cocok.');
      return;
    }
    setPasswordError('');
    nextStep();
  };

  const toggleService = (id: string) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', 'ppjk');
        localStorage.setItem('ppjkId', 'p1'); // dummy — akan terhubung ke DB nanti
      }
      router.push('/ppjk/dashboard');
    }, 1500);
  };

  return (
    <>
      {/* Header & Back Button */}
      <div className="mb-8">
        <div
          className="flex items-center gap-2 text-sm font-bold text-[var(--color-accent)] mb-6 cursor-pointer hover:opacity-70 transition-opacity duration-200"
          onClick={() => step === 1 ? router.push('/register') : prevStep()}
        >
          <ArrowLeft className="w-4 h-4" />
          {step === 1 ? 'Kembali pilih peran' : `Kembali ke Tahap ${step - 1}`}
        </div>

        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center">
            <Ship className="w-5 h-5 text-[var(--color-accent)]" />
          </div>
          <h2 className="text-3xl font-display font-extrabold text-[var(--color-text-primary)] tracking-tight">
            Daftar Mitra PPJK
          </h2>
        </div>
        <p className="text-[var(--color-text-secondary)] font-medium">
          {step === 1 && 'Buat akun untuk instansi Anda.'}
          {step === 2 && 'Lengkapi informasi instansi Anda.'}
          {step === 3 && 'Tentukan layanan & profil publik instansi.'}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="flex gap-2 mb-10">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex-1 flex flex-col gap-1.5">
            <div className={cn(
              'h-2 rounded-full transition-all duration-500',
              step >= s ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border-strong)]'
            )} />
            <span className={cn(
              'text-[10px] font-bold uppercase tracking-wider text-center transition-colors duration-300',
              step >= s ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)]'
            )}>
              {s === 1 && 'Akun'}
              {s === 2 && 'Instansi'}
              {s === 3 && 'Layanan'}
            </span>
          </div>
        ))}
      </div>

      {/* ── STEP 1: Informasi Akun ─────────────────────────────────── */}
      {step === 1 && (
        <form onSubmit={handleStep1} className="space-y-5 animate-slide-up">
          <Input
            label="Nama Lengkap PIC (Person in Charge)"
            type="text"
            placeholder="Budi Santoso"
            startIcon={User}
            value={picName}
            onChange={e => setPicName(e.target.value)}
            required
          />
          <Input
            label="Email Bisnis Instansi"
            type="email"
            placeholder="nama@perusahaan.com"
            startIcon={Mail}
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Input
            label="Kata Sandi"
            type="password"
            placeholder="Minimal 8 karakter"
            startIcon={Lock}
            minLength={8}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Input
            label="Konfirmasi Kata Sandi"
            type="password"
            placeholder="Ulangi kata sandi"
            startIcon={Lock}
            minLength={8}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            error={passwordError}
            required
          />
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-4 text-base bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 shadow-lg"
            rightIcon={<ArrowRight className="w-5 h-5" />}
          >
            Lanjut ke Tahap 2
          </Button>
        </form>
      )}

      {/* ── STEP 2: Informasi Instansi ────────────────────────────── */}
      {step === 2 && (
        <form
          onSubmit={(e) => { e.preventDefault(); nextStep(); }}
          className="space-y-5 animate-slide-up"
        >
          <Input
            label="Nama Instansi / Perusahaan"
            type="text"
            placeholder="PT Sinar Jaya Dok"
            startIcon={Building2}
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
            required
          />
          <Input
            label="Nomor Izin Usaha (NIB / SIUP)"
            type="text"
            placeholder="1234567890123456"
            startIcon={FileText}
            value={nib}
            onChange={e => setNib(e.target.value)}
            required
          />

          {/* Alamat — Textarea manual */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[var(--color-text-primary)]">
              Alamat Lengkap Instansi
            </label>
            <textarea
              rows={3}
              placeholder="Jl. Pelabuhan Raya No. 12, Tanjung Priok, Jakarta Utara..."
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
              className="w-full rounded-xl border border-[var(--color-border-strong)] bg-white px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-placeholder)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 focus:border-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all duration-300 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Kota Operasional"
              type="text"
              placeholder="Jakarta Utara"
              startIcon={MapPin}
              value={city}
              onChange={e => setCity(e.target.value)}
              required
            />
            <Input
              label="Provinsi"
              type="text"
              placeholder="DKI Jakarta"
              startIcon={MapPin}
              value={province}
              onChange={e => setProvince(e.target.value)}
              required
            />
          </div>

          <Input
            label="Nomor WhatsApp Bisnis"
            type="tel"
            placeholder="+62 812 3456 7890"
            startIcon={Phone}
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
            required
          />
          <Input
            label="Tahun Berdiri"
            type="number"
            placeholder="2010"
            startIcon={Calendar}
            min={1900}
            max={new Date().getFullYear()}
            value={year}
            onChange={e => setYear(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-4 text-base bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 shadow-lg"
            rightIcon={<ArrowRight className="w-5 h-5" />}
          >
            Lanjut ke Tahap 3
          </Button>
        </form>
      )}

      {/* ── STEP 3: Layanan & Profil Publik ──────────────────────── */}
      {step === 3 && (
        <form onSubmit={handleRegister} className="space-y-7 animate-slide-up">

          {/* Pilih Layanan */}
          <div>
            <label className="text-sm font-semibold text-[var(--color-text-primary)] block mb-3">
              Layanan yang Disediakan <span className="text-[var(--color-error)]">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {AVAILABLE_SERVICES.map(({ id, label, desc, icon: Icon }) => {
                const checked = selectedServices.includes(id);
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => toggleService(id)}
                    className={cn(
                      'flex items-start gap-3 p-3 rounded-xl border-2 text-left transition-all duration-200',
                      checked
                        ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5'
                        : 'border-[var(--color-border)] bg-white hover:border-[var(--color-accent)]/50'
                    )}
                  >
                    <div className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors',
                      checked ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-bg-subtle)] text-[var(--color-text-muted)]'
                    )}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className={cn(
                        'text-xs font-bold leading-tight',
                        checked ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-primary)]'
                      )}>
                        {label}
                      </p>
                      <p className="text-[10px] text-[var(--color-text-muted)] leading-tight mt-0.5 line-clamp-2">
                        {desc}
                      </p>
                    </div>
                    {checked && (
                      <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)] shrink-0 ml-auto" />
                    )}
                  </button>
                );
              })}
            </div>
            {selectedServices.length === 0 && (
              <p className="text-xs text-[var(--color-text-muted)] mt-2">
                Pilih minimal 1 layanan.
              </p>
            )}
          </div>

          {/* Estimasi Biaya */}
          <div>
            <label className="text-sm font-semibold text-[var(--color-text-primary)] block mb-3">
              Estimasi Biaya
            </label>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[var(--color-text-secondary)]">Biaya Minimum</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[var(--color-text-muted)]">Rp</span>
                  <input
                    type="number"
                    placeholder="500000"
                    min={0}
                    value={costMin}
                    onChange={e => setCostMin(e.target.value)}
                    className="w-full h-12 rounded-xl border border-[var(--color-border-strong)] bg-white pl-10 pr-4 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-placeholder)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 focus:border-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all duration-300"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[var(--color-text-secondary)]">Biaya Maksimum</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[var(--color-text-muted)]">Rp</span>
                  <input
                    type="number"
                    placeholder="2000000"
                    min={0}
                    value={costMax}
                    onChange={e => setCostMax(e.target.value)}
                    className="w-full h-12 rounded-xl border border-[var(--color-border-strong)] bg-white pl-10 pr-4 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-placeholder)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 focus:border-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all duration-300"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[var(--color-text-secondary)]">Satuan Biaya</label>
              <select
                value={costUnit}
                onChange={e => setCostUnit(e.target.value)}
                className="w-full h-12 rounded-xl border border-[var(--color-border-strong)] bg-white px-4 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 focus:border-[var(--color-accent)] transition-all duration-300"
              >
                {COST_UNITS.map(u => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Deskripsi */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[var(--color-text-primary)]">
              Deskripsi Perusahaan
            </label>
            <textarea
              rows={4}
              placeholder="Ceritakan keunggulan layanan Anda kepada calon klien..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full rounded-xl border border-[var(--color-border-strong)] bg-white px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-placeholder)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 focus:border-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all duration-300 resize-none"
            />
          </div>

          {/* Jam Operasional */}
          <Input
            label="Jam Operasional"
            type="text"
            placeholder="Senin–Jumat, 08.00–17.00 WIB"
            startIcon={Calendar}
            value={operationalHours}
            onChange={e => setOperationalHours(e.target.value)}
          />

          {/* Persetujuan */}
          <div className="pt-2 text-sm font-medium text-[var(--color-text-secondary)] bg-[var(--color-accent)]/5 border border-[var(--color-accent)]/20 p-5 rounded-2xl">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[var(--color-accent)] cursor-pointer"
                required
              />
              <span>
                Dengan mendaftar, Anda menyetujui{' '}
                <Link href="/terms" className="text-[var(--color-accent)] font-bold hover:opacity-70 transition-opacity">
                  Syarat &amp; Ketentuan
                </Link>{' '}
                serta Kebijakan Privasi NusaTrade Connect untuk Mitra PPJK.
              </span>
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full text-base bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 shadow-lg shadow-[var(--color-accent)]/20"
            disabled={selectedServices.length === 0 || !agreed || isLoading}
            isLoading={isLoading}
            rightIcon={!isLoading ? <CheckCircle2 className="w-5 h-5" /> : undefined}
          >
            {isLoading ? 'Membuat Profil...' : 'Selesai & Buat Profil'}
          </Button>
        </form>
      )}

      <div className="mt-10 pt-8 border-t border-[var(--color-border)] text-center">
        <p className="text-sm font-medium text-[var(--color-text-secondary)]">
          Sudah punya akun Mitra PPJK?{' '}
          <Link href="/login" className="font-bold text-[var(--color-accent)] hover:opacity-70 transition-opacity duration-200">
            Masuk
          </Link>
        </p>
      </div>
    </>
  );
}
