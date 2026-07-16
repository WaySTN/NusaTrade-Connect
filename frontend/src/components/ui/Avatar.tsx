import React from 'react';
import { cn } from '@/lib/utils/cn';
import { Check } from 'lucide-react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isVerified?: boolean;
}

export function Avatar({
  src,
  initials,
  size = 'md',
  isVerified = false,
  className,
  ...props
}: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl'
  };

  const verifiedBadgeSize = {
    sm: 'w-3 h-3 text-[8px]',
    md: 'w-4 h-4 text-[10px]',
    lg: 'w-5 h-5 text-xs',
    xl: 'w-6 h-6 text-sm'
  };

  // Extract initials if not provided
  let displayInitials = initials;
  if (!displayInitials) {
    displayInitials = "?";
  }

  return (
    <div className={cn("relative inline-block shrink-0", sizeClasses[size], className)} {...props}>
      {src ? (
        <img
          src={src}
          alt="Avatar"
          className="w-full h-full rounded-full object-cover border border-[var(--color-border)]"
        />
      ) : (
        <div className="w-full h-full rounded-full bg-[var(--color-bg-subtle)] border border-[var(--color-border)] flex items-center justify-center font-medium text-[var(--color-text-secondary)] font-display">
          {displayInitials}
        </div>
      )}
      
      {isVerified && (
        <div 
          className={cn(
            "absolute bottom-0 right-0 bg-[#006B52] rounded-full flex items-center justify-center text-white border border-white",
            verifiedBadgeSize[size]
          )}
          title="Verified Seller"
        >
          <Check strokeWidth={3} className="w-[70%] h-[70%]" />
        </div>
      )}
    </div>
  );
}
