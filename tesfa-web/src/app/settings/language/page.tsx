'use client';

import Link from 'next/link';
import { useState } from 'react';

const colors = {
  primary: '#deb7ff',
  primaryContainer: '#7b2fbe',
  secondaryContainer: '#6107ba',
  surface: '#121222',
  surfaceContainerLow: '#1a1a2b',
  surfaceContainerHigh: '#29283a',
  surfaceContainerHighest: '#333345',
  onSurface: '#e3e0f8',
  onSurfaceVariant: '#cfc2d5',
  outlineVariant: '#4c4353',
};

const languages = [
  { code: 'he', name: 'עברית', nativeName: 'Hebrew', abbr: 'עב' },
  { code: 'en', name: 'English', nativeName: 'אנגלית', abbr: 'EN' },
  { code: 'am', name: 'Amharic (አማርኛ)', nativeName: 'אמהרית', abbr: 'አማ' },
];

export default function LanguageSettingsPage() {
  const [selectedLang, setSelectedLang] = useState('he');

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: '#0A0A1A', color: colors.onSurface }}
    >
      {/* Header */}
      <header 
        className="w-full sticky top-0 z-50"
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
            className="text-lg font-bold"
            style={{ color: colors.primary, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            שפת ממשק
          </h1>
          <Link 
            href="/profile"
            className="p-2 rounded-full transition-all hover:bg-[#333345]/50"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </header>

      <main className="flex-grow px-6 pt-8 pb-24 max-w-md mx-auto w-full">
        {/* Instruction */}
        <div className="mb-10 text-right">
          <p className="font-medium text-lg leading-relaxed" style={{ color: colors.onSurfaceVariant }}>
            בחר את השפה המועדפת עליך לשימוש באפליקציה. תוכל לשנות זאת בכל עת.
          </p>
        </div>

        {/* Language Options */}
        <div className="space-y-4">
          {languages.map((lang) => (
            <label 
              key={lang.code}
              className={`group relative flex items-center justify-between p-5 rounded-2xl transition-all duration-300 cursor-pointer ${
                selectedLang === lang.code 
                  ? 'ring-1 ring-[#deb7ff]/30' 
                  : 'ring-1 ring-transparent hover:ring-[#4c4353]/30'
              }`}
              style={{ backgroundColor: colors.surfaceContainerLow }}
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center relative overflow-hidden border"
                  style={{ 
                    backgroundColor: selectedLang === lang.code 
                      ? `${colors.primaryContainer}33` 
                      : colors.surfaceContainerHighest,
                    borderColor: selectedLang === lang.code 
                      ? `${colors.primary}33` 
                      : 'transparent',
                  }}
                >
                  <span 
                    className="text-xs font-bold"
                    style={{ color: selectedLang === lang.code ? colors.primary : colors.onSurfaceVariant }}
                  >
                    {lang.abbr}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span 
                    className="text-lg font-bold"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    {lang.name}
                  </span>
                  <span className="text-xs opacity-70" style={{ color: colors.onSurfaceVariant }}>
                    {lang.nativeName}
                  </span>
                </div>
              </div>
              
              <div 
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedLang === lang.code 
                    ? 'border-[#deb7ff] bg-[#7b2fbe]/40' 
                    : 'border-[#4c4353] group-hover:border-[#deb7ff]/50'
                }`}
              >
                {selectedLang === lang.code && (
                  <div 
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ 
                      backgroundColor: colors.primary,
                      boxShadow: '0 0 8px rgba(222, 183, 255, 0.8)',
                    }}
                  />
                )}
              </div>
              
              <input
                type="radio"
                name="language"
                value={lang.code}
                checked={selectedLang === lang.code}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="hidden"
              />
            </label>
          ))}
        </div>

        {/* Info Card */}
        <div 
          className="mt-12 p-6 rounded-2xl border relative overflow-hidden"
          style={{ 
            background: `linear-gradient(to bottom right, ${colors.primaryContainer}1A, transparent)`,
            borderColor: `${colors.outlineVariant}1A`,
          }}
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span 
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: colors.primary, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                טיפ
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: colors.onSurfaceVariant }}>
              שינוי השפה ישפיע על התפריטים, הכפתורים וההתראות במערכת. חלק מהתכנים המיוצרים על ידי משתמשים עשויים להישאר בשפת המקור שלהם.
            </p>
          </div>
          {/* Decorative glow */}
          <div 
            className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full blur-3xl"
            style={{ backgroundColor: `${colors.primary}1A` }}
          />
        </div>
      </main>

      {/* Save Button */}
      <div className="fixed bottom-24 left-6 right-6 z-40">
        <button 
          className="w-full py-4 rounded-full font-bold shadow-lg transition-all hover:scale-[1.02] active:scale-95"
          style={{ 
            background: `linear-gradient(to right, ${colors.primaryContainer}, ${colors.secondaryContainer})`,
            color: colors.onSurface,
            boxShadow: '0 10px 30px rgba(123, 47, 190, 0.2)',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
          }}
        >
          שמור שינויים
        </button>
      </div>

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
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-[10px] font-medium">בית</span>
          </Link>
          <Link href="/activity" className="flex flex-col items-center justify-center opacity-60 transition-colors" style={{ color: colors.onSurfaceVariant }}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-[10px] font-medium">פעילות</span>
          </Link>
          <Link href="/directory" className="flex flex-col items-center justify-center opacity-60 transition-colors" style={{ color: colors.onSurfaceVariant }}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-[10px] font-medium">עסקים</span>
          </Link>
          <div 
            className="flex flex-col items-center justify-center px-5 py-2 rounded-full"
            style={{ backgroundColor: `${colors.primaryContainer}33`, color: colors.primary }}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <span className="text-[10px] font-medium">פרופיל</span>
          </div>
        </div>
      </nav>
    </div>
  );
}
