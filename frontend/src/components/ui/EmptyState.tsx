import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const EmptyState = ({
  icon,
  title,
  description,
  action,
  size = 'md',
  className,
}: EmptyStateProps) => {
  const sizeClasses = {
    sm: 'p-6 sm:p-8',
    md: 'p-8 sm:p-12',
    lg: 'py-16 px-8 sm:px-12 sm:py-24'
  };
  
  const iconSizeClasses = {
    sm: 'w-12 h-12 mb-3',
    md: 'w-16 h-16 mb-4',
    lg: 'w-20 h-20 mb-5'
  };

  return (
    <div className={cn("flex flex-col items-center justify-center text-center border-2 border-dashed border-[var(--color-border-strong)] rounded-3xl bg-[var(--color-bg-subtle)] animate-slide-up duration-300 var(--ease-out-quart)", sizeClasses[size], className)}>
      {icon && (
        <div className={cn("bg-white rounded-full flex items-center justify-center border border-[var(--color-border)] shadow-sm text-[var(--color-primary)] bg-[var(--color-primary-subtle)]/30", iconSizeClasses[size])}>
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
