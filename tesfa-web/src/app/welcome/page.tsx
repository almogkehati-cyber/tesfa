'use client';

export const dynamic = 'force-dynamic';

import { useEffect } from 'react';
import Link from 'next/link';

const colors = {
  primary: '#deb7ff',
  primaryContainer: '#7b2fbe',
  secondaryContainer: '#6107ba',
  surfaceContainerHigh: '#29283a',
  surfaceContainerHighest: '#333345',
  surfaceContainerLow: '#1a1a2b',
  onSurface: '#e3e0f8',
  onSurfaceVariant: '#cfc2d5',
  outlineVariant: '#4c4353',
  background: '#0A0A1A',
};

export default function WelcomePage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('hasSeenWelcome', 'true');
    }
  }, []);

  return (
    <div 
      className="flex flex-col min-h-screen items-center justify-between p-8 text-right overflow-hidden relative"
      style={{ backgroundColor: colors.background, color: colors.onSurface }}
    >
      {/* Celestial Glow Background */}
      <div 
        className="absolute w-screen h-screen z-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% -20%, rgba(123, 47, 190, 0.15) 0%, rgba(10, 10, 26, 0) 60%)`,
        }}
      />

      {/* Background Orbs */}
      <div 
        className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full pointer-events-none"
        style={{ 
          background: `${colors.secondaryContainer}1A`,
          filter: 'blur(120px)',
        }}
      />
      <div 
        className="fixed top-[20%] right-[-5%] w-[30%] h-[30%] rounded-full pointer-events-none"
        style={{ 
          background: `${colors.primaryContainer}0D`,
          filter: 'blur(100px)',
        }}
      />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-4 flex-row-reverse bg-transparent max-w-[430px]">
        <div 
          className="text-2xl font-bold tracking-tighter"
          style={{ color: colors.primary, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        >
          TESFA
        </div>
        <button className="hover:opacity-80 transition-opacity scale-95 duration-200 active:scale-90" style={{ color: colors.primary }}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </header>

      {/* Hero Content */}
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-md z-10 text-center mt-20">
        {/* Visual Anchor: Floating Card */}
        <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
          <div 
            className="absolute inset-0 rounded-full"
            style={{ 
              backgroundColor: `${colors.primaryContainer}33`,
              filter: 'blur(80px)',
            }}
          />
          <div 
            className="relative w-48 h-48 rounded-xl flex items-center justify-center shadow-2xl border backdrop-blur-2xl"
            style={{ 
              backgroundColor: `${colors.surfaceContainerHigh}99`,
              borderColor: `${colors.outlineVariant}1A`,
            }}
          >
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ 
                background: `linear-gradient(135deg, ${colors.primaryContainer} 0%, ${colors.secondaryContainer} 100%)`,
                boxShadow: `0 0 40px ${colors.primaryContainer}66`,
              }}
            >
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
              </svg>
            </div>
          </div>
          {/* Floating Accessory Element */}
          <div 
            className="absolute -bottom-4 -right-4 w-16 h-16 rounded-lg flex items-center justify-center border shadow-lg backdrop-blur-2xl"
            style={{ 
              backgroundColor: `${colors.surfaceContainerHighest}CC`,
              borderColor: `${colors.outlineVariant}33`,
            }}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" style={{ color: colors.primary }}>
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </div>
        </div>

        <div className="space-y-4">
          <h1 
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
            style={{ color: colors.onSurface, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            TESFA
          </h1>
          <p 
            className="text-lg md:text-xl font-medium"
            style={{ color: colors.onSurfaceVariant }}
          >
            המטבע של הקהילה
          </p>
        </div>
      </main>

      {/* Action Section */}
      <footer className="w-full max-w-md space-y-6 z-10 mb-8">
        <div className="flex flex-col gap-4">
          {/* Primary Button: Register */}
          <Link href="/register">
            <button 
              className="w-full py-5 rounded-full font-bold text-lg transition-all active:scale-[0.98] active:brightness-110"
              style={{
                background: `linear-gradient(to left, #7B2FBE 0%, #9B59F5 100%)`,
                color: '#FFFFFF',
                boxShadow: '0 8px 30px rgba(123, 47, 190, 0.3)',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}
            >
              הרשמה
            </button>
          </Link>

          {/* Secondary Button: Login */}
          <Link href="/login">
            <button 
              className="w-full py-5 rounded-full border font-bold text-lg hover:bg-opacity-5 transition-all active:scale-[0.98]"
              style={{
                backgroundColor: 'transparent',
                borderColor: `${colors.primary}66`,
                color: colors.primary,
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}
            >
              התחברות
            </button>
          </Link>
        </div>

        {/* Language Selector */}
        <div className="flex items-center justify-center gap-2 pt-4">
          <button 
            className="flex items-center gap-2 transition-colors py-2 px-4 rounded-full backdrop-blur-2xl"
            style={{ 
              color: colors.onSurfaceVariant,
              backgroundColor: `${colors.surfaceContainerLow}80`,
            }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-semibold">עברית</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
}
