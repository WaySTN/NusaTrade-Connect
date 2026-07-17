'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react';

// --- Global Toast Logic ---
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
}

type Listener = (toasts: ToastMessage[]) => void;
let listeners: Listener[] = [];
let toasts: ToastMessage[] = [];

const notifyListeners = () => {
  listeners.forEach(listener => listener([...toasts]));
};

export const toast = (props: Omit<ToastMessage, 'id'>) => {
  const id = Math.random().toString(36).substring(2, 9);
  toasts = [...toasts, { id, ...props }];
  notifyListeners();

  setTimeout(() => {
    dismissToast(id);
  }, 4000);
};

export const dismissToast = (id: string) => {
  toasts = toasts.filter(t => t.id !== id);
  notifyListeners();
};

export function useToast() {
  const [state, setState] = useState<ToastMessage[]>(toasts);

  useEffect(() => {
    const listener = (newToasts: ToastMessage[]) => setState(newToasts);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  return { toasts: state, toast, dismissToast };
}

// --- ToastProvider Component ---
export function ToastProvider() {
  const { toasts, dismissToast } = useToast();

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={() => dismissToast(t.id)} />
      ))}
    </div>
  );
}

// --- Individual Toast Item ---
function ToastItem({ toast, onDismiss }: { toast: ToastMessage; onDismiss: () => void }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleDismiss = () => {
    setIsClosing(true);
    // Allow animation to play before completely removing from DOM
    setTimeout(() => {
      onDismiss();
    }, 300); 
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[var(--color-success)]" />,
    error: <AlertCircle className="w-5 h-5 text-[var(--color-error)]" />,
    warning: <AlertTriangle className="w-5 h-5 text-[var(--color-warning)]" />,
    info: <Info className="w-5 h-5 text-[var(--color-info)]" />
  };

  const colors = {
    success: 'border-[var(--color-success-light)] bg-white text-[var(--color-success)]',
    error: 'border-[var(--color-error-light)] bg-white text-[var(--color-error)]',
    warning: 'border-[var(--color-warning-light)] bg-white text-[var(--color-warning)]',
    info: 'border-[var(--color-info-light)] bg-white text-[var(--color-info)]'
  };
  
  const progressColors = {
    success: 'bg-[var(--color-success)]',
    error: 'bg-[var(--color-error)]',
    warning: 'bg-[var(--color-warning)]',
    info: 'bg-[var(--color-info)]'
  };

  return (
    <div 
      className={cn(
        "pointer-events-auto flex flex-col w-full w-80 rounded-xl border shadow-xl bg-white overflow-hidden",
        "transition-all duration-300 var(--ease-out-quart)",
        isClosing ? "opacity-0 scale-95 translate-x-12" : "animate-slide-in-right",
        colors[toast.type]
      )}
    >
      <div className="flex items-start gap-3 p-4">
        <div className="shrink-0 mt-0.5">
          {icons[toast.type]}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
            {toast.title}
          </h3>
          {toast.description && (
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              {toast.description}
            </p>
          )}
        </div>
        <button 
          onClick={handleDismiss}
          className="shrink-0 rounded-lg p-1.5 hover:bg-[var(--color-bg-subtle)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      {/* Progress Bar */}
      <div className="h-1 w-full bg-[var(--color-bg-subtle)]">
        <div 
          className={cn("h-full", progressColors[toast.type])}
          style={{ animation: 'toast-progress 4s linear forwards' }}
        />
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes toast-progress {
          0% { width: 100%; }
          100% { width: 0%; }
        }
      `}} />
    </div>
  );
}
