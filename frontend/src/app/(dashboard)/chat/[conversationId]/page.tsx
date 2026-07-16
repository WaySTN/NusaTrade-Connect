'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  getMockMessages, 
  MOCK_CONVERSATIONS, 
  MOCK_INVOICES,
  MOCK_PRODUCTS,
  MockMessage 
} from '@/lib/mock-data';
import { ChatBubble } from '@/components/chat/ChatBubble';
import { ChatInput } from '@/components/chat/ChatInput';
import { AIPreviewPanel } from '@/components/chat/AIPreviewPanel';
import { PriceConfirmModal } from '@/components/chat/PriceConfirmModal';
import { InvoiceCardChat } from '@/components/chat/InvoiceCardChat';
import { InvoiceForm } from '@/components/payment/InvoiceForm';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Receipt, Info, X } from 'lucide-react';
import Link from 'next/link';

export default function ChatWindowPage() {
  const params = useParams();
  const router = useRouter();
  const conversationId = typeof params.conversationId === 'string' ? params.conversationId : '';
  
  const conversation = MOCK_CONVERSATIONS.find(c => c.id === conversationId);
  
  const [messages, setMessages] = useState<MockMessage[]>([]);
  const [isInvoiceFormOpen, setInvoiceFormOpen] = useState(false);
  const [isAIPreviewOpen, setAIPreviewOpen] = useState(false);
  const [isPriceModalOpen, setPriceModalOpen] = useState(false);
  const [showPPJKBanner, setShowPPJKBanner] = useState(true);
  const [currentText, setCurrentText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load mock messages
    const msgs = getMockMessages(conversationId);
    setMessages(msgs);
  }, [conversationId]);

  useEffect(() => {
    // Auto scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAIPreviewOpen, showPPJKBanner]);

  if (!conversation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-full bg-white text-center p-6">
        <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Percakapan Tidak Ditemukan</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">Mungkin telah dihapus atau ID tidak valid.</p>
        <Link href="/chat">
          <Button variant="primary">Kembali ke Inbox</Button>
        </Link>
      </div>
    );
  }

  const handleSendText = (text: string) => {
    // Simulate AI processing
    setCurrentText(text);
    setTimeout(() => {
      setAIPreviewOpen(true);
    }, 500);
  };

  const handleAIEdit = () => {
    setAIPreviewOpen(false);
  };

  const handleAISend = () => {
    // Check if price is detected (mock condition)
    if (currentText.toLowerCase().includes('harga') || currentText.toLowerCase().includes('price') || currentText.includes('Rp') || currentText.includes('$')) {
      setPriceModalOpen(true);
    } else {
      sendFinalMessage(currentText, true);
      setAIPreviewOpen(false);
    }
  };

  const handlePriceConfirm = () => {
    sendFinalMessage(currentText, true);
    setPriceModalOpen(false);
    setAIPreviewOpen(false);
  };

  const sendFinalMessage = (text: string, isAiCorrected: boolean = false) => {
    const newMessage: MockMessage = {
      id: `m${Date.now()}`,
      text: isAiCorrected ? "(Bahasa Bisnis & Inggris) " + text : text,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sending',
      isAiCorrected
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate send complete
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === newMessage.id ? { ...m, status: 'sent' } : m));
    }, 1000);
  };

  const handleInvoiceSubmit = (data: any) => {
    setInvoiceFormOpen(false);
    
    // Send invoice bubble
    const newInvoiceMessage: MockMessage = {
      id: `inv-${Date.now()}`,
      text: '',
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      hasInvoice: true
    };
    
    setMessages(prev => [...prev, newInvoiceMessage]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-var(--header-height))] bg-[var(--color-bg-base)] max-w-4xl mx-auto border-x border-[var(--color-border)] relative">
      
      {/* Header Fixed */}
      <div className="flex items-center justify-between p-3 sm:p-4 bg-white border-b border-[var(--color-border)] z-20 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.push('/chat')}
            className="p-1.5 rounded-full hover:bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="relative">
            <Avatar initials={conversation.buyerAvatar} size="md" />
            {conversation.isOnline && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            )}
          </div>
          
          <div className="flex flex-col min-w-0">
            <h2 className="text-sm sm:text-base font-bold text-[var(--color-text-primary)] truncate">
              {conversation.buyerName}
            </h2>
            <span className="text-[10px] sm:text-xs text-[var(--color-text-secondary)] flex items-center gap-1.5">
              {conversation.isOnline ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Online
                </>
              ) : 'Offline'}
            </span>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          className="border-[#C8941A] text-[#C8941A] hover:bg-[#FEF9E7] shadow-sm whitespace-nowrap"
          leftIcon={<Receipt className="w-3.5 h-3.5" />}
          onClick={() => setInvoiceFormOpen(true)}
        >
          <span className="hidden sm:inline">Buat</span> Invoice
        </Button>
      </div>

      {/* Chat Area Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-4 flex flex-col relative z-10">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg}>
            {msg.hasInvoice && MOCK_INVOICES[0] && (
              <InvoiceCardChat invoice={MOCK_INVOICES[0]} />
            )}
          </ChatBubble>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Conditional PPJK Banner */}
      {showPPJKBanner && (
        <div className="mx-4 mb-2 p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-start sm:items-center justify-between gap-3 shadow-sm z-10">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <Info className="w-4 h-4" />
            </div>
            <p className="text-xs text-blue-800">
              Negosiasi hampir selesai? Kami bisa bantu urus dokumen PEB dan pengiriman lewat mitra PPJK kami. <Link href="/ppjk" className="font-bold underline hover:text-blue-900">Cari PPJK Sekarang</Link>
            </p>
          </div>
          <button onClick={() => setShowPPJKBanner(false)} className="text-blue-400 hover:text-blue-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Input Area Fixed */}
      <div className="bg-white border-t border-[var(--color-border)] p-3 sm:p-4 z-20 shrink-0">
        <ChatInput 
          onSend={handleSendText}
          isRecording={isRecording}
          onToggleRecord={() => setIsRecording(!isRecording)}
          disabled={isAIPreviewOpen}
        />
      </div>

      {/* Modals & Panels */}
      <AIPreviewPanel 
        isOpen={isAIPreviewOpen}
        onClose={() => setAIPreviewOpen(false)}
        originalText={currentText}
        businessText="Berdasarkan perhitungan kami, total biayanya adalah Rp 350.000 untuk pengiriman tersebut."
        englishText="Based on our calculations, the total cost would be Rp 350,000 for the shipment."
        onEdit={handleAIEdit}
        onSend={handleAISend}
      />

      <PriceConfirmModal 
        isOpen={isPriceModalOpen}
        onClose={() => setPriceModalOpen(false)}
        onConfirm={handlePriceConfirm}
      />

      <InvoiceForm
        isOpen={isInvoiceFormOpen}
        onClose={() => setInvoiceFormOpen(false)}
        buyerName={conversation.buyerName}
        products={MOCK_PRODUCTS}
        onSubmit={handleInvoiceSubmit}
      />

    </div>
  );
}
