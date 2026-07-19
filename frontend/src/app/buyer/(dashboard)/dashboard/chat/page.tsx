'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  MessageSquare, Sparkles, Send, ShieldCheck, MapPin, 
  Package, FileText, CheckCircle2, ArrowLeft, Building2, Globe, Bot 
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { MOCK_UMKM, MockUMKM } from '@/lib/mock-data';
import { useT } from '@/i18n/useT';

interface ChatMessage {
  id: string;
  sender: 'me' | 'seller';
  originalText: string;
  translatedText: string;
  timestamp: string;
  hasInvoice?: boolean;
  invoiceId?: string;
  invoiceAmount?: number;
}

export default function BuyerChatPage() {
  const t = useT();
  const [selectedUmkm, setSelectedUmkm] = useState<MockUMKM>(MOCK_UMKM[0]);
  const [inputMessage, setInputMessage] = useState('');
  const [isAiProcessing, setIsAiProcessing] = useState(false);

  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({
    'umkm-001': [
      {
        id: 'msg-1',
        sender: 'seller',
        originalText: 'Halo, salam kenal! Terima kasih telah tertarik dengan produk Kopi Luwak Premium Gayo kami.',
        translatedText: 'Hello! Thank you for your interest in our Premium Gayo Luwak Coffee products.',
        timestamp: '09:15 AM'
      },
      {
        id: 'msg-2',
        sender: 'me',
        originalText: 'We would like to request a 50kg sample shipment to our US warehouse. What is the FOB price per kg?',
        translatedText: 'Kami ingin meminta pengiriman sampel 50kg ke gudang kami di AS. Berapa harga FOB per kg?',
        timestamp: '09:20 AM'
      },
      {
        id: 'msg-3',
        sender: 'seller',
        originalText: 'Untuk sampel 50kg, harga spesialisasi ekspor adalah $12 USD per kg. Sertifikat origin dan organik sudah siap.',
        translatedText: 'For a 50kg sample, the export price is $12 USD per kg. Certificate of origin and organic certification are ready.',
        timestamp: '09:25 AM'
      },
      {
        id: 'msg-4',
        sender: 'seller',
        originalText: 'Berikut kami lampirkan draf invoice penawaran resmi dari NusaTrade Connect.',
        translatedText: 'Here is the attached official proforma invoice offer from NusaTrade Connect.',
        timestamp: '09:26 AM',
        hasInvoice: true,
        invoiceId: 'INV-2026-0001',
        invoiceAmount: 15000000
      }
    ],
    'umkm-002': [
      {
        id: 'msg-21',
        sender: 'seller',
        originalText: 'Selamat siang! Kami dari Bali Rattan Craft siap membantu kebutuhan furniture rotan Anda.',
        translatedText: 'Good afternoon! We at Bali Rattan Craft are ready to fulfill your rattan furniture needs.',
        timestamp: 'Yesterday'
      }
    ]
  });

  const activeMessages = messages[selectedUmkm.id] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsgText = inputMessage;
    setInputMessage('');
    setIsAiProcessing(true);

    // Simulate AI Translation Pipeline
    setTimeout(() => {
      const newMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: 'me',
        originalText: newMsgText,
        translatedText: `[AI Indonesian Translation]: ${newMsgText}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => ({
        ...prev,
        [selectedUmkm.id]: [...(prev[selectedUmkm.id] || []), newMsg]
      }));
      setIsAiProcessing(false);

      // Simulate Seller auto-response
      setTimeout(() => {
        const autoReply: ChatMessage = {
          id: `msg-reply-${Date.now()}`,
          sender: 'seller',
          originalText: `Terima kasih atas konfirmasinya! Kami sedang menyiapkan dokumen pendukung untuk ${selectedUmkm.name}.`,
          translatedText: `Thank you for your confirmation! We are preparing supporting documents for ${selectedUmkm.name}.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => ({
          ...prev,
          [selectedUmkm.id]: [...(prev[selectedUmkm.id] || []), autoReply]
        }));
      }, 1500);

    }, 800);
  };

  return (
    <div className="h-[calc(100vh-8rem)] bg-white border border-[var(--color-border)] rounded-3xl shadow-sm overflow-hidden flex flex-col md:flex-row">
      
      {/* Left Sidebar: List of Sellers */}
      <div className="w-full md:w-80 lg:w-96 border-r border-[var(--color-border)] flex flex-col bg-[var(--color-bg-subtle)] shrink-0">
        <div className="p-4 border-b border-[var(--color-border)] bg-white">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-base text-[var(--color-text-primary)] font-display flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[var(--color-primary)]" />
              {t('buyer_chat.title') || 'Pesan Negosiasi AI'}
            </h3>
            <span className="text-[10px] font-extrabold uppercase bg-[var(--color-primary-subtle)] text-[var(--color-primary)] px-2 py-0.5 rounded-full">
              {t('buyer_chat.live_badge') || 'LIVE TRANSLATION'}
            </span>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)] font-medium">
            {t('buyer_chat.desc') || 'Otomatis diterjemahkan dalam bahasa Inggris & Indonesia baku.'}
          </p>
        </div>

        {/* Sellers List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[var(--color-border)]">
          {MOCK_UMKM.slice(0, 4).map(umkm => {
            const isSelected = selectedUmkm.id === umkm.id;
            const umkmMsgs = messages[umkm.id] || [];
            const lastMsg = umkmMsgs[umkmMsgs.length - 1];

            return (
              <button
                key={umkm.id}
                onClick={() => setSelectedUmkm(umkm)}
                className={`w-full text-left p-4 transition-colors flex items-start gap-3 relative ${
                  isSelected ? 'bg-white shadow-xs border-l-4 border-l-[var(--color-primary)]' : 'hover:bg-white/60'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-white text-[var(--color-primary)] font-bold flex items-center justify-center border border-[var(--color-border)] shrink-0 font-display shadow-xs">
                  {umkm.name.charAt(0)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-sm text-[var(--color-text-primary)] truncate flex items-center gap-1">
                      {umkm.name}
                      {umkm.isNibVerified && <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0" />}
                    </h4>
                    <span className="text-[10px] font-mono text-[var(--color-text-muted)] shrink-0">
                      {lastMsg?.timestamp || t('buyer_chat.now') || 'Now'}
                    </span>
                  </div>

                  <p className="text-xs text-[var(--color-text-secondary)] truncate font-medium">
                    {lastMsg ? lastMsg.translatedText : umkm.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Main Chat Window */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-white">
        
        {/* Chat Room Header */}
        <div className="p-4 sm:p-5 border-b border-[var(--color-border)] bg-white flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary-subtle)] text-[var(--color-primary)] font-black flex items-center justify-center text-xl shrink-0 font-display border border-[var(--color-primary-subtle)]">
              {selectedUmkm.name.charAt(0)}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-[var(--color-text-primary)] truncate">
                  {selectedUmkm.name}
                </h3>
                {selectedUmkm.isNibVerified && (
                  <span className="text-[10px] font-extrabold bg-[var(--color-primary-subtle)] text-[var(--color-primary)] px-2 py-0.5 rounded-full inline-flex items-center gap-1 shrink-0">
                    <ShieldCheck className="w-3 h-3" /> {t('buyer_chat.nib_verified') || 'NIB Verified'}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)] font-medium mt-0.5">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[var(--color-text-muted)]" /> {selectedUmkm.city}</span>
                <span>•</span>
                <span className="text-[var(--color-primary)] font-bold">{selectedUmkm.category}</span>
              </div>
            </div>
          </div>

          <Link href={`/umkm/${selectedUmkm.id}`}>
            <Button variant="outline" className="text-xs font-bold h-9 px-3 shrink-0 rounded-xl">
              {t('buyer_chat.view_profile') || 'Lihat Profil UMKM'}
            </Button>
          </Link>
        </div>

        {/* AI Banner Bar */}
        <div className="bg-[var(--color-primary-subtle)] px-4 py-2 border-b border-[var(--color-border)] flex items-center justify-between text-xs text-[var(--color-primary)] font-semibold">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
            <span>{t('buyer_chat.ai_active') || 'NusaTrade AI Agent: Tone-Shifting & English-Indonesian Translation Active'}</span>
          </div>
          <span className="text-[10px] font-mono uppercase font-extrabold bg-white px-2 py-0.5 rounded-full shadow-xs">
            {t('buyer_chat.unlimited') || 'Unlimited Free'}
          </span>
        </div>

        {/* Messages List Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[var(--color-bg-base)]">
          {activeMessages.map(msg => {
            const isMe = msg.sender === 'me';

            return (
              <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-xl rounded-2xl p-4 space-y-2 shadow-xs ${
                  isMe 
                    ? 'bg-[var(--color-primary)] text-white rounded-br-none' 
                    : 'bg-white text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-bl-none'
                }`}>
                  
                  {/* Primary text */}
                  <p className="text-sm font-medium leading-relaxed">
                    {isMe ? msg.originalText : msg.translatedText}
                  </p>

                  {/* Translation Detail Note */}
                  <div className={`text-[11px] pt-2 border-t font-mono ${
                    isMe ? 'border-white/20 text-emerald-100' : 'border-[var(--color-border)] text-[var(--color-text-muted)]'
                  }`}>
                    {isMe ? (
                      <span>✓ {t('buyer_chat.translated_for_seller') || 'Translated to Indonesian for Seller'}</span>
                    ) : (
                      <span>{t('buyer_chat.original_id') || 'Original Indonesian'}: &quot;{msg.originalText}&quot;</span>
                    )}
                  </div>

                  {/* Invoice Attachment Card */}
                  {msg.hasInvoice && (
                    <div className="mt-3 p-3.5 rounded-xl bg-white border border-[var(--color-border)] text-[var(--color-text-primary)] space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold font-mono text-[var(--color-primary)]">{msg.invoiceId}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">{t('buyer_chat.price_approval') || 'Persetujuan Harga'}</span>
                      </div>
                      <div className="text-xs text-[var(--color-text-secondary)] font-medium">
                        {t('buyer_chat.invoice_offer') || 'Invoice Penawaran Resmi Produk'} {selectedUmkm.name}
                      </div>
                      <Link href="/buyer/dashboard">
                        <Button variant="primary" className="w-full h-8 text-xs font-bold justify-center mt-2 rounded-lg">
                          {t('buyer_chat.pay_qris') || 'Bayar via QRIS Antarnegara'}
                        </Button>
                      </Link>
                    </div>
                  )}

                </div>

                <span className="text-[10px] font-mono text-[var(--color-text-muted)] mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            );
          })}

          {isAiProcessing && (
            <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-primary)] bg-white p-3 rounded-2xl border border-[var(--color-border)] w-fit animate-pulse">
              <Sparkles className="w-4 h-4 text-[var(--color-primary)]" />
              {t('buyer_chat.ai_translating') || 'AI sedang menerjemahkan pesan Anda ke Bahasa Indonesia bisnis...'}
            </div>
          )}
        </div>

        {/* Input Footer Area */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-[var(--color-border)] bg-white space-y-3">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`${t('buyer_chat.type_placeholder') || 'Ketik pesan dalam Bahasa Inggris ke'} ${selectedUmkm.name}...`}
              className="flex-1 px-4 py-3 rounded-xl border border-[var(--color-border)] text-sm font-medium focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-subtle)]"
            />

            <Button
              type="submit"
              variant="primary"
              className="h-11 px-6 font-bold rounded-xl shadow-md shadow-[var(--color-primary)]/20"
              leftIcon={<Send className="w-4 h-4" />}
            >
              {t('buyer_chat.send') || 'Kirim'}
            </Button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[var(--color-text-muted)] font-medium px-1">
            <span>💡 {t('buyer_chat.hint') || 'Pesan yang Anda ketik dalam Bahasa Inggris otomatis dikonversi ke Bahasa Indonesia baku untuk UMKM.'}</span>
          </div>
        </form>

      </div>

    </div>
  );
}
