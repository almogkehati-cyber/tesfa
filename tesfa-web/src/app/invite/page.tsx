'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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

export default function InvitePage() {
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  
  const inviteLink = '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`הצטרף/י ל-TESFA - הכספת הדיגיטלית של הקהילה שלנו! 🚀\n${inviteLink}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleSMS = () => {
    const text = encodeURIComponent(`הצטרף/י ל-TESFA: ${inviteLink}`);
    window.open(`sms:?body=${text}`, '_blank');
  };

  return (
    <div 
      className="min-h-screen pb-12 relative overflow-hidden"
      style={{ backgroundColor: '#0A0A1A', color: colors.onSurface }}
    >
      {/* Floating Bubbles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large bubble top right */}
        <div 
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 animate-pulse"
          style={{ background: `radial-gradient(circle, ${colors.primaryContainer}, transparent)` }}
        />
        {/* Medium bubble left */}
        <div 
          className="absolute top-1/4 -left-16 w-48 h-48 rounded-full opacity-15"
          style={{ background: `radial-gradient(circle, ${colors.primary}, transparent)` }}
        />
        {/* Small bubble bottom right */}
        <div 
          className="absolute bottom-1/3 right-8 w-24 h-24 rounded-full opacity-25 animate-bounce"
          style={{ background: `radial-gradient(circle, ${colors.secondaryContainer}, transparent)`, animationDuration: '3s' }}
        />
        {/* Tiny bubbles */}
        <div 
          className="absolute top-1/2 left-1/4 w-12 h-12 rounded-full opacity-30"
          style={{ background: `radial-gradient(circle, ${colors.primary}, transparent)` }}
        />
        <div 
          className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full opacity-20 animate-pulse"
          style={{ background: `radial-gradient(circle, ${colors.primaryContainer}, transparent)`, animationDuration: '2s' }}
        />
        <div 
          className="absolute bottom-40 left-12 w-20 h-20 rounded-full opacity-15"
          style={{ background: `radial-gradient(circle, ${colors.secondaryContainer}, transparent)` }}
        />
      </div>

      {/* Header with Close Button */}
      <header 
        className="fixed top-0 left-0 right-0 mx-auto max-w-[430px] z-50 flex flex-row-reverse justify-between items-center px-6 h-16"
        style={{ backgroundColor: 'transparent' }}
      >
        <h1 
          className="text-xl font-bold"
          style={{ color: colors.onSurface }}
        >
          הזמן חברים
        </h1>
        <button 
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95"
          style={{ backgroundColor: `${colors.surfaceContainerHighest}99` }}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={colors.onSurface} strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-6 max-w-lg mx-auto flex flex-col items-center relative z-10">
        {/* Hero with Bubbles */}
        <div className="relative w-full max-w-[280px] mb-8 flex items-center justify-center">
          {/* Main Circle with People */}
          <div 
            className="relative w-48 h-48 rounded-full flex items-center justify-center"
            style={{ 
              background: `linear-gradient(135deg, ${colors.primaryContainer}, ${colors.secondaryContainer})`,
              boxShadow: '0 20px 60px rgba(123, 47, 190, 0.4)',
            }}
          >
            {/* Center Icon */}
            <svg className="w-20 h-20 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            
            {/* Orbiting small bubbles */}
            <div 
              className="absolute -top-4 right-4 w-12 h-12 rounded-full border-2 flex items-center justify-center"
              style={{ backgroundColor: colors.surface, borderColor: colors.primary }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div 
              className="absolute -bottom-2 left-0 w-10 h-10 rounded-full border-2 flex items-center justify-center"
              style={{ backgroundColor: colors.surface, borderColor: colors.primaryContainer }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={colors.primaryContainer} strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div 
              className="absolute top-1/2 -right-6 w-8 h-8 rounded-full border-2 flex items-center justify-center"
              style={{ backgroundColor: colors.surface, borderColor: colors.secondaryContainer }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={colors.secondaryContainer} strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-10">
          <h2 
            className="text-4xl font-extrabold tracking-tight mb-4"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            הזמן חברים ל-TESFA
          </h2>
          <p className="text-lg leading-relaxed max-w-xs mx-auto" style={{ color: colors.onSurfaceVariant }}>
            שתף את העתיד הפיננסי עם הקהילה שלך וצמחו יחד בתוך הכספת הדיגיטלית.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-4">
          {/* WhatsApp - Primary */}
          <button 
            onClick={handleWhatsApp}
            className="w-full h-16 rounded-full flex items-center justify-between px-8 text-white font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            style={{ 
              background: `linear-gradient(to left, ${colors.primaryContainer}, ${colors.secondaryContainer})`,
              boxShadow: '0 10px 40px rgba(123, 47, 190, 0.2)',
            }}
          >
            <div className="flex items-center gap-4">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>שתף ב-WhatsApp</span>
            </div>
            <svg className="w-5 h-5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* SMS */}
          <button 
            onClick={handleSMS}
            className="w-full h-14 rounded-full border flex items-center px-6 gap-4 font-semibold transition-colors active:scale-[0.98] hover:bg-[#333345]"
            style={{ 
              backgroundColor: 'rgba(30, 30, 47, 0.6)',
              backdropFilter: 'blur(24px)',
              borderColor: `${colors.primary}33`,
            }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>שלח ב-SMS</span>
          </button>

          {/* Copy Link */}
          <button 
            onClick={handleCopyLink}
            className="w-full h-14 rounded-full border flex items-center px-6 gap-4 font-semibold transition-colors active:scale-[0.98] hover:bg-[#333345]"
            style={{ 
              backgroundColor: 'rgba(30, 30, 47, 0.6)',
              backdropFilter: 'blur(24px)',
              borderColor: `${colors.primary}33`,
            }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>{copied ? 'הועתק! ✓' : 'העתק קישור'}</span>
          </button>
        </div>

        {/* Social Proof Card */}
        <div 
          className="mt-12 w-full p-6 rounded-2xl border"
          style={{ 
            backgroundColor: `${colors.surfaceContainerLow}66`,
            borderColor: `${colors.outlineVariant}1A`,
          }}
        >
          <div className="flex items-center gap-4 mb-4">
            {/* Avatar Stack */}
            <div className="flex -space-x-3 space-x-reverse">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i}
                  className="w-8 h-8 rounded-full border-2 flex items-center justify-center"
                  style={{ 
                    backgroundColor: colors.surfaceContainerHighest,
                    borderColor: colors.surface,
                  }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              ))}
            </div>
            <span 
              className="text-xs font-bold tracking-wider uppercase"
              style={{ color: colors.primary }}
            >
              מצטרפים חדשים בקהילה
            </span>
          </div>
          <p 
            className="text-sm leading-relaxed italic"
            style={{ color: colors.onSurfaceVariant }}
          >
            &quot;מאז שהצטרפתי ל-TESFA, ניהול המשאבים הקהילתי שלנו הפך לשקוף ופשוט מאי פעם.&quot;
          </p>
        </div>
      </main>
    </div>
  );
}
