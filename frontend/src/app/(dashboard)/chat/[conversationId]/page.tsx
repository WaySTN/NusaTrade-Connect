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
      <div className="flex-1 flex flex-col items-center justify-center h-full bg-[var(--color-bg-base)] text-center p-6">
        <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Percakapan Tidak Ditemukan</h2>
        <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-4">Mungkin telah dihapus atau ID tidak valid.</p>
        <Link href="/chat">
          <Button variant="primary" className="shadow-lg shadow-[var(--color-primary)]/20 font-bold">Kembali ke Inbox</Button>
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
      <div className="flex items-center justify-between p-3 sm:p-5 bg-white border-b border-[var(--color-border)] z-20 shadow-sm shrink-0 backdrop-blur-md bg-white/90">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/chat')}
            className="p-2 rounded-full hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-primary)] text-[var(--color-text-secondary)] transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="relative">
            <Avatar initials={conversation.buyerAvatar} size="md" className="ring-2 ring-[var(--color-border)]" />
            {conversation.isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-[var(--color-success)] border-2 border-white rounded-full"></span>
            )}
          </div>
          
          <div className="flex flex-col min-w-0">
            <h2 className="text-base font-bold text-[var(--color-text-primary)] truncate">
              {conversation.buyerName}
            </h2>
            <span className="text-[11px] font-medium text-[var(--color-text-secondary)] flex items-center gap-1.5 mt-0.5">
              {conversation.isOnline ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]"></span> Online
                </>
              ) : 'Offline'}
            </span>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          className="border-[var(--color-warning)] text-[var(--color-warning-hover)] hover:bg-[var(--color-warning)]/10 hover:text-[var(--color-warning-hover)] shadow-sm whitespace-nowrap font-bold h-10 px-4"
          leftIcon={<Receipt className="w-4 h-4" />}
          onClick={() => setInvoiceFormOpen(true)}
        >
          <span className="hidden sm:inline">Buat</span> Invoice
        </Button>
      </div>

      {/* Chat Area Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-4 flex flex-col relative z-10 bg-[var(--color-bg-base)]">
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
        <div className="mx-5 mb-3 p-4 bg-blue-50/50 border border-blue-200 rounded-2xl flex items-start sm:items-center justify-between gap-4 shadow-sm z-10 animate-slide-up duration-300">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100/50 text-blue-600 flex items-center justify-center shrink-0">
              <Info className="w-4 h-4" />
            </div>
            <p className="text-xs font-medium text-blue-800 leading-relaxed">
              Negosiasi hampir selesai? Kami bisa bantu urus dokumen PEB dan pengiriman lewat mitra PPJK kami. <Link href="/ppjk" className="font-bold underline hover:text-blue-900 transition-colors">Cari PPJK Sekarang</Link>
            </p>
          </div>
          <button onClick={() => setShowPPJKBanner(false)} className="p-1.5 rounded-lg text-blue-400 hover:text-blue-600 hover:bg-blue-100/50 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Input Area Fixed */}
      <div className="bg-white border-t border-[var(--color-border)] p-0 z-20 shrink-0">
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
        productName={MOCK_PRODUCTS[0]?.name || "Produk"}
        pricePerUnit={MOCK_PRODUCTS[0]?.price || 350000}
        quantity={1}
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
