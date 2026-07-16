import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { Badge } from '@/components/ui/Badge';
import { MockProduct } from '@/lib/mock-data';
import { Package } from 'lucide-react';

export interface ProductCardProps {
  product: MockProduct;
  className?: string;
}

export const ProductCard = ({ product, className }: ProductCardProps) => {
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
        "group flex flex-col bg-white border border-[var(--color-border)] rounded-xl overflow-hidden cursor-pointer",
        "transition-all duration-150 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:border-[#006B52]",
        className
      )}>
        {/* Image Container (1:1 aspect ratio) */}
        <div className="relative w-full aspect-square bg-[var(--color-bg-subtle)] overflow-hidden">
          {product.photoUrl ? (
            <img 
              src={product.photoUrl} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-[var(--color-text-muted)]">
              <Package className="w-12 h-12 mb-2 opacity-20" />
              <span className="text-sm">No Image</span>
            </div>
          )}
          
          {/* Badge overlays */}
          <div className="absolute top-2 left-2 flex flex-col gap-1.5 items-start">
            {product.isVerified && (
              <Badge variant="verified" className="shadow-sm">Verified Seller</Badge>
            )}
          </div>
          
          <div className="absolute bottom-2 right-2">
            <Badge variant="default" className="bg-white/90 backdrop-blur-sm shadow-sm text-xs">
              MOQ: {product.moq} unit
            </Badge>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <div className="text-xs text-[var(--color-text-muted)] mb-1 font-medium tracking-wide truncate">
            {product.category}
          </div>
          
          <h3 className="font-semibold text-sm text-[var(--color-text-primary)] leading-tight mb-1 line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>
          
          <div className="text-xs text-[var(--color-text-secondary)] mb-3 truncate flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center text-[8px] font-bold">
              {product.sellerName.charAt(0)}
            </span>
            {product.sellerName}
          </div>
          
          <div className="mt-auto pt-3 border-t border-[var(--color-border)]">
            <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-0.5">
              Estimasi Harga
            </div>
            <div className="font-mono font-bold text-[#006B52] text-sm flex items-baseline">
              {formatRupiah(product.minPrice)}
              <span className="text-xs text-[var(--color-text-secondary)] font-body font-normal mx-1">-</span>
              {formatRupiah(product.maxPrice)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
