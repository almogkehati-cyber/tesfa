'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import { TESFA_CONTRACT_ADDRESS, TESFA_ABI } from '@/config/contracts';

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

// Contact type from database
interface Contact {
  id: string;
  walletAddress: string;
  fullName: string;
  phoneSuffix: string;
  avatarColor: string;
}

// Mock contacts as fallback when database is empty
const mockContacts: Contact[] = [
  { id: '1', walletAddress: '0x1234567890abcdef1234567890abcdef12345678', fullName: 'דוד כהן', phoneSuffix: '4567', avatarColor: 'bg-blue-600' },
  { id: '2', walletAddress: '0x2345678901abcdef2345678901abcdef23456789', fullName: 'מיכל ישראלי', phoneSuffix: '8821', avatarColor: 'bg-green-600' },
  { id: '3', walletAddress: '0x3456789012abcdef3456789012abcdef34567890', fullName: 'יוסי לוי', phoneSuffix: '3344', avatarColor: 'bg-purple-600' },
  { id: '4', walletAddress: '0x4567890123abcdef4567890123abcdef45678901', fullName: 'שרה אברהם', phoneSuffix: '9912', avatarColor: 'bg-pink-600' },
  { id: '5', walletAddress: '0x5678901234abcdef5678901234abcdef56789012', fullName: 'אבי מזרחי', phoneSuffix: '5566', avatarColor: 'bg-orange-600' },
  { id: '6', walletAddress: '0x6789012345abcdef6789012345abcdef67890123', fullName: 'רחל גולן', phoneSuffix: '7788', avatarColor: 'bg-teal-600' },
  { id: '7', walletAddress: '0x7890123456abcdef7890123456abcdef78901234', fullName: 'משה פרץ', phoneSuffix: '1122', avatarColor: 'bg-indigo-600' },
  { id: '8', walletAddress: '0x8901234567abcdef8901234567abcdef89012345', fullName: 'נועה שמיר', phoneSuffix: '3456', avatarColor: 'bg-red-600' },
];

type TxStatus = 'idle' | 'pending' | 'confirming' | 'success' | 'error';

