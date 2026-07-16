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
      bg: 'bg-[var(--color-bg-subtle)]',
      iconText: 'text-[var(--color-text-muted)]',
      trendUpBg: 'bg-emerald-100',
      trendUpText: 'text-emerald-700',
    },
    emerald: {
      bg: 'bg-emerald-50',
      iconText: 'text-[#006B52]',
      trendUpBg: 'bg-emerald-100',
      trendUpText: 'text-emerald-700',
    },
    gold: {
      bg: 'bg-[#FEF9E7]',
      iconText: 'text-[#C8941A]',
      trendUpBg: 'bg-amber-100',
      trendUpText: 'text-amber-700',
    },
    blue: {
      bg: 'bg-blue-50',
      iconText: 'text-blue-600',
      trendUpBg: 'bg-blue-100',
      trendUpText: 'text-blue-700',
    },
    purple: {
      bg: 'bg-purple-50',
      iconText: 'text-purple-600',
      trendUpBg: 'bg-purple-100',
      trendUpText: 'text-purple-700',
    }
  };

  const style = variants[variant];

  return (
    <Card interactive className={cn("group overflow-hidden relative", className)}>
      {variant === 'gold' && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-full blur-2xl -mr-10 -mt-10"></div>
      )}
      <CardHeader className="pb-2 flex flex-row items-center justify-between relative z-10">
        <CardTitle className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
          {title}
        </CardTitle>
        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm", style.bg)}>
          <Icon className={cn("w-5 h-5", style.iconText)} />
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="text-3xl font-mono font-bold text-[var(--color-text-primary)] tracking-tight">
          {value}
        </div>
        
        {trendValue && (
          <p className="text-xs mt-2 flex items-center gap-1 font-medium">
            <span className={cn(
              "px-1.5 rounded-sm",
              trend === 'up' ? style.trendUpBg + " " + style.trendUpText : 
              trend === 'down' ? "bg-red-100 text-red-700" : 
              "bg-gray-100 text-gray-700"
            )}>
              {trend === 'up' && '↑ '}
              {trend === 'down' && '↓ '}
              {trendValue}
            </span>
          </p>
        )}
      </CardContent>
    </Card>
  );
};
