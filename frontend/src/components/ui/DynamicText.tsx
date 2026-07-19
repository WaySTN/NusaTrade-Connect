'use client';

import { useDynamicText } from '@/i18n/useDynamicText';

export function DynamicText({ text, className }: { text: string; className?: string }) {
  const translated = useDynamicText(text);
  return <span className={className}>{translated}</span>;
}