export default function SendPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoadingContacts, setIsLoadingContacts] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [amount, setAmount] = useState('0.00');
  const [searchQuery, setSearchQuery] = useState('');
  const [txStatus, setTxStatus] = useState<TxStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch contacts from API
  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch('/api/users');
        if (response.ok) {
          const data = await response.json();
          // Use API data if available, otherwise use mock data
          setContacts(data.length > 0 ? data : mockContacts);
        } else {
          setContacts(mockContacts);
        }
      } catch {
        // Fallback to mock data on error
        setContacts(mockContacts);
      } finally {
        setIsLoadingContacts(false);
      }
    }
    fetchContacts();
  }, []);

  // Wagmi hooks for contract interaction
  const { 
    writeContract, 
    data: txHash,
    isPending: isWritePending,
    error: writeError,
    reset: resetWrite
  } = useWriteContract();

  const { 
    isLoading: isConfirming, 
    isSuccess: isConfirmed,
    error: confirmError 
  } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // Update status based on transaction state
  useEffect(() => {
    if (isWritePending) {
      setTxStatus('pending');
    } else if (isConfirming) {
      setTxStatus('confirming');
    } else if (isConfirmed) {
      setTxStatus('success');
    } else if (writeError || confirmError) {
      setTxStatus('error');
      setErrorMessage(writeError?.message || confirmError?.message || 'Transaction failed');
    }
  }, [isWritePending, isConfirming, isConfirmed, writeError, confirmError]);

  const filteredContacts = contacts.filter(contact =>
    contact.fullName.includes(searchQuery) || contact.phoneSuffix.includes(searchQuery)
  );

  const handleKeyPress = (key: string) => {
    if (key === 'backspace') {
      setAmount(prev => {
        if (prev.length <= 1 || prev === '0.00') return '0.00';
        const newVal = prev.slice(0, -1);
        return newVal || '0.00';
      });
    } else if (key === '.') {
      if (!amount.includes('.')) {
        setAmount(prev => prev + '.');
      }
    } else {
      setAmount(prev => {
        if (prev === '0.00') return key;
        return prev + key;
      });
    }
  };

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
    setAmount('0.00');
    setTxStatus('idle');
    setErrorMessage('');
    resetWrite();
  };

  const handleBack = () => {
    setSelectedContact(null);
    setAmount('0.00');
    setTxStatus('idle');
    setErrorMessage('');
    resetWrite();
  };

  const handleSend = async () => {
    if (!selectedContact || amount === '0.00' || amount === '0') return;
    
    try {
      setTxStatus('pending');
      setErrorMessage('');
      
      // Convert amount to Wei (18 decimals)
      const amountInWei = parseUnits(amount, 18);
      
      // Call the transfer function on the smart contract
      writeContract({
        address: TESFA_CONTRACT_ADDRESS,
        abi: TESFA_ABI,
        functionName: 'transfer',
        args: [selectedContact.walletAddress as `0x${string}`, amountInWei],
      });
    } catch (err) {
      setTxStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Failed to send transaction');
    }
  };

  const handleNewTransfer = () => {
    setSelectedContact(null);
    setAmount('0.00');
    setTxStatus('idle');
    setErrorMessage('');
    resetWrite();
  };

  const getButtonText = () => {
    switch (txStatus) {
      case 'pending':
        return 'מאשר בארנק...';
      case 'confirming':
        return 'מעבד עסקה...';
      case 'success':
        return 'נשלח בהצלחה! ✓';
      case 'error':
        return 'נסה שוב';
      default:
        return amount !== '0.00' && amount !== '0' ? `שלח ${amount} TSF` : 'שלח';
    }
  };

  const isButtonDisabled = () => {
    if (txStatus === 'pending' || txStatus === 'confirming') return true;
    if (txStatus === 'success') return false;
    return amount === '0.00' || amount === '0';
  };

  return (
    <div 
      dir="rtl"
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: colors.background, color: colors.onSurface }}
    >
      {/* Header */}
      <header 
        className="fixed top-0 left-0 right-0 mx-auto max-w-[430px] z-50 flex justify-between items-center px-6 h-16"
        style={{ backgroundColor: colors.background }}
      >
        <div className="flex items-center gap-3">
          {selectedContact ? (
            <button 
              onClick={handleBack}
              className="p-2 -mr-2 rounded-full transition-colors hover:bg-[#333345]"
              style={{ color: colors.primary }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <Link 
              href="/"
              className="p-2 -mr-2 rounded-full transition-colors hover:bg-[#333345]"
              style={{ color: colors.primary }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
          <h1 
            className="font-bold text-lg"
            style={{ color: colors.primary, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            {selectedContact ? `שליחה ל${selectedContact.fullName}` : 'שליחת TSF'}
          </h1>
        </div>
        <span 
          className="text-xl font-black tracking-tight"
          style={{ color: colors.primary, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        >
          TESFA
        </span>
      </header>

      {/* Main Content */}
      {!selectedContact ? (
        /* Contacts List View */
        <main className="flex-1 pt-20 pb-8 px-4 max-w-[430px] mx-auto w-full">
          {/* Search Bar */}
          <div className="mb-6">
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
                placeholder="חיפוש לפי שם או מספר טלפון..."
                className="w-full h-14 rounded-2xl pr-12 pl-4 border-none focus:ring-2 focus:outline-none text-right"
                style={{ 
                  backgroundColor: colors.surfaceContainerLow,
                  color: colors.onSurface,
                }}
              />
            </div>
          </div>

          {/* Section Title */}
          <div className="flex items-center justify-between mb-4 px-2">
            <h2 className="text-sm font-bold" style={{ color: colors.onSurfaceVariant }}>
              חברי קהילת TESFA
            </h2>
            <span className="text-xs" style={{ color: colors.onSurfaceVariant }}>
              {filteredContacts.length} אנשי קשר
            </span>
          </div>

          {/* Contacts List */}
          <div 
            className="rounded-2xl overflow-hidden divide-y"
            style={{ backgroundColor: colors.surfaceContainerLow, borderColor: `${colors.outlineVariant}1A` }}
          >
            {filteredContacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => handleSelectContact(contact)}
                className="w-full flex items-center gap-4 p-4 transition-colors hover:bg-[#252538] active:bg-[#333345] text-right"
              >
                {/* Avatar */}
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 ${contact.avatarColor}`}
                >
                  {contact.fullName.charAt(0)}
                </div>
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white truncate">{contact.fullName}</p>
                  <p className="text-sm" style={{ color: colors.onSurfaceVariant }}>
                    סיומת {contact.phoneSuffix}
                  </p>
                </div>

                {/* Arrow */}
                <svg 
                  className="w-5 h-5 flex-shrink-0"
                  fill="none" viewBox="0 0 24 24" stroke={colors.onSurfaceVariant} strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            ))}
          </div>

          {/* Empty State */}
          {filteredContacts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: `${colors.primaryContainer}33` }}
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke={colors.primary} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="font-bold mb-2">לא נמצאו תוצאות</p>
              <p className="text-sm" style={{ color: colors.onSurfaceVariant }}>
                נסה לחפש בשם אחר
              </p>
            </div>
          )}
        </main>
      ) : (
        /* Amount Entry View */
        <main className="flex-1 pt-20 pb-32 px-6 flex flex-col items-center max-w-[430px] mx-auto w-full">
          {/* Selected Contact Card */}
          <div 
            className="w-full rounded-2xl p-4 mb-8 flex items-center gap-4"
            style={{ 
              backgroundColor: colors.surfaceContainerLow,
              boxShadow: '0px 10px 40px rgba(222, 183, 255, 0.08)',
            }}
          >
            <div 
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${selectedContact.avatarColor}`}
            >
              {selectedContact.fullName.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="text-sm" style={{ color: colors.onSurfaceVariant }}>שליחה אל</span>
              <span className="font-bold" style={{ color: colors.onSurface }}>{selectedContact.fullName}</span>
            </div>
            <button 
              onClick={handleBack}
              className="mr-auto text-sm font-semibold"
              style={{ color: colors.primary }}
            >
              שינוי
            </button>
          </div>

          {/* Amount Display */}
          <div className="flex flex-col items-center justify-center py-8 w-full">
            <div className="flex items-baseline gap-2" dir="ltr">
              <span 
                className="text-6xl font-extrabold tracking-tighter"
                style={{ color: colors.primary, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                {amount}
              </span>
              <span 
                className="font-bold text-xl"
                style={{ color: colors.primaryContainer }}
              >
                TSF
              </span>
            </div>
            <div 
              className="mt-4 px-4 py-1.5 rounded-full border"
              style={{ 
                backgroundColor: `${colors.surfaceContainerHighest}66`,
                borderColor: `${colors.outlineVariant}1A`,
              }}
            >
              <span className="text-sm font-medium" style={{ color: colors.onSurfaceVariant }}>
                יתרה: 2,450.00 TSF
              </span>
            </div>
          </div>

          <div className="flex-grow" />

          {/* Numeric Keypad */}
          <div className="w-full grid grid-cols-3 gap-3 mb-4" dir="ltr">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'backspace'].map((key) => (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className="h-16 flex items-center justify-center text-2xl font-bold rounded-2xl transition-all hover:bg-[#252538] active:scale-95 active:bg-[#333345]"
                style={{ 
                  color: key === 'backspace' ? colors.onSurfaceVariant : colors.onSurface,
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}
              >
                {key === 'backspace' ? (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
                  </svg>
                ) : key}
              </button>
            ))}
          </div>
        </main>
      )}

      {/* Continue Button - Only show when contact is selected */}
      {selectedContact && (
        <div className="fixed bottom-8 left-0 right-0 px-6 max-w-[430px] mx-auto space-y-3">
          {/* Error Message */}
          {txStatus === 'error' && errorMessage && (
            <div 
              className="w-full px-4 py-3 rounded-xl text-center text-sm"
              style={{ backgroundColor: `${colors.error}1A`, color: colors.error }}
            >
              {errorMessage.includes('User rejected') ? 'העסקה בוטלה' : 'שגיאה בביצוע העסקה'}
            </div>
          )}

          {/* Success Message */}
          {txStatus === 'success' && (
            <div 
              className="w-full px-4 py-3 rounded-xl text-center text-sm"
              style={{ backgroundColor: `${colors.success}1A`, color: colors.success }}
            >
              ✓ {amount} TSF נשלחו בהצלחה ל{selectedContact.fullName}
            </div>
          )}

          {/* Main Action Button */}
          <button 
            onClick={txStatus === 'success' ? handleNewTransfer : (txStatus === 'error' ? handleSend : handleSend)}
            className="w-full h-14 rounded-full text-white font-bold text-lg shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            style={{ 
              background: txStatus === 'success' 
                ? colors.success 
                : txStatus === 'error'
                  ? colors.error
                  : `linear-gradient(to left, ${colors.primaryContainer}, ${colors.secondaryContainer})`,
              boxShadow: txStatus === 'success' 
                ? '0 8px 32px rgba(74, 222, 128, 0.3)'
                : txStatus === 'error'
                  ? '0 8px 32px rgba(248, 113, 113, 0.3)'
                  : '0 8px 32px rgba(123, 47, 190, 0.3)',
            }}
            disabled={isButtonDisabled()}
          >
            {(txStatus === 'pending' || txStatus === 'confirming') && (
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            )}
            {txStatus === 'success' ? 'העברה חדשה' : getButtonText()}
          </button>

          {/* Transaction Hash Link */}
          {txHash && txStatus === 'success' && (
            <a 
              href={`https://amoy.polygonscan.com/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center text-sm underline"
              style={{ color: colors.primary }}
            >
              צפה בעסקה ב-PolygonScan ↗
            </a>
          )}
        </div>
      )}

      {/* Ambient Glow */}
      <div 
        className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none -z-10"
        style={{ backgroundColor: `${colors.primary}0D`, filter: 'blur(100px)' }}
      />
    </div>
  );
}
