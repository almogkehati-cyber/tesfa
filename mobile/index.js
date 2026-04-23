// Polyfills MUST be first
import './polyfills';

// Now we can import React Native
import { I18nManager, Platform, NativeModules } from 'react-native';

// Force RTL layout for Hebrew
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

console.log('RTL Status:', I18nManager.isRTL);

// If RTL is not applied yet, we need to reload the app
if (!I18nManager.isRTL && Platform.OS === 'android') {
  console.log('RTL not applied yet, will take effect on next launch');
  try {
    NativeModules.DevSettings?.reload?.();
  } catch (e) {
    console.log('Reload not available in release mode');
  }
}

console.log('Polyfills ready');

// Now import the app
import 'expo-router/entry';
