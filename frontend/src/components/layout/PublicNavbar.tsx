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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Katalog', href: '/katalog' },
    { name: 'Mitra UMKM', href: '/umkm' },
    { name: 'PPJK', href: '/ppjk' },
  ];

  return (
    <>
      <nav className={cn(
        "fixed z-50 transition-all duration-300 ease-out",
        "left-4 right-4 lg:left-8 lg:right-8",
        scrolled ? "top-2" : "top-4 lg:top-6"
      )}>
        <div className={cn(
          "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-2xl transition-all duration-300",
          scrolled 
            ? "bg-white/90 backdrop-blur-lg shadow-md border border-[var(--color-border)]"
            : "bg-white/50 backdrop-blur-sm border border-transparent shadow-sm"
        )}>
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="font-display font-bold text-xl lg:text-2xl text-[var(--color-text-primary)] inline-flex items-center gap-2 group">
                <Globe2 className="w-6 h-6 lg:w-7 lg:h-7 text-[var(--color-primary)] group-hover:rotate-12 transition-transform duration-300" />
                <span className="tracking-tight">Nusa<span className="text-[var(--color-primary)]">Trade</span></span>
              </Link>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link 
                    key={link.name} 
                    href={link.href}
                    className="relative px-3 py-2 text-sm font-semibold group"
                  >
                    <span className={cn(
                      "relative z-10 transition-colors duration-200",
                      isActive ? "text-[var(--color-primary)]" : "text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)]"
                    )}>
                      {link.name}
                    </span>
                    {/* Active/Hover Indicator */}
                    <span className={cn(
                      "absolute inset-0 rounded-lg bg-[var(--color-bg-subtle)] transition-transform duration-300 var(--ease-out-quart)",
                      isActive ? "scale-100 opacity-100" : "scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                    )} />
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-3">
                <>
                  <Link href="/login">
                    <Button variant="ghost" className="font-semibold px-5">Masuk</Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="primary" className="emerald-gradient shadow-sm font-semibold px-5">
                      Daftar Gratis
                    </Button>
                  </Link>
                </>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 -mr-2 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)] transition-colors"
                aria-expanded={mobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                <div className="relative w-6 h-6">
                  <Menu className={cn("absolute inset-0 transition-all duration-300 var(--ease-out-quart)", mobileMenuOpen ? "scale-50 opacity-0 rotate-90" : "scale-100 opacity-100 rotate-0")} />
                  <X className={cn("absolute inset-0 transition-all duration-300 var(--ease-out-quart)", mobileMenuOpen ? "scale-100 opacity-100 rotate-0" : "scale-50 opacity-0 -rotate-90")} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={cn(
          "md:hidden absolute top-full left-0 right-0 mt-2 mx-auto max-w-7xl origin-top transition-all duration-300 var(--ease-out-quart)",
          mobileMenuOpen ? "scale-y-100 opacity-100 visible" : "scale-y-95 opacity-0 invisible"
        )}>
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-[var(--color-border)] p-4 overflow-hidden">
            <div className="space-y-1 mb-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "block px-4 py-3 rounded-xl text-base font-medium transition-colors",
                      isActive 
                        ? "bg-[var(--color-primary-subtle)] text-[var(--color-primary)]" 
                        : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)]"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
            
              <div className="flex flex-col gap-3 pt-4 border-t border-[var(--color-border)]">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full">
                  <Button variant="outline" className="w-full justify-center h-12 text-base font-semibold">
                    Masuk
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="w-full">
                  <Button variant="primary" className="w-full justify-center emerald-gradient h-12 text-base font-semibold">
                    Daftar Gratis
                  </Button>
                </Link>
              </div>
          </div>
        </div>
      </nav>
      {/* Spacer for fixed floating navbar */}
      <div className="h-24"></div>
    </>
  );
};
