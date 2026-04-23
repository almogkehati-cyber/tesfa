'use client';

import Link from 'next/link';
import { useState } from 'react';

const colors = {
  primary: '#deb7ff',
  primaryContainer: '#7b2fbe',
  surface: '#121222',
  surfaceContainerLow: '#1a1a2b',
  surfaceContainer: '#1e1e2f',
  surfaceContainerHighest: '#333345',
  onSurface: '#e3e0f8',
  onSurfaceVariant: '#cfc2d5',
  outlineVariant: '#4c4353',
};

interface ToggleItemProps {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}

function ToggleItem({ title, description, enabled, onToggle }: ToggleItemProps) {
  return (
    <div 
      className="flex items-center justify-between p-5 rounded-2xl transition-all hover:bg-[#1e1e2f]"
      style={{ backgroundColor: colors.surfaceContainerLow }}
    >
      <div className="flex flex-col gap-1">
        <span className="font-semibold">{title}</span>
        <span className="text-xs opacity-70" style={{ color: colors.onSurfaceVariant }}>
          {description}
        </span>
      </div>
      <button 
        onClick={onToggle}
        className="w-11 h-6 rounded-full relative transition-colors"
        style={{ backgroundColor: enabled ? colors.primaryContainer : colors.surfaceContainerHighest }}
      >
        <div 
          className={`absolute top-[2px] w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
            enabled ? 'right-[2px]' : 'right-[22px]'
          }`}
        />
      </button>
    </div>
  );
}

export default function NotificationsPage() {
  const [incomingPayments, setIncomingPayments] = useState(true);
  const [ubiGrants, setUbiGrants] = useState(true);
  const [communityUpdates, setCommunityUpdates] = useState(false);

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: '#0A0A1A', color: colors.onSurface }}
    >
      {/* Header */}
      <header 
        className="w-full sticky top-0 z-50 transition-all"
        style={{ backgroundColor: colors.surface }}
      >
        <div className="flex flex-row-reverse justify-between items-center px-6 h-16">
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full transition-all hover:bg-[#333345]/50">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
          <h1 
            className="text-xl font-bold"
            style={{ color: colors.primary, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            התראות
          </h1>
          <Link href="/profile" className="p-2 rounded-full transition-all hover:bg-[#333345]/50">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </header>

      <main className="px-6 pt-8 pb-32 max-w-2xl mx-auto space-y-10">
        {/* Intro */}
        <section className="space-y-2">
          <h2 
            className="text-2xl font-extrabold tracking-tight"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            ניהול העדפות
          </h2>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: colors.onSurfaceVariant }}>
            הגדר כיצד תרצה לקבל עדכונים על הפעילות הפיננסית והקהילתית שלך בתוך ה-Vault.
          </p>
        </section>

        {/* Financial Notifications */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <span 
              className="text-[10px] uppercase tracking-[0.2em] font-bold"
              style={{ color: colors.primary }}
            >
              פיננסי
            </span>
          </div>
          <div className="space-y-3">
            <ToggleItem
              title="תשלומים נכנסים"
              description="קבל התראה מיידית על כל העברה שנכנסת לחשבון"
              enabled={incomingPayments}
              onToggle={() => setIncomingPayments(!incomingPayments)}
            />
            <ToggleItem
              title="מענקי UBI"
              description="עדכונים על חלוקת המענקים הקהילתיים התקופתיים"
              enabled={ubiGrants}
              onToggle={() => setUbiGrants(!ubiGrants)}
            />
          </div>
        </section>

        {/* Community Notifications */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <span 
              className="text-[10px] uppercase tracking-[0.2em] font-bold"
              style={{ color: colors.primary }}
            >
              קהילה
            </span>
          </div>
          <div className="space-y-3">
            <ToggleItem
              title="עדכוני קהילה"
              description="חדשות, אירועים והצבעות חשובות בקהילה שלך"
              enabled={communityUpdates}
              onToggle={() => setCommunityUpdates(!communityUpdates)}
            />
          </div>
        </section>

        {/* Info Card */}
        <div 
          className="relative overflow-hidden rounded-2xl p-8 flex flex-col items-center text-center gap-4 border shadow-2xl"
          style={{ 
            backgroundColor: colors.surfaceContainerHighest,
            borderColor: `${colors.outlineVariant}1A`,
          }}
        >
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
            style={{ backgroundColor: colors.primaryContainer }}
          >
            <svg className="w-8 h-8" fill={colors.primary} viewBox="0 0 24 24">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
            </svg>
          </div>
          <h3 
            className="text-lg font-bold"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            שקט נפשי מובנה
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: colors.onSurfaceVariant }}>
            מערכת ההתראות שלנו מוצפנת מקצה לקצה. רק אתה יכול לראות את פרטי הפעילות הפיננסית שלך.
          </p>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav 
        className="fixed bottom-0 left-0 right-0 mx-auto max-w-[430px] rounded-t-[2.5rem] z-50"
        style={{ 
          backgroundColor: 'rgba(30, 30, 47, 0.8)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 -10px 40px rgba(123, 47, 190, 0.12)',
        }}
      >
        <div className="flex flex-row-reverse justify-around items-center px-4 pb-8 pt-4">
          <Link href="/" className="flex flex-col items-center justify-center opacity-60 transition-colors" style={{ color: colors.onSurfaceVariant }}>
            <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-[10px] font-medium">בית</span>
          </Link>
          <Link href="/activity" className="flex flex-col items-center justify-center opacity-60 transition-colors" style={{ color: colors.onSurfaceVariant }}>
            <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-[10px] font-medium">פעילות</span>
          </Link>
          <Link href="/directory" className="flex flex-col items-center justify-center opacity-60 transition-colors" style={{ color: colors.onSurfaceVariant }}>
            <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-[10px] font-medium">עסקים</span>
          </Link>
          <div 
            className="flex flex-col items-center justify-center px-5 py-2 rounded-full"
            style={{ backgroundColor: `${colors.primaryContainer}33`, color: colors.primary }}
          >
            <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <span className="text-[10px] font-medium">פרופיל</span>
          </div>
        </div>
      </nav>
    </div>
  );
}
