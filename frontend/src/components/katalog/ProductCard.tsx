import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { Badge } from '@/components/ui/Badge';
import { MockProduct } from '@/lib/mock-data';
import { Package } from 'lucide-react';
import { DynamicText } from '@/components/ui/DynamicText';
import { useT } from '@/i18n/useT';

export interface ProductCardProps {
  product: MockProduct;
  className?: string;
}

export const ProductCard = ({ product, className }: ProductCardProps) => {
  const t = useT();

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Link href={`/katalog/${product.slug}`}>
      <div className={cn(
        "group flex flex-col bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden cursor-pointer",
        "transition-all duration-300 var(--ease-out-quart) hover-lift hover:shadow-lg hover:border-[var(--color-primary-light)] hover:ring-4 hover:ring-[var(--color-primary-light)]/20",
        className
      )}>
        {/* Image Container (1:1 aspect ratio) */}
        <div className="relative w-full aspect-square bg-[var(--color-bg-subtle)] overflow-hidden">
          {product.photoUrl ? (
            <img 
              src={product.photoUrl} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 var(--ease-out-quart) group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-[var(--color-text-muted)] transition-transform duration-500 var(--ease-out-quart) group-hover:scale-105">
              <Package className="w-12 h-12 mb-2 opacity-20" />
              <span className="text-sm font-medium">No Image</span>
            </div>
          )}
          
          {/* Badge overlays */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 items-start">
            {product.isVerified && (
              <Badge variant="verified" dot pulse className="shadow-sm backdrop-blur-md bg-white/90">Verified Seller</Badge>
            )}
          </div>
          
          <div className="absolute bottom-3 right-3">
            <Badge variant="default" className="bg-white/90 backdrop-blur-md shadow-sm text-xs font-bold border-[var(--color-border)]">
              MOQ: {product.moq} unit
            </Badge>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <div className="text-xs text-[var(--color-primary)] mb-1.5 font-bold tracking-wide uppercase truncate">
            <DynamicText text={product.category} />
          </div>
          
          <h3 className="font-bold text-[var(--color-text-primary)] leading-snug mb-1.5 line-clamp-2 min-h-[2.75rem] group-hover:text-[var(--color-primary)] transition-colors duration-200">
            <DynamicText text={product.name} />
          </h3>
          
          <div className="text-xs text-[var(--color-text-secondary)] mb-4 truncate flex items-center gap-2 font-medium">
            <div className="w-5 h-5 rounded-md bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center text-[10px] font-bold border border-[var(--color-primary-subtle)]">
              {product.sellerName.charAt(0)}
            </div>
            <DynamicText text={product.sellerName} />
          </div>
          
          <div className="mt-auto pt-3 border-t border-[var(--color-border)]">
            <div className="text-[10px] text-[var(--color-text-muted)] font-semibold uppercase tracking-wider mb-1">
              {t('landing.est_price') || 'Estimasi Harga'}
            </div>
            <div className="font-mono font-bold text-[var(--color-primary)] text-sm flex items-baseline truncate">
              {formatRupiah(product.minPrice)}
              <span className="text-xs text-[var(--color-text-secondary)] font-body font-normal mx-1.5">-</span>
              {formatRupiah(product.maxPrice)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
