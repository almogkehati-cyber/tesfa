/**
 * TESFA Design System Colors
 * Extracted from Galileo Design - DO NOT MODIFY
 */

export const colors = {
  // Primary
  primary: '#deb7ff',
  primaryContainer: '#7b2fbe',
  onPrimary: '#4a007f',
  onPrimaryContainer: '#e4c4ff',
  primaryFixed: '#f0dbff',
  primaryFixedDim: '#deb7ff',
  onPrimaryFixed: '#2c0050',
  onPrimaryFixedVariant: '#6712aa',
  inversePrimary: '#8136c4',

  // Secondary
  secondary: '#d7baff',
  secondaryContainer: '#6107ba',
  onSecondary: '#440087',
  onSecondaryContainer: '#caa4ff',
  secondaryFixed: '#eddcff',
  secondaryFixedDim: '#d7baff',
  onSecondaryFixed: '#290055',
  onSecondaryFixedVariant: '#6107ba',

  // Tertiary
  tertiary: '#fbba68',
  tertiaryContainer: '#7e4f00',
  onTertiary: '#472a00',
  onTertiaryContainer: '#ffc681',
  tertiaryFixed: '#ffddb7',
  tertiaryFixedDim: '#fbba68',
  onTertiaryFixed: '#2a1700',
  onTertiaryFixedVariant: '#653e00',

  // Error
  error: '#ffb4ab',
  errorContainer: '#93000a',
  onError: '#690005',
  onErrorContainer: '#ffdad6',

  // Surface
  surface: '#121222',
  surfaceDim: '#121222',
  surfaceBright: '#38374a',
  surfaceContainerLowest: '#0c0c1d',
  surfaceContainerLow: '#1a1a2b',
  surfaceContainer: '#1e1e2f',
  surfaceContainerHigh: '#29283a',
  surfaceContainerHighest: '#333345',
  surfaceVariant: '#333345',
  surfaceTint: '#deb7ff',
  inverseSurface: '#e3e0f8',
  inverseOnSurface: '#2f2f40',

  // On Surface
  onSurface: '#e3e0f8',
  onSurfaceVariant: '#cfc2d5',

  // Background
  background: '#121222',
  onBackground: '#e3e0f8',

  // Outline
  outline: '#988d9e',
  outlineVariant: '#4c4353',

  // Gradients (as arrays for LinearGradient)
  gradientPrimary: ['#7B2FBE', '#9B59F5'],
  gradientPrimaryReverse: ['#9B59F5', '#7B2FBE'],

  // Semantic
  success: '#4CAF50',
  warning: '#FF9800',
  info: '#2196F3',

  // Transparency helpers
  transparent: 'transparent',
  white: '#FFFFFF',
  black: '#000000',
} as const;

export type ColorKey = keyof typeof colors;
