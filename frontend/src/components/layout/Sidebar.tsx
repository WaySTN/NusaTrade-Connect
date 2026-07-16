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
  X
} from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { MOCK_SELLER_PROFILE } from '@/lib/mock-data';

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Overview', href: '/overview', icon: LayoutDashboard },
    { name: 'Katalog', href: '/katalog', icon: Package },
    { name: 'Pesan', href: '/chat', icon: MessageSquare },
    { name: 'PPJK', href: '/ppjk', icon: FileText },
    { name: 'Toko Saya', href: '/toko', icon: Store },
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
        "transition-transform duration-[var(--duration-enter)] ease-out md:translate-x-0 md:sticky md:top-0 md:h-screen",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between h-[var(--header-height)] px-6 border-b border-[var(--color-border)] shrink-0">
          <Link href="/" className="font-display font-bold text-xl text-[#006B52]" onClick={onClose}>
            NusaTrade
          </Link>
          <button 
            onClick={onClose}
            className="md:hidden p-2 -mr-2 text-[var(--color-text-muted)] hover:bg-[var(--color-bg-subtle)] rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1.5">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.name}
                href={item.href} 
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-[var(--duration-fast)]",
                  isActive 
                    ? "bg-[#E6F5F0] text-[#006B52]" 
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)]"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-[#006B52]" : "text-[var(--color-text-muted)]")} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[var(--color-border)] shrink-0">
          <Link href="/profile" onClick={onClose}>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--color-bg-subtle)] cursor-pointer transition-colors border border-transparent hover:border-[var(--color-border)]">
              <Avatar 
                src={MOCK_SELLER_PROFILE.photoUrl} 
                initials={MOCK_SELLER_PROFILE.name.charAt(0)} 
                size="md" 
                isVerified={MOCK_SELLER_PROFILE.nibVerified}
              />
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-[var(--color-text-primary)] truncate">{MOCK_SELLER_PROFILE.name}</span>
                <span className="text-xs text-[var(--color-text-muted)] truncate">{MOCK_SELLER_PROFILE.businessName}</span>
              </div>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
};
