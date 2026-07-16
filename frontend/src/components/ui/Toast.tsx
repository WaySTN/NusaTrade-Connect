'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

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
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
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
    }, 150); 
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />
  };

  const borders = {
    success: 'border-emerald-200 bg-emerald-50',
    error: 'border-red-200 bg-red-50',
    warning: 'border-amber-200 bg-amber-50',
    info: 'border-blue-200 bg-blue-50'
  };

  return (
    <div 
      className={cn(
        "pointer-events-auto flex items-start gap-3 w-full max-w-sm rounded-lg border p-4 shadow-lg bg-white",
        "transition-all",
        borders[toast.type],
        isClosing ? "opacity-0 scale-95 duration-150" : "animate-slide-in-right"
      )}
    >
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
        className="shrink-0 rounded-md p-1 hover:bg-black/5 text-[var(--color-text-muted)] transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
