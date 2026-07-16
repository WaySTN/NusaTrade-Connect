import React, { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'verified' | 'premium' | 'success' | 'warning' | 'error' | 'info' | 'pending';
  pulse?: boolean;
}

export const Badge = ({
  className,
  variant = 'default',
  pulse = false,
  children,
  ...props
}: BadgeProps) => {
  const baseStyles = "inline-flex items-center gap-1.5 rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors";
  
  const variants = {
    default: "bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] border border-[var(--color-border)]",
    verified: "bg-[var(--color-verified-bg)] text-[var(--color-verified)]",
    premium: "bg-[var(--color-premium-bg)] text-[var(--color-premium)]",
    success: "bg-[var(--color-success-light)] text-[var(--color-success)]",
    warning: "bg-[var(--color-warning-light)] text-[var(--color-warning)]",
    error: "bg-[var(--color-error-light)] text-[var(--color-error)]",
    info: "bg-[var(--color-info-light)] text-[var(--color-info)]",
    pending: "bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] border border-dashed border-[var(--color-text-placeholder)]",
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props}>
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-40"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
        </span>
      )}
      {children}
    </div>
  );
};
