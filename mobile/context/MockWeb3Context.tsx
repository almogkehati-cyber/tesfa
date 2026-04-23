import React, { createContext, useContext, ReactNode } from 'react';

interface Balance {
  raw: string;
  formatted: string;
  display: string;
}

interface UBIInfo {
  poolBalance: string;
  totalRegistered: number;
  estimatedShare: string;
  canClaim: boolean;
}

interface MockWeb3ContextType {
  isReady: boolean;
  isLoading: boolean;
  balance: Balance | null;
  ubiInfo: UBIInfo | null;
  error: string | null;
  refreshBalance: () => Promise<void>;
  refreshUBIInfo: () => Promise<void>;
  sendTSF: (to: string, amount: string) => Promise<string>;
  payBusiness: (businessAddress: string, amountILS: string) => Promise<string>;
  payBusinessTx: (businessAddress: string, amountILS: string) => Promise<string>;
  claimUBI: () => Promise<string>;
  claimUBITx: () => Promise<string>;
  registerUser: () => Promise<string>;
  clearError: () => void;
}

const MockWeb3Context = createContext<MockWeb3ContextType | undefined>(undefined);

export function MockWeb3Provider({ children }: { children: ReactNode }) {
  const mockBalance: Balance = {
    raw: '1500000000000000000000',
    formatted: '1500.00',
    display: '1,500.00',
  };

  const mockUBIInfo: UBIInfo = {
    poolBalance: '50000',
    totalRegistered: 1250,
    estimatedShare: '12.50',
    canClaim: true,
  };

  const mockValue: MockWeb3ContextType = {
    isReady: true,
    isLoading: false,
    balance: mockBalance,
    ubiInfo: mockUBIInfo,
    error: null,
    refreshBalance: async () => {},
    refreshUBIInfo: async () => {},
    sendTSF: async () => '0xmocktx',
    payBusiness: async () => '0xmocktx',
    payBusinessTx: async () => '0xmocktx',
    claimUBI: async () => '0xmocktx',
    claimUBITx: async () => '0xmocktx',
    registerUser: async () => '0xmocktx',
    clearError: () => {},
  };

  return (
    <MockWeb3Context.Provider value={mockValue}>
      {children}
    </MockWeb3Context.Provider>
  );
}

export function useWeb3(): MockWeb3ContextType {
  const context = useContext(MockWeb3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}
