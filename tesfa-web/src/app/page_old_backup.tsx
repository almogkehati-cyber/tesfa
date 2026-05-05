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
  
  // Mock state - no Web3
  const [isConnected, setIsConnected] = useState(false);
  const [user, setUser] = useState<{ fullName?: string; email?: string } | null>(null);
  const [balance] = useState('1250.00');
  
  useEffect(() => {
    // Check localStorage for authentication (client-side only)
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const savedUser = localStorage.getItem('currentUser');
      
      if (isLoggedIn && savedUser) {
        setIsConnected(true);
        setUser(JSON.parse(savedUser));
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
    <div className="max-w-[430px] mx-auto">
      <div 
        className="min-h-screen pb-32"
        style={{ backgroundColor: colors.surface, color: colors.onSurface }}
      >
        {/* Header */}
        <header 
          className="fixed top-0 left-0 right-0 mx-auto max-w-[430px] z-50 flex flex-row-reverse justify-between items-center px-6 h-16"
          style={{ backgroundColor: colors.surface }}
        >
          <div className="flex items-center gap-4">
            <span 
              className="text-2xl font-black tracking-tight"
              style={{ color: colors.primary, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              TESFA
            </span>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 rounded-full transition-colors hover:bg-[#333345]"
            style={{ color: colors.onSurfaceVariant }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </header>

        {/* Main Content */}
        <main className="pt-24 px-6">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ color: colors.onSurface }}>
              שלום, {user?.fullName || 'משתמש'}! 👋
            </h1>
            <p style={{ color: colors.onSurfaceVariant }}>
              ברוך הבא למערכת TESFA
            </p>
          </div>

          {/* Balance Card */}
          <div 
            className="rounded-3xl p-6 mb-6"
            style={{ 
              background: `linear-gradient(135deg, ${colors.primaryContainer} 0%, ${colors.secondaryContainer} 100%)`,
            }}
          >
            <p className="text-sm mb-2 opacity-90">היתרה שלך</p>
            <h2 className="text-5xl font-bold mb-4">{balance}</h2>
            <p className="text-sm opacity-75">TESFA</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <Link
              href="/send"
              className="flex flex-col items-center justify-center p-4 rounded-2xl transition-all active:scale-95"
              style={{ backgroundColor: colors.surfaceContainerHigh }}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                style={{ backgroundColor: colors.primaryContainer }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <span className="text-sm" style={{ color: colors.onSurface }}>שלח</span>
            </Link>

            <Link
              href="/receive"
              className="flex flex-col items-center justify-center p-4 rounded-2xl transition-all active:scale-95"
              style={{ backgroundColor: colors.surfaceContainerHigh }}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                style={{ backgroundColor: colors.primaryContainer }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <span className="text-sm" style={{ color: colors.onSurface }}>קבל</span>
            </Link>

            <Link
              href="/ubi"
              className="flex flex-col items-center justify-center p-4 rounded-2xl transition-all active:scale-95"
              style={{ backgroundColor: colors.surfaceContainerHigh }}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                style={{ backgroundColor: colors.success }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm" style={{ color: colors.onSurface }}>UBI</span>
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold" style={{ color: colors.onSurface }}>פעילות אחרונה</h3>
              <Link href="/activity" className="text-sm" style={{ color: colors.primary }}>
                הצג הכל
              </Link>
            </div>
            
            <div className="space-y-3">
              {/* Mock transaction 1 */}
              <div 
                className="flex items-center justify-between p-4 rounded-2xl"
                style={{ backgroundColor: colors.surfaceContainerHigh }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: colors.success + '20' }}
                  >
                    <span style={{ color: colors.success }}>+</span>
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: colors.onSurface }}>קיבלת</p>
                    <p className="text-sm" style={{ color: colors.onSurfaceVariant }}>מיוסי כהן</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold" style={{ color: colors.success }}>+50 TSF</p>
                  <p className="text-xs" style={{ color: colors.onSurfaceVariant }}>לפני שעה</p>
                </div>
              </div>

              {/* Mock transaction 2 */}
              <div 
                className="flex items-center justify-between p-4 rounded-2xl"
                style={{ backgroundColor: colors.surfaceContainerHigh }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: colors.primary + '20' }}
                  >
                    <span style={{ color: colors.primary }}>-</span>
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: colors.onSurface }}>שלחת</p>
                    <p className="text-sm" style={{ color: colors.onSurfaceVariant }}>לדני לוי</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold" style={{ color: colors.onSurface }}>-25 TSF</p>
                  <p className="text-xs" style={{ color: colors.onSurfaceVariant }}>לפני 3 שעות</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Bottom Navigation */}
        <nav 
          className="fixed bottom-0 left-0 right-0 mx-auto max-w-[430px] flex justify-around items-center h-20 px-6"
          style={{ backgroundColor: colors.surfaceContainer, borderTop: `1px solid ${colors.surfaceContainerHighest}` }}
        >
          <Link href="/" className="flex flex-col items-center gap-1">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" style={{ color: colors.primary }}>
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            <span className="text-xs" style={{ color: colors.primary }}>בית</span>
          </Link>

          <Link href="/activity" className="flex flex-col items-center gap-1">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: colors.onSurfaceVariant }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs" style={{ color: colors.onSurfaceVariant }}>פעילות</span>
          </Link>

          <Link href="/business" className="flex flex-col items-center gap-1">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: colors.onSurfaceVariant }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-xs" style={{ color: colors.onSurfaceVariant }}>עסקים</span>
          </Link>

          <Link href="/profile" className="flex flex-col items-center gap-1">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: colors.onSurfaceVariant }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs" style={{ color: colors.onSurfaceVariant }}>פרופיל</span>
          </Link>
        </nav>

        {/* <InstallButton /> */}
      </div>
    </div>
  );
}
