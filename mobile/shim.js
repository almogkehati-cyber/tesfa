// Shim file - Must be imported FIRST before anything else
// This provides polyfills for React Native / Hermes engine

// TextEncoder/TextDecoder MUST be set BEFORE any other imports
import { TextDecoder, TextEncoder } from 'text-encoding';
global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;

// Crypto polyfill
import 'react-native-get-random-values';

// Ethers shims - provides btoa, atob
import '@ethersproject/shims';

console.log('[SHIM] Polyfills loaded successfully');
