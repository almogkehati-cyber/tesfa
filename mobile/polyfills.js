import { TextEncoder, TextDecoder } from '@borewit/text-codec';

// הגדר מיידית בגלובל סקופ
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}
