'use client';

import Link from 'next/link';
import { useState } from 'react';

const colors = {
  primary: '#deb7ff',
  primaryContainer: '#7b2fbe',
  secondaryContainer: '#6107ba',
  surface: '#121222',
  surfaceContainerLow: '#1a1a2b',
  surfaceContainerHighest: '#333345',
  onSurface: '#e3e0f8',
  onSurfaceVariant: '#cfc2d5',
};

export default function UBIPage() {
  const [claimed, setClaimed] = useState(false);

  const handleClaim = () => {
    setClaimed(true);
  };

  return (
    <div 
      className="min-h-screen pb-32"
      style={{ backgroundColor: colors.surface, color: colors.onSurface }}
    >
      {/* Header */}
      <header 
        className="fixed top-0 left-0 right-0 mx-auto max-w-[430px] z-50 flex flex-row-reverse justify-between items-center px-6 h-16"
        style={{ backgroundColor: colors.surface }}
      >
        <div className="flex items-center gap-4">
          <span 
            className="text-2xl font-black tracking-tight"
            style={{ color: colors.primary, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            TESFA
          </span>
        </div>
        <Link 
          href="/"
          className="p-2 rounded-full transition-colors hover:bg-[#333345]"
          style={{ color: colors.onSurfaceVariant }}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
        <div 
          className="flex items-center font-bold text-lg"
          style={{ color: colors.primary, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        >
          הכנסה בסיסית
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 px-6 max-w-2xl mx-auto">
        {/* Hero Section */}
        <div 
          className="rounded-2xl p-8 mb-8 relative overflow-hidden text-center"
          style={{ backgroundColor: colors.surfaceContainerLow }}
        >
          {/* Glow Effects */}
          <div 
            className="absolute -top-24 -right-24 w-64 h-64 rounded-full"
            style={{ backgroundColor: `${colors.primaryContainer}33`, filter: 'blur(80px)' }}
          />
          <div 
            className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full"
            style={{ backgroundColor: `${colors.secondaryContainer}33`, filter: 'blur(80px)' }}
          />
          
          <div className="relative z-10">
            {/* UBI Icon */}
            <div 
              className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ 
                background: `linear-gradient(135deg, ${colors.primaryContainer}, ${colors.secondaryContainer})`,
                boxShadow: '0 20px 50px -12px rgba(123, 47, 190, 0.4)',
              }}
            >
              <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <h1 
              className="text-3xl font-extrabold mb-4"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              הכנסה בסיסית אוניברסלית
            </h1>
            <p className="text-lg mb-2" style={{ color: colors.onSurfaceVariant }}>
              קבל TSF יומי כחלק מקהילת TESFA
            </p>

            {/* Daily Amount */}
            <div className="mt-8 mb-6">
              <span className="text-sm uppercase tracking-widest opacity-70" style={{ color: colors.onSurfaceVariant }}>
                סכום יומי
              </span>
              <div className="flex items-baseline justify-center gap-2 mt-2">
                <span 
                  className="text-5xl font-extrabold"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  12
                </span>
                <span className="text-2xl font-bold" style={{ color: colors.primary }}>TSF</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Card */}
        <div 
          className="rounded-2xl p-6 mb-6"
          style={{ backgroundColor: colors.surfaceContainerLow }}
        >
          <div className="flex items-center justify-between mb-4">
            <span 
              className={`px-3 py-1 rounded-full text-sm font-bold ${claimed ? 'bg-[#4CAF50]/20 text-[#4CAF50]' : 'bg-[#fbba68]/20 text-[#fbba68]'}`}
            >
              {claimed ? 'נאסף היום' : 'זמין לאיסוף'}
            </span>
            <h3 className="font-bold text-lg">סטטוס יומי</h3>
          </div>
          
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span style={{ color: colors.onSurfaceVariant }}>רצף ימים</span>
              <span className="font-bold">0 ימים</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: colors.surfaceContainerHighest }}>
              <div 
                className="h-full rounded-full"
                style={{ 
                  width: '0%',
                  background: `linear-gradient(90deg, ${colors.primaryContainer}, ${colors.primary})`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div 
            className="rounded-2xl p-4 text-center"
            style={{ backgroundColor: colors.surfaceContainerLow }}
          >
            <p className="text-sm mb-1" style={{ color: colors.onSurfaceVariant }}>נאסף השבוע</p>
            <p className="text-2xl font-bold" style={{ color: colors.primary }}>0 TSF</p>
          </div>
          <div 
            className="rounded-2xl p-4 text-center"
            style={{ backgroundColor: colors.surfaceContainerLow }}
          >
            <p className="text-sm mb-1" style={{ color: colors.onSurfaceVariant }}>סה״כ נאסף</p>
            <p className="text-2xl font-bold" style={{ color: colors.primary }}>0 TSF</p>
          </div>
        </div>

        {/* Claim Button */}
        {!claimed ? (
          <button 
            onClick={handleClaim}
            className="w-full h-16 rounded-full text-white font-bold text-lg shadow-lg active:scale-95 transition-transform"
            style={{ 
              background: `linear-gradient(135deg, ${colors.primaryContainer}, ${colors.secondaryContainer})`,
              boxShadow: '0 20px 50px -12px rgba(123, 47, 190, 0.25)',
            }}
          >
            אסוף 12 TSF
          </button>
        ) : (
          <div 
            className="w-full h-16 rounded-full flex items-center justify-center gap-3 font-bold text-lg"
            style={{ backgroundColor: '#4CAF50', color: 'white' }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            נאסף בהצלחה!
          </div>
        )}

        {/* Info */}
        <p className="text-center text-sm mt-6" style={{ color: colors.onSurfaceVariant }}>
          ה-UBI היומי מתאפס בכל יום בחצות
        </p>
      </main>

      {/* Bottom Navigation */}
      <nav 
        className="fixed bottom-0 left-0 right-0 mx-auto max-w-[430px] z-50 rounded-t-[2rem] flex flex-row-reverse justify-around items-center px-4 h-20"
        style={{ 
          backgroundColor: 'rgba(30, 30, 47, 0.8)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0px -10px 40px rgba(222,183,255,0.12)',
        }}
      >
        <Link href="/" className="flex flex-col items-center justify-center opacity-60 hover:opacity-100 scale-90 transition-all" style={{ color: colors.onSurfaceVariant }}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-[10px] font-bold mt-1">בית</span>
        </Link>
        <Link href="/activity" className="flex flex-col items-center justify-center opacity-60 hover:opacity-100 scale-90 transition-all" style={{ color: colors.onSurfaceVariant }}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span className="text-[10px] font-bold mt-1">פעילות</span>
        </Link>
        <Link href="/directory" className="flex flex-col items-center justify-center opacity-60 hover:opacity-100 scale-90 transition-all" style={{ color: colors.onSurfaceVariant }}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span className="text-[10px] font-bold mt-1">עסקים</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center justify-center opacity-60 hover:opacity-100 scale-90 transition-all" style={{ color: colors.onSurfaceVariant }}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-[10px] font-bold mt-1">פרופיל</span>
        </Link>
      </nav>
    </div>
  );
}
