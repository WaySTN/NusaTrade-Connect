import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { LucideIcon } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: LucideIcon;
  endIcon?: LucideIcon;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, label, error, helperText, startIcon: StartIcon, endIcon: EndIcon, disabled, ...props },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = props.type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : props.type;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className={cn("text-sm font-semibold", disabled ? "text-[var(--color-text-muted)]" : "text-[var(--color-text-primary)]")}>
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {StartIcon && (
            <div className="absolute left-3.5 flex items-center justify-center pointer-events-none text-[var(--color-text-placeholder)]">
              <StartIcon className="w-5 h-5" />
            </div>
          )}
          <input
            ref={ref}
            disabled={disabled}
            type={inputType}
            className={cn(
              "flex h-12 w-full rounded-xl border bg-white px-4 py-2 text-sm text-[var(--color-text-primary)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium",
              "placeholder:text-[#94A3B8]",
              "focus:outline-none focus:ring-2 focus:ring-[#006B52] focus:border-transparent",
              "disabled:cursor-not-allowed disabled:bg-[var(--color-bg-subtle)] disabled:text-[var(--color-text-muted)]",
              error ? "border-red-500 focus:ring-red-500" : "border-[var(--color-border-strong)] focus:border-transparent",
              StartIcon && "pl-11",
              (EndIcon || isPassword) && "pr-11",
              className
            )}
            {...props}
          />
          {isPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 flex items-center justify-center text-[var(--color-text-placeholder)] hover:text-[var(--color-text-primary)] focus:outline-none transition-colors cursor-pointer"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" y1="2" x2="22" y2="22"></line></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              )}
            </button>
          ) : EndIcon ? (
            <div className="absolute right-3.5 flex items-center justify-center pointer-events-none text-[var(--color-text-placeholder)]">
              <EndIcon className="w-5 h-5" />
            </div>
          ) : null}
        </div>
        {(error || helperText) && (
          <p className={cn("text-xs", error ? "text-red-500" : "text-[var(--color-text-muted)]")}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
