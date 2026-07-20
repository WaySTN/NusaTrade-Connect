'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { 
  LayoutDashboard, 
  Package, 
  MessageSquare, 
  FileText, 
  Store,
  CreditCard,
  X,
  Globe2,
  LogOut
} from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { MOCK_SELLER_PROFILE } from '@/lib/mock-data';

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const mainNavItems = [
    { name: 'Overview', href: '/overview', icon: LayoutDashboard },
    { name: 'Pesan', href: '/chat', icon: MessageSquare, badge: 3 },
    { name: 'Pembayaran', href: '/pembayaran', icon: CreditCard },
  ];

  const secondaryNavItems = [
    { name: 'Toko Saya', href: '/toko', icon: Store },
    { name: 'Katalog', href: '/katalog', icon: Package },
    { name: 'PPJK', href: '/ppjk', icon: FileText },
  ];

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userRole');
      localStorage.removeItem('authToken');
      localStorage.removeItem('userName');
      router.push('/login');
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar Content */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col",
        "bg-[var(--color-bg-surface)] border-r border-[var(--color-border)] shadow-xl md:shadow-none",
        "transition-all duration-300 var(--ease-out-quart) md:translate-x-0 md:sticky md:top-0 md:h-screen",
        isOpen ? "translate-x-0" : "-translate-x-full",
        isCollapsed ? "w-20" : "w-[var(--sidebar-width)]"
      )}>
        <div className={cn("flex items-center h-[var(--header-height)] border-b border-[var(--color-border)] shrink-0 transition-all", isCollapsed ? "px-0 justify-center" : "px-6 justify-between")}>
          <Link href="/" className={cn("inline-flex items-center group overflow-visible", isCollapsed ? "hidden" : "flex")} onClick={onClose}>
            <img src="/logo.png" alt="NusaTrade Connect" className="h-16 w-auto object-contain scale-[1.55] origin-left hover:scale-[1.65] transition-transform duration-300" />
          </Link>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn(
              "hidden md:flex items-center justify-center w-8 h-8 rounded-full border border-[var(--color-border)] hover:bg-[var(--color-bg-subtle)] transition-all duration-300",
              isCollapsed ? "rotate-180" : ""
            )}
          >
            <img src="/caret-double-left.svg" alt="Collapse" className="w-5 h-5 invert opacity-70" />
          </button>

          <button 
            onClick={onClose}
            className="md:hidden p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-6">
          {/* Main Group */}
          <div className="flex flex-col gap-1">
            {!isCollapsed && (
              <span className="px-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-placeholder)] mb-1">
                Menu Utama
              </span>
            )}
            {mainNavItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              const Icon = item.icon;
              
              return (
                <Link 
                  key={item.name}
                  href={item.href} 
                  onClick={onClose}
                  title={isCollapsed ? item.name : undefined}
                  className={cn(
                    "group relative flex items-center justify-between py-2.5 rounded-xl text-sm font-medium transition-colors duration-200",
                    isCollapsed ? "px-0 justify-center" : "px-3",
                    isActive 
                      ? "bg-[var(--color-primary-subtle)] text-[var(--color-primary)]" 
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)]"
                  )}
                >
                  <div className={cn("flex items-center gap-3", isCollapsed ? "justify-center" : "")}>
                    <Icon className={cn(
                      "w-5 h-5 transition-transform duration-300 ease-out",
                      isActive ? "text-[var(--color-primary)]" : "text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)]",
                      !isCollapsed && "group-hover:translate-x-1"
                    )} />
                    {!isCollapsed && <span>{item.name}</span>}
                  </div>
                  {!isCollapsed && item.badge && (
                    <span className="bg-[var(--color-error)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Secondary Group */}
          <div className="flex flex-col gap-1">
            {!isCollapsed && (
              <span className="px-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-placeholder)] mb-1">
                Bisnis
              </span>
            )}
            {secondaryNavItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              const Icon = item.icon;
              
              return (
                <Link 
                  key={item.name}
                  href={item.href} 
                  onClick={onClose}
                  title={isCollapsed ? item.name : undefined}
                  className={cn(
                    "group relative flex items-center gap-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200",
                    isCollapsed ? "px-0 justify-center" : "px-3",
                    isActive 
                      ? "bg-[var(--color-primary-subtle)] text-[var(--color-primary)]" 
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)]"
                  )}
                >
                  <Icon className={cn(
                    "w-5 h-5 transition-transform duration-300 ease-out shrink-0",
                    isActive ? "text-[var(--color-primary)]" : "text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)]",
                    !isCollapsed && "group-hover:translate-x-1"
                  )} />
                  {!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-[var(--color-border)] shrink-0 flex flex-col gap-2">

          <button
            onClick={handleLogout}
            title={isCollapsed ? "Logout" : undefined}
            className={cn(
              "w-full flex items-center py-2.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors",
              isCollapsed ? "justify-center px-0" : "px-3 gap-3"
            )}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span>Keluar dari Akun</span>}
          </button>
        </div>
      </aside>
    </>
  );
};
