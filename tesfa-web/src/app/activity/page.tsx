'use client';

import Link from 'next/link';

const colors = {
  primary: '#deb7ff',
  primaryContainer: '#7b2fbe',
  error: '#ffb4ab',
  surface: '#121222',
  surfaceContainerLow: '#1a1a2b',
  surfaceContainerHighest: '#333345',
  onSurface: '#e3e0f8',
  onSurfaceVariant: '#cfc2d5',
};

const activities: { icon: string; name: string; time: string; amount: string; positive: boolean; type: string }[] = [];

export default function ActivityPage() {
  return (
    <div 
      className="min-h-screen pb-32 relative overflow-hidden"
      style={{ backgroundColor: colors.surface, color: colors.onSurface }}
    >
      {/* Floating Bubbles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 animate-pulse"
          style={{ background: `radial-gradient(circle, ${colors.primaryContainer}, transparent)` }}
        />
        <div 
          className="absolute top-1/3 -left-16 w-48 h-48 rounded-full opacity-15"
          style={{ background: `radial-gradient(circle, ${colors.primary}, transparent)` }}
        />
        <div 
          className="absolute bottom-1/4 right-8 w-32 h-32 rounded-full opacity-20 animate-bounce"
          style={{ background: `radial-gradient(circle, ${colors.primaryContainer}, transparent)`, animationDuration: '3s' }}
        />
      </div>

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
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full transition-colors hover:bg-[#333345]" style={{ color: colors.primary }}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 px-6 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 
            className="text-2xl font-bold"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            פעילות
          </h1>
          <button 
            className="text-sm font-bold px-4 py-2 rounded-full border"
            style={{ borderColor: `${colors.primary}40`, color: colors.primary }}
          >
            סינון
          </button>
        </div>

        {/* Activity List */}
        {activities.length > 0 ? (
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div 
                key={index}
                className="p-4 rounded-2xl flex items-center justify-between hover:bg-[#1e1e2f] transition-colors cursor-pointer"
                style={{ backgroundColor: colors.surfaceContainerLow }}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ 
                      backgroundColor: activity.type === 'UBI' 
                        ? `${colors.primaryContainer}1A` 
                        : colors.surfaceContainerHighest,
                    }}
                  >
                    <span className="text-xl">{activity.icon}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{activity.name}</p>
                    <p className="text-xs" style={{ color: colors.onSurfaceVariant }}>{activity.time}</p>
                  </div>
                </div>
                <div className="text-left">
                  <p 
                    className="font-bold"
                    style={{ color: activity.positive ? colors.primary : colors.error }}
                  >
                    {activity.amount} TSF
                  </p>
                  <p className="text-[10px]" style={{ color: colors.onSurfaceVariant }}>{activity.type}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div 
            className="p-12 rounded-2xl text-center"
            style={{ backgroundColor: colors.surfaceContainerLow }}
          >
            <div 
              className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ backgroundColor: `${colors.primaryContainer}1A` }}
            >
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-2" style={{ color: colors.onSurface }}>בקרוב...</h3>
            <p className="text-sm" style={{ color: colors.onSurfaceVariant }}>
              היסטוריית הפעילות שלך תופיע כאן
            </p>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav 
        className="fixed bottom-0 left-0 right-0 mx-auto max-w-[430px] z-50 rounded-t-[2rem] flex flex-row-reverse justify-around items-center px-4 h-20"
        style={{ 
          backgroundColor: 'rgba(30, 30, 47, 0.8)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0px -10px 40px rgba(222,183,255,0.12)',
        }}
      >
        <Link href="/" className="flex flex-col items-center justify-center opacity-60 hover:opacity-100 scale-90 transition-all" style={{ color: colors.onSurfaceVariant }}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-[10px] font-bold mt-1">בית</span>
        </Link>
        <div className="flex flex-col items-center justify-center scale-90" style={{ color: colors.primary, filter: 'drop-shadow(0 0 8px rgba(222,183,255,0.6))' }}>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
          </svg>
          <span className="text-[10px] font-bold mt-1">פעילות</span>
        </div>
        <Link href="/directory" className="flex flex-col items-center justify-center opacity-60 hover:opacity-100 scale-90 transition-all" style={{ color: colors.onSurfaceVariant }}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span className="text-[10px] font-bold mt-1">עסקים</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center justify-center opacity-60 hover:opacity-100 scale-90 transition-all" style={{ color: colors.onSurfaceVariant }}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-[10px] font-bold mt-1">פרופיל</span>
        </Link>
      </nav>
    </div>
  );
}
