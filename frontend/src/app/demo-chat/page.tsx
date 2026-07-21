'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, MessageSquare, ArrowRight, User } from 'lucide-react';
import { StepIndicator } from '@/components/chat/StepIndicator';
import { ChatBubbleStandard } from '@/components/chat/ChatBubbleStandard';
import { AIAlertBox } from '@/components/chat/AIAlertBox';
import { DemoMessage } from '@/lib/mock-data';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function ChatDemoPage() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [buyerMessages, setBuyerMessages] = useState<DemoMessage[]>([]);
  const [sellerMessages, setSellerMessages] = useState<DemoMessage[]>([]);
  
  const [showAIAlert, setShowAIAlert] = useState(false);
  
  const buyerEndRef = useRef<HTMLDivElement>(null);
  const sellerEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    buyerEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [buyerMessages]);

  useEffect(() => {
    sellerEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [sellerMessages, showAIAlert]);

  // HARDCODED DEMO CONTENT
  const buyerMsg1Original = "你好！我对你们的 keycaps 很感兴趣。\n请问可以批量购买吗？最低订购量是多少？价格是怎么计算的？";
  const buyerMsg1Translated = "Halo! Saya tertarik dengan keycaps kalian.\nApakah bisa pesan dalam jumlah besar?\nBerapa minimum order-nya dan bagaimana perhitungan harganya?";
  
  const sellerReplyInformal = "bisa kok, min order 50 pcs, harga $4.5/pcs,\nongkir tergantung negara tujuan";
  const sellerReplyCorrected = "尊敬的叶琳女士，\n\n感谢您对我们 Keicaps 系列产品的关注。我们接受批量订购，\n最低起订量 (MOQ) 为 50 件，单价 4.50 美元/件。\n\n运费将依据目的地地址另行计算，\n烦请提供收货地址以便我们为您出具精确报价。\n\n此致，\nDarmawan — Keicaps.id";
  const sellerReplyCorrectedIndonesia = "Yth. Nyonya Ye Lin,\n\nTerima kasih atas ketertarikan Anda terhadap seri produk Keicaps kami. Kami menerima pemesanan dalam jumlah besar dengan Minimum Order Quantity (MOQ) 50 unit, dengan harga $4.50 per unit.\n\nOngkos kirim akan dihitung terpisah berdasarkan alamat tujuan.\n\nHormat kami,\nDarmawan — Keicaps.id";

  const buyerMsg2Original = "非常感谢！50件起订量完全可以接受。\n我的收货地址是中国广州市天河区。\n请问能提供包含运费的完整报价单吗？\n\n叶琳";
  const buyerMsg2Translated = "Terima kasih banyak! MOQ 50 unit sangat bisa diterima.\nAlamat saya di Guangzhou, Tianhe District, China.\nBisakah Anda mengirimkan penawaran lengkap termasuk ongkos kirim?\n\nYe Lin";

  // Actions
  const handleBuyerSend = () => {
    if (currentStep !== 1) return;
    
    // Step 1: Buyer sends msg
    const newBuyerMsg: DemoMessage = {
      id: 'b1', from: 'buyer', lang: 'zh', content: buyerMsg1Original, timestamp: '10:00 AM', type: 'original'
    };
    setBuyerMessages(prev => [...prev, newBuyerMsg]);
    
    // After delay, seller receives original & translated
    setTimeout(() => {
      setSellerMessages(prev => [
        ...prev,
        { id: 's1', from: 'buyer', lang: 'zh', content: buyerMsg1Original, timestamp: '10:00 AM', type: 'original' },
        { id: 's2', from: 'buyer', lang: 'id', content: buyerMsg1Translated, timestamp: '10:00 AM', type: 'translated' }
      ]);
      
      // Step 2: Show AI Alert automatically
      setCurrentStep(2);
      setTimeout(() => setShowAIAlert(true), 600);
    }, 500);
  };

  const handleSellerApprove = (finalText: string) => {
    setShowAIAlert(false);
    
    // Step 3: Seller sends corrected AI message
    const newSellerMsg: DemoMessage = {
      id: 's3', from: 'seller', lang: 'ai', content: finalText, timestamp: '10:02 AM', type: 'corrected'
    };
    setSellerMessages(prev => [...prev, newSellerMsg]);
    setCurrentStep(3);

    // After delay, buyer receives message
    setTimeout(() => {
      const buyerReceivedMsg: DemoMessage = {
        id: 'b2', from: 'seller', lang: 'zh', content: finalText, timestamp: '10:02 AM', type: 'sent'
      };
      setBuyerMessages(prev => [...prev, buyerReceivedMsg]);
      
      // Step 4: Buyer replies automatically after reading
      setTimeout(() => {
        setCurrentStep(4);
        
        const finalBuyerMsg: DemoMessage = {
          id: 'b3', from: 'buyer', lang: 'zh', content: buyerMsg2Original, timestamp: '10:05 AM', type: 'original'
        };
        setBuyerMessages(prev => [...prev, finalBuyerMsg]);
        
        setTimeout(() => {
          setSellerMessages(prev => [
            ...prev,
            { id: 's4', from: 'buyer', lang: 'zh', content: buyerMsg2Original, timestamp: '10:05 AM', type: 'original' },
            { id: 's5', from: 'buyer', lang: 'id', content: buyerMsg2Translated, timestamp: '10:05 AM', type: 'translated' }
          ]);
        }, 500);
        
      }, 1500);
      
    }, 1000);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-50 flex flex-col font-body">
      {/* Header bar */}
      <div className="bg-slate-900 text-white h-14 flex items-center justify-between px-6 shrink-0 z-50 relative">
        <div className="font-bold text-sm tracking-widest text-emerald-400">NUSATRADE CONNECT</div>
        <Link href="/">
          <Button variant="outline" size="sm" className="h-8 text-xs border-slate-700 hover:bg-slate-800 text-slate-300">
            Tutup Panel
          </Button>
        </Link>
      </div>

      <div className="shrink-0 z-40 relative">
        <StepIndicator currentStep={currentStep} />
      </div>

      {/* Side-by-side layout */}
      <div className="flex-1 flex p-6 gap-6 max-w-[1400px] w-full mx-auto overflow-hidden relative z-0">
        
        {/* BUYER PANEL (Left) */}
        <div className="flex-1 flex flex-col bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden relative">
          <div className="absolute inset-0 bg-blue-50/30 mix-blend-overlay pointer-events-none"></div>
          
          {/* Buyer Header */}
          <div className="h-16 border-b border-slate-200 px-5 flex items-center gap-3 bg-white z-20 shrink-0 shadow-sm relative">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              UM
            </div>
            <div>
              <div className="font-bold text-sm">Keicaps.id (UMKM Indonesia)</div>
              <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> NIB Verified
              </div>
            </div>
            <div className="ml-auto text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Panel Buyer Internasional
            </div>
          </div>

          {/* Buyer Chat Area */}
          <div className="flex-1 overflow-y-auto p-5 z-10 space-y-4 relative bg-slate-50/50">
            <div className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-wider my-4">
              Hari ini
            </div>
            
            {buyerMessages.map(msg => (
              <ChatBubbleStandard key={msg.id} message={msg} viewer="buyer" />
            ))}
            <div ref={buyerEndRef} />
          </div>

          {/* Buyer Input */}
          <div className="p-4 border-t border-slate-200 bg-white z-20 shrink-0 relative">
            <div className="flex items-end gap-3 bg-slate-50 border border-slate-300 rounded-2xl p-2.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <textarea 
                className="flex-1 bg-transparent px-2 py-1 text-sm font-medium focus:outline-none resize-none h-[56px] text-slate-800 placeholder:text-slate-400 leading-relaxed"
                placeholder={currentStep === 1 ? "Ketik pesan dalam Mandarin (otomatis)" : "Menunggu balasan UMKM..."}
                readOnly
                value={currentStep === 1 ? buyerMsg1Original : ""}
              />
              {currentStep === 1 && (
                <Button 
                  className="h-10 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-white shadow-md shadow-blue-500/20 shrink-0 whitespace-nowrap" 
                  size="sm"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  onClick={handleBuyerSend}
                >
                  Kirim Pesan
                </Button>
              )}
            </div>
          </div>
        </div>


        {/* SELLER PANEL (Right) */}
        <div className="flex-1 flex flex-col bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden relative">
          <div className="absolute inset-0 bg-emerald-50/20 mix-blend-overlay pointer-events-none"></div>
          
          {/* Seller Header */}
          <div className="h-16 border-b border-slate-200 px-5 flex items-center gap-3 bg-white z-20 shrink-0 shadow-sm relative">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              Y
            </div>
            <div>
              <div className="font-bold text-sm">Ye Lin (Buyer China)</div>
              <div className="text-[10px] text-blue-600 font-bold flex items-center gap-1">
                <User className="w-3 h-3" /> International Buyer
              </div>
            </div>
            <div className="ml-auto text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Panel UMKM Lokal
            </div>
          </div>

          {/* Seller Chat Area */}
          <div className="flex-1 overflow-y-auto p-5 z-10 relative bg-slate-50/50">
            <div className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-wider my-4">
              Hari ini
            </div>
            
            {sellerMessages.map(msg => (
              <ChatBubbleStandard key={msg.id} message={msg} viewer="seller" />
            ))}

            {showAIAlert && (
              <AIAlertBox 
                originalText={sellerReplyInformal}
                aiCorrectedText={sellerReplyCorrectedIndonesia}
                buyerLangName="Mandarin"
                onApprove={(text) => handleSellerApprove(sellerReplyCorrected)} // send the Chinese version to buyer
              />
            )}
            
            <div ref={sellerEndRef} />
          </div>

          {/* Seller Input */}
          <div className="p-4 border-t border-slate-200 bg-white z-20 shrink-0 relative">
            <div className="flex items-end gap-3 bg-slate-50 border border-slate-300 rounded-2xl p-2.5 focus-within:border-[var(--color-primary)] focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
              <textarea 
                className="flex-1 bg-transparent px-2 py-1 text-sm font-medium focus:outline-none resize-none h-[56px] text-slate-800 placeholder:text-slate-400 leading-relaxed"
                placeholder={currentStep >= 3 ? "Percakapan selesai..." : "Ketik pesan informal, biar AI yang betulkan..."}
                readOnly
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
