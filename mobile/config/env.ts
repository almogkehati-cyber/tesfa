/**
 * TESFA Environment Configuration
 * 
 * This file centralizes all environment variables.
 * To configure: Add these to your .env file in the mobile directory:
 * 
 * EXPO_PUBLIC_PRIVY_APP_ID=your_privy_app_id_here
 */

export const ENV = {
  // Privy Configuration
  PRIVY_APP_ID: process.env.EXPO_PUBLIC_PRIVY_APP_ID || 'cmmm87oqe00270cl7u8fxts10',
  
  // App Configuration
  APP_NAME: 'TESFA',
  APP_VERSION: '1.0.0',
  
  // Chain Configuration (for embedded wallets)
  DEFAULT_CHAIN_ID: 137, // Polygon Mainnet
  
  // Feature Flags
  ENABLE_BIOMETRIC_AUTH: true,
  ENABLE_EMBEDDED_WALLETS: true,
} as const;

export type EnvConfig = typeof ENV;
