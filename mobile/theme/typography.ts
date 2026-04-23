/**
 * TESFA Typography System
 * Fonts: Plus Jakarta Sans (headlines), Manrope (body/labels)
 */

import { TextStyle } from 'react-native';

export const fonts = {
  headline: 'PlusJakartaSans-Bold',
  headlineExtrabold: 'PlusJakartaSans-ExtraBold',
  body: 'Manrope-Regular',
  bodyMedium: 'Manrope-Medium',
  bodySemibold: 'Manrope-SemiBold',
  label: 'Manrope-Medium',
  labelBold: 'Manrope-SemiBold',
} as const;

export const typography: Record<string, TextStyle> = {
  // Headlines
  displayLarge: {
    fontFamily: fonts.headlineExtrabold,
    fontSize: 56,
    lineHeight: 64,
    letterSpacing: -0.5,
  },
  displayMedium: {
    fontFamily: fonts.headlineExtrabold,
    fontSize: 48,
    lineHeight: 56,
    letterSpacing: -0.3,
  },
  displaySmall: {
    fontFamily: fonts.headline,
    fontSize: 40,
    lineHeight: 48,
    letterSpacing: -0.2,
  },
  headlineLarge: {
    fontFamily: fonts.headlineExtrabold,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.2,
  },
  headlineMedium: {
    fontFamily: fonts.headline,
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -0.1,
  },
  headlineSmall: {
    fontFamily: fonts.headline,
    fontSize: 24,
    lineHeight: 32,
  },
  
  // Titles
  titleLarge: {
    fontFamily: fonts.headline,
    fontSize: 22,
    lineHeight: 28,
  },
  titleMedium: {
    fontFamily: fonts.bodySemibold,
    fontSize: 18,
    lineHeight: 24,
  },
  titleSmall: {
    fontFamily: fonts.bodySemibold,
    fontSize: 16,
    lineHeight: 22,
  },

  // Body
  bodyLarge: {
    fontFamily: fonts.body,
    fontSize: 18,
    lineHeight: 26,
  },
  bodyMedium: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 24,
  },
  bodySmall: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
  },

  // Labels
  labelLarge: {
    fontFamily: fonts.labelBold,
    fontSize: 14,
    lineHeight: 20,
  },
  labelMedium: {
    fontFamily: fonts.label,
    fontSize: 12,
    lineHeight: 16,
  },
  labelSmall: {
    fontFamily: fonts.label,
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.5,
  },

  // Buttons
  buttonLarge: {
    fontFamily: fonts.headline,
    fontSize: 18,
    lineHeight: 24,
  },
  buttonMedium: {
    fontFamily: fonts.headline,
    fontSize: 16,
    lineHeight: 22,
  },
  buttonSmall: {
    fontFamily: fonts.bodySemibold,
    fontSize: 14,
    lineHeight: 20,
  },
};
