'use client';

import Link from 'next/link';
import BusinessHeader from '@/components/BusinessHeader';
import BusinessNav from '@/components/BusinessNav';

const colors = {
  primary: '#deb7ff',
  primaryContainer: '#7b2fbe',
  secondary: '#d7baff',
  secondaryContainer: '#6107ba',
  tertiary: '#fbba68',
  tertiaryContainer: '#7e4f00',
  surface: '#121222',
  surfaceContainerLow: '#1a1a2b',
  surfaceContainer: '#1e1e2f',
  surfaceContainerHigh: '#29283a',
  onSurface: '#e3e0f8',
  onSurfaceVariant: '#cfc2d5',
  outlineVariant: '#4c4353',
  success: '#4CAF50',
};

const transactions: { name: string; phone: string; amount: string; time: string; color?: string }[] = [];

const yesterdayTransactions: { name: string; phone: string; amount: string; time: string }[] = [];

export default function BusinessTransactionsPage() {
  return (
    <div 
      className="min-h-screen pb-32"
      style={{ backgroundColor: colors.surface, color: colors.onSurface }}
    >
      <BusinessHeader title="עסקאות" showBack backHref="/business" />

      <main className="pt-24 px-6 max-w-2xl mx-auto">
        {/* Header Section */}
        <section className="mb-8">
          <h2 
            className="text-[1.75rem] font-bold mb-2"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            עסקאות אחרונות
          </h2>
          <p className="text-sm" style={{ color: colors.onSurfaceVariant }}>
            מעקב אחר תשלומים נכנסים מלקוחות
          </p>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div 
            className="p-5 rounded-2xl border"
            style={{ backgroundColor: colors.surfaceContainerLow, borderColor: `${colors.outlineVariant}1A` }}
          >
            <div className="text-xs mb-1" style={{ color: colors.onSurfaceVariant }}>סה״כ היום</div>
            <div 
              className="text-2xl font-bold"
              style={{ color: colors.primary, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              ₪0
            </div>
          </div>
          <div 
            className="p-5 rounded-2xl border"
            style={{ backgroundColor: colors.surfaceContainerLow, borderColor: `${colors.outlineVariant}1A` }}
          >
            <div className="text-xs mb-1" style={{ color: colors.onSurfaceVariant }}>עסקאות</div>
            <div 
              className="text-2xl font-bold"
              style={{ color: colors.secondary, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              0
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="space-y-4">
          {transactions.length === 0 && yesterdayTransactions.length === 0 ? (
            <div 
              className="p-12 rounded-2xl text-center"
              style={{ backgroundColor: colors.surfaceContainerLow }}
            >
              <div 
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ backgroundColor: `${colors.primaryContainer}1A` }}
              >
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2" style={{ color: colors.onSurface }}>בקרוב...</h3>
              <p className="text-sm" style={{ color: colors.onSurfaceVariant }}>
                העסקאות שלך יופיעו כאן
              </p>
            </div>
          ) : (
            <>
              {/* Today */}
              <div className="flex items-center justify-between py-2">
                <span 
                  className="text-xs font-semibold tracking-wider"
                  style={{ color: colors.onSurfaceVariant }}
                >
                  היום
                </span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={colors.onSurfaceVariant} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>

              {transactions.map((tx, i) => (
                <div 
                  key={i}
                  className="flex items-center justify-between p-4 rounded-2xl transition-colors hover:bg-[#29283a] cursor-pointer group"
                  style={{ backgroundColor: colors.surfaceContainer }}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ 
                        backgroundColor: tx.color === 'primary' 
                          ? `${colors.primaryContainer}33` 
                          : tx.color === 'secondary' 
                            ? `${colors.secondaryContainer}33`
                            : `${colors.tertiaryContainer}33`,
                        color: tx.color === 'primary' 
                          ? colors.primary 
                          : tx.color === 'secondary' 
                            ? colors.secondary
                            : colors.tertiary,
                      }}
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold">{tx.name}</div>
                      <div className="text-xs" style={{ color: colors.onSurfaceVariant }}>נייד: {tx.phone}</div>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="font-bold" style={{ color: colors.success }}>{tx.amount}+</div>
                    <div className="text-xs" style={{ color: colors.onSurfaceVariant }}>{tx.time}</div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </main>

      <BusinessNav />
    </div>
  );
}
