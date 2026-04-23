'use client';

import Link from 'next/link';

const colors = {
  primary: '#deb7ff',
  primaryContainer: '#7b2fbe',
  surface: '#121222',
  surfaceContainerLow: '#1a1a2b',
  onSurface: '#e3e0f8',
  onSurfaceVariant: '#cfc2d5',
};

interface BusinessHeaderProps {
  title?: string;
  showBack?: boolean;
  backHref?: string;
}

export default function BusinessHeader({ 
  title = 'ניהול עסקי', 
  showBack = false,
  backHref = '/business'
}: BusinessHeaderProps) {
  return (
    <header 
      className="fixed top-0 left-0 right-0 mx-auto max-w-[430px] z-50 flex items-center justify-between px-6 py-4"
      style={{ backgroundColor: colors.surfaceContainerLow }}
    >
      <div className="flex items-center gap-3">
        {showBack ? (
          <Link 
            href={backHref}
            className="p-2 rounded-xl transition-colors hover:bg-[#333345]"
            style={{ color: colors.primary }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        ) : (
          <div 
            className="p-2 rounded-xl"
            style={{ backgroundColor: `${colors.primaryContainer}33`, color: colors.primary }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        )}
        <h1 
          className="font-bold text-lg"
          style={{ color: colors.onSurface, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        >
          {title}
        </h1>
      </div>
      
      {/* Personal Account Switch Button */}
      <Link 
        href="/"
        className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full border transition-all hover:scale-105 active:scale-95"
        style={{ 
          borderColor: `${colors.primary}40`, 
          color: colors.primary,
          backgroundColor: `${colors.primaryContainer}1A`,
        }}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        אישי
      </Link>
    </header>
  );
}
