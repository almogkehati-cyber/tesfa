'use client';

import Link from 'next/link';
import BusinessHeader from '@/components/BusinessHeader';
import BusinessNav from '@/components/BusinessNav';

const colors = {
  primary: '#deb7ff',
  primaryContainer: '#7b2fbe',
  secondaryContainer: '#6107ba',
  surface: '#121222',
  surfaceContainerLow: '#1a1a2b',
  surfaceContainerHighest: '#333345',
  onSurface: '#e3e0f8',
  onSurfaceVariant: '#cfc2d5',
  outlineVariant: '#4c4353',
};

export default function PayrollConfirmPage() {
  return (
    <div 
      className="min-h-screen pb-32"
      style={{ backgroundColor: '#0A0A1A', color: colors.onSurface }}
    >
      <BusinessHeader title="אישור תשלום" showBack backHref="/payroll" />

      <main className="pt-24 pb-32 px-6 flex flex-col items-center max-w-lg mx-auto min-h-screen">
        {/* Employee Profile */}
        <div className="w-full flex flex-col items-center mb-10">
          <div className="relative mb-6">
            {/* Glow Effect */}
            <div 
              className="absolute -inset-1 rounded-full blur opacity-40"
              style={{ background: `linear-gradient(to tr, ${colors.primaryContainer}, ${colors.secondaryContainer})` }}
            />
            <div 
              className="relative w-24 h-24 rounded-full overflow-hidden border-2 flex items-center justify-center font-bold text-2xl"
              style={{ 
                borderColor: `${colors.primary}33`,
                backgroundColor: colors.primaryContainer,
                color: '#e4c4ff',
              }}
            >
              --
            </div>
          </div>
          <h2 
            className="text-2xl font-extrabold mb-1"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            ---
          </h2>
          <p className="text-sm tracking-wide" style={{ color: colors.onSurfaceVariant }}>
            ---
          </p>
        </div>

        {/* Payment Details - Bento Grid */}
        <div className="w-full grid grid-cols-1 gap-4 mb-8">
          {/* Amount Section */}
          <div 
            className="rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden"
            style={{ backgroundColor: colors.surfaceContainerLow }}
          >
            <div 
              className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-16 translate-x-16"
              style={{ backgroundColor: `${colors.primary}0D` }}
            />
            <span 
              className="text-xs font-bold tracking-widest mb-2"
              style={{ color: colors.primary }}
            >
              סכום לתשלום
            </span>
            <div className="flex items-baseline gap-2">
              <span 
                className="text-5xl font-extrabold"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                ₪0
              </span>
              <span className="text-lg" style={{ color: colors.onSurfaceVariant }}>.00</span>
            </div>
          </div>

          {/* Meta Data Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div 
              className="rounded-2xl p-5 flex flex-col gap-1"
              style={{ backgroundColor: colors.surfaceContainerLow }}
            >
              <span className="text-[10px] uppercase tracking-wider" style={{ color: colors.onSurfaceVariant }}>
                תאריך ערך
              </span>
              <span className="text-sm font-semibold">---</span>
            </div>
            <div 
              className="rounded-2xl p-5 flex flex-col gap-1"
              style={{ backgroundColor: colors.surfaceContainerLow }}
            >
              <span className="text-[10px] uppercase tracking-wider" style={{ color: colors.onSurfaceVariant }}>
                אמצעי תשלום
              </span>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span className="text-sm font-semibold">---</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div 
            className="rounded-2xl p-5 flex flex-col gap-2"
            style={{ backgroundColor: colors.surfaceContainerLow }}
          >
            <span className="text-[10px] uppercase tracking-wider" style={{ color: colors.onSurfaceVariant }}>
              תיאור העברה
            </span>
            <p className="text-sm leading-relaxed">
              תשלום שכר חודש ספטמבר - כולל החזרי נסיעות ובונוס עמידה ביעדים רבעוניים.
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div 
          className="flex items-center gap-3 py-3 px-5 rounded-full mb-10"
          style={{ backgroundColor: `${colors.surfaceContainerHighest}4D` }}
        >
          <svg className="w-5 h-5 text-[#4CAF50]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
          </svg>
          <span className="text-[11px] font-medium" style={{ color: colors.onSurfaceVariant }}>
            העברה מאובטחת תחת תקן ה-Celestial Vault
          </span>
        </div>

        {/* Action Buttons */}
        <div className="w-full mt-auto space-y-4">
          <Link
            href="/payroll/success"
            className="w-full py-5 rounded-full text-white font-bold text-lg shadow-lg flex items-center justify-center transition-all active:scale-95"
            style={{ 
              background: `linear-gradient(to left, ${colors.primaryContainer}, ${colors.secondaryContainer})`,
              boxShadow: '0 12px 40px rgba(123, 47, 190, 0.2)',
            }}
          >
            אשר תשלום
          </Link>
          <Link
            href="/payroll"
            className="w-full py-2 text-sm text-center transition-colors hover:text-[#e3e0f8]"
            style={{ color: colors.onSurfaceVariant }}
          >
            ביטול וחזרה
          </Link>
        </div>
      </main>

      <BusinessNav />
    </div>
  );
}
