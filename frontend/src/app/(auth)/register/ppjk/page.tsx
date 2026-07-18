'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User, Mail, Lock, Building2, FileText, MapPin, Phone, Calendar,
  ArrowRight, ArrowLeft, CheckCircle2, Ship, FileCheck, Anchor,
  Package, Plane, Warehouse, Shield, Leaf, Flame, Award, Search, ChevronDown, X
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils/cn';

// ── Data Provinsi & Kota Indonesia ──────────────────────────────────────────
const INDONESIA_PROVINCES: { province: string; cities: string[] }[] = [
  { province: 'Aceh', cities: ['Banda Aceh', 'Sabang', 'Langsa', 'Lhokseumawe', 'Subulussalam', 'Meulaboh', 'Bireuen', 'Sigli', 'Takengon', 'Kutacane'] },
  { province: 'Bali', cities: ['Denpasar', 'Singaraja', 'Tabanan', 'Gianyar', 'Klungkung', 'Semarapura', 'Negara', 'Bangli', 'Amlapura', 'Ubud'] },
  { province: 'Banten', cities: ['Serang', 'Tangerang', 'Tangerang Selatan', 'Cilegon', 'Lebak', 'Pandeglang', 'Rangkasbitung', 'Serpong'] },
  { province: 'Bengkulu', cities: ['Bengkulu', 'Curup', 'Manna', 'Mukomuko', 'Tais', 'Muko-Muko', 'Arga Makmur'] },
  { province: 'DI Yogyakarta', cities: ['Yogyakarta', 'Sleman', 'Bantul', 'Gunung Kidul', 'Kulonprogo', 'Wonosari', 'Wates'] },
  { province: 'DKI Jakarta', cities: ['Jakarta Pusat', 'Jakarta Utara', 'Jakarta Barat', 'Jakarta Selatan', 'Jakarta Timur', 'Kepulauan Seribu'] },
  { province: 'Gorontalo', cities: ['Gorontalo', 'Limboto', 'Marisa', 'Kwandang', 'Isimu', 'Tilamuta', 'Suwawa'] },
  { province: 'Jambi', cities: ['Jambi', 'Sungai Penuh', 'Muara Bungo', 'Kuala Tungkal', 'Sarolangun', 'Bangko', 'Muara Tebo'] },
  { province: 'Jawa Barat', cities: ['Bandung', 'Bekasi', 'Bogor', 'Cirebon', 'Depok', 'Sukabumi', 'Tasikmalaya', 'Cimahi', 'Banjar', 'Purwakarta', 'Subang', 'Karawang', 'Garut', 'Ciamis', 'Majalengka', 'Kuningan', 'Indramayu', 'Pangandaran', 'Sumedang'] },
  { province: 'Jawa Tengah', cities: ['Semarang', 'Solo', 'Surakarta', 'Magelang', 'Pekalongan', 'Salatiga', 'Tegal', 'Kudus', 'Purwokerto', 'Klaten', 'Wonosobo', 'Temanggung', 'Brebes', 'Demak', 'Grobogan', 'Jepara', 'Kendal', 'Pati', 'Purbalingga', 'Rembang', 'Sragen', 'Wonogiri', 'Blora', 'Banjarnegara', 'Batang', 'Boyolali', 'Karanganyar', 'Kebumen', 'Pemalang', 'Cilacap'] },
  { province: 'Jawa Timur', cities: ['Surabaya', 'Malang', 'Kediri', 'Blitar', 'Mojokerto', 'Madiun', 'Pasuruan', 'Probolinggo', 'Batu', 'Gresik', 'Sidoarjo', 'Jember', 'Banyuwangi', 'Lumajang', 'Jombang', 'Nganjuk', 'Tuban', 'Lamongan', 'Bojonegoro', 'Pacitan', 'Trenggalek', 'Tulungagung', 'Ponorogo', 'Ngawi', 'Magetan', 'Sampang', 'Pamekasan', 'Sumenep', 'Bangkalan', 'Bondowoso', 'Situbondo'] },
  { province: 'Kalimantan Barat', cities: ['Pontianak', 'Singkawang', 'Sambas', 'Bengkayang', 'Landak', 'Mempawah', 'Sanggau', 'Ketapang', 'Sintang', 'Kapuas Hulu', 'Melawi', 'Kayong Utara', 'Kubu Raya', 'Sekadau'] },
  { province: 'Kalimantan Selatan', cities: ['Banjarmasin', 'Banjarbaru', 'Martapura', 'Amuntai', 'Kotabaru', 'Pelaihari', 'Batulicin', 'Barabai', 'Kandangan', 'Rantau', 'Tanjung', 'Balangan', 'Tanah Laut', 'Tabalong', 'Hulu Sungai Tengah'] },
  { province: 'Kalimantan Tengah', cities: ['Palangka Raya', 'Sampit', 'Pangkalan Bun', 'Muara Teweh', 'Buntok', 'Kuala Kurun', 'Kuala Kapuas', 'Nanga Bulik', 'Pulang Pisau', 'Tamiang Layang', 'Kasongan', 'Sukamara', 'Gunung Mas', 'Murung Raya'] },
  { province: 'Kalimantan Timur', cities: ['Samarinda', 'Balikpapan', 'Bontang', 'Tarakan', 'Sangatta', 'Tanjung Redeb', 'Sendawar', 'Tenggarong', 'Tanah Grogot', 'Penajam', 'Long Bagun'] },
  { province: 'Kalimantan Utara', cities: ['Tanjung Selor', 'Nunukan', 'Tarakan', 'Malinau', 'Bulungan', 'Long Bagun', 'Tideng Pale'] },
  { province: 'Kepulauan Bangka Belitung', cities: ['Pangkalpinang', 'Sungailiat', 'Muntok', 'Toboali', 'Belinyu', 'Koba', 'Manggar', 'Tanjung Pandan'] },
  { province: 'Kepulauan Riau', cities: ['Tanjungpinang', 'Batam', 'Tanjung Balai Karimun', 'Daik', 'Ranai', 'Dabo Singkep'] },
  { province: 'Lampung', cities: ['Bandar Lampung', 'Metro', 'Kotabumi', 'Liwa', 'Kalianda', 'Blambangan Umpu', 'Wiralaga', 'Menggala', 'Sukadana', 'Gunung Sugih', 'Pringsewu', 'Gedong Tataan'] },
  { province: 'Maluku', cities: ['Ambon', 'Tual', 'Masohi', 'Amahai', 'Saumlaki', 'Namlea', 'Bula', 'Tobelo', 'Kairatu', 'Piru'] },
  { province: 'Maluku Utara', cities: ['Sofifi', 'Ternate', 'Tidore Kepulauan', 'Tobelo', 'Weda', 'Labuha', 'Sanana', 'Morotai'] },
  { province: 'Nusa Tenggara Barat', cities: ['Mataram', 'Bima', 'Sumbawa Besar', 'Praya', 'Selong', 'Taliwang', 'Woha', 'Dompu', 'Empang', 'Raba'] },
  { province: 'Nusa Tenggara Timur', cities: ['Kupang', 'Ende', 'Ruteng', 'Labuan Bajo', 'Atambua', 'Kefamenanu', 'Kalabahi', 'Soe', 'Bajawa', 'Maumere', 'Lewoleba', 'Waingapu', 'Waikabubak', 'Larantuka', 'Betun'] },
  { province: 'Papua', cities: ['Jayapura', 'Sorong', 'Manokwari', 'Merauke', 'Nabire', 'Timika', 'Fakfak', 'Biak', 'Wamena', 'Serui', 'Kaimana', 'Wasior', 'Ransiki'] },
  { province: 'Papua Barat', cities: ['Manokwari', 'Sorong', 'Fakfak', 'Kaimana', 'Teminabuan', 'Ayamaru', 'Tomu', 'Bintuni', 'Ransiki'] },
  { province: 'Papua Pegunungan', cities: ['Wamena', 'Oksibil', 'Dekai', 'Mulia', 'Sinak', 'Tiom'] },
  { province: 'Papua Selatan', cities: ['Merauke', 'Tanah Merah', 'Kepi', 'Bade'] },
  { province: 'Papua Tengah', cities: ['Nabire', 'Enarotali', 'Wagete', 'Obano'] },
  { province: 'Riau', cities: ['Pekanbaru', 'Dumai', 'Bengkalis', 'Selat Panjang', 'Rengat', 'Tembilahan', 'Bangkinang', 'Siak Sri Indrapura', 'Pasir Pangaraian', 'Bagan Siapiapi', 'Kuala Enok'] },
  { province: 'Sulawesi Barat', cities: ['Mamuju', 'Polewali', 'Majene', 'Mamasa', 'Pasangkayu', 'Malunda'] },
  { province: 'Sulawesi Selatan', cities: ['Makassar', 'Parepare', 'Palopo', 'Sungguminasa', 'Bulukumba', 'Watampone', 'Sengkang', 'Pinrang', 'Sidrap', 'Takalar', 'Jeneponto', 'Bantaeng', 'Sinjai', 'Pangkajene', 'Barru', 'Enrekang', 'Wajo', 'Soppeng', 'Luwu', 'Toraja Utara', 'Makale', 'Rantepao'] },
  { province: 'Sulawesi Tengah', cities: ['Palu', 'Luwuk', 'Poso', 'Tolitoli', 'Kolaka', 'Buol', 'Parigi', 'Donggala', 'Ampana', 'Banggai', 'Morowali', 'Sigi', 'Moutong'] },
  { province: 'Sulawesi Tenggara', cities: ['Kendari', 'Bau-Bau', 'Raha', 'Kolaka', 'Unaaha', 'Andoolo', 'Lasusua', 'Bombana', 'Pasarwajo', 'Asera', 'Torobulu'] },
  { province: 'Sulawesi Utara', cities: ['Manado', 'Bitung', 'Tomohon', 'Kotamobagu', 'Tondano', 'Airmadidi', 'Tahuna', 'Ondong Siau', 'Melonguane'] },
  { province: 'Sumatera Barat', cities: ['Padang', 'Bukittinggi', 'Padang Panjang', 'Pariaman', 'Solok', 'Sawahlunto', 'Payakumbuh', 'Muaro Sijunjung', 'Lubuk Basung', 'Lubuk Sikaping', 'Batusangkar', 'Painan', 'Arosuka', 'Sungai Penuh', 'Tapan'] },
  { province: 'Sumatera Selatan', cities: ['Palembang', 'Prabumulih', 'Pagaralam', 'Lubuklinggau', 'Indralaya', 'Baturaja', 'Muara Enim', 'Lahat', 'Sekayu', 'Kayuagung', 'Muara Beliti', 'Martapura', 'Banyuasin', 'Tulung Selapan'] },
  { province: 'Sumatera Utara', cities: ['Medan', 'Binjai', 'Tebing Tinggi', 'Pematangsiantar', 'Sibolga', 'Tanjungbalai', 'Gunungsitoli', 'Padangsidimpuan', 'Kisaran', 'Rantauprapat', 'Kabanjahe', 'Balige', 'Sidikalang', 'Tarutung', 'Lubuk Pakam', 'Stabat', 'Tanjung Morawa'] },
];

