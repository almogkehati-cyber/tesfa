/**
 * Web3 Context
 * 
 * Provides Web3/blockchain functionality throughout the app.
 * Integrates with the Privy embedded wallet for signing transactions.
 */

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { usePrivy, useEmbeddedWallet } from '@privy-io/expo';
import { BrowserProvider } from 'ethers';
import {
  createProvider,
  getTSFBalance,
  isUserRegistered,
  getUBIInfo,
  registerUser,
  transferTSF,
  payBusiness,
  claimUBI,
  collectDemurrage,
  TesfaBalance,
  UBIInfo,
  TransactionResult,
  isValidAddress,
  shortenAddress,
  getExplorerTxUrl,
} from '../services/web3';

interface Web3ContextType {
  // State
  isReady: boolean;
  isLoading: boolean;
  balance: TesfaBalance | null;
  isRegistered: boolean;
  ubiInfo: UBIInfo | null;
  
  // Actions
  refreshBalance: () => Promise<void>;
  refreshUBIInfo: () => Promise<void>;
  register: () => Promise<TransactionResult>;
  sendTSF: (toAddress: string, amount: string) => Promise<TransactionResult>;
  payBusinessTx: (sellerAddress: string, amountILS: number) => Promise<TransactionResult>;
  claimUBITx: () => Promise<TransactionResult>;
  collectDemurrageTx: (targetAddress: string) => Promise<TransactionResult>;
  
  // Utilities
  validateAddress: (address: string) => boolean;
  formatAddress: (address: string) => string;
  getTxUrl: (txHash: string) => string;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  // Wrap Privy hooks in try-catch to prevent crashes
  let privyReady = false;
  let embeddedWallet: ReturnType<typeof useEmbeddedWallet> | null = null;
  
  try {
    const privy = usePrivy();
    privyReady = privy.isReady;
    embeddedWallet = useEmbeddedWallet();
  } catch (err) {
    console.error('Error initializing Privy hooks in Web3Provider:', err);
  }
  
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState<TesfaBalance | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [ubiInfo, setUbiInfo] = useState<UBIInfo | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);

  // Initialize provider when wallet is ready
  useEffect(() => {
    const initProvider = async () => {
      if (privyReady && embeddedWallet?.account?.address) {
        try {
          const walletProvider = await embeddedWallet.getProvider();
          if (walletProvider) {
            const ethersProvider = createProvider(walletProvider);
            setProvider(ethersProvider);
            setIsReady(true);
          }
        } catch (error) {
          console.error('Error initializing Web3 provider:', error);
        }
      }
    };

    initProvider();
  }, [privyReady, embeddedWallet?.account?.address]);

  // Fetch initial data when provider is ready
  useEffect(() => {
    if (isReady && provider && embeddedWallet?.account?.address) {
      refreshBalance();
      refreshUBIInfo();
      checkRegistration();
    }
  }, [isReady, provider, embeddedWallet?.account?.address]);

  const checkRegistration = useCallback(async () => {
    if (!provider || !embeddedWallet?.account?.address) return;
    
    try {
      const registered = await isUserRegistered(provider, embeddedWallet.account.address);
      setIsRegistered(registered);
    } catch (error) {
      console.error('Error checking registration:', error);
    }
  }, [provider, embeddedWallet?.account?.address]);

  const refreshBalance = useCallback(async () => {
    if (!provider || !embeddedWallet?.account?.address) return;
    
    try {
      const bal = await getTSFBalance(provider, embeddedWallet.account.address);
      setBalance(bal);
    } catch (error) {
      console.error('Error refreshing balance:', error);
    }
  }, [provider, embeddedWallet?.account?.address]);

  const refreshUBIInfo = useCallback(async () => {
    if (!provider) return;
    
    try {
      const info = await getUBIInfo(provider);
      setUbiInfo(info);
    } catch (error) {
      console.error('Error refreshing UBI info:', error);
    }
  }, [provider]);

  const register = useCallback(async (): Promise<TransactionResult> => {
    if (!provider) {
      return { success: false, error: 'Wallet not connected' };
    }
    
    setIsLoading(true);
    try {
      const result = await registerUser(provider);
      if (result.success) {
        setIsRegistered(true);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  }, [provider]);

  const sendTSF = useCallback(async (
    toAddress: string,
    amount: string
  ): Promise<TransactionResult> => {
    if (!provider) {
      return { success: false, error: 'Wallet not connected' };
    }
    
    if (!isValidAddress(toAddress)) {
      return { success: false, error: 'Invalid recipient address' };
    }
    
    setIsLoading(true);
    try {
      const result = await transferTSF(provider, toAddress, amount);
      if (result.success) {
        await refreshBalance();
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  }, [provider, refreshBalance]);

  const payBusinessTx = useCallback(async (
    sellerAddress: string,
    amountILS: number
  ): Promise<TransactionResult> => {
    if (!provider || !embeddedWallet?.account?.address) {
      return { success: false, error: 'Wallet not connected' };
    }
    
    if (!isValidAddress(sellerAddress)) {
      return { success: false, error: 'Invalid business address' };
    }
    
    setIsLoading(true);
    try {
      const result = await payBusiness(
        provider,
        embeddedWallet.account.address, // buyer (current user)
        sellerAddress, // seller (business)
        amountILS
      );
      if (result.success) {
        await refreshBalance();
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  }, [provider, embeddedWallet?.account?.address, refreshBalance]);

  const claimUBITx = useCallback(async (): Promise<TransactionResult> => {
    if (!provider) {
      return { success: false, error: 'Wallet not connected' };
    }
    
    setIsLoading(true);
    try {
      const result = await claimUBI(provider);
      if (result.success) {
        await Promise.all([refreshBalance(), refreshUBIInfo()]);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  }, [provider, refreshBalance, refreshUBIInfo]);

  const collectDemurrageTx = useCallback(async (
    targetAddress: string
  ): Promise<TransactionResult> => {
    if (!provider) {
      return { success: false, error: 'Wallet not connected' };
    }
    
    if (!isValidAddress(targetAddress)) {
      return { success: false, error: 'Invalid target address' };
    }
    
    setIsLoading(true);
    try {
      const result = await collectDemurrage(provider, targetAddress);
      if (result.success) {
        await refreshBalance();
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  }, [provider, refreshBalance]);

  const value: Web3ContextType = {
    isReady,
    isLoading,
    balance,
    isRegistered,
    ubiInfo,
    refreshBalance,
    refreshUBIInfo,
    register,
    sendTSF,
    payBusinessTx,
    claimUBITx,
    collectDemurrageTx,
    validateAddress: isValidAddress,
    formatAddress: shortenAddress,
    getTxUrl: getExplorerTxUrl,
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
}

/**
 * Hook to access Web3 context
 */
export function useWeb3(): Web3ContextType {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}

/**
 * Hook to get TSF balance
 */
export function useTSFBalance(): TesfaBalance | null {
  const { balance } = useWeb3();
  return balance;
}

/**
 * Hook to get UBI info
 */
export function useUBIInfo(): UBIInfo | null {
  const { ubiInfo } = useWeb3();
  return ubiInfo;
}
