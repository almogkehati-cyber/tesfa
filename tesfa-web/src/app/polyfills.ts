/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextDecoder, TextEncoder } from 'util';

if (typeof global !== 'undefined') {
  (global as any).TextDecoder = TextDecoder as any;
  (global as any).TextEncoder = TextEncoder as any;
}
