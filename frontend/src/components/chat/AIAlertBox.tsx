import React, { useState } from 'react';
import { Sparkles, ArrowRight, Edit2, Send, Languages } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface AIAlertBoxProps {
  originalText: string;          // Teks informal UMKM
  aiCorrectedText: string;       // Versi bisnis Bahasa Indonesia (editable)
  buyerLangName: string;         // Nama bahasa buyer (misal: "English", "Mandarin", "Japanese")
  onApprove: (finalText: string) => void;
}

export function AIAlertBox({ originalText, aiCorrectedText, buyerLangName, onApprove }: AIAlertBoxProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(aiCorrectedText);

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 shadow-sm my-4 animate-fade-in w-full max-w-[90%] mx-auto relative overflow-hidden shrink-0">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 blur-2xl rounded-full pointer-events-none"></div>

      {/* Header */}
      <div className="flex items-center gap-2 text-amber-700 font-bold mb-3 border-b border-amber-200/60 pb-2">
        <Sparkles className="w-4 h-4" />
        <span className="text-sm">AI Auto-Correction — pratinjau sebelum kirim</span>
      </div>

      <div className="space-y-4">
        {/* Layer 1: Original Informal Text (UMKM) */}
        <div>
          <div className="text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-1.5">
            Balasan asli Anda (informal):
          </div>
          <p className="text-sm text-slate-500 line-through italic bg-white/60 p-2.5 rounded-lg border border-amber-100">
            &ldquo;{originalText}&rdquo;
          </p>
        </div>

        {/* Layer 2: AI Business Version — Bahasa Indonesia (editable) */}
        <div>
          <div className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <ArrowRight className="w-3 h-3" />
            ✦ Versi bisnis oleh AI — dalam Bahasa Indonesia (dapat diedit):
          </div>

          {isEditing ? (
            <textarea
              className="w-full text-sm text-[var(--color-text-primary)] font-medium p-3 rounded-xl border border-[var(--color-primary)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 min-h-[120px] resize-none"
              value={text}
              onChange={(e) => setText(e.target.value)}
              autoFocus
            />
          ) : (
            <div className="text-sm text-[var(--color-text-primary)] font-medium p-3 rounded-xl border border-blue-200 bg-white shadow-sm whitespace-pre-wrap">
              {text}
            </div>
          )}
        </div>

        {/* Info Badge — auto-translate notice */}
        <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2">
          <Languages className="w-4 h-4 text-blue-500 shrink-0" />
          <p className="text-[11px] font-semibold text-blue-700 leading-tight">
            Setelah disetujui, AI akan otomatis menerjemahkan pesan ini ke <span className="font-extrabold">{buyerLangName}</span> sebelum dikirim ke buyer.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-1">
          <Button
            variant="primary"
            size="sm"
            className="flex-1 font-bold shadow-md shadow-emerald-500/20"
            onClick={() => onApprove(text)}
            leftIcon={<Send className="w-3.5 h-3.5" />}
          >
            Setujui &amp; Kirim ke Buyer
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="px-4 text-xs font-bold"
            onClick={() => setIsEditing(!isEditing)}
            leftIcon={<Edit2 className="w-3 h-3" />}
          >
            {isEditing ? 'Selesai Edit' : 'Edit Dulu'}
          </Button>
        </div>
      </div>
    </div>
  );
}
