'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { 
  LayoutDashboard, 
  Package, 
  MessageSquare, 
  FileText, 
  Store,
  CreditCard,
  X,
  Globe2
} from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { MOCK_SELLER_PROFILE } from '@/lib/mock-data';

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();

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
        "fixed inset-y-0 left-0 z-50 w-[var(--sidebar-width)] flex flex-col",
        "bg-[var(--color-bg-surface)] border-r border-[var(--color-border)] shadow-xl md:shadow-none",
        "transition-transform duration-300 var(--ease-out-quart) md:translate-x-0 md:sticky md:top-0 md:h-screen",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between h-[var(--header-height)] px-6 border-b border-[var(--color-border)] shrink-0">
          <Link href="/" className="font-display font-extrabold text-xl text-[var(--color-text-primary)] inline-flex items-center gap-2 group" onClick={onClose}>
            <Globe2 className="w-6 h-6 text-[var(--color-primary)] group-hover:rotate-12 transition-transform duration-300" />
            <span className="tracking-tight">Nusa<span className="text-[var(--color-primary)]">Trade</span></span>
          </Link>
          <button 
            onClick={onClose}
            className="md:hidden p-2 -mr-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-6">
          {/* Main Group */}
          <div className="flex flex-col gap-1">
            <span className="px-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-placeholder)] mb-1">
              Menu Utama
            </span>
            {mainNavItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              const Icon = item.icon;
              
              return (
                <Link 
                  key={item.name}
                  href={item.href} 
                  onClick={onClose}
                  className={cn(
                    "group relative flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200",
                    isActive 
                      ? "bg-[var(--color-primary-subtle)] text-[var(--color-primary)]" 
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)]"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn(
                      "w-5 h-5 transition-transform duration-300 ease-out",
                      isActive ? "text-[var(--color-primary)]" : "text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)]",
                      "group-hover:translate-x-1"
                    )} />
                    {item.name}
                  </div>
                  {item.badge && (
                    <span className="bg-[var(--color-error)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Secondary Group */}
          <div className="flex flex-col gap-1">
            <span className="px-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-placeholder)] mb-1">
              Bisnis
            </span>
            {secondaryNavItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              const Icon = item.icon;
              
              return (
                <Link 
                  key={item.name}
                  href={item.href} 
                  onClick={onClose}
                  className={cn(
                    "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200",
                    isActive 
                      ? "bg-[var(--color-primary-subtle)] text-[var(--color-primary)]" 
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)]"
                  )}
                >
                  <Icon className={cn(
                    "w-5 h-5 transition-transform duration-300 ease-out",
                    isActive ? "text-[var(--color-primary)]" : "text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)]",
                    "group-hover:translate-x-1"
                  )} />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-[var(--color-border)] shrink-0">
          <Link href="/profile" onClick={onClose}>
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--color-bg-subtle)] cursor-pointer transition-colors border border-transparent hover:border-[var(--color-border)] group">
              <Avatar 
                src={MOCK_SELLER_PROFILE.photoUrl} 
                initials={MOCK_SELLER_PROFILE.name.charAt(0)} 
                size="md" 
                isVerified={MOCK_SELLER_PROFILE.nibVerified}
              />
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm font-semibold text-[var(--color-text-primary)] truncate group-hover:text-[var(--color-primary)] transition-colors">
                  {MOCK_SELLER_PROFILE.name}
                </span>
                <span className="text-xs text-[var(--color-text-muted)] truncate mt-0.5">
                  Seller • {MOCK_SELLER_PROFILE.businessName}
                </span>
              </div>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
};
