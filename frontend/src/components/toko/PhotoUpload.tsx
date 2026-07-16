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
      <div className="flex justify-between items-end mb-2">
        <label className="text-sm font-semibold text-[var(--color-text-primary)]">Foto Produk (Maks. {maxPhotos})</label>
        <span className="text-xs text-[var(--color-text-secondary)]">{photos.length}/{maxPhotos} Foto</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        
        {/* Main Photo / Upload Trigger if empty */}
        {photos.length === 0 ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="col-span-2 sm:col-span-2 aspect-square rounded-2xl border-2 border-dashed border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] flex flex-col items-center justify-center cursor-pointer hover:border-[#006B52] hover:bg-[#E6F5F0]/50 transition-colors group relative overflow-hidden"
          >
            <UploadCloud className="w-10 h-10 text-[var(--color-text-muted)] group-hover:text-[#006B52] mb-3 transition-colors" />
            <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-1 text-center px-4">Klik atau Tarik Foto Utama</p>
            <p className="text-xs text-[var(--color-text-secondary)] text-center px-4">Format: JPG, PNG (Maks 5MB)</p>
          </div>
        ) : (
          <div className="col-span-2 sm:col-span-2 aspect-square rounded-2xl border-2 border-[#006B52] overflow-hidden relative group">
            <img src={photos[0].url} className={cn("w-full h-full object-cover", photos[0].loading && "opacity-50")} alt="Main product" />
            <div className="absolute top-2 left-2 bg-[#006B52] text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
              FOTO UTAMA
            </div>
            
            {photos[0].loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm">
                <Loader2 className="w-8 h-8 text-[#006B52] animate-spin" />
              </div>
            )}
            
            <button 
              onClick={(e) => { e.stopPropagation(); removePhoto(0); }}
              className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-sm"
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
              <div key={idx} className="aspect-square rounded-xl border border-[var(--color-border)] overflow-hidden relative group">
                <img src={photo.url} className={cn("w-full h-full object-cover", photo.loading && "opacity-50")} alt={`Product ${idx+2}`} />
                
                {photo.loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm">
                    <Loader2 className="w-6 h-6 text-[#006B52] animate-spin" />
                  </div>
                )}
                
                <button 
                  onClick={(e) => { e.stopPropagation(); removePhoto(photoIndex); }}
                  className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-sm"
                >
                  <X className="w-3 h-3" />
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
                  "aspect-square rounded-xl border-2 border-dashed border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] flex flex-col items-center justify-center transition-colors",
                  photos.length > 0 ? "cursor-pointer hover:border-[#006B52] hover:bg-[#E6F5F0]/50 group" : "opacity-50 cursor-not-allowed"
                )}
              >
                <ImagePlus className={cn("w-6 h-6 text-[var(--color-text-muted)]", photos.length > 0 && "group-hover:text-[#006B52] transition-colors")} />
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
