'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  CheckCircle2, 
  Star, 
  TrendingUp, 
  Building2, 
  Eye, 
  ArrowRight,
  Phone,
  Clock,
  MapPin,
  ExternalLink,
  MessageCircle,
  FileCheck
} from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { getMockPPJK, MockPPJK } from '@/lib/mock-data';
import { cn } from '@/lib/utils/cn';

// Data dummy ulasan untuk preview
const DUMMY_REVIEWS = [
  { id: 1, name: 'Kopi Nusantara Abadi', text: 'Pengurusan PEB sangat cepat dan CS responsif.', rating: 5, date: '15 Juli 2026' },
  { id: 2, name: 'Furniture Jati Indah', text: 'Sangat direkomendasikan untuk pengiriman kontainer.', rating: 4, date: '10 Juli 2026' }
];

// Data dummy dokumen masuk untuk PPJK
const DUMMY_REQUESTS = [
  { 
    id: 'req-01', 
    exporter: 'Kopi Nusantara Abadi', 
    service: 'PEB & Karantina', 
    date: '18 Juli 2026', 
    status: 'PENDING',
    destination: 'Singapura',
    docs: 'Invoice, Packing List' 
  },
  { 
    id: 'req-02', 
    exporter: 'Furniture Jati Indah', 
    service: 'Logistik Laut & Bea Cukai', 
    date: '17 Juli 2026', 
    status: 'PROSES',
    destination: 'Amerika Serikat',
    docs: 'Invoice, Packing List, Bill of Lading' 
  },
  { 
    id: 'req-03', 
    exporter: 'Tekstil Maju Jaya', 
    service: 'PEB', 
    date: '15 Juli 2026', 
    status: 'SELESAI',
    destination: 'Jepang',
    docs: 'Invoice, Packing List' 
  },
  { 
    id: 'req-04', 
    exporter: 'Bumi Rempah Lestari', 
    service: 'Fumigasi & COO', 
    date: '12 Juli 2026', 
    status: 'SELESAI',
    destination: 'Jerman',
    docs: 'Phytosanitary Certificate, COO' 
  }
];

