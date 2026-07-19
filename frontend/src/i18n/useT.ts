import { useLanguage } from './LanguageContext';
import { useCallback } from 'react';

type NestedKeyOf<ObjectType extends object> = 
{[Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
: `${Key}`
}[keyof ObjectType & (string | number)];

export function useT() {
  const { t } = useLanguage();

  // Helper to get nested value by dot notation (e.g. 'hero.title')
  return useCallback(function translate(key: string): string {
    const keys = key.split('.');
    let result: any = t;
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k as keyof typeof result];
      } else {
        return key; // Fallback to key if not found
      }
    }
    
    return typeof result === 'string' ? result : key;
  }, [t]);
}
