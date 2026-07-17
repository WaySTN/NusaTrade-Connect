import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const PageHeader = ({
  title,
  description,
  action,
  className
}: PageHeaderProps) => {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8", className)}>
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-[var(--color-text-primary)] tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-[var(--color-text-secondary)] font-medium mt-1.5">
            {description}
          </p>
        )}
      </div>
      
      {action && (
        <div className="animate-slide-up duration-300 var(--ease-out-quart)">
          {action}
        </div>
      )}
    </div>
  );
};
