'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Globe2, 
  Bell, 
  ShieldCheck,
  Building2,
  ChevronRight,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { getMockPPJK } from '@/lib/mock-data';
import { Avatar } from '@/components/ui/Avatar';

export default function PPJKDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [companyName, setCompanyName] = useState('Mitra PPJK');
  const [isVerified, setIsVerified] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      const userRole = localStorage.getItem('userRole');
      const ppjkId = localStorage.getItem('ppjkId');

      // Auth Guard
      if (isLoggedIn !== 'true' || userRole !== 'ppjk') {
        router.push('/login');
        return;
      }

      // Load Company Data
      if (ppjkId) {
        const ppjkData = getMockPPJK(ppjkId);
        if (ppjkData) {
          setCompanyName(ppjkData.name);
          setIsVerified(ppjkData.isVerified);
        }
      }
    }
  }, [router, pathname]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
    router.push('/login');
  };

  const navItems = [
    { name: 'Beranda', href: '/ppjk/dashboard', icon: LayoutDashboard },
    { name: 'Profil Instansi', href: '/ppjk/dashboard/profil', icon: Building2 },
    { name: 'Dokumen Masuk', href: '/ppjk/dashboard/dokumen', icon: FileText, badge: 2 },
    { name: 'Ulasan', href: '/ppjk/dashboard/ulasan', icon: Star },
    { name: 'Pengaturan', href: '/ppjk/dashboard/pengaturan', icon: Settings },
  ];

  // Helper to determine title based on path
  const getPageTitle = () => {
    if (pathname === '/ppjk/dashboard') return 'Overview';
    if (pathname.includes('/profil')) return 'Profil Instansi';
    if (pathname.includes('/dokumen')) return 'Dokumen Masuk';
    if (pathname.includes('/ulasan')) return 'Ulasan & Rating';
    if (pathname.includes('/pengaturan')) return 'Pengaturan';
    return 'Dashboard';
  };

  if (!isClient) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-bg-base)]">
      {/* ── SIDEBAR MOBILE BACKDROP ────────────────────────────────────────── */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── SIDEBAR CONTENT ────────────────────────────────────────────────── */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-[var(--sidebar-width)] flex flex-col",
        "bg-[var(--color-bg-surface)] border-r border-[var(--color-border)] shadow-xl md:shadow-none",
        "transition-transform duration-300 var(--ease-out-quart) md:translate-x-0 md:sticky md:top-0 md:h-screen",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo Section */}
        <div className="flex items-center justify-between h-[var(--header-height)] px-6 border-b border-[var(--color-border)] shrink-0">
          <Link href="/" className="font-display font-extrabold text-xl text-[var(--color-text-primary)] inline-flex items-center gap-2 group">
            <Globe2 className="w-6 h-6 text-[var(--color-accent)] group-hover:rotate-12 transition-transform duration-300" />
            <span className="tracking-tight">Nusa<span className="text-[var(--color-accent)]">Trade</span></span>
          </Link>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 -mr-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="px-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-placeholder)] mb-2">
              Menu Utama
            </span>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link 
                  key={item.name}
                  href={item.href} 
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "group relative flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200",
                    isActive 
                      ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)]" 
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)]"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn(
                      "w-5 h-5 transition-transform duration-300 ease-out",
                      isActive ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)]",
                      "group-hover:translate-x-1"
                    )} />
                    {item.name}
                  </div>
                  {item.badge && (
                    <span className="bg-[var(--color-accent)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer PIC Profile Info & Logout */}
        <div className="p-4 border-t border-[var(--color-border)] shrink-0 flex flex-col gap-2">
          {/* Dashboard Switch Banner */}
          <div className="px-3 py-2 bg-[var(--color-bg-subtle)] rounded-xl border border-[var(--color-border)] flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-accent)]"></span>
              <p className="text-[10px] font-bold text-[var(--color-accent)] uppercase tracking-wider">Mitra PPJK</p>
            </div>
            <p className="text-xs font-semibold text-[var(--color-text-primary)] line-clamp-1">{companyName}</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--color-error)] hover:bg-[var(--color-error)]/5 transition-colors cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            Keluar Akun
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT LAYER ─────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Custom Header */}
        <header className="h-[var(--header-height)] sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-[var(--color-border)] flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 -ml-2 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Breadcrumb */}
            <div className="hidden sm:flex items-center text-sm font-medium">
              <span className="text-[var(--color-text-muted)]">Mitra PPJK</span>
              <ChevronRight className="w-4 h-4 mx-2 text-[var(--color-text-muted)]" />
              <span className="text-[var(--color-text-primary)] font-semibold">{getPageTitle()}</span>
            </div>
            <h1 className="sm:hidden font-display font-semibold text-lg text-[var(--color-text-primary)] truncate">
              {getPageTitle()}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <button className="relative p-2 rounded-xl text-[var(--color-text-muted)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)] transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-[var(--color-accent)] border-2 border-white rounded-full">
                2
              </span>
            </button>

            {/* Profile Initials / Badge */}
            <div className="pl-2 border-l border-[var(--color-border)] flex items-center gap-3">
              <div className="text-right hidden lg:block">
                <div className="text-sm font-semibold text-[var(--color-text-primary)] flex items-center gap-1">
                  {companyName}
                  {isVerified && <ShieldCheck className="w-4 h-4 text-[var(--color-accent)] fill-[var(--color-accent)]/10" />}
                </div>
                <div className="text-[10px] text-[var(--color-text-muted)] font-medium">Mitra PPJK Resmi</div>
              </div>
              <Avatar 
                initials={companyName.substring(0, 2).toUpperCase()} 
                size="sm"
                isVerified={isVerified}
                className="ring-2 ring-[var(--color-accent)]/20"
              />
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
