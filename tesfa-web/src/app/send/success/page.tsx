'use client';

export const dynamic = 'force-dynamic';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const colors = {
  primary: '#deb7ff',
  primaryContainer: '#7b2fbe',
  secondaryContainer: '#6107ba',
  surfaceContainerHigh: '#1C1C2E',
  surfaceContainerLow: '#0F0F1F',
  onSurface: '#e3e0f8',
  onSurfaceVariant: '#cfc2d5',
  outlineVariant: '#4c4353',
  background: '#0A0A1A',
  error: '#f87171',
  success: '#4ade80',
};

function SendSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const amount = searchParams.get('amount') || '0';
  const recipient = searchParams.get('recipient') || 'Unknown';
  const txHash = searchParams.get('txHash') || '';

  return (
    <div 
      className="flex flex-col min-h-screen overflow-hidden relative"
      style={{ backgroundColor: colors.background, color: colors.onSurface }}
    >
      {/* Background Glow */}
      <div 
        className="absolute top-0 right-0 w-[256px] h-[256px] rounded-full pointer-events-none"
        style={{ 
          backgroundColor: `${colors.success}1A`,
          filter: 'blur(100px)',
        }}
      />

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-6">
        {/* Success Icon */}
        <div 
          className="w-24 h-24 rounded-full flex items-center justify-center mb-6 animate-bounce"
          style={{ backgroundColor: `${colors.success}20` }}
        >
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke={colors.success} strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold mb-2" style={{ color: colors.onSurface }}>
          ההעברה בוצעה בהצלחה!
        </h1>
        <p className="text-sm mb-8 text-center" style={{ color: colors.onSurfaceVariant }}>
          הכסף הועבר אל {recipient}
        </p>

        {/* Transaction Details Card */}
        <div 
          className="w-full max-w-[400px] rounded-2xl p-6 mb-6"
          style={{ backgroundColor: colors.surfaceContainerLow }}
        >
          {/* Amount */}
          <div className="text-center mb-6">
            <p className="text-sm mb-2" style={{ color: colors.onSurfaceVariant }}>
              סכום שהועבר
            </p>
            <p className="text-4xl font-bold" style={{ color: colors.success }}>
              {amount} TSF
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-px mb-6" style={{ backgroundColor: colors.outlineVariant }} />

          {/* Details */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: colors.onSurfaceVariant }}>
                נמען
              </span>
              <span className="text-sm font-medium" style={{ color: colors.onSurface }}>
                {recipient}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: colors.onSurfaceVariant }}>
                תאריך
              </span>
              <span className="text-sm font-medium" style={{ color: colors.onSurface }}>
                {new Date().toLocaleDateString('he-IL')}
              </span>
            </div>

            {txHash && (
              <div className="flex justify-between items-start">
                <span className="text-sm" style={{ color: colors.onSurfaceVariant }}>
                  מזהה עסקה
                </span>
                <span className="text-xs font-mono text-left" style={{ color: colors.primary }}>
                  {txHash.slice(0, 8)}...{txHash.slice(-6)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-[400px] space-y-3">
          <button
            onClick={() => router.push('/send')}
            className="w-full py-4 rounded-full text-base font-bold transition-all active:scale-98"
            style={{
              background: `linear-gradient(135deg, ${colors.primaryContainer} 0%, #9B59F5 100%)`,
              color: '#FFFFFF',
              boxShadow: `0 4px 16px ${colors.primaryContainer}40`,
            }}
          >
            העברה חדשה
          </button>

          <button
            onClick={() => router.push('/')}
            className="w-full py-4 rounded-full text-base font-bold transition-all active:scale-98"
            style={{
              backgroundColor: colors.surfaceContainerHigh,
              color: colors.onSurface,
            }}
          >
            חזרה לדף הבית
          </button>
        </div>
      </main>
    </div>
  );
}

export default function SendSuccessPage() {
  return (
    <Suspense fallback={
      <div style={{ backgroundColor: colors.background }} className="min-h-screen flex items-center justify-center">
        <p style={{ color: colors.onSurface }}>טוען...</p>
      </div>
    }>
      <SendSuccessContent />
    </Suspense>
  );
}
