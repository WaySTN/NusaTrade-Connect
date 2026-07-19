'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { Menu, X, Globe2, User, LogOut, LayoutDashboard, MessageSquare, ChevronDown, Languages } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Dropdown } from '@/components/ui/Dropdown';
import { useLanguage, Locale } from '@/i18n/LanguageContext';
import { useT } from '@/i18n/useT';

export const PublicNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');

  const pathname = usePathname();
  const router = useRouter();

  const { locale, setLocale } = useLanguage();
  const t = useT();

  const languages: { id: Locale; label: string; icon: string }[] = [
    { id: 'id', label: 'Indonesia', icon: '🇮🇩' },
    { id: 'en', label: 'English', icon: '🇬🇧' },
    { id: 'zh', label: '中文', icon: '🇨🇳' },
    { id: 'ja', label: '日本語', icon: '🇯🇵' },
  ];

  const currentLanguage = languages.find((l) => l.id === locale) || languages[0];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);

    // Check login state
    if (typeof window !== 'undefined') {
      const logged = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(logged);
      setUserRole(localStorage.getItem('userRole'));
      setUserName(localStorage.getItem('userName') || 'User');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userRole');
      localStorage.removeItem('authToken');
      localStorage.removeItem('userName');
      localStorage.removeItem('ppjkId');
      setIsLoggedIn(false);
      router.push('/');
    }
  };

  const getDashboardUrl = () => {
    if (userRole === 'buyer') return '/buyer/dashboard';
    if (userRole === 'ppjk') return '/ppjk/dashboard';
    return '/overview';
  };

  const getChatUrl = () => {
    if (userRole === 'buyer') return '/buyer/dashboard/chat';
    if (userRole === 'ppjk') return '/ppjk/dashboard';
    return '/chat';
  };

  const navLinks = [
    { name: t('nav.katalog'), href: '/katalog' },
    { name: t('nav.mitra_umkm'), href: '/umkm' },
    { name: t('nav.ppjk'), href: '/ppjk' },
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

            {/* Desktop CTA / User Profile Dropdown */}
            <div className="hidden md:flex items-center space-x-3 relative">
              {/* Language Switcher */}
              <Dropdown
                align="right"
                trigger={
                  <div className="flex items-center gap-1.5 p-1.5 px-3 rounded-full bg-[var(--color-bg-subtle)] border border-[var(--color-border)] hover:border-[var(--color-primary-subtle)] transition-all shadow-xs cursor-pointer">
                    <Languages className="w-4 h-4 text-[var(--color-text-muted)]" />
                    <span className="text-xs font-bold text-[var(--color-text-primary)] uppercase">
                      {locale}
                    </span>
                  </div>
                }
                items={languages.map(lang => ({
                  id: lang.id,
                  label: `${lang.icon} ${lang.label}`,
                  onClick: () => setLocale(lang.id),
                }))}
              />

              {isLoggedIn ? (
                <Dropdown
                  align="right"
                  trigger={
                    <div className="flex items-center gap-2.5 p-1.5 pl-3 rounded-full bg-[var(--color-bg-subtle)] border border-[var(--color-border)] hover:border-[var(--color-primary-subtle)] transition-all shadow-xs cursor-pointer">
                      <span className="text-xs font-bold text-[var(--color-text-primary)] max-w-[120px] truncate">
                        {userName}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-xs font-black shadow-sm">
                        {userName.charAt(0).toUpperCase()}
                      </div>
                      <ChevronDown className="w-3.5 h-3.5 text-[var(--color-text-muted)] pr-1" />
                    </div>
                  }
                  header={
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[var(--color-text-primary)] truncate">{userName}</span>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--color-primary)] mt-0.5">
                        {userRole === 'buyer' ? t('nav.buyer') : userRole === 'ppjk' ? t('nav.mitra_ppjk') : t('nav.eksportir_umkm')}
                      </span>
                    </div>
                  }
                  items={[
                    {
                      id: 'dashboard',
                      label: t('nav.dashboard'),
                      icon: <LayoutDashboard className="w-4 h-4 text-[var(--color-primary)]" />,
                      href: getDashboardUrl()
                    },
                    {
                      id: 'chat',
                      label: t('nav.pesan_chat'),
                      icon: <MessageSquare className="w-4 h-4 text-[var(--color-primary)]" />,
                      href: getChatUrl()
                    },
                    {
                      id: 'logout',
                      label: t('nav.logout'),
                      icon: <LogOut className="w-4 h-4" />,
                      onClick: handleLogout,
                      danger: true
                    }
                  ]}
                />
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" className="font-semibold px-5">{t('nav.masuk')}</Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="primary" className="emerald-gradient shadow-sm font-semibold px-5">
                      {t('nav.daftar_gratis')}
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden gap-2">
              <Dropdown
                align="right"
                trigger={
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-bg-subtle)] border border-[var(--color-border)] hover:border-[var(--color-primary-subtle)] transition-all shadow-xs cursor-pointer">
                    <span className="text-[10px] font-bold text-[var(--color-text-primary)] uppercase">
                      {locale}
                    </span>
                  </div>
                }
                items={languages.map(lang => ({
                  id: lang.id,
                  label: `${lang.icon} ${lang.label}`,
                  onClick: () => setLocale(lang.id),
                }))}
              />
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
              {isLoggedIn ? (
                <>
                  <Link href={getDashboardUrl()} onClick={() => setMobileMenuOpen(false)} className="w-full">
                    <Button variant="primary" className="w-full justify-center emerald-gradient h-12 text-base font-semibold">
                      {t('nav.dashboard')}
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={handleLogout} className="w-full justify-center h-12 text-base font-semibold text-red-600 border-red-200">
                    {t('nav.logout')}
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full">
                    <Button variant="outline" className="w-full justify-center h-12 text-base font-semibold">
                      {t('nav.masuk')}
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="w-full">
                    <Button variant="primary" className="w-full justify-center emerald-gradient h-12 text-base font-semibold">
                      {t('nav.daftar_gratis')}
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* Spacer for fixed floating navbar */}
      <div className="h-24"></div>
    </>
  );
};

