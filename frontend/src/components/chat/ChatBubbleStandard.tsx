import React from 'react';
import { cn } from '@/lib/utils/cn';
import { CheckCircle2, Sparkles, Languages } from 'lucide-react';
import { DemoMessage } from '@/lib/mock-data';

export interface ChatBubbleStandardProps {
  message: DemoMessage;
  viewer: 'buyer' | 'seller';
  buyerLangName?: string; // for sent message badge on seller side
}

export function ChatBubbleStandard({ message, viewer, buyerLangName }: ChatBubbleStandardProps) {
  const isMine = message.from === viewer;
  const alignRight = isMine;

  // ─── SELLER VIEW ─────────────────────────────────────────────────────────
  if (viewer === 'seller') {
    // Pesan asli buyer (bahasa asing) — TIDAK DITAMPILKAN di view seller
    if (message.type === 'original' && message.from === 'buyer') {
      return null;
    }

    // Terjemahan AI ke Bahasa Indonesia — tampilkan sebagai pesan masuk
    if (message.type === 'translated' && message.from === 'system') {
      return (
        <div className="flex flex-col mb-3 w-full items-start">
          <div className="max-w-[85%] rounded-2xl rounded-tl-sm p-3 shadow-sm border bg-white text-[var(--color-text-primary)] border-slate-200">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold mb-2 border bg-emerald-100 text-emerald-700 border-emerald-200">
              <Sparkles className="w-3 h-3" />
              Terjemahan AI → Bahasa Indonesia
            </div>
            <p className="text-sm font-medium whitespace-pre-wrap leading-relaxed">
              {message.content}
            </p>
            <div className="flex items-center justify-end gap-1 mt-2 text-[10px] font-mono text-slate-400">
              {message.timestamp}
            </div>
          </div>
        </div>
      );
    }

    // Pesan UMKM terkirim (diterjemahkan AI ke bahasa buyer) — tampilkan di kanan
    // dengan badge kecil konfirmasi sudah terkirim dalam bahasa buyer
    if ((message.type === 'corrected' || message.type === 'sent') && message.from === 'seller') {
      return (
        <div className="flex flex-col mb-3 w-full items-end">
          <div className="max-w-[85%] rounded-2xl rounded-tr-sm p-3 shadow-sm border bg-[var(--color-primary)] text-white border-[var(--color-primary)]">
            {/* Sent badge */}
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold mb-2 bg-white/20 text-white border border-white/30">
              <CheckCircle2 className="w-3 h-3" />
              Terkirim dalam Bahasa {buyerLangName ?? 'Buyer'}
            </div>
            {/* Show Indonesian version of the text (umkmCorrectedIndonesia) instead of buyer lang */}
            <p className="text-sm font-medium whitespace-pre-wrap leading-relaxed">
              {message.content}
            </p>
            <div className="flex items-center justify-end gap-1 mt-2 text-[10px] font-mono text-emerald-100">
              {message.timestamp}
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          {/* Small auto-translate confirmation below bubble */}
          <div className="flex items-center gap-1 mt-1 px-1">
            <Languages className="w-3 h-3 text-slate-400" />
            <span className="text-[10px] text-slate-400 font-semibold">
              AI auto-translate ke {buyerLangName ?? 'bahasa buyer'} saat pengiriman
            </span>
          </div>
        </div>
      );
    }
  }

  // ─── BUYER VIEW ───────────────────────────────────────────────────────────
  if (viewer === 'buyer') {
    let badgeLabel = '';
    let badgeColor = '';
    let Icon = Languages;

    if (message.from === 'buyer') {
      badgeLabel = `Pesan asli (${buyerLangName ?? 'Bahasa Buyer'})`;
      badgeColor = 'bg-blue-100 text-blue-700 border-blue-200';
    } else if (message.from === 'seller') {
      badgeLabel = `Balasan UMKM (${buyerLangName ?? 'Bahasa Buyer'})`;
      badgeColor = 'bg-amber-100 text-amber-700 border-amber-200';
      Icon = Sparkles;
    }

    return (
      <div className={cn("flex flex-col mb-4 w-full", alignRight ? "items-end" : "items-start")}>
        <div className={cn(
          "max-w-[85%] rounded-2xl p-3 shadow-sm border",
          alignRight
            ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] rounded-tr-sm"
            : "bg-white text-[var(--color-text-primary)] border-slate-200 rounded-tl-sm"
        )}>
          {badgeLabel && (
            <div className={cn(
              "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold mb-2 border",
              badgeColor
            )}>
              <Icon className="w-3 h-3" />
              {badgeLabel}
            </div>
          )}
          <p className={cn(
            "text-sm whitespace-pre-wrap leading-relaxed",
            "font-medium"
          )}>
            {message.content}
          </p>
          <div className={cn(
            "flex items-center justify-end gap-1 mt-2 text-[10px] font-mono",
            alignRight ? "text-emerald-100" : "text-slate-400"
          )}>
            {message.timestamp}
            {alignRight && <CheckCircle2 className="w-3.5 h-3.5" />}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
