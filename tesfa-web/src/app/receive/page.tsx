'use client';

import Link from 'next/link';
import { useAccount } from 'wagmi';

const colors = {
  primary: '#deb7ff',
  primaryContainer: '#7b2fbe',
  secondaryContainer: '#6107ba',
  onPrimary: '#4a007f',
  surface: '#121222',
  surfaceContainerLow: '#1a1a2b',
  surfaceContainerHighest: '#333345',
  onSurface: '#e3e0f8',
  onSurfaceVariant: '#cfc2d5',
  outlineVariant: '#4c4353',
};

export default function ReceivePage() {
  const { address } = useAccount();
  
  const truncatedAddress = address 
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : '';

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
    }
  };

  return (
    <div 
      className="min-h-screen pb-32"
      style={{ backgroundColor: colors.surface, color: colors.onSurface }}
    >
      {/* Header */}
      <header 
        className="fixed top-0 left-0 right-0 mx-auto max-w-[430px] z-50 flex flex-row-reverse justify-between items-center px-6 h-16"
        style={{ backgroundColor: colors.surface }}
      >
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full transition-colors hover:bg-[#333345]" style={{ color: colors.primary }}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <h1 
          className="text-2xl font-black tracking-tight"
          style={{ color: colors.primary, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        >
          TESFA
        </h1>
        <Link 
          href="/"
          className="w-10 h-10 rounded-full overflow-hidden border-2 flex items-center justify-center"
          style={{ borderColor: `${colors.outlineVariant}33` }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={colors.onSurfaceVariant} strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </Link>
      </header>

      {/* Main Content */}
      <main className="pt-24 px-6 flex flex-col items-center max-w-md mx-auto">
        {/* Section Header */}
        <div className="w-full text-right mb-8">
          <h2 
            className="text-[1.75rem] font-bold mb-2"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            קבלת TSF
          </h2>
          <p className="leading-relaxed" style={{ color: colors.onSurfaceVariant }}>
            שתף את הכתובת שלך או את קוד ה-QR כדי לקבל תשלומים בתוך קהילת TESFA.
          </p>
        </div>

        {/* QR Code Card */}
        <div 
          className="w-full aspect-square rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden"
          style={{ backgroundColor: colors.surfaceContainerLow }}
        >
          {/* Glow Effects */}
          <div 
            className="absolute -top-24 -right-24 w-64 h-64 rounded-full"
            style={{ backgroundColor: `${colors.primary}1A`, filter: 'blur(80px)' }}
          />
          <div 
            className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full"
            style={{ backgroundColor: `${colors.secondaryContainer}1A`, filter: 'blur(80px)' }}
          />

          {/* QR Container */}
          <div 
            className="relative z-10 w-full aspect-square rounded-2xl p-6 flex items-center justify-center"
            style={{ 
              backgroundColor: colors.surfaceContainerHighest,
              boxShadow: '0px 0px 40px rgba(222,183,255,0.08)',
            }}
          >
            <div className="w-full h-full bg-white rounded-lg p-4 relative flex items-center justify-center">
              {/* Placeholder QR Code */}
              <div className="w-full h-full grid grid-cols-8 gap-1">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div 
                    key={i}
                    className="aspect-square rounded-sm"
                    style={{ 
                      backgroundColor: Math.random() > 0.5 ? '#000' : '#fff',
                    }}
                  />
                ))}
              </div>
              {/* Logo in center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-1 rounded">
                  <div 
                    className="w-8 h-8 rounded flex items-center justify-center"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <span className="text-xs font-black" style={{ color: colors.onPrimary }}>T</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wallet Address Section */}
        <div className="w-full mt-10 space-y-6">
          <div 
            className="p-5 rounded-2xl border text-center relative overflow-hidden"
            style={{ 
              backgroundColor: colors.surfaceContainerLow,
              borderColor: `${colors.outlineVariant}1A`,
            }}
          >
            <span 
              className="block text-sm mb-2 font-bold tracking-widest uppercase"
              style={{ color: colors.primary }}
            >
              כתובת הארנק שלך
            </span>
            <code 
              className="font-mono text-lg break-all select-all block py-2"
              style={{ color: colors.onSurface }}
            >
              {truncatedAddress}
            </code>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={copyAddress}
              className="flex items-center justify-center gap-3 rounded-full py-4 px-6 font-bold transition-all active:scale-95 shadow-lg"
              style={{ 
                background: `linear-gradient(to right, ${colors.primaryContainer}, ${colors.secondaryContainer})`,
                color: colors.onPrimary,
              }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>העתק</span>
            </button>
            <button 
              className="flex items-center justify-center gap-3 border rounded-full py-4 px-6 font-bold transition-all active:scale-95"
              style={{ 
                borderColor: `${colors.primary}66`,
                color: colors.primary,
                backgroundColor: `${colors.primary}0D`,
              }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>שתף קוד</span>
            </button>
          </div>
        </div>
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
        <Link href="/activity" className="flex flex-col items-center justify-center opacity-60 hover:opacity-100 scale-90 transition-all" style={{ color: colors.onSurfaceVariant }}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span className="text-[10px] font-bold mt-1">פעילות</span>
        </Link>
        <Link href="/directory" className="flex flex-col items-center justify-center opacity-60 hover:opacity-100 scale-90 transition-all" style={{ color: colors.onSurfaceVariant }}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span className="text-[10px] font-bold mt-1">עסקים</span>
        </Link>
        <div className="flex flex-col items-center justify-center scale-90" style={{ color: colors.primary, filter: 'drop-shadow(0 0 8px rgba(222,183,255,0.6))' }}>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          <span className="text-[10px] font-bold mt-1">פרופיל</span>
        </div>
      </nav>
    </div>
  );
}
