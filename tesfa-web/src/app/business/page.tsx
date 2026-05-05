'use client';

import { useState, useEffect } from 'react';
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
  surfaceContainerHigh: '#29283a',
  surfaceContainerHighest: '#333345',
  onSurface: '#e3e0f8',
  onSurfaceVariant: '#cfc2d5',
  success: '#4CAF50',
};

interface Business {
  id: string;
  businessName: string;
  businessType: string;
  isApproved: boolean;
}

const menuItems = [
  { 
    icon: 'transactions', 
    label: 'עסקאות נכנסות', 
    description: 'צפייה בתשלומים מלקוחות',
    href: '/business/transactions',
    color: 'primary',
  },
  { 
    icon: 'refunds', 
    label: 'ניהול זיכויים', 
    description: 'החזרות כספיות ללקוחות',
    href: '/business/refunds',
    color: 'secondary',
  },
  { 
    icon: 'stats', 
    label: 'סטטיסטיקה', 
    description: 'נתונים וגרפים עסקיים',
    href: '/business/stats',
    color: 'tertiary',
  },
  { 
    icon: 'edit', 
    label: 'עריכת פרופיל עסקי', 
    description: 'שינוי פרטי העסק',
    href: '/business/edit',
    color: 'primary',
  },
  { 
    icon: 'api', 
    label: 'מפתח API', 
    description: 'חיבור מערכות חיצוניות',
    href: '/business/api-key',
    color: 'secondary',
  },
  { 
    icon: 'payroll', 
    label: 'תשלום לעובדים', 
    description: 'העברת משכורות',
    href: '/payroll',
    color: 'tertiary',
  },
];

export default function BusinessPage() {
  // Mock state - no Web3
  const [user, setUser] = useState<{ id?: string; fullName?: string; email?: string } | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [business, setBusiness] = useState<Business | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showRegisterPrompt, setShowRegisterPrompt] = useState(false);

  useEffect(() => {
    async function checkBusiness() {
      const savedUser = localStorage.getItem('currentUser');
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      
      if (!isLoggedIn || !savedUser) {
        setIsLoading(false);
        return;
      }
      
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setAuthenticated(true);

      try {
        const response = await fetch(`/api/business?userId=${userData.id}`);
        const data = await response.json();
        
        if (data.hasBusiness && data.business) {
          setBusiness(data.business);
        } else {
          setShowRegisterPrompt(true);
        }
      } catch (error) {
        console.error('Error checking business:', error);
        setShowRegisterPrompt(true);
      } finally {
        setIsLoading(false);
      }
    }

    checkBusiness();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: colors.surface }}
      >
        <div 
          className="animate-spin w-8 h-8 border-2 border-t-transparent rounded-full"
          style={{ borderColor: colors.primary }}
        />
      </div>
    );
  }

  // Not authenticated
  if (!authenticated) {
    return (
      <div 
        dir="rtl"
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ backgroundColor: colors.surface, color: colors.onSurface }}
      >
        <div 
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: `${colors.primaryContainer}33` }}
        >
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">גישה לעסקים</h1>
        <p className="text-center mb-8" style={{ color: colors.onSurfaceVariant }}>
          יש להתחבר כדי לגשת לניהול העסק
        </p>
        <Link
          href="/"
          className="px-8 py-3 rounded-full font-bold"
          style={{ backgroundColor: colors.primaryContainer, color: 'white' }}
        >
          חזרה לדף הבית
        </Link>
      </div>
    );
  }

  // No business - show registration prompt
  if (showRegisterPrompt || !business) {
    return (
      <div 
        dir="rtl"
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ backgroundColor: colors.surface, color: colors.onSurface }}
      >
        <div 
          className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: `${colors.primaryContainer}33` }}
        >
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-3">פתח חשבון עסקי</h1>
        <p className="text-center mb-8 max-w-xs" style={{ color: colors.onSurfaceVariant }}>
          הצטרף לקהילת העסקים של TESFA וקבל תשלומים ב-TSF מלקוחות
        </p>
        
        <div className="space-y-4 w-full max-w-xs">
          <Link
            href="/business/register"
            className="block w-full py-4 rounded-full font-bold text-center text-white"
            style={{ background: `linear-gradient(to left, ${colors.primaryContainer}, #6107ba)` }}
          >
            רשום עסק חדש
          </Link>
          
          <Link
            href="/profile"
            className="block w-full py-4 rounded-full font-bold text-center border"
            style={{ borderColor: colors.primaryContainer, color: colors.primary }}
          >
            חזרה לפרופיל
          </Link>
        </div>

        {/* Benefits */}
        <div className="mt-12 space-y-4 text-center">
          <h3 className="font-bold mb-4" style={{ color: colors.onSurfaceVariant }}>למה להצטרף?</h3>
          <div className="flex items-center gap-3 justify-center">
            <span style={{ color: colors.success }}>✓</span>
            <span className="text-sm">קבל תשלומים ב-TSF מהלקוחות</span>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <span style={{ color: colors.success }}>✓</span>
            <span className="text-sm">הנפק זיכויים בקלות</span>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <span style={{ color: colors.success }}>✓</span>
            <span className="text-sm">ניהול עובדים ומשכורות</span>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <span style={{ color: colors.success }}>✓</span>
            <span className="text-sm">סטטיסטיקות ודוחות</span>
          </div>
        </div>
      </div>
    );
  }

  // Has business - show dashboard
  return (
    <div 
      className="min-h-screen pb-32"
      style={{ backgroundColor: colors.surface, color: colors.onSurface }}
    >
      <BusinessHeader title={business.businessName} />

      <main className="pt-24 px-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div 
            className="p-5 rounded-2xl border"
            style={{ backgroundColor: colors.surfaceContainerLow, borderColor: `${colors.primaryContainer}33` }}
          >
            <div className="text-xs mb-1" style={{ color: colors.onSurfaceVariant }}>יתרה עסקית</div>
            <div 
              className="text-2xl font-bold"
              style={{ color: colors.primary, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              ₪24,850
            </div>
          </div>
          <div 
            className="p-5 rounded-2xl border"
            style={{ backgroundColor: colors.surfaceContainerLow, borderColor: `${colors.success}33` }}
          >
            <div className="text-xs mb-1" style={{ color: colors.onSurfaceVariant }}>הכנסות החודש</div>
            <div 
              className="text-2xl font-bold"
              style={{ color: colors.success, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              +₪12,340
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          {menuItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="flex items-center justify-between p-4 rounded-2xl transition-colors hover:bg-[#29283a] group"
              style={{ backgroundColor: colors.surfaceContainerLow }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={colors.onSurfaceVariant} strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <div className="flex items-center gap-4 flex-1">
                <div className="flex-1 text-right">
                  <div className="font-bold mb-0.5">{item.label}</div>
                  <div className="text-xs" style={{ color: colors.onSurfaceVariant }}>{item.description}</div>
                </div>
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ 
                    backgroundColor: item.color === 'primary' 
                      ? `${colors.primaryContainer}33` 
                      : item.color === 'secondary'
                        ? `${colors.secondary}1A`
                        : `${colors.tertiary}1A`,
                  }}
                >
                  {item.icon === 'transactions' && (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  )}
                  {item.icon === 'refunds' && (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={colors.secondary} strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  )}
                  {item.icon === 'stats' && (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={colors.tertiary} strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  )}
                  {item.icon === 'edit' && (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  )}
                  {item.icon === 'api' && (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={colors.secondary} strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  )}
                  {item.icon === 'payroll' && (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={colors.tertiary} strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <BusinessNav />
    </div>
  );
}
