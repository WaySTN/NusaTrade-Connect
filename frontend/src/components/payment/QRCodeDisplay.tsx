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
    <div className="flex flex-col items-center p-6 bg-white border border-[var(--color-border)] rounded-3xl w-full max-w-sm mx-auto shadow-sm hover:shadow-md transition-shadow duration-300 var(--ease-out-quart)">
      <h3 className="font-bold text-[var(--color-text-primary)] mb-6 text-center">QRIS Cross-Border</h3>
      
      <div className={cn(
        "relative w-56 h-56 rounded-2xl border-2 flex items-center justify-center bg-[var(--color-bg-subtle)] p-2.5 mb-6 transition-all duration-300",
        status === 'PENDING' ? "border-dashed border-[var(--color-primary)] bg-[var(--color-primary-subtle)]" : "border-solid border-[var(--color-border)] bg-white",
        status === 'PAID' || status === 'COMPLETED' ? "border-[var(--color-success)] shadow-[0_0_20px_var(--color-success)]/20" : "",
        status === 'EXPIRED' || status === 'FAILED' ? "border-[var(--color-error)]/30 opacity-60" : ""
      )}>
        {/* Fake QR Pattern */}
        <div className="w-full h-full bg-white flex flex-wrap content-start gap-1 p-1.5 overflow-hidden opacity-90 rounded-xl">
          {[...Array(81)].map((_, i) => (
            <div key={i} className={cn(
              "w-4 h-4 rounded-sm",
              Math.random() > 0.4 ? "bg-[#0F1A2A]" : "bg-transparent"
            )}></div>
          ))}
          {/* Central Logo */}
          <div className="absolute inset-0 m-auto w-14 h-14 bg-white rounded-xl flex items-center justify-center border-2 border-[var(--color-primary)] shadow-lg shadow-[var(--color-primary)]/10">
            <QrCode className="w-8 h-8 text-[var(--color-primary)]" />
          </div>
        </div>

        {/* Overlays */}
        {(status === 'PAID' || status === 'COMPLETED') && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center animate-slide-up duration-500 var(--ease-out-quart)">
            <CheckCircle2 className="w-16 h-16 text-[var(--color-success)] mb-3 drop-shadow-[0_4px_8px_rgba(0,107,82,0.2)]" />
            <span className="font-extrabold text-[var(--color-success-hover)] text-lg tracking-tight">Berhasil Dibayar</span>
          </div>
        )}
        
        {(status === 'EXPIRED') && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center animate-slide-up duration-500 var(--ease-out-quart)">
            <Clock className="w-16 h-16 text-[var(--color-text-muted)] mb-3 opacity-50" />
            <span className="font-bold text-[var(--color-text-secondary)] text-lg tracking-tight">Kedaluwarsa</span>
          </div>
        )}
      </div>

      {status === 'PENDING' && (
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-[var(--color-warning-hover)] bg-[var(--color-warning)]/10 px-4 py-2 rounded-full text-xs font-bold mb-4 shadow-sm border border-[var(--color-warning)]/20 tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            BERAKHIR DALAM {timeLeft}
          </div>
          <p className="text-xs font-medium text-[var(--color-text-secondary)] leading-relaxed px-4">
            Minta pembeli untuk scan QR code ini dengan aplikasi pembayaran yang didukung.
          </p>
        </div>
      )}

      {status === 'EXPIRED' && (
        <Button 
          variant="outline" 
          className="w-full font-bold border-[var(--color-border-strong)] bg-white hover:bg-[var(--color-bg-subtle)]"
          leftIcon={<RefreshCw className="w-4 h-4" />}
        >
          Buat QR Baru
        </Button>
      )}
    </div>
  );
};
