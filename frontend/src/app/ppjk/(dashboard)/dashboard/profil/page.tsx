'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Building2, MapPin, Phone, Mail, Globe, Clock,
  Users, Calendar, Save, ExternalLink, CheckCircle2,
  Warehouse, Anchor, Plane, Package, Leaf, Flame,
  FileCheck, FileText, Shield, AlertCircle, Edit3, Camera,
  Search, ChevronDown, X, Trash2, Plus, Award
} from 'lucide-react';
import { getMockPPJK } from '@/lib/mock-data';
import { cn } from '@/lib/utils/cn';

// ─── Data Provinsi & Kota Indonesia ──────────────────────────────────────────
const INDONESIA_PROVINCES = [
  { province: 'Aceh', cities: ['Banda Aceh', 'Sabang', 'Langsa', 'Lhokseumawe', 'Subulussalam', 'Meulaboh', 'Bireuen', 'Sigli', 'Takengon', 'Kutacane'] },
  { province: 'Bali', cities: ['Denpasar', 'Singaraja', 'Tabanan', 'Gianyar', 'Klungkung', 'Semarapura', 'Negara', 'Bangli', 'Amlapura', 'Ubud'] },
  { province: 'Banten', cities: ['Serang', 'Tangerang', 'Tangerang Selatan', 'Cilegon', 'Lebak', 'Pandeglang', 'Rangkasbitung', 'Serpong'] },
  { province: 'Bengkulu', cities: ['Bengkulu', 'Curup', 'Manna', 'Mukomuko', 'Tais', 'Arga Makmur'] },
  { province: 'DI Yogyakarta', cities: ['Yogyakarta', 'Sleman', 'Bantul', 'Gunung Kidul', 'Kulonprogo', 'Wonosari', 'Wates'] },
  { province: 'DKI Jakarta', cities: ['Jakarta Pusat', 'Jakarta Utara', 'Jakarta Barat', 'Jakarta Selatan', 'Jakarta Timur', 'Kepulauan Seribu'] },
  { province: 'Gorontalo', cities: ['Gorontalo', 'Limboto', 'Marisa', 'Kwandang', 'Tilamuta', 'Suwawa'] },
  { province: 'Jambi', cities: ['Jambi', 'Sungai Penuh', 'Muara Bungo', 'Kuala Tungkal', 'Sarolangun', 'Bangko', 'Muara Tebo'] },
  { province: 'Jawa Barat', cities: ['Bandung', 'Bekasi', 'Bogor', 'Cirebon', 'Depok', 'Sukabumi', 'Tasikmalaya', 'Cimahi', 'Banjar', 'Purwakarta', 'Subang', 'Karawang', 'Garut', 'Ciamis', 'Majalengka', 'Kuningan', 'Indramayu', 'Pangandaran', 'Sumedang'] },
  { province: 'Jawa Tengah', cities: ['Semarang', 'Solo', 'Surakarta', 'Magelang', 'Pekalongan', 'Salatiga', 'Tegal', 'Kudus', 'Purwokerto', 'Klaten', 'Wonosobo', 'Temanggung', 'Brebes', 'Demak', 'Grobogan', 'Jepara', 'Kendal', 'Pati', 'Purbalingga', 'Rembang', 'Sragen', 'Wonogiri', 'Blora', 'Banjarnegara', 'Batang', 'Boyolali', 'Karanganyar', 'Kebumen', 'Pemalang', 'Cilacap'] },
  { province: 'Jawa Timur', cities: ['Surabaya', 'Malang', 'Kediri', 'Blitar', 'Mojokerto', 'Madiun', 'Pasuruan', 'Probolinggo', 'Batu', 'Gresik', 'Sidoarjo', 'Jember', 'Banyuwangi', 'Lumajang', 'Jombang', 'Nganjuk', 'Tuban', 'Lamongan', 'Bojonegoro', 'Pacitan', 'Trenggalek', 'Tulungagung', 'Ponorogo', 'Ngawi', 'Magetan', 'Sampang', 'Pamekasan', 'Sumenep', 'Bangkalan', 'Bondowoso', 'Situbondo'] },
  { province: 'Kalimantan Barat', cities: ['Pontianak', 'Singkawang', 'Sambas', 'Bengkayang', 'Landak', 'Mempawah', 'Sanggau', 'Ketapang', 'Sintang', 'Kapuas Hulu', 'Melawi', 'Kayong Utara', 'Kubu Raya', 'Sekadau'] },
  { province: 'Kalimantan Selatan', cities: ['Banjarmasin', 'Banjarbaru', 'Martapura', 'Amuntai', 'Kotabaru', 'Pelaihari', 'Batulicin', 'Barabai', 'Kandangan', 'Rantau', 'Tanjung', 'Balangan', 'Tanah Laut', 'Tabalong'] },
  { province: 'Kalimantan Tengah', cities: ['Palangka Raya', 'Sampit', 'Pangkalan Bun', 'Muara Teweh', 'Buntok', 'Kuala Kurun', 'Kuala Kapuas', 'Nanga Bulik', 'Pulang Pisau', 'Tamiang Layang', 'Kasongan', 'Sukamara'] },
  { province: 'Kalimantan Timur', cities: ['Samarinda', 'Balikpapan', 'Bontang', 'Tarakan', 'Sangatta', 'Tanjung Redeb', 'Sendawar', 'Tenggarong', 'Tanah Grogot', 'Penajam'] },
  { province: 'Kalimantan Utara', cities: ['Tanjung Selor', 'Nunukan', 'Tarakan', 'Malinau', 'Bulungan', 'Tideng Pale'] },
  { province: 'Kepulauan Bangka Belitung', cities: ['Pangkalpinang', 'Sungailiat', 'Muntok', 'Toboali', 'Belinyu', 'Koba', 'Manggar', 'Tanjung Pandan'] },
  { province: 'Kepulauan Riau', cities: ['Tanjungpinang', 'Batam', 'Tanjung Balai Karimun', 'Daik', 'Ranai', 'Dabo Singkep'] },
  { province: 'Lampung', cities: ['Bandar Lampung', 'Metro', 'Kotabumi', 'Liwa', 'Kalianda', 'Blambangan Umpu', 'Menggala', 'Sukadana', 'Gunung Sugih', 'Pringsewu'] },
  { province: 'Maluku', cities: ['Ambon', 'Tual', 'Masohi', 'Amahai', 'Saumlaki', 'Namlea', 'Bula', 'Tobelo'] },
  { province: 'Maluku Utara', cities: ['Sofifi', 'Ternate', 'Tidore Kepulauan', 'Tobelo', 'Weda', 'Labuha', 'Sanana'] },
  { province: 'Nusa Tenggara Barat', cities: ['Mataram', 'Bima', 'Sumbawa Besar', 'Praya', 'Selong', 'Taliwang', 'Dompu'] },
  { province: 'Nusa Tenggara Timur', cities: ['Kupang', 'Ende', 'Ruteng', 'Labuan Bajo', 'Atambua', 'Kefamenanu', 'Kalabahi', 'Soe', 'Maumere'] },
  { province: 'Papua', cities: ['Jayapura', 'Sorong', 'Manokwari', 'Merauke', 'Nabire', 'Timika', 'Fakfak', 'Biak', 'Wamena'] },
  { province: 'Riau', cities: ['Pekanbaru', 'Dumai', 'Bengkalis', 'Selat Panjang', 'Rengat', 'Tembilahan', 'Bangkinang', 'Siak Sri Indrapura'] },
  { province: 'Sulawesi Selatan', cities: ['Makassar', 'Parepare', 'Palopo', 'Sungguminasa', 'Bulukumba', 'Watampone', 'Sengkang', 'Pinrang', 'Sidrap'] },
  { province: 'Sulawesi Tengah', cities: ['Palu', 'Luwuk', 'Poso', 'Tolitoli', 'Kolaka', 'Buol', 'Parigi', 'Donggala'] },
  { province: 'Sulawesi Tenggara', cities: ['Kendari', 'Bau-Bau', 'Raha', 'Kolaka', 'Unaaha', 'Andoolo'] },
  { province: 'Sulawesi Utara', cities: ['Manado', 'Bitung', 'Tomohon', 'Kotamobagu', 'Tondano', 'Airmadidi'] },
  { province: 'Sumatera Barat', cities: ['Padang', 'Bukittinggi', 'Padang Panjang', 'Pariaman', 'Solok', 'Sawahlunto', 'Payakumbuh'] },
  { province: 'Sumatera Selatan', cities: ['Palembang', 'Prabumulih', 'Pagaralam', 'Lubuklinggau', 'Indralaya', 'Baturaja', 'Muara Enim', 'Lahat'] },
  { province: 'Sumatera Utara', cities: ['Medan', 'Binjai', 'Tebing Tinggi', 'Pematangsiantar', 'Sibolga', 'Tanjungbalai', 'Gunungsitoli'] },
];

