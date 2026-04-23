'use client';

import Link from 'next/link';
import { useState } from 'react';

const colors = {
  background: '#0A0A1A',
  surface: '#12122A',
  primary: '#7B2FBE',
  primaryEnd: '#9B59F5',
  indigo: '#818cf8',
  slate400: '#94a3b8',
  slate500: '#64748b',
  white: '#ffffff',
};

export default function ExecuteRefundPage() {
  const [amount, setAmount] = useState('0.00');

  const handleKeyPress = (key: string) => {
    if (key === 'backspace') {
      setAmount(prev => prev.slice(0, -1) || '0');
    } else if (key === '.') {
      if (!amount.includes('.')) {
        setAmount(prev => prev + '.');
      }
    } else {
      setAmount(prev => {
        const clean = prev.replace(/,/g, '');
        if (clean === '0') return key;
        return prev + key;
      });
    }
  };

  return (
    <div 
      className="min-h-screen overflow-hidden"
      style={{ backgroundColor: colors.background, color: colors.white }}
    >
      {/* Header */}
      <header 
        className="fixed top-0 left-0 right-0 mx-auto max-w-[430px] z-50 flex items-center justify-between px-4 h-16 border-b transition-colors"
        style={{ 
          backgroundColor: colors.white,
          borderColor: '#e2e8f0',
        }}
      >
        <div className="flex items-center gap-4">
          <Link 
            href="/business/refunds"
            className="p-2 rounded-full transition-colors hover:bg-slate-50"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={colors.indigo} strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className="text-lg font-bold" style={{ color: '#0f172a' }}>ביצוע זיכוי</h1>
        </div>
        <button className="p-2 rounded-full transition-colors hover:bg-slate-50">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={colors.slate500} strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </header>

      <main className="pt-20 pb-32 px-6 flex flex-col min-h-screen">
        {/* Amount Display */}
        <section className="flex flex-col items-center justify-center py-8 text-center">
          <span 
            className="text-sm font-medium tracking-widest mb-2"
            style={{ color: colors.slate400 }}
          >
            סכום לזיכוי
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl md:text-7xl font-extrabold tracking-tighter">
              {amount}
            </span>
            <span className="text-2xl font-bold" style={{ color: colors.indigo }}>TSF</span>
          </div>
        </section>

        {/* Transaction Context Card */}
        <section 
          className="rounded-3xl p-6 border shadow-2xl mb-8 relative overflow-hidden"
          style={{ 
            backgroundColor: colors.surface,
            borderColor: 'rgba(255, 255, 255, 0.05)',
          }}
        >
          {/* Decorative Glow */}
          <div 
            className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-16 -mt-16"
            style={{ backgroundColor: `${colors.indigo}1A` }}
          />
          
          <div className="flex items-center gap-4 mb-6">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center border"
              style={{ 
                backgroundColor: `${colors.indigo}33`,
                borderColor: `${colors.indigo}4D`,
              }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={colors.indigo} strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="text-xs" style={{ color: colors.slate400 }}>לקוח</p>
              <p className="text-lg font-bold">איתי אברהמי</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div 
              className="rounded-2xl p-4 border"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: colors.slate500 }}>
                עסקה מקורית
              </p>
              <p className="font-semibold" style={{ color: '#e2e8f0' }}>#TRX-8829</p>
            </div>
            <div 
              className="rounded-2xl p-4 border"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: colors.slate500 }}>
                תאריך
              </p>
              <p className="font-semibold" style={{ color: '#e2e8f0' }}>12 פבר׳ 2024</p>
            </div>
          </div>
        </section>

        {/* Numeric Keypad */}
        <section className="mt-auto grid grid-cols-3 gap-3">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'backspace'].map((key) => (
            <button
              key={key}
              onClick={() => handleKeyPress(key)}
              className="h-16 rounded-2xl flex items-center justify-center text-2xl font-semibold border transition-all active:scale-95 hover:bg-white/10"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              {key === 'backspace' ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
                </svg>
              ) : key}
            </button>
          ))}
        </section>
      </main>

      {/* Confirm Button */}
      <div 
        className="fixed bottom-0 left-0 right-0 mx-auto max-w-[430px] px-6 pb-10 pt-4"
        style={{ background: `linear-gradient(to top, ${colors.background}, ${colors.background}CC, transparent)` }}
      >
        <Link
          href="/business/refunds/success"
          className="w-full h-16 rounded-full flex items-center justify-center gap-3 text-white font-bold text-lg transition-transform active:scale-[0.98]"
          style={{ 
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryEnd})`,
            boxShadow: '0 8px 30px rgba(123, 47, 190, 0.4)',
          }}
        >
          <span>אישור זיכוי</span>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}
