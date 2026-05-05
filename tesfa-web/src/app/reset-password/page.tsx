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

export default function ResetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('נא להזין אימייל');
      return;
    }

    // Mock mode - auto success
    setSuccess(true);
    setTimeout(() => {
      router.push('/new-password');
    }, 2000);
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
        <Link href="/login">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: colors.onSurface }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-lg font-bold" style={{ color: colors.onSurface }}>איפוס PIN</h1>
        <div className="w-6" />
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-6">
        {/* Icon */}
        <div 
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: `${colors.primaryContainer}33` }}
        >
          <span className="text-4xl">🔑</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-2" style={{ color: colors.onSurface }}>
          שכחת את קוד ה-PIN?
        </h2>
        <p className="text-sm text-center mb-8 max-w-[320px]" style={{ color: colors.onSurfaceVariant }}>
          הזן את כתובת האימייל שלך ונשלח לך קוד לאיפוס PIN
        </p>

        {success ? (
          <div 
            className="w-full max-w-[400px] text-center py-4 px-6 rounded-xl mb-6"
            style={{ 
              backgroundColor: `${colors.success}1A`,
              color: colors.success,
            }}
          >
            <div className="text-4xl mb-2">✅</div>
            <p className="font-bold mb-1">קוד נשלח בהצלחה!</p>
            <p className="text-sm">מעבר לדף איפוס PIN...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-[400px]">
            {/* Mock Mode Notice */}
            <div 
              className="text-center py-3 px-4 rounded-xl mb-6"
              style={{ 
                backgroundColor: `${colors.success}1A`,
                color: colors.success,
              }}
            >
              🎭 מצב דמה - כל אימייל יתקבל
            </div>

            {/* Email Input */}
            <div className="mb-6">
              <label 
                className="block text-sm mb-2 text-right"
                style={{ color: colors.onSurfaceVariant }}
              >
                אימייל
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl text-base text-right outline-none transition-all"
                style={{
                  backgroundColor: colors.surfaceContainerLow,
                  border: `1px solid ${colors.outlineVariant}`,
                  color: colors.onSurface,
                }}
                placeholder="example@email.com"
                dir="ltr"
              />
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-full text-base font-bold transition-all active:scale-98"
              style={{
                background: `linear-gradient(135deg, ${colors.primaryContainer} 0%, #9B59F5 100%)`,
                color: '#FFFFFF',
                boxShadow: `0 4px 16px ${colors.primaryContainer}40`,
              }}
            >
              שלח קוד איפוס
            </button>
          </form>
        )}

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <Link 
            href="/login"
            className="text-sm"
            style={{ color: colors.primary }}
          >
            חזרה להתחברות
          </Link>
        </div>
      </main>
    </div>
  );
}
