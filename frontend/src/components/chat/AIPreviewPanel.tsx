'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';
import { X, ChevronDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface AIPreviewPanelProps {
  isOpen: boolean;
  onClose: () => void;
  originalText: string;
  businessText: string;
  englishText: string;
  onEdit: () => void;
  onSend: () => void;
}

export const AIPreviewPanel = ({
  isOpen,
  onClose,
  originalText,
  businessText,
  englishText,
  onEdit,
  onSend
}: AIPreviewPanelProps) => {

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm animate-fade-in sm:hidden"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className={cn(
        "fixed sm:absolute bottom-0 inset-x-0 sm:inset-x-auto sm:right-4 sm:bottom-20 z-50",
        "w-full sm:w-[400px] max-h-[85vh] sm:max-h-[600px] flex flex-col",
        "bg-white sm:rounded-2xl rounded-t-2xl shadow-2xl border border-[var(--color-border)]",
        "animate-slide-up"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)] shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#C8941A]" />
            <h3 className="font-display font-semibold text-base text-[var(--color-text-primary)]">
              Preview Pesan
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-md text-[var(--color-text-muted)] hover:bg-[var(--color-bg-subtle)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center">
          
          {/* Original Text */}
          <div className="w-full bg-[var(--color-bg-subtle)] rounded-xl p-3 border border-[var(--color-border)]">
            <div className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5">
              Draft Asli
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] italic">
              "{originalText}"
            </p>
          </div>

          <ChevronDown className="w-6 h-6 text-[#C8941A] my-2" />

          {/* Business Text */}
          <div className="w-full bg-[#E6F5F0]/50 rounded-xl p-3 border border-[#006B52]/20">
            <div className="text-[10px] font-bold text-[#006B52] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006B52]"></span>
              Bahasa Bisnis
            </div>
            <p className="text-sm text-[var(--color-text-primary)]">
              {businessText}
            </p>
          </div>

          <ChevronDown className="w-6 h-6 text-[#C8941A] my-2" />

          {/* English Text */}
          <div className="w-full bg-blue-50/50 rounded-xl p-3 border border-blue-200">
            <div className="text-[10px] font-bold text-blue-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              English Translation
            </div>
            <p className="text-sm text-[var(--color-text-primary)]">
              {englishText}
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-bg-subtle)] shrink-0 sm:rounded-b-2xl flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={onEdit}>
            Edit Ulang
          </Button>
          <Button variant="primary" className="flex-1 emerald-gradient" onClick={onSend}>
            Kirim Pesan
          </Button>
        </div>
      </div>
    </>
  );
};
