'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils/cn';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab: externalActiveTab, onChange, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(externalActiveTab || tabs[0]?.id);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (externalActiveTab !== undefined) {
      setActiveTab(externalActiveTab);
    }
  }, [externalActiveTab]);

  useEffect(() => {
    // Find the index of the active tab
    const activeIndex = tabs.findIndex(tab => tab.id === activeTab);
    const activeElement = tabsRef.current[activeIndex];

    if (activeElement) {
      setIndicatorStyle({
        left: activeElement.offsetLeft,
        width: activeElement.offsetWidth,
      });
    }
  }, [activeTab, tabs]);

  const handleTabClick = (tabId: string) => {
    if (externalActiveTab === undefined) {
      setActiveTab(tabId);
    }
    onChange?.(tabId);
  };

  return (
    <div className={cn("relative border-b border-[var(--color-border)]", className)}>
      <div className="flex space-x-6 relative">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={el => { tabsRef.current[index] = el; }}
            onClick={() => handleTabClick(tab.id)}
            className={cn(
              "pb-3 text-sm font-medium transition-colors flex items-center gap-2",
              activeTab === tab.id
                ? "text-[#006B52]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Animated underline indicator */}
      <div 
        className="absolute bottom-0 h-0.5 bg-[#006B52] transition-all duration-300 ease-out"
        style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
      />
    </div>
  );
}
