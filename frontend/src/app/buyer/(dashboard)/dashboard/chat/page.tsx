'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, MapPin, 
  ArrowLeft, Globe, Bot 
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { MOCK_CHAT_SCENARIOS, DemoChatScenario, DemoMessage, MOCK_UMKM } from '@/lib/mock-data';
import { useT } from '@/i18n/useT';
import { ChatBubbleStandard } from '@/components/chat/ChatBubbleStandard';

export default function BuyerChatPage() {
  const t = useT();
  const [activeScenarioId, setActiveScenarioId] = useState<string>(MOCK_CHAT_SCENARIOS[0].id);
  const [inputMessage, setInputMessage] = useState('');
  
  // Track simulation steps separately for each scenario to allow switching without losing state
  const [scenarioSteps, setScenarioSteps] = useState<Record<string, number>>({
    'c-001': 1, // Start at step 1 for UK
    'c-002': 1, // Start at step 1 for China
    'c-003': 1  // Start at step 1 for Japan
  });

  const activeScenario = MOCK_CHAT_SCENARIOS.find(s => s.id === activeScenarioId)!;
  const currentStep = scenarioSteps[activeScenarioId];
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Map the scenario to a mock UMKM just for visual display on the left sidebar
  const getUmkmForScenario = (scenarioId: string) => {
    if (scenarioId === 'c-001') return MOCK_UMKM.find(u => u.name.includes('Rempah')) || MOCK_UMKM[3];
    if (scenarioId === 'c-002') return MOCK_UMKM.find(u => u.name.includes('Kopi')) || MOCK_UMKM[0];
    if (scenarioId === 'c-003') return MOCK_UMKM.find(u => u.name.includes('Bali')) || MOCK_UMKM[1];
    return MOCK_UMKM[0];
  };

  const activeUmkm = getUmkmForScenario(activeScenarioId);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentStep, activeScenarioId]);

  // Build the message array for the active scenario based on its step
  const messages: DemoMessage[] = [];
  
  if (currentStep >= 2) {
    // Buyer has sent message
    messages.push({
      id: 'msg-1',
      from: 'buyer',
      lang: activeScenario.nativeLangCode,
      content: activeScenario.buyerOriginal,
      timestamp: '10:00 AM',
      type: 'sent'
    });
  }
  
  if (currentStep >= 4) {
    // UMKM has replied and AI translated it to Buyer's native language
    messages.push({
      id: 'msg-2',
      from: 'seller',
      lang: activeScenario.nativeLangCode,
      content: activeScenario.umkmCorrected,
      timestamp: '10:05 AM',
      type: 'translated'
    });
  }

  const handleSimulateSend = () => {
    if (currentStep === 1) {
      setScenarioSteps(prev => ({ ...prev, [activeScenarioId]: 2 }));
    }
  };

  const simulateUMKMReply = () => {
    if (currentStep === 2) {
      setScenarioSteps(prev => ({ ...prev, [activeScenarioId]: 4 }));
    }
  };

  return (
    <div className="flex h-[calc(100vh-7rem)] sm:h-[calc(100vh-9rem)] bg-slate-50 border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      
      {/* Sidebar List UMKM */}
      <div className="w-[380px] bg-white border-r border-[var(--color-border)] flex flex-col shrink-0 relative z-10">
        <div className="p-4 sm:p-5 border-b border-[var(--color-border)]">
          <h1 className="text-xl font-extrabold text-[var(--color-text-primary)] font-display tracking-tight mb-2">
            Pesan & Negosiasi AI
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)] font-medium mb-4">
            Simulasi Inbox Buyer Internasional
          </p>


        </div>

        <div className="flex-1 overflow-y-auto">
          {MOCK_CHAT_SCENARIOS.map((scenario) => {
            const umkm = getUmkmForScenario(scenario.id);
            const isActive = activeScenarioId === scenario.id;
            
            return (
              <div 
                key={scenario.id}
                onClick={() => setActiveScenarioId(scenario.id)}
                className={`p-4 border-b border-[var(--color-border)] cursor-pointer transition-all duration-200 ${
                  isActive 
                    ? 'bg-emerald-50/50 border-l-4 border-l-emerald-500' 
                    : 'hover:bg-[var(--color-bg-subtle)]'
                }`}
              >
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center font-bold text-slate-400">
                    {umkm.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-[var(--color-text-primary)] truncate text-sm">
                        {umkm.name}
                        {umkm.isNibVerified && <ShieldCheck className="w-3 h-3 text-[var(--color-success)] inline ml-1" />}
                      </h3>
                    </div>
                    <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed">
                      {isActive && currentStep >= 4 ? scenario.umkmCorrected : (isActive && currentStep >= 2 ? scenario.buyerOriginal : "Pilih untuk memulai chat.")}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat Area Main */}
      <div className="flex-1 flex flex-col relative bg-slate-50 min-w-0">
        
        {/* Chat Header */}
        <div className="h-[72px] sm:h-20 bg-white border-b border-[var(--color-border)] px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-sm z-10 relative">
          <div className="flex items-center gap-4">
            <Link href="/buyer/dashboard" className="sm:hidden p-2 -ml-2 rounded-full hover:bg-[var(--color-bg-subtle)]">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-100 flex items-center justify-center text-emerald-700 font-bold text-lg relative shrink-0">
              {activeUmkm.name.charAt(0)}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                {activeUmkm.name}
                {activeUmkm.isNibVerified && (
                  <span className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 uppercase tracking-wider">
                    <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Verified
                  </span>
                )}
              </h2>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1">
                <span className="flex items-center gap-1 font-medium"><MapPin className="w-3 h-3 sm:w-4 sm:h-4" /> {activeUmkm.city}</span>
                <span className="hidden sm:flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  <Bot className="w-3.5 h-3.5" /> AI Auto-Translation ({activeScenario.nativeLangName})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-4 flex flex-col space-y-4">
          <div className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-wider my-4">
            Hari ini
          </div>

          {messages.map((msg) => (
            <ChatBubbleStandard key={msg.id} message={msg} viewer="buyer" />
          ))}

          {currentStep === 2 && (
            <div className="flex justify-start my-4">
               <div className="bg-slate-100 text-slate-400 text-xs px-4 py-2 rounded-full font-medium italic flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-slate-300 animate-pulse"></span>
                 UMKM is typing... 
                 <button onClick={simulateUMKMReply} className="ml-2 text-blue-500 hover:underline not-italic font-bold">Simulate Reply</button>
               </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-slate-200 bg-white z-20 shrink-0 relative">
          <div className="flex items-end gap-3 bg-slate-50 border border-slate-300 rounded-2xl p-2.5 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
            <textarea 
              className="flex-1 bg-transparent px-2 py-1 text-sm font-medium focus:outline-none resize-none h-[56px] text-slate-800 placeholder:text-slate-400 leading-relaxed"
              placeholder={currentStep >= 4 ? "Pesan masuk." : `Simulate typing in ${activeScenario.nativeLangName}...`}
              readOnly
              value={currentStep === 1 ? activeScenario.buyerOriginal : ''}
            />
            {currentStep === 1 && (
              <Button 
                className="h-10 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-bold text-white shadow-md shadow-emerald-500/20 shrink-0 whitespace-nowrap" 
                size="sm"
                onClick={handleSimulateSend}
              >
                Send Message
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
