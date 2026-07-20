import React from 'react';
import { cn } from '@/lib/utils/cn';
import { CheckCircle2, Sparkles, Languages } from 'lucide-react';
import { DemoMessage } from '@/lib/mock-data';

export interface ChatBubbleStandardProps {
  message: DemoMessage;
  viewer: 'buyer' | 'seller'; // who is looking at this chat bubble?
}

export function ChatBubbleStandard({ message, viewer }: ChatBubbleStandardProps) {
  // Determine alignment:
  // If I am the viewer, and the message is from me, align right.
  // Exception: System messages or AI translations are usually left-aligned if they are incoming, or right-aligned if they are my outgoing corrected messages.
  
  const isMine = message.from === viewer;
  const alignRight = isMine;

  // Badge styles based on blueprint
  let badgeLabel = '';
  let badgeColor = '';
  let Icon = Languages;

  if (viewer === 'seller') {
    if (message.type === 'original' && message.from === 'buyer') {
      badgeLabel = 'Pesan asli buyer (Mandarin)';
      badgeColor = 'bg-amber-100 text-amber-700 border-amber-200';
    } else if (message.type === 'translated') {
      badgeLabel = 'Terjemahan AI → Bahasa Indonesia';
      badgeColor = 'bg-emerald-100 text-emerald-700 border-emerald-200';
      Icon = Sparkles;
    } else if (message.type === 'corrected' || message.type === 'sent') {
      badgeLabel = 'AI → Mandarin (terkirim ke buyer)';
      badgeColor = 'bg-purple-100 text-purple-700 border-purple-200';
      Icon = Sparkles;
    }
  } else if (viewer === 'buyer') {
    if (message.from === 'buyer') {
      badgeLabel = 'Mandarin (pesan asli)';
      badgeColor = 'bg-blue-100 text-blue-700 border-blue-200';
    } else if (message.from === 'seller') {
      badgeLabel = 'Balasan UMKM (Mandarin)';
      badgeColor = 'bg-amber-100 text-amber-700 border-amber-200';
    }
  }

  return (
    <div className={cn("flex flex-col mb-4 w-full", alignRight ? "items-end" : "items-start")}>
      <div className={cn(
        "max-w-[85%] rounded-2xl p-3 shadow-sm border",
        alignRight 
          ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] rounded-tr-sm" 
          : "bg-white text-[var(--color-text-primary)] border-slate-200 rounded-tl-sm"
      )}>
        
        {/* Badge Label */}
        {badgeLabel && (
          <div className={cn(
            "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold mb-2 border",
            badgeColor,
            alignRight && badgeColor.includes('primary') ? "bg-white/20 text-white border-white/30" : ""
          )}>
            <Icon className="w-3 h-3" />
            {badgeLabel}
          </div>
        )}

        {/* Message Content */}
        <p className={cn(
          "text-sm whitespace-pre-wrap leading-relaxed",
          message.type === 'original' && viewer === 'seller' ? "italic opacity-80" : "font-medium"
        )}>
          {message.content}
        </p>

        {/* Timestamp */}
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
