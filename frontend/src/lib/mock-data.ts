export interface DemoMessage {
  id: string;
  from: 'buyer' | 'seller' | 'system';
  lang?: 'zh' | 'id' | 'en' | 'ja' | 'ai';
  content: string;
  translatedContent?: string;
  timestamp: string;
  type?: 'original' | 'translated' | 'corrected' | 'sent' | 'product_card' | 'deal';
  productInfo?: {
    title: string;
    image: string;
    seller: string;
    moq: string;
    price: string;
    specs: string;
  };
}

export interface MockProduct {
  id: string;
  slug: string;
  name: string;
  sellerId: string;
  sellerName: string;
  photoUrl: string;
  moq: number;
  minPrice: number;
  maxPrice: number;
  category: string;
  isVerified: boolean;
}

export interface MockUMKM {
  id: string;
  slug: string;
  name: string;
  ownerName: string;
  nibNumber: string;
  isNibVerified: boolean;
  category: string;
  city: string;
  province: string;
  fullAddress: string;
  description: string;
  establishedYear: number;
  employeeCount: string;
  productionCapacity: string;
  certifications: string[];
  exportCountries: string[];
  bannerUrl: string;
  logoUrl?: string;
  whatsapp: string;
  email: string;
  website?: string;
}

export const MOCK_UMKM: MockUMKM[] = [
  {
    id: 'umkm-001',
    slug: 'kopi-nusantara-abadi',
    name: 'Kopi Nusantara Abadi',
    ownerName: 'Budi Santoso',
    nibNumber: '9120001827364',
    isNibVerified: true,
    category: 'Food & Beverage',
    city: 'Takengon',
    province: 'Aceh',
    fullAddress: 'Jl. Pegasing No. 45, Takengon, Aceh Tengah 24511',
    description: 'Kopi Nusantara Abadi adalah produsen dan eksportir kopi arabika specialty unggulan dari Dataran Tinggi Gayo, Aceh. Kami mengelola perkebunan kopi organik seluas 25 hektar yang dikerjakan secara berkelanjutan bersama kelompok tani lokal.',
    establishedYear: 2018,
    employeeCount: '25-50 karyawan',
    productionCapacity: '15,000 kg / bulan',
    certifications: ['ISO 9001:2015', 'BPOM', 'Halal MUI', 'Fairtrade Certified', 'USDA Organic'],
    exportCountries: ['Amerika Serikat', 'Jepang', 'Jerman', 'Singapura'],
    bannerUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    whatsapp: '6281234567890',
    email: 'contact@kopinusantaraabadi.com',
    website: 'https://kopinusantaraabadi.com'
  },
  {
    id: 'umkm-002',
    slug: 'bali-rattan-craft',
    name: 'Bali Rattan Craft',
    ownerName: 'I Wayan Sudarma',
    nibNumber: '9120009876543',
    isNibVerified: true,
    category: 'Furniture',
    city: 'Gianyar',
    province: 'Bali',
    fullAddress: 'Jl. Raya Tegallalang No. 88, Gianyar, Bali 80561',
    description: 'Produsen kerajinan rotan alami dan mebel eco-friendly asli buatan perajin Bali. Spesialisasi kami adalah desain furnitur rotan kontemporer berkualitas tinggi yang siap ekspor.',
    establishedYear: 2015,
    employeeCount: '30-60 karyawan',
    productionCapacity: '2,000 unit / bulan',
    certifications: ['SVLK Certified', 'ISO 14001:2015'],
    exportCountries: ['Australia', 'Prancis', 'Belanda', 'Amerika Serikat'],
    bannerUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    whatsapp: '6281987654321',
    email: 'info@balirattancraft.id',
    website: 'https://balirattancraft.id'
  },
  {
    id: 'umkm-003',
    slug: 'batik-pusaka-solo',
    name: 'Batik Pusaka Solo',
    ownerName: 'Siti Rahmawati',
    nibNumber: '9120005544332',
    isNibVerified: false,
    category: 'Fashion & Textile',
    city: 'Surakarta',
    province: 'Jawa Tengah',
    fullAddress: 'Jl. Laweyan No. 12, Solo, Jawa Tengah 57148',
    description: 'Rumah produksi kain batik tulis sutra dan katun tradisional Solo dengan teknik pewarnaan alami eksklusif.',
    establishedYear: 2012,
    employeeCount: '15-30 karyawan',
    productionCapacity: '500 lembar / bulan',
    certifications: ['Batikmark Indonesia', 'OEKO-TEX Standard 100'],
    exportCountries: ['Jepang', 'Malaysia', 'Singapura'],
    bannerUrl: 'https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    whatsapp: '6281345678901',
    email: 'admin@batikpusakasolo.com'
  },
  {
    id: 'umkm-004',
    slug: 'rempah-maluku-jaya',
    name: 'Rempah Maluku Jaya',
    ownerName: 'Mas Darmawan',
    nibNumber: '9120006677889',
    isNibVerified: true,
    category: 'Agriculture',
    city: 'Banda Neira',
    province: 'Maluku',
    fullAddress: 'Jl. Pelabuhan Banda No. 3, Maluku Tengah 97586',
    description: 'Pemasok dan pengolah rempah-rempah organik kualitas ekspor utama dari Kepulauan Banda (biji pala, mace, dan cengkeh).',
    establishedYear: 2019,
    employeeCount: '20-40 karyawan',
    productionCapacity: '25,000 kg / bulan',
    certifications: ['BPOM', 'Halal MUI', 'HACCP Certified'],
    exportCountries: ['Uni Emirat Arab', 'India', 'Belanda'],
    bannerUrl: 'https://images.unsplash.com/photo-1596647185078-433e2dd7bb84?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    whatsapp: '6281456789012',
    email: 'sales@rempahmalukujaya.com'
  },
  {
    id: 'umkm-005',
    slug: 'atsiri-sumatera',
    name: 'Atsiri Sumatera',
    ownerName: 'Taufik Hidayat',
    nibNumber: '9120007788990',
    isNibVerified: true,
    category: 'Health & Beauty',
    city: 'Medan',
    province: 'Sumatera Utara',
    fullAddress: 'Jl. Gatot Subroto No. 102, Medan, Sumatera Utara 20118',
    description: 'Produsen minyak atsiri (essential oil) 100% murni khususnya Patchouli (Nilam) dari perkebunan Sumatera.',
    establishedYear: 2017,
    employeeCount: '15-25 karyawan',
    productionCapacity: '3,000 liter / bulan',
    certifications: ['ISO 9001:2015', 'Halal MUI'],
    exportCountries: ['Prancis', 'Amerika Serikat', 'Singapura'],
    bannerUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    whatsapp: '6281567890123',
    email: 'info@atsirisumatera.com'
  },
  {
    id: 'umkm-006',
    slug: 'garut-leather-craft',
    name: 'Garut Leather Craft',
    ownerName: 'Asep Ridwan',
    nibNumber: '9120001122334',
    isNibVerified: false,
    category: 'Fashion & Textile',
    city: 'Garut',
    province: 'Jawa Barat',
    fullAddress: 'Jl. Sukaregang No. 44, Garut, Jawa Barat 44111',
    description: 'Pengrajin spesialis barang kulit sapi asli Garut secara handmade.',
    establishedYear: 2014,
    employeeCount: '20-35 karyawan',
    productionCapacity: '1,500 unit / bulan',
    certifications: ['SNI Leather'],
    exportCountries: ['Malaysia', 'Brunei', 'Jepang'],
    bannerUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    whatsapp: '6281678901234',
    email: 'sales@garutleather.id'
  },
  {
    id: 'umkm-007',
    slug: 'cemilan-nusantara',
    name: 'Cemilan Nusantara',
    ownerName: 'Dewi Lestari',
    nibNumber: '9120002233445',
    isNibVerified: true,
    category: 'Food & Beverage',
    city: 'Malang',
    province: 'Jawa Timur',
    fullAddress: 'Jl. Raya Singosari No. 15, Malang, Jawa Timur 65153',
    description: 'Produsen camilan olahan tempe dan buah-buahan lokal dengan teknologi vacuum frying modern.',
    establishedYear: 2020,
    employeeCount: '40-80 karyawan',
    productionCapacity: '50,000 bungkus / bulan',
    certifications: ['BPOM', 'Halal MUI'],
    exportCountries: ['Hong Kong', 'Taiwan', 'Singapura'],
    bannerUrl: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    whatsapp: '6281789012345',
    email: 'export@cemilannusantara.co.id'
  },
  {
    id: 'umkm-008',
    slug: 'jepara-wood-art',
    name: 'Jepara Wood Art',
    ownerName: 'Bambang Utomo',
    nibNumber: '9120003344556',
    isNibVerified: true,
    category: 'Furniture',
    city: 'Jepara',
    province: 'Jawa Tengah',
    fullAddress: 'Jl. Tahunan No. 7, Jepara, Jawa Tengah 59427',
    description: 'Sentra ukiran dan mebel kayu jati solid legendaris Jepara.',
    establishedYear: 2010,
    employeeCount: '50-100 karyawan',
    productionCapacity: '500 set / bulan',
    certifications: ['SVLK Certified'],
    exportCountries: ['Amerika Serikat', 'Inggris', 'Uni Emirat Arab'],
    bannerUrl: 'https://images.unsplash.com/photo-1611078810793-1e5b12361664?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    whatsapp: '6281890123456',
    email: 'info@jeparawoodart.com'
  }
];

