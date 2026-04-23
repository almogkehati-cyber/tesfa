'use client';

import Link from 'next/link';
import { useState } from 'react';

const colors = {
  primary: '#deb7ff',
  primaryContainer: '#7b2fbe',
  surface: '#121222',
  surfaceContainerLow: '#1a1a2b',
  surfaceContainerHigh: '#29283a',
  surfaceContainerHighest: '#333345',
  onSurface: '#e3e0f8',
  onSurfaceVariant: '#cfc2d5',
  outlineVariant: '#4c4353',
  error: '#ffb4ab',
  errorContainer: '#93000a',
};

const warningCards = [
  {
    icon: 'security',
    title: 'פרטיות ונתוני GDPR',
    description: 'בהתאם לתקנות הגנת הפרטיות (GDPR), כל המידע האישי והעסקי שלך יוסר מבסיסי הנתונים הפעילים שלנו תוך 30 יום. חלק מהנתונים עשויים להישמר בארכיון מוצפן למטרות רגולטוריות בלבד.',
  },
  {
    icon: 'bank',
    title: 'יתרה פיננסית',
    description: 'לא ניתן למחוק חשבון עם יתרה חיובית. וודאו שכל הכספים הועברו לחשבון הבנק המקושר לפני אישור המחיקה.',
  },
  {
    icon: 'token',
    title: 'נכסים דיגיטליים',
    description: 'גישה לכל נכסי הקהילה, המדריכים והכלים העסקיים הבלעדיים תיחסם באופן מיידי ולא תתאפשר שחזור של היסטוריית הפעילות.',
  },
];

export default function DeleteAccountPage() {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: colors.surface, color: colors.onSurface }}
    >
      {/* Header */}
      <header 
        className="fixed top-0 left-0 right-0 mx-auto max-w-[430px] z-50 flex flex-row-reverse justify-between items-center px-6 py-4"
        style={{ backgroundColor: `${colors.surface}CC`, backdropFilter: 'blur(24px)' }}
      >
        <div className="flex items-center gap-4">
          <Link 
            href="/profile"
            className="transition-opacity hover:opacity-80"
            style={{ color: colors.primary }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          <h1 
            className="font-bold text-xl"
            style={{ color: colors.primary, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            מחיקת חשבון
          </h1>
        </div>
        <button className="transition-opacity hover:opacity-80" style={{ color: colors.primary }}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </button>
      </header>

      <main className="pt-24 pb-32 px-6 max-w-2xl mx-auto min-h-screen">
        {/* Warning Icon */}
        <div className="mb-10 text-center">
          <div 
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
            style={{ 
              backgroundColor: colors.errorContainer,
              boxShadow: '0 0 40px rgba(147, 0, 10, 0.3)',
            }}
          >
            <svg className="w-10 h-10" fill={colors.error} viewBox="0 0 24 24">
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
            </svg>
          </div>
          <h2 
            className="text-2xl font-bold mb-4 tracking-tight"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            האם אתם בטוחים?
          </h2>
          <p className="leading-relaxed" style={{ color: colors.onSurfaceVariant }}>
            מחיקת חשבון העסק היא פעולה בלתי הפיכה. כל המידע הפיננסי, היסטוריית העסקאות והגדרות הארנק יימחקו לצמיתות מהשרתים שלנו.
          </p>
        </div>

        {/* Warning Cards */}
        <div className="grid grid-cols-1 gap-4 mb-10">
          {warningCards.map((card, i) => (
            <div 
              key={i}
              className="p-6 rounded-2xl relative overflow-hidden"
              style={{ backgroundColor: colors.surfaceContainerLow }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="p-3 rounded-2xl"
                  style={{ backgroundColor: colors.surfaceContainerHighest }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                    {card.icon === 'security' && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    )}
                    {card.icon === 'bank' && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                    )}
                    {card.icon === 'token' && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    )}
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold mb-1">{card.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: colors.onSurfaceVariant }}>
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Confirmation Checkbox */}
        <label 
          className="flex items-center gap-4 p-4 mb-12 cursor-pointer rounded-2xl border transition-colors hover:bg-[#333345]/50"
          style={{ 
            backgroundColor: `${colors.surfaceContainerHighest}4D`,
            borderColor: `${colors.outlineVariant}1A`,
          }}
        >
          <input 
            type="checkbox" 
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="w-6 h-6 rounded border-[#4c4353] bg-[#121222] text-[#deb7ff] focus:ring-[#deb7ff] focus:ring-offset-[#121222]"
          />
          <span className="text-sm font-medium">
            אני מאשר/ת שהבנתי את ההשלכות וברצוני למחוק את החשבון.
          </span>
        </label>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          <Link
            href={confirmed ? '/settings/delete-account/success' : '#'}
            className={`w-full py-4 rounded-full font-bold text-lg shadow-lg text-center transition-all ${
              confirmed ? 'active:scale-95' : 'opacity-50 cursor-not-allowed'
            }`}
            style={{ 
              background: `linear-gradient(to left, ${colors.errorContainer}, #93000a)`,
              color: colors.onSurface,
              boxShadow: `0 10px 30px ${colors.error}1A`,
            }}
            onClick={(e) => !confirmed && e.preventDefault()}
          >
            מחק חשבון לצמיתות
          </Link>
          <Link
            href="/profile"
            className="w-full py-4 rounded-full font-medium border text-center transition-all hover:bg-[#333345]/30"
            style={{ borderColor: `${colors.outlineVariant}33` }}
          >
            ביטול וחזרה להגדרות
          </Link>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav 
        className="fixed bottom-0 left-0 right-0 mx-auto max-w-[430px] z-50 rounded-t-[24px] flex flex-row-reverse justify-around items-center h-20 px-4"
        style={{ 
          backgroundColor: 'rgba(30, 30, 47, 0.8)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 -8px 40px rgba(123, 47, 190, 0.12)',
        }}
      >
        <Link href="/" className="flex flex-col items-center justify-center transition-colors" style={{ color: colors.onSurfaceVariant }}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-[10px] font-medium mt-1">בית</span>
        </Link>
        <Link href="/activity" className="flex flex-col items-center justify-center transition-colors" style={{ color: colors.onSurfaceVariant }}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span className="text-[10px] font-medium mt-1">עסקאות</span>
        </Link>
        <Link href="/stats" className="flex flex-col items-center justify-center transition-colors" style={{ color: colors.onSurfaceVariant }}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span className="text-[10px] font-medium mt-1">סטטיסטיקה</span>
        </Link>
        <div className="flex flex-col items-center justify-center" style={{ color: colors.primary, filter: 'drop-shadow(0 0 8px rgba(222,183,255,0.5))' }}>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          <span className="text-[10px] font-medium mt-1">פרופיל</span>
        </div>
      </nav>
    </div>
  );
}
