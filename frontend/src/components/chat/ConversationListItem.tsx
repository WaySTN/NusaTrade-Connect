import React from 'react';
import { cn } from '@/lib/utils/cn';
import { Avatar } from '@/components/ui/Avatar';
import { MockConversation } from '@/lib/mock-data';

export interface ConversationListItemProps {
  conversation: MockConversation;
  isActive?: boolean;
  onClick?: () => void;
}

export const ConversationListItem = ({ 
  conversation, 
  isActive = false, 
  onClick 
}: ConversationListItemProps) => {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 var(--ease-out-quart) border border-transparent",
        isActive 
          ? "bg-[var(--color-primary-subtle)] border-[var(--color-primary)]/20 shadow-sm" 
          : "bg-white hover:bg-[var(--color-bg-subtle)] hover:border-[var(--color-border-strong)] hover:shadow-md"
      )}
    >
      <div className="relative">
        <Avatar 
          initials={conversation.buyerAvatar} 
          size="lg" 
          className={cn(
            "transition-all duration-300 var(--ease-out-quart)",
            isActive ? "ring-4 ring-[var(--color-primary)]/20 shadow-sm" : "ring-1 ring-[var(--color-border)] group-hover:ring-[var(--color-primary)]/20"
          )}
        />
        {conversation.isOnline && (
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[var(--color-success)] border-2 border-white rounded-full"></span>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <h4 className={cn(
            "text-sm font-bold truncate pr-2 transition-colors duration-200",
            isActive ? "text-[var(--color-primary)]" : "text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)]"
          )}>
            {conversation.buyerName}
          </h4>
          <span className="text-[11px] font-medium text-[var(--color-text-muted)] whitespace-nowrap shrink-0">
            {conversation.timestamp}
          </span>
        </div>
        
        <div className="flex justify-between items-center gap-2">
          <p className={cn(
            "text-sm truncate",
            conversation.unreadCount > 0 ? "text-[var(--color-text-primary)] font-bold" : "text-[var(--color-text-secondary)] font-medium"
          )}>
            {conversation.lastMessage}
          </p>
          
          {conversation.unreadCount > 0 && (
            <div className="w-5 h-5 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-[10px] font-extrabold text-white shrink-0 shadow-sm">
              {conversation.unreadCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
