import React, { ReactNode, Component, ErrorInfo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PrivyProvider as PrivySDKProvider } from '@privy-io/expo';
import { ENV } from '../config/env';

interface PrivyProviderProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary to catch Privy initialization errors
 */
class PrivyErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Privy initialization error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>אופס! משהו השתבש</Text>
          <Text style={styles.errorText}>נסה לסגור ולפתוח את האפליקציה מחדש</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f0d13',
    padding: 20,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#a0a0a0',
    textAlign: 'center',
  },
});

/**
 * TESFA Privy Provider
 * 
 * Wraps the app with Privy authentication.
 * Configures embedded wallets and supported login methods.
 */
export function PrivyProvider({ children }: PrivyProviderProps) {
  // Validate App ID before initializing
  const appId = ENV.PRIVY_APP_ID;
  
  if (!appId || appId === 'your_privy_app_id_here' || appId.length < 10) {
    console.error('Invalid Privy App ID:', appId);
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>שגיאת הגדרה</Text>
        <Text style={styles.errorText}>Privy App ID לא תקין</Text>
      </View>
    );
  }

  return (
    <PrivyErrorBoundary>
      <PrivySDKProvider
        appId={appId}
        config={{
          embeddedWallets: {
            createOnLogin: 'all-users',
          },
          loginMethods: ['email', 'sms'],
          appearance: {
            theme: 'dark',
            accentColor: '#deb7ff',
          },
        }}
      >
        {children}
      </PrivySDKProvider>
    </PrivyErrorBoundary>
  );
}

export default PrivyProvider;
