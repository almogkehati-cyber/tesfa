import React, { createContext, useContext, ReactNode } from 'react';

interface MockAuthContextType {
  user: null;
  walletAddress: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isWalletReady: boolean;
  sendOTP: (identifier: string, type: 'email' | 'sms') => Promise<void>;
  verifyOTP: (code: string) => Promise<boolean>;
  logout: () => Promise<void>;
  getWalletAddress: () => string | null;
  error: string | null;
  clearError: () => void;
}

const MockAuthContext = createContext<MockAuthContextType | undefined>(undefined);

export function MockAuthProvider({ children }: { children: ReactNode }) {
  const mockValue: MockAuthContextType = {
    user: null,
    walletAddress: '0x1234...demo',
    isAuthenticated: true, // Pretend authenticated for demo
    isLoading: false,
    isWalletReady: true,
    sendOTP: async () => {},
    verifyOTP: async () => true,
    logout: async () => {},
    getWalletAddress: () => '0x1234...demo',
    error: null,
    clearError: () => {},
  };

  return (
    <MockAuthContext.Provider value={mockValue}>
      {children}
    </MockAuthContext.Provider>
  );
}

export function useAuth(): MockAuthContextType {
  const context = useContext(MockAuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function useIsAuthenticated(): boolean {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
}

export function useWalletAddress(): string | null {
  const { walletAddress } = useAuth();
  return walletAddress;
}
