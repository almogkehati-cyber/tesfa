'use client';

import Link from 'next/link';
import { useState } from 'react';
import BusinessHeader from '@/components/BusinessHeader';
import BusinessNav from '@/components/BusinessNav';

const colors = {
  primary: '#deb7ff',
  primaryContainer: '#7b2fbe',
  secondaryContainer: '#6107ba',
  surface: '#121222',
  surfaceContainer: '#1e1e2f',
  surfaceContainerLow: '#1a1a2b',
  surfaceContainerHigh: '#29283a',
  surfaceContainerHighest: '#333345',
  onSurface: '#e3e0f8',
  onSurfaceVariant: '#cfc2d5',
  outlineVariant: '#4c4353',
  error: '#ffb4ab',
  errorContainer: '#93000a',
};

export default function BusinessApiPage() {
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const apiKey = '';
  const maskedKey = '';

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="min-h-screen pb-24"
      style={{ backgroundColor: colors.surface, color: colors.onSurface }}
    >
      <BusinessHeader title="מפתח API" showBack backHref="/business" />

      <main className="pt-24 px-6 max-w-2xl mx-auto">
        {/* Title */}
        <section className="mb-10 text-right">
          <h2 
            className="text-3xl font-extrabold mb-3"
            style={{ color: colors.primary, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            מפתח API
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: colors.onSurfaceVariant }}>
            השתמש במפתח זה כדי לחבר את החנות שלך או את המערכות החיצוניות ישירות לארנק TESFA.
          </p>
        </section>

        {/* API Key Card */}
        <div className="relative group mb-8">
          {/* Glow Effect */}
          <div 
            className="absolute -inset-1 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"
            style={{ background: `linear-gradient(to right, ${colors.primaryContainer}, ${colors.secondaryContainer})` }}
          />
          <div 
            className="relative rounded-2xl p-8 border"
            style={{ 
              backgroundColor: colors.surfaceContainerLow,
              borderColor: `${colors.outlineVariant}1A`,
            }}
          >
            {/* Status */}
            <div className="flex justify-between items-center mb-6">
              <span 
                className="text-xs uppercase tracking-widest"
                style={{ color: colors.onSurfaceVariant }}
              >
                Live Production Key
              </span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#4CAF50] animate-pulse" />
                <span className="text-[10px] font-bold text-[#4CAF50]">ACTIVE</span>
              </div>
            </div>

            {/* Key Display */}
            <div 
              className="rounded-xl p-6 mb-8 flex items-center justify-between border"
              style={{ 
                backgroundColor: `${colors.surfaceContainerHighest}80`,
                borderColor: `${colors.primary}0D`,
              }}
            >
              <code 
                className="text-lg md:text-xl font-bold font-mono tracking-wider select-all overflow-hidden whitespace-nowrap"
                style={{ color: colors.primary }}
              >
                {showKey ? apiKey : maskedKey}
              </code>
              <button 
                onClick={() => setShowKey(!showKey)}
                className="transition-colors hover:text-[#deb7ff]"
                style={{ color: `${colors.primary}99` }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  {showKey ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  )}
                </svg>
              </button>
            </div>

            {/* Copy Button */}
            <button 
              onClick={handleCopy}
              className="w-full py-4 px-6 rounded-full font-bold text-lg flex items-center justify-center gap-3 shadow-xl transition-all active:scale-95 text-white"
              style={{ 
                background: `linear-gradient(to left, ${colors.primaryContainer}, #9b59f5)`,
              }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {copied ? 'הועתק! ✓' : 'העתק מפתח'}
            </button>
          </div>
        </div>

        {/* Warning Section */}
        <section className="mb-8">
          <div 
            className="rounded-2xl p-6 border"
            style={{ 
              backgroundColor: `${colors.errorContainer}1A`,
              borderColor: `${colors.error}1A`,
            }}
          >
            <div className="flex items-start gap-4">
              <div 
                className="p-2 rounded-full"
                style={{ backgroundColor: `${colors.error}33` }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={colors.error} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-bold mb-1 text-right" style={{ color: colors.error }}>
                  אזור סכנה
                </h4>
                <p 
                  className="text-sm text-right mb-6 leading-relaxed"
                  style={{ color: colors.onSurfaceVariant }}
                >
                  ייצור מפתח מחדש יבטל באופן מיידי את המפתח הנוכחי. פעולה זו עלולה להשבית חיבורים קיימים במערכת שלך.
                </p>
                <button 
                  className="w-full py-3 px-6 rounded-full border font-bold transition-colors active:scale-95"
                  style={{ borderColor: `${colors.error}66`, color: colors.error }}
                >
                  ייצור מפתח מחדש
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Documentation Link */}
        <div className="grid grid-cols-1 gap-4">
          <Link 
            href="#"
            className="rounded-2xl p-6 flex items-center justify-between transition-colors hover:bg-[#333345] cursor-pointer group"
            style={{ backgroundColor: colors.surfaceContainerHigh }}
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${colors.primaryContainer}4D` }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h5 className="font-bold">תיעוד API</h5>
                <p className="text-xs" style={{ color: colors.onSurfaceVariant }}>
                  למד איך להטמיע את TESFA באתר שלך
                </p>
              </div>
            </div>
            <svg 
              className="w-5 h-5 transition-transform group-hover:-translate-x-1"
              fill="none" viewBox="0 0 24 24" stroke={colors.onSurfaceVariant} strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>
      </main>

      <BusinessNav />
    </div>
  );
}
