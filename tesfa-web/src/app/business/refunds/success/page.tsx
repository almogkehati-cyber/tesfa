'use client';

import Link from 'next/link';
import BusinessNav from '@/components/BusinessNav';

const colors = {
  background: '#0A0A1A',
  purple: '#a855f7',
  purpleGradient: 'linear-gradient(to right, #9333ea, #a855f7)',
  green: '#22c55e',
  slate400: '#94a3b8',
  white: '#ffffff',
};

export default function RefundSuccessPage() {
  return (
    <div 
      className="min-h-screen overflow-hidden"
      style={{ backgroundColor: colors.background, color: colors.white }}
    >
      {/* Header */}
      <header 
        className="fixed top-0 left-0 right-0 mx-auto max-w-[430px] z-50 flex justify-between items-center px-4 h-16 border-b"
        style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}
      >
        <div className="flex items-center gap-3">
          <Link 
            href="/business"
            className="p-2 rounded-full transition-colors hover:bg-white/5"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={colors.slate400} strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>
          <span className="text-slate-200">זיכוי הושלם</span>
        </div>
        <div 
          className="text-xl font-black tracking-tighter"
          style={{ color: colors.purple }}
        >
          TESFA
        </div>
      </header>

      <main className="pt-16 pb-28 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Success Icon */}
        <div className="relative flex items-center justify-center mb-8">
          <div 
            className="absolute w-48 h-48 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0) 70%)' }}
          />
          <div 
            className="relative rounded-full p-6 border-4"
            style={{ 
              backgroundColor: `${colors.green}1A`,
              borderColor: `${colors.green}33`,
            }}
          >
            <svg 
              className="w-16 h-16"
              fill={colors.green}
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-10 space-y-3">
          <h1 className="text-2xl font-bold tracking-tight">הלקוח זוכה בהצלחה!</h1>
          <p className="text-sm max-w-[280px] mx-auto" style={{ color: colors.slate400 }}>
            הסכום הועבר בהצלחה לחשבון הלקוח.
          </p>
        </div>

        {/* Details Card */}
        <div 
          className="w-full max-w-sm rounded-2xl p-6 border relative overflow-hidden"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {/* Decorative accent */}
          <div 
            className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"
            style={{ backgroundColor: `${colors.purple}0D` }}
          />
          
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-4" style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}>
              <span className="text-sm" style={{ color: colors.slate400 }}>סכום הזיכוי</span>
              <span className="font-bold text-lg">₪0.00</span>
            </div>
            <div className="flex justify-between items-center border-b pb-4" style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}>
              <span className="text-sm" style={{ color: colors.slate400 }}>שם הלקוח</span>
              <span className="font-medium">---</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: colors.slate400 }}>מספר פעולה</span>
              <span className="font-mono text-xs" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>---</span>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div 
          className="w-full max-w-sm mt-6 rounded-2xl overflow-hidden h-32 relative flex items-center justify-center"
          style={{ 
            background: `linear-gradient(135deg, ${colors.purple}1A, ${colors.purple}0D)`,
          }}
        >
          <div 
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, #0A0A1A, transparent)' }}
          />
          <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2">
            <svg className="w-4 h-4" fill={colors.purple} viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
            </svg>
            <span className="text-[10px] font-medium" style={{ color: colors.slate400 }}>
              העסקה מאובטחת ומבוקרת
            </span>
          </div>
        </div>

        {/* Primary Action */}
        <div className="w-full max-w-sm mt-10">
          <Link 
            href="/business"
            className="w-full block text-center py-4 rounded-xl font-bold shadow-lg transition-transform active:scale-[0.98]"
            style={{ 
              background: colors.purpleGradient,
              boxShadow: '0 10px 25px rgba(147, 51, 234, 0.2)',
            }}
          >
            חזרה לניהול עסקי
          </Link>
        </div>
      </main>

      <BusinessNav />
    </div>
  );
}
