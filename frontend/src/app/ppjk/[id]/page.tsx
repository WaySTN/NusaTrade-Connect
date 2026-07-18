'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { MOCK_PPJK, MockPPJK } from '@/lib/mock-data';
import { Button } from '@/components/ui/Button';
import {
  Ship, MapPin, Star, Phone, MessageSquare, Mail, Globe, Clock,
  Users, Calendar, Award, ArrowLeft, ShieldCheck, CheckCircle2,
  FileCheck, FileText, Shield, Anchor, Plane, Warehouse, Package, Leaf, Flame, Building2
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

// ─── Service Icon Mapping ──────────────────────────────────────────────────
const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'PEB': FileCheck,
  'PIB': FileText,
  'Bea Cukai': Shield,
  'Logistik Laut': Anchor,
  'Logistik Udara': Plane,
  'Pergudangan': Warehouse,
  'Asuransi Kargo': Package,
  'Karantina': Leaf,
  'Fumigasi': Flame,
  'Certificate of Origin (COO)': Award,
};

// ─── Helper: Read registered PPJK from localStorage ─────────────────────────
function getRegisteredPPJKFromStorage(): MockPPJK[] {
  if (typeof window === 'undefined') return [];
  try {
    const name = localStorage.getItem('ppjk_registered_name');
    const email = localStorage.getItem('ppjk_registered_email');
    if (!name || !email) return [];

    const rawMin = localStorage.getItem('ppjk_registered_cost_min') ?? '0';
    const rawMax = localStorage.getItem('ppjk_registered_cost_max') ?? '0';
    const rawServices = localStorage.getItem('ppjk_registered_services') ?? '[]';

    const costMin = parseInt(rawMin, 10) || 0;
    const costMax = parseInt(rawMax, 10) || 0;
    const services: string[] = JSON.parse(rawServices);

    const registeredPPJK: MockPPJK = {
      id: 'profil-ppjk',
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      city: localStorage.getItem('ppjk_registered_city') ?? '',
      province: localStorage.getItem('ppjk_registered_province') ?? '',
      fullAddress: localStorage.getItem('ppjk_registered_address') ?? '',
      email,
      whatsapp: localStorage.getItem('ppjk_registered_whatsapp') ?? '',
      services,
      rating: 0,
      reviewCount: 0,
      isVerified: false,
      description: localStorage.getItem('ppjk_registered_desc') ?? '',
      estimatedCostMin: costMin,
      estimatedCostMax: costMax,
      costUnit: localStorage.getItem('ppjk_registered_cost_unit') ?? 'per dokumen',
      establishedYear: parseInt(localStorage.getItem('ppjk_registered_year') ?? '0', 10),
      employeeCount: '5-10 karyawan',
      certifications: [],
      coverageArea: ['Lokal', localStorage.getItem('ppjk_registered_province') ?? 'Indonesia'],
      portfolioCount: 0,
      operationalHours: localStorage.getItem('ppjk_registered_hours') ?? '',
    };

    return [registeredPPJK];
  } catch {
    return [];
  }
}

