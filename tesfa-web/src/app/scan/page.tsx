'use client';

import Link from 'next/link';

const colors = {
  primary: '#deb7ff',
  primaryContainer: '#7b2fbe',
  surface: '#121222',
  surfaceContainer: '#1e1e2f',
  surfaceContainerHighest: '#333345',
  onSurface: '#e3e0f8',
  onSurfaceVariant: '#cfc2d5',
  outlineVariant: '#4c4353',
};

export default function ScanPage() {
  return (
    <div 
      className="min-h-screen flex flex-col overflow-hidden relative"
      style={{ backgroundColor: colors.surface, color: colors.onSurface }}
    >
      {/* Camera Preview Background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="w-full h-full opacity-40"
          style={{ 
            background: 'linear-gradient(135deg, #1a1a2b 0%, #121222 50%, #0c0c1d 100%)',
          }}
        />
      </div>

      {/* UI Overlay */}
      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <header className="flex flex-row-reverse justify-between items-center w-full px-6 h-20">
          <Link 
            href="/"
            className="w-12 h-12 flex items-center justify-center rounded-full transition-colors"
            style={{ 
              backgroundColor: `${colors.surfaceContainer}99`,
              backdropFilter: 'blur(12px)',
            }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={colors.onSurface} strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: colors.primaryContainer }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <h1 
              className="font-bold text-xl tracking-tight"
              style={{ color: colors.primary, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              TESFA SCAN
            </h1>
          </div>
        </header>

        {/* Scanner Viewport */}
        <main className="flex-grow relative flex items-center justify-center">
          {/* Scanner Frame */}
          <div className="relative w-[70%] aspect-square max-w-[300px]">
            {/* Corner Decorations */}
            <div 
              className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 rounded-tr-3xl"
              style={{ borderColor: colors.primary, filter: 'drop-shadow(0 0 8px rgba(222, 183, 255, 0.8))' }}
            />
            <div 
              className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 rounded-tl-3xl"
              style={{ borderColor: colors.primary, filter: 'drop-shadow(0 0 8px rgba(222, 183, 255, 0.8))' }}
            />
            <div 
              className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 rounded-br-3xl"
              style={{ borderColor: colors.primary, filter: 'drop-shadow(0 0 8px rgba(222, 183, 255, 0.8))' }}
            />
            <div 
              className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 rounded-bl-3xl"
              style={{ borderColor: colors.primary, filter: 'drop-shadow(0 0 8px rgba(222, 183, 255, 0.8))' }}
            />

            {/* Scan Line Animation */}
            <div 
              className="absolute w-full h-0.5 animate-pulse"
              style={{ 
                background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)`,
                top: '50%',
                animation: 'scan 3s infinite ease-in-out',
              }}
            />
          </div>

          {/* Instructions */}
          <div className="absolute bottom-20 left-0 right-0 flex flex-col items-center gap-4 px-8 text-center">
            <p 
              className="text-lg font-bold"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
            >
              סרוק קוד QR לביצוע תשלום
            </p>
            <p className="text-sm max-w-[280px]" style={{ color: colors.onSurfaceVariant }}>
              מקם את הקוד בתוך המסגרת כדי להתחיל בתהליך התשלום המאובטח
            </p>
          </div>
        </main>

        {/* Bottom Actions */}
        <footer 
          className="p-8 pb-12 flex flex-col items-center gap-6"
          style={{ background: `linear-gradient(to top, ${colors.surface}, ${colors.surface}CC, transparent)` }}
        >
          <div className="flex gap-8">
            {/* Flashlight */}
            <button className="group flex flex-col items-center gap-2">
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center transition-all group-hover:bg-[#7b2fbe]"
                style={{ backgroundColor: colors.surfaceContainerHighest }}
              >
                <svg className="w-6 h-6 transition-colors group-hover:text-[#deb7ff]" fill="none" viewBox="0 0 24 24" stroke={colors.onSurfaceVariant} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <span className="text-[10px]" style={{ color: colors.onSurfaceVariant }}>פנס</span>
            </button>

            {/* Gallery */}
            <button className="group flex flex-col items-center gap-2">
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center transition-all group-hover:bg-[#7b2fbe]"
                style={{ backgroundColor: colors.surfaceContainerHighest }}
              >
                <svg className="w-6 h-6 transition-colors group-hover:text-[#deb7ff]" fill="none" viewBox="0 0 24 24" stroke={colors.onSurfaceVariant} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-[10px]" style={{ color: colors.onSurfaceVariant }}>גלריה</span>
            </button>
          </div>

          {/* My QR Card */}
          <Link 
            href="/receive"
            className="w-full max-w-sm rounded-2xl p-4 flex items-center justify-between border"
            style={{ 
              backgroundColor: `${colors.surfaceContainer}66`,
              backdropFilter: 'blur(24px)',
              borderColor: `${colors.outlineVariant}1A`,
            }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: colors.surfaceContainerHighest }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="text-right">
                <p className="text-xs" style={{ color: colors.onSurfaceVariant }}>הקוד שלי</p>
                <p className="text-sm font-bold">הצג קוד לקבלת תשלום</p>
              </div>
            </div>
            <svg className="w-5 h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke={colors.onSurfaceVariant} strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </footer>
      </div>

      {/* Ambient Glow */}
      <div 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ backgroundColor: `${colors.primary}0D`, filter: 'blur(120px)' }}
      />

      <style jsx>{`
        @keyframes scan {
          0% { top: 10%; opacity: 0; }
          50% { top: 50%; opacity: 1; }
          100% { top: 90%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
