'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Bot, Send, CheckCircle2, ArrowRight, RefreshCw, MessageSquareText, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useT } from '@/i18n/useT';

interface PresetMessage {
  id: string;
  category: string;
  inputIndonesian: string;
  polishedIndonesian: string;
  englishOutput: string;
}

export const LiveAiDemo: React.FC = () => {
  const t = useT();

  const PRESET_MESSAGES: PresetMessage[] = [
    {
      id: 'p1',
      category: t('live_demo.preset_1_cat') || 'Kopi Specialty Gayo',
      inputIndonesian: t('live_demo.preset_1_in') || 'Mas sy mau jual kopi gayo 100kg harganya berapa ya bisa nego gak?',
      polishedIndonesian: t('live_demo.preset_1_out') || 'Yth. Calon Pembeli, Kami menyediakan 100 kg Kopi Arabika Specialty Gayo organik bersertifikat dengan penawaran harga bersaing.',
      englishOutput: t('live_demo.preset_1_en') || 'Dear Valued Buyer, We can supply 100 kg of Premium Organic Gayo Specialty Arabica Coffee with official certification at competitive B2B rates.'
    },
    {
      id: 'p2',
      category: t('live_demo.preset_2_cat') || 'Furniture Rotan Bali',
      inputIndonesian: t('live_demo.preset_2_in') || 'Kami ada stok 500 set kursi rotan bali mas bisa kirim ke amerika minggu ini',
      polishedIndonesian: t('live_demo.preset_2_out') || 'Kami siap melayani pengiriman 500 set furniture rotan alami kualitas ekspor ke pelabuhan Amerika Serikat pada minggu ini.',
      englishOutput: t('live_demo.preset_2_en') || 'We are ready to dispatch 500 sets of export-grade natural rattan furniture to US ports within this week.'
    },
    {
      id: 'p3',
      category: t('live_demo.preset_3_cat') || 'Batik Tulis Sutra Solo',
      inputIndonesian: t('live_demo.preset_3_in') || 'Kain batik tulis sutra solo pewarna alam ada sertifikat batikmark resmi mbak',
      polishedIndonesian: t('live_demo.preset_3_out') || 'Koleksi kain batik tulis sutra halus Solo kami menggunakan pewarna alami dan telah mengantongi sertifikasi resmi Batikmark Indonesia.',
      englishOutput: t('live_demo.preset_3_en') || 'Our fine Solo silk batik collection utilizes 100% natural dyes and holds official Batikmark Indonesia certification.'
    }
  ];

  const [selectedPreset, setSelectedPreset] = useState<PresetMessage>(PRESET_MESSAGES[0]);
  const [customText, setCustomText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [currentDisplay, setCurrentDisplay] = useState<PresetMessage>(PRESET_MESSAGES[0]);

  // Update current display when language changes
  useEffect(() => {
    const updatedPreset = PRESET_MESSAGES.find(p => p.id === selectedPreset.id) || PRESET_MESSAGES[0];
    setSelectedPreset(updatedPreset);
    setCurrentDisplay(updatedPreset);
  }, [t]);

  const handleSelectPreset = (preset: PresetMessage) => {
    setSelectedPreset(preset);
    setIsTranslating(true);
    setTimeout(() => {
      setCurrentDisplay(preset);
      setIsTranslating(false);
    }, 600);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customText.trim()) return;

    setIsTranslating(true);
    setTimeout(() => {
      const generated: PresetMessage = {
        id: `custom-${Date.now()}`,
        category: 'Custom Input',
        inputIndonesian: customText,
        polishedIndonesian: `[Sistem AI]: "${customText}" telah disesuaikan ke dalam bahasa bisnis baku.`,
        englishOutput: `Dear Buyer, regarding your request: "${customText}", we offer premium B2B export terms with certified quality standards.`
      };
      setCurrentDisplay(generated);
      setIsTranslating(false);
    }, 700);
  };

  return (
    <div className="w-full bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl text-white relative overflow-hidden">
      
      {/* Background Batik Motif Overlay */}
      <div className="absolute inset-0 batik-pattern opacity-10 pointer-events-none"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[var(--color-primary)] rounded-full blur-[140px] opacity-20 pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[var(--color-accent)] rounded-full blur-[140px] opacity-15 pointer-events-none"></div>

      <div className="relative z-10 space-y-8">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary)]/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-[var(--color-primary)]/30">
              <Bot className="w-4 h-4 text-emerald-400" />
              {t('live_demo.badge') || 'Live Interactive Demonstration'}
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              {t('live_demo.title') || 'Coba AI Tone-Shift & Translation Secara Live!'}
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm font-medium">
              {t('live_demo.subtitle') || 'Lihat bagaimana AI NusaTrade mengubah pesan kasual UMKM menjadi bahasa Inggris bisnis tingkat ekspor.'}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-amber-400 font-mono bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" /> {t('live_demo.response_time') || '0.2 Detik Respon AI'}
          </div>
        </div>

        {/* Preset Selector Buttons */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <MessageSquareText className="w-4 h-4 text-[var(--color-accent)]" /> {t('live_demo.select_sample') || 'PILIH SAMPEL PESAN UMKM:'}
          </div>
          <div className="flex flex-wrap gap-2.5">
            {PRESET_MESSAGES.map(preset => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                  selectedPreset.id === preset.id
                    ? 'bg-[var(--color-primary)] border-emerald-400 text-white shadow-lg shadow-[var(--color-primary)]/30 scale-105'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                {preset.category}
              </button>
            ))}
          </div>
        </div>

        {/* Live Transformation Output Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950/80 p-6 rounded-2xl border border-slate-800 relative">
          
          {/* Left: Input Indonesian */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <span className="flex items-center gap-2">
                🇮🇩 {t('live_demo.input_label') || 'Bahasa Indonesia (Pesan Asli UMKM)'}
              </span>
              <span className="text-[10px] font-mono text-slate-500">{t('live_demo.input_raw') || 'Input Raw'}</span>
            </div>
            
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 text-sm font-medium text-slate-200 min-h-[90px] flex items-center">
              &quot;{currentDisplay.inputIndonesian}&quot;
            </div>

            <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {t('live_demo.ai_detect') || 'AI mendeteksi & memoles tata bahasa secara otomatis'}
            </div>
          </div>

          {/* Center Divider / AI Processing Icon */}
          {isTranslating && (
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center z-20 space-y-3">
              <div className="w-12 h-12 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
              <span className="text-xs font-bold text-emerald-400 animate-pulse">
                {t('live_demo.ai_loading') || 'AI Engine Memoles & Menerjemahkan Ke Bahasa B2B...'}
              </span>
            </div>
          )}

          {/* Right: Output English B2B */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
              <span className="flex items-center gap-2">
                🌐 {t('live_demo.output_label') || 'Global B2B English (Hasil Olahan AI)'}
              </span>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">
                {t('live_demo.output_tone') || 'Professional Tone'}
              </span>
            </div>

            <div className="bg-gradient-to-br from-emerald-950/50 to-slate-900 p-4 rounded-xl border border-emerald-500/30 text-sm font-semibold text-white leading-relaxed min-h-[90px] flex items-center shadow-inner">
              &quot;{currentDisplay.englishOutput}&quot;
            </div>

            <div className="text-[11px] text-amber-300 font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              {t('live_demo.ready_send') || 'Siap dikirim ke pembeli internasional di 50+ negara'}
            </div>
          </div>

        </div>

        {/* Custom Input Form */}
        <form onSubmit={handleCustomSubmit} className="pt-2">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder={t('live_demo.custom_placeholder') || 'Atau ketik sendiri kalimat produk Anda di sini...'}
              className="w-full flex-1 px-4 py-3.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder:text-slate-500 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
            />
            <Button
              type="submit"
              variant="primary"
              className="w-full sm:w-auto h-12 px-6 font-bold text-xs rounded-xl emerald-gradient shrink-0 justify-center"
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              {t('live_demo.custom_btn') || 'Uji Coba AI Teks Ini'}
            </Button>
          </div>
        </form>

        {/* Footer Link */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-400">
          <span>
            ✨ {t('live_demo.footer_text') || 'Teknologi AI Tone-Shifting NusaTrade memangkas 90% kesalahpahaman budaya dalam transaksi B2B.'}
          </span>
          <Link href="/katalog">
            <span className="text-emerald-400 font-bold hover:underline inline-flex items-center gap-1">
              {t('live_demo.footer_link') || 'Jelajahi Fitur Chat & Katalog'} <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

      </div>
    </div>
  );
};
