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
  variant?: 'underline' | 'pill';
}

export function Tabs({ tabs, activeTab: externalActiveTab, onChange, className, variant = 'underline' }: TabsProps) {
  const [activeTab, setActiveTab] = useState(externalActiveTab || tabs[0]?.id);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, height: 0, top: 0 });
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
        height: activeElement.offsetHeight,
        top: activeElement.offsetTop
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
    <div className={cn("relative", variant === 'underline' && "border-b border-[var(--color-border)]", className)}>
      <div className={cn(
        "flex relative",
        variant === 'underline' ? "space-x-6" : "space-x-2 bg-[var(--color-bg-subtle)] p-1 rounded-xl w-fit"
      )}>
        {/* Animated indicator */}
        {variant === 'underline' ? (
          <div 
            className="absolute bottom-0 h-0.5 bg-[var(--color-primary)] transition-all duration-300 var(--ease-out-quart)"
            style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
          />
        ) : (
          <div 
            className="absolute rounded-lg bg-white shadow-sm border border-[var(--color-border)] transition-all duration-300 var(--ease-out-quart)"
            style={{ 
              left: indicatorStyle.left, 
              width: indicatorStyle.width,
              height: indicatorStyle.height,
              top: indicatorStyle.top
            }}
          />
        )}
        
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={el => { tabsRef.current[index] = el; }}
            onClick={() => handleTabClick(tab.id)}
            className={cn(
              "relative z-10 text-sm font-semibold transition-colors flex items-center gap-2",
              variant === 'underline' 
                ? "pb-3" 
                : "px-4 py-2 rounded-lg",
              activeTab === tab.id
                ? "text-[var(--color-primary)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
            )}
          >
            {tab.icon && (
              <span className={cn(
                "transition-colors duration-200", 
                activeTab === tab.id ? "text-[var(--color-primary)]" : "text-[var(--color-text-placeholder)]"
              )}>
                {tab.icon}
              </span>
            )}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
