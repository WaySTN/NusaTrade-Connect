export interface MockProduct {
  id: string;
  slug: string;
  name: string;
  sellerName: string;
  photoUrl: string;
  moq: number;
  minPrice: number;
  maxPrice: number;
  category: string;
  isVerified: boolean;
}

export const MOCK_PRODUCTS: MockProduct[] = [
  {
    id: 'prod-001',
    slug: 'kopi-luwak-premium',
    name: 'Kopi Luwak Premium Gayo',
    sellerName: 'Kopi Nusantara Abadi',
    photoUrl: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    moq: 50,
    minPrice: 150000,
    maxPrice: 200000,
    category: 'Food & Beverage',
    isVerified: true,
  },
  {
    id: 'prod-002',
    slug: 'kerajinan-rotan-bali',
    name: 'Set Kursi Rotan Minimalis',
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
    sellerName: 'Batik Pusaka Solo',
    photoUrl: 'https://images.unsplash.com/photo-1605336110825-9f5e10e9f1a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
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
    sellerName: 'Rempah Maluku Jaya',
    photoUrl: 'https://images.unsplash.com/photo-1596647185078-433e2dd7bb84?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
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
  buyerName: string;
  buyerAvatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

export const MOCK_CONVERSATIONS: MockConversation[] = [
  {
    id: 'conv-001',
    buyerName: 'David Smith (Global Imports LLC)',
    buyerAvatar: 'DS',
    lastMessage: 'Could you provide the certificate of origin for the coffee beans?',
    timestamp: '10:30 AM',
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: 'conv-002',
    buyerName: 'Liu Wei (Beijing Trading)',
    buyerAvatar: 'LW',
    lastMessage: 'Invoice paid successfully. Looking forward to the shipment.',
    timestamp: 'Yesterday',
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: 'conv-003',
    buyerName: 'Sarah Johnson (EuroFurnish)',
    buyerAvatar: 'SJ',
    lastMessage: 'Are the rattan chairs treated for European climate?',
    timestamp: 'Mon',
    unreadCount: 1,
    isOnline: true,
  },
  {
    id: 'conv-004',
    buyerName: 'Tariq Al-Fayed (Dubai Spices)',
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
  }
];

export const MOCK_PPJK = [
  { id: 'p1', name: 'PT Logistik Global Mandiri', city: 'Jakarta', services: ['PEB', 'PIB', 'Logistik'], rating: 4.8, isVerified: true },
  { id: 'p2', name: 'CV Lintas Samudra', city: 'Surabaya', services: ['PEB', 'Cukai'], rating: 4.5, isVerified: false },
  { id: 'p3', name: 'PT Ekspor Indo Jaya', city: 'Semarang', services: ['PEB', 'PIB', 'Logistik', 'Gudang'], rating: 4.9, isVerified: true },
  { id: 'p4', name: 'Bali Cargo Express', city: 'Denpasar', services: ['PEB', 'Logistik Udara'], rating: 4.7, isVerified: true },
  { id: 'p5', name: 'Makassar Transindo', city: 'Makassar', services: ['PEB', 'PIB'], rating: 4.2, isVerified: false },
  { id: 'p6', name: 'PT Andalan Ekspor', city: 'Medan', services: ['PEB', 'Logistik Laut'], rating: 4.6, isVerified: true }
];

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

export const getMockProduct = (slug: string) => MOCK_PRODUCTS.find(p => p.slug === slug);
export const getMockInvoice = (id: string) => MOCK_INVOICES.find(i => i.id === id);
export const getMockMessages = (conversationId: string) => MOCK_MESSAGES[conversationId] || [];
