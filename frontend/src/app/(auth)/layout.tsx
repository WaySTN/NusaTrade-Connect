import React from 'react';
import Link from 'next/link';
import { PublicNavbar } from '@/components/layout/PublicNavbar';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[var(--color-primary-subtle)]">
      
      <PublicNavbar />

      <div className="flex-1 flex pt-[var(--header-height)]">
        {/* Decorative Background for right pane */}
        <div className="absolute inset-0 grid-pattern opacity-40 z-0 pointer-events-none"></div>
        <div className="absolute top-0 right-[-10%] w-[50%] h-[50%] bg-[#006B52] rounded-full blur-[150px] opacity-10 z-0 pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-[#C8941A] rounded-full blur-[120px] opacity-10 z-0 pointer-events-none"></div>
        
        {/* Left Pane - Image & Branding (Hidden on mobile) */}
        <div className="hidden lg:flex flex-col flex-1 relative z-10 p-12 overflow-hidden justify-between text-white" style={{ background: 'linear-gradient(135deg, #004D3A 0%, #002B20 100%)' }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#C8941A 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          
          {/* Spacer to push content to center */}
          <div className="flex-1"></div>
          
          <div className="z-10 animate-in fade-in slide-in-from-left-8 duration-1000 max-w-lg mb-12">
            <div className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider mb-6">
              Platform Ekspor B2B
            </div>
            <h1 className="text-4xl lg:text-5xl font-display font-bold leading-tight mb-6">
              Buka Peluang Bisnis Anda ke <span className="text-[#C8941A]">Pasar Global</span>
            </h1>
            <p className="text-emerald-50 text-lg leading-relaxed opacity-90">
              Bergabung dengan ribuan eksportir Indonesia yang telah sukses melakukan transaksi lintas negara dengan mudah dan aman.
            </p>
          </div>

          {/* Spacer to balance */}
          <div className="flex-1 flex flex-col justify-end">
            <div className="z-10 flex gap-4 text-sm font-medium text-emerald-100/60">
              <span>&copy; 2026 NusaTrade Connect.</span>
              <Link href="/terms" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
            </div>
          </div>
        </div>
        
        {/* Right Pane - Form Area */}
        <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-12 relative z-10">
          
          <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="glass-card rounded-2xl p-8 sm:p-10 border border-white/80 shadow-2xl relative overflow-hidden bg-white/90">
              {/* Subtle inner highlight */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-100"></div>
              
              {children}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
