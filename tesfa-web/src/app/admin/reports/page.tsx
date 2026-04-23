'use client';

import Link from 'next/link';
import { useState } from 'react';

const colors = {
  primary: '#7B2FBE',
  primaryVariant: '#9B59F5',
  background: '#0A0A1A',
  surface: '#14142B',
  border: '#2D2D44',
  amber: '#fbbf24',
  white: '#FFFFFF',
  slate400: '#94a3b8',
  slate800: '#1e293b',
  slate950: '#020617',
};

export default function ReportsPage() {
  const [reportType, setReportType] = useState('transactions');
  const [format, setFormat] = useState('pdf');

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: colors.background, color: colors.white }}
    >
      {/* Header */}
      <header 
        className="fixed top-0 w-full z-50 flex flex-row-reverse justify-between items-center px-6 h-16 border-b shadow-2xl"
        style={{ 
          backgroundColor: colors.slate950,
          borderColor: colors.slate800,
        }}
      >
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold tracking-tight text-slate-100">
            הפקת דוחות לרואה חשבון
          </h1>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={colors.amber} strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <Link 
          href="/"
          className="w-10 h-10 rounded-full border flex items-center justify-center"
          style={{ borderColor: `${colors.amber}4D`, backgroundColor: colors.surface }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={colors.amber} strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
      </header>

      {/* Main Content */}
      <main className="pt-24 px-6 pb-24 min-h-screen">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-black tracking-tight mb-2">הפקת דוחות</h2>
              <p style={{ color: colors.slate400 }}>בצע הפקה של דוחות פיננסיים מתקדמים עבור לקוחות המשרד</p>
            </div>
            <button 
              className="px-4 py-2 rounded-xl transition-all active:scale-95 flex items-center gap-2"
              style={{ backgroundColor: colors.slate800, color: '#e2e8f0' }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              היסטוריית דוחות
            </button>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Date Range */}
            <div 
              className="md:col-span-12 lg:col-span-7 p-6 rounded-xl border shadow-sm"
              style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            >
              <div className="flex items-center gap-3 mb-6">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={colors.amber} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-lg font-bold">טווח תאריכים</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-widest block" style={{ color: colors.slate400 }}>מתאריך</label>
                  <input 
                    type="date" 
                    className="w-full rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-400 outline-none transition-all"
                    style={{ backgroundColor: colors.background, borderColor: colors.border, color: colors.white }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-widest block" style={{ color: colors.slate400 }}>עד תאריך</label>
                  <input 
                    type="date" 
                    className="w-full rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-400 outline-none transition-all"
                    style={{ backgroundColor: colors.background, borderColor: colors.border, color: colors.white }}
                  />
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {['החודש', 'רבעון אחרון', 'שנה נוכחית'].map((label) => (
                  <button 
                    key={label}
                    className="text-xs px-3 py-1.5 rounded-full border transition-colors"
                    style={{ backgroundColor: `${colors.slate800}80`, borderColor: colors.border, color: '#cbd5e1' }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Format Selection */}
            <div 
              className="md:col-span-12 lg:col-span-5 p-6 rounded-xl border shadow-sm flex flex-col"
              style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            >
              <div className="flex items-center gap-3 mb-6">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={colors.amber} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-bold">פורמט ייצוא</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 flex-1">
                {[
                  { value: 'pdf', label: 'ייצוא ל-PDF', icon: 'PDF' },
                  { value: 'excel', label: 'ייצוא ל-Excel', icon: 'XLS' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setFormat(opt.value)}
                    className={`h-full flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                      format === opt.value ? 'border-amber-400' : 'border-[#2D2D44] hover:bg-[#1e293b]/40'
                    }`}
                    style={{ backgroundColor: colors.background }}
                  >
                    <span className={`text-3xl mb-2 font-bold ${format === opt.value ? 'text-amber-400' : 'text-slate-400'}`}>
                      {opt.icon}
                    </span>
                    <span className="text-sm font-bold text-slate-300">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Report Type */}
            <div 
              className="md:col-span-12 p-6 rounded-xl border shadow-sm"
              style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            >
              <div className="flex items-center gap-3 mb-6">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={colors.amber} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                <h3 className="text-lg font-bold">סוג הדוח</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'transactions', title: 'ריכוז עסקאות', desc: 'סיכום מפורט של כלל העסקאות וההכנסות' },
                  { value: 'ubi', title: 'מענקי UBI', desc: 'דוח זכאות ומימוש מענקים תקופתיים' },
                  { value: 'credits', title: 'דוח זיכויים', desc: 'פירוט החזרים, ביטולים וזיכוי מס' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setReportType(opt.value)}
                    className={`p-5 rounded-xl border flex items-start gap-4 text-right transition-all ${
                      reportType === opt.value 
                        ? 'bg-amber-400/5 border-amber-400' 
                        : 'border-[#2D2D44]'
                    }`}
                    style={{ backgroundColor: reportType === opt.value ? `${colors.amber}0D` : colors.background }}
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${colors.amber}1A` }}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={colors.amber} strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{opt.title}</h4>
                      <p className="text-xs" style={{ color: colors.slate400 }}>{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <div className="md:col-span-12 flex justify-center py-8">
              <button 
                className="w-full md:w-auto min-w-[280px] font-bold text-lg py-4 px-12 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-3 text-white"
                style={{ 
                  background: `linear-gradient(to right, ${colors.primary}, ${colors.primaryVariant})`,
                  boxShadow: '0 10px 40px -10px rgba(123, 47, 190, 0.5)',
                }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                הפק דוח
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav 
        className="fixed bottom-0 left-0 right-0 border-t flex flex-row-reverse justify-around items-center h-20 px-4 z-50 rounded-t-[2rem]"
        style={{ 
          backgroundColor: 'rgba(30, 30, 47, 0.9)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0px -10px 40px rgba(222,183,255,0.12)',
        }}
      >
        <Link href="/" className="flex flex-col items-center gap-1" style={{ color: colors.amber }}>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
          <span className="text-[10px] font-bold">בית</span>
        </Link>
        <Link href="/activity" className="flex flex-col items-center gap-1 opacity-60" style={{ color: colors.slate400 }}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span className="text-[10px] font-bold">פעילות</span>
        </Link>
        <Link href="/directory" className="flex flex-col items-center gap-1 opacity-60" style={{ color: colors.slate400 }}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span className="text-[10px] font-bold">עסקים</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center gap-1 opacity-60" style={{ color: colors.slate400 }}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-[10px] font-bold">פרופיל</span>
        </Link>
      </nav>
    </div>
  );
}
