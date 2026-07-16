'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { Menu, X, Globe2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const PublicNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const isAuthPage = pathname === '/login' || pathname.startsWith('/register');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Katalog', href: '/katalog' },
    { name: 'Mitra PPJK', href: '/ppjk' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 inset-x-0 z-50 transition-all duration-[var(--duration-normal)] bg-white/75 backdrop-blur-md border-b border-transparent",
      scrolled && "shadow-sm border-[var(--color-border)] bg-white/95"
    )}>
      <div className="w-full px-6 lg:px-12">
        <div className="flex justify-between items-center h-[var(--header-height)]">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-display font-bold text-2xl text-[#006B52] inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Globe2 className="w-7 h-7 text-[#C8941A]" />
              NusaTrade
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-sm font-semibold text-[var(--color-text-secondary)] hover:text-[#006B52] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthPage && (
              <>
                <Link href="/login">
                  <Button variant="ghost">Masuk</Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" className="emerald-gradient shadow-md">Daftar Gratis</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#006B52]"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden animate-fade-in border-t border-[var(--color-border)] bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)]"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-[var(--color-border)] px-5 space-y-3">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-center">Masuk</Button>
            </Link>
            <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full justify-center emerald-gradient">Daftar Gratis</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
