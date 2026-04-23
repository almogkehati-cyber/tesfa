'use client';

import Link from 'next/link';

const colors = {
  background: '#0A0A1A',
  surface: '#12122A',
  primary: '#7B2FBE',
  secondary: '#9B59F5',
  success: '#00C896',
  zinc100: '#f4f4f5',
  zinc300: '#d4d4d8',
  zinc400: '#a1a1aa',
  zinc500: '#71717a',
};

export default function AccountDeletedPage() {
  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: colors.background, color: colors.zinc100 }}
    >
      <main className="flex-grow flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background Glows */}
        <div 
          className="absolute top-[-10%] right-[-10%] w-64 h-64 rounded-full blur-[100px]"
          style={{ backgroundColor: colors.primary, opacity: 0.1 }}
        />
        <div 
          className="absolute bottom-[-10%] left-[-10%] w-80 h-80 rounded-full blur-[120px]"
          style={{ backgroundColor: colors.secondary, opacity: 0.1 }}
        />

        <div className="max-w-md w-full z-10">
          {/* Card */}
          <div 
            className="rounded-3xl p-8 md:p-12 shadow-2xl relative border"
            style={{ 
              backgroundColor: `${colors.surface}99`,
              backdropFilter: 'blur(24px)',
              borderColor: 'rgba(255, 255, 255, 0.05)',
            }}
          >
            {/* Success Icon */}
            <div className="flex flex-col items-center mb-10">
              <div className="relative">
                {/* Pulse effect */}
                <div 
                  className="absolute inset-0 rounded-full scale-150 blur-xl"
                  style={{ backgroundColor: `${colors.success}33` }}
                />
                <div 
                  className="w-24 h-24 rounded-full flex items-center justify-center border relative"
                  style={{ 
                    backgroundColor: `${colors.success}1A`,
                    borderColor: `${colors.success}4D`,
                  }}
                >
                  <svg className="w-14 h-14" fill={colors.success} viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="text-center space-y-4">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                חשבונך נמחק בהצלחה
              </h1>
              <p className="text-lg leading-relaxed font-light" style={{ color: colors.zinc400 }}>
                צר לנו לראות אותך עוזב. כל המידע שלך הוסר מהמערכת בהתאם לבקשתך.
              </p>
            </div>

            {/* Info Card */}
            <div 
              className="mt-12 p-4 rounded-2xl flex items-start gap-4 border"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke={colors.zinc500} strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div className="text-right">
                <p 
                  className="text-xs font-bold uppercase tracking-widest mb-1"
                  style={{ color: colors.zinc300 }}
                >
                  פרטיות וביטחון
                </p>
                <p className="text-xs" style={{ color: colors.zinc500 }}>
                  נתוניך האישיים נמחקו לצמיתות ולא ניתן יהיה לשחזרם בעתיד.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Action */}
      <div className="p-8 max-w-md mx-auto w-full">
        <Link
          href="/"
          className="w-full block text-center py-5 rounded-2xl font-bold text-lg text-white transition-all active:scale-[0.98]"
          style={{ 
            background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
            boxShadow: '0 10px 40px -10px rgba(123, 47, 190, 0.5)',
          }}
        >
          חזרה למסך הפתיחה
        </Link>
        
        {/* Trust badges */}
        <div className="mt-8 flex justify-center items-center gap-6 opacity-30">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-xs">GDPR</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs">Privacy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
