'use client';

import Link from 'next/link';
import BusinessHeader from '@/components/BusinessHeader';
import BusinessNav from '@/components/BusinessNav';

const colors = {
  primary: '#deb7ff',
  primaryContainer: '#7b2fbe',
  secondary: '#d7baff',
  tertiary: '#fbba68',
  surface: '#121222',
  surfaceContainerLow: '#1a1a2b',
  surfaceContainer: '#1e1e2f',
  surfaceContainerHigh: '#29283a',
  surfaceContainerHighest: '#333345',
  surfaceContainerLowest: '#0c0c1d',
  onSurface: '#e3e0f8',
  onSurfaceVariant: '#cfc2d5',
  outlineVariant: '#4c4353',
  success: '#4CAF50',
};

const chartData = [
  { day: 'א׳', height: 0, value: '₪0' },
  { day: 'ב׳', height: 0, value: '₪0' },
  { day: 'ג׳', height: 0, value: '₪0' },
  { day: 'ד׳', height: 0, value: '₪0', active: true },
  { day: 'ה׳', height: 0, value: '₪0' },
  { day: 'ו׳', height: 0, value: '₪0' },
  { day: 'ש׳', height: 0, value: '₪0' },
];

export default function BusinessStatsPage() {
  return (
    <div 
      className="min-h-screen pb-32"
      style={{ backgroundColor: colors.surface, color: colors.onSurface }}
    >
      <BusinessHeader title="סטטיסטיקה" showBack backHref="/business" />

      <main className="pt-24 px-6 max-w-5xl mx-auto">
        {/* Title */}
        <section className="mb-10">
          <h2 
            className="text-[1.75rem] font-bold mb-2"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            נתונים וסטטיסטיקה
          </h2>
          <p className="text-sm" style={{ color: colors.onSurfaceVariant }}>
            ניתוח ביצועים שבועי עבור TSF
          </p>
        </section>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Income Chart Card (Large) */}
          <div 
            className="md:col-span-2 rounded-2xl p-6 relative overflow-hidden"
            style={{ backgroundColor: colors.surfaceContainerLow }}
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 
                  className="text-xs uppercase tracking-wider mb-1"
                  style={{ color: colors.onSurfaceVariant }}
                >
                  הכנסות TSF (7 ימים אחרונים)
                </h3>
                <div 
                  className="text-3xl font-bold"
                  style={{ color: colors.primary, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  ₪0.00
                </div>
              </div>
              <div 
                className="text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"
                style={{ backgroundColor: `${colors.success}1A`, color: colors.success }}
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span>0%</span>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="h-48 w-full flex items-end justify-between gap-2 mt-4">
              {chartData.map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                  <div 
                    className="w-full rounded-t-lg transition-all duration-500 relative"
                    style={{ 
                      height: `${bar.height}%`,
                      backgroundColor: bar.active ? colors.primaryContainer : colors.surfaceContainerHighest,
                      filter: bar.active ? 'drop-shadow(0 0 8px rgba(222, 183, 255, 0.4))' : 'none',
                    }}
                  >
                    <div 
                      className={`absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] transition-opacity ${bar.active ? 'opacity-100 font-bold' : 'opacity-0 group-hover:opacity-100'}`}
                      style={{ color: bar.active ? colors.primary : colors.onSurfaceVariant }}
                    >
                      {bar.value}
                    </div>
                  </div>
                  <span 
                    className={`text-[10px] ${bar.active ? 'font-bold' : ''}`}
                    style={{ color: bar.active ? colors.primary : colors.onSurfaceVariant }}
                  >
                    {bar.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Volume Metric Card */}
          <div 
            className="rounded-2xl p-6 flex flex-col justify-between"
            style={{ backgroundColor: colors.surfaceContainerHigh }}
          >
            <div>
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${colors.primary}1A` }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-sm font-medium mb-1" style={{ color: colors.onSurfaceVariant }}>
                נפח עסקאות
              </h3>
              <div 
                className="text-4xl font-bold"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                0
              </div>
              <p className="text-xs mt-2" style={{ color: colors.onSurfaceVariant }}>
                גידול של 0% לעומת שבוע שעבר
              </p>
            </div>
            <div 
              className="mt-6 pt-6 border-t"
              style={{ borderColor: `${colors.outlineVariant}33` }}
            >
              <div className="flex justify-between items-center text-xs">
                <span style={{ color: colors.onSurfaceVariant }}>ממוצע לעסקה</span>
                <span className="font-bold">₪0.00</span>
              </div>
            </div>
          </div>

          {/* Insights Row */}
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
            <div 
              className="rounded-2xl p-6 border-r-4"
              style={{ 
                backgroundColor: colors.surfaceContainerLow,
                borderColor: colors.tertiary,
              }}
            >
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <h4 className="font-bold mb-1">זמני עומס מועדפים</h4>
                  <p className="text-xs" style={{ color: colors.onSurfaceVariant }}>
                    אין עדיין מספיק נתונים
                  </p>
                </div>
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke={colors.tertiary} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div 
              className="rounded-2xl p-6 border-r-4"
              style={{ 
                backgroundColor: colors.surfaceContainerLow,
                borderColor: colors.secondary,
              }}
            >
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <h4 className="font-bold mb-1">קהל לקוחות חוזר</h4>
                  <p className="text-xs" style={{ color: colors.onSurfaceVariant }}>
                    אין עדיין מספיק נתונים
                  </p>
                </div>
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke={colors.secondary} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Heatmap */}
          <div 
            className="md:col-span-3 rounded-2xl p-8"
            style={{ backgroundColor: colors.surfaceContainerLowest }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                פיזור עסקאות יומי
              </h3>
              <div className="flex gap-2">
                {[0.2, 0.4, 0.7, 1].map((opacity, i) => (
                  <div 
                    key={i}
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: colors.primary, opacity }}
                  />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((opacity, i) => (
                <div 
                  key={i}
                  className="aspect-square rounded-sm"
                  style={{ backgroundColor: colors.primary, opacity }}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <BusinessNav />
    </div>
  );
}
