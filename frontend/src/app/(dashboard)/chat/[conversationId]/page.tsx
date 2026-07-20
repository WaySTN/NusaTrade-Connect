'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  MOCK_CONVERSATIONS, 
  MOCK_CHAT_SCENARIOS,
  DemoMessage
} from '@/lib/mock-data';
import { ChatBubbleStandard } from '@/components/chat/ChatBubbleStandard';
import { AIAlertBox } from '@/components/chat/AIAlertBox';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ChatWindowPage() {
  const params = useParams();
  const router = useRouter();
  const conversationId = typeof params.conversationId === 'string' ? params.conversationId : '';
  
  const conversation = MOCK_CONVERSATIONS.find(c => c.id === conversationId);
  const scenario = MOCK_CHAT_SCENARIOS.find(s => s.id === conversationId);
  
  // States
  const [currentStep, setCurrentStep] = useState(2); // Start at step 2 (buyer already sent message)
  const [showAIAlert, setShowAIAlert] = useState(false);
  const [inputText, setInputText] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentStep, showAIAlert, inputText]);

  if (!conversation || !scenario) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-full bg-[var(--color-bg-base)] text-center p-6">
        <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Percakapan Tidak Ditemukan</h2>
        <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-4">Mohon pilih simulasi dari kotak masuk.</p>
        <Link href="/chat">
          <Button variant="primary">Kembali ke Inbox</Button>
        </Link>
      </div>
    );
  }

  // Build the message array based on currentStep
  const messages: DemoMessage[] = [];
  
  if (currentStep >= 2) {
    messages.push({
      id: 'msg-1',
      from: 'buyer',
      lang: scenario.nativeLangCode,
      content: scenario.buyerOriginal,
      timestamp: '10:00 AM',
      type: 'original'
    });
    messages.push({
      id: 'msg-1-trans',
      from: 'system',
      lang: 'id',
      content: scenario.buyerTranslated,
      timestamp: '10:00 AM',
      type: 'translated'
    });
  }
  
  if (currentStep >= 4) {
    messages.push({
      id: 'msg-2',
      from: 'seller',
      lang: 'ai',
      content: scenario.umkmCorrected,
      timestamp: '10:05 AM',
      type: 'sent'
    });
  }

  const handleSend = () => {
    if (currentStep === 2) {
      // Simulate typing informal text then triggering AI
      setInputText(scenario.umkmInformal);
      setCurrentStep(3);
      setTimeout(() => setShowAIAlert(true), 500);
    }
  };

  const handleApprove = () => {
    setShowAIAlert(false);
    setInputText('');
    setCurrentStep(4);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-var(--header-height))] bg-slate-50 relative border-x border-slate-200 shadow-sm max-w-[1200px] mx-auto w-full">
      {/* Header */}
      <div className="h-16 border-b border-slate-200 px-5 flex items-center gap-4 bg-white z-20 shrink-0 shadow-sm">
        <button onClick={() => router.push('/chat')} className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-500">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="relative">
          <Avatar initials={conversation.buyerAvatar} size="md" className="ring-2 ring-slate-100" />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <h2 className="text-sm font-bold text-slate-900 truncate">
            {scenario.buyerName} <span className="text-slate-500 font-normal">({scenario.buyerCompany})</span>
          </h2>
          <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5 uppercase tracking-wider">
            {scenario.country} • {scenario.nativeLangName}
          </span>
        </div>
        
        <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          AI Translation Active
        </div>
      </div>

      {/* Chat Area Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-4 flex flex-col relative z-10 space-y-4">
        <div className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-wider my-2">
          Hari ini
        </div>
        
        {messages.map((msg) => (
          <ChatBubbleStandard key={msg.id} message={msg} viewer="seller" />
        ))}
        
        {showAIAlert && (
          <AIAlertBox 
            originalText={scenario.umkmInformal}
            aiCorrectedText={scenario.umkmCorrected}
            onApprove={handleApprove}
          />
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-200 bg-white z-20 shrink-0 relative shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
        <div className="flex items-end gap-3 bg-slate-50 border border-slate-300 rounded-2xl p-2.5 focus-within:border-[var(--color-primary)] focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
          <textarea 
            className="flex-1 bg-transparent px-2 py-1 text-sm font-medium focus:outline-none resize-none h-[56px] text-slate-800 placeholder:text-slate-400 leading-relaxed"
            placeholder={currentStep >= 4 ? "Pesan terkirim. Menunggu balasan..." : "Ketik pesan informal, biar AI yang betulkan..."}
            readOnly
            value={inputText}
          />
          {currentStep === 2 && (
            <Button 
              className="h-10 px-5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] font-bold text-white shadow-md shadow-emerald-500/20 shrink-0 whitespace-nowrap" 
              size="sm"
              onClick={handleSend}
            >
              Simulasikan Ketik
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
