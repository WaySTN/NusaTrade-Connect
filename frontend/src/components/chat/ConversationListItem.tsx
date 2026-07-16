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
        "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 border border-transparent",
        isActive 
          ? "bg-[#F0FAF6] border-[#006B52]/20" 
          : "hover:bg-[var(--color-bg-subtle)] hover:border-[var(--color-border)]"
      )}
    >
      <div className="relative">
        <Avatar 
          initials={conversation.buyerAvatar} 
          size="lg" 
          className={cn(isActive && "ring-2 ring-offset-2 ring-[#006B52]/30 transition-all")}
        />
        {conversation.isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-0.5">
          <h4 className={cn(
            "text-sm font-semibold truncate pr-2",
            isActive ? "text-[#006B52]" : "text-[var(--color-text-primary)]"
          )}>
            {conversation.buyerName}
          </h4>
          <span className="text-[10px] text-[var(--color-text-muted)] whitespace-nowrap shrink-0">
            {conversation.timestamp}
          </span>
        </div>
        
        <div className="flex justify-between items-center gap-2">
          <p className={cn(
            "text-xs truncate",
            conversation.unreadCount > 0 ? "text-[var(--color-text-primary)] font-medium" : "text-[var(--color-text-secondary)]"
          )}>
            {conversation.lastMessage}
          </p>
          
          {conversation.unreadCount > 0 && (
            <div className="w-4 h-4 rounded-full bg-[#006B52] flex items-center justify-center text-[9px] font-bold text-white shrink-0">
              {conversation.unreadCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
