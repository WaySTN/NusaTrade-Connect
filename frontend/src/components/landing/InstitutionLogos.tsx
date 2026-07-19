'use client';

import React from 'react';

export const ApindoLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <svg className={className} viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" y="5" rx="8" fill="#006B52" />
    <path d="M12 28L20 14L28 28H12Z" fill="#C8941A" />
    <path d="M16 33H24V36H16V33Z" fill="white" />
    <path d="M14 26H26V29H14V26Z" fill="white" />
    <text x="50" y="32" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="900" fontSize="20" fill="#0F172A" letterSpacing="-0.5">APINDO</text>
  </svg>
);

export const KadinLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <svg className={className} viewBox="0 0 220 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="25" cy="25" r="20" fill="#0F766E" />
    <path d="M25 10L32 18H18L25 10Z" fill="#F59E0B" />
    <circle cx="25" cy="26" r="7" fill="white" />
    <path d="M22 23H28V29H22V23Z" fill="#0F766E" />
    <text x="54" y="32" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="900" fontSize="19" fill="#0F172A" letterSpacing="-0.5">KADIN</text>
    <text x="126" y="32" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="600" fontSize="16" fill="#059669">ID</text>
  </svg>
);

export const BeaCukaiLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <svg className={className} viewBox="0 0 230 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25 6L42 14V26C42 36 25 44 25 44C25 44 8 36 8 26V14L25 6Z" fill="#0284C7" />
    <path d="M25 12L36 18V25C36 32 25 38 25 38C25 38 14 32 14 25V18L25 12Z" fill="#F59E0B" />
    <path d="M25 16L28 22H34L29 26L31 32L25 28L19 32L21 26L16 22H22L25 16Z" fill="white" />
    <text x="50" y="32" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="900" fontSize="18" fill="#0F172A" letterSpacing="-0.5">BEA CUKAI</text>
  </svg>
);

export const PelindoLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <svg className={className} viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" y="5" rx="10" fill="#0284C7" />
    <path d="M12 28C16 22 24 22 28 28C32 34 36 24 36 24" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <circle cx="20" cy="16" r="4" fill="#38BDF8" />
    <text x="50" y="32" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="900" fontSize="20" fill="#0F172A" letterSpacing="-0.5">PELINDO</text>
  </svg>
);

export const QrisLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <svg className={className} viewBox="0 0 210 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="42" height="40" y="5" rx="8" fill="#DC2626" />
    <rect x="8" y="13" width="10" height="10" rx="2" fill="white" />
    <rect x="11" y="16" width="4" height="4" fill="#DC2626" />
    <rect x="24" y="13" width="10" height="10" rx="2" fill="white" />
    <rect x="27" y="16" width="4" height="4" fill="#DC2626" />
    <rect x="8" y="27" width="10" height="10" rx="2" fill="white" />
    <rect x="11" y="30" width="4" height="4" fill="#DC2626" />
    <rect x="24" y="27" width="4" height="4" fill="white" />
    <rect x="30" y="33" width="4" height="4" fill="white" />
    <text x="52" y="33" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="900" fontSize="22" fill="#0F172A" letterSpacing="-0.5">QRIS</text>
  </svg>
);
