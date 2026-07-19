'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

export function useDynamicTranslate() {
  const { language } = useLanguage();

  const tDynamic = (text: string) => {
    // For synchronous initial render, we return the original text, 
    // but the component using this should probably handle state.
    // Instead of returning a string, this hook should perhaps return a component 
    // or we just return a function that returns the translated state.
    throw new Error('useDynamicTranslate should not be used this way');
  };

  return tDynamic;
}