const ALL_CITIES = INDONESIA_PROVINCES.flatMap(p => p.cities.map(c => ({ city: c, province: p.province })));
const ALL_PROVINCES = INDONESIA_PROVINCES.map(p => p.province);

const OP_DAYS = [
  'Senin – Jumat',
  'Senin – Sabtu',
  'Senin – Minggu',
  'Selasa – Sabtu',
  'Rabu – Minggu',
  'Setiap Hari',
  'Fleksibel'
];

const OP_TIMES: string[] = [];
for (let h = 0; h <= 23; h++) {
  OP_TIMES.push(`${String(h).padStart(2, '0')}.00 WIB`);
  OP_TIMES.push(`${String(h).padStart(2, '0')}.30 WIB`);
}

const EMPLOYEE_RANGES = [
  '1-10 karyawan',
  '10-50 karyawan',
  '50-100 karyawan',
  '100-500 karyawan',
  '500+ karyawan'
];

// ─── Service Options ───────────────────────────────────────────────────────────
const SERVICE_OPTIONS = [
  { id: 'PEB', label: 'PEB', desc: 'Pemberitahuan Ekspor Barang', icon: FileCheck },
  { id: 'PIB', label: 'PIB', desc: 'Pemberitahuan Impor Barang', icon: FileText },
  { id: 'Bea Cukai', label: 'Bea Cukai', desc: 'Pengurusan kepabeanan', icon: Shield },
  { id: 'Logistik Laut', label: 'Logistik Laut', desc: 'Pengiriman via jalur laut', icon: Anchor },
  { id: 'Logistik Udara', label: 'Logistik Udara', desc: 'Pengiriman via udara', icon: Plane },
  { id: 'Pergudangan', label: 'Pergudangan', desc: 'Penyimpanan & distribusi', icon: Warehouse },
  { id: 'Asuransi Kargo', label: 'Asuransi Kargo', desc: 'Perlindungan muatan', icon: Package },
  { id: 'Karantina', label: 'Karantina', desc: 'Layanan karantina barang', icon: Leaf },
  { id: 'Fumigasi', label: 'Fumigasi', desc: 'Perlakuan phytosanitary', icon: Flame },
  { id: 'COO', label: 'Certificate of Origin', desc: 'Surat keterangan asal barang', icon: FileCheck },
];

