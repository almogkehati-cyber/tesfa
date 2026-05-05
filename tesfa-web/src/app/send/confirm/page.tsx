'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, Suspense } from 'react';
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

function SendConfirmContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const amount = searchParams.get('amount') || '0';
  const recipient = searchParams.get('recipient') || 'Unknown';
  const address = searchParams.get('address') || '';

  const handleConfirm = () => {
    setIsProcessing(true);
    
    // Mock: Auto-confirm after 1 second
    setTimeout(() => {
      const txHash = '0x' + Math.random().toString(16).substring(2, 66);
      router.push(`/send/success?amount=${amount}&recipient=${recipient}&txHash=${txHash}`);
    }, 1000);
  };

  return (
    <div 
      className="flex flex-col min-h-screen overflow-hidden relative"
      style={{ backgroundColor: colors.background, color: colors.onSurface }}
    >
      {/* Background Glow */}
      <div 
        className="absolute top-0 right-0 w-[256px] h-[256px] rounded-full pointer-events-none"
        style={{ 
          backgroundColor: `${colors.primary}1A`,
          filter: 'blur(100px)',
        }}
      />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 h-16 mt-4">
        <Link href="/send">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: colors.onSurface }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-lg font-bold" style={{ color: colors.onSurface }}>אישור העברה</h1>
        <div className="w-6" />
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-6">
        {/* Mock Mode Notice */}
        <div 
          className="w-full max-w-[400px] text-center py-3 px-4 rounded-xl mb-6"
          style={{ 
            backgroundColor: `${colors.success}1A`,
            color: colors.success,
          }}
        >
          🎭 מצב דמה - העברה תתבצע אוטומטית
        </div>

        {/* Transaction Summary Card */}
        <div 
          className="w-full max-w-[400px] rounded-2xl p-6 mb-6"
          style={{ backgroundColor: colors.surfaceContainerLow }}
        >
          {/* Amount */}
          <div className="text-center mb-6">
            <p className="text-sm mb-2" style={{ color: colors.onSurfaceVariant }}>
              סכום להעברה
            </p>
            <p className="text-4xl font-bold" style={{ color: colors.primary }}>
              {amount} TSF
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-px mb-6" style={{ backgroundColor: colors.outlineVariant }} />

          {/* Recipient Details */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: colors.onSurfaceVariant }}>
                נמען
              </span>
              <span className="text-sm font-medium" style={{ color: colors.onSurface }}>
                {recipient}
              </span>
            </div>

            {address && (
              <div className="flex justify-between items-start">
                <span className="text-sm" style={{ color: colors.onSurfaceVariant }}>
                  כתובת
                </span>
                <span className="text-xs font-mono text-left" style={{ color: colors.onSurface }}>
                  {address.slice(0, 6)}...{address.slice(-4)}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: colors.onSurfaceVariant }}>
                עמלת רשת
              </span>
              <span className="text-sm font-medium" style={{ color: colors.success }}>
                חינם
              </span>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          disabled={isProcessing}
          className="w-full max-w-[400px] py-4 rounded-full text-base font-bold transition-all active:scale-98 disabled:opacity-50"
          style={{
            background: isProcessing 
              ? colors.surfaceContainerHigh 
              : `linear-gradient(135deg, ${colors.primaryContainer} 0%, #9B59F5 100%)`,
            color: '#FFFFFF',
            boxShadow: isProcessing ? 'none' : `0 4px 16px ${colors.primaryContainer}40`,
          }}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              מעבד...
            </span>
          ) : (
            'אשר העברה'
          )}
        </button>

        {/* Cancel Link */}
        <button
          onClick={() => router.back()}
          className="mt-4 text-sm"
          style={{ color: colors.onSurfaceVariant }}
        >
          ביטול
        </button>
      </main>
    </div>
  );
}

export default function SendConfirmPage() {
  return (
    <Suspense fallback={
      <div style={{ backgroundColor: colors.background }} className="min-h-screen flex items-center justify-center">
        <p style={{ color: colors.onSurface }}>טוען...</p>
      </div>
    }>
      <SendConfirmContent />
    </Suspense>
  );
}
