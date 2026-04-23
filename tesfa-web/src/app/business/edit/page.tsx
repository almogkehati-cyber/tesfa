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

export default function BusinessEditPage() {
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div 
      className="min-h-screen pb-32"
      style={{ backgroundColor: colors.surface, color: colors.onSurface }}
    >
      <BusinessHeader title="עריכת פרופיל עסק" showBack backHref="/business" />

      <main className="pt-24 px-6 max-w-2xl mx-auto">
        {/* Visual Identity */}
        <section className="mb-10">
          {/* Cover Image */}
          <div 
            className="relative w-full h-48 rounded-2xl overflow-hidden group"
            style={{ backgroundColor: colors.surfaceContainerLow }}
          >
            <div 
              className="w-full h-full opacity-60 group-hover:opacity-40 transition-opacity"
              style={{ 
                background: `linear-gradient(135deg, ${colors.primaryContainer}40, ${colors.secondaryContainer}40)`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button 
                className="px-4 py-2 rounded-full flex items-center gap-2 border"
                style={{ 
                  backgroundColor: `${colors.surfaceContainerHighest}CC`,
                  borderColor: `${colors.outlineVariant}33`,
                  color: colors.primary,
                }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-xs font-semibold">החלף תמונת נושא</span>
              </button>
            </div>
          </div>

          {/* Logo */}
          <div 
            className="relative -mt-12 mr-6 w-24 h-24 rounded-2xl border-4 overflow-hidden shadow-xl group flex items-center justify-center"
            style={{ 
              borderColor: colors.surface,
              backgroundColor: colors.surfaceContainerHighest,
            }}
          >
            <div 
              className="w-full h-full flex items-center justify-center"
              style={{ 
                background: `linear-gradient(135deg, ${colors.primaryContainer}, ${colors.secondaryContainer})`,
              }}
            >
              <span className="text-3xl font-black text-white">T</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
          </div>
        </section>

        {/* Form Fields */}
        <div className="space-y-8">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm mr-2 font-medium" style={{ color: colors.onSurfaceVariant }}>
                שם העסק
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full rounded-2xl px-4 py-4 border-none focus:ring-2 focus:ring-[#deb7ff] outline-none transition-all"
                style={{ backgroundColor: colors.surfaceContainer, color: colors.onSurface }}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm mr-2 font-medium" style={{ color: colors.onSurfaceVariant }}>
                קטגוריה
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-2xl px-4 py-4 border-none focus:ring-2 focus:ring-[#deb7ff] outline-none appearance-none transition-all"
                  style={{ backgroundColor: colors.surfaceContainer, color: colors.onSurface }}
                >
                  <option>ניהול פיננסי</option>
                  <option>ייעוץ עסקי</option>
                  <option>טכנולוגיה</option>
                  <option>קמעונאות</option>
                </select>
                <svg 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
                  fill="none" viewBox="0 0 24 24" stroke={colors.onSurfaceVariant} strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <section className="space-y-4">
            <h3 
              className="text-lg font-bold mr-2"
              style={{ color: colors.primary, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              שעות פעילות
            </h3>
            <div className="space-y-3">
              {[
                { days: 'ראשון - חמישי', from: '09:00', to: '18:00' },
                { days: 'יום שישי', from: '08:30', to: '13:00' },
              ].map((schedule, i) => (
                <div 
                  key={i}
                  className="flex items-center justify-between p-4 rounded-2xl border"
                  style={{ 
                    backgroundColor: colors.surfaceContainerLow,
                    borderColor: `${colors.outlineVariant}1A`,
                  }}
                >
                  <span className="font-medium">{schedule.days}</span>
                  <div className="flex items-center gap-3">
                    <input
                      type="time"
                      defaultValue={schedule.from}
                      className="rounded-lg text-xs px-2 py-1 border-none focus:ring-1 focus:ring-[#deb7ff] outline-none"
                      style={{ backgroundColor: colors.surfaceContainerHighest, color: colors.primary }}
                    />
                    <span className="text-xs" style={{ color: colors.onSurfaceVariant }}>—</span>
                    <input
                      type="time"
                      defaultValue={schedule.to}
                      className="rounded-lg text-xs px-2 py-1 border-none focus:ring-1 focus:ring-[#deb7ff] outline-none"
                      style={{ backgroundColor: colors.surfaceContainerHighest, color: colors.primary }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Location */}
          <section className="space-y-4">
            <label className="block text-sm mr-2 font-medium" style={{ color: colors.onSurfaceVariant }}>
              מיקום העסק
            </label>
            <div className="relative">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="הזן כתובת מלאה..."
                className="w-full rounded-2xl pr-12 pl-4 py-4 border-none focus:ring-2 focus:ring-[#deb7ff] outline-none transition-all"
                style={{ backgroundColor: colors.surfaceContainer, color: colors.onSurface }}
              />
              <svg 
                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5"
                fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            {/* Map Placeholder */}
            <div 
              className="h-48 w-full rounded-2xl overflow-hidden border flex items-center justify-center"
              style={{ 
                borderColor: `${colors.outlineVariant}33`,
                backgroundColor: colors.surfaceContainerLow,
              }}
            >
              <div className="text-center opacity-50">
                <svg className="w-12 h-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span className="text-sm">מפה תוצג כאן</span>
              </div>
            </div>
          </section>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm mr-2 font-medium" style={{ color: colors.onSurfaceVariant }}>
              תיאור העסק
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full rounded-2xl px-4 py-4 border-none focus:ring-2 focus:ring-[#deb7ff] outline-none transition-all resize-none"
              style={{ backgroundColor: colors.surfaceContainer, color: colors.onSurface }}
            />
          </div>

          {/* Save Button */}
          <div className="pt-6">
            <button 
              className="w-full py-5 rounded-full text-white font-bold text-lg shadow-lg transition-all active:scale-95"
              style={{ 
                background: `linear-gradient(to left, ${colors.primaryContainer}, #9b59f5)`,
                boxShadow: '0 12px 40px rgba(123, 47, 190, 0.2)',
              }}
            >
              שמירת שינויים
            </button>
          </div>
        </div>
      </main>

      <BusinessNav />
    </div>
  );
}
