'use client';

import React from 'react';
import { Menu, Bell } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { MOCK_SELLER_PROFILE } from '@/lib/mock-data';

export interface HeaderProps {
  onMenuClick: () => void;
  title?: string;
}

export const Header = ({ onMenuClick, title = "Dashboard" }: HeaderProps) => {
  return (
    <header className="
      h-[var(--header-height)] 
      sticky top-0 z-30 
      bg-white/80 backdrop-blur-sm
      border-b border-[#E2E8F0]
      flex items-center justify-between px-4 md:px-8
    ">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 rounded-md text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="font-display font-semibold text-lg md:text-xl text-[var(--color-text-primary)]">
          {title}
        </h1>
      </div>
      
      <div className="flex items-center gap-3">
        <button className="
          relative p-2 rounded-full 
          text-[var(--color-text-muted)] 
          hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)]
          transition-colors duration-[var(--duration-fast)]
        ">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="hidden sm:block">
          <Avatar 
            src={MOCK_SELLER_PROFILE.photoUrl} 
            initials={MOCK_SELLER_PROFILE.name.charAt(0)} 
            size="sm" 
          />
        </div>
      </div>
    </header>
  );
};
