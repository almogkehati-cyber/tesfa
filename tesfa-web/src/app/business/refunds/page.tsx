'use client';

import Link from 'next/link';
import BusinessHeader from '@/components/BusinessHeader';
import BusinessNav from '@/components/BusinessNav';

const colors = {
  background: '#0A0A1A',
  surface: '#12122A',
  accent: '#A855F7',
  amber: '#f59e0b',
  zinc100: '#f4f4f5',
  zinc400: '#a1a1aa',
  zinc500: '#71717a',
  zinc800: '#27272a',
};

const refundableTransactions: { name: string; id: string; time: string; amount: string }[] = [];

export default function RefundsPage() {
  return (
    <div 
      className="min-h-screen pb-32"
      style={{ backgroundColor: colors.background, color: colors.zinc100 }}
    >
      <BusinessHeader title="זיכויים" showBack backHref="/business" />

      <main className="px-6 py-8 max-w-2xl mx-auto space-y-8">
        {/* Title */}
        <section>
          <h2 className="text-3xl font-extrabold tracking-tight mb-2">Refund Management</h2>
          <p className="font-medium" style={{ color: colors.zinc400 }}>
            נהל את החזרי הלקוחות שלך במקום אחד בצורה מאובטחת ומהירה.
          </p>
        </section>

        {/* Primary Action Card */}
        <section>
          <Link
            href="/business/refunds/execute"
            className="w-full rounded-3xl p-8 text-right flex flex-col justify-between aspect-[16/10] relative overflow-hidden group transition-transform active:scale-[0.98]"
            style={{ 
              background: 'linear-gradient(135deg, #A855F7 0%, #6366F1 100%)',
              boxShadow: '0 10px 25px -5px rgba(168, 85, 247, 0.4)',
            }}
          >
            {/* Decorative Glow */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all" />
            <div className="relative z-10 flex justify-between items-start">
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                </svg>
              </div>
              <svg className="w-6 h-6 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
            <div className="relative z-10">
              <p className="text-white/80 font-bold tracking-widest text-sm mb-1 uppercase">CREDIT EXECUTION</p>
              <h3 className="text-white text-5xl font-black">בצע זיכוי</h3>
            </div>
          </Link>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 gap-4">
          <div 
            className="p-5 rounded-2xl border"
            style={{ 
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(12px)',
              borderColor: 'rgba(255, 255, 255, 0.08)',
            }}
          >
            <p className="text-sm font-semibold mb-1" style={{ color: colors.zinc500 }}>סה״כ זוכו השבוע</p>
            <p className="text-2xl font-bold">₪12,450</p>
          </div>
          <div 
            className="p-5 rounded-2xl border"
            style={{ 
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(12px)',
              borderColor: 'rgba(255, 255, 255, 0.08)',
            }}
          >
            <p className="text-sm font-semibold mb-1" style={{ color: colors.zinc500 }}>זיכויים בהמתנה</p>
            <p className="text-2xl font-bold">03</p>
          </div>
        </section>

        {/* Recent Transactions for Refund */}
        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <h3 className="text-xl font-bold">Recent Transactions for Refund</h3>
            <span className="font-semibold text-sm cursor-pointer" style={{ color: colors.amber }}>הצג הכל</span>
          </div>

          <div className="space-y-3">
            {refundableTransactions.map((tx, i) => (
              <Link
                key={i}
                href="/business/refunds/execute"
                className="p-4 rounded-2xl flex items-center justify-between transition-colors hover:bg-[#27272a]/30 cursor-pointer"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: colors.zinc800 }}
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={colors.zinc500} strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold">{tx.name}</p>
                    <p className="text-xs font-medium" style={{ color: colors.zinc500 }}>ID: {tx.id} • {tx.time}</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="font-bold text-lg">{tx.amount}</p>
                  <p className="text-xs font-bold" style={{ color: colors.amber }}>ניתן לזיכוי</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <BusinessNav />
    </div>
  );
}
