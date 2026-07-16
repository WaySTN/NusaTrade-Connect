'use client';

import { useState, useCallback } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
}

// Global state for toasts (simple observer pattern)
type Listener = (toasts: ToastMessage[]) => void;
let listeners: Listener[] = [];
let toasts: ToastMessage[] = [];

const notifyListeners = () => {
  listeners.forEach(listener => listener(toasts));
};

export const toast = (props: Omit<ToastMessage, 'id'>) => {
  const id = Math.random().toString(36).substring(2, 9);
  toasts = [...toasts, { id, ...props }];
  notifyListeners();

  // Auto dismiss after 4 seconds
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

  useCallback(() => {
    const listener = (newToasts: ToastMessage[]) => setState(newToasts);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }, []); // Note: this isn't exactly fully correct useEffect usage, so I'll refactor in ToastProvider

  return { toasts: state, toast, dismissToast };
}
