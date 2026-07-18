import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { LucideIcon } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: LucideIcon;
  endIcon?: LucideIcon;
  floatingLabel?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, label, error, helperText, startIcon: StartIcon, endIcon: EndIcon, disabled, floatingLabel, type, ...props },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
    const hasError = Boolean(error);

    return (
      <div className={cn("flex flex-col gap-1.5 w-full", hasError && "animate-[pulse-red_0.5s_ease-out-quart]")}>
        {label && !floatingLabel && (
          <label className={cn(
            "text-sm font-semibold transition-colors duration-200", 
            disabled ? "text-[var(--color-text-muted)]" : hasError ? "text-[var(--color-error)]" : "text-[var(--color-text-primary)]"
          )}>
            {label}
          </label>
        )}
        <div className="relative flex items-center group">
          {StartIcon && (
            <div className={cn(
              "absolute left-4 flex items-center justify-center pointer-events-none transition-colors duration-200",
              hasError ? "text-[var(--color-error)]" : "text-[var(--color-text-placeholder)] group-focus-within:text-[var(--color-primary)]"
            )}>
              <StartIcon className="w-5 h-5" />
            </div>
          )}
          
          <input
            ref={ref}
            disabled={disabled}
            type={inputType}
            placeholder={floatingLabel ? " " : props.placeholder}
            className={cn(
              "peer flex h-12 w-full rounded-xl border bg-white px-4 py-2 text-sm text-[var(--color-text-primary)] transition-all duration-300 var(--ease-out-quart) file:border-0 file:bg-transparent file:text-sm file:font-semibold",
              "placeholder:text-[var(--color-text-placeholder)]",
              "focus:outline-none focus:ring-2 focus:ring-offset-0 focus:border-transparent",
              "disabled:cursor-not-allowed disabled:bg-[var(--color-bg-subtle)] disabled:text-[var(--color-text-muted)]",
              hasError 
                ? "border-[var(--color-error)] focus:ring-[var(--color-error-light)]" 
                : "border-[var(--color-border-strong)] hover:border-[var(--color-primary)] focus:ring-[var(--color-primary-light)] focus:border-[var(--color-primary)]",
              StartIcon && "pl-12",
              (EndIcon || isPassword) && "pr-12",
              className
            )}
            {...props}
          />
          
          {floatingLabel && label && (
            <label className={cn(
              "absolute left-4 text-[var(--color-text-placeholder)] transition-all duration-300 var(--ease-out-quart) pointer-events-none",
              "peer-focus:-translate-y-6 peer-focus:text-xs peer-focus:font-semibold",
              "peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold",
              hasError ? "peer-focus:text-[var(--color-error)]" : "peer-focus:text-[var(--color-primary)]",
              StartIcon && "left-12"
            )}>
              {label}
            </label>
          )}

          {isPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={cn(
                "absolute right-4 flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-md",
                hasError ? "text-[var(--color-error)]" : "text-[var(--color-text-placeholder)] hover:text-[var(--color-text-primary)]"
              )}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" y1="2" x2="22" y2="22"></line></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              )}
            </button>
          ) : EndIcon ? (
            <div className={cn(
              "absolute right-4 flex items-center justify-center pointer-events-none transition-colors",
              hasError ? "text-[var(--color-error)]" : "text-[var(--color-text-placeholder)] group-focus-within:text-[var(--color-primary)]"
            )}>
              <EndIcon className="w-5 h-5" />
            </div>
          ) : null}
        </div>
        {(error || helperText) && (
          <p className={cn("text-xs flex items-center gap-1 mt-0.5 animate-slide-up", error ? "text-[var(--color-error)] font-medium" : "text-[var(--color-text-muted)]")}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
