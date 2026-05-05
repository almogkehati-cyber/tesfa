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

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName || !email || !phone) {
      setError('נא למלא את כל השדות');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('נא להזין כתובת אימייל תקינה');
      return;
    }

    const phoneRegex = /^05\d{8}$/;
    if (!phoneRegex.test(phone.replace(/-/g, ''))) {
      setError('נא להזין מספר טלפון תקין (05X-XXXXXXX)');
      return;
    }

    setIsSubmitting(true);
    
    // Save user to localStorage (without PIN yet - will be set later)
    if (typeof window !== 'undefined') {
      const user = {
        fullName,
        email,
        phone,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    
    setTimeout(() => {
      router.push(`/otp?method=email&destination=${encodeURIComponent(email)}`);
    }, 1000);
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

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-[24px] py-[16px]">
        <Link 
          href="/login"
          className="p-[8px] rounded-full transition-all hover:opacity-70"
          style={{ color: colors.onSurfaceVariant }}
        >
          <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-[20px] font-bold" style={{ color: colors.onSurface }}>
          הרשמה
        </h1>
        <div className="w-[40px]" />
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex flex-col items-center px-[24px] pb-[32px] pt-[16px]">
        <form onSubmit={handleSubmit} className="w-full max-w-[400px] space-y-[20px]">
          {/* Full Name */}
          <div>
            <label className="block text-[14px] mb-[8px] text-right" style={{ color: colors.onSurfaceVariant }}>
              שם מלא
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-[16px] py-[14px] rounded-[12px] text-[16px] text-right outline-none"
              style={{
                backgroundColor: colors.surfaceContainerLow,
                border: `1px solid ${colors.outlineVariant}`,
                color: colors.onSurface,
              }}
              placeholder="יוסי כהן"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-[14px] mb-[8px] text-right" style={{ color: colors.onSurfaceVariant }}>
              אימייל
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-[16px] py-[14px] rounded-[12px] text-[16px] text-right outline-none"
              style={{
                backgroundColor: colors.surfaceContainerLow,
                border: `1px solid ${colors.outlineVariant}`,
                color: colors.onSurface,
              }}
              placeholder="example@email.com"
              dir="ltr"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[14px] mb-[8px] text-right" style={{ color: colors.onSurfaceVariant }}>
              מספר טלפון
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-[16px] py-[14px] rounded-[12px] text-[16px] text-right outline-none"
              style={{
                backgroundColor: colors.surfaceContainerLow,
                border: `1px solid ${colors.outlineVariant}`,
                color: colors.onSurface,
              }}
              placeholder="050-1234567"
              dir="ltr"
            />
          </div>

          {/* Note about PIN */}
          <div 
            className="text-[13px] text-center py-[12px] px-[16px] rounded-[12px]"
            style={{ 
              backgroundColor: `${colors.primary}1A`,
              color: colors.primary,
            }}
          >
            💡 תגדיר קוד PIN בשלב הבא
          </div>

          {/* Error Message */}
          {error && (
            <div 
              className="text-[14px] text-center py-[12px] px-[16px] rounded-[8px]"
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
            disabled={isSubmitting}
            className="w-full py-[16px] rounded-full text-[17px] font-bold transition-all active:scale-98 disabled:opacity-50"
            style={{
              background: `linear-gradient(135deg, ${colors.primaryContainer} 0%, #9B59F5 100%)`,
              color: '#FFFFFF',
              boxShadow: `0 4px 16px ${colors.primaryContainer}40`,
            }}
          >
            {isSubmitting ? 'נרשם...' : 'הרשם'}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-[24px] text-center">
          <p className="text-[14px]" style={{ color: colors.onSurfaceVariant }}>
            כבר יש לך חשבון?{' '}
            <Link 
              href="/login"
              className="font-bold hover:underline"
              style={{ color: colors.primary }}
            >
              התחבר
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
