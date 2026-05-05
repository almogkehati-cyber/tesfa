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

export default function SecuritySetupPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<'pin' | 'biometric' | null>(null);

  const handleContinue = () => {
    if (selected === 'pin') {
      router.push('/pin-setup');
    } else if (selected === 'biometric') {
      // Mock - go to home
      router.push('/');
    }
  };

  const handleSkip = () => {
    router.push('/');
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
        <div className="w-6" />
        <h1 className="text-lg font-bold" style={{ color: colors.onSurface }}>אבטחה</h1>
        <button onClick={handleSkip} className="text-sm" style={{ color: colors.primary }}>
          דלג
        </button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-6">
        {/* Icon */}
        <div 
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: `${colors.primaryContainer}33` }}
        >
          <span className="text-4xl">🛡️</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-2" style={{ color: colors.onSurface }}>
          הגדר אבטחה
        </h2>
        <p className="text-sm text-center mb-8 max-w-[320px]" style={{ color: colors.onSurfaceVariant }}>
          בחר איך תרצה לאבטח את החשבון שלך
        </p>

        {/* Mock Mode Notice */}
        <div 
          className="w-full max-w-[400px] text-center py-3 px-4 rounded-xl mb-6"
          style={{ 
            backgroundColor: `${colors.success}1A`,
            color: colors.success,
          }}
        >
          🎭 מצב דמה - בחר כל אופציה
        </div>

        {/* Options */}
        <div className="w-full max-w-[400px] space-y-4 mb-8">
          {/* PIN Option */}
          <button
            onClick={() => setSelected('pin')}
            className="w-full p-5 rounded-2xl text-right transition-all active:scale-98"
            style={{
              backgroundColor: selected === 'pin' ? `${colors.primaryContainer}40` : colors.surfaceContainerLow,
              border: `2px solid ${selected === 'pin' ? colors.primary : colors.outlineVariant}`,
            }}
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: colors.surfaceContainerHigh }}
              >
                <span className="text-2xl">🔢</span>
              </div>
              <div className="flex-grow text-right">
                <h3 className="font-bold text-base mb-1" style={{ color: colors.onSurface }}>
                  קוד PIN
                </h3>
                <p className="text-sm" style={{ color: colors.onSurfaceVariant }}>
                  6 ספרות לאבטחה מהירה
                </p>
              </div>
              {selected === 'pin' && (
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          </button>

          {/* Biometric Option */}
          <button
            onClick={() => setSelected('biometric')}
            className="w-full p-5 rounded-2xl text-right transition-all active:scale-98"
            style={{
              backgroundColor: selected === 'biometric' ? `${colors.primaryContainer}40` : colors.surfaceContainerLow,
              border: `2px solid ${selected === 'biometric' ? colors.primary : colors.outlineVariant}`,
            }}
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: colors.surfaceContainerHigh }}
              >
                <span className="text-2xl">👆</span>
              </div>
              <div className="flex-grow text-right">
                <h3 className="font-bold text-base mb-1" style={{ color: colors.onSurface }}>
                  ביומטרי
                </h3>
                <p className="text-sm" style={{ color: colors.onSurfaceVariant }}>
                  טביעת אצבע או זיהוי פנים
                </p>
              </div>
              {selected === 'biometric' && (
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          </button>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!selected}
          className="w-full max-w-[400px] py-4 rounded-full text-base font-bold transition-all active:scale-98 disabled:opacity-50"
          style={{
            background: selected ? `linear-gradient(135deg, ${colors.primaryContainer} 0%, #9B59F5 100%)` : colors.surfaceContainerHigh,
            color: '#FFFFFF',
            boxShadow: selected ? `0 4px 16px ${colors.primaryContainer}40` : 'none',
          }}
        >
          המשך
        </button>
      </main>
    </div>
  );
}
