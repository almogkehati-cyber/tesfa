'use client';

import Link from 'next/link';
import { useState } from 'react';
import BusinessHeader from '@/components/BusinessHeader';
import BusinessNav from '@/components/BusinessNav';

const colors = {
  primary: '#deb7ff',
  primaryContainer: '#7b2fbe',
  secondaryContainer: '#6107ba',
  surface: '#121222',
  surfaceContainer: '#1e1e2f',
  surfaceContainerLow: '#1a1a2b',
  surfaceContainerHighest: '#333345',
  onSurface: '#e3e0f8',
  onSurfaceVariant: '#cfc2d5',
  outlineVariant: '#4c4353',
};

const recentContacts: { name: string; initials: string }[] = [];

const employees: { name: string; role: string; initials: string }[] = [];

export default function PayrollPage() {
  const [amount, setAmount] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div 
      className="min-h-screen pb-44"
      style={{ backgroundColor: colors.surface, color: colors.onSurface }}
    >
      <BusinessHeader title="תשלום לעובד" showBack backHref="/business" />

      <main className="pt-24 px-6 max-w-lg mx-auto">
        {/* Amount Input */}
        <section className="mb-12 text-center">
          <label className="block text-sm font-medium mb-4" style={{ color: colors.onSurfaceVariant }}>
            סכום לתשלום ב-TSF
          </label>
          <div className="flex flex-col items-center">
            <div className="flex items-baseline gap-2">
              <span 
                className="text-4xl font-extrabold"
                style={{ color: colors.primary, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                TSF
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="bg-transparent border-none text-center text-6xl font-extrabold focus:ring-0 focus:outline-none w-full max-w-[200px]"
                style={{ 
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  color: colors.onSurface,
                }}
                dir="ltr"
              />
            </div>
            <div 
              className="mt-4 px-4 py-1 rounded-full text-xs"
              style={{ backgroundColor: colors.surfaceContainerLow, color: colors.onSurfaceVariant }}
            >
              יתרה זמינה: 12,450.00 TSF
            </div>
          </div>
        </section>

        {/* Search */}
        <section className="space-y-6">
          <div className="relative">
            <svg 
              className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5"
              fill="none" viewBox="0 0 24 24" stroke={colors.onSurfaceVariant} strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="חיפוש עובד או איש קשר..."
              className="w-full h-14 rounded-xl pr-12 pl-4 border-none focus:ring-1 focus:outline-none"
              style={{ 
                backgroundColor: colors.surfaceContainer,
                color: colors.onSurface,
              }}
            />
          </div>

          {/* Recent Contacts */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-bold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                אנשי קשר אחרונים
              </h2>
              <button className="text-sm font-semibold" style={{ color: colors.primary }}>
                הצג הכל
              </button>
            </div>

            {/* Horizontal Scroll */}
            <div className="flex flex-row gap-4 overflow-x-auto pb-2 no-scrollbar">
              {recentContacts.map((contact, i) => (
                <div key={i} className="flex-shrink-0 flex flex-col items-center gap-2">
                  <div 
                    className="w-16 h-16 rounded-full p-0.5"
                    style={{ 
                      background: i === 0 
                        ? `linear-gradient(to tr, ${colors.primaryContainer}, ${colors.secondaryContainer})`
                        : colors.surfaceContainerHighest,
                    }}
                  >
                    <div 
                      className="w-full h-full rounded-full flex items-center justify-center font-bold"
                      style={{ backgroundColor: colors.surface, color: colors.primary }}
                    >
                      {contact.initials}
                    </div>
                  </div>
                  <span className="text-xs font-medium" style={{ color: colors.onSurfaceVariant }}>
                    {contact.name}
                  </span>
                </div>
              ))}
              {/* Add New */}
              <div className="flex-shrink-0 flex flex-col items-center gap-2">
                <button 
                  className="w-16 h-16 rounded-full border border-dashed flex items-center justify-center"
                  style={{ borderColor: colors.outlineVariant, color: colors.primary }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <span className="text-xs font-medium" style={{ color: colors.onSurfaceVariant }}>
                  חדש
                </span>
              </div>
            </div>
          </div>

          {/* Employees List */}
          <div 
            className="rounded-2xl overflow-hidden"
            style={{ backgroundColor: colors.surfaceContainerLow }}
          >
            <div className="p-4 border-b" style={{ borderColor: `${colors.outlineVariant}1A` }}>
              <h3 className="text-xs font-bold tracking-wider" style={{ color: colors.onSurfaceVariant }}>
                עובדים פעילים
              </h3>
            </div>
            <div className="divide-y" style={{ borderColor: `${colors.outlineVariant}1A` }}>
              {employees.map((emp, i) => (
                <Link
                  key={i}
                  href="/payroll/confirm"
                  className="flex items-center justify-between p-4 transition-colors hover:bg-[#333345] cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center font-bold"
                      style={{ backgroundColor: colors.primaryContainer, color: '#e4c4ff' }}
                    >
                      {emp.initials}
                    </div>
                    <div>
                      <p className="font-bold">{emp.name}</p>
                      <p className="text-xs" style={{ color: colors.onSurfaceVariant }}>{emp.role}</p>
                    </div>
                  </div>
                  <svg 
                    className="w-5 h-5 transition-colors group-hover:text-[#deb7ff]"
                    fill="none" viewBox="0 0 24 24" 
                    stroke={colors.onSurfaceVariant} strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Pay Button */}
      <div className="fixed bottom-28 left-0 right-0 px-6 max-w-[430px] mx-auto z-40">
        <Link
          href="/payroll/confirm"
          className="w-full py-4 rounded-full text-white font-bold text-lg shadow-xl flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98]"
          style={{ 
            background: `linear-gradient(to left, ${colors.primaryContainer}, #9b59f5)`,
          }}
        >
          <span>בצע תשלום</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </Link>
      </div>

      <BusinessNav />
    </div>
  );
}
