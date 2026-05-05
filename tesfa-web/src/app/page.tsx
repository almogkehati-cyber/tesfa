'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const colors = {
  primary: '#deb7ff',
  primaryContainer: '#7b2fbe',
  onPrimary: '#4a007f',
  secondaryContainer: '#6107ba',
  error: '#ffb4ab',
  surface: '#121222',
  surfaceContainer: '#1e1e2f',
  surfaceContainerLow: '#1a1a2b',
  surfaceContainerHigh: '#29283a',
  surfaceContainerHighest: '#333345',
  onSurface: '#e3e0f8',
  onSurfaceVariant: '#cfc2d5',
  background: '#121222',
  primaryFixed: '#f0dbff',
  success: '#4ade80',
  outlineVariant: '#4c4353',
};

export default function Home() {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);
  const [user, setUser] = useState<{ fullName?: string; email?: string } | null>(null);
  const [balance] = useState('2,450.00');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const savedUser = localStorage.getItem('currentUser');
      const hasSeenWelcome = localStorage.getItem('hasSeenWelcome') === 'true';
      
      if (isLoggedIn && savedUser) {
        setIsConnected(true);
        setUser(JSON.parse(savedUser));
      } else if (!hasSeenWelcome) {
        router.push('/welcome');
      } else {
        router.push('/login');
      }
    }
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn');
    }
    router.push('/login');
  };

  if (!isConnected) {
    return (
      <div style={{ backgroundColor: colors.background }} className="min-h-screen flex items-center justify-center">
        <p style={{ color: colors.onSurface }}>טוען...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[430px] mx-auto relative overflow-hidden" style={{ backgroundColor: colors.background }}>
      {/* Floating Orbs - Beautiful Background - HUGE! */}
      <div 
        className="fixed top-[-200px] right-[-150px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ 
          background: `radial-gradient(circle, ${colors.primaryContainer}60 0%, ${colors.primaryContainer}30 40%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />
      <div 
        className="fixed bottom-[-250px] left-[-200px] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ 
          background: `radial-gradient(circle, ${colors.secondaryContainer}50 0%, ${colors.secondaryContainer}20 40%, transparent 70%)`,
          filter: 'blur(80px)',
        }}
      />
      <div 
        className="fixed top-[40%] left-[-100px] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ 
          background: `radial-gradient(circle, ${colors.primary}40 0%, ${colors.primary}15 50%, transparent 70%)`,
          filter: 'blur(70px)',
        }}
      />

      <div className="min-h-screen pb-32 relative z-10" style={{ color: colors.onSurface }}>
        {/* Header */}
        <header 
          className="fixed top-0 left-0 right-0 mx-auto max-w-[430px] z-50 flex flex-row-reverse justify-between items-center px-6 h-16 backdrop-blur-xl"
          style={{ backgroundColor: `${colors.surface}CC` }}
        >
          <div className="flex items-center gap-4">
            <span 
              className="text-2xl font-black tracking-tight"
              style={{ color: colors.primary, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              TESFA
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/profile">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 transition-all hover:scale-105 cursor-pointer" style={{ borderColor: colors.primaryContainer }}>
                <div className="w-full h-full flex items-center justify-center text-xl font-bold" style={{ backgroundColor: colors.primaryContainer, color: colors.onPrimary }}>
                  {user?.fullName?.charAt(0) || 'U'}
                </div>
              </div>
            </Link>
            <button 
              onClick={handleLogout}
              className="p-2 rounded-full transition-all hover:scale-105"
              style={{ color: colors.primary }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-24 px-6">
          {/* Balance Display - The Celestial Vault */}
          <section className="mb-12 relative overflow-hidden rounded-2xl p-8" style={{ backgroundColor: colors.surfaceContainerLow }}>
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full" style={{ backgroundColor: `${colors.primaryContainer}33`, filter: 'blur(80px)' }} />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full" style={{ backgroundColor: `${colors.secondaryContainer}33`, filter: 'blur(80px)' }} />
            <div className="relative z-10 text-right">
              <p className="text-sm uppercase tracking-widest mb-2 opacity-70" style={{ color: colors.onSurfaceVariant }}>
                יתרה כוללת
              </p>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4" style={{ color: colors.onSurface, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {balance} <span style={{ color: colors.primary }}>TSF</span>
              </h1>
              <div className="flex items-center justify-end gap-2 font-medium" style={{ color: colors.success }}>
                <span>+2.4% השבוע</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </section>

          {/* Action Grid - Bento Style */}
          <section className="grid grid-cols-4 gap-4 mb-12">
            {/* Send */}
            <Link href="/send">
              <button className="flex flex-col items-center gap-3 group w-full">
                <div className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105" style={{ backgroundColor: colors.surfaceContainerHighest }}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" style={{ color: colors.primary }}>
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </div>
                <span className="font-medium text-sm" style={{ color: colors.onSurface }}>שלח</span>
              </button>
            </Link>

            {/* Receive */}
            <Link href="/receive">
              <button className="flex flex-col items-center gap-3 group w-full">
                <div className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105" style={{ backgroundColor: colors.surfaceContainerHighest }}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" style={{ color: colors.primary }}>
                    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                  </svg>
                </div>
                <span className="font-medium text-sm" style={{ color: colors.onSurface }}>קבל</span>
              </button>
            </Link>

            {/* UBI */}
            <Link href="/ubi">
              <button className="flex flex-col items-center gap-3 group w-full">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                  style={{ 
                    background: `linear-gradient(135deg, ${colors.primaryContainer} 0%, ${colors.secondaryContainer} 100%)`,
                    boxShadow: `0 20px 50px -12px ${colors.primaryContainer}40`
                  }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" style={{ color: colors.onPrimary }}>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" />
                  </svg>
                </div>
                <span className="font-bold text-sm" style={{ color: colors.onSurface }}>UBI</span>
              </button>
            </Link>

            {/* Scan */}
            <Link href="/scan">
              <button className="flex flex-col items-center gap-3 group w-full">
                <div className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105" style={{ backgroundColor: colors.surfaceContainerHighest }}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: colors.primary }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </div>
                <span className="font-medium text-sm" style={{ color: colors.onSurface }}>סרוק</span>
              </button>
            </Link>
          </section>

          {/* Recent Activity */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: colors.onSurface, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                פעילות אחרונה
              </h2>
              <Link href="/activity">
                <button className="text-sm font-bold" style={{ color: colors.primary }}>
                  הכל
                </button>
              </Link>
            </div>

            <div className="space-y-4">
              {/* Activity Item 1 */}
              <div className="p-4 rounded-xl flex items-center justify-between transition-colors hover:bg-opacity-80" style={{ backgroundColor: colors.surfaceContainerLow }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.surfaceContainerHighest, color: colors.onSurfaceVariant }}>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.9 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <p className="font-bold" style={{ color: colors.onSurface }}>בית קפה שכונתי</p>
                    <p className="text-xs" style={{ color: colors.onSurfaceVariant }}>היום, 14:20</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold" style={{ color: colors.primary }}>+45 TSF</p>
                  <p className="text-[10px]" style={{ color: colors.onSurfaceVariant }}>הושלם</p>
                </div>
              </div>

              {/* Activity Item 2 */}
              <div className="p-4 rounded-xl flex items-center justify-between transition-colors hover:bg-opacity-80" style={{ backgroundColor: colors.surfaceContainerLow }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${colors.primaryContainer}1A`, color: colors.primary }}>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <p className="font-bold" style={{ color: colors.onSurface }}>UBI יומי</p>
                    <p className="text-xs" style={{ color: colors.onSurfaceVariant }}>היום, 08:00</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold" style={{ color: colors.primary }}>+12 TSF</p>
                  <p className="text-[10px]" style={{ color: colors.onSurfaceVariant }}>הושלם</p>
                </div>
              </div>

              {/* Activity Item 3 */}
              <div className="p-4 rounded-xl flex items-center justify-between transition-colors hover:bg-opacity-80" style={{ backgroundColor: colors.surfaceContainerLow }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.surfaceContainerHighest, color: colors.onSurfaceVariant }}>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <p className="font-bold" style={{ color: colors.onSurface }}>מכולת השלום</p>
                    <p className="text-xs" style={{ color: colors.onSurfaceVariant }}>אתמול, 19:45</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold" style={{ color: colors.error }}>-32 TSF</p>
                  <p className="text-[10px]" style={{ color: colors.onSurfaceVariant }}>הושלם</p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Bottom Navigation */}
        <nav 
          className="fixed bottom-0 left-0 right-0 mx-auto max-w-[430px] z-50 rounded-t-3xl backdrop-blur-xl flex flex-row-reverse justify-around items-center px-4 h-20"
          style={{ 
            backgroundColor: `${colors.surfaceContainer}CC`,
            boxShadow: `0px -10px 40px ${colors.primary}20`
          }}
        >
          <Link href="/" className="flex flex-col items-center justify-center transition-all scale-90">
            <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24" style={{ color: colors.primary, filter: `drop-shadow(0 0 8px ${colors.primary}99)` }}>
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            <span className="text-[10px] font-bold" style={{ color: colors.primary, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>בית</span>
          </Link>

          <Link href="/activity" className="flex flex-col items-center justify-center opacity-60 hover:opacity-100 transition-all scale-90">
            <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: colors.onSurfaceVariant }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-[10px] font-bold" style={{ color: colors.onSurfaceVariant, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>פעילות</span>
          </Link>

          <Link href="/directory" className="flex flex-col items-center justify-center opacity-60 hover:opacity-100 transition-all scale-90">
            <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: colors.onSurfaceVariant }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-[10px] font-bold" style={{ color: colors.onSurfaceVariant, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>מדריך</span>
          </Link>

          <Link href="/profile" className="flex flex-col items-center justify-center opacity-60 hover:opacity-100 transition-all scale-90">
            <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: colors.onSurfaceVariant }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-[10px] font-bold" style={{ color: colors.onSurfaceVariant, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>פרופיל</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
