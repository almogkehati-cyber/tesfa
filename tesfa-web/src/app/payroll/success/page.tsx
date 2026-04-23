'use client';

import Link from 'next/link';
import BusinessNav from '@/components/BusinessNav';

const colors = {
  primary: '#deb7ff',
  primaryContainer: '#7b2fbe',
  secondaryContainer: '#6107ba',
  surfaceContainerLow: '#1a1a2b',
  onSurface: '#e3e0f8',
  onSurfaceVariant: '#cfc2d5',
  outlineVariant: '#4c4353',
};

export default function PayrollSuccessPage() {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-6 pb-32 relative overflow-hidden"
      style={{ backgroundColor: '#0A0A1A', color: colors.onSurface }}
    >
      {/* Celestial Background Glows */}
      <div 
        className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at center, rgba(123, 47, 190, 0.15) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] pointer-events-none opacity-50"
        style={{ background: 'radial-gradient(circle at center, rgba(123, 47, 190, 0.15) 0%, transparent 70%)' }}
      />

      {/* Main Success Content */}
      <main className="w-full max-w-md flex flex-col items-center text-center z-10">
        {/* Success Icon */}
        <div className="relative mb-12">
          {/* Decorative Rings */}
          <div 
            className="absolute inset-0 scale-150 rounded-full border animate-pulse"
            style={{ borderColor: `${colors.primary}1A` }}
          />
          <div 
            className="absolute inset-0 scale-[1.8] rounded-full border"
            style={{ borderColor: `${colors.primary}0D` }}
          />
          {/* Icon */}
          <div 
            className="w-32 h-32 rounded-full flex items-center justify-center relative"
            style={{ 
              background: `linear-gradient(to tr, ${colors.primaryContainer}, ${colors.secondaryContainer})`,
              boxShadow: '0 0 60px rgba(123, 47, 190, 0.4)',
            }}
          >
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div className="space-y-4 mb-12">
          <h1 
            className="text-3xl font-extrabold tracking-tight"
            style={{ color: colors.primary, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            התשלום בוצע
          </h1>
          <p className="text-lg font-medium opacity-80" style={{ color: colors.onSurfaceVariant }}>
            הכסף הועבר בהצלחה לחשבון העובד
          </p>
        </div>

        {/* Transaction Details Card */}
        <div 
          className="w-full rounded-2xl p-8 mb-12 border relative overflow-hidden"
          style={{ 
            backgroundColor: `${colors.surfaceContainerLow}66`,
            backdropFilter: 'blur(24px)',
            borderColor: `${colors.outlineVariant}1A`,
          }}
        >
          {/* Asymmetric Glass Element */}
          <div 
            className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl"
            style={{ backgroundColor: `${colors.primary}0D` }}
          />
          
          <div className="flex flex-col items-center gap-6 relative">
            {/* Amount */}
            <div className="flex flex-col items-center">
              <span 
                className="text-xs tracking-[0.2em] mb-1"
                style={{ color: colors.onSurfaceVariant }}
              >
                סכום שהועבר
              </span>
              <span 
                className="text-5xl font-bold"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                ₪0.00
              </span>
            </div>

            {/* Recipient Info */}
            <div 
              className="w-full pt-6 border-t flex items-center justify-between"
              style={{ borderColor: `${colors.outlineVariant}1A` }}
            >
              <div className="text-right">
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: colors.onSurfaceVariant }}>
                  עובד
                </p>
                <p className="text-base font-semibold">---</p>
              </div>
              <div 
                className="w-12 h-12 rounded-full overflow-hidden border-2 flex items-center justify-center font-bold"
                style={{ 
                  borderColor: `${colors.primaryContainer}4D`,
                  backgroundColor: colors.primaryContainer,
                  color: '#e4c4ff',
                }}
              >
                --
              </div>
            </div>

            {/* Transaction Reference */}
            <div className="w-full flex items-center justify-between">
              <div className="text-right">
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: colors.onSurfaceVariant }}>
                  מספר אישור
                </p>
                <p className="text-sm font-mono" style={{ color: colors.onSurfaceVariant }}>
                  ---
                </p>
              </div>
              <div className="text-left">
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: colors.onSurfaceVariant }}>
                  תאריך
                </p>
                <p className="text-sm" style={{ color: colors.onSurfaceVariant }}>
                  ---
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-4">
          <Link
            href="/business"
            className="w-full py-5 rounded-full text-white font-bold text-lg flex items-center justify-center transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ 
              background: `linear-gradient(to left, ${colors.primaryContainer}, #9b59f5)`,
              boxShadow: '0 12px 32px -8px rgba(123, 47, 190, 0.4)',
            }}
          >
            חזרה לניהול עסקי
          </Link>
          <button
            className="w-full py-4 rounded-full font-semibold text-base transition-colors hover:bg-[#deb7ff0D]"
            style={{ color: colors.primary }}
          >
            הורד קבלה (PDF)
          </button>
        </div>
      </main>

      <BusinessNav />
    </div>
  );
}
