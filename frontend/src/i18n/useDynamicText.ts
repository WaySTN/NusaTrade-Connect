'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

export function useDynamicText(text: string) {
  const { locale } = useLanguage();
  const [translated, setTranslated] = useState(text);

  useEffect(() => {
    if (!text) return;
    
    // If it's Indonesian (original), just use original text
    if (locale === 'id') {
      setTranslated(text);
      return;
    }

    // Check cache
    const cacheKey = `tr_${locale}_${text.substring(0, 50)}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setTranslated(cached);
      return;
    }

    // Fetch from our proxy API
    let isMounted = true;
    
    fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, targetLang: locale }),
    })
      .then(res => res.json())
      .then(data => {
        if (isMounted && data.text) {
          setTranslated(data.text);
          try {
            localStorage.setItem(cacheKey, data.text);
          } catch (e) {
            // Ignore quota errors
          }
        }
      })
      .catch(err => {
        console.error('Dynamic translation failed', err);
        if (isMounted) setTranslated(text);
      });

    return () => {
      isMounted = false;
    };
  }, [text, locale]);

  return translated;
}
