'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Menu, Bell, Search, ChevronRight } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { MOCK_SELLER_PROFILE } from '@/lib/mock-data';

export interface HeaderProps {
  onMenuClick: () => void;
  title?: string;
}

export const Header = ({ onMenuClick, title }: HeaderProps) => {
  const pathname = usePathname();
  
  // Generate breadcrumbs from pathname
  const generateBreadcrumbs = () => {
    if (title) return [{ name: title, isLast: true }];
    
    const paths = pathname.split('/').filter(Boolean);
    if (paths.length === 0) return [{ name: 'Dashboard', isLast: true }];
    
    return paths.map((path, index) => {
      // Format the path string nicely (e.g. 'overview' -> 'Overview')
      const formatted = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
      return {
        name: formatted,
        isLast: index === paths.length - 1
      };
    });
  };
  
  const breadcrumbs = generateBreadcrumbs();

  return (
    <header className="
      h-[var(--header-height)] 
      sticky top-0 z-30 
      bg-white/80 backdrop-blur-md
      border-b border-[var(--color-border)]
      flex items-center justify-between px-4 md:px-8
      transition-colors duration-200
    ">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        {/* Breadcrumb Navigation */}
        <div className="hidden sm:flex items-center text-sm font-medium">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && <ChevronRight className="w-4 h-4 mx-2 text-[var(--color-text-muted)]" />}
              <span className={crumb.isLast ? "text-[var(--color-text-primary)] font-semibold" : "text-[var(--color-text-muted)]"}>
                {crumb.name}
              </span>
            </React.Fragment>
          ))}
        </div>
        <h1 className="sm:hidden font-display font-semibold text-lg text-[var(--color-text-primary)] truncate">
          {breadcrumbs[breadcrumbs.length - 1]?.name || 'Dashboard'}
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Global Search Placeholder */}
        <div className="hidden md:flex relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-[var(--color-text-placeholder)] group-focus-within:text-[var(--color-primary)] transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Cari transaksi, produk..."
            className="block w-64 pl-10 pr-3 py-2 border border-[var(--color-border)] rounded-xl leading-5 bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)] placeholder-[var(--color-text-placeholder)] focus:outline-none focus:bg-white focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all duration-200 sm:text-sm"
          />
        </div>

        <button className="
          relative p-2 rounded-xl 
          text-[var(--color-text-muted)] 
          hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)]
          transition-colors duration-200
        ">
          <Bell className="w-5 h-5" />
          {/* Notification Badge with Count */}
          <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-[var(--color-error)] border-2 border-white rounded-full">
            3
          </span>
        </button>
        
        <div className="hidden sm:block pl-2 border-l border-[var(--color-border)]">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="text-right hidden lg:block">
              <div className="text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                {MOCK_SELLER_PROFILE.name}
              </div>
            </div>
            <Avatar 
              src={MOCK_SELLER_PROFILE.photoUrl} 
              initials={MOCK_SELLER_PROFILE.name.charAt(0)} 
              size="sm" 
              className="ring-2 ring-transparent group-hover:ring-[var(--color-primary-light)] transition-all"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
