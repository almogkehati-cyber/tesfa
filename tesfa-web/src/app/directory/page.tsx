'use client';

import { useState } from 'react';
import Link from 'next/link';

// Exact colors from design system
const colors = {
  primary: '#deb7ff',
  primaryContainer: '#7b2fbe',
  onPrimary: '#4a007f',
  tertiary: '#fbba68',
  surfaceContainer: '#1e1e2f',
  surfaceContainerLow: '#1a1a2b',
  surfaceContainerHigh: '#29283a',
  surfaceContainerHighest: '#333345',
  onSurface: '#e3e0f8',
  onSurfaceVariant: '#cfc2d5',
  background: '#121222',
  outlineVariant: '#4c4353',
  success: '#4CAF50',
};

const categories = ['הכל', 'מסעדות', 'מצרכים', 'שירותים', 'אופנה'];

const businesses: { id: number; name: string; category: string; location: string; rating: number; cashback: number; image: string; type: string; reviews?: number }[] = [];

export default function DirectoryPage() {
  const [activeCategory, setActiveCategory] = useState('הכל');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div 
      className="flex flex-col min-h-screen antialiased pb-[96px] relative overflow-hidden"
      style={{ backgroundColor: '#0A0A1A', color: colors.onSurface }}
    >
      {/* Floating Bubbles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 animate-pulse"
          style={{ background: `radial-gradient(circle, ${colors.primaryContainer}, transparent)` }}
        />
        <div 
          className="absolute top-1/2 -left-16 w-48 h-48 rounded-full opacity-15"
          style={{ background: `radial-gradient(circle, ${colors.primary}, transparent)` }}
        />
        <div 
          className="absolute bottom-1/3 right-8 w-32 h-32 rounded-full opacity-20 animate-bounce"
          style={{ background: `radial-gradient(circle, ${colors.primaryContainer}, transparent)`, animationDuration: '3s' }}
        />
      </div>

      {/* Safe Area Top */}
      <div className="h-[env(safe-area-inset-top)]" style={{ backgroundColor: colors.background }} />

      {/* Header - sticky */}
      <header 
        className="w-full sticky top-0 z-40 flex flex-row-reverse justify-between items-center px-[24px] py-[16px]"
        style={{ backgroundColor: colors.background }}
      >
        <div className="flex items-center gap-[12px]">
          <span 
            className="font-bold text-[24px] tracking-[-0.5px]"
            style={{ color: colors.primary, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            TESFA
          </span>
        </div>
        <div className="flex items-center gap-[16px]">
          <button 
            className="hover:opacity-80 transition-opacity active:scale-90"
            style={{ color: colors.onSurfaceVariant }}
          >
            <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <div 
            className="w-[40px] h-[40px] rounded-full flex items-center justify-center overflow-hidden border"
            style={{ backgroundColor: colors.surfaceContainerHighest, borderColor: `${colors.outlineVariant}33` }}
          >
            <span className="text-[20px]">👤</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-[24px] py-[16px]">
        {/* Search Bar */}
        <div className="mb-[32px]">
          <div className="relative group">
            <div 
              className="absolute inset-y-0 right-[16px] flex items-center pointer-events-none"
              style={{ color: colors.onSurfaceVariant }}
            >
              <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="חיפוש עסקים"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[56px] pr-[48px] pl-[24px] rounded-[16px] border-none focus:ring-2 transition-all text-right"
              style={{ 
                backgroundColor: colors.surfaceContainer,
                color: colors.onSurface,
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Category Chips */}
        <div className="flex overflow-x-auto gap-[12px] no-scrollbar mb-[32px] -mx-[24px] px-[24px]">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-[24px] py-[10px] rounded-full font-semibold whitespace-nowrap transition-colors ${
                activeCategory === category 
                  ? 'text-white shadow-lg' 
                  : 'hover:opacity-80'
              }`}
              style={{
                background: activeCategory === category 
                  ? `linear-gradient(135deg, ${colors.primaryContainer}, #9B59F5)` 
                  : colors.surfaceContainer,
                color: activeCategory === category ? 'white' : colors.onSurfaceVariant,
                boxShadow: activeCategory === category ? `0 8px 16px ${colors.primaryContainer}33` : 'none',
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Business Directory Heading */}
        <div className="flex justify-between items-end mb-[24px]">
          <h2 
            className="font-bold text-[20px]"
            style={{ color: colors.onSurface, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            עסקים מומלצים
          </h2>
          <button 
            className="text-[14px] font-semibold"
            style={{ color: colors.primary }}
          >
            ראה הכל
          </button>
        </div>

        {/* Business Grid */}
        <div className="flex flex-col gap-[24px]">
          {businesses.length === 0 ? (
            <div 
              className="p-12 rounded-2xl text-center"
              style={{ backgroundColor: colors.surfaceContainerLow }}
            >
              <div 
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ backgroundColor: `${colors.primaryContainer}1A` }}
              >
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2" style={{ color: colors.onSurface }}>בקרוב...</h3>
              <p className="text-sm" style={{ color: colors.onSurfaceVariant }}>
                עסקים שמקבלים TSF יופיעו כאן
              </p>
            </div>
          ) : null}
          {businesses.map((business) => (
            business.type === 'large' ? (
              /* Large Business Card */
              <div 
                key={business.id}
                className="rounded-[16px] overflow-hidden flex flex-col cursor-pointer active:scale-[0.98] transition-transform"
                style={{ 
                  background: 'rgba(30, 30, 47, 0.6)',
                  backdropFilter: 'blur(24px)',
                  border: `1px solid ${colors.outlineVariant}33`,
                }}
              >
                <div className="relative h-[192px] w-full overflow-hidden">
                  <img 
                    src={business.image} 
                    alt={business.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div 
                    className="absolute top-[16px] right-[16px] font-bold text-[12px] px-[12px] py-[6px] rounded-full flex items-center gap-[4px] shadow-xl"
                    style={{ backgroundColor: colors.success, color: 'white' }}
                  >
                    <span>✨</span>
                    {business.cashback}% Cashback
                  </div>
                </div>
                <div className="p-[20px] flex flex-col gap-[8px]">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 
                        className="font-bold text-[18px]"
                        style={{ color: colors.onSurface, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                      >
                        {business.name}
                      </h3>
                      <span 
                        className="text-[14px]"
                        style={{ color: colors.onSurfaceVariant }}
                      >
                        {business.category} • {business.location}
                      </span>
                    </div>
                    <div 
                      className="flex items-center gap-[4px] px-[8px] py-[4px] rounded-[8px]"
                      style={{ backgroundColor: colors.surfaceContainerHighest }}
                    >
                      <span style={{ color: colors.tertiary }}>⭐</span>
                      <span 
                        className="font-bold text-[14px]"
                        style={{ color: colors.onSurface }}
                      >
                        {business.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Compact Business Card */
              <div 
                key={business.id}
                className="rounded-[16px] p-[20px] flex gap-[16px] items-center cursor-pointer active:scale-[0.98] transition-transform"
                style={{ 
                  background: 'rgba(30, 30, 47, 0.6)',
                  backdropFilter: 'blur(24px)',
                  border: `1px solid ${colors.outlineVariant}33`,
                }}
              >
                <div className="w-[96px] h-[96px] rounded-[16px] overflow-hidden flex-shrink-0">
                  <img 
                    src={business.image} 
                    alt={business.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex-grow flex flex-col justify-between h-[96px]">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 
                        className="font-bold"
                        style={{ color: colors.onSurface, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                      >
                        {business.name}
                      </h3>
                      <div 
                        className="text-[10px] font-bold px-[8px] py-[4px] rounded-full border"
                        style={{ 
                          backgroundColor: `${colors.success}1A`,
                          color: colors.success,
                          borderColor: `${colors.success}33`,
                        }}
                      >
                        {business.cashback}% Cashback
                      </div>
                    </div>
                    <span 
                      className="text-[12px]"
                      style={{ color: colors.onSurfaceVariant }}
                    >
                      {business.category} • {business.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-[4px]">
                    <span style={{ color: colors.tertiary }}>⭐</span>
                    <span 
                      className="font-bold text-[12px]"
                      style={{ color: colors.onSurface }}
                    >
                      {business.rating} ({business.reviews} חוות דעת)
                    </span>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </main>

      {/* Bottom Navigation Bar */}
      <nav 
        className="fixed bottom-0 left-0 right-0 mx-auto max-w-[430px] z-50 rounded-t-[24px] flex flex-row-reverse justify-around items-center h-[80px] px-[16px] pb-[env(safe-area-inset-bottom)]"
        style={{ 
          backgroundColor: 'rgba(30, 30, 47, 0.8)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0px -4px 40px rgba(222,183,255,0.12)',
        }}
      >
        {/* Home */}
        <Link 
          href="/"
          className="flex flex-col items-center justify-center transition-colors"
          style={{ color: colors.onSurfaceVariant }}
        >
          <svg className="w-[24px] h-[24px] mb-[4px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-[10px] font-medium">בית</span>
        </Link>

        {/* Activity */}
        <Link 
          href="/activity"
          className="flex flex-col items-center justify-center transition-colors"
          style={{ color: colors.onSurfaceVariant }}
        >
          <svg className="w-[24px] h-[24px] mb-[4px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <span className="text-[10px] font-medium">פעילות</span>
        </Link>

        {/* Directory (Active) */}
        <Link 
          href="/directory"
          className="flex flex-col items-center justify-center transition-all duration-300 scale-110"
          style={{ 
            color: colors.primary,
            filter: `drop-shadow(0 0 8px ${colors.primary}80)`,
          }}
        >
          <svg className="w-[24px] h-[24px] mb-[4px]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z"/>
          </svg>
          <span className="text-[10px] font-medium">עסקים</span>
        </Link>

        {/* Profile */}
        <Link 
          href="/profile"
          className="flex flex-col items-center justify-center transition-colors"
          style={{ color: colors.onSurfaceVariant }}
        >
          <svg className="w-[24px] h-[24px] mb-[4px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-[10px] font-medium">פרופיל</span>
        </Link>
      </nav>
    </div>
  );
}
