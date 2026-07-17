'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MOCK_CONVERSATIONS } from '@/lib/mock-data';
import { ConversationListItem } from '@/components/chat/ConversationListItem';
import { Search, MessageCircleOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';

export default function ChatInboxPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate network delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return MOCK_CONVERSATIONS;
    return MOCK_CONVERSATIONS.filter(conv => 
      conv.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="flex flex-col h-full bg-[var(--color-bg-base)] max-w-4xl mx-auto border-x border-[var(--color-border)]">
      
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-[var(--color-border)] bg-[var(--color-bg-base)] sticky top-0 z-10 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-[var(--color-text-primary)] tracking-tight">
            Pesan & Negosiasi
          </h1>
          <p className="text-sm font-medium text-[var(--color-text-secondary)] mt-1">
            Kelola komunikasi dengan pembeli potensial dan partner global Anda.
          </p>
        </div>
        
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-placeholder)] group-focus-within:text-[var(--color-primary)] transition-colors duration-200" />
          <input 
            type="text" 
            placeholder="Cari nama pembeli atau isi pesan..." 
            className="w-full h-12 pl-11 pr-4 bg-[var(--color-bg-subtle)] border border-[var(--color-border-strong)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors duration-200 text-sm font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[var(--color-bg-base)]">
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-[var(--color-border)] bg-white shadow-sm animate-pulse">
                <div className="w-12 h-12 rounded-full bg-[var(--color-bg-subtle)] shrink-0"></div>
                <div className="flex-1 space-y-2.5">
                  <div className="flex justify-between">
                    <div className="h-4 bg-[var(--color-bg-subtle)] rounded w-1/3"></div>
                    <div className="h-3 bg-[var(--color-bg-subtle)] rounded w-12"></div>
                  </div>
                  <div className="h-3 bg-[var(--color-bg-subtle)] rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 animate-slide-up duration-300 mt-10">
            <div className="w-20 h-20 rounded-full bg-[var(--color-primary-subtle)] flex items-center justify-center mb-5">
              <MessageCircleOff className="w-10 h-10 text-[var(--color-primary)]" />
            </div>
            <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
              Belum Ada Percakapan
            </h3>
            <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-6 max-w-sm">
              Tingkatkan eksposur produk Anda di katalog global untuk mulai mendapatkan inkuiri dari pembeli internasional.
            </p>
            <Link href="/toko/produk/baru">
              <Button variant="primary" className="shadow-lg shadow-[var(--color-primary)]/20 font-bold px-6">
                Promosikan Katalog
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-2 animate-slide-up duration-300">
            {filteredConversations.map((conv) => (
              <ConversationListItem 
                key={conv.id} 
                conversation={conv} 
                onClick={() => router.push(`/chat/${conv.id}`)}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
