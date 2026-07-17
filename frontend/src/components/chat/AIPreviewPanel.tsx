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
        className="fixed inset-0 z-40 bg-[var(--color-bg-base)]/60 backdrop-blur-sm animate-fade-in sm:hidden"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className={cn(
        "fixed sm:absolute bottom-0 inset-x-0 sm:inset-x-auto sm:right-6 sm:bottom-24 z-50",
        "w-full sm:w-[420px] max-h-[85vh] sm:max-h-[600px] flex flex-col",
        "bg-white sm:rounded-2xl rounded-t-2xl shadow-2xl shadow-[var(--color-primary)]/10 border border-[var(--color-border-strong)]",
        "animate-slide-up duration-300 var(--ease-out-quart)"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)] shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[var(--color-warning)]/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[var(--color-warning)]" />
            </div>
            <h3 className="font-display font-bold text-base text-[var(--color-text-primary)]">
              Preview Pesan AI
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)] transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col items-center">
          
          {/* Original Text */}
          <div className="w-full bg-[var(--color-bg-subtle)] rounded-xl p-4 border border-[var(--color-border)]">
            <div className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
              Draft Asli
            </div>
            <p className="text-sm font-medium text-[var(--color-text-secondary)] italic">
              "{originalText}"
            </p>
          </div>

          <ChevronDown className="w-6 h-6 text-[var(--color-warning)]/50 my-3" />

          {/* Business Text */}
          <div className="w-full bg-[var(--color-primary-subtle)]/50 rounded-xl p-4 border border-[var(--color-primary)]/20 shadow-sm">
            <div className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]"></span>
              Bahasa Bisnis
            </div>
            <p className="text-sm font-bold text-[var(--color-text-primary)] leading-relaxed">
              {businessText}
            </p>
          </div>

          <ChevronDown className="w-6 h-6 text-[var(--color-warning)]/50 my-3" />

          {/* English Text */}
          <div className="w-full bg-blue-50/50 rounded-xl p-4 border border-blue-200 shadow-sm">
            <div className="text-[10px] font-bold text-blue-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              English Translation
            </div>
            <p className="text-sm font-bold text-[var(--color-text-primary)] leading-relaxed">
              {englishText}
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-5 border-t border-[var(--color-border)] bg-[var(--color-bg-subtle)]/50 shrink-0 sm:rounded-b-2xl flex gap-3">
          <Button variant="outline" className="flex-1 font-bold border-[var(--color-border-strong)] bg-white" onClick={onEdit}>
            Edit Ulang
          </Button>
          <Button variant="primary" className="flex-1 shadow-lg shadow-[var(--color-primary)]/20 font-bold" onClick={onSend}>
            Kirim Pesan
          </Button>
        </div>
      </div>
    </>
  );
};
