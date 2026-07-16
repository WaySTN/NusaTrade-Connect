import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'avatar' | 'card' | 'image';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  variant = 'text',
  width,
  height,
  className,
  ...props
}: SkeletonProps) {
  const baseClasses = "skeleton-shimmer bg-[#E2E8F0]";
  
  const variantClasses = {
    text: "h-4 w-full rounded-md",
    avatar: "rounded-full h-10 w-10 shrink-0",
    card: "rounded-xl h-32 w-full",
    image: "rounded-lg h-48 w-full"
  };

  const style = {
    width: width,
    height: height,
  };

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      style={style}
      {...props}
    />
  );
}