// Flatten all cities with their province for search
const ALL_CITIES = INDONESIA_PROVINCES.flatMap(p => p.cities.map(c => ({ city: c, province: p.province })));

// ── Daftar layanan ──────────────────────────────────────────────────────────
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

const OP_DAYS = [
  'Senin – Jumat',
  'Senin – Sabtu',
  'Senin – Minggu',
  'Selasa – Sabtu',
  'Rabu – Minggu',
  'Setiap Hari',
  'Fleksibel',
];

const OP_TIMES: string[] = [];
for (let h = 0; h <= 23; h++) {
  OP_TIMES.push(`${String(h).padStart(2, '0')}.00 WIB`);
  OP_TIMES.push(`${String(h).padStart(2, '0')}.30 WIB`);
}

// ── Searchable Dropdown Component ───────────────────────────────────────────
interface SearchableDropdownProps {
  label: string;
  placeholder: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
  icon?: React.ComponentType<{ className?: string }>;
  required?: boolean;
}

function SearchableDropdown({ label, placeholder, value, options, onChange, icon: Icon, required }: SearchableDropdownProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.trim() === ''
    ? options
    : options.filter(o => o.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setQuery('');
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleSelect = (val: string) => {
    onChange(val);
    setOpen(false);
    setQuery('');
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
  };

  return (
    <div className="flex flex-col gap-1.5 w-full" ref={containerRef}>
      <label className="text-sm font-semibold text-[var(--color-text-primary)]">
        {label} {required && <span className="text-[var(--color-error)]">*</span>}
      </label>
      <div className="relative">
        {/* Trigger button */}
        <button
          type="button"
          onClick={handleOpen}
          className={cn(
            "flex items-center w-full h-12 rounded-xl border bg-white px-4 text-sm transition-all duration-300",
            "hover:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 focus:border-[var(--color-accent)]",
            open
              ? "border-[var(--color-accent)] ring-2 ring-[var(--color-accent)]/40"
              : "border-[var(--color-border-strong)]"
          )}
        >
          {Icon && <Icon className="w-5 h-5 text-[var(--color-text-placeholder)] mr-3 shrink-0" />}
          <span className={cn("flex-1 text-left truncate", value ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-placeholder)]")}>
            {value || placeholder}
          </span>
          <span className="flex items-center gap-1 ml-2">
            {value && (
              <span
                onClick={handleClear}
                className="p-0.5 rounded-full hover:bg-[var(--color-bg-subtle)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </span>
            )}
            <ChevronDown className={cn("w-4 h-4 text-[var(--color-text-muted)] transition-transform duration-200", open && "rotate-180")} />
          </span>
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute z-50 left-0 right-0 top-[calc(100%+6px)] bg-white border border-[var(--color-border-strong)] rounded-xl shadow-xl overflow-hidden animate-fade-in">
            {/* Search input */}
            <div className="flex items-center gap-2 px-3 py-2.5 border-b border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
              <Search className="w-4 h-4 text-[var(--color-text-muted)] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Cari..."
                className="flex-1 bg-transparent text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-placeholder)] focus:outline-none"
              />
              {query && (
                <button type="button" onClick={() => setQuery('')} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            {/* List */}
            <ul className="max-h-52 overflow-y-auto py-1">
              {filtered.length === 0 ? (
                <li className="px-4 py-3 text-sm text-[var(--color-text-muted)] text-center">Tidak ditemukan</li>
              ) : (
                filtered.map((opt, idx) => (
                  <li key={`${opt}-${idx}`}>
                    <button
                      type="button"
                      onClick={() => handleSelect(opt)}
                      className={cn(
                        "w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-[var(--color-accent)]/8",
                        opt === value
                          ? "text-[var(--color-accent)] font-semibold bg-[var(--color-accent)]/5"
                          : "text-[var(--color-text-primary)]"
                      )}
                    >
                      {opt}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Year Dropdown Component ─────────────────────────────────────────────────
function YearDropdown({ value, onChange, required }: { value: string; onChange: (v: string) => void; required?: boolean }) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => String(currentYear - i));
  return (
    <SearchableDropdown
      label="Tahun Berdiri"
      placeholder="Pilih tahun berdiri..."
      value={value}
      options={years}
      onChange={onChange}
      icon={Calendar}
      required={required}
    />
  );
}

// ── City + Province paired selector ─────────────────────────────────────────
function CityProvinceSelector({
  city, province, onCityChange, onProvinceChange
}: {
  city: string;
  province: string;
  onCityChange: (c: string) => void;
  onProvinceChange: (p: string) => void;
}) {
  // Province dropdown
  const allProvinces = INDONESIA_PROVINCES.map(p => p.province);

  // Cities filtered by selected province, or all cities if no province
  const availableCities = province
    ? (INDONESIA_PROVINCES.find(p => p.province === province)?.cities ?? [])
    : ALL_CITIES.map(c => c.city);

  const handleProvinceChange = (prov: string) => {
    onProvinceChange(prov);
    // Reset city when province changes
    onCityChange('');
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <SearchableDropdown
        label="Kota Operasional"
        placeholder="Pilih kota..."
        value={city}
        options={availableCities}
        onChange={onCityChange}
        icon={MapPin}
        required
      />
      <SearchableDropdown
        label="Provinsi"
        placeholder="Pilih provinsi..."
        value={province}
        options={allProvinces}
        onChange={handleProvinceChange}
        icon={MapPin}
        required
      />
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
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
  const [opDays, setOpDays] = useState('');
  const [opStart, setOpStart] = useState('');
  const [opEnd, setOpEnd] = useState('');
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

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city || !province || !year) return;
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
        localStorage.setItem('ppjkId', 'p1');
        localStorage.setItem('ppjk_registered_email', email);
        localStorage.setItem('ppjk_registered_password', password);
        localStorage.setItem('ppjk_registered_name', companyName);
        localStorage.setItem('ppjk_registered_nib', nib);
        localStorage.setItem('ppjk_registered_address', address);
        localStorage.setItem('ppjk_registered_city', city);
        localStorage.setItem('ppjk_registered_province', province);
        localStorage.setItem('ppjk_registered_whatsapp', whatsapp.replace(/\D/g, ''));
        localStorage.setItem('ppjk_registered_year', year);
        localStorage.setItem('ppjk_registered_cost_min', costMin);
        localStorage.setItem('ppjk_registered_cost_max', costMax);
        localStorage.setItem('ppjk_registered_cost_unit', costUnit);
        localStorage.setItem('ppjk_registered_desc', description);
        localStorage.setItem('ppjk_registered_hours', opDays && opStart && opEnd ? `${opDays}, ${opStart} – ${opEnd}` : '');
        localStorage.setItem('ppjk_registered_services', JSON.stringify(selectedServices));
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
            placeholder="Masukkan nama lengkap PIC..."
            startIcon={User}
            value={picName}
            onChange={e => setPicName(e.target.value)}
            required
          />
          <Input
            label="Email Bisnis Instansi"
            type="email"
            placeholder="Masukkan email bisnis instansi..."
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
        <form onSubmit={handleStep2} className="space-y-5 animate-slide-up">
          <Input
            label="Nama Instansi / Perusahaan"
            type="text"
            placeholder="Masukkan nama PT / CV / instansi..."
            startIcon={Building2}
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
            required
          />
          <Input
            label="Nomor Izin Usaha (NIB / SIUP)"
            type="text"
            placeholder="Masukkan nomor NIB atau SIUP..."
            startIcon={FileText}
            value={nib}
            onChange={e => setNib(e.target.value)}
            required
          />

          {/* Alamat — Textarea */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[var(--color-text-primary)]">
              Alamat Lengkap Instansi
            </label>
            <textarea
              rows={3}
              placeholder="Masukkan alamat lengkap instansi / perusahaan..."
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
              className="w-full rounded-xl border border-[var(--color-border-strong)] bg-white px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-placeholder)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 focus:border-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all duration-300 resize-none"
            />
          </div>

          {/* Kota & Provinsi — searchable dropdowns */}
          <CityProvinceSelector
            city={city}
            province={province}
            onCityChange={setCity}
            onProvinceChange={setProvince}
          />

          <Input
            label="Nomor WhatsApp Bisnis"
            type="tel"
            placeholder="Masukkan nomor WhatsApp bisnis..."
            startIcon={Phone}
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
            required
          />

          {/* Tahun Berdiri — Dropdown */}
          <YearDropdown value={year} onChange={setYear} required />

          {/* Validation hint */}
          {(!city || !province || !year) && (
            <p className="text-xs text-[var(--color-text-muted)] -mt-2">
              * Pilih kota, provinsi, dan tahun berdiri untuk melanjutkan.
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-4 text-base bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 shadow-lg"
            rightIcon={<ArrowRight className="w-5 h-5" />}
            disabled={!city || !province || !year}
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
                    placeholder="Masukkan biaya minimum..."
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
                    placeholder="Masukkan biaya maksimum..."
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
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold text-[var(--color-text-primary)]">
              Jam Operasional
            </label>
            {/* Row: Hari */}
            <SearchableDropdown
              label=""
              placeholder="Pilih hari operasional..."
              value={opDays}
              options={OP_DAYS}
              onChange={setOpDays}
              icon={Calendar}
            />
            {/* Row: Jam Mulai & Jam Selesai */}
            <div className="grid grid-cols-2 gap-3">
              <SearchableDropdown
                label=""
                placeholder="Jam mulai..."
                value={opStart}
                options={OP_TIMES}
                onChange={setOpStart}
                icon={Calendar}
              />
              <SearchableDropdown
                label=""
                placeholder="Jam selesai..."
                value={opEnd}
                options={OP_TIMES}
                onChange={setOpEnd}
                icon={Calendar}
              />
            </div>
            {/* Preview */}
            {opDays && opStart && opEnd && (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-accent)]/6 border border-[var(--color-accent)]/20">
                <Calendar className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
                <span className="text-sm font-semibold text-[var(--color-accent)]">
                  {opDays}, {opStart} – {opEnd}
                </span>
              </div>
            )}
          </div>

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
