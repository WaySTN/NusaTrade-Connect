import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState = ({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 sm:p-12 text-center border-2 border-dashed border-[var(--color-border-strong)] rounded-3xl bg-[var(--color-bg-subtle)] animate-slide-up duration-300 var(--ease-out-quart)", className)}>
      {icon && (
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-5 border border-[var(--color-border)] shadow-sm text-[var(--color-text-muted)]">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
        {title}
      </h3>
      <p className="text-sm font-medium text-[var(--color-text-secondary)] max-w-sm mx-auto mb-6">
        {description}
      </p>
      {action && (
        <div className="mt-2">
          {action}
        </div>
      )}
    </div>
  );
};
