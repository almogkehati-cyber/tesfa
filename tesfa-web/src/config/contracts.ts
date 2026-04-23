export const TESFA_CONTRACT_ADDRESS = '0xc92503d6405954ef5388fBE1E3a3288498Cc482F' as const;

export const TESFA_ABI = [
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'accounts',
    outputs: [
      { internalType: 'bytes32', name: 'phoneHash', type: 'bytes32' },
      { internalType: 'enum Tesfa.AccountType', name: 'accountType', type: 'uint8' },
      { internalType: 'uint256', name: 'registrationTime', type: 'uint256' },
      { internalType: 'uint256', name: 'lastClaimTime', type: 'uint256' },
      { internalType: 'uint256', name: 'consecutiveDays', type: 'uint256' },
      { internalType: 'uint256', name: 'monthlyUbiClaimed', type: 'uint256' },
      { internalType: 'uint256', name: 'communityScore', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'phoneHash', type: 'bytes32' }],
    name: 'register',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claimUBI',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