export default function PPJKDashboardOverviewPage() {
  const [ppjk, setPpjk] = useState<MockPPJK | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ppjkId = localStorage.getItem('ppjkId') || 'p1';
      let data = getMockPPJK(ppjkId);

      // Cek apakah data p1 ditimpa dengan data registrasi dari localStorage
      const registeredEmail = localStorage.getItem('ppjk_registered_email');
      if (ppjkId === 'p1' && registeredEmail) {
        data = {
          id: 'p1',
          name: localStorage.getItem('ppjk_registered_name') || 'PT Sinar Jaya Dok',
          slug: 'pt-sinar-jaya-dok',
          city: localStorage.getItem('ppjk_registered_city') || 'Jakarta Utara',
          province: localStorage.getItem('ppjk_registered_province') || 'DKI Jakarta',
          fullAddress: localStorage.getItem('ppjk_registered_address') || 'Alamat Terdaftar',
          email: registeredEmail,
          whatsapp: localStorage.getItem('ppjk_registered_whatsapp') || '6281234567890',
          services: JSON.parse(localStorage.getItem('ppjk_registered_services') || '["PEB", "Bea Cukai"]'),
          rating: 5.0,
          reviewCount: 0,
          isVerified: true,
          description: localStorage.getItem('ppjk_registered_desc') || 'Perusahaan kepabeanan tepercaya yang melayani pengurusan dokumen ekspor impor.',
          estimatedCostMin: Number(localStorage.getItem('ppjk_registered_cost_min') || '500000'),
          estimatedCostMax: Number(localStorage.getItem('ppjk_registered_cost_max') || '2000000'),
          costUnit: localStorage.getItem('ppjk_registered_cost_unit') || 'per dokumen',
          establishedYear: Number(localStorage.getItem('ppjk_registered_year') || '2026'),
          employeeCount: '10-50 karyawan',
          certifications: ['ISO 9001:2015', 'AEO Certified'],
          coverageArea: ['Jawa', 'Bali'],
          portfolioCount: 1,
          operationalHours: localStorage.getItem('ppjk_registered_hours') || 'Senin–Jumat, 08.00–17.00 WIB'
        };
      }

      if (data) {
        setPpjk(data);
      }
      setIsLoading(false);
    }
  }, []);

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Badge variant="warning">Menunggu</Badge>;
      case 'PROSES':
        return <Badge variant="info">Diproses</Badge>;
      case 'SELESAI':
        return <Badge variant="success">Selesai</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  if (isLoading || !ppjk) {
    return (
      <div className="p-8 text-center text-[var(--color-text-secondary)] font-medium">
        Memuat dashboard...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-fade-in max-w-7xl mx-auto">
      
      {/* ── WELCOME BANNER ────────────────────────────────────────────────── */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[var(--color-accent)] to-[#8b5cf6] text-white p-6 sm:p-8 shadow-xl shadow-[var(--color-accent)]/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-45 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider mb-3">
              <Star className="w-3.5 h-3.5 fill-white" /> Mitra Terverifikasi
            </div>
            <h1 className="text-2xl sm:text-4xl font-display font-extrabold tracking-tight">
              Selamat datang, <span className="underline decoration-white/30">{ppjk.name}</span>!
            </h1>
            <p className="text-white/80 mt-2 font-medium max-w-xl text-sm sm:text-base leading-relaxed">
              Kelola dokumen kepabeanan, ulasan eksportir, dan optimalkan layanan logistik Anda di NusaTrade Connect.
            </p>
          </div>
          
          <div className="flex gap-3 shrink-0">
            <Link href={`/ppjk/${ppjk.id}`} target="_blank">
              <Button 
                variant="ghost" 
                className="bg-white/10 hover:bg-white/20 text-white border-transparent font-bold"
                leftIcon={<Eye className="w-4 h-4" />}
              >
                Lihat Profil Publik
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── STAT CARDS ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="animate-slide-up delay-75">
          <StatCard 
            title="Permintaan Masuk" 
            value="12 Pengajuan" 
            icon={FileText} 
            trend="up"
            trendValue="24%" 
            variant="default"
          />
        </div>
        <div className="animate-slide-up delay-100">
          <StatCard 
            title="Pengurusan Selesai" 
            value="98 Dokumen" 
            icon={CheckCircle2} 
            trend="up"
            trendValue="12.5%" 
            variant="emerald"
          />
        </div>
        <div className="animate-slide-up delay-150">
          <StatCard 
            title="Rating Instansi" 
            value={`${ppjk.rating} / 5.0`} 
            icon={Star} 
            trend="neutral"
            trendValue="Stabel" 
            variant="gold"
          />
        </div>
        <div className="animate-slide-up delay-200">
          <StatCard 
            title="Total Pendapatan" 
            value={formatRupiah(42500000)} 
            icon={TrendingUp} 
            trend="up"
            trendValue="8.7%" 
            variant="purple"
          />
        </div>
      </div>

      {/* ── DASHBOARD GRID ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Kolom Kiri: Tabel Permintaan Terkini */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-[var(--color-border)] p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center pb-2 border-b border-[var(--color-border)]">
            <div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Permintaan Dokumen Terbaru</h3>
              <p className="text-xs text-[var(--color-text-secondary)] font-medium">Daftar pengajuan pengurusan dokumen dari eksportir</p>
            </div>
            <Link href="/ppjk/dashboard/dokumen" className="text-xs font-bold text-[var(--color-accent)] hover:opacity-80 flex items-center gap-1">
              Semua Pengajuan <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-[var(--color-border)] text-[var(--color-text-muted)] font-bold text-xs uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Eksportir</th>
                  <th className="pb-3 font-semibold">Layanan</th>
                  <th className="pb-3 font-semibold">Negara Tujuan</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {DUMMY_REQUESTS.map((req) => (
                  <tr key={req.id} className="group hover:bg-[var(--color-bg-subtle)]/50 transition-colors duration-150">
                    <td className="py-4 font-bold text-[var(--color-text-primary)]">{req.exporter}</td>
                    <td className="py-4 font-medium text-[var(--color-text-secondary)]">{req.service}</td>
                    <td className="py-4 font-medium text-[var(--color-text-secondary)]">{req.destination}</td>
                    <td className="py-4">{getStatusBadge(req.status)}</td>
                    <td className="py-4 text-right">
                      <Button size="sm" variant="outline" className="font-bold border-[var(--color-border-strong)] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]">
                        Detail
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Kolom Kanan: Preview Profil Instansi & Ulasan */}
        <div className="space-y-6">
          
          {/* Preview Card Profil */}
          <div className="bg-white rounded-3xl border border-[var(--color-border)] p-6 shadow-sm flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
                <h3 className="text-base font-bold text-[var(--color-text-primary)]">Profil Instansi Anda</h3>
                <span className="text-[10px] font-bold text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-2 py-0.5 rounded-full uppercase">Aktif</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[var(--color-accent)] text-white flex items-center justify-center font-display font-bold text-lg">
                  {ppjk.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-text-primary)]">{ppjk.name}</h4>
                  <p className="text-xs text-[var(--color-text-muted)] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0" /> {ppjk.city}, {ppjk.province}
                  </p>
                </div>
              </div>

              <p className="text-xs text-[var(--color-text-secondary)] font-medium leading-relaxed line-clamp-3">
                {ppjk.description}
              </p>

              <div className="space-y-2 pt-2 text-xs font-semibold text-[var(--color-text-secondary)]">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[var(--color-text-muted)]" />
                  <span>+{ppjk.whatsapp} (WhatsApp Terdaftar)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[var(--color-text-muted)]" />
                  <span>{ppjk.operationalHours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-[var(--color-text-muted)]" />
                  <span>Estimasi: {formatRupiah(ppjk.estimatedCostMin)} – {formatRupiah(ppjk.estimatedCostMax)} / {ppjk.costUnit}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[var(--color-border)]">
              <Link href="/ppjk/dashboard/profil" className="w-full">
                <Button variant="outline" className="w-full font-bold text-xs h-10 border-[var(--color-border-strong)]">
                  Edit Profil
                </Button>
              </Link>
              <Link href={`/ppjk/${ppjk.id}`} target="_blank" className="w-full">
                <Button variant="accent" className="w-full font-bold text-xs h-10 bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 shadow-sm flex items-center justify-center gap-1">
                  Lihat Publik <ExternalLink className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Preview Ulasan Terkini */}
          <div className="bg-white rounded-3xl border border-[var(--color-border)] p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-[var(--color-border)]">
              <h3 className="text-base font-bold text-[var(--color-text-primary)]">Ulasan Klien Terbaru</h3>
              <Link href="/ppjk/dashboard/ulasan" className="text-xs font-bold text-[var(--color-accent)] hover:opacity-80">
                Lihat Semua
              </Link>
            </div>

            <div className="space-y-4">
              {DUMMY_REVIEWS.map(rev => (
                <div key={rev.id} className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--color-text-primary)]">{rev.name}</span>
                    <span className="text-[10px] text-[var(--color-text-muted)]">{rev.date}</span>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={cn(
                          "w-3.5 h-3.5", 
                          i < rev.rating ? "text-[var(--color-warning)] fill-[var(--color-warning)]" : "text-[var(--color-border-strong)]"
                        )} 
                      />
                    ))}
                  </div>
                  <p className="text-[var(--color-text-secondary)] font-medium leading-relaxed italic">
                    "{rev.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
