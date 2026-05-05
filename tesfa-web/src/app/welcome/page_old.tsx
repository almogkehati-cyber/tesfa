'use client';

import Link from 'next/link';

// Design system colors
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
  return (
    <div 
      className="flex flex-col min-h-screen items-center justify-between p-[32px] text-right overflow-hidden relative"
      style={{ backgroundColor: colors.background, color: colors.onSurface }}
    >
      {/* Celestial Glow Background */}
      <div 
        className="absolute w-screen h-screen z-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% -20%, rgba(123, 47, 190, 0.15) 0%, rgba(10, 10, 26, 0) 60%)`,
        }}
      />

      {/* Background Glow Orbs */}
      <div 
        className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full pointer-events-none"
        style={{ 
          backgroundColor: `${colors.secondaryContainer}1A`,
          filter: 'blur(120px)',
        }}
      />
      <div 
        className="fixed top-[20%] right-[-5%] w-[30%] h-[30%] rounded-full pointer-events-none"
        style={{ 
          backgroundColor: `${colors.primaryContainer}0D`,
          filter: 'blur(100px)',
        }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 mx-auto max-w-[430px] z-50 flex items-center justify-between px-[24px] py-[16px] flex-row-reverse bg-transparent">
        <div 
          className="font-bold text-[24px] tracking-[-0.5px]"
          style={{ color: colors.primary, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        >
          TESFA
        </div>
        <button 
          className="hover:opacity-80 transition-opacity active:scale-90 duration-200"
          style={{ color: colors.primary }}
        >
          <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </header>

      {/* Hero Content */}
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-md z-10 text-center mt-[80px]">
        {/* Visual Anchor: Floating Card */}
        <div className="relative w-[256px] h-[256px] mb-[48px] flex items-center justify-center">
          {/* Blur Glow */}
          <div 
            className="absolute inset-0 opacity-20 rounded-full"
            style={{ 
              backgroundColor: colors.primaryContainer,
              filter: 'blur(80px)',
            }}
          />
          
          {/* Glass Card */}
          <div 
            className="relative w-[192px] h-[192px] rounded-[16px] flex items-center justify-center shadow-2xl"
            style={{ 
              backgroundColor: `${colors.surfaceContainerHigh}99`,
              backdropFilter: 'blur(24px)',
              border: `1px solid ${colors.outlineVariant}1A`,
            }}
          >
            {/* Gradient Circle with Icon */}
            <div 
              className="w-[96px] h-[96px] rounded-full flex items-center justify-center"
              style={{ 
                background: `linear-gradient(135deg, ${colors.primaryContainer}, ${colors.secondaryContainer})`,
                boxShadow: '0 0 40px rgba(123,47,190,0.4)',
              }}
            >
              <svg className="w-[48px] h-[48px] text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
              </svg>
            </div>
          </div>

          {/* Floating Accessory Element */}
          <div 
            className="absolute -bottom-[16px] -right-[16px] w-[64px] h-[64px] rounded-[12px] flex items-center justify-center shadow-lg"
            style={{ 
              backgroundColor: `${colors.surfaceContainerHighest}CC`,
              backdropFilter: 'blur(24px)',
              border: `1px solid ${colors.outlineVariant}33`,
            }}
          >
            <span style={{ color: colors.primary }} className="text-[24px]">⭐</span>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-[16px]">
          <h1 
            className="text-[40px] font-extrabold tracking-tight"
            style={{ color: colors.onSurface, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            TESFA
          </h1>
          <p 
            className="text-[20px] font-medium"
            style={{ color: colors.onSurfaceVariant }}
          >
            המטבע של הקהילה
          </p>
        </div>
      </main>

      {/* Action Section */}
      <footer className="w-full max-w-md space-y-[24px] z-10 mb-[32px]">
        <div className="flex flex-col gap-[16px]">
          {/* Primary Button: Register */}
          <Link href="/register">
            <button 
              className="w-full py-[20px] rounded-full text-white font-bold text-[18px] transition-all active:scale-[0.98] active:brightness-110"
              style={{ 
                background: 'linear-gradient(to left, #7B2FBE, #9B59F5)',
                boxShadow: '0 8px 30px rgba(123,47,190,0.3)',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}
            >
              הרשמה
            </button>
          </Link>

          {/* Secondary Button: Login */}
          <Link href="/login">
            <button 
              className="w-full py-[20px] rounded-full bg-transparent font-bold text-[18px] transition-all active:scale-[0.98] hover:bg-[#deb7ff0D]"
              style={{ 
                border: `1px solid ${colors.primary}66`,
                color: colors.primary,
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}
            >
              התחברות
            </button>
          </Link>
        </div>

        {/* Language Selector */}
        <div className="flex items-center justify-center gap-[8px] pt-[16px]">
          <button 
            className="flex items-center gap-[8px] py-[8px] px-[16px] rounded-full transition-colors hover:text-[#deb7ff]"
            style={{ 
              backgroundColor: `${colors.surfaceContainerLow}80`,
              backdropFilter: 'blur(24px)',
              color: colors.onSurfaceVariant,
            }}
          >
            <span className="text-[20px]">🌐</span>
            <span className="text-[14px] font-semibold">עברית</span>
            <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
}
