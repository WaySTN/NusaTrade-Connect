'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import id from './locales/id.json';
import en from './locales/en.json';
import zh from './locales/zh.json';
import ja from './locales/ja.json';

export type Locale = 'id' | 'en' | 'zh' | 'ja';

export const translations = {
  id,
  en,
  zh,
  ja,
};

type Translations = typeof id;

interface LanguageContextProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>('id');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Component mounted, safe to read from localStorage
    setMounted(true);
    const savedLocale = localStorage.getItem('nusatrade_locale') as Locale;
    if (savedLocale && Object.keys(translations).includes(savedLocale)) {
      setLocaleState(savedLocale);
    } else {
      // Auto detect if no saved locale
      const browserLang = navigator.language.split('-')[0];
      if (Object.keys(translations).includes(browserLang)) {
        setLocaleState(browserLang as Locale);
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nusatrade_locale', newLocale);
    }
  };

  const dir: 'ltr' | 'rtl' = 'ltr';

  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = locale;
    }
  }, [locale, mounted]);

  const value = {
    locale,
    setLocale,
    t: translations[locale] as Translations,
    dir,
  };

  // Render children normally, defaults to ID before hydration to prevent layout shift
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
