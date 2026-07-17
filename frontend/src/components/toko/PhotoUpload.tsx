'use client';

import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { ImagePlus, X, UploadCloud, Loader2 } from 'lucide-react';

export interface PhotoUploadProps {
  maxPhotos?: number;
  onPhotosChange?: (urls: string[]) => void;
  initialPhotos?: string[];
}

export const PhotoUpload = ({ maxPhotos = 5, onPhotosChange, initialPhotos = [] }: PhotoUploadProps) => {
  const [photos, setPhotos] = useState<{ url: string; isMain: boolean; loading: boolean }[]>(
    initialPhotos.map((url, i) => ({ url, isMain: i === 0, loading: false }))
  );
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFiles = (files: File[]) => {
    const spaceLeft = maxPhotos - photos.length;
    const filesToUpload = files.slice(0, spaceLeft);
    
    filesToUpload.forEach(file => {
      const tempUrl = URL.createObjectURL(file);
      const isMain = photos.length === 0; // first photo is main
      
      const newPhoto = { url: tempUrl, isMain, loading: true };
      
      setPhotos(prev => {
        const next = [...prev, newPhoto];
        if (next.length === 1) next[0].isMain = true;
        return next;
      });
      
      // Simulate upload delay
      setTimeout(() => {
        setPhotos(prev => {
          const updated = [...prev];
          const index = updated.findIndex(p => p.url === tempUrl);
          if (index !== -1) {
            updated[index] = { ...updated[index], loading: false };
          }
          onPhotosChange?.(updated.filter(p => !p.loading).map(p => p.url));
          return updated;
        });
      }, 1000);
    });
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => {
      const next = prev.filter((_, i) => i !== index);
      if (next.length > 0 && prev[index].isMain) {
        next[0].isMain = true; // reassing main if removed
      }
      onPhotosChange?.(next.map(p => p.url));
      return next;
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end mb-3">
        <label className="text-sm font-bold text-[var(--color-text-primary)]">Foto Produk (Maks. {maxPhotos})</label>
        <span className="text-xs font-bold text-[var(--color-text-secondary)] bg-[var(--color-bg-subtle)] px-2.5 py-1 rounded-full">{photos.length}/{maxPhotos} Foto</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        
        {/* Main Photo / Upload Trigger if empty */}
        {photos.length === 0 ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="col-span-2 sm:col-span-2 aspect-square rounded-2xl border-2 border-dashed border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] flex flex-col items-center justify-center cursor-pointer hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-subtle)] transition-all duration-300 var(--ease-out-quart) group relative overflow-hidden shadow-sm hover:shadow-md"
          >
            <UploadCloud className="w-12 h-12 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] mb-3 transition-colors duration-300 transform group-hover:-translate-y-1" />
            <p className="text-sm font-bold text-[var(--color-text-primary)] mb-1 text-center px-4">Klik atau Tarik Foto Utama</p>
            <p className="text-xs font-medium text-[var(--color-text-secondary)] text-center px-4">Format: JPG, PNG (Maks 5MB)</p>
          </div>
        ) : (
          <div className="col-span-2 sm:col-span-2 aspect-square rounded-2xl border-[3px] border-[var(--color-primary)] overflow-hidden relative group shadow-sm">
            <img src={photos[0].url} className={cn("w-full h-full object-cover transition-transform duration-500 var(--ease-out-quart) group-hover:scale-105", photos[0].loading && "opacity-50")} alt="Main product" />
            <div className="absolute top-3 left-3 bg-[var(--color-primary)] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-lg shadow-sm shadow-[var(--color-primary)]/30 tracking-wider">
              FOTO UTAMA
            </div>
            
            {photos[0].loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-text-primary)]/10 backdrop-blur-sm">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            )}
            
            <button 
              onClick={(e) => { e.stopPropagation(); removePhoto(0); }}
              className="absolute top-3 right-3 w-8 h-8 bg-[var(--color-error)] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-[var(--color-error)] hover:scale-110 shadow-sm"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Additional Photos Slots */}
        {[...Array(maxPhotos - 1)].map((_, idx) => {
          const photoIndex = idx + 1;
          const photo = photos[photoIndex];
          
          if (photo) {
            return (
              <div key={idx} className="aspect-square rounded-2xl border border-[var(--color-border)] overflow-hidden relative group shadow-sm">
                <img src={photo.url} className={cn("w-full h-full object-cover transition-transform duration-500 var(--ease-out-quart) group-hover:scale-105", photo.loading && "opacity-50")} alt={`Product ${idx+2}`} />
                
                {photo.loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-text-primary)]/10 backdrop-blur-sm">
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  </div>
                )}
                
                <button 
                  onClick={(e) => { e.stopPropagation(); removePhoto(photoIndex); }}
                  className="absolute top-2 right-2 w-7 h-7 bg-[var(--color-error)] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-[var(--color-error)] hover:scale-110 shadow-sm"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          } else {
            return (
              <div 
                key={idx}
                onClick={() => {
                  if (photos.length > 0) fileInputRef.current?.click();
                }}
                className={cn(
                  "aspect-square rounded-2xl border-2 border-dashed border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] flex flex-col items-center justify-center transition-all duration-200",
                  photos.length > 0 ? "cursor-pointer hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-subtle)] group" : "opacity-50 cursor-not-allowed"
                )}
              >
                <ImagePlus className={cn("w-7 h-7 text-[var(--color-text-muted)]", photos.length > 0 && "group-hover:text-[var(--color-primary)] transition-colors")} />
              </div>
            );
          }
        })}

      </div>
      
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/jpeg,image/png,image/webp" 
        multiple 
        onChange={handleFileSelect}
      />
    </div>
  );
};
