import React, { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 var(--ease-out-quart) cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97]";
    
    const variants = {
      primary: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)] focus-visible:ring-[var(--color-primary)] shadow-sm hover:shadow-md",
      accent: "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] focus-visible:ring-[var(--color-accent)] shadow-sm hover:shadow-md",
      secondary: "bg-[var(--color-primary-light)] text-[var(--color-primary)] hover:bg-[#D1EBE2] focus-visible:ring-[var(--color-primary)]",
      outline: "bg-transparent border border-[var(--color-border-strong)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] focus-visible:ring-[var(--color-primary)]",
      ghost: "bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)] focus-visible:ring-[var(--color-border)]",
      danger: "bg-[var(--color-error-light)] text-[var(--color-error)] hover:bg-[#FEE2E2] focus-visible:ring-[var(--color-error)]",
    };

    const sizes = {
      sm: "h-9 px-3 text-xs",
      md: "h-11 px-5 text-sm",
      lg: "h-13 px-6 text-base",
      icon: "h-11 w-11 p-2",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
        )}
        {!isLoading && leftIcon && <span className={cn("mr-2", size === 'icon' && "mr-0")}>{leftIcon}</span>}
        <span className={cn(size === 'icon' && !children ? "sr-only" : "")}>
          {children}
        </span>
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
