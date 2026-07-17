import React from 'react';
import { cn } from '@/lib/utils/cn';
import { ProductCard } from './ProductCard';
import { MockProduct } from '@/lib/mock-data';
import { Skeleton } from '@/components/ui/Skeleton';
import { PackageX, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface ProductGridProps {
  products: MockProduct[];
  isLoading?: boolean;
  error?: string;
  onRetry?: () => void;
  className?: string;
}

export const ProductGrid = ({ 
  products, 
  isLoading = false, 
  error, 
  onRetry,
  className 
}: ProductGridProps) => {

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center border border-dashed border-red-200 rounded-xl bg-red-50/50">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-500">
          <RefreshCw className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-medium text-[var(--color-text-primary)] mb-2">Gagal memuat katalog</h3>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6 max-w-md">
          {error}
        </p>
        <Button variant="secondary" onClick={onRetry} leftIcon={<RefreshCw className="w-4 h-4" />}>
          Coba Lagi
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6", className)}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col bg-white border border-[var(--color-border)] rounded-xl overflow-hidden">
            <Skeleton variant="image" className="rounded-none h-48 w-full" />
            <div className="p-4 flex flex-col flex-1 gap-2">
              <Skeleton variant="text" width="40%" height={12} />
              <Skeleton variant="text" width="90%" height={20} />
              <Skeleton variant="text" width="60%" height={20} />
              <Skeleton variant="text" width="50%" height={16} className="mt-2" />
              <div className="mt-4 pt-3 border-t border-[var(--color-border)]">
                <Skeleton variant="text" width="30%" height={10} className="mb-2" />
                <Skeleton variant="text" width="70%" height={24} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center border border-dashed border-[var(--color-border)] rounded-xl bg-[var(--color-bg-subtle)]">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-[var(--color-text-muted)]">
          <PackageX className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-medium text-[var(--color-text-primary)] mb-2">Produk Tidak Ditemukan</h3>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6 max-w-md">
          Kami tidak dapat menemukan produk yang sesuai dengan filter Anda. Silakan sesuaikan kriteria pencarian Anda.
        </p>
        <Button variant="secondary" onClick={() => window.location.reload()}>
          Reset Filter
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6", className)}>
      {products.map((product, i) => (
        <div key={product.id} className="animate-slide-up" style={{ animationDelay: `${Math.min(i * 50, 500)}ms` }}>
          <ProductCard product={product} className="h-full" />
        </div>
      ))}
    </div>
  );
};
