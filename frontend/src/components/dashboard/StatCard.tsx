import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils/cn';
import { LucideIcon } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon: LucideIcon;
  variant?: 'default' | 'emerald' | 'gold' | 'blue' | 'purple';
  className?: string;
}

export const StatCard = ({
  title,
  value,
  trend,
  trendValue,
  icon: Icon,
  variant = 'default',
  className
}: StatCardProps) => {

  const variants = {
    default: {
      bg: 'bg-[var(--color-bg-subtle)] border border-[var(--color-border)]',
      iconText: 'text-[var(--color-text-muted)]',
      trendUpBg: 'bg-emerald-100',
      trendUpText: 'text-emerald-700',
    },
    emerald: {
      bg: 'bg-[var(--color-primary-subtle)] border border-[var(--color-primary)]/20',
      iconText: 'text-[var(--color-primary)]',
      trendUpBg: 'bg-[var(--color-primary-subtle)]',
      trendUpText: 'text-[var(--color-primary)]',
    },
    gold: {
      bg: 'bg-[var(--color-warning)]/10 border border-[var(--color-warning)]/20',
      iconText: 'text-[var(--color-warning)]',
      trendUpBg: 'bg-[var(--color-warning)]/10',
      trendUpText: 'text-[var(--color-warning-hover)]',
    },
    blue: {
      bg: 'bg-blue-50 border border-blue-200',
      iconText: 'text-blue-600',
      trendUpBg: 'bg-blue-100',
      trendUpText: 'text-blue-700',
    },
    purple: {
      bg: 'bg-purple-50 border border-purple-200',
      iconText: 'text-purple-600',
      trendUpBg: 'bg-purple-100',
      trendUpText: 'text-purple-700',
    }
  };

  const style = variants[variant];

  return (
    <Card interactive className={cn("group overflow-hidden relative border-[var(--color-border)] shadow-sm hover:shadow-lg transition-all duration-300 var(--ease-out-quart) rounded-2xl", className)}>
      {variant === 'gold' && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-full blur-2xl -mr-10 -mt-10"></div>
      )}
      <CardHeader className="pb-2 flex flex-row items-center justify-between relative z-10 p-5">
        <CardTitle className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
          {title}
        </CardTitle>
        <div className={cn("w-12 h-12 rounded-[14px] flex items-center justify-center transition-transform duration-300 var(--ease-out-quart) group-hover:scale-110 shadow-sm", style.bg)}>
          <Icon className={cn("w-6 h-6", style.iconText)} />
        </div>
      </CardHeader>
      <CardContent className="relative z-10 px-5 pb-5 pt-0">
        <div className="text-3xl font-display font-bold text-[var(--color-text-primary)] tracking-tight">
          {value}
        </div>
        
        {trendValue && (
          <p className="text-xs mt-3 flex items-center gap-1.5 font-bold">
            <span className={cn(
              "px-2 py-0.5 rounded-[4px]",
              trend === 'up' ? style.trendUpBg + " " + style.trendUpText : 
              trend === 'down' ? "bg-red-100 text-red-700" : 
              "bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]"
            )}>
              {trend === 'up' && '↑ '}
              {trend === 'down' && '↓ '}
              {trendValue}
            </span>
            <span className="text-[var(--color-text-muted)] font-medium">vs bulan lalu</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
};
