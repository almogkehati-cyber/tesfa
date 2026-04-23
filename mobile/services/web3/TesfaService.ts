/**
 * Tesfa Web3 Service
 * 
 * Handles all blockchain interactions with the Tesfa smart contract.
 * Uses the user's Privy embedded wallet to sign transactions.
 */

import { ethers, Contract, BrowserProvider, formatUnits, parseUnits } from 'ethers';
import { TESFA_CONTRACT_ADDRESS, TESFA_ABI, ACTIVE_NETWORK, TSF_DECIMALS } from './config';

export interface TransactionResult {
  success: boolean;
  hash?: string;
  error?: string;
}

export interface TesfaBalance {
  raw: bigint;
  formatted: string;
  display: string;
}

export interface UBIInfo {
  poolBalance: string;
  totalRegistered: number;
  estimatedShare: string;
}

/**
 * Create an ethers provider from the Privy embedded wallet provider
 */
export function createProvider(privyProvider: any): BrowserProvider {
  return new BrowserProvider(privyProvider);
}

/**
 * Get the Tesfa contract instance
 */
export function getTesfaContract(provider: BrowserProvider): Contract {
  return new Contract(TESFA_CONTRACT_ADDRESS, TESFA_ABI, provider);
}

/**
 * Get the Tesfa contract with signer for write operations
 */
export async function getTesfaContractWithSigner(provider: BrowserProvider): Promise<Contract> {
  const signer = await provider.getSigner();
  return new Contract(TESFA_CONTRACT_ADDRESS, TESFA_ABI, signer);
}

/**
 * Format TSF balance for display
 */
export function formatTSFBalance(balance: bigint): TesfaBalance {
  const formatted = formatUnits(balance, TSF_DECIMALS);
  const numValue = parseFloat(formatted);
  
  // Format for display with appropriate precision
  let display: string;
  if (numValue === 0) {
    display = '0';
  } else if (numValue < 0.01) {
    display = '< 0.01';
  } else if (numValue < 1000) {
    display = numValue.toFixed(2);
  } else if (numValue < 1000000) {
    display = (numValue / 1000).toFixed(2) + 'K';
  } else {
    display = (numValue / 1000000).toFixed(2) + 'M';
  }
  
  return {
    raw: balance,
    formatted,
    display,
  };
}

/**
 * Parse TSF amount from string to wei
 */
export function parseTSFAmount(amount: string): bigint {
  return parseUnits(amount, TSF_DECIMALS);
}

// ============================================
// READ FUNCTIONS
// ============================================

/**
 * Get TSF token balance for an address
 */
export async function getTSFBalance(
  provider: BrowserProvider,
  address: string
): Promise<TesfaBalance> {
  try {
    const contract = getTesfaContract(provider);
    const balance = await contract.balanceOf(address);
    return formatTSFBalance(balance);
  } catch (error) {
    console.error('Error fetching TSF balance:', error);
    return { raw: BigInt(0), formatted: '0', display: '0' };
  }
}

/**
 * Check if an address is registered
 */
export async function isUserRegistered(
  provider: BrowserProvider,
  address: string
): Promise<boolean> {
  try {
    const contract = getTesfaContract(provider);
    return await contract.isRegistered(address);
  } catch (error) {
    console.error('Error checking registration:', error);
    return false;
  }
}

/**
 * Get UBI pool information
 */
export async function getUBIInfo(provider: BrowserProvider): Promise<UBIInfo> {
  try {
    const contract = getTesfaContract(provider);
    const [poolBalance, totalRegistered] = await Promise.all([
      contract.ubiPool(),
      contract.totalRegistered(),
    ]);
    
    const poolFormatted = formatUnits(poolBalance, TSF_DECIMALS);
    const registeredCount = Number(totalRegistered);
    const estimatedShare = registeredCount > 0 
      ? (parseFloat(poolFormatted) / registeredCount).toFixed(2)
      : '0';
    
    return {
      poolBalance: poolFormatted,
      totalRegistered: registeredCount,
      estimatedShare,
    };
  } catch (error) {
    console.error('Error fetching UBI info:', error);
    return { poolBalance: '0', totalRegistered: 0, estimatedShare: '0' };
  }
}

