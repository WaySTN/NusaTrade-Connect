'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';
import { Send, Mic, Paperclip, Loader2, Square, AudioLines } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface ChatInputProps {
  onSendMessage: (text: string) => void;
  onSendVoice?: (audioBlob: Blob) => void;
  isProcessingAudio?: boolean;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, onSendVoice, isProcessingAudio = false, disabled = false }: ChatInputProps) => {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [text]);

  // Recording timer
  useEffect(() => {
    if (isRecording) {
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSend = () => {
    if (text.trim() && !disabled) {
      onSendMessage(text.trim());
      setText('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleRecording = () => {
    if (disabled) return;
    if (isRecording) {
      setIsRecording(false);
      // Simulate stopping recording and sending fake blob
      if (onSendVoice) {
        onSendVoice(new Blob(['fake audio'], { type: 'audio/webm' }));
      }
    } else {
      setIsRecording(true);
    }
  };

  return (
    <div className={cn("border-t border-[var(--color-border)] bg-white p-3 sm:p-5 transition-opacity duration-200", disabled && "opacity-50 pointer-events-none")}>
      <div className="flex items-end gap-3 max-w-4xl mx-auto">
        <button 
          className="p-3 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-subtle)] rounded-full transition-colors flex-shrink-0"
          title="Lampirkan File"
          disabled={isRecording || isProcessingAudio || disabled}
        >
          <Paperclip className="w-5 h-5" />
        </button>

        <div className="flex-1 relative bg-[var(--color-bg-subtle)] rounded-3xl border border-[var(--color-border)] focus-within:border-[var(--color-primary)] focus-within:ring-2 focus-within:ring-[var(--color-primary)]/30 transition-all overflow-hidden flex items-center min-h-[48px] shadow-sm">
          
          {isProcessingAudio ? (
            <div className="w-full flex items-center justify-center gap-2 text-[var(--color-primary)] font-bold text-sm py-3 h-[48px]">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Mengolah audio...</span>
            </div>
          ) : isRecording ? (
            <div className="w-full flex items-center justify-between px-5 py-2 h-[48px]">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[var(--color-error)] animate-pulse shadow-[0_0_8px_var(--color-error)]"></div>
                <span className="text-[var(--color-error)] font-mono text-sm font-bold tracking-wider">{formatTime(recordingTime)}</span>
              </div>
              <AudioLines className="w-5 h-5 text-[var(--color-error-hover)] animate-pulse" />
            </div>
          ) : (
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ketik pesan untuk pembeli..."
              className="w-full max-h-[120px] bg-transparent border-0 focus:ring-0 resize-none py-3 px-5 text-sm font-medium text-[var(--color-text-primary)] placeholder-[var(--color-text-placeholder)] m-0 leading-relaxed"
              rows={1}
              disabled={disabled}
            />
          )}
        </div>

        {text.trim() ? (
          <Button 
            variant="primary" 
            className="rounded-full w-12 h-12 p-0 flex-shrink-0 flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/20"
            onClick={handleSend}
            disabled={isProcessingAudio || disabled}
          >
            <Send className="w-5 h-5 -ml-0.5" />
          </Button>
        ) : (
          <Button 
            variant={isRecording ? "danger" : "secondary"} 
            className={cn(
              "rounded-full w-12 h-12 p-0 flex-shrink-0 flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md",
              isRecording ? "bg-[var(--color-error)]/10 border-[var(--color-error)] text-[var(--color-error)] hover:bg-[var(--color-error)]/20" : "border-[var(--color-border-strong)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] hover:border-[var(--color-text-muted)]"
            )}
            onClick={toggleRecording}
            disabled={isProcessingAudio || disabled}
          >
            {isRecording ? <Square className="w-5 h-5 fill-current" /> : <Mic className="w-5 h-5" />}
          </Button>
        )}
      </div>
    </div>
  );
};
