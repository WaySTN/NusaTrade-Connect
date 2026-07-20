import React, { useState } from 'react';
import { Sparkles, ArrowRight, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface AIAlertBoxProps {
  originalText: string;
  aiCorrectedText: string;
  onApprove: (finalText: string) => void;
}

export function AIAlertBox({ originalText, aiCorrectedText, onApprove }: AIAlertBoxProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(aiCorrectedText);

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 shadow-sm my-4 animate-fade-in w-full max-w-[90%] mx-auto relative overflow-hidden shrink-0">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 blur-2xl rounded-full pointer-events-none"></div>

      <div className="flex items-center gap-2 text-amber-700 font-bold mb-3 border-b border-amber-200/60 pb-2">
        <Sparkles className="w-4 h-4" />
        <span className="text-sm">AI Auto-Correction — pratinjau sebelum kirim</span>
      </div>

      <div className="space-y-5">
        {/* Original Text */}
        <div>
          <div className="text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-1.5">
            Balasan asli Anda (informal):
          </div>
          <p className="text-sm text-slate-600 line-through italic bg-white/60 p-2.5 rounded-lg border border-amber-100">
            "{originalText}"
          </p>
        </div>

        {/* AI Version */}
        <div>
          <div className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider mb-1 flex items-center gap-1">
            <ArrowRight className="w-3 h-3" />
            ✦ Versi bisnis oleh AI (akan dikirim ke buyer)
          </div>
          
          {isEditing ? (
            <textarea
              className="w-full text-sm text-[var(--color-text-primary)] font-medium p-3 rounded-xl border border-[var(--color-primary)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 min-h-[100px] resize-none"
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

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <Button 
            variant="primary" 
            size="sm"
            className="flex-1 font-bold shadow-md shadow-emerald-500/20"
            onClick={() => onApprove(text)}
          >
            Setujui & Kirim
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
