import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { usePrivy, useEmbeddedWallet, isNotCreated } from '@privy-io/expo';

/**
 * User type representing authenticated user data
 */
export interface TESFAUser {
  id: string;
  email?: string;
  phone?: string;
  walletAddress?: string;
  createdAt?: Date;
}

/**
 * Auth state and methods exposed to the app
 */
interface AuthContextType {
  // State
  user: TESFAUser | null;
  walletAddress: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isWalletReady: boolean;
  
  // Auth methods
  sendOTP: (identifier: string, type: 'email' | 'sms') => Promise<void>;
  verifyOTP: (code: string) => Promise<boolean>;
  logout: () => Promise<void>;
  
  // Wallet methods
  getWalletAddress: () => string | null;
  
  // Error handling
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Wrap Privy hooks in try-catch to prevent crashes
  let privy: ReturnType<typeof usePrivy>;
  let embeddedWallet: ReturnType<typeof useEmbeddedWallet>;
  
  try {
    privy = usePrivy();
    embeddedWallet = useEmbeddedWallet();
  } catch (err) {
    console.error('Error initializing Privy hooks:', err);
    // Return a minimal provider that won't crash
    const fallbackValue: AuthContextType = {
      user: null,
      walletAddress: null,
      isAuthenticated: false,
      isLoading: false,
      isWalletReady: false,
      sendOTP: async () => { throw new Error('Auth not available'); },
      verifyOTP: async () => false,
      logout: async () => {},
      getWalletAddress: () => null,
      error: 'Failed to initialize authentication',
      clearError: () => {},
    };
    return <AuthContext.Provider value={fallbackValue}>{children}</AuthContext.Provider>;
  }
  
  const [user, setUser] = useState<TESFAUser | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isWalletReady, setIsWalletReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingOTPIdentifier, setPendingOTPIdentifier] = useState<{ value: string; type: 'email' | 'sms' } | null>(null);

  // Update user state when Privy user changes
  useEffect(() => {
    if (privy.user) {
      const privyUser = privy.user;
      setUser({
        id: privyUser.id,
        email: privyUser.email?.address,
        phone: privyUser.phone?.number,
        createdAt: privyUser.createdAt ? new Date(privyUser.createdAt) : undefined,
      });
      setIsLoading(false);
    } else {
      setUser(null);
      setWalletAddress(null);
      setIsLoading(false);
    }
  }, [privy.user]);

  // Handle embedded wallet creation and status
  useEffect(() => {
    const setupEmbeddedWallet = async () => {
      if (privy.isReady && privy.user) {
        try {
          // Check if wallet needs to be created
          if (isNotCreated(embeddedWallet)) {
            // Create embedded wallet automatically
            await embeddedWallet.create();
          }
          
          // Get wallet address once ready
          if (embeddedWallet.account?.address) {
            setWalletAddress(embeddedWallet.account.address);
            setIsWalletReady(true);
            
            // Update user with wallet address
            setUser(prev => prev ? { ...prev, walletAddress: embeddedWallet.account?.address } : null);
          }
        } catch (err) {
          console.error('Failed to setup embedded wallet:', err);
          setError('Failed to create wallet. Please try again.');
        }
      }
    };

    setupEmbeddedWallet();
  }, [privy.isReady, privy.user, embeddedWallet]);

  /**
   * Send OTP to email or phone
   */
  const sendOTP = useCallback(async (identifier: string, type: 'email' | 'sms') => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (type === 'email') {
        await privy.email.sendCode({ email: identifier });
      } else {
        await privy.sms.sendCode({ phone: identifier });
      }
      setPendingOTPIdentifier({ value: identifier, type });
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to send verification code';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [privy]);

  /**
   * Verify OTP code and complete authentication
   * Returns true if verification successful, false otherwise
   */
  const verifyOTP = useCallback(async (code: string): Promise<boolean> => {
    if (!pendingOTPIdentifier) {
      setError('No pending verification. Please request a new code.');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (pendingOTPIdentifier.type === 'email') {
        await privy.email.loginWithCode({
          email: pendingOTPIdentifier.value,
          code,
        });
      } else {
        await privy.sms.loginWithCode({
          phone: pendingOTPIdentifier.value,
          code,
        });
      }
      
      setPendingOTPIdentifier(null);
      return true;
    } catch (err: any) {
      const errorMessage = err?.message || 'Invalid verification code';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [privy, pendingOTPIdentifier]);

  /**
   * Logout user and clear all state
   */
  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await privy.logout();
      setUser(null);
      setWalletAddress(null);
      setIsWalletReady(false);
      setPendingOTPIdentifier(null);
    } catch (err: any) {
      setError(err?.message || 'Failed to logout');
    } finally {
      setIsLoading(false);
    }
  }, [privy]);

  /**
   * Get the current wallet address
   */
  const getWalletAddress = useCallback(() => {
    return walletAddress;
  }, [walletAddress]);

  /**
   * Clear any error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: AuthContextType = {
    user,
    walletAddress,
    isAuthenticated: !!privy.user,
    isLoading: isLoading || !privy.isReady,
    isWalletReady,
    sendOTP,
    verifyOTP,
    logout,
    getWalletAddress,
    error,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access auth context
 * Must be used within AuthProvider
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

/**
 * Hook to check if user is authenticated
 * Useful for route guards
 */
export function useIsAuthenticated(): boolean {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
}

/**
 * Hook to get wallet address
 */
export function useWalletAddress(): string | null {
  const { walletAddress } = useAuth();
  return walletAddress;
}
