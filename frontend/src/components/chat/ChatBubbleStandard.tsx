import React from 'react';
import { cn } from '@/lib/utils/cn';
import { CheckCircle2, Sparkles, Languages, Package, ArrowRight, ShieldCheck, CreditCard } from 'lucide-react';
import { DemoMessage } from '@/lib/mock-data';
import Link from 'next/link';

export interface ChatBubbleStandardProps {
  message: DemoMessage;
  viewer: 'buyer' | 'seller';
  buyerLangName?: string;
  onNavigatePayment?: () => void;
}

export function ChatBubbleStandard({ message, viewer, buyerLangName = 'Mandarin', onNavigatePayment }: ChatBubbleStandardProps) {
  const isMine = message.from === viewer;
  const alignRight = isMine;

  // ─── 1. PRODUCT INQUIRY CARD ─────────────────────────────────────────────
  if (message.type === 'product_card' && message.productInfo) {
    const { title, image, seller, moq, price, specs } = message.productInfo;
    const isBuyer = viewer === 'buyer';

    return (
      <div className="w-full my-3 flex justify-center animate-fade-in">
        <div className="w-full max-w-md bg-white rounded-2xl border-2 border-emerald-200/80 p-3.5 shadow-md hover:shadow-lg transition-all relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-bl-lg flex items-center gap-1 shadow-sm">
            <Package className="w-3 h-3" /> {isBuyer ? '询问商品 (Inquired Product)' : 'Produk Ditanyakan'}
          </div>

          <div className="flex gap-3 items-center">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 relative">
              {/* eslint-disable-next-html-element-suppression */}
              <img src={image} alt={title} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-slate-900 truncate leading-tight mb-1">
                {title}
              </h4>
              <p className="text-[10px] text-emerald-700 font-semibold mb-1 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> {seller}
              </p>
              
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-600">
                <span className="bg-slate-100 px-1.5 py-0.5 rounded font-bold text-slate-800">{price}</span>
                <span>• MOQ {moq}</span>
              </div>
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="font-semibold text-emerald-600 flex items-center gap-1">
              ✓ {specs}
            </span>
            <span className="font-mono text-slate-400">Inquiry #EX-8829</span>
          </div>
        </div>
      </div>
    );
  }

  // ─── 2. TRANSACTION DEAL & PAYMENT CARD (STEP 5) ─────────────────────────
  if (message.type === 'deal') {
    const isBuyer = viewer === 'buyer';
    const targetLink = isBuyer ? '/demo/payment/buyer' : '/demo/payment/umkm';

    return (
      <div className="w-full my-4 flex justify-center animate-slide-up">
        <div className="w-full max-w-lg bg-gradient-to-br from-emerald-950 via-slate-900 to-blue-950 text-white rounded-3xl p-5 shadow-2xl border-2 border-emerald-400/40 relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/20 blur-3xl rounded-full pointer-events-none"></div>

          <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold border border-emerald-500/30">
                <Sparkles className="w-4 h-4 animate-spin-slow text-emerald-400" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">
                  {isBuyer ? '交易状态 (TRANSACTION STATUS)' : 'STATUS TRANSAKSI'}
                </span>
                <h4 className="text-sm font-extrabold text-white">
                  {isBuyer ? '🎉 已达成价格协议 (DEAL AGREED)' : '🎉 KESEPAKATAN HARGA DICAPAI (DEAL)'}
                </h4>
              </div>
            </div>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
              {isBuyer ? '准备付款 (Ready for Payment)' : 'Siap Bayar Escrow'}
            </span>
          </div>

          {/* Deal Details Grid */}
          <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10 mb-4 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium">{isBuyer ? '产品 (Product):' : 'Produk:'}</span>
              <span className="font-bold text-white">Kopi Arabika Gayo Specialty</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium">{isBuyer ? '成交数量 (Agreed Volume):' : 'Kuantitas Sepakat:'}</span>
              <span className="font-bold text-white">500 kg @ $8.50 / kg</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium">{isBuyer ? '贸易条款 (Trade Terms):' : 'Ketentuan Pengiriman:'}</span>
              <span className="font-bold text-emerald-300 text-[11px]">FOB Belawan 港 (GrainPro 60kg Bags)</span>
            </div>
            <div className="flex justify-between items-center text-xs pt-1 border-t border-white/10">
              <span className="text-slate-300 font-medium">{isBuyer ? '账单总额 (Total Invoice):' : 'Total Nilai Tagihan:'}</span>
              <span className="text-base font-extrabold text-emerald-400 font-mono">$4,250 USD (~ Rp 68.000.000)</span>
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-400">
              <span>{isBuyer ? '担保支付 (Protection):' : 'Metode Garansi:'}</span>
              <span className="text-blue-300 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> NusaTrade 智能托管 (Smart Escrow)
              </span>
            </div>
          </div>

          {/* Call to Action Button */}
          <Link 
            href={targetLink}
            onClick={onNavigatePayment}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs py-3 px-4 rounded-xl shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <CreditCard className="w-4 h-4" />
            <span>
              {isBuyer ? '前往托管支付面板 (Proceed to Escrow Payment) →' : 'Lanjut ke Panel Pembayaran Escrow (Demo Payment) →'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // ─── 3. SELLER VIEW CHAT BUBBLES ─────────────────────────────────────────
  if (viewer === 'seller') {
    // A. INCOMING FROM BUYER:
    if (message.from === 'buyer') {
      return (
        <div className="flex flex-col mb-4 w-full items-start animate-fade-in">
          <div className="max-w-[90%] sm:max-w-[85%] rounded-2xl rounded-tl-sm p-4 shadow-sm border bg-white text-slate-800 border-slate-200">
            {/* Top Section: Original Buyer Mandarin Text */}
            <div className="mb-3 pb-3 border-b border-slate-100">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold mb-2 border bg-blue-50 text-blue-700 border-blue-200">
                <Languages className="w-3 h-3" />
                Pesan Asli Buyer ({buyerLangName})
              </div>
              <p className="text-xs text-slate-500 italic whitespace-pre-wrap leading-relaxed">
                &ldquo;{message.content}&rdquo;
              </p>
            </div>

            {/* Bottom Section: AI Indonesian Translation */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold mb-2 border bg-emerald-100 text-emerald-800 border-emerald-200">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                ✦ Terjemahan AI ke Bahasa Indonesia
              </div>
              <p className="text-sm font-semibold text-slate-900 whitespace-pre-wrap leading-relaxed">
                {message.translatedContent || message.content}
              </p>
            </div>

            <div className="flex items-center justify-end gap-1 mt-2 text-[10px] font-mono text-slate-400">
              {message.timestamp}
            </div>
          </div>
        </div>
      );
    }

    // B. OUTGOING FROM SELLER (UMKM):
    if (message.from === 'seller') {
      return (
        <div className="flex flex-col mb-4 w-full items-end animate-fade-in">
          <div className="max-w-[90%] sm:max-w-[85%] rounded-2xl rounded-tr-sm p-4 shadow-sm border bg-[var(--color-primary)] text-white border-[var(--color-primary)]">
            {/* Sent badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold mb-2 bg-white/20 text-white border border-white/30">
              <CheckCircle2 className="w-3 h-3" />
              Terkirim dalam Bahasa Indonesia
            </div>

            {/* Indonesian Business Content */}
            <p className="text-sm font-medium whitespace-pre-wrap leading-relaxed">
              {message.content}
            </p>

            <div className="flex items-center justify-end gap-1 mt-2 text-[10px] font-mono text-emerald-100">
              {message.timestamp}
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Footnote note */}
          <div className="flex items-center gap-1 mt-1 px-1 text-[10px] text-slate-400 font-semibold">
            <Languages className="w-3 h-3" />
            <span>AI auto-translate ke {buyerLangName} saat pengiriman ke buyer</span>
          </div>
        </div>
      );
    }
  }

  // ─── 4. BUYER VIEW CHAT BUBBLES ───────────────────────────────────────────
  if (viewer === 'buyer') {
    // A. OUTGOING FROM BUYER:
    if (message.from === 'buyer') {
      return (
        <div className="flex flex-col mb-4 w-full items-end animate-fade-in">
          <div className="max-w-[90%] sm:max-w-[85%] rounded-2xl rounded-tr-sm p-4 shadow-sm border bg-blue-600 text-white border-blue-600">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold mb-2 bg-white/20 text-white border border-white/30">
              <Languages className="w-3 h-3" />
              发送的原消息 (Mandarin Original)
            </div>
            <p className="text-sm font-medium whitespace-pre-wrap leading-relaxed">
              {message.content}
            </p>
            <div className="flex items-center justify-end gap-1 mt-2 text-[10px] font-mono text-blue-100">
              {message.timestamp}
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      );
    }

    // B. INCOMING FROM SELLER (UMKM):
    if (message.from === 'seller') {
      return (
        <div className="flex flex-col mb-4 w-full items-start animate-fade-in">
          <div className="max-w-[90%] sm:max-w-[85%] rounded-2xl rounded-tl-sm p-4 shadow-sm border bg-white text-slate-800 border-slate-200">
            {/* Top Section: Indonesian Original Text from UMKM */}
            <div className="mb-3 pb-3 border-b border-slate-100">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold mb-2 border bg-emerald-50 text-emerald-800 border-emerald-200">
                <Languages className="w-3 h-3" />
                🇮🇩 印尼 Seller 原始消息 (Indonesian Original)
              </div>
              <p className="text-xs text-slate-600 font-medium whitespace-pre-wrap leading-relaxed">
                {message.content}
              </p>
            </div>

            {/* Bottom Section: AI Mandarin Auto-Translation */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold mb-2 border bg-blue-100 text-blue-800 border-blue-200">
                <Sparkles className="w-3 h-3 text-blue-600" />
                ✦ AI 自动翻译 (Mandarin Auto-Translation)
              </div>
              <p className="text-sm font-semibold text-slate-900 whitespace-pre-wrap leading-relaxed">
                {message.translatedContent || message.content}
              </p>
            </div>

            <div className="flex items-center justify-end gap-1 mt-2 text-[10px] font-mono text-slate-400">
              {message.timestamp}
            </div>
          </div>
        </div>
      );
    }
  }

  return null;
}
