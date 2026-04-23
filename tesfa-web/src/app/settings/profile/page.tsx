'use client';

import Link from 'next/link';
import { useState } from 'react';

const colors = {
  primary: '#deb7ff',
  primaryContainer: '#7b2fbe',
  secondaryContainer: '#6107ba',
  surface: '#121222',
  surfaceContainerLow: '#1a1a2b',
  surfaceContainerHigh: '#29283a',
  surfaceContainerHighest: '#333345',
  surfaceContainerLowest: '#0c0c1d',
  onSurface: '#e3e0f8',
  onSurfaceVariant: '#cfc2d5',
  outlineVariant: '#4c4353',
};

export default function EditProfilePage() {
  const [name, setName] = useState('ישראל ישראלי');
  const [email, setEmail] = useState('israel.i@vault.co.il');
  const [biometricEnabled, setBiometricEnabled] = useState(true);

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: colors.surfaceContainerLowest, color: colors.onSurface }}
    >
      {/* Header */}
      <header 
        className="w-full sticky top-0 z-40 flex flex-row-reverse justify-between items-center px-6 h-16"
        style={{ backgroundColor: colors.surface, color: colors.primary }}
      >
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full transition-all hover:bg-[#333345]/50">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
        <h1 className="text-lg font-bold">עריכת פרופיל</h1>
        <Link href="/profile" className="p-2 rounded-full transition-all hover:bg-[#333345]/50">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </header>

      <main className="flex-1 px-6 pt-8 pb-32 max-w-2xl mx-auto w-full">
        {/* Avatar Upload */}
        <div className="flex flex-col items-center mb-12 relative">
          <div className="relative group">
            <div 
              className="w-32 h-32 rounded-full overflow-hidden border-4 shadow-2xl flex items-center justify-center"
              style={{ 
                borderColor: colors.surfaceContainerHighest,
                background: `linear-gradient(135deg, ${colors.primaryContainer}, ${colors.secondaryContainer})`,
              }}
            >
              <span className="text-4xl font-black text-white">יי</span>
            </div>
            <button 
              className="absolute bottom-1 right-1 w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all active:scale-90"
              style={{ 
                background: `linear-gradient(135deg, ${colors.primaryContainer}, #9b59f5)`,
                borderColor: colors.surfaceContainerLowest,
              }}
            >
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
          <p className="mt-4 text-sm opacity-80" style={{ color: colors.onSurfaceVariant }}>
            לחץ לשינוי תמונת הפרופיל
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <label className="block text-sm px-2 text-right" style={{ color: colors.onSurfaceVariant }}>
              שם מלא
            </label>
            <div 
              className="relative rounded-xl border transition-all duration-300 focus-within:border-[#deb7ff]"
              style={{ backgroundColor: colors.surface, borderColor: `${colors.outlineVariant}33` }}
            >
              <div className="flex items-center px-4 py-4 gap-3">
                <svg className="w-5 h-5 opacity-60" fill="none" viewBox="0 0 24 24" stroke={colors.onSurfaceVariant} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="הזן שם מלא"
                  className="bg-transparent border-none focus:ring-0 w-full text-lg text-right"
                  style={{ color: colors.onSurface }}
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm px-2 text-right" style={{ color: colors.onSurfaceVariant }}>
              דוא״ל
            </label>
            <div 
              className="relative rounded-xl border transition-all duration-300 focus-within:border-[#deb7ff]"
              style={{ backgroundColor: colors.surface, borderColor: `${colors.outlineVariant}33` }}
            >
              <div className="flex items-center px-4 py-4 gap-3">
                <svg className="w-5 h-5 opacity-60" fill="none" viewBox="0 0 24 24" stroke={colors.onSurfaceVariant} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="bg-transparent border-none focus:ring-0 w-full text-lg text-right"
                  style={{ color: colors.onSurface }}
                />
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="pt-8 space-y-4">
            <h3 
              className="text-xs uppercase tracking-widest px-2"
              style={{ color: colors.onSurfaceVariant }}
            >
              אבטחה והגדרות
            </h3>
            
            <Link 
              href="#"
              className="flex flex-row-reverse justify-between items-center p-4 rounded-2xl transition-colors hover:bg-[#29283a]"
              style={{ backgroundColor: colors.surfaceContainerLow }}
            >
              <div className="flex flex-row-reverse items-center gap-4">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: colors.surfaceContainerHighest }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="text-right">
                  <p className="font-medium">שינוי סיסמה</p>
                  <p className="text-xs" style={{ color: colors.onSurfaceVariant }}>עדכון פרטי גישה לחשבון</p>
                </div>
              </div>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={colors.onSurfaceVariant} strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </Link>

            <div 
              className="flex flex-row-reverse justify-between items-center p-4 rounded-2xl transition-colors hover:bg-[#29283a]"
              style={{ backgroundColor: colors.surfaceContainerLow }}
            >
              <div className="flex flex-row-reverse items-center gap-4">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: colors.surfaceContainerHighest }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                </div>
                <div className="text-right">
                  <p className="font-medium">אימות ביומטרי</p>
                  <p className="text-xs" style={{ color: colors.onSurfaceVariant }}>שימוש בטביעת אצבע לכניסה מהירה</p>
                </div>
              </div>
              <button 
                onClick={() => setBiometricEnabled(!biometricEnabled)}
                className="w-12 h-6 rounded-full relative transition-colors"
                style={{ backgroundColor: biometricEnabled ? colors.primaryContainer : colors.surfaceContainerHighest }}
              >
                <div 
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${
                    biometricEnabled ? 'right-1' : 'right-7'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-12">
          <button 
            className="w-full py-4 rounded-full text-white text-lg shadow-lg transition-all active:scale-95"
            style={{ 
              background: `linear-gradient(135deg, ${colors.primaryContainer}, #9b59f5)`,
              boxShadow: '0 10px 30px rgba(123, 47, 190, 0.3)',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}
          >
            שמור שינויים
          </button>
          <button 
            className="w-full mt-4 py-4 rounded-full transition-colors"
            style={{ color: colors.onSurfaceVariant }}
          >
            ביטול וחזרה
          </button>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav 
        className="fixed bottom-0 left-0 right-0 mx-auto max-w-[430px] rounded-t-[2.5rem] z-50 flex flex-row-reverse justify-around items-center px-4 pb-8 pt-4"
        style={{ 
          backgroundColor: 'rgba(30, 30, 47, 0.8)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 -10px 40px rgba(123, 47, 190, 0.12)',
        }}
      >
        <Link href="/" className="flex flex-col items-center justify-center opacity-60 transition-colors" style={{ color: colors.onSurfaceVariant }}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-[10px] font-medium">בית</span>
        </Link>
        <Link href="/activity" className="flex flex-col items-center justify-center opacity-60 transition-colors" style={{ color: colors.onSurfaceVariant }}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span className="text-[10px] font-medium">פעילות</span>
        </Link>
        <Link href="/directory" className="flex flex-col items-center justify-center opacity-60 transition-colors" style={{ color: colors.onSurfaceVariant }}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span className="text-[10px] font-medium">עסקים</span>
        </Link>
        <div 
          className="flex flex-col items-center justify-center px-5 py-2 rounded-full"
          style={{ backgroundColor: `${colors.primaryContainer}33`, color: colors.primary }}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          <span className="text-[10px] font-medium">פרופיל</span>
        </div>
      </nav>
    </div>
  );
}
