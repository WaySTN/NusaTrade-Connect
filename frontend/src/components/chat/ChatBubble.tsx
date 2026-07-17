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
    <div className={cn("flex flex-col w-full", isMe ? "items-end" : "items-start", "mb-5 animate-slide-up duration-300 var(--ease-out-quart)")}>
      <div className={cn(
        "relative max-w-[85%] sm:max-w-[75%] px-5 py-3 rounded-2xl shadow-sm transition-all duration-300",
        isMe 
          ? "bg-[var(--color-primary)] text-white rounded-tr-sm shadow-[var(--color-primary)]/10" 
          : "bg-white border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-tl-sm",
        isError && "border-[var(--color-error)] bg-[var(--color-error)]/10 text-[var(--color-error-hover)]",
        isSending && "opacity-70 scale-[0.98]"
      )}>
        {/* Optional children (e.g., InvoiceCard) goes above text if provided */}
        {children && <div className="mb-3">{children}</div>}
        
        {message.text && (
          <p className="text-[15px] font-medium leading-relaxed break-words whitespace-pre-wrap">
            {message.text}
          </p>
        )}
        
        <div className={cn(
          "flex items-center gap-1.5 mt-1.5 text-[11px] font-bold",
          isMe ? "text-[var(--color-primary-light)] justify-end" : "text-[var(--color-text-muted)] justify-start"
        )}>
          <span>{message.timestamp}</span>
          
          {isMe && !isError && !isSending && (
            <div className="flex items-center">
              {message.status === 'read' ? (
                <CheckCheck className="w-4 h-4 text-[var(--color-primary-light)]" />
              ) : (
                <Check className="w-4 h-4 text-[var(--color-primary-light)]/70" />
              )}
            </div>
          )}
          
          {isMe && isSending && (
            <RefreshCw className="w-3 h-3 animate-spin text-[var(--color-primary-light)]" />
          )}
          
          {isMe && isError && (
            <AlertCircle className="w-3.5 h-3.5 text-[var(--color-error)]" />
          )}
        </div>
      </div>
      
      {/* AI Correction Badge */}
      {message.isAiCorrected && (
        <div className={cn(
          "flex items-center gap-1.5 mt-1.5 px-2.5 py-1 rounded-full bg-[var(--color-warning)]/10 border border-[var(--color-warning)]/20 shadow-sm",
          isMe ? "mr-1" : "ml-1"
        )}>
          <Sparkles className="w-3 h-3 text-[var(--color-warning)]" />
          <span className="text-[10px] font-bold text-[var(--color-warning-hover)]">Dikoreksi AI</span>
        </div>
      )}
      
      {/* Error Actions */}
      {isError && onResend && (
        <button 
          onClick={onResend}
          className="mt-1.5 text-xs text-[var(--color-error)] hover:text-[var(--color-error-hover)] font-bold transition-colors duration-200"
        >
          Kirim Ulang
        </button>
      )}
    </div>
  );
};
