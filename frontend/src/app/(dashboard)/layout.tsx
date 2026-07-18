'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { usePathname, useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('isLoggedIn') !== 'true') {
        router.push('/login');
        return;
      }
      
      const role = localStorage.getItem('userRole');
      if (role === 'ppjk') {
        router.push('/ppjk/dashboard');
      }
    }
  }, [router, pathname]);

  // Helper to determine title based on path
  const getPageTitle = () => {
    if (pathname.startsWith('/overview')) return 'Dashboard Overview';
    if (pathname.startsWith('/katalog')) return 'Katalog Produk';
    if (pathname.startsWith('/chat')) return 'Pesan';
    if (pathname.startsWith('/ppjk')) return 'Mitra PPJK';
    if (pathname.startsWith('/toko')) return 'Toko Saya';
    return 'Dashboard';
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-bg-base)]">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Header onMenuClick={() => setSidebarOpen(true)} title={getPageTitle()} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
