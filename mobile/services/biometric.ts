/**
 * Simple Biometric Service
 * Uses react-native-simple-biometrics - no Expo dependencies
 */

import SimpleBiometrics from 'react-native-simple-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BIOMETRIC_ENROLLED_KEY = 'tesfa_biometric_enrolled';

/**
 * Check if biometric authentication is available on the device
 */
export const isBiometricAvailable = async (): Promise<boolean> => {
  try {
    return await SimpleBiometrics.canAuthenticate();
  } catch {
    return false;
  }
};

/**
 * Authenticate the user with biometrics
 */
export const authenticate = async (message: string = 'אמת את הזהות שלך'): Promise<boolean> => {
  try {
    await SimpleBiometrics.requestBioAuth('TESFA', message);
    return true;
  } catch (error) {
    console.error('Biometric error:', error);
    return false;
  }
};

/**
 * Enroll biometrics for the user (just mark as enrolled after successful auth)
 */
export const enrollBiometric = async (): Promise<boolean> => {
  const available = await isBiometricAvailable();
  if (!available) {
    return false;
  }

  const success = await authenticate('אמת את הזהות שלך להרשמה');
  if (success) {
    await AsyncStorage.setItem(BIOMETRIC_ENROLLED_KEY, 'true');
  }
  return success;
};

/**
 * Check if user has enrolled biometrics in our app
 */
export const isEnrolled = async (): Promise<boolean> => {
  const enrolled = await AsyncStorage.getItem(BIOMETRIC_ENROLLED_KEY);
  return enrolled === 'true';
};

/**
 * Clear biometric enrollment
 */
export const clearEnrollment = async (): Promise<void> => {
  await AsyncStorage.removeItem(BIOMETRIC_ENROLLED_KEY);
};

/**
 * Verify biometric for UBI claim
 */
export const verifyForUBI = async (): Promise<boolean> => {
  return await authenticate('אמת את הזהות שלך לקבלת הכנסה בסיסית');
};

/**
 * Verify biometric for large transaction
 */
export const verifyForTransaction = async (): Promise<boolean> => {
  return await authenticate('אמת את הזהות שלך לביצוע העברה');
};
