'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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

function OTPContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const destination = searchParams.get('destination') || '';

  useEffect(() => {
    // Auto-skip in mock mode after 2 seconds
    const timer = setTimeout(() => {
      router.push('/pin-setup');
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
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
        <Link href="/register">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: colors.onSurface }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-lg font-bold" style={{ color: colors.onSurface }}>אימות קוד</h1>
        <div className="w-6" />
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-6">
        {/* Icon */}
        <div 
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: `${colors.primaryContainer}33` }}
        >
          <span className="text-4xl">📧</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-2" style={{ color: colors.onSurface }}>
          הזן קוד אימות
        </h2>
        <p className="text-sm text-center mb-8" style={{ color: colors.onSurfaceVariant }}>
          שלחנו קוד בן 6 ספרות ל-<br />
          <span style={{ color: colors.primary }}>{destination}</span>
        </p>

        {/* Mock Mode Notice */}
        <div 
          className="w-full max-w-[400px] text-center py-3 px-4 rounded-xl mb-6"
          style={{ 
            backgroundColor: `${colors.success}1A`,
            color: colors.success,
          }}
        >
          🎭 מצב דמה - מעבר אוטומטי בעוד שניות...
        </div>

        {/* OTP Input */}
        <div className="flex gap-3 mb-6" dir="ltr">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 text-center text-2xl font-bold rounded-xl outline-none transition-all"
              style={{
                backgroundColor: colors.surfaceContainerLow,
                border: `2px solid ${digit ? colors.primary : colors.outlineVariant}`,
                color: colors.onSurface,
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

        {/* Resend */}
        <button
          className="text-sm mb-8"
          style={{ color: colors.primary }}
        >
          לא קיבלת קוד? <span className="font-bold underline">שלח שוב</span>
        </button>

        {/* Skip Button (Mock) */}
        <button
          onClick={() => router.push('/pin-setup')}
          className="w-full max-w-[400px] py-4 rounded-full text-base font-bold transition-all active:scale-98"
          style={{
            background: `linear-gradient(135deg, ${colors.primaryContainer} 0%, #9B59F5 100%)`,
            color: '#FFFFFF',
            boxShadow: `0 4px 16px ${colors.primaryContainer}40`,
          }}
        >
          המשך (דמה)
        </button>
      </main>
    </div>
  );
}

export default function OTPPage() {
  return (
    <Suspense fallback={
      <div style={{ backgroundColor: colors.background }} className="min-h-screen flex items-center justify-center">
        <p style={{ color: colors.onSurface }}>טוען...</p>
      </div>
    }>
      <OTPContent />
    </Suspense>
  );
}
