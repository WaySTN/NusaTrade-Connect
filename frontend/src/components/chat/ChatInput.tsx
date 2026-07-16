'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';
import { Send, Mic, Paperclip, Loader2, Square, AudioLines } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface ChatInputProps {
  onSendMessage: (text: string) => void;
  onSendVoice?: (audioBlob: Blob) => void;
  isProcessingAudio?: boolean;
}

export const ChatInput = ({ onSendMessage, onSendVoice, isProcessingAudio = false }: ChatInputProps) => {
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
    if (text.trim()) {
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
    <div className="border-t border-[var(--color-border)] bg-white p-3 sm:p-4">
      <div className="flex items-end gap-2 max-w-4xl mx-auto">
        <button 
          className="p-2.5 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)] rounded-full transition-colors flex-shrink-0"
          title="Lampirkan File"
          disabled={isRecording || isProcessingAudio}
        >
          <Paperclip className="w-5 h-5" />
        </button>

        <div className="flex-1 relative bg-[var(--color-bg-subtle)] rounded-2xl border border-[var(--color-border)] focus-within:border-[#006B52] focus-within:ring-1 focus-within:ring-[#006B52] transition-all overflow-hidden flex items-center min-h-[44px]">
          
          {isProcessingAudio ? (
            <div className="w-full flex items-center justify-center gap-2 text-[#006B52] font-medium text-sm py-3 h-[44px]">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Mengolah audio...</span>
            </div>
          ) : isRecording ? (
            <div className="w-full flex items-center justify-between px-4 py-2 h-[44px]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-red-500 font-mono text-sm font-medium">{formatTime(recordingTime)}</span>
              </div>
              <AudioLines className="w-5 h-5 text-red-400 animate-pulse" />
            </div>
          ) : (
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ketik pesan..."
              className="w-full max-h-[120px] bg-transparent border-0 focus:ring-0 resize-none py-3 px-4 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-placeholder)] m-0 leading-relaxed"
              rows={1}
            />
          )}
        </div>

        {text.trim() ? (
          <Button 
            variant="primary" 
            className="rounded-full w-11 h-11 p-0 flex-shrink-0 emerald-gradient flex items-center justify-center"
            onClick={handleSend}
            disabled={isProcessingAudio}
          >
            <Send className="w-5 h-5 -ml-0.5" />
          </Button>
        ) : (
          <Button 
            variant={isRecording ? "danger" : "secondary"} 
            className={cn(
              "rounded-full w-11 h-11 p-0 flex-shrink-0 flex items-center justify-center transition-all duration-300",
              isRecording ? "bg-red-50 border-red-500 text-red-500 hover:bg-red-100" : "border-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)]"
            )}
            onClick={toggleRecording}
            disabled={isProcessingAudio}
          >
            {isRecording ? <Square className="w-5 h-5 fill-current" /> : <Mic className="w-5 h-5" />}
          </Button>
        )}
      </div>
    </div>
  );
};
