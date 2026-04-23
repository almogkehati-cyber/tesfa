'use client';

import { useState, useEffect } from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { TESFA_CONTRACT_ADDRESS, TESFA_ABI } from '@/config/contracts';
import InstallButton from '@/components/InstallButton';
import MobileContainer from '@/components/MobileContainer';
import Link from 'next/link';

// Exact colors from תספה/home_dashboard design
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
};

export default function Home() {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const { wallets } = useWallets();
  
  // Onboarding state
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isCheckingRegistration, setIsCheckingRegistration] = useState(false);
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [onboardingError, setOnboardingError] = useState('');
  
  // Get the embedded wallet or first available wallet
  const embeddedWallet = wallets.find(w => w.walletClientType === 'privy') || wallets[0];
  const address = embeddedWallet?.address as `0x${string}` | undefined;
  const isConnected = ready && authenticated && !!address;

  // Check if user is registered in our database
  useEffect(() => {
    async function checkRegistration() {
      if (!ready || !authenticated || !user?.id || !address) {
        setShowOnboarding(false);
        return;
      }

      setIsCheckingRegistration(true);
      
      try {
        const response = await fetch(`/api/users?id=${user.id}`);
        const users = await response.json();
        
        // Check if user exists in the array
        const existingUser = Array.isArray(users) 
          ? users.find((u: { id: string }) => u.id === user.id)
          : null;
        
        if (!existingUser) {
          // User not in database, show onboarding
          setShowOnboarding(true);
        } else {
          setShowOnboarding(false);
        }
      } catch (error) {
        console.error('Error checking registration:', error);
        // On error, assume user needs onboarding
        setShowOnboarding(true);
      } finally {
        setIsCheckingRegistration(false);
      }
    }

    checkRegistration();
  }, [ready, authenticated, user?.id, address]);

  // Handle onboarding submission
  const handleOnboardingSubmit = async () => {
    if (!fullName.trim()) {
      setOnboardingError('נא להזין שם מלא');
      return;
    }

    if (!user?.id || !address) {
      setOnboardingError('שגיאה בחיבור. נסה להתחבר מחדש.');
      return;
    }

    setIsSubmitting(true);
    setOnboardingError('');

    try {
      // Generate phone suffix from email or random
      const email = user.email?.address || user.google?.email;
      const phoneSuffix = email 
        ? email.slice(-4).replace(/[^0-9]/g, '').padStart(4, '0').slice(-4) || String(Math.floor(1000 + Math.random() * 9000))
        : String(Math.floor(1000 + Math.random() * 9000));

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: user.id,
          walletAddress: address,
          fullName: fullName.trim(),
          phoneSuffix,
        }),
      });

      if (response.ok) {
        setShowOnboarding(false);
        setFullName('');
      } else {
        const data = await response.json();
        setOnboardingError(data.error || 'שגיאה בשמירת הפרטים');
      }
    } catch (error) {
      console.error('Error saving user:', error);
      setOnboardingError('שגיאה בחיבור לשרת');
    } finally {
      setIsSubmitting(false);
    }
  };

  const { data: balance, isLoading: balanceLoading } = useReadContract({
    address: TESFA_CONTRACT_ADDRESS,
    abi: TESFA_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  const formattedBalance = balance ? formatUnits(balance, 18) : '0.00';

  const activities: { icon: string; name: string; time: string; amount: string; positive: boolean; special: boolean }[] = [];

  return (
    <MobileContainer>
      <div 
        className="min-h-screen pb-[128px] relative overflow-hidden"
        style={{ backgroundColor: colors.background, color: colors.onSurface }}
      >
      {/* Onboarding Modal */}
      {showOnboarding && isConnected && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center px-6"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
        >
          <div 
            dir="rtl"
            className="w-full max-w-sm rounded-3xl p-8 relative overflow-hidden"
            style={{ backgroundColor: colors.surfaceContainerLow }}
          >
            {/* Glow effect */}
            <div 
              className="absolute -top-20 -right-20 w-40 h-40 rounded-full"
              style={{ backgroundColor: `${colors.primaryContainer}40`, filter: 'blur(60px)' }}
            />
            <div 
              className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full"
              style={{ backgroundColor: `${colors.secondaryContainer}30`, filter: 'blur(60px)' }}
            />
            
            <div className="relative z-10">
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(135deg, ${colors.primaryContainer}, #9B59F5)`,
                    boxShadow: '0 20px 50px -12px rgba(123, 47, 190, 0.4)',
                  }}
                >
                  <span className="text-3xl font-extrabold text-white">ט</span>
                </div>
              </div>

              {/* Title */}
              <h2 
                className="text-2xl font-bold text-center mb-2"
                style={{ color: colors.onSurface, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                ברוכים הבאים לטספה!
              </h2>
              <p 
                className="text-center text-sm mb-8"
                style={{ color: colors.onSurfaceVariant }}
              >
                ספר לנו קצת על עצמך כדי שנוכל להתאים את החוויה עבורך
              </p>

              {/* Error message */}
              {onboardingError && (
                <div 
                  className="mb-4 px-4 py-3 rounded-xl text-center text-sm"
                  style={{ backgroundColor: `${colors.error}1A`, color: colors.error }}
                >
                  {onboardingError}
                </div>
              )}

              {/* Name Input */}
              <div className="mb-6">
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: colors.onSurfaceVariant }}
                >
                  השם המלא שלך
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="לדוגמה: דוד כהן"
                  className="w-full h-14 px-4 rounded-xl border-none focus:ring-2 focus:outline-none text-right"
                  style={{ 
                    backgroundColor: colors.surfaceContainerHighest,
                    color: colors.onSurface,
                  }}
                  autoFocus
                />
                <p 
                  className="text-xs mt-2"
                  style={{ color: colors.onSurfaceVariant }}
                >
                  השם ישמש לזיהוי שלך בקהילת TESFA
                </p>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleOnboardingSubmit}
                disabled={isSubmitting || !fullName.trim()}
                className="w-full h-14 rounded-xl font-bold text-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.primaryContainer}, ${colors.secondaryContainer})`,
                  color: 'white',
                  boxShadow: '0 10px 30px -8px rgba(123, 47, 190, 0.4)',
                }}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    שומר...
                  </>
                ) : (
                  'המשך'
                )}
              </button>

              {/* Privacy note */}
              <p 
                className="text-center text-xs mt-4"
                style={{ color: colors.onSurfaceVariant }}
              >
                הפרטים שלך מאובטחים ולא ישותפו
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Loading overlay while checking registration */}
      {isCheckingRegistration && isConnected && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
        >
          <div className="flex flex-col items-center gap-4">
            <div 
              className="animate-spin w-10 h-10 border-3 border-t-transparent rounded-full"
              style={{ borderColor: colors.primary }}
            />
            <span style={{ color: colors.onSurface }}>טוען...</span>
          </div>
        </div>
      )}

      {/* Floating Bubbles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large bubble top right */}
        <div 
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-20 animate-pulse"
          style={{ background: `radial-gradient(circle, ${colors.primaryContainer}, transparent)` }}
        />
        {/* Medium bubble left */}
        <div 
          className="absolute top-1/4 -left-16 w-56 h-56 rounded-full opacity-15"
          style={{ background: `radial-gradient(circle, ${colors.primary}, transparent)` }}
        />
        {/* Small bubble bottom right */}
        <div 
          className="absolute bottom-1/3 right-8 w-32 h-32 rounded-full opacity-25 animate-bounce"
          style={{ background: `radial-gradient(circle, ${colors.secondaryContainer}, transparent)`, animationDuration: '3s' }}
        />
        {/* Tiny bubble middle */}
        <div 
          className="absolute top-1/2 left-1/3 w-20 h-20 rounded-full opacity-20 animate-pulse"
          style={{ background: `radial-gradient(circle, ${colors.primary}, transparent)`, animationDuration: '2s' }}
        />
        {/* Large bubble bottom left */}
        <div 
          className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-10"
          style={{ background: `radial-gradient(circle, ${colors.primaryContainer}, transparent)` }}
        />
      </div>

      {/* TopAppBar - Fixed */}
      <header 
        className="fixed top-0 left-0 right-0 mx-auto max-w-[430px] z-50 flex flex-row-reverse justify-between items-center px-6 h-16 transition-colors"
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
          {isConnected ? (
            <button
              onClick={logout}
              className="w-10 h-10 rounded-full overflow-hidden border-2 flex items-center justify-center cursor-pointer active:opacity-80 active:scale-95 duration-200"
              style={{ 
                borderColor: colors.primaryContainer,
                background: `linear-gradient(135deg, ${colors.primaryContainer}, #9B59F5)`,
              }}
            >
              <span className="text-white text-sm font-bold">
                {user?.email?.address?.[0]?.toUpperCase() || address?.slice(2, 4).toUpperCase()}
              </span>
            </button>
          ) : (
            <button
              onClick={login}
              className="w-10 h-10 rounded-full overflow-hidden border-2 flex items-center justify-center cursor-pointer active:opacity-80 active:scale-95 duration-200"
              style={{ borderColor: colors.primaryContainer }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          )}
          <button 
            className="text-2xl p-2 rounded-full transition-colors active:scale-95 duration-200 hover:bg-[#333345]"
            style={{ color: colors.primary }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 px-6 max-w-2xl mx-auto">
        {!isConnected ? (
          /* Disconnected State */
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
              style={{ 
                background: `linear-gradient(135deg, ${colors.primaryContainer}, #9B59F5)`,
                boxShadow: '0 20px 50px -12px rgba(123, 47, 190, 0.25)',
              }}
            >
              <span className="text-4xl font-extrabold text-white">ט</span>
            </div>
            
            <h1 
              className="text-2xl font-extrabold mb-2"
              style={{ color: colors.onSurface, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              ברוכים הבאים ל-TESFA
            </h1>
            <p 
              className="text-sm mb-8 max-w-[280px]"
              style={{ color: colors.onSurfaceVariant }}
            >
              מערכת כלכלית חברתית מבוססת בלוקצ&apos;יין לקהילה שלנו
            </p>

            <div 
              className="w-full max-w-sm rounded-2xl p-6"
              style={{ backgroundColor: colors.surfaceContainerLow }}
            >
              <button
                onClick={login}
                className="w-full py-4 rounded-2xl font-bold text-lg text-white active:opacity-80 transition-opacity"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.primaryContainer}, #9B59F5)`,
                  boxShadow: '0 20px 50px -12px rgba(123, 47, 190, 0.25)',
                }}
              >
                התחברות
              </button>
              <p className="text-center text-xs mt-4" style={{ color: colors.onSurfaceVariant }}>
                התחבר עם אימייל, גוגל או ארנק קריפטו
              </p>
            </div>
          </div>
        ) : (
          /* Connected State - Dashboard */
          <>
            {/* Balance Display - The Celestial Vault */}
            <section 
              className="mb-12 relative overflow-hidden rounded-2xl p-8"
              style={{ backgroundColor: colors.surfaceContainerLow }}
            >
              {/* Glow effects - blur 80px */}
              <div 
                className="absolute -top-24 -right-24 w-64 h-64 rounded-full"
                style={{ backgroundColor: `${colors.primaryContainer}33`, filter: 'blur(80px)' }}
              />
              <div 
                className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full"
                style={{ backgroundColor: `${colors.secondaryContainer}33`, filter: 'blur(80px)' }}
              />
              
              <div className="relative z-10 text-right">
                <p 
                  className="text-sm uppercase tracking-widest mb-2 opacity-70"
                  style={{ color: colors.onSurfaceVariant }}
                >
                  יתרה כוללת
                </p>
                <h1 
                  className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  {balanceLoading ? (
                    <span className="inline-block h-14 w-40 rounded-lg animate-pulse" style={{ backgroundColor: colors.surfaceContainerHighest }} />
                  ) : (
                    <>
                      {parseFloat(formattedBalance).toLocaleString('he-IL', { maximumFractionDigits: 2 })}{' '}
                      <span style={{ color: colors.primary }}>TSF</span>
                    </>
                  )}
                </h1>
                <div className="flex items-center justify-end gap-2 text-[#4CAF50] font-medium">
                  <span>בקרוב</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
            </section>

            {/* Action Grid - Bento Style */}
            <section className="grid grid-cols-4 gap-4 mb-12">
              {/* Send */}
              <Link href="/send" className="flex flex-col items-center gap-3 group">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                  style={{ backgroundColor: colors.surfaceContainerHighest, color: colors.primary }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                </div>
                <span className="font-medium text-sm" style={{ color: colors.onSurface }}>שלח</span>
              </Link>

              {/* Receive */}
              <Link href="/receive" className="flex flex-col items-center gap-3 group">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                  style={{ backgroundColor: colors.surfaceContainerHighest, color: colors.primary }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                  </svg>
                </div>
                <span className="font-medium text-sm" style={{ color: colors.onSurface }}>קבל</span>
              </Link>

              {/* UBI - Special */}
              <Link href="/ubi" className="flex flex-col items-center gap-3 group">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                  style={{ 
                    background: `linear-gradient(135deg, ${colors.primaryContainer}, ${colors.secondaryContainer})`,
                    color: colors.onPrimary,
                    boxShadow: '0 20px 50px -12px rgba(123, 47, 190, 0.25)',
                  }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <span className="font-bold text-sm" style={{ color: colors.onSurface }}>UBI</span>
              </Link>

              {/* Scan */}
              <Link href="/scan" className="flex flex-col items-center gap-3 group">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                  style={{ backgroundColor: colors.surfaceContainerHighest, color: colors.primary }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </div>
                <span className="font-medium text-sm" style={{ color: colors.onSurface }}>סרוק</span>
              </Link>
            </section>

            {/* Promotion Card */}
            <section 
              className="mb-12 rounded-2xl p-6 flex items-center justify-between overflow-hidden relative"
              style={{ backgroundColor: colors.surfaceContainerHigh }}
            >
              <div className="relative z-10">
                <h3 
                  className="text-lg font-bold mb-1"
                  style={{ color: colors.onSurface, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  המדריך המלא לקהילה
                </h3>
                <p className="text-sm" style={{ color: colors.onSurfaceVariant }}>
                  למד איך להפיק את המירב מ-TESFA
                </p>
              </div>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={colors.primaryFixed} strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </section>

            {/* Recent Activity */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 
                  className="text-xl font-bold"
                  style={{ color: colors.onSurface, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  פעילות אחרונה
                </h2>
                <button className="text-sm font-bold" style={{ color: colors.primary }}>הכל</button>
              </div>

              {activities.length > 0 ? (
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-2xl flex items-center justify-between hover:bg-[#1e1e2f] transition-colors"
                      style={{ backgroundColor: colors.surfaceContainerLow }}
                    >
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ 
                            backgroundColor: activity.special 
                              ? `${colors.primaryContainer}1A` 
                              : colors.surfaceContainerHighest,
                            color: activity.special ? colors.primary : colors.onSurfaceVariant,
                          }}
                        >
                          {activity.icon === 'coffee' && <span className="text-xl">☕</span>}
                          {activity.icon === 'stars' && <span className="text-xl">⭐</span>}
                          {activity.icon === 'shopping_bag' && <span className="text-xl">🛒</span>}
                        </div>
                        <div className="text-right">
                          <p className="font-bold" style={{ color: colors.onSurface }}>{activity.name}</p>
                          <p className="text-xs" style={{ color: colors.onSurfaceVariant }}>{activity.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p 
                          className="font-bold"
                          style={{ color: activity.positive ? colors.primary : colors.error }}
                        >
                          {activity.amount} TSF
                        </p>
                        <p className="text-[10px]" style={{ color: colors.onSurfaceVariant }}>הושלם</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div 
                  className="p-8 rounded-2xl text-center"
                  style={{ backgroundColor: colors.surfaceContainerLow }}
                >
                  <div 
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: `${colors.primaryContainer}1A` }}
                  >
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: colors.onSurface }}>בקרוב...</h3>
                  <p className="text-sm" style={{ color: colors.onSurfaceVariant }}>
                    הפעילויות שלך יופיעו כאן
                  </p>
                </div>
              )}
            </section>
          </>
        )}
      </main>

      {/* PWA Install Button */}
      <InstallButton />

      {/* Bottom Navigation Bar */}
      <nav 
        className="fixed bottom-0 left-0 right-0 mx-auto max-w-[430px] z-50 rounded-t-[2rem] flex flex-row-reverse justify-around items-center px-4 h-20"
        style={{ 
          backgroundColor: 'rgba(30, 30, 47, 0.8)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0px -10px 40px rgba(222,183,255,0.12)',
        }}
      >
        {/* Home - Active */}
        <Link 
          href="/"
          className="flex flex-col items-center justify-center scale-90 transition-all duration-300"
          style={{ color: colors.primary, filter: 'drop-shadow(0 0 8px rgba(222,183,255,0.6))' }}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
          <span className="text-[10px] font-bold mt-1">בית</span>
        </Link>

        {/* Activity */}
        <Link 
          href="/activity"
          className="flex flex-col items-center justify-center opacity-60 hover:opacity-100 scale-90 transition-all duration-300"
          style={{ color: colors.onSurfaceVariant }}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span className="text-[10px] font-bold mt-1">פעילות</span>
        </Link>

        {/* Businesses Directory */}
        <Link 
          href="/directory"
          className="flex flex-col items-center justify-center opacity-60 hover:opacity-100 scale-90 transition-all duration-300"
          style={{ color: colors.onSurfaceVariant }}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span className="text-[10px] font-bold mt-1">עסקים</span>
        </Link>

        {/* Profile */}
        <Link 
          href="/profile"
          className="flex flex-col items-center justify-center opacity-60 hover:opacity-100 scale-90 transition-all duration-300"
          style={{ color: colors.onSurfaceVariant }}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-[10px] font-bold mt-1">פרופיל</span>
        </Link>
      </nav>
      </div>
    </MobileContainer>
  );
}
