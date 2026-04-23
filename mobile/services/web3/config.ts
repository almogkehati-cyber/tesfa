/**
 * Web3 Configuration
 * 
 * Contains contract addresses, ABIs, and network configuration.
 * Update CONTRACT_ADDRESS with your deployed Tesfa contract address.
 */

// Polygon Mainnet Configuration
export const POLYGON_CONFIG = {
  chainId: 137,
  chainName: 'Polygon Mainnet',
  rpcUrl: 'https://polygon-rpc.com',
  blockExplorer: 'https://polygonscan.com',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
};

// Polygon Amoy Testnet (for development)
export const POLYGON_TESTNET_CONFIG = {
  chainId: 80002,
  chainName: 'Polygon Amoy',
  rpcUrl: 'https://rpc-amoy.polygon.technology/',
  blockExplorer: 'https://amoy.polygonscan.com',
  nativeCurrency: {
    name: 'POL',
    symbol: 'POL',
    decimals: 18,
  },
};

// Use testnet for development, mainnet for production
export const ACTIVE_NETWORK = __DEV__ ? POLYGON_TESTNET_CONFIG : POLYGON_CONFIG;

// Contract Address - UPDATE THIS with your deployed contract address
export const TESFA_CONTRACT_ADDRESS = '0xc92503d6405954ef5388fBE1E3a3288498Cc482F';

// Tesfa Token Decimals
export const TSF_DECIMALS = 18;

// Tesfa Contract ABI (only the functions we need)
export const TESFA_ABI = [
  // ERC20 Standard
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address account) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function transferFrom(address from, address to, uint256 amount) returns (bool)',
  
  // Tesfa Specific - Read Functions
  'function MAX_SUPPLY() view returns (uint256)',
  'function BASE_RATE() view returns (uint256)',
  'function TAX_RATE() view returns (uint256)',
  'function BUYER_SHARE() view returns (uint256)',
  'function SELLER_SHARE() view returns (uint256)',
  'function ubiPool() view returns (uint256)',
  'function totalRegistered() view returns (uint256)',
  'function isRegistered(address) view returns (bool)',
  'function lastActivity(address) view returns (uint256)',
  'function lastDemurrageTime(address) view returns (uint256)',
  
  // Tesfa Specific - Write Functions
  'function register() external',
  'function recordTransaction(address buyer, address seller, uint256 amountILS) external',
  'function claimUBI() external',
  'function collectDemurrage(address target) external',
  'function recoverInactive(address user) external',
  
  // Events
  'event Registered(address indexed user)',
  'event TSFMinted(address indexed buyer, address indexed seller, uint256 buyerAmount, uint256 sellerAmount)',
  'event TaxCollected(uint256 amount)',
  'event UBIClaimed(address indexed user, uint256 amount)',
  'event DemurrageCollected(address indexed hunter, address indexed target, uint256 burnedFromTarget, uint256 hunterMint, uint256 toPool)',
  'event InactiveRecovered(address indexed user, uint256 amount)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
] as const;