// ============================================
// WRITE FUNCTIONS
// ============================================

/**
 * Register user on the Tesfa contract
 */
export async function registerUser(
  provider: BrowserProvider
): Promise<TransactionResult> {
  try {
    const contract = await getTesfaContractWithSigner(provider);
    const tx = await contract.register();
    await tx.wait();
    
    return { success: true, hash: tx.hash };
  } catch (error: any) {
    console.error('Error registering user:', error);
    return { 
      success: false, 
      error: error.reason || error.message || 'Registration failed' 
    };
  }
}

/**
 * Transfer TSF tokens to another address
 */
export async function transferTSF(
  provider: BrowserProvider,
  toAddress: string,
  amount: string
): Promise<TransactionResult> {
  try {
    const contract = await getTesfaContractWithSigner(provider);
    const amountWei = parseTSFAmount(amount);
    
    const tx = await contract.transfer(toAddress, amountWei);
    await tx.wait();
    
    return { success: true, hash: tx.hash };
  } catch (error: any) {
    console.error('Error transferring TSF:', error);
    return { 
      success: false, 
      error: error.reason || error.message || 'Transfer failed' 
    };
  }
}

/**
 * Record a business transaction (Pay Business)
 * This mints new TSF with 60% to buyer and 40% to seller
 */
export async function payBusiness(
  provider: BrowserProvider,
  buyerAddress: string,
  sellerAddress: string,
  amountILS: number
): Promise<TransactionResult> {
  try {
    const contract = await getTesfaContractWithSigner(provider);
    
    // amountILS should be in whole ILS (not wei), contract handles the math
    const tx = await contract.recordTransaction(buyerAddress, sellerAddress, amountILS);
    await tx.wait();
    
    return { success: true, hash: tx.hash };
  } catch (error: any) {
    console.error('Error recording transaction:', error);
    return { 
      success: false, 
      error: error.reason || error.message || 'Transaction failed' 
    };
  }
}

/**
 * Claim UBI from the pool
 */
export async function claimUBI(
  provider: BrowserProvider
): Promise<TransactionResult> {
  try {
    const contract = await getTesfaContractWithSigner(provider);
    const tx = await contract.claimUBI();
    await tx.wait();
    
    return { success: true, hash: tx.hash };
  } catch (error: any) {
    console.error('Error claiming UBI:', error);
    return { 
      success: false, 
      error: error.reason || error.message || 'UBI claim failed' 
    };
  }
}

/**
 * Collect demurrage from a target address
 */
export async function collectDemurrage(
  provider: BrowserProvider,
  targetAddress: string
): Promise<TransactionResult> {
  try {
    const contract = await getTesfaContractWithSigner(provider);
    const tx = await contract.collectDemurrage(targetAddress);
    await tx.wait();
    
    return { success: true, hash: tx.hash };
  } catch (error: any) {
    console.error('Error collecting demurrage:', error);
    return { 
      success: false, 
      error: error.reason || error.message || 'Demurrage collection failed' 
    };
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Validate Ethereum address
 */
export function isValidAddress(address: string): boolean {
  try {
    return ethers.isAddress(address);
  } catch {
    return false;
  }
}

/**
 * Shorten address for display
 */
export function shortenAddress(address: string, chars = 4): string {
  if (!address) return '';
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

/**
 * Get transaction explorer URL
 */
export function getExplorerTxUrl(txHash: string): string {
  return `${ACTIVE_NETWORK.blockExplorer}/tx/${txHash}`;
}

/**
 * Get address explorer URL
 */
export function getExplorerAddressUrl(address: string): string {
  return `${ACTIVE_NETWORK.blockExplorer}/address/${address}`;
}
