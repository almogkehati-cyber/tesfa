'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
  success: '#4ade80',
};

export default function PinSetupPage() {
  const router = useRouter();
  const [step, setStep] = useState<'set' | 'confirm'>('set');
  const [pin, setPin] = useState('');
  const [firstPin, setFirstPin] = useState('');
  const [error, setError] = useState('');

  const handleNumberPress = (num: string) => {
    if (pin.length < 6) {
      const newPin = pin + num;
      setPin(newPin);
      
      if (newPin.length === 6) {
        setTimeout(() => {
          if (step === 'set') {
            // Mock mode - skip to home
            if (typeof window !== 'undefined') {
              localStorage.setItem('userPin', newPin);
              localStorage.setItem('isLoggedIn', 'true');
            }
            router.push('/');
          } else {
            if (newPin === firstPin) {
              if (typeof window !== 'undefined') {
                localStorage.setItem('userPin', newPin);
                localStorage.setItem('isLoggedIn', 'true');
              }
              router.push('/');
            } else {
              setError('הקודים אינם תואמים');
              setPin('');
            }
          }
        }, 100);
      }
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
    setError('');
  };

  return (
    <div 
      className="flex flex-col min-h-screen overflow-hidden relative"
      style={{ backgroundColor: colors.background, color: colors.onSurface }}
    >
      {/* Background Glow */}
      <div 
        className="absolute top-0 right-0 w-[256px] h-[256px] rounded-full pointer-events-none"
        style={{ 
          backgroundColor: `${colors.primary}1A`,
          filter: 'blur(100px)',
        }}
      />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 h-16 mt-4">
        <Link href="/otp">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: colors.onSurface }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-lg font-bold" style={{ color: colors.onSurface }}>הגדרת PIN</h1>
        <div className="w-6" />
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-6">
        {/* Icon */}
        <div 
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: `${colors.primaryContainer}33` }}
        >
          <span className="text-4xl">🔐</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-2" style={{ color: colors.onSurface }}>
          {step === 'set' ? 'צור קוד PIN' : 'אמת את הקוד'}
        </h2>
        <p className="text-sm text-center mb-8" style={{ color: colors.onSurfaceVariant }}>
          {step === 'set' 
            ? 'הזן 6 ספרות לקוד PIN שלך' 
            : 'הזן שוב את הקוד לאימות'}
        </p>

        {/* Mock Mode Notice */}
        <div 
          className="w-full max-w-[400px] text-center py-3 px-4 rounded-xl mb-6"
          style={{ 
            backgroundColor: `${colors.success}1A`,
            color: colors.success,
          }}
        >
          🎭 מצב דמה - כל קוד יתקבל
        </div>

        {/* PIN Display */}
        <div className="flex justify-center gap-3 mb-8">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <div
              key={index}
              className="w-4 h-4 rounded-full transition-all"
              style={{
                backgroundColor: index < pin.length ? colors.primary : colors.surfaceContainerHigh,
                boxShadow: index < pin.length ? `0 0 12px ${colors.primary}80` : 'none',
              }}
            />
          ))}
        </div>

        {/* Error */}
        {error && (
          <div 
            className="text-sm text-center py-3 px-4 rounded-lg mb-4"
            style={{ 
              backgroundColor: `${colors.error}1A`,
              color: colors.error,
            }}
          >
            {error}
          </div>
        )}

        {/* Numeric Keypad */}
        <div className="w-full max-w-[320px] grid grid-cols-3 gap-4 mb-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberPress(num.toString())}
              className="aspect-square rounded-full text-2xl font-bold transition-all active:scale-95"
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
            className="aspect-square rounded-full text-2xl font-bold transition-all active:scale-95"
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
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
}
