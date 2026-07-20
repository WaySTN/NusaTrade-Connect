'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Receipt, 
  Building2, 
  LogOut, 
  Menu, 
  X, 
  Globe2, 
  Bell, 
  ShieldCheck,
  User,
  ShoppingBag
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useT } from '@/i18n/useT';

export default function BuyerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [buyerName, setBuyerName] = useState('Global Imports LLC');
  const pathname = usePathname();
  const router = useRouter();
  const t = useT();

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      const userRole = localStorage.getItem('userRole');

      // Auth Guard for Buyer
      if (isLoggedIn !== 'true') {
        localStorage.setItem('redirectAfterLogin', pathname);
        router.push('/login?redirect=' + encodeURIComponent(pathname));
        return;
      }

      const storedName = localStorage.getItem('userName');
      if (storedName) {
        setBuyerName(storedName);
      }
    }
  }, [router, pathname]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userRole');
      localStorage.removeItem('authToken');
      localStorage.removeItem('userName');
      router.push('/login');
    }
  };

  const navItems = [
    {
      name: t('buyer_dashboard.nav_overview') || 'Dashboard Overview',
      href: '/buyer/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: t('buyer_dashboard.nav_chat') || 'Pesan & Negosiasi Chat',
      href: '/buyer/dashboard/chat',
      icon: MessageSquare,
      badge: '3',
    },
    {
      name: t('buyer_dashboard.nav_invoices') || 'Invoice & QRIS Pembayaran',
      href: '/buyer/dashboard/invoices',
      icon: Receipt,
    },
    {
      name: t('buyer_dashboard.nav_umkm') || 'Mitra UMKM Terhubung',
      href: '/buyer/dashboard/umkm',
      icon: Building2,
    },
  ];

  const getPageTitle = () => {
    if (pathname.includes('/chat')) return t('buyer_dashboard.title_chat') || 'Pesan & Negosiasi AI';
    if (pathname.includes('/invoices')) return t('buyer_dashboard.title_invoices') || 'Tagihan & QRIS Pembayaran';
    if (pathname.includes('/umkm')) return t('buyer_dashboard.title_umkm') || 'Mitra UMKM Terhubung';
    return t('buyer_dashboard.title_overview') || 'Dashboard Buyer / Importir';
  };

  if (!isClient) return null;

  return (
    <div className="h-screen w-screen overflow-hidden bg-[var(--color-bg-base)] flex flex-col lg:flex-row font-body">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 bg-white border-r border-[var(--color-border)] flex flex-col justify-between transition-all duration-300 ease-in-out lg:translate-x-0 shadow-sm",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "w-20" : "w-72"
        )}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Sidebar Header / Logo */}
          <div className={cn("h-20 border-b border-[var(--color-border)] flex items-center shrink-0", isCollapsed ? "px-0 justify-center" : "px-6 justify-between")}>
            <Link href="/" className={cn("font-display font-bold text-xl text-[var(--color-text-primary)] inline-flex items-center gap-2 group", isCollapsed ? "hidden" : "flex")}>
              <Globe2 className="w-7 h-7 text-[var(--color-primary)] group-hover:rotate-12 transition-transform duration-300 shrink-0" />
              <span className="tracking-tight whitespace-nowrap">Nusa<span className="text-[var(--color-primary)]">Trade</span></span>
            </Link>

            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={cn(
                "hidden lg:flex items-center justify-center w-8 h-8 rounded-full border border-[var(--color-border)] hover:bg-[var(--color-bg-subtle)] transition-all duration-300",
                isCollapsed ? "rotate-180" : ""
              )}
            >
              <img src="/caret-double-left.svg" alt="Collapse" className="w-5 h-5 invert opacity-70" />
            </button>

            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 rounded-lg text-[var(--color-text-secondary)] lg:hidden hover:bg-[var(--color-bg-subtle)]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Profile Card Summary */}
          <div className={cn("mx-4 my-4 rounded-2xl bg-[var(--color-bg-subtle)] border border-[var(--color-border)] transition-all", isCollapsed ? "p-2 flex justify-center" : "p-4")}>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[var(--color-primary)] text-white font-black flex items-center justify-center text-lg shadow-md shrink-0 font-display">
                {buyerName.charAt(0)}
              </div>
              {!isCollapsed && (
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-[var(--color-text-primary)] truncate">
                    {buyerName}
                  </h4>
                  <div className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-[var(--color-primary)] bg-[var(--color-primary-subtle)] px-2 py-0.5 rounded-full mt-1">
                    <ShieldCheck className="w-3 h-3 text-[var(--color-primary)]" />
                    {t('buyer_dashboard.verified') || 'Verified Buyer'}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
            {!isCollapsed && (
              <div className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider px-3 mb-2">
                {t('buyer_dashboard.main_menu') || 'Menu Utama'}
              </div>
            )}
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/buyer/dashboard' && pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  title={isCollapsed ? item.name : undefined}
                  className={cn(
                    "flex items-center justify-between py-3 rounded-xl text-xs font-bold transition-all duration-200",
                    isCollapsed ? "px-0 justify-center" : "px-3.5",
                    isActive
                      ? "bg-[var(--color-primary-subtle)] text-[var(--color-primary)] shadow-xs"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)]"
                  )}
                >
                  <div className={cn("flex items-center gap-3", isCollapsed ? "justify-center" : "")}>
                    <Icon className={cn("w-5 h-5", isActive ? "text-[var(--color-primary)]" : "text-[var(--color-text-muted)]")} />
                    {!isCollapsed && <span>{item.name}</span>}
                  </div>
                  {!isCollapsed && item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[var(--color-primary)] text-white shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-[var(--color-border)] flex flex-col gap-2">
            <button
              onClick={handleLogout}
              title={isCollapsed ? (t('nav.logout') || 'Keluar') : undefined}
              className={cn(
                "w-full flex items-center py-3 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors",
                isCollapsed ? "justify-center px-0" : "px-3.5 gap-3"
              )}
            >
              <LogOut className="w-5 h-5 shrink-0" />
              {!isCollapsed && <span>{t('nav.logout') || 'Keluar dari Akun'}</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Right Content Layout */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header Bar */}
        <header className="h-20 bg-white border-b border-[var(--color-border)] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl text-[var(--color-text-secondary)] lg:hidden hover:bg-[var(--color-bg-subtle)]"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div>
              <h1 className="text-xl sm:text-2xl font-display font-extrabold text-[var(--color-text-primary)] tracking-tight">
                {getPageTitle()}
              </h1>
              <p className="text-xs text-[var(--color-text-secondary)] font-medium hidden sm:block">
                NusaTrade Connect — {t('buyer_dashboard.hub_subtitle') || 'Importir B2B Hub'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/katalog">
              <button className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--color-border)] text-xs font-bold text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] transition-colors">
                <ShoppingBag className="w-4 h-4 text-[var(--color-primary)]" />
                {t('buyer_dashboard.browse_catalog') || 'Browse Katalog'}
              </button>
            </Link>

            <button className="p-2.5 rounded-xl border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
            </button>
          </div>
        </header>

        {/* Content Children */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
