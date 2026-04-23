'use client';

import Link from 'next/link';
import { usePrivy, useWallets } from '@privy-io/react-auth';

const colors = {
  primary: '#deb7ff',
  primaryContainer: '#7b2fbe',
  secondaryContainer: '#6107ba',
  surface: '#121222',
  surfaceContainerLow: '#1a1a2b',
  surfaceContainerHighest: '#333345',
  onSurface: '#e3e0f8',
  onSurfaceVariant: '#cfc2d5',
  outlineVariant: '#4c4353',
};

const menuItems = [
  { icon: 'business', label: 'ניהול חשבון עסקי', href: '/business', highlight: true },
  { icon: 'qr_code', label: 'הקוד שלי', href: '/receive' },
  { icon: 'invite', label: 'הזמן חברים', href: '/invite' },
  { icon: 'notifications', label: 'התראות', href: '/settings/notifications' },
  { icon: 'settings', label: 'הגדרות', href: '/settings/profile' },
  { icon: 'language', label: 'שפת ממשק', href: '/settings/language' },
  { icon: 'reports', label: 'דוחות', href: '/admin/reports' },
  { icon: 'security', label: 'אבטחה ופרטיות', href: '/settings/delete-account' },
];

export default function ProfilePage() {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const { wallets } = useWallets();
  
  const embeddedWallet = wallets.find(w => w.walletClientType === 'privy') || wallets[0];
  const address = embeddedWallet?.address;
  const isConnected = ready && authenticated && !!address;
  
  const truncatedAddress = address 
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : '';
  
  const displayName = user?.email?.address || user?.google?.email || 'משתמש TESFA';

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
          style={{ background: `radial-gradient(circle, ${colors.secondaryContainer}, transparent)`, animationDuration: '3s' }}
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
        {/* Profile Card */}
        <div 
          className="rounded-2xl p-6 mb-8 relative overflow-hidden"
          style={{ backgroundColor: colors.surfaceContainerLow }}
        >
          {/* Glow */}
          <div 
            className="absolute -top-20 -right-20 w-48 h-48 rounded-full"
            style={{ backgroundColor: `${colors.primaryContainer}33`, filter: 'blur(60px)' }}
          />
          
          <div className="relative z-10 flex items-center gap-4">
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center border-2"
              style={{ 
                backgroundColor: colors.surfaceContainerHighest,
                borderColor: colors.primaryContainer,
              }}
            >
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex-1 text-right">
              <h2 className="text-xl font-bold mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {isConnected ? displayName : 'אורח'}
              </h2>
              {isConnected && (
                <p className="text-sm font-mono" style={{ color: colors.onSurfaceVariant }}>
                  {truncatedAddress}
                </p>
              )}
            </div>
          </div>

          {/* Connect/Disconnect Button */}
          <div className="mt-6">
            {isConnected ? (
              <Link
                href="/settings/profile"
                className="w-full block text-center py-3 rounded-full font-bold border transition-all active:scale-95"
                style={{ 
                  borderColor: `${colors.primary}40`,
                  color: colors.primary,
                }}
              >
                ערוך פרופיל
              </Link>
            ) : (
              <button
                onClick={login}
                className="w-full py-3 rounded-full font-bold text-white transition-all active:scale-95"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.primaryContainer}, ${colors.secondaryContainer})`,
                }}
              >
                התחברות
              </button>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center justify-between p-4 rounded-2xl transition-colors hover:bg-[#1e1e2f] ${item.highlight ? 'border border-[#7b2fbe]/30' : ''}`}
              style={{ 
                backgroundColor: item.highlight 
                  ? `linear-gradient(135deg, ${colors.surfaceContainerLow}, ${colors.primaryContainer}1A)` 
                  : colors.surfaceContainerLow,
                background: item.highlight 
                  ? `linear-gradient(135deg, ${colors.surfaceContainerLow}, rgba(123, 47, 190, 0.1))` 
                  : colors.surfaceContainerLow,
              }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={colors.onSurfaceVariant} strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <div className="flex items-center gap-3">
                <span className={`font-medium ${item.highlight ? 'text-[#deb7ff]' : ''}`}>{item.label}</span>
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ 
                    backgroundColor: item.highlight 
                      ? colors.primaryContainer 
                      : colors.surfaceContainerHighest,
                  }}
                >
                  {item.icon === 'business' && (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={item.highlight ? '#fff' : colors.primary} strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  )}
                  {item.icon === 'invite' && (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  )}
                  {item.icon === 'qr_code' && (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                  )}
                  {item.icon === 'settings' && (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                  {item.icon === 'security' && (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  )}
                  {item.icon === 'notifications' && (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  )}
                  {item.icon === 'language' && (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                  )}
                  {item.icon === 'reports' && (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Logout */}
        {isConnected && (
          <button
            onClick={logout}
            className="w-full mt-8 py-4 rounded-2xl font-bold text-[#ffb4ab] transition-colors hover:bg-[#93000a1A]"
            style={{ backgroundColor: colors.surfaceContainerLow }}
          >
            התנתק
          </button>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav 
        className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto z-50 rounded-t-[2rem] flex flex-row-reverse justify-around items-center px-4 h-20"
        style={{ 
          backgroundColor: 'rgba(30, 30, 47, 0.9)',
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
