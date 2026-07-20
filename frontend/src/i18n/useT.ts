import { useLanguage } from './LanguageContext';
import { useCallback } from 'react';

export function useT() {
  const { t } = useLanguage();

  // Helper to get nested value by dot notation (e.g. 'hero.title') with optional fallback
  return useCallback(function translate(key: string, fallback?: string): string {
    const keys = key.split('.');
    let result: any = t;
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k as keyof typeof result];
      } else {
        return fallback !== undefined ? fallback : key;
      }
    }
    
    return typeof result === 'string' ? result : (fallback !== undefined ? fallback : key);
  }, [t]);
}
