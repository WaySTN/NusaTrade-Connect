import React from 'react';
import { cn } from '@/lib/utils/cn';
import { Check, CheckCheck, AlertCircle, RefreshCw, Sparkles } from 'lucide-react';
import { MockMessage } from '@/lib/mock-data';

export interface ChatBubbleProps {
  message: MockMessage;
  onResend?: () => void;
  children?: React.ReactNode;
}

export const ChatBubble = ({ message, onResend, children }: ChatBubbleProps) => {
  const isMe = message.sender === 'me';
  const isError = message.status === 'failed';
  const isSending = message.status === 'sending';

  return (
    <div className={cn("flex flex-col w-full", isMe ? "items-end" : "items-start", "mb-4")}>
      <div className={cn(
        "relative max-w-[85%] sm:max-w-[75%] px-4 py-2.5 rounded-2xl",
        isMe 
          ? "bg-[#006B52] text-white rounded-tr-sm" 
          : "bg-white border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-tl-sm shadow-sm",
        isError && "border-red-500 bg-red-50 text-red-900",
        isSending && "opacity-70"
      )}>
        {/* Optional children (e.g., InvoiceCard) goes above text if provided */}
        {children && <div className="mb-2">{children}</div>}
        
        {message.text && (
          <p className="text-[15px] leading-relaxed break-words whitespace-pre-wrap">
            {message.text}
          </p>
        )}
        
        <div className={cn(
          "flex items-center gap-1.5 mt-1 text-[11px]",
          isMe ? "text-emerald-100 justify-end" : "text-[var(--color-text-muted)] justify-start"
        )}>
          <span>{message.timestamp}</span>
          
          {isMe && !isError && !isSending && (
            <div className="flex items-center">
              {message.status === 'read' ? (
                <CheckCheck className="w-3.5 h-3.5 text-emerald-200" />
              ) : (
                <Check className="w-3.5 h-3.5 text-emerald-200/70" />
              )}
            </div>
          )}
          
          {isMe && isSending && (
            <RefreshCw className="w-3 h-3 animate-spin" />
          )}
          
          {isMe && isError && (
            <AlertCircle className="w-3 h-3 text-red-500" />
          )}
        </div>
      </div>
      
      {/* AI Correction Badge */}
      {message.isAiCorrected && (
        <div className={cn(
          "flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-[#FFFBEB] border border-[#C8941A]/20 shadow-sm",
          isMe ? "mr-1" : "ml-1"
        )}>
          <Sparkles className="w-3 h-3 text-[#C8941A]" />
          <span className="text-[10px] font-medium text-[#C8941A]">Dikoreksi AI</span>
        </div>
      )}
      
      {/* Error Actions */}
      {isError && onResend && (
        <button 
          onClick={onResend}
          className="mt-1 text-xs text-red-500 hover:text-red-700 font-medium"
        >
          Kirim Ulang
        </button>
      )}
    </div>
  );
};
