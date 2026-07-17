'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';

export interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export const Tooltip = ({ 
  children, 
  content, 
  position = 'top',
  className 
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-[var(--color-bg-strong)] border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-[var(--color-bg-strong)] border-l-transparent border-r-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-[var(--color-bg-strong)] border-t-transparent border-b-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-[var(--color-bg-strong)] border-t-transparent border-b-transparent border-l-transparent',
  };

  return (
    <div 
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      
      {isVisible && (
        <div className={cn(
          "absolute z-50 px-3 py-1.5 text-xs font-medium text-white bg-[var(--color-bg-strong)] rounded-lg shadow-md whitespace-nowrap animate-in fade-in zoom-in-95 duration-200 var(--ease-out-quart)",
          positionClasses[position],
          className
        )}>
          {content}
          <div className={cn(
            "absolute w-0 h-0 border-[5px]",
            arrowClasses[position]
          )} />
        </div>
      )}
    </div>
  );
};