export const MOCK_PRODUCTS: MockProduct[] = [
  {
    id: 'prod-001',
    slug: 'kopi-arabika-gayo-specialty',
    name: 'Kopi Arabika Gayo Specialty',
    sellerId: 'umkm-001',
    sellerName: 'Kopi Nusantara Abadi',
    photoUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800',
    moq: 500,
    minPrice: 135000,
    maxPrice: 145000,
    category: 'Food & Beverage',
    isVerified: true,
  },
  {
    id: 'prod-002',
    slug: 'kerajinan-rotan-bali',
    name: 'Set Kursi Rotan Minimalis',
    sellerId: 'umkm-002',
    sellerName: 'Bali Rattan Craft',
    photoUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    moq: 10,
    minPrice: 750000,
    maxPrice: 1200000,
    category: 'Furniture',
    isVerified: true,
  },
  {
    id: 'prod-003',
    slug: 'batik-tulis-sutra',
    name: 'Kain Batik Tulis Sutra Halus',
    sellerId: 'umkm-003',
    sellerName: 'Batik Pusaka Solo',
    photoUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
    moq: 20,
    minPrice: 500000,
    maxPrice: 850000,
    category: 'Fashion & Textile',
    isVerified: false,
  },
  {
    id: 'prod-004',
    slug: 'rempah-pala-banda',
    name: 'Biji Pala Organik Banda',
    sellerId: 'umkm-004',
    sellerName: 'Rempah Maluku Jaya',
    photoUrl: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80',
    moq: 100,
    minPrice: 85000,
    maxPrice: 110000,
    category: 'Agriculture',
    isVerified: true,
  },
  {
    id: 'prod-005',
    slug: 'minyak-atsiri-nilam',
    name: 'Patchouli Essential Oil 100% Pure',
    sellerId: 'umkm-005',
    sellerName: 'Atsiri Sumatera',
    photoUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    moq: 5,
    minPrice: 1200000,
    maxPrice: 1500000,
    category: 'Health & Beauty',
    isVerified: true,
  },
  {
    id: 'prod-006',
    slug: 'tas-kulit-garut',
    name: 'Tas Kulit Sapi Asli Handmade',
    sellerId: 'umkm-006',
    sellerName: 'Garut Leather Craft',
    photoUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    moq: 15,
    minPrice: 350000,
    maxPrice: 550000,
    category: 'Fashion & Textile',
    isVerified: false,
  },
  {
    id: 'prod-007',
    slug: 'keripik-tempe-ekspor',
    name: 'Keripik Tempe Aneka Rasa',
    sellerId: 'umkm-007',
    sellerName: 'Cemilan Nusantara',
    photoUrl: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    moq: 200,
    minPrice: 15000,
    maxPrice: 25000,
    category: 'Food & Beverage',
    isVerified: true,
  },
  {
    id: 'prod-008',
    slug: 'ukiran-kayu-jepara',
    name: 'Panel Kayu Ukir Relief',
    sellerId: 'umkm-008',
    sellerName: 'Jepara Wood Art',
    photoUrl: 'https://images.unsplash.com/photo-1611078810793-1e5b12361664?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    moq: 5,
    minPrice: 2500000,
    maxPrice: 4000000,
    category: 'Furniture',
    isVerified: true,
  }
];

