'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Design system colors
const colors = {
  primary: '#deb7ff',
  primaryContainer: '#7b2fbe',
  secondaryContainer: '#6107ba',
  surfaceContainerHigh: '#1C1C2E',
  surfaceContainerLow: '#0F0F1F',
  onSurface: '#e3e0f8',
  onSurfaceVariant: '#cfc2d5',
  outlineVariant: '#4c4353',
  background: '#0A0A1A',
};

export default function LoginPage() {
  const router = useRouter();
  const [pin, setPin] = useState<string>('');
  const maxPinLength = 4;

  const handleNumberPress = (num: string) => {
    if (pin.length < maxPinLength) {
      const newPin = pin + num;
      setPin(newPin);
      
      // Auto-submit when PIN is complete
      if (newPin.length === maxPinLength) {
        setTimeout(() => {
          router.push('/');
        }, 300);
      }
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  const handleBiometric = () => {
    // Simulate biometric auth
    router.push('/');
  };

  return (
    <div 
      className="flex flex-col min-h-screen overflow-hidden relative"
      style={{ backgroundColor: colors.background, color: colors.onSurface }}
    >
      {/* Background Glow Orbs */}
      <div 
        className="absolute top-0 right-0 w-[256px] h-[256px] rounded-full pointer-events-none"
        style={{ 
          backgroundColor: `${colors.primary}1A`,
          filter: 'blur(100px)',
        }}
      />
      <div 
        className="absolute bottom-0 left-0 w-[320px] h-[320px] rounded-full pointer-events-none"
        style={{ 
          backgroundColor: `${colors.secondaryContainer}0D`,
          filter: 'blur(100px)',
        }}
      />

      {/* Header / Logo */}
      <header className="relative z-10 flex flex-col items-center pt-[48px] pb-[32px]">
        <div 
          className="w-[64px] h-[64px] rounded-full flex items-center justify-center mb-[12px]"
          style={{ backgroundColor: `${colors.primaryContainer}33` }}
        >
          <span style={{ color: colors.primary }} className="text-[32px]">🌿</span>
        </div>
        <h1 
          className="font-bold text-[30px] tracking-[-0.5px]"
          style={{ color: colors.primary, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        >
          TESFA
        </h1>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex flex-col items-center px-[24px]">
        {/* Title */}
        <div className="text-center mb-[40px]">
          <h2 
            className="text-[24px] font-bold mb-[8px]"
            style={{ color: colors.onSurface, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            הזן קוד PIN
          </h2>
          <p 
            className="text-[14px]"
            style={{ color: colors.onSurfaceVariant }}
          >
            השתמש בקוד האישי שלך לגישה מהירה
          </p>
        </div>

        {/* PIN Dots Display */}
        <div className="flex gap-[24px] mb-[32px] items-center justify-center">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className="w-[16px] h-[16px] rounded-full transition-all duration-200"
              style={{
                backgroundColor: index < pin.length ? colors.primary : colors.outlineVariant,
                boxShadow: index < pin.length ? `0 0 12px ${colors.primary}` : 'none',
              }}
            />
          ))}
        </div>

        {/* Biometric Button */}
        <button
          onClick={handleBiometric}
          className="mb-[32px] flex items-center gap-[12px] px-[24px] py-[12px] rounded-full transition-all active:scale-95"
          style={{
            backgroundColor: colors.surfaceContainerHigh,
            border: `1px solid ${colors.outlineVariant}4D`,
            color: colors.primary,
          }}
        >
          <svg className="w-[24px] h-[24px]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39-2.57 0-4.66 1.97-4.66 4.39 0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1-1.4-1.39-2.17-3.24-2.17-5.22 0-1.62 1.38-2.94 3.08-2.94 1.7 0 3.08 1.32 3.08 2.94 0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29-.49-1.31-.73-2.61-.73-3.96 0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.47.38z"/>
          </svg>
          <span className="font-medium">התחברות ביומטרית</span>
        </button>

        {/* Forgot PIN Link */}
        <div className="mb-[48px]">
          <Link 
            href="#"
            className="text-[14px] font-medium hover:underline decoration-1 underline-offset-4"
            style={{ color: colors.primary }}
          >
            שכחת את קוד ה-PIN?
          </Link>
        </div>

        {/* Numeric Keypad */}
        <div className="w-full max-w-[280px] grid grid-cols-3 gap-y-[16px] gap-x-[24px] pb-[48px]">
          {/* Row 1-3 */}
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberPress(num)}
              className="w-[64px] h-[64px] mx-auto rounded-full flex items-center justify-center text-[24px] font-semibold transition-all active:scale-90"
              style={{
                backgroundColor: colors.surfaceContainerLow,
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}
            >
              {num}
            </button>
          ))}

          {/* Bottom Row */}
          <button
            onClick={handleBiometric}
            className="w-[64px] h-[64px] flex items-center justify-center transition-all active:scale-90"
            style={{ color: colors.onSurfaceVariant }}
          >
            <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          <button
            onClick={() => handleNumberPress('0')}
            className="w-[64px] h-[64px] mx-auto rounded-full flex items-center justify-center text-[24px] font-semibold transition-all active:scale-90"
            style={{
              backgroundColor: colors.surfaceContainerLow,
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}
          >
            0
          </button>

          <button
            onClick={handleBackspace}
            className="w-[64px] h-[64px] flex items-center justify-center transition-all active:scale-90"
            style={{ color: colors.onSurfaceVariant }}
          >
            <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
            </svg>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-[32px] text-center mt-auto">
        <p 
          className="text-[14px]"
          style={{ color: colors.onSurfaceVariant }}
        >
          לא המשתמש שלך?{' '}
          <Link 
            href="/welcome"
            className="font-bold mr-[4px] hover:underline decoration-2 underline-offset-4"
            style={{ color: colors.primary }}
          >
            החלף חשבון
          </Link>
        </p>
      </footer>
    </div>
  );
}
