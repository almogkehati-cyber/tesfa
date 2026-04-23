'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePrivy } from '@privy-io/react-auth';

const colors = {
  background: '#0A0A1A',
  primary: '#deb7ff',
  primaryContainer: '#7b2fbe',
  secondaryContainer: '#6107ba',
  surface: '#121222',
  surfaceContainerLow: '#1a1a2b',
  surfaceContainerHighest: '#333345',
  onSurface: '#e3e0f8',
  onSurfaceVariant: '#988d9e',
  outlineVariant: '#4c4353',
  success: '#4ade80',
  error: '#f87171',
};

const businessTypes = [
  'מסעדה / בית קפה',
  'חנות קמעונאית',
  'שירותים מקצועיים',
  'בריאות ויופי',
  'חינוך והדרכה',
  'תחבורה ולוגיסטיקה',
  'טכנולוגיה',
  'אחר',
];

export default function BusinessRegisterPage() {
  const router = useRouter();
  const { user, ready, authenticated } = usePrivy();
  
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    businessNumber: '',
    phone: '',
    address: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) {
      setError('יש להתחבר כדי לרשום עסק');
      return;
    }

    if (!formData.businessName || !formData.businessType || !formData.phone) {
      setError('נא למלא את כל השדות הנדרשים');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/business', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          ...formData,
        }),
      });

      if (response.ok) {
        router.push('/business');
      } else {
        const data = await response.json();
        setError(data.error || 'שגיאה ברישום העסק');
      }
    } catch {
      setError('שגיאה בחיבור לשרת');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.background }}>
        <div className="animate-spin w-8 h-8 border-2 border-t-transparent rounded-full" style={{ borderColor: colors.primary }} />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div 
        dir="rtl"
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ backgroundColor: colors.background, color: colors.onSurface }}
      >
        <div 
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: `${colors.primaryContainer}33` }}
        >
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">רישום עסק</h1>
        <p className="text-center mb-8" style={{ color: colors.onSurfaceVariant }}>
          יש להתחבר תחילה כדי לרשום עסק חדש
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

  return (
    <div 
      dir="rtl"
      className="min-h-screen pb-8"
      style={{ backgroundColor: colors.background, color: colors.onSurface }}
    >
      {/* Header */}
      <header 
        className="fixed top-0 left-0 right-0 mx-auto max-w-[430px] z-50 flex justify-between items-center px-6 h-16"
        style={{ backgroundColor: colors.background }}
      >
        <div className="flex items-center gap-3">
          <Link 
            href="/profile"
            className="p-2 -mr-2 rounded-full transition-colors hover:bg-[#333345]"
            style={{ color: colors.primary }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <h1 className="font-bold text-lg" style={{ color: colors.primary }}>
            רישום עסק חדש
          </h1>
        </div>
        <span 
          className="text-xl font-black tracking-tight"
          style={{ color: colors.primary, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        >
          TESFA
        </span>
      </header>

      {/* Main Form */}
      <main className="pt-24 px-6 max-w-[430px] mx-auto">
        {/* Hero */}
        <div className="text-center mb-8">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: `${colors.primaryContainer}33` }}
          >
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">הצטרף כעסק לקהילת TESFA</h2>
          <p className="text-sm" style={{ color: colors.onSurfaceVariant }}>
            קבל תשלומים ב-TSF והנפק זיכויים ללקוחות
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div 
            className="mb-6 px-4 py-3 rounded-xl text-center"
            style={{ backgroundColor: `${colors.error}1A`, color: colors.error }}
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Business Name */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.onSurfaceVariant }}>
              שם העסק *
            </label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="לדוגמה: קפה תספה"
              className="w-full h-14 px-4 rounded-xl border-none focus:ring-2 focus:outline-none"
              style={{ backgroundColor: colors.surfaceContainerLow, color: colors.onSurface }}
            />
          </div>

          {/* Business Type */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.onSurfaceVariant }}>
              סוג העסק *
            </label>
            <select
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              className="w-full h-14 px-4 rounded-xl border-none focus:ring-2 focus:outline-none appearance-none"
              style={{ backgroundColor: colors.surfaceContainerLow, color: colors.onSurface }}
            >
              <option value="">בחר סוג עסק</option>
              {businessTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.onSurfaceVariant }}>
              טלפון העסק *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="050-1234567"
              className="w-full h-14 px-4 rounded-xl border-none focus:ring-2 focus:outline-none"
              style={{ backgroundColor: colors.surfaceContainerLow, color: colors.onSurface }}
              dir="ltr"
            />
          </div>

          {/* Business Number (Optional) */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.onSurfaceVariant }}>
              מספר עוסק / ח.פ (אופציונלי)
            </label>
            <input
              type="text"
              name="businessNumber"
              value={formData.businessNumber}
              onChange={handleChange}
              placeholder="123456789"
              className="w-full h-14 px-4 rounded-xl border-none focus:ring-2 focus:outline-none"
              style={{ backgroundColor: colors.surfaceContainerLow, color: colors.onSurface }}
              dir="ltr"
            />
          </div>

          {/* Address (Optional) */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.onSurfaceVariant }}>
              כתובת (אופציונלי)
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="רחוב, עיר"
              className="w-full h-14 px-4 rounded-xl border-none focus:ring-2 focus:outline-none"
              style={{ backgroundColor: colors.surfaceContainerLow, color: colors.onSurface }}
            />
          </div>

          {/* Description (Optional) */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.onSurfaceVariant }}>
              תיאור קצר (אופציונלי)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="ספר לנו על העסק שלך..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border-none focus:ring-2 focus:outline-none resize-none"
              style={{ backgroundColor: colors.surfaceContainerLow, color: colors.onSurface }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 rounded-full font-bold text-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            style={{ 
              background: `linear-gradient(to left, ${colors.primaryContainer}, ${colors.secondaryContainer})`,
              color: 'white',
            }}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                שולח...
              </>
            ) : (
              'רשום את העסק'
            )}
          </button>
        </form>

        {/* Terms Notice */}
        <p className="text-center text-xs mt-6" style={{ color: colors.onSurfaceVariant }}>
          ברישום העסק אתה מסכים ל
          <Link href="#" className="underline mx-1" style={{ color: colors.primary }}>תנאי השימוש</Link>
          ול
          <Link href="#" className="underline mx-1" style={{ color: colors.primary }}>מדיניות הפרטיות</Link>
        </p>
      </main>
    </div>
  );
}