const COVERAGE_OPTIONS = [
  'Jawa', 'Bali', 'Sumatera', 'Kalimantan',
  'Sulawesi', 'Nusa Tenggara', 'Maluku', 'Papua',
];

const COST_UNIT_OPTIONS = ['per dokumen', 'per pengiriman', 'per kontainer'];

// ─── Searchable Dropdown Component ───────────────────────────────────────────
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
    <div className="flex flex-col gap-1.5 w-full relative" ref={containerRef}>
      <label className="text-sm font-bold text-[var(--color-text-primary)]">
        {label} {required && <span className="text-[var(--color-error)]">*</span>}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={handleOpen}
          className={cn(
            "flex items-center w-full h-11 rounded-xl border bg-white px-4 text-sm transition-all duration-200 text-left",
            open
              ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20"
              : "border-[var(--color-border)]"
          )}
        >
          {Icon && <Icon className="w-4 h-4 text-[var(--color-text-muted)] mr-2.5 shrink-0" />}
          <span className={cn("flex-1 truncate", value ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-placeholder)]")}>
            {value || placeholder}
          </span>
          <span className="flex items-center gap-1.5 ml-2">
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

        {open && (
          <div className="absolute z-50 left-0 right-0 top-[calc(100%+6px)] bg-white border border-[var(--color-border)] rounded-xl shadow-xl overflow-hidden animate-fade-in max-h-64 flex flex-col">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
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
            <ul className="overflow-y-auto py-1 flex-1">
              {filtered.length === 0 ? (
                <li className="px-4 py-3 text-sm text-[var(--color-text-muted)] text-center">Tidak ditemukan</li>
              ) : (
                filtered.map((opt, idx) => (
                  <li key={`${opt}-${idx}`}>
                    <button
                      type="button"
                      onClick={() => handleSelect(opt)}
                      className={cn(
                        "w-full text-left px-4 py-2 text-sm transition-colors hover:bg-[var(--color-primary)]/5 truncate",
                        opt === value
                          ? "text-[var(--color-primary)] font-bold bg-[var(--color-primary)]/8"
                          : "text-[var(--color-text-primary)] font-medium"
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

// ─── Form Input (Basic) ───────────────────────────────────────────────────────
function FormInput({
  label, value, onChange, placeholder = '', type = 'text',
  icon: Icon, hint, required = false, textarea = false, rows = 3,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string;
  icon?: React.ComponentType<{ className?: string }>;
  hint?: string; required?: boolean; textarea?: boolean; rows?: number;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-bold text-[var(--color-text-primary)]">
        {label}
        {required && <span className="text-[var(--color-error)] ml-0.5">*</span>}
      </label>
      <div className="relative">
        {Icon && !textarea && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
        )}
        {textarea ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            className="w-full px-4 py-2.5 text-sm border border-[var(--color-border)] rounded-xl bg-white text-[var(--color-text-primary)] placeholder:text-[var(--color-text-placeholder)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] transition-all resize-none"
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            className={cn(
              'w-full py-2.5 text-sm border border-[var(--color-border)] rounded-xl bg-white text-[var(--color-text-primary)] placeholder:text-[var(--color-text-placeholder)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] transition-all',
              Icon ? 'pl-9 pr-4' : 'px-4',
            )}
          />
        )}
      </div>
      {hint && <p className="text-xs text-[var(--color-text-muted)]">{hint}</p>}
    </div>
  );
}

// ─── Section Card ──────────────────────────────────────────────────────────────
function SectionCard({
  title, children, icon: Icon,
}: {
  title: string; children: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="bg-white border border-[var(--color-border)] rounded-2xl shadow-sm">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-bg-subtle)] rounded-t-2xl">
        <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-[var(--color-primary)]" />
        </div>
        <h2 className="text-sm font-bold text-[var(--color-text-primary)]">{title}</h2>
      </div>
      <div className="p-6 flex flex-col gap-5">{children}</div>
    </div>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────
export default function PPJKProfilPage() {
  const [ppjkId, setPpjkId] = useState<string>('p1');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Basic States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [website, setWebsite] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [description, setDescription] = useState('');

  // Dropdown States
  const [establishedYear, setEstablishedYear] = useState('');
  const [employeeCount, setEmployeeCount] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');

  // Jam Operasional States (split to match registration flow)
  const [opDays, setOpDays] = useState('');
  const [opStart, setOpStart] = useState('');
  const [opEnd, setOpEnd] = useState('');

  // Certifications list state
  const [certsList, setCertsList] = useState<{ name: string; imageUrl?: string }[]>([]);
  const [newCertName, setNewCertName] = useState('');
  const [newCertImage, setNewCertImage] = useState<string | null>(null);

  const [estimatedCostMin, setEstimatedCostMin] = useState('');
  const [estimatedCostMax, setEstimatedCostMax] = useState('');
  const [costUnit, setCostUnit] = useState('per dokumen');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedCoverage, setSelectedCoverage] = useState<string[]>([]);

  // Years option (current down to 1900)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => String(currentYear - i));

  // Cities filtered by selected province
  const availableCities = province
    ? (INDONESIA_PROVINCES.find(p => p.province === province)?.cities ?? [])
    : ALL_CITIES.map(c => c.city);

  // Helper to parse combined hours string
  const parseOperationalHours = (hoursStr: string) => {
    if (!hoursStr) return;
    const parts = hoursStr.split(',');
    if (parts.length >= 2) {
      setOpDays(parts[0].trim());
      const timePart = parts[1].trim();
      const timeSubparts = timePart.split(/–|-/);
      if (timeSubparts.length >= 2) {
        let start = timeSubparts[0].trim();
        let end = timeSubparts[1].trim();
        if (!start.endsWith('WIB')) start += ' WIB';
        if (!end.endsWith('WIB')) end += ' WIB';
        setOpStart(start);
        setOpEnd(end);
      }
    } else {
      setOpDays(hoursStr);
    }
  };

  // Helper to parse certifications array (strings or objects)
  const parseCertifications = (certs: any) => {
    if (!certs) return [];
    if (typeof certs === 'string') {
      return certs.split(',').map(c => ({ name: c.trim() })).filter(c => c.name);
    }
    if (Array.isArray(certs)) {
      return certs.map(c => {
        if (typeof c === 'string') {
          return { name: c };
        }
        return c;
      });
    }
    return [];
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const id = localStorage.getItem('ppjkId') || 'p1';
    setPpjkId(id);

    // Priority 1: previously saved edits
    const savedProfile = localStorage.getItem('ppjk_profile_edited');
    if (savedProfile) {
      try {
        const p = JSON.parse(savedProfile);
        setName(p.name || '');
        setEmail(p.email || '');
        setWhatsapp(p.whatsapp || '');
        setWebsite(p.website || '');
        setFullAddress(p.fullAddress || '');
        setProvince(p.province || '');
        setCity(p.city || '');
        setDescription(p.description || '');
        setEstablishedYear(String(p.establishedYear || ''));
        setEmployeeCount(p.employeeCount || '');
        parseOperationalHours(p.operationalHours || '');
        setCertsList(parseCertifications(p.certifications));
        setEstimatedCostMin(String(p.estimatedCostMin || ''));
        setEstimatedCostMax(String(p.estimatedCostMax || ''));
        setCostUnit(p.costUnit || 'per dokumen');
        setSelectedServices(p.services || []);
        setSelectedCoverage(p.coverageArea || []);
        return;
      } catch { /* fall through */ }
    }

    // Priority 2: registration data (new user)
    const regEmail = localStorage.getItem('ppjk_registered_email');
    if (regEmail) {
      setName(localStorage.getItem('ppjk_registered_name') || '');
      setEmail(regEmail);
      setWhatsapp(localStorage.getItem('ppjk_registered_whatsapp') || '');
      setFullAddress(localStorage.getItem('ppjk_registered_address') || '');
      setProvince(localStorage.getItem('ppjk_registered_province') || '');
      setCity(localStorage.getItem('ppjk_registered_city') || '');
      setDescription(localStorage.getItem('ppjk_registered_desc') || '');
      setEstablishedYear(localStorage.getItem('ppjk_registered_year') || '');
      parseOperationalHours(localStorage.getItem('ppjk_registered_hours') || '');
      setCertsList([]);
      setEstimatedCostMin(localStorage.getItem('ppjk_registered_cost_min') || '');
      setEstimatedCostMax(localStorage.getItem('ppjk_registered_cost_max') || '');
      setCostUnit(localStorage.getItem('ppjk_registered_cost_unit') || 'per dokumen');
      const svcs = localStorage.getItem('ppjk_registered_services');
      setSelectedServices(svcs ? JSON.parse(svcs) : []);
      return;
    }

    // Priority 3: mock data
    const mock = getMockPPJK(id);
    if (mock) {
      setName(mock.name);
      setEmail(mock.email);
      setWhatsapp(mock.whatsapp);
      setWebsite(mock.socialMedia?.website || '');
      setFullAddress(mock.fullAddress);
      setProvince(mock.province);
      setCity(mock.city);
      setDescription(mock.description);
      setEstablishedYear(String(mock.establishedYear));
      setEmployeeCount(mock.employeeCount);
      parseOperationalHours(mock.operationalHours);
      setCertsList(parseCertifications(mock.certifications));
      setEstimatedCostMin(String(mock.estimatedCostMin));
      setEstimatedCostMax(String(mock.estimatedCostMax));
      setCostUnit(mock.costUnit);
      setSelectedServices(mock.services);
      setSelectedCoverage(mock.coverageArea);
    }
  }, []);

  const toggleService = (id: string) =>
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );

  const toggleCoverage = (area: string) =>
    setSelectedCoverage((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area],
    );

  // File input handler for base64 certification image upload
  const handleCertImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1024 * 1024 * 2) {
      alert('File gambar terlalu besar. Batas maksimal adalah 2 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setNewCertImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const addCertification = () => {
    if (!newCertName.trim()) return;
    setCertsList(prev => [...prev, { name: newCertName.trim(), imageUrl: newCertImage || undefined }]);
    setNewCertName('');
    setNewCertImage(null);
    const fileInput = document.getElementById('cert-image-input') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const removeCertification = (index: number) => {
    setCertsList(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');

    const combinedHours = opDays && opStart && opEnd ? `${opDays}, ${opStart} – ${opEnd}` : opDays;

    const data = {
      name, email, whatsapp, website, fullAddress, city, province, description,
      establishedYear: Number(establishedYear), employeeCount,
      operationalHours: combinedHours,
      certifications: certsList,
      estimatedCostMin: Number(estimatedCostMin),
      estimatedCostMax: Number(estimatedCostMax),
      costUnit, services: selectedServices, coverageArea: selectedCoverage,
    };

    setTimeout(() => {
      localStorage.setItem('ppjk_profile_edited', JSON.stringify(data));
      localStorage.setItem('ppjk_registered_name', name);
      localStorage.setItem('ppjk_registered_email', email);
      localStorage.setItem('ppjk_registered_whatsapp', whatsapp);
      localStorage.setItem('ppjk_registered_city', city);
      localStorage.setItem('ppjk_registered_province', province);
      localStorage.setItem('ppjk_registered_address', fullAddress);
      localStorage.setItem('ppjk_registered_desc', description);
      localStorage.setItem('ppjk_registered_year', establishedYear);
      localStorage.setItem('ppjk_registered_hours', combinedHours);
      localStorage.setItem('ppjk_registered_cost_min', estimatedCostMin);
      localStorage.setItem('ppjk_registered_cost_max', estimatedCostMax);
      localStorage.setItem('ppjk_registered_cost_unit', costUnit);
      localStorage.setItem('ppjk_registered_services', JSON.stringify(selectedServices));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }, 800);
  };

  const formatRp = (v: string) => {
    const n = Number(v);
    if (!n) return '-';
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);
  };

  const publicUrl = ppjkId === 'profil-ppjk' ? '/ppjk/profil-ppjk' : `/ppjk/${ppjkId}`;
  const combinedHours = opDays && opStart && opEnd ? `${opDays}, ${opStart} – ${opEnd}` : opDays;

  return (
    <div className="min-h-full bg-[var(--color-bg-base)]">
      {/* Sticky Page Header */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-[var(--color-border)] px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">Profil Instansi</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">Kelola informasi publik perusahaan Anda</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={publicUrl}
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all duration-200"
          >
            <ExternalLink className="w-4 h-4" />
            Lihat Profil Publik
          </Link>
          <button
            type="submit"
            form="profil-form"
            disabled={saveStatus === 'saving'}
            className={cn(
              'inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold text-white transition-all duration-200 shadow-sm',
              saveStatus === 'saved'
                ? 'bg-[var(--color-success)] shadow-[var(--color-success)]/20'
                : 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] shadow-[var(--color-primary)]/20',
              saveStatus === 'saving' && 'opacity-75 cursor-not-allowed',
            )}
          >
            {saveStatus === 'saving' ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Menyimpan…
              </>
            ) : saveStatus === 'saved' ? (
              <><CheckCircle2 className="w-4 h-4" />Tersimpan!</>
            ) : (
              <><Save className="w-4 h-4" />Simpan Perubahan</>
            )}
          </button>
        </div>
      </div>

      <form id="profil-form" onSubmit={handleSave}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ─── LEFT: Form Sections ─── */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Cover + Logo */}
            <div className="bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-sm">
              <div
                className="h-32 w-full relative"
                style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)' }}
              >
                <button
                  type="button"
                  className="absolute bottom-3 right-3 flex items-center gap-1.5 text-xs font-bold bg-white/90 backdrop-blur-sm text-[var(--color-text-primary)] px-3 py-1.5 rounded-lg shadow hover:bg-white transition-all"
                >
                  <Camera className="w-3.5 h-3.5" /> Ganti Foto Sampul
                </button>
              </div>
              <div className="px-6 pb-5">
                <div className="w-20 h-20 -mt-10 rounded-2xl bg-[var(--color-bg-subtle)] border-4 border-white shadow-lg flex items-center justify-center relative">
                  <Building2 className="w-9 h-9 text-[var(--color-text-muted)]" />
                  <button
                    type="button"
                    className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center shadow-md hover:bg-[var(--color-primary-hover)] transition-colors"
                  >
                    <Edit3 className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-xs text-[var(--color-text-muted)] mt-3">Format: JPG, PNG · Maks 2 MB · Disarankan 400×400 px</p>
              </div>
            </div>

            {/* Informasi Umum */}
            <SectionCard title="Informasi Umum" icon={Building2}>
              <FormInput label="Nama Instansi / Perusahaan" value={name} onChange={setName}
                placeholder="PT Logistik Global Mandiri" icon={Building2} required />
              
              <FormInput label="Deskripsi Perusahaan" value={description} onChange={setDescription}
                placeholder="Ceritakan keunggulan dan pengalaman perusahaan Anda…" textarea rows={4} />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SearchableDropdown
                  label="Tahun Berdiri"
                  placeholder="Pilih tahun berdiri..."
                  value={establishedYear}
                  options={yearOptions}
                  onChange={setEstablishedYear}
                  icon={Calendar}
                />
                <SearchableDropdown
                  label="Jumlah Karyawan"
                  placeholder="Pilih jumlah karyawan..."
                  value={employeeCount}
                  options={EMPLOYEE_RANGES}
                  onChange={setEmployeeCount}
                  icon={Users}
                />
              </div>

              {/* Jam Operasional (Layout match register flow) */}
              <div className="flex flex-col gap-3.5 border-t border-[var(--color-border)] pt-4 mt-2">
                <span className="text-sm font-bold text-[var(--color-text-primary)]">Jam Operasional</span>
                
                <SearchableDropdown
                  label="Hari Operasional"
                  placeholder="Pilih hari operasional..."
                  value={opDays}
                  options={OP_DAYS}
                  onChange={setOpDays}
                  icon={Calendar}
                />
                
                <div className="grid grid-cols-2 gap-3">
                  <SearchableDropdown
                    label="Jam Mulai"
                    placeholder="Jam mulai..."
                    value={opStart}
                    options={OP_TIMES}
                    onChange={setOpStart}
                    icon={Clock}
                  />
                  <SearchableDropdown
                    label="Jam Selesai"
                    placeholder="Jam selesai..."
                    value={opEnd}
                    options={OP_TIMES}
                    onChange={setOpEnd}
                    icon={Clock}
                  />
                </div>
                {opDays && opStart && opEnd && (
                  <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[var(--color-primary)]/[0.04] border border-[var(--color-primary)]/10 text-sm font-bold text-[var(--color-primary)]">
                    <Clock className="w-4 h-4" />
                    <span>Hasil: {opDays}, {opStart} – {opEnd}</span>
                  </div>
                )}
              </div>
            </SectionCard>

            {/* Kontak */}
            <SectionCard title="Informasi Kontak" icon={Phone}>
              <FormInput label="Email Bisnis" value={email} onChange={setEmail}
                type="email" placeholder="info@perusahaan.co.id" icon={Mail} required />
              <FormInput label="Nomor WhatsApp" value={whatsapp} onChange={setWhatsapp}
                type="tel" placeholder="6281234567890" icon={Phone}
                hint="Format internasional tanpa + (contoh: 6281234567890)" />
              <FormInput label="Website" value={website} onChange={setWebsite}
                placeholder="https://perusahaan.co.id" icon={Globe} />
            </SectionCard>

            {/* Lokasi */}
            <SectionCard title="Lokasi & Alamat" icon={MapPin}>
              <FormInput label="Alamat Lengkap" value={fullAddress} onChange={setFullAddress}
                placeholder="Jl. Pelabuhan Raya No. 12, Tanjung Priok…" textarea rows={2} />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SearchableDropdown
                  label="Provinsi"
                  placeholder="Pilih provinsi..."
                  value={province}
                  options={ALL_PROVINCES}
                  onChange={(p) => {
                    setProvince(p);
                    setCity('');
                  }}
                  icon={MapPin}
                  required
                />
                <SearchableDropdown
                  label="Kota Operasional"
                  placeholder="Pilih kota..."
                  value={city}
                  options={availableCities}
                  onChange={setCity}
                  icon={MapPin}
                  required
                />
              </div>
            </SectionCard>

            {/* Layanan */}
            <SectionCard title="Layanan yang Disediakan" icon={FileCheck}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICE_OPTIONS.map((svc) => {
                  const Icon = svc.icon;
                  const isSelected = selectedServices.includes(svc.id);
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => toggleService(svc.id)}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-200',
                        isSelected
                          ? 'border-[var(--color-primary)] bg-[var(--color-primary-subtle)] text-[var(--color-primary)]'
                          : 'border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-bg-subtle)]',
                      )}
                    >
                      <div className={cn(
                        'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors',
                        isSelected ? 'bg-[var(--color-primary)]/15' : 'bg-[var(--color-bg-subtle)]',
                      )}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold leading-tight">{svc.label}</p>
                        <p className="text-xs text-[var(--color-text-muted)] truncate">{svc.desc}</p>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 ml-auto shrink-0 text-[var(--color-primary)]" />}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-[var(--color-text-muted)]">{selectedServices.length} layanan dipilih</p>
            </SectionCard>

            {/* Estimasi Biaya */}
            <SectionCard title="Estimasi Biaya" icon={FileText}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Biaya Minimum', val: estimatedCostMin, set: setEstimatedCostMin, ph: '500000' },
                  { label: 'Biaya Maksimum', val: estimatedCostMax, set: setEstimatedCostMax, ph: '2000000' },
                ].map(({ label, val, set, ph }) => (
                  <div key={label} className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-[var(--color-text-primary)]">{label}</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-[var(--color-text-muted)]">Rp</span>
                      <input type="number" value={val} onChange={(e) => set(e.target.value)} placeholder={ph}
                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-[var(--color-border)] rounded-xl bg-white text-[var(--color-text-primary)] placeholder:text-[var(--color-text-placeholder)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] transition-all" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[var(--color-text-primary)]">Satuan Biaya</label>
                <select value={costUnit} onChange={(e) => setCostUnit(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-[var(--color-border)] rounded-xl bg-white text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] transition-all">
                  {COST_UNIT_OPTIONS.map((u) => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
            </SectionCard>

            {/* Area Cakupan */}
            <SectionCard title="Area Cakupan" icon={MapPin}>
              <div className="flex flex-wrap gap-2">
                {COVERAGE_OPTIONS.map((area) => {
                  const isSelected = selectedCoverage.includes(area);
                  return (
                    <button
                      key={area}
                      type="button"
                      onClick={() => toggleCoverage(area)}
                      className={cn(
                        'px-4 py-2 rounded-full text-sm font-bold border transition-all duration-200',
                        isSelected
                          ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-sm'
                          : 'bg-white border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]',
                      )}
                    >
                      {area}
                    </button>
                  );
                })}
              </div>
            </SectionCard>

            {/* Sertifikasi */}
            <SectionCard title="Sertifikasi & Akreditasi" icon={Shield}>
              {/* Form Tambah Sertifikat */}
              <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] block">Tambah Sertifikasi Baru</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormInput
                    label="Nama Sertifikat"
                    value={newCertName}
                    onChange={setNewCertName}
                    placeholder="Contoh: ISO 9001:2015"
                  />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-[var(--color-text-primary)]">Upload Foto Bukti</label>
                    <input
                      id="cert-image-input"
                      type="file"
                      accept="image/*"
                      onChange={handleCertImageChange}
                      className="w-full text-xs file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[var(--color-primary)] file:text-white hover:file:opacity-90 file:cursor-pointer"
                    />
                  </div>
                </div>

                {newCertImage && (
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-[var(--color-border)]">
                    <img src={newCertImage} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setNewCertImage(null)}
                      className="absolute top-1 right-1 p-0.5 rounded-full bg-black/60 text-white hover:bg-black"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  onClick={addCertification}
                  disabled={!newCertName.trim()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" /> Tambah Sertifikat
                </button>
              </div>

              {/* List Sertifikat Aktif */}
              <div className="space-y-3 mt-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] block">Daftar Sertifikat Terpasang</span>
                {certsList.length === 0 ? (
                  <p className="text-sm text-[var(--color-text-placeholder)] italic">Belum ada sertifikasi terpasang.</p>
                ) : (
                  <div className="flex flex-col gap-2.5">
                    {certsList.map((cert, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-[var(--color-border)] bg-white shadow-sm">
                        <div className="flex items-center gap-3">
                          {cert.imageUrl ? (
                            <img src={cert.imageUrl} alt={cert.name} className="w-10 h-10 object-cover rounded-lg border border-[var(--color-border)] shrink-0" />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center shrink-0">
                              <Award className="w-5 h-5" />
                            </div>
                          )}
                          <span className="text-sm font-bold text-[var(--color-text-primary)]">{cert.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeCertification(idx)}
                          className="p-2 rounded-xl hover:bg-[var(--color-error)]/5 text-[var(--color-text-muted)] hover:text-[var(--color-error)] transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </SectionCard>
          </div>

          {/* ─── RIGHT: Live Preview Sidebar ─── */}
          <div className="flex flex-col gap-4">
            <div className="sticky top-4">
              <div className="bg-white border border-[var(--color-border)] rounded-2xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg-subtle)] flex items-center justify-between">
                  <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pratinjau Profil</p>
                  <span className="text-[10px] font-medium text-[var(--color-success)] bg-[var(--color-success-light)] px-2 py-0.5 rounded-full">Live</span>
                </div>
                <div className="p-5 flex flex-col gap-4">
                  {/* Header mini */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-subtle)] border border-[var(--color-border)] flex items-center justify-center shrink-0">
                      <Building2 className="w-6 h-6 text-[var(--color-text-muted)]" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-[var(--color-text-primary)] truncate leading-tight">
                        {name || <span className="text-[var(--color-text-placeholder)]">Nama Instansi</span>}
                      </p>
                      <p className="text-xs text-[var(--color-text-muted)] truncate mt-0.5">
                        {city && province
                          ? `${city}, ${province}`
                          : city || province || (
                            <span className="text-[var(--color-text-placeholder)]">Lokasi belum diisi</span>
                          )}
                      </p>
                    </div>
                  </div>

                  {/* Services */}
                  {selectedServices.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {selectedServices.slice(0, 4).map((s) => (
                        <span key={s} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--color-primary-subtle)] text-[var(--color-primary)] border border-[var(--color-primary)]/15">{s}</span>
                      ))}
                      {selectedServices.length > 4 && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--color-bg-subtle)] text-[var(--color-text-muted)]">+{selectedServices.length - 4}</span>
                      )}
                    </div>
                  )}

                  {/* Cost */}
                  {estimatedCostMin && estimatedCostMax && (
                    <div className="pt-3 border-t border-[var(--color-border)]">
                      <p className="text-[10px] font-semibold text-[var(--color-text-muted)] mb-1 uppercase tracking-wider">Estimasi Biaya</p>
                      <p className="text-sm font-bold text-[var(--color-primary)] font-mono">
                        {formatRp(estimatedCostMin)} – {formatRp(estimatedCostMax)}
                      </p>
                      <p className="text-[10px] text-[var(--color-text-muted)]">{costUnit}</p>
                    </div>
                  )}

                  {/* Operational Details (Preview) */}
                  {(combinedHours || employeeCount || establishedYear) && (
                    <div className="pt-3 border-t border-[var(--color-border)] space-y-2.5 text-xs text-[var(--color-text-secondary)] font-medium">
                      {establishedYear && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0" />
                          <span>Tahun Berdiri: {establishedYear}</span>
                        </div>
                      )}
                      {employeeCount && (
                        <div className="flex items-center gap-2">
                          <Users className="w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0" />
                          <span>Skala: {employeeCount}</span>
                        </div>
                      )}
                      {combinedHours && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0" />
                          <span className="truncate">Jam Kerja: {combinedHours}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Certifications Preview */}
                  {certsList.length > 0 && (
                    <div className="pt-3 border-t border-[var(--color-border)]">
                      <p className="text-[10px] font-semibold text-[var(--color-text-muted)] mb-1.5 uppercase tracking-wider">Sertifikasi ({certsList.length})</p>
                      <div className="flex flex-wrap gap-1">
                        {certsList.slice(0, 3).map((c, i) => (
                          <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                            {c.name}
                          </span>
                        ))}
                        {certsList.length > 3 && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--color-bg-subtle)] text-[var(--color-text-muted)]">+{certsList.length - 3}</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Coverage */}
                  {selectedCoverage.length > 0 && (
                    <div className="pt-3 border-t border-[var(--color-border)]">
                      <p className="text-[10px] font-semibold text-[var(--color-text-muted)] mb-1.5 uppercase tracking-wider">Area Cakupan</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedCoverage.map((a) => (
                          <span key={a} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] border border-[var(--color-border)]">{a}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <Link
                    href={publicUrl}
                    target="_blank"
                    className="mt-1 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-200"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Buka Profil Publik
                  </Link>
                </div>
              </div>

              {/* Info tip */}
              <div className="mt-4 p-4 rounded-xl border border-[var(--color-info)]/20 bg-[var(--color-info-light)] flex gap-3">
                <AlertCircle className="w-4 h-4 text-[var(--color-info)] shrink-0 mt-0.5" />
                <p className="text-xs text-[var(--color-info)] leading-relaxed font-medium">
                  Profil yang lengkap meningkatkan peluang ditemukan eksportir hingga <strong>3×</strong> lebih tinggi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
