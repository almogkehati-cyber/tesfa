'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
  error: '#f87171',
};

export default function LoginPage() {
  const router = useRouter();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleNumberPress = (num: string) => {
    if (pin.length < 6) {
      const newPin = pin + num;
      setPin(newPin);
      
      // Auto-submit when PIN is complete
      if (newPin.length === 6) {
        setTimeout(() => handlePinSubmit(newPin), 100);
      }
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
    setError('');
  };

  const handlePinSubmit = (pinToCheck: string) => {
    // Check against localStorage (client-side only)
    if (typeof window !== 'undefined') {
      const savedPin = localStorage.getItem('userPin');
      if (savedPin && savedPin === pinToCheck) {
        localStorage.setItem('isLoggedIn', 'true');
        router.push('/');
      } else {
        setError('קוד PIN שגוי');
        setPin('');
      }
    }
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
        <div className="text-center mb-[32px]">
          <h2 
            className="text-[24px] font-bold mb-[8px]"
            style={{ color: colors.onSurface, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            התחברות
          </h2>
          <p 
            className="text-[14px]"
            style={{ color: colors.onSurfaceVariant }}
          >
            הזן את קוד ה-PIN שלך
          </p>
        </div>

        {/* PIN Display */}
        <div className="w-full max-w-[400px] mb-[40px]">
          <div className="flex justify-center gap-[12px] mb-[24px]">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className="w-[14px] h-[14px] rounded-full transition-all"
                style={{
                  backgroundColor: index < pin.length ? colors.primary : colors.surfaceContainerHigh,
                  boxShadow: index < pin.length ? `0 0 12px ${colors.primary}80` : 'none',
                }}
              />
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div 
              className="text-[14px] text-center py-[12px] px-[16px] rounded-[12px] mb-[16px]"
              style={{ 
                backgroundColor: `${colors.error}1A`,
                color: colors.error,
              }}
            >
              {error}
            </div>
          )}
        </div>

        {/* Numeric Keypad */}
        <div className="w-full max-w-[320px] grid grid-cols-3 gap-[16px] mb-[24px]">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberPress(num.toString())}
              className="aspect-square rounded-full text-[24px] font-bold transition-all active:scale-95"
              style={{
                backgroundColor: colors.surfaceContainerHigh,
                color: colors.onSurface,
              }}
            >
              {num}
            </button>
          ))}
          <div />
          <button
            onClick={() => handleNumberPress('0')}
            className="aspect-square rounded-full text-[24px] font-bold transition-all active:scale-95"
            style={{
              backgroundColor: colors.surfaceContainerHigh,
              color: colors.onSurface,
            }}
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            className="aspect-square rounded-full flex items-center justify-center transition-all active:scale-95"
            style={{
              backgroundColor: colors.surfaceContainerHigh,
              color: colors.onSurfaceVariant,
            }}
          >
            <svg className="w-[28px] h-[28px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
            </svg>
          </button>
        </div>

        {/* Forgot PIN Link */}
        <div className="text-center mb-[16px]">
          <Link 
            href="/reset-password"
            className="text-[14px] hover:underline"
            style={{ color: colors.primary }}
          >
            שכחת את קוד ה-PIN?
          </Link>
        </div>

        {/* Register Link */}
        <div className="mt-[24px] text-center">
          <p className="text-[14px]" style={{ color: colors.onSurfaceVariant }}>
            עדיין אין לך חשבון?{' '}
            <Link 
              href="/register"
              className="font-bold hover:underline"
              style={{ color: colors.primary }}
            >
              הרשם עכשיו
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
