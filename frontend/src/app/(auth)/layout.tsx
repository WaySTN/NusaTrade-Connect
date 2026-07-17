import React from 'react';
import Link from 'next/link';
import { PublicNavbar } from '@/components/layout/PublicNavbar';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative overflow-hidden bg-white">
      
      <PublicNavbar />

      <div className="flex-1 flex flex-col lg:flex-row w-full">
        {/* Decorative Background for right pane */}
        <div className="absolute inset-0 grid-pattern opacity-30 z-0 pointer-events-none lg:hidden"></div>
        
        {/* Left Pane - Image & Branding (Hidden on mobile) */}
        <div className="hidden lg:flex flex-col w-full lg:w-[45%] xl:w-[40%] relative z-10 p-12 pt-[calc(var(--header-height)+3rem)] overflow-hidden justify-between text-white bg-[var(--color-primary)] border-r border-[var(--color-primary-subtle)]/20 shadow-2xl">
          <div className="absolute inset-0 futuristic-bg opacity-30 mix-blend-overlay"></div>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(var(--color-warning) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          
          {/* Spacer to push content to center */}
          <div className="flex-1"></div>
          
          <div className="z-10 animate-fade-in max-w-lg mb-12">
            <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest mb-6">
              Platform Ekspor B2B
            </div>
            <h1 className="text-4xl lg:text-5xl font-display font-extrabold leading-tight mb-6 tracking-tight">
              Buka Peluang Bisnis Anda ke <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Pasar Global</span>
            </h1>
            <p className="text-[var(--color-primary-light)] text-lg font-medium leading-relaxed opacity-90">
              Bergabung dengan ribuan eksportir Indonesia yang telah sukses melakukan transaksi lintas negara dengan mudah dan aman.
            </p>
          </div>

          {/* Spacer to balance */}
          <div className="flex-1 flex flex-col justify-end">
            <div className="z-10 flex gap-4 text-sm font-semibold text-[var(--color-primary-light)]/70">
              <span>&copy; 2026 NusaTrade Connect.</span>
              <Link href="/terms" className="hover:text-white transition-colors duration-200">Syarat & Ketentuan</Link>
            </div>
          </div>
        </div>
        
        {/* Right Pane - Form Area */}
        <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16 pt-[calc(var(--header-height)+2rem)] lg:pt-[calc(var(--header-height)+3rem)] relative z-10 bg-white">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[var(--color-primary)] rounded-full blur-[150px] opacity-[0.08] z-0 pointer-events-none"></div>
          <div className="absolute bottom-[-10%] right-[10%] w-[40%] h-[40%] bg-[var(--color-warning)] rounded-full blur-[120px] opacity-[0.05] z-0 pointer-events-none"></div>
          
          <div className="w-full max-w-md animate-slide-up relative z-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