export interface MockConversation {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerCompany: string;
  buyerAvatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

export const MOCK_CONVERSATIONS: MockConversation[] = [
  {
    id: 'c-001',
    buyerId: 'b-001',
    buyerName: 'David Smith',
    buyerCompany: 'Global Imports LLC',
    buyerAvatar: 'DS',
    lastMessage: 'Could you provide the certificate of origin for the organic spices?',
    timestamp: '10:30 AM',
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: 'c-002',
    buyerId: 'b-002',
    buyerName: 'Liu Wei',
    buyerCompany: 'Beijing Trading',
    buyerAvatar: 'LW',
    lastMessage: '你好！我对你们的 keycaps 很感兴趣。',
    timestamp: 'Yesterday',
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: 'c-003',
    buyerId: 'b-003',
    buyerName: 'Kenji Sato',
    buyerCompany: 'Tokyo Trading Co.',
    buyerAvatar: 'KS',
    lastMessage: 'こんにちは。ラタン製の家具についてお伺いします。',
    timestamp: 'Mon',
    unreadCount: 1,
    isOnline: true,
  },
  {
    id: 'c-004',
    buyerId: 'b-004',
    buyerName: 'Tariq Al-Fayed',
    buyerCompany: 'Dubai Spices',
    buyerAvatar: 'TA',
    lastMessage: 'We need 500kg of nutmeg for the next quarter.',
    timestamp: '12 Jan',
    unreadCount: 0,
    isOnline: false,
  }
];

export interface MockMessage {
  id: string;
  text: string;
  sender: 'me' | 'buyer';
  timestamp: string;
  status: 'sent' | 'read' | 'failed' | 'sending';
  isAiCorrected?: boolean;
  hasInvoice?: boolean;
}

export const MOCK_MESSAGES: Record<string, MockMessage[]> = {
  'conv-001': [
    { id: 'm1', text: 'Hello, I am interested in your Gayo Luwak Coffee.', sender: 'buyer', timestamp: '10:00 AM', status: 'read' },
    { id: 'm2', text: 'Thank you for reaching out! We can supply up to 1000kg per month. What volume are you looking for?', sender: 'me', timestamp: '10:05 AM', status: 'read', isAiCorrected: true },
    { id: 'm3', text: 'We would like to start with a 50kg trial order. What is the best price?', sender: 'buyer', timestamp: '10:15 AM', status: 'read' },
    { id: 'm4', text: 'For 50kg, we can offer $12 per kg. I have attached the invoice for your reference.', sender: 'me', timestamp: '10:20 AM', status: 'read', isAiCorrected: true },
    { id: 'm5', text: '', sender: 'me', timestamp: '10:20 AM', status: 'read', hasInvoice: true },
    { id: 'm6', text: 'Could you provide the certificate of origin for the coffee beans?', sender: 'buyer', timestamp: '10:30 AM', status: 'read' },
  ]
};

export interface MockInvoice {
  id: string;
  buyerName: string;
  date: string;
  amount: number;
  status: 'PENDING' | 'PAID' | 'EXPIRED' | 'FAILED' | 'COMPLETED';
  items: { name: string; qty: number; price: number }[];
  finalPrice?: number;
  escrowStatus?: 'holding' | 'released' | 'pending_release';
  orderConfirmedAt?: string;
  ppjkName?: string;
  shippingEta?: string;
  productImage?: string;
  currency?: 'IDR' | 'USD' | 'JPY' | 'CNY';
  exchangeRate?: number;
}

export const MOCK_INVOICES: MockInvoice[] = [
  {
    id: 'INV-2026-0001',
    buyerName: 'Global Imports LLC',
    date: '2026-07-15',
    amount: 15000000,
    status: 'PENDING',
    items: [{ name: 'Kopi Luwak Premium Gayo', qty: 100, price: 150000 }]
  },
  {
    id: 'INV-2026-0002',
    buyerName: 'Beijing Trading',
    date: '2026-07-10',
    amount: 45000000,
    status: 'PAID',
    items: [{ name: 'Set Kursi Rotan Minimalis', qty: 50, price: 900000 }]
  },
  {
    id: 'INV-2026-0003',
    buyerName: 'EuroFurnish',
    date: '2026-07-01',
    amount: 25000000,
    status: 'COMPLETED',
    items: [{ name: 'Panel Kayu Ukir Relief', qty: 10, price: 2500000 }]
  },
  {
    id: 'INV-2026-0004',
    buyerName: 'Dubai Spices',
    date: '2026-06-25',
    amount: 8500000,
    status: 'EXPIRED',
    items: [{ name: 'Biji Pala Organik Banda', qty: 100, price: 85000 }]
  },
  {
    id: 'INV-2026-0005',
    buyerName: 'Singapore Traders',
    date: '2026-07-14',
    amount: 12000000,
    status: 'FAILED',
    items: [{ name: 'Patchouli Essential Oil', qty: 10, price: 1200000 }]
  },
  {
    id: 'INV-DEMO-001',
    buyerName: 'Global Imports LLC',
    date: '2026-07-22',
    amount: 0,
    status: 'PENDING',
    items: [{ name: 'Kopi Luwak Premium Gayo', qty: 100, price: 0 }],
    finalPrice: 15000000,
    currency: 'USD',
    exchangeRate: 15000,
    productImage: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=200&auto=format&fit=crop',
    ppjkName: 'PT Logistik Global Mandiri'
  },
  {
    id: 'INV-DEMO-002',
    buyerName: 'Beijing Trading',
    date: '2026-07-21',
    amount: 45000000,
    status: 'PAID',
    items: [{ name: 'Set Kursi Rotan Minimalis', qty: 50, price: 900000 }],
    currency: 'USD',
    exchangeRate: 15000,
    escrowStatus: 'holding',
    productImage: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=200&auto=format&fit=crop',
    ppjkName: 'PT Lintas Samudra Logistik'
  },
  {
    id: 'INV-DEMO-003',
    buyerName: 'Tokyo Trading Co.',
    date: '2026-07-15',
    amount: 25000000,
    status: 'COMPLETED',
    items: [{ name: 'Panel Kayu Ukir Relief', qty: 10, price: 2500000 }],
    currency: 'JPY',
    exchangeRate: 100,
    escrowStatus: 'released',
    orderConfirmedAt: '2026-07-20T10:00:00Z',
    productImage: 'https://images.unsplash.com/photo-1611089201970-1fc45a995e8e?q=80&w=200&auto=format&fit=crop',
    ppjkName: 'Bali Cargo Express'
  }
];

// ─── PPJK Interface & Data ──────────────────────────────────────────────────

export interface MockPPJK {
  id: string;
  name: string;             // Nama Instansi
  slug: string;             // untuk URL /ppjk/[id]
  city: string;
  province: string;
  fullAddress: string;      // Alamat lengkap instansi
  email: string;            // Email bisnis
  whatsapp: string;         // Nomor WhatsApp (format: 628xxx)
  services: string[];       // Daftar layanan yang disediakan
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  logoUrl?: string;         // URL logo instansi (opsional, fallback ke inisial)
  description: string;      // Deskripsi perusahaan
  estimatedCostMin: number; // Estimasi biaya minimum (Rupiah)
  estimatedCostMax: number; // Estimasi biaya maksimum (Rupiah)
  costUnit: string;         // misal: "per dokumen", "per pengiriman"
  establishedYear: number;  // Tahun berdiri
  employeeCount: string;    // misal: "10-50 karyawan"
  certifications: string[]; // misal: ['ISO 9001:2015', 'AEO Certified']
  coverageArea: string[];   // misal: ['Jawa', 'Bali', 'Sumatera']
  portfolioCount: number;   // Jumlah dokumen/pengiriman yang sudah ditangani
  operationalHours: string; // misal: "Senin-Jumat, 08.00-17.00 WIB"
  socialMedia?: {
    instagram?: string;
    linkedin?: string;
    website?: string;
  };
}

export const MOCK_PPJK: MockPPJK[] = [
  {
    id: 'p1',
    name: 'PT Logistik Global Mandiri',
    slug: 'pt-logistik-global-mandiri',
    city: 'Jakarta Utara',
    province: 'DKI Jakarta',
    fullAddress: 'Jl. Enggano No. 14-15, Tanjung Priok, Jakarta Utara 14310',
    email: 'info@sinarjayadok.co.id',
    whatsapp: '6281234567890',
    services: ['PEB', 'PIB', 'Bea Cukai', 'Logistik Laut', 'Asuransi Kargo'],
    rating: 4.8,
    reviewCount: 142,
    isVerified: true,
    description: 'PT Logistik Global Mandiri adalah perusahaan PPJK terpercaya dengan pengalaman lebih dari 15 tahun dalam pengurusan dokumen kepabeanan dan logistik internasional. Kami memiliki tim yang berpengalaman dan bersertifikat untuk memastikan kelancaran proses ekspor dan impor Anda. Dengan jaringan luas di seluruh Indonesia dan koneksi ke lebih dari 50 negara tujuan ekspor, kami siap menjadi mitra andalan bisnis ekspor Anda.',
    estimatedCostMin: 500000,
    estimatedCostMax: 2000000,
    costUnit: 'per dokumen',
    establishedYear: 2008,
    employeeCount: '50-100 karyawan',
    certifications: ['ISO 9001:2015', 'AEO Certified', 'IICL Certified'],
    coverageArea: ['Jawa', 'Bali', 'Sumatera', 'Kalimantan'],
    portfolioCount: 8500,
    operationalHours: 'Senin–Jumat, 08.00–17.00 WIB',
    socialMedia: {
      website: 'https://logistikglobalmandiri.co.id',
      linkedin: 'https://linkedin.com/company/logistik-global-mandiri',
    },
  },
  {
    id: 'p2',
    name: 'CV Lintas Samudra',
    slug: 'cv-lintas-samudra',
    city: 'Surabaya',
    province: 'Jawa Timur',
    fullAddress: 'Jl. Perak Barat No. 57, Krembangan, Surabaya 60177',
    email: 'admin@lintassamudra.id',
    whatsapp: '6285678901234',
    services: ['PEB', 'Bea Cukai', 'Logistik Laut', 'Fumigasi'],
    rating: 4.5,
    reviewCount: 87,
    isVerified: false,
    description: 'CV Lintas Samudra bergerak di bidang jasa kepabeanan dan logistik laut dengan spesialisasi pengiriman komoditas agrikultur dan makanan. Berbasis di Surabaya, kami melayani eksportir di seluruh Jawa Timur dan sekitarnya dengan pelayanan yang cepat, transparan, dan terpercaya.',
    estimatedCostMin: 350000,
    estimatedCostMax: 1500000,
    costUnit: 'per pengiriman',
    establishedYear: 2014,
    employeeCount: '10-50 karyawan',
    certifications: ['IATA Certified'],
    coverageArea: ['Jawa Timur', 'Jawa Tengah', 'Bali'],
    portfolioCount: 3200,
    operationalHours: 'Senin–Sabtu, 08.00–16.00 WIB',
    socialMedia: {
      instagram: 'https://instagram.com/lintassamudra',
    },
  },
  {
    id: 'p3',
    name: 'PT Ekspor Indo Jaya',
    slug: 'pt-ekspor-indo-jaya',
    city: 'Semarang',
    province: 'Jawa Tengah',
    fullAddress: 'Jl. Coaster No. 8, Pelabuhan Tanjung Emas, Semarang 50174',
    email: 'cs@eksporindojaya.com',
    whatsapp: '6287890123456',
    services: ['PEB', 'PIB', 'Bea Cukai', 'Logistik Laut', 'Pergudangan', 'Asuransi Kargo', 'Certificate of Origin (COO)'],
    rating: 4.9,
    reviewCount: 218,
    isVerified: true,
    description: 'PT Ekspor Indo Jaya adalah perusahaan PPJK dengan layanan paling lengkap di Jawa Tengah. Kami menawarkan solusi ekspor end-to-end mulai dari pengurusan dokumen PEB, PIB, hingga layanan pergudangan dan pengiriman. Dengan rating tertinggi di antara mitra PPJK kami, kepercayaan klien adalah prioritas utama.',
    estimatedCostMin: 600000,
    estimatedCostMax: 3000000,
    costUnit: 'per dokumen',
    establishedYear: 2005,
    employeeCount: '100-200 karyawan',
    certifications: ['ISO 9001:2015', 'ISO 14001:2015', 'AEO Certified'],
    coverageArea: ['Jawa Tengah', 'Jawa Barat', 'DI Yogyakarta'],
    portfolioCount: 15200,
    operationalHours: 'Senin–Jumat, 07.30–17.30 WIB',
    socialMedia: {
      website: 'https://eksporindojaya.com',
      linkedin: 'https://linkedin.com/company/ekspor-indo-jaya',
      instagram: 'https://instagram.com/eksporindojaya',
    },
  },
  {
    id: 'p4',
    name: 'Bali Cargo Express',
    slug: 'bali-cargo-express',
    city: 'Denpasar',
    province: 'Bali',
    fullAddress: 'Jl. Bypass Ngurah Rai No. 23, Tuban, Kuta, Badung, Bali 80361',
    email: 'hello@balicargoexpress.id',
    whatsapp: '6281357924680',
    services: ['PEB', 'Logistik Udara', 'Asuransi Kargo', 'Karantina'],
    rating: 4.7,
    reviewCount: 113,
    isVerified: true,
    description: 'Bali Cargo Express adalah mitra ekspor terpercaya untuk produk-produk kerajinan, fashion, dan komoditas Bali. Spesialisasi kami adalah logistik udara untuk pengiriman cepat ke seluruh dunia, didukung oleh tim berpengalaman yang memahami regulasi ekspor barang seni dan kerajinan tangan.',
    estimatedCostMin: 800000,
    estimatedCostMax: 4000000,
    costUnit: 'per pengiriman',
    establishedYear: 2011,
    employeeCount: '20-50 karyawan',
    certifications: ['IATA Certified', 'FIATA Member'],
    coverageArea: ['Bali', 'Lombok', 'Nusa Tenggara'],
    portfolioCount: 5700,
    operationalHours: 'Senin–Sabtu, 08.00–18.00 WITA',
    socialMedia: {
      website: 'https://balicargoexpress.id',
      instagram: 'https://instagram.com/balicargoexpress',
    },
  },
  {
    id: 'p5',
    name: 'Makassar Transindo',
    slug: 'makassar-transindo',
    city: 'Makassar',
    province: 'Sulawesi Selatan',
    fullAddress: 'Jl. Nusantara No. 45, Wajo, Makassar 90113',
    email: 'ops@makassartransindo.id',
    whatsapp: '6281290876543',
    services: ['PEB', 'PIB', 'Bea Cukai', 'Logistik Laut'],
    rating: 4.2,
    reviewCount: 64,
    isVerified: false,
    description: 'Makassar Transindo melayani kebutuhan kepabeanan dan logistik untuk eksportir di kawasan Indonesia Timur. Dengan posisi strategis di Makassar sebagai hub perdagangan Sulawesi, kami siap membantu proses ekspor berbagai komoditas mulai dari kakao, rumput laut, hingga produk perikanan.',
    estimatedCostMin: 300000,
    estimatedCostMax: 1200000,
    costUnit: 'per dokumen',
    establishedYear: 2017,
    employeeCount: '10-20 karyawan',
    certifications: [],
    coverageArea: ['Sulawesi Selatan', 'Sulawesi Tenggara', 'Maluku'],
    portfolioCount: 1800,
    operationalHours: 'Senin–Jumat, 08.00–17.00 WITA',
    socialMedia: {},
  },
  {
    id: 'p6',
    name: 'PT Andalan Ekspor Medan',
    slug: 'pt-andalan-ekspor-medan',
    city: 'Medan',
    province: 'Sumatera Utara',
    fullAddress: 'Jl. Pelabuhan Belawan No. 12, Medan Belawan, Medan 20411',
    email: 'info@andalanekspor.co.id',
    whatsapp: '6285211223344',
    services: ['PEB', 'Bea Cukai', 'Logistik Laut', 'Fumigasi', 'Certificate of Origin (COO)'],
    rating: 4.6,
    reviewCount: 96,
    isVerified: true,
    description: 'PT Andalan Ekspor Medan berpengalaman dalam pengurusan dokumen ekspor komoditas unggulan Sumatera seperti sawit, karet, kopi, dan produk hutan. Berbasis di Belawan, pelabuhan ekspor terbesar di Sumatera, kami menjamin proses kepabeanan yang cepat dan sesuai regulasi.',
    estimatedCostMin: 400000,
    estimatedCostMax: 1800000,
    costUnit: 'per pengiriman',
    establishedYear: 2010,
    employeeCount: '20-50 karyawan',
    certifications: ['ISO 9001:2015', 'SVLK Certified'],
    coverageArea: ['Sumatera Utara', 'Aceh', 'Riau', 'Sumatera Barat'],
    portfolioCount: 6300,
    operationalHours: 'Senin–Jumat, 08.00–17.00 WIB',
    socialMedia: {
      website: 'https://andalanekspor.co.id',
    },
  },
];

// ─── Auth Dummy untuk Mitra PPJK ────────────────────────────────────────────

export interface MockPPJKUser {
  email: string;
  password: string;
  ppjkId: string;
}

export const MOCK_PPJK_USERS: MockPPJKUser[] = [
  { email: 'info@sinarjayadok.co.id',    password: 'sinarjaya123',  ppjkId: 'p1' },
  { email: 'admin@lintassamudra.id',     password: 'lintas456',     ppjkId: 'p2' },
  { email: 'cs@eksporindojaya.com',      password: 'ekspor789',     ppjkId: 'p3' },
  { email: 'hello@balicargoexpress.id',  password: 'balicargo321',  ppjkId: 'p4' },
  { email: 'ops@makassartransindo.id',   password: 'mksr2024',      ppjkId: 'p5' },
  { email: 'info@andalanekspor.co.id',   password: 'andalan567',    ppjkId: 'p6' },
];

export interface MockUser {
  email: string;
  password: string;
  role: 'seller' | 'buyer';
}

export interface MockRegisteredUser extends MockUser {
  nik?: string;
  npwp?: string;
  nib?: string;
  isNibVerified?: boolean;
}

export const MOCK_SELLER_USERS: MockUser[] = [
  { email: 'seller@nusatrade.com', password: 'seller123', role: 'seller' },
  { email: 'eksportir@nusatrade.com', password: 'seller123', role: 'seller' }
];

export const MOCK_BUYER_USERS: MockUser[] = [
  { email: 'buyer@nusatrade.com', password: 'buyer123', role: 'buyer' },
  { email: 'importir@nusatrade.com', password: 'buyer123', role: 'buyer' }
];

// ─── Shared Seller Profile & Stats ──────────────────────────────────────────

export const MOCK_SELLER_PROFILE = {
  name: 'Budi Santoso',
  businessName: 'Kopi Nusantara Abadi',
  city: 'Takengon, Aceh',
  categories: ['Food & Beverage', 'Agriculture'],
  nibVerified: false,
  photoUrl: ''
};

export const MOCK_STATS = {
  totalTransaksi: 8,
  nilaiTransaksi: 125000000,
  produkAktif: 12,
  chatAktif: 4
};

export const MOCK_CATEGORIES = [
  'Agriculture',
  'Food & Beverage',
  'Fashion & Textile',
  'Furniture',
  'Handicraft',
  'Health & Beauty',
  'Manufacturing',
  'Others'
];

// ─── Helper Functions ────────────────────────────────────────────────────────

export const getMockProduct = (slug: string) => 
  MOCK_PRODUCTS.find(p => p.slug === slug) || 
  MOCK_PRODUCTS.find(p => p.id === 'prod-001' && (slug.includes('kopi') || slug.includes('gayo') || slug.includes('luwak'))) || 
  MOCK_PRODUCTS[0];
export const getMockUMKM = (idOrSlug: string) => MOCK_UMKM.find(u => u.id === idOrSlug || u.slug === idOrSlug);
export const getMockUMKMProducts = (sellerIdOrName: string) => MOCK_PRODUCTS.filter(p => p.sellerId === sellerIdOrName || p.sellerName === sellerIdOrName);
export const getMockInvoice = (id: string) => MOCK_INVOICES.find(i => i.id === id);
export const getMockMessages = (conversationId: string) => MOCK_MESSAGES[conversationId] || [];
export const getMockPPJK = (id: string) => MOCK_PPJK.find(p => p.id === id);
export const getMockPPJKUser = (email: string, password: string) =>
  MOCK_PPJK_USERS.find(u => u.email.toLowerCase().trim() === email.toLowerCase().trim() && u.password.trim() === password.trim());
export const getMockSellerUser = (email: string, password: string) =>
  MOCK_SELLER_USERS.find(u => u.email.toLowerCase().trim() === email.toLowerCase().trim() && u.password.trim() === password.trim());
export const getMockBuyerUser = (email: string, password: string) =>
  MOCK_BUYER_USERS.find(u => u.email.toLowerCase().trim() === email.toLowerCase().trim() && u.password.trim() === password.trim());

export interface DemoChatScenario {
  id: string;
  buyerName: string;
  buyerCompany: string;
  country: string;
  nativeLangName: string;
  nativeLangCode: 'zh' | 'en' | 'ja';
  buyerOriginal: string;
  buyerTranslated: string;
  umkmInformal: string;
  umkmCorrectedIndonesia: string; // Versi bisnis bahasa Indonesia — UMKM bisa edit ini
  umkmCorrected: string; // Versi final bahasa buyer — dikirim otomatis oleh AI
}

export const MOCK_CHAT_SCENARIOS: DemoChatScenario[] = [
  {
    id: 'c-001',
    buyerName: 'David Smith',
    buyerCompany: 'Global Imports LLC',
    country: 'United Kingdom',
    nativeLangName: 'English',
    nativeLangCode: 'en',
    buyerOriginal: "Hello! We are interested in your organic spices. Do you provide Certificate of Origin and what is the MOQ for EU shipment?",
    buyerTranslated: "Halo! Kami tertarik dengan rempah organik Anda. Apakah Anda menyediakan Certificate of Origin dan berapa MOQ untuk pengiriman ke EU?",
    umkmInformal: "halo pak, sedia kok cert origin, moq 500kg, harga $10/kg ya siap kirim",
    umkmCorrectedIndonesia: "Yth. Bapak Smith,\n\nTerima kasih atas ketertarikan Anda terhadap produk kami. Ya, kami menyediakan Certificate of Origin. Minimum Order Quantity (MOQ) untuk pengiriman ke EU adalah 500 kg dengan harga $10 per kg.\n\nHormat kami,\nRempah Maluku Jaya",
    umkmCorrected: "Hello Mr. Smith,\n\nThank you for your interest in our products. Yes, we do provide a Certificate of Origin. Our Minimum Order Quantity (MOQ) for EU shipments is 500 kg, and the price is $10 per kg.\n\nBest regards,\nRempah Maluku Jaya",
  },
  {
    id: 'c-002',
    buyerName: 'Liu Wei',
    buyerCompany: 'Beijing Trading',
    country: 'China',
    nativeLangName: 'Mandarin',
    nativeLangCode: 'zh',
    buyerOriginal: "你好！我对你们的 keycaps 很感兴趣。请问可以批量购买吗？最低订购量是多少？价格是怎么计算的？",
    buyerTranslated: "Halo! Saya tertarik dengan keycaps kalian. Apakah bisa pesan dalam jumlah besar? Berapa minimum order-nya dan bagaimana perhitungan harganya?",
    umkmInformal: "bisa kok, min order 50 pcs, harga $4.5/pcs, ongkir tergantung negara tujuan",
    umkmCorrectedIndonesia: "Yth. Pelanggan,\n\nTerima kasih atas minat Anda. Kami melayani pembelian dalam jumlah besar dengan Minimum Order Quantity (MOQ) 50 pcs, harga $4.5 per pcs. Ongkos kirim akan dihitung berdasarkan negara tujuan.\n\nKami tunggu konfirmasi Anda.",
    umkmCorrected: "尊敬的客户您好，\n\n感谢您对我们的产品感兴趣。我们支持批量采购，最低订购量 (MOQ) 为 50 件，价格为每件 4.5 美元。运费将根据目标国家另行计算。\n\n期待您的回复。",
  },
  {
    id: 'c-003',
    buyerName: 'Kenji Sato',
    buyerCompany: 'Tokyo Trading Co.',
    country: 'Japan',
    nativeLangName: 'Japanese',
    nativeLangCode: 'ja',
    buyerOriginal: "こんにちは。ラタン製の家具についてお伺いします。日本向けの輸出実績はありますか？",
    buyerTranslated: "Halo. Saya ingin bertanyaについて (tentang) furnitur rotan. Apakah Anda memiliki pengalaman ekspor ke Jepang?",
    umkmInformal: "ada bu, udah sering kirim ke tokyo. aman kualitasnya anti jamur.",
    umkmCorrectedIndonesia: "Halo,\n\nTerima kasih atas pertanyaan Anda. Ya, kami memiliki pengalaman ekspor ke Jepang, khususnya ke Tokyo. Produk kami telah melalui proses anti-jamur sehingga berkualitas tinggi dan cocok untuk iklim Jepang.\n\nKami harap Anda dapat mempertimbangkan kerjasama dengan kami.",
    umkmCorrected: "こんにちは。\n\nお問い合わせありがとうございます。はい、日本への輸出実績は多数ございます（特に東京向け）。当社の製品は防カビ処理を施しており、日本の気候にも適した高品質な仕上がりとなっております。\n\nご検討のほどよろしくお願いいたします。",
  }
];
