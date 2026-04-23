'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const colors = {
  primary: '#deb7ff',
  primaryContainer: '#7b2fbe',
  onSurfaceVariant: '#cfc2d5',
};

export default function BusinessNav() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    if (path === '/business') {
      return pathname === '/business';
    }
    return pathname.startsWith(path);
  };

  const navItems = [
    { 
      href: '/business', 
      label: 'ראשי',
      icon: (active: boolean) => (
        <svg className="w-6 h-6" fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    { 
      href: '/business/transactions', 
      label: 'עסקאות',
      icon: (active: boolean) => (
        <svg className="w-6 h-6" fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    { 
      href: '/business/stats', 
      label: 'סטטיסטיקה',
      icon: (active: boolean) => (
        <svg className="w-6 h-6" fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    { 
      href: '/business/refunds', 
      label: 'זיכויים',
      icon: (active: boolean) => (
        <svg className="w-6 h-6" fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto z-50 rounded-t-[32px] flex justify-around items-center px-4 pb-6 pt-3"
      style={{ 
        backgroundColor: 'rgba(30, 30, 47, 0.95)',
        backdropFilter: 'blur(24px)',
        boxShadow: '0 -8px 40px rgba(222, 183, 255, 0.15)',
      }}
    >
      {navItems.map((item) => {
        const active = isActive(item.href);
        return (
          <Link 
            key={item.href}
            href={item.href} 
            className="flex flex-col items-center justify-center transition-all active:scale-90"
            style={{ color: active ? colors.primary : colors.onSurfaceVariant }}
          >
            {active ? (
              <div 
                className="flex flex-col items-center justify-center px-4 py-1 rounded-full"
                style={{ backgroundColor: `${colors.primaryContainer}33` }}
              >
                {item.icon(active)}
                <span className="text-[10px] font-medium mt-1">{item.label}</span>
              </div>
            ) : (
              <>
                {item.icon(active)}
                <span className="text-[10px] font-medium mt-1">{item.label}</span>
              </>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