export default function PPJKDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params.id === 'string' ? params.id : '';

  const [ppjk, setPpjk] = useState<MockPPJK | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Find PPJK by ID from MOCK or localStorage
    let found: MockPPJK | undefined;
    if (id === 'profil-ppjk') {
      const registered = getRegisteredPPJKFromStorage();
      if (registered.length > 0) found = registered[0];
    } else {
      found = MOCK_PPJK.find(p => p.id === id);
    }

    if (found) {
      setPpjk(found);
    }
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [id]);

  const formatRupiah = (val: number) => {
    if (val <= 0) return 'Hubungi Kami';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleContactWhatsApp = (initialMsg: string) => {
    if (!ppjk) return;
    const cleanPhone = ppjk.whatsapp.replace(/\D/g, '');
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(initialMsg)}`;
    window.open(url, '_blank');
  };

  const handleSendRequest = () => {
    const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      // Direct to chat with mock contact
      router.push('/chat/c1');
    } else {
      router.push('/login');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-base)] flex flex-col items-center justify-center">
        <PublicNavbar />
        <div className="flex flex-col items-center mt-20">
          <div className="w-14 h-14 rounded-full border-[4px] border-[var(--color-border)] border-t-[var(--color-accent)] animate-spin mb-4"></div>
          <p className="text-[var(--color-text-secondary)] font-bold">Memuat detail profil PPJK...</p>
        </div>
      </div>
    );
  }

  if (!ppjk) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-base)] flex flex-col">
        <PublicNavbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 mt-20 text-center animate-slide-up">
          <Ship className="w-20 h-20 text-[var(--color-border-strong)] mb-6" />
          <h2 className="text-3xl font-display font-extrabold text-[var(--color-text-primary)] tracking-tight mb-2">Mitra PPJK Tidak Ditemukan</h2>
          <p className="text-[var(--color-text-secondary)] font-medium mb-8">Profil mitra PPJK yang Anda cari tidak tersedia atau belum terdaftar.</p>
          <Link href="/ppjk">
            <Button variant="primary" className="font-bold shadow-md bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90" leftIcon={<ArrowLeft className="w-5 h-5" />}>Kembali ke Direktori</Button>
          </Link>
        </div>
        <PublicFooter variant="light" />
      </div>
    );
  }

  const initials = ppjk.name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

  return (
    <div className="min-h-screen bg-[var(--color-bg-base)] flex flex-col">
      <PublicNavbar />

      {/* Decorative Grid Pattern */}
      <div className="fixed inset-0 grid-pattern opacity-30 z-0 pointer-events-none"></div>

      <main className="flex-1 pb-20 relative z-10">
        {/* A. Header Hero Section */}
        <div className="relative pt-32 pb-20 overflow-hidden text-white" style={{background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 60%, var(--color-primary-active) 100%)'}}>
          {/* Dot pattern overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.08]" style={{backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>
          {/* Top-right light flare */}
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full pointer-events-none" style={{background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 65%)'}}></div>
          
          <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            {/* Back to directory */}
            <Link href="/ppjk" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors duration-200 mb-8">
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Direktori PPJK
            </Link>

            <div className="flex flex-col md:flex-row gap-6 md:items-center">
              {/* Logo / Initials */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 shadow-xl overflow-hidden">
                {ppjk.logoUrl ? (
                  <img src={ppjk.logoUrl} alt={ppjk.name} className="w-full h-full object-cover" />
                ) : (
                  <Building2 className="w-12 h-12 sm:w-14 sm:h-14 text-slate-400" />
                )}
              </div>

              {/* Title & Stats */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2.5">
                  <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight leading-tight">
                    {ppjk.name}
                  </h1>
                  {ppjk.isVerified && (
                    <div className="flex items-center gap-1 bg-[#FEF3C7] text-[#D97706] text-xs font-extrabold px-2.5 py-1 rounded-full border border-[#FDE68A] shrink-0 shadow-sm animate-pulse">
                      <ShieldCheck className="w-3.5 h-3.5 fill-current" />
                      Terverifikasi
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm font-medium text-slate-400 mb-4">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-red-400" />
                    {ppjk.city && ppjk.province ? `${ppjk.city}, ${ppjk.province}` : ppjk.city || ppjk.province || 'Lokasi belum ditentukan'}
                  </span>
                  
                  {ppjk.reviewCount > 0 ? (
                    <span className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <strong className="text-white font-bold">{ppjk.rating}</strong> ({ppjk.reviewCount} ulasan)
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs bg-white/15 px-2 py-0.5 rounded text-white/90">
                      Belum ada ulasan
                    </span>
                  )}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleContactWhatsApp(`Halo ${ppjk.name}, saya ingin menanyakan layanan PPJK Anda.`)}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-[#25D366] hover:bg-[#1da851] transition-all duration-300 shadow-md shadow-[#25D366]/20 border-0"
                  >
                    <MessageSquare className="w-5 h-5 fill-current" />
                    Hubungi via WhatsApp
                  </button>
                  
                  <button
                    onClick={handleSendRequest}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-white text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition-all duration-300 shadow-md shadow-black/10 border-0"
                  >
                    <Ship className="w-5 h-5" />
                    Kirim Permintaan Jasa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* B. Bar Statistik Cepat */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Tahun Berdiri */}
            <div className="bg-white border border-[var(--color-border)] rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md hover:border-[var(--color-accent)]/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-[var(--color-text-muted)] font-extrabold uppercase tracking-wider block mb-0.5">Tahun Berdiri</span>
                <span className="font-mono text-xl sm:text-2xl font-black text-[var(--color-text-primary)] leading-none">{ppjk.establishedYear || '-'}</span>
              </div>
            </div>
            
            {/* Card 2: Transaksi Selesai */}
            <div className="bg-white border border-[var(--color-border)] rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md hover:border-[var(--color-accent)]/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-[var(--color-text-muted)] font-extrabold uppercase tracking-wider block mb-0.5">Transaksi Selesai</span>
                <span className="font-mono text-xl sm:text-2xl font-black text-[var(--color-text-primary)] leading-none">
                  {ppjk.portfolioCount > 0 ? `${ppjk.portfolioCount}+` : 'Baru'}
                </span>
              </div>
            </div>

            {/* Card 3: Total Layanan */}
            <div className="bg-white border border-[var(--color-border)] rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md hover:border-[var(--color-accent)]/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center shrink-0">
                <Ship className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-[var(--color-text-muted)] font-extrabold uppercase tracking-wider block mb-0.5">Total Layanan</span>
                <span className="font-mono text-xl sm:text-2xl font-black text-[var(--color-text-primary)] leading-none">{ppjk.services.length}</span>
              </div>
            </div>

            {/* Card 4: Penilaian Mitra */}
            <div className="bg-white border border-[var(--color-border)] rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md hover:border-[var(--color-accent)]/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#D97706] flex items-center justify-center shrink-0">
                <Star className="w-6 h-6 fill-current" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-[var(--color-text-muted)] font-extrabold uppercase tracking-wider block mb-0.5">Penilaian Mitra</span>
                <span className="font-mono text-xl sm:text-2xl font-black text-[var(--color-text-primary)] leading-none flex items-center gap-1">
                  {ppjk.rating > 0 ? ppjk.rating.toFixed(1) : 'New'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* C. Deskripsi & Info Umum */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Kolom Kiri: Tentang & Layanan */}
            <div className="flex-1 min-w-0 space-y-8 w-full">
              {/* Tentang Perusahaan */}
              <div className="bg-white border border-[var(--color-border)] rounded-2xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-4 mb-5">
                  Tentang Perusahaan
                </h2>
                <div className="text-[var(--color-text-secondary)] font-medium leading-relaxed whitespace-pre-line text-sm sm:text-base">
                  {ppjk.description || 'Instansi ini belum memperbarui informasi deskripsi mereka.'}
                </div>
              </div>

              {/* Layanan yang Disediakan */}
              <div className="bg-white border border-[var(--color-border)] rounded-2xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-4 mb-6">
                  Layanan yang Disediakan
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ppjk.services.map((srv, idx) => {
                    const IconComp = SERVICE_ICONS[srv] || FileText;
                    return (
                      <div key={idx} className="flex gap-3.5 p-4 rounded-xl border border-[var(--color-border-strong)] bg-slate-50/50 hover:shadow-md hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/5 transition-all duration-300">
                        <div className="w-9 h-9 rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center shrink-0">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[var(--color-text-primary)] leading-tight">{srv}</p>
                          <p className="text-[11px] text-[var(--color-text-muted)] mt-1 font-medium">Layanan terverifikasi mitra.</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Area Cakupan */}
              {ppjk.coverageArea && ppjk.coverageArea.length > 0 && (
                <div className="bg-white border border-[var(--color-border)] rounded-2xl p-6 sm:p-8 shadow-sm">
                  <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-4 mb-5">
                    Wilayah Cakupan Operasional
                  </h2>
                  <div className="flex flex-wrap gap-2.5">
                    {ppjk.coverageArea.map((area, idx) => (
                      <span key={idx} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--color-border-strong)] bg-white text-xs font-semibold text-[var(--color-text-secondary)]">
                        <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* D. Sertifikasi */}
              {ppjk.certifications && ppjk.certifications.length > 0 && (
                <div className="bg-white border border-[var(--color-border)] rounded-2xl p-6 sm:p-8 shadow-sm">
                  <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-4 mb-5">
                    Sertifikasi Resmi
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {ppjk.certifications.map((cert, idx) => {
                      const certName = typeof cert === 'string' ? cert : (cert as any).name;
                      const certImage = typeof cert === 'string' ? null : (cert as any).imageUrl;
                      return (
                        <div key={idx} className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-amber-50/70 text-amber-800 border border-amber-200/80 text-xs font-bold shadow-sm">
                          {certImage ? (
                            <img src={certImage} alt={certName} className="w-5 h-5 object-cover rounded border border-amber-200 shrink-0" />
                          ) : (
                            <Award className="w-4 h-4 shrink-0 text-amber-500" />
                          )}
                          <span>{certName}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Kolom Kanan: Detail & Sidebar */}
            <div className="w-full lg:w-[350px] space-y-6 shrink-0 lg:sticky lg:top-28">
              {/* Unified Sidebar Card */}
              <div className="bg-white border border-[var(--color-border)] rounded-2xl shadow-sm overflow-hidden divide-y divide-[var(--color-border)]">
                {/* 1. Estimasi Biaya */}
                <div className="p-6 bg-slate-50/50">
                  <span className="text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider block mb-1">Estimasi Biaya</span>
                  <div className="font-mono text-xl font-extrabold text-[var(--color-primary)] mb-1">
                    {ppjk.estimatedCostMin && ppjk.estimatedCostMax ? (
                      <>
                        {formatRupiah(ppjk.estimatedCostMin)} – {formatRupiah(ppjk.estimatedCostMax)}
                      </>
                    ) : ppjk.estimatedCostMin ? (
                      formatRupiah(ppjk.estimatedCostMin)
                    ) : (
                      'Hubungi Kami'
                    )}
                  </div>
                  <span className="text-xs text-[var(--color-text-secondary)] font-semibold block mb-4 bg-white border border-[var(--color-border)] px-2.5 py-1 rounded w-fit capitalize">
                    {ppjk.costUnit}
                  </span>
                  <p className="text-[11px] text-[var(--color-text-muted)] font-medium leading-relaxed">
                    * Harga bersifat estimasi kasar berdasarkan jenis dokumen. Biaya final dapat berbeda tergantung volume dan kerumitan kargo Anda.
                  </p>
                </div>

                {/* 2. Informasi Kontak */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xs font-extrabold text-[var(--color-text-primary)] uppercase tracking-wider mb-3">
                    Informasi Kontak
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Email */}
                    <div className="flex gap-3">
                      <Mail className="w-5 h-5 text-[var(--color-text-muted)] shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider font-bold block mb-0.5">Email Bisnis</span>
                        <a href={`mailto:${ppjk.email}`} className="text-sm font-bold text-[var(--color-primary)] hover:underline truncate block">
                          {ppjk.email}
                        </a>
                      </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex gap-3">
                      <MessageSquare className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider font-bold block mb-0.5">WhatsApp</span>
                        <span className="text-sm font-bold text-[var(--color-text-primary)] block">
                          {ppjk.whatsapp}
                        </span>
                        <button
                          onClick={() => handleContactWhatsApp(`Halo ${ppjk.name}, saya ingin berdiskusi terkait kepabeanan.`)}
                          className="text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline mt-1 block"
                        >
                          Hubungi via WhatsApp →
                        </button>
                      </div>
                    </div>

                    {/* Website */}
                    {ppjk.socialMedia?.website && (
                      <div className="flex gap-3">
                        <Globe className="w-5 h-5 text-[var(--color-text-muted)] shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider font-bold block mb-0.5">Website</span>
                          <a href={ppjk.socialMedia.website} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[var(--color-primary)] hover:underline truncate block">
                            {ppjk.socialMedia.website.replace(/https?:\/\//, '')}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. Detail Operasional */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xs font-extrabold text-[var(--color-text-primary)] uppercase tracking-wider mb-3">
                    Detail Operasional
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Jam Kerja */}
                    <div className="flex gap-3">
                      <Clock className="w-5 h-5 text-[var(--color-text-muted)] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider font-bold block mb-0.5">Jam Kerja</span>
                        <span className="text-xs font-bold text-[var(--color-text-secondary)] block">
                          {ppjk.operationalHours || 'Tidak disebutkan'}
                        </span>
                      </div>
                    </div>

                    {/* Skala Karyawan */}
                    <div className="flex gap-3">
                      <Users className="w-5 h-5 text-[var(--color-text-muted)] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider font-bold block mb-0.5">Skala Perusahaan</span>
                        <span className="text-xs font-bold text-[var(--color-text-secondary)] block">
                          {ppjk.employeeCount || '-'}
                        </span>
                      </div>
                    </div>

                    {/* Tahun Berdiri */}
                    <div className="flex gap-3">
                      <Calendar className="w-5 h-5 text-[var(--color-text-muted)] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider font-bold block mb-0.5">Tahun Berdiri</span>
                        <span className="text-xs font-bold text-[var(--color-text-secondary)] block">
                          Tahun {ppjk.establishedYear || '-'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* E. Ulasan & Rating */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="bg-white border border-[var(--color-border)] rounded-2xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-4 mb-6">
              Penilaian &amp; Ulasan Klien
            </h2>
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Rata-rata Nilai */}
              <div className="flex flex-col items-center justify-center bg-slate-50 border border-[var(--color-border-strong)] rounded-2xl p-6 text-center shrink-0 w-full md:w-56">
                <span className="text-5xl font-mono font-black text-[var(--color-text-primary)] mb-2">
                  {ppjk.rating > 0 ? ppjk.rating : '-'}
                </span>
                {ppjk.rating > 0 ? (
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn("w-4 h-4 fill-current", i < Math.floor(ppjk.rating) ? "text-amber-500" : "text-slate-300")} />
                    ))}
                  </div>
                ) : (
                  <span className="text-xs font-bold text-[var(--color-text-muted)] mb-2">Belum dinilai</span>
                )}
                <span className="text-xs text-[var(--color-text-secondary)] font-semibold">({ppjk.reviewCount} ulasan)</span>
              </div>

              {/* Progress bar rating */}
              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map(stars => {
                  const percent = ppjk.reviewCount > 0
                    ? stars === 5 ? '85%' : stars === 4 ? '12%' : stars === 3 ? '3%' : '0%'
                    : '0%';
                  return (
                    <div key={stars} className="flex items-center gap-3">
                      <span className="w-8 text-xs font-bold text-[var(--color-text-secondary)] flex items-center justify-end gap-1">
                        {stars} <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      </span>
                      <div className="flex-1 h-2.5 rounded-full bg-slate-100 border border-[var(--color-border)] overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: percent }}></div>
                      </div>
                      <span className="w-8 text-xs font-medium text-[var(--color-text-muted)] text-right">{percent}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* List Ulasan */}
            {ppjk.reviewCount > 0 ? (
              <div className="mt-8 pt-8 border-t border-[var(--color-border)] space-y-6">
                {[
                  { name: 'PT Tani Organik Mulia (Eksportir)', msg: 'Layanan PEB sangat responsif dan diselesaikan dalam beberapa jam saja. Tim logistik sangat profesional.', rating: 5, date: '14 Jun 2026' },
                  { name: 'CV Kerajinan Nusantara (Eksportir)', msg: 'Koordinasi bea cukai pelabuhan sangat baik. Sangat terbantu untuk pengiriman kargo anyaman kami ke Jepang.', rating: 4, date: '02 Mei 2026' },
                  { name: 'PT Sinar Pangan Abadi (Eksportir)', msg: 'Pelayanan prima. Selalu sigap memberikan informasi status pengurusan dokumen ekspor.', rating: 5, date: '28 Jan 2026' }
                ].map((rev, idx) => (
                  <div key={idx} className="flex flex-col gap-2 p-5 rounded-xl border border-[var(--color-border-strong)] bg-slate-50/30">
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <strong className="text-sm font-bold text-[var(--color-text-primary)]">{rev.name}</strong>
                      <span className="text-xs text-[var(--color-text-muted)] font-semibold">{rev.date}</span>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={cn("w-3.5 h-3.5 fill-current", i < rev.rating ? "text-amber-500" : "text-slate-300")} />
                      ))}
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)] font-medium leading-relaxed mt-1">
                      &quot;{rev.msg}&quot;
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-8 pt-8 border-t border-[var(--color-border)] text-center py-6 text-sm text-[var(--color-text-muted)] font-medium">
                Belum ada ulasan yang ditinggalkan untuk mitra PPJK ini.
              </div>
            )}
          </div>
        </div>

        {/* F. CTA Bawah Halaman */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="rounded-3xl bg-[var(--color-text-primary)] border border-slate-800 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl text-white">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/5 pointer-events-none"></div>
            
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight mb-4 relative z-10">
              Butuh bantuan pengurusan dokumen ekspor?
            </h2>
            <p className="text-slate-300 font-medium mb-8 max-w-xl mx-auto text-sm sm:text-base relative z-10">
              Konsultasikan kebutuhan logistik, izin ekspor, PEB, atau pengurusan bea cukai langsung dengan perwakilan resmi kami.
            </p>
            
            <button
              onClick={() => handleContactWhatsApp(`Halo ${ppjk.name}, saya membutuhkan bantuan pengurusan dokumen ekspor.`)}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold bg-[#25D366] hover:bg-[#1da851] transition-all duration-300 shadow-xl shadow-[#25D366]/20 border-0 text-base relative z-10"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              Hubungi via WhatsApp
            </button>
          </div>
        </div>
      </main>

      <PublicFooter variant="light" />
    </div>
  );
}
