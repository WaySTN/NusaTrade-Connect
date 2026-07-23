'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, ArrowRight, User, RotateCcw, CreditCard, Sparkles, MessageSquareDashed } from 'lucide-react';
import { StepIndicator } from '@/components/chat/StepIndicator';
import { ChatBubbleStandard } from '@/components/chat/ChatBubbleStandard';
import { AIAlertBox } from '@/components/chat/AIAlertBox';
import { DemoMessage } from '@/lib/mock-data';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ChatDemoPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  
  // Initial Product Card Message
  const initialProductMsg: DemoMessage = {
    id: 'prod-card-1',
    from: 'system',
    type: 'product_card',
    content: 'Product Inquiry',
    timestamp: '09:58 AM',
    productInfo: {
      title: 'Kopi Arabika Gayo Specialty (Green Beans Grade 1)',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400',
      seller: 'Kopi Nusantara Abadi (Takengon, Aceh)',
      moq: '500 kg',
      price: '$8.50 / kg',
      specs: 'Organic Certified & Fairtrade CoO Ready'
    }
  };

  const [buyerMessages, setBuyerMessages] = useState<DemoMessage[]>([initialProductMsg]);
  const [sellerMessages, setSellerMessages] = useState<DemoMessage[]>([]);
  
  // AI Alert Box Control
  const [showAIAlertStep2, setShowAIAlertStep2] = useState(false);
  const [showAIAlertStep4, setShowAIAlertStep4] = useState(false);
  
  const buyerEndRef = useRef<HTMLDivElement>(null);
  const sellerEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    buyerEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [buyerMessages]);

  useEffect(() => {
    sellerEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [sellerMessages, showAIAlertStep2, showAIAlertStep4]);

  // DEMO CONTENT CONVERSATION FLOW
  // Turn 1: Buyer Inquiry
  const buyerTurn1Original = "你好！我对你们的 Gayo Arabica Coffee 很感兴趣。\n请问 500 kg 的起订量 (MOQ) 价格是多少？包含 Organic 认证和 CoO 吗？";
  const buyerTurn1Translated = "Halo! Saya sangat tertarik dengan Kopi Arabika Gayo Anda.\nBerapa harga untuk MOQ 500 kg? Apakah termasuk Sertifikat Organik dan CoO?";
  
  // Turn 2: UMKM Reply 1 (Initial Quote)
  const sellerTurn1Informal = "bisa pak, harga awal $9.00/kg tapi kalau pesan 500kg langsung kita kasih harga khusus $8.50/kg, sertifikat organik & CoO komplit siap kirim";
  const sellerTurn1CorrectedIndonesia = "Yth. Nyonya Ye Lin,\n\nTerima kasih atas ketertarikan Anda. Untuk pemesanan 500 kg Kopi Arabika Gayo Grade 1, harga normal adalah $9.00/kg. Namun khusus untuk kemitraan awal ini, kami berikan harga spesial $8.50/kg (Total $4,250 USD).\n\nSertifikat Organik & Certificate of Origin (CoO) siap kami sertakan.\n\nHormat kami,\nKopi Nusantara Abadi";
  const sellerTurn1TranslatedMandarin = "尊敬的叶琳女士，\n\n感谢您的关注。对于 500 kg Gayo 阿拉比卡 1 级咖啡豆的订单，标准单价为 9.00 美元/kg。但作为首次合作的特别优惠，我们提供 8.50 美元/kg 的特价（总计 4,250 美元）。\n\n我们将附带完整的有机认证及原产地证书 (CoO)。\n\n此致，\nKopi Nusantara Abadi";

  // Turn 3: Buyer Counter (Asking for Packaging & Shipping terms)
  const buyerTurn2Original = "价格 $8.50/kg 非常合理！请问包装是 GrainPro Bag 60kg 吗？发货条款是 FOB Belawan 港口吗？如果确定，我们准备订购！\n\n叶琳";
  const buyerTurn2Translated = "Harga $8.50/kg sangat reasonable! Apakah kemasannya menggunakan GrainPro Bag 60kg? Apakah ketentuan pengiriman FOB Pelabuhan Belawan? Jika ya, kami siap order!\n\nYe Lin";

  // Turn 4: UMKM Reply 2 (Confirming Terms)
  const sellerTurn2Informal = "iya betul kemasan GrainPro bag 60kg anti lembab, pengiriman FOB Belawan Pelabuhan Medan. Siap kita buatkan tagihan escrow.";
  const sellerTurn2CorrectedIndonesia = "Yth. Nyonya Ye Lin,\n\nBenar sekali, produk dikemas dalam GrainPro Moisture-Proof Bag @ 60kg untuk menjamin kualitas selama pengiriman laut. Ketentuan pengiriman adalah FOB Pelabuhan Belawan (Medan).\n\nKami siap menerbitkan tagihan Escrow resmi untuk transaksi ini.\n\nHormat kami,\nKopi Nusantara Abadi";
  const sellerTurn2TranslatedMandarin = "尊敬的叶琳女士，\n\n完全正确，产品采用 60kg GrainPro 防潮袋包装，以确保海运过程中的品质。发货条款为 FOB 勿拉湾港（棉兰）。\n\n我们准备为您开具正式的 Escrow 担保支付账单。\n\n此致，\nKopi Nusantara Abadi";

  // Turn 5: Buyer Final Deal Confirmation
  const buyerTurn3Original = "太棒了！完全同意条款。请立即生成 $4,250 USD 的 Escrow 支付账单，我们立即进行 Cross-Border 付款！\n\n叶琳";
  const buyerTurn3Translated = "Sangat bagus! Kami setuju penuh dengan semua ketentuan. Tolong segera terbitkan tagihan Escrow $4,250 USD, kami segera lakukan pembayaran Cross-Border!\n\nYe Lin";


  // ACTIONS
  // 1. Buyer sends Turn 1
  const handleBuyerSendTurn1 = () => {
    if (currentStep !== 1) return;
    
    const newBuyerMsg: DemoMessage = {
      id: 'b1', 
      from: 'buyer', 
      lang: 'zh', 
      content: buyerTurn1Original, 
      timestamp: '10:00 AM', 
      type: 'original'
    };
    setBuyerMessages(prev => [...prev, newBuyerMsg]);
    
    // Product Card + Buyer Inquiry arrive at Seller panel together
    setTimeout(() => {
      setSellerMessages([
        initialProductMsg,
        { 
          id: 's1', 
          from: 'buyer', 
          lang: 'zh', 
          content: buyerTurn1Original, 
          translatedContent: buyerTurn1Translated,
          timestamp: '10:00 AM', 
          type: 'original' 
        }
      ]);
      
      setCurrentStep(2);
      setTimeout(() => setShowAIAlertStep2(true), 600);
    }, 500);
  };

  // 2. Seller approves Turn 1
  const handleSellerApproveTurn1 = (approvedIndonesianText: string) => {
    setShowAIAlertStep2(false);
    
    const newSellerMsg: DemoMessage = {
      id: 's2', 
      from: 'seller', 
      lang: 'id', 
      content: approvedIndonesianText, 
      timestamp: '10:02 AM', 
      type: 'sent'
    };
    setSellerMessages(prev => [...prev, newSellerMsg]);
    setCurrentStep(3);

    // Buyer receives Indonesian text + Mandarin translation
    setTimeout(() => {
      const buyerReceivedMsg: DemoMessage = {
        id: 'b2', 
        from: 'seller', 
        lang: 'zh', 
        content: approvedIndonesianText,
        translatedContent: sellerTurn1TranslatedMandarin,
        timestamp: '10:02 AM', 
        type: 'sent'
      };
      setBuyerMessages(prev => [...prev, buyerReceivedMsg]);
      
      // Buyer Turn 2 (Asking for packaging & FOB terms) after 1500ms
      setTimeout(() => {
        const finalBuyerMsg: DemoMessage = {
          id: 'b3', 
          from: 'buyer', 
          lang: 'zh', 
          content: buyerTurn2Original, 
          timestamp: '10:04 AM', 
          type: 'original'
        };
        setBuyerMessages(prev => [...prev, finalBuyerMsg]);
        
        setTimeout(() => {
          setSellerMessages(prev => [
            ...prev,
            { 
              id: 's3', 
              from: 'buyer', 
              lang: 'zh', 
              content: buyerTurn2Original, 
              translatedContent: buyerTurn2Translated,
              timestamp: '10:04 AM', 
              type: 'original' 
            }
          ]);

          // Trigger Step 4 AI Alert for Seller Turn 2
          setCurrentStep(4);
          setTimeout(() => setShowAIAlertStep4(true), 600);
        }, 500);
        
      }, 1500);
      
    }, 1000);
  };

  // 3. Seller approves Turn 2 (Confirming terms)
  const handleSellerApproveTurn2 = (approvedIndonesianText: string) => {
    setShowAIAlertStep4(false);

    const newSellerMsg: DemoMessage = {
      id: 's4', 
      from: 'seller', 
      lang: 'id', 
      content: approvedIndonesianText, 
      timestamp: '10:05 AM', 
      type: 'sent'
    };
    setSellerMessages(prev => [...prev, newSellerMsg]);

    // Buyer receives confirmation and sends final deal acceptance
    setTimeout(() => {
      const buyerReceivedMsg: DemoMessage = {
        id: 'b4', 
        from: 'seller', 
        lang: 'zh', 
        content: approvedIndonesianText,
        translatedContent: sellerTurn2TranslatedMandarin,
        timestamp: '10:05 AM', 
        type: 'sent'
      };
      setBuyerMessages(prev => [...prev, buyerReceivedMsg]);

      // Buyer Final Acceptance
      setTimeout(() => {
        const buyerDealMsg: DemoMessage = {
          id: 'b5',
          from: 'buyer',
          lang: 'zh',
          content: buyerTurn3Original,
          timestamp: '10:06 AM',
          type: 'original'
        };
        setBuyerMessages(prev => [...prev, buyerDealMsg]);

        setTimeout(() => {
          setSellerMessages(prev => [
            ...prev,
            {
              id: 's5',
              from: 'buyer',
              lang: 'zh',
              content: buyerTurn3Original,
              translatedContent: buyerTurn3Translated,
              timestamp: '10:06 AM',
              type: 'original'
            }
          ]);

          // AUTOMATIC DEAL CARD INGESTION (Step 5)
          setTimeout(() => {
            setCurrentStep(5);

            const dealCardMsg: DemoMessage = {
              id: 'deal-card-1',
              from: 'system',
              type: 'deal',
              content: 'Deal Confirmation',
              timestamp: '10:07 AM'
            };

            setBuyerMessages(prev => [...prev, dealCardMsg]);
            setSellerMessages(prev => [...prev, dealCardMsg]);
          }, 1200);

        }, 600);

      }, 1500);

    }, 1000);
  };

  const handleResetDemo = () => {
    setCurrentStep(1);
    setShowAIAlertStep2(false);
    setShowAIAlertStep4(false);
    setBuyerMessages([initialProductMsg]);
    setSellerMessages([]);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-50 flex flex-col font-body">
      {/* Header bar */}
      <div className="bg-slate-900 text-white h-14 flex items-center justify-between px-6 shrink-0 z-50 relative">
        <div className="flex items-center gap-3">
          <div className="font-bold text-sm tracking-widest text-emerald-400">NUSATRADE CONNECT</div>
          <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-semibold">
            Live AI Translation & B2B Negotiation Demo
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 text-xs border-slate-700 hover:bg-slate-800 text-slate-300"
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            onClick={handleResetDemo}
          >
            Reset Demo
          </Button>

          <Link href="/">
            <Button variant="outline" size="sm" className="h-8 text-xs border-slate-700 hover:bg-slate-800 text-slate-300">
              Tutup Panel
            </Button>
          </Link>
        </div>
      </div>

      <div className="shrink-0 z-40 relative">
        <StepIndicator currentStep={currentStep} />
      </div>

      {/* Side-by-side layout */}
      <div className="flex-1 flex p-4 sm:p-6 gap-6 max-w-[1440px] w-full mx-auto overflow-hidden relative z-0">
        
        {/* BUYER PANEL (Left) */}
        <div className="flex-1 flex flex-col bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden relative">
          <div className="absolute inset-0 bg-blue-50/30 mix-blend-overlay pointer-events-none"></div>
          
          {/* Buyer Header */}
          <div className="h-16 border-b border-slate-200 px-5 flex items-center gap-3 bg-white z-20 shrink-0 shadow-sm relative">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              KN
            </div>
            <div>
              <div className="font-bold text-sm">Kopi Nusantara Abadi (UMKM Indonesia)</div>
              <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> NIB & Organic Verified
              </div>
            </div>
            <div className="ml-auto text-[10px] font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              国际买家面板 (International Buyer Panel)
            </div>
          </div>

          {/* Buyer Chat Area */}
          <div className="flex-1 overflow-y-auto p-5 z-10 space-y-4 relative bg-slate-50/50">
            <div className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-wider my-2">
              今天 (Today) • 哥罗山阿拉比卡咖啡豆问询 (Gayo Coffee Inquiry)
            </div>
            
            {buyerMessages.map(msg => (
              <ChatBubbleStandard 
                key={msg.id} 
                message={msg} 
                viewer="buyer" 
                buyerLangName="Mandarin"
                onNavigatePayment={() => router.push('/demo/payment/buyer')}
              />
            ))}
            <div ref={buyerEndRef} />
          </div>

          {/* Buyer Input */}
          <div className="p-4 border-t border-slate-200 bg-white z-20 shrink-0 relative">
            <div className="flex items-end gap-3 bg-slate-50 border border-slate-300 rounded-2xl p-2.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <textarea 
                className="flex-1 bg-transparent px-2 py-1 text-sm font-medium focus:outline-none resize-none h-[56px] text-slate-800 placeholder:text-slate-400 leading-relaxed"
                placeholder={
                  currentStep === 1 ? "输入问询消息 (Mandarin)..." :
                  currentStep === 5 ? "交易已达成！准备进行托管支付... (Deal Reached! Ready for Escrow Payment...)" : "协商中 (Negotiating)..."
                }
                readOnly
                value={currentStep === 1 ? buyerTurn1Original : ""}
              />
              {currentStep === 1 && (
                <Button 
                  className="h-10 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-white shadow-md shadow-blue-500/20 shrink-0 whitespace-nowrap" 
                  size="sm"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  onClick={handleBuyerSendTurn1}
                >
                  发送消息 (Send)
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
              <div className="font-bold text-sm">Ye Lin (Beijing Trading - China)</div>
              <div className="text-[10px] text-blue-600 font-bold flex items-center gap-1">
                <User className="w-3 h-3" /> International Coffee Importer
              </div>
            </div>
            <div className="ml-auto text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Panel UMKM Lokal
            </div>
          </div>

          {/* Seller Chat Area */}
          <div className="flex-1 overflow-y-auto p-5 z-10 relative bg-slate-50/50 flex flex-col">
            <div className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-wider my-2">
              Hari ini • Inquiry Kopi Arabika Gayo
            </div>
            
            {sellerMessages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-slate-400 my-auto animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-3 text-slate-300 ring-8 ring-slate-50">
                  <MessageSquareDashed className="w-8 h-8 animate-pulse text-emerald-500" />
                </div>
                <h4 className="text-sm font-bold text-slate-700 mb-1">Belum Ada Pesan Masuk</h4>
                <p className="text-xs text-slate-400 max-w-xs font-medium">
                  Menunggu Buyer (Ye Lin) mengirimkan inquiry pesan dari panel sebelah kiri...
                </p>
              </div>
            ) : (
              sellerMessages.map(msg => (
                <ChatBubbleStandard 
                  key={msg.id} 
                  message={msg} 
                  viewer="seller" 
                  buyerLangName="Mandarin"
                  onNavigatePayment={() => router.push('/demo/payment/umkm')}
                />
              ))
            )}

            {/* AI Alert Box Turn 1 (Price quote) */}
            {showAIAlertStep2 && (
              <AIAlertBox 
                originalText={sellerTurn1Informal}
                aiCorrectedText={sellerTurn1CorrectedIndonesia}
                buyerLangName="Mandarin"
                onApprove={(approvedText) => handleSellerApproveTurn1(approvedText)}
              />
            )}

            {/* AI Alert Box Turn 2 (Packaging & FOB terms) */}
            {showAIAlertStep4 && (
              <AIAlertBox 
                originalText={sellerTurn2Informal}
                aiCorrectedText={sellerTurn2CorrectedIndonesia}
                buyerLangName="Mandarin"
                onApprove={(approvedText) => handleSellerApproveTurn2(approvedText)}
              />
            )}
            
            <div ref={sellerEndRef} />
          </div>

          {/* Seller Input */}
          <div className="p-4 border-t border-slate-200 bg-white z-20 shrink-0 relative">
            <div className="flex items-end gap-3 bg-slate-50 border border-slate-300 rounded-2xl p-2.5 focus-within:border-[var(--color-primary)] focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
              <textarea 
                className="flex-1 bg-transparent px-2 py-1 text-sm font-medium focus:outline-none resize-none h-[56px] text-slate-800 placeholder:text-slate-400 leading-relaxed"
                placeholder={
                  currentStep >= 5 ? "Deal tercapai! Lanjut ke Pembayaran Escrow di atas..." :
                  currentStep === 3 ? "Menunggu tanggapan buyer terkait kemasan & pengiriman..." : "Ketik pesan informal, biar AI yang betulkan..."
                }
                readOnly
              />
              {currentStep === 5 && (
                <Link href="/demo/payment/umkm">
                  <Button 
                    className="h-10 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-bold text-white shadow-md shadow-emerald-500/20 shrink-0 whitespace-nowrap text-xs" 
                    size="sm"
                    rightIcon={<CreditCard className="w-4 h-4" />}
                  >
                    Buka Escrow Payment
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
