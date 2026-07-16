'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';
import { QrCode, RefreshCw, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface QRCodeDisplayProps {
  status: 'PENDING' | 'PAID' | 'EXPIRED' | 'FAILED' | 'COMPLETED';
  expiryTime?: number; // timestamp
}

export const QRCodeDisplay = ({ status, expiryTime }: QRCodeDisplayProps) => {
  const [timeLeft, setTimeLeft] = useState('24:00:00');
  
  // Dummy countdown
  useEffect(() => {
    if (status !== 'PENDING') return;
    
    let hours = 23;
    let mins = 59;
    let secs = 59;
    
    const timer = setInterval(() => {
      secs--;
      if (secs < 0) {
        secs = 59;
        mins--;
        if (mins < 0) {
          mins = 59;
          hours--;
        }
      }
      
      setTimeLeft(
        `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
      );
    }, 1000);
    
    return () => clearInterval(timer);
  }, [status]);

  return (
    <div className="flex flex-col items-center p-6 bg-white border border-[var(--color-border)] rounded-2xl w-full max-w-sm mx-auto shadow-sm">
      <h3 className="font-bold text-[var(--color-text-primary)] mb-6 text-center">QRIS Cross-Border</h3>
      
      <div className={cn(
        "relative w-48 h-48 rounded-xl border-2 flex items-center justify-center bg-[var(--color-bg-subtle)] p-2 mb-6",
        status === 'PENDING' ? "border-dashed border-[#006B52]" : "border-solid border-[var(--color-border)]",
        status === 'PAID' || status === 'COMPLETED' ? "border-emerald-500" : "",
        status === 'EXPIRED' || status === 'FAILED' ? "border-red-300 opacity-50" : ""
      )}>
        {/* Fake QR Pattern */}
        <div className="w-full h-full bg-white flex flex-wrap content-start gap-1 p-1 overflow-hidden opacity-80">
          {[...Array(64)].map((_, i) => (
            <div key={i} className={cn(
              "w-4 h-4 rounded-sm",
              Math.random() > 0.4 ? "bg-[#0F1A2A]" : "bg-transparent"
            )}></div>
          ))}
          {/* Central Logo */}
          <div className="absolute inset-0 m-auto w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-[var(--color-border)] shadow-sm">
            <QrCode className="w-8 h-8 text-[#006B52]" />
          </div>
        </div>

        {/* Overlays */}
        {(status === 'PAID' || status === 'COMPLETED') && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center animate-in zoom-in duration-300">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-2" />
            <span className="font-bold text-emerald-700">Berhasil Dibayar</span>
          </div>
        )}
        
        {(status === 'EXPIRED') && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center animate-in zoom-in duration-300">
            <Clock className="w-16 h-16 text-red-400 mb-2" />
            <span className="font-bold text-red-600">Kode Kedaluwarsa</span>
          </div>
        )}
      </div>

      {status === 'PENDING' && (
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-[#D97706] bg-[#FFFBEB] px-3 py-1.5 rounded-full text-xs font-semibold mb-3 border border-[#D97706]/20">
            <Clock className="w-3.5 h-3.5" />
            Berakhir dalam {timeLeft}
          </div>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Minta pembeli untuk scan QR code ini dengan aplikasi pembayaran yang didukung.
          </p>
        </div>
      )}

      {status === 'EXPIRED' && (
        <Button 
          variant="outline" 
          className="w-full border-red-200 text-red-600 hover:bg-red-50"
          leftIcon={<RefreshCw className="w-4 h-4" />}
        >
          Buat QR Baru
        </Button>
      )}
    </div>
  );
};
