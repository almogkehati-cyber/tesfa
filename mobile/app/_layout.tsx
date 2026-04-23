// Crypto polyfill - MUST be first import
import 'react-native-get-random-values';
import '@ethersproject/shims';

console.log('=== APP STARTING ===');
console.log('Checking TextDecoder:', typeof TextDecoder);
console.log('Checking TextEncoder:', typeof TextEncoder);
console.log('Checking crypto:', typeof crypto);
console.log('Checking Buffer:', typeof Buffer);

// Early crash detection - wrap imports in try/catch
let React: any;
let Component: any;
let ErrorInfo: any;
let ReactNode: any;
let View: any;
let Text: any;
let StyleSheet: any;
let TouchableOpacity: any;
let ScrollView: any;
let Stack: any;
let StatusBar: any;
let GestureHandlerRootView: any;
let SafeAreaProvider: any;
let colors: any;
let PrivyProvider: any;
let AuthProvider: any;
let Web3Provider: any;
let AsyncStorage: any;
let InstallButton: any;
let Platform: any;

let initError: string | null = null;

// Save crash to AsyncStorage for next launch
const saveCrash = async (error: string) => {
  try {
    if (AsyncStorage) {
      await AsyncStorage.setItem('@crash_log', JSON.stringify({
        error,
        timestamp: new Date().toISOString(),
      }));
    }
  } catch (e) {
    console.error('Failed to save crash:', e);
  }
};

try {
  const ReactModule = require('react');
  React = ReactModule.default || ReactModule;
  Component = ReactModule.Component;
  
  const RN = require('react-native');
  View = RN.View;
  Text = RN.Text;
  StyleSheet = RN.StyleSheet;
  TouchableOpacity = RN.TouchableOpacity;
  ScrollView = RN.ScrollView;
  
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
  
  const ExpoRouter = require('expo-router');
  Stack = ExpoRouter.Stack;
  
  const ExpoStatusBar = require('expo-status-bar');
  StatusBar = ExpoStatusBar.StatusBar;
  
  const GestureHandler = require('react-native-gesture-handler');
  GestureHandlerRootView = GestureHandler.GestureHandlerRootView;
  
  const SafeArea = require('react-native-safe-area-context');
  SafeAreaProvider = SafeArea.SafeAreaProvider;
  
  colors = require('../theme/colors').colors;
  PrivyProvider = require('../providers/PrivyProvider').PrivyProvider;
  AuthProvider = require('../context/AuthContext').AuthProvider;
  Web3Provider = require('../context/Web3Context').Web3Provider;
  InstallButton = require('../components/InstallButton').default;
  Platform = require('react-native').Platform;
  
} catch (error: any) {
  initError = `INIT ERROR: ${error.message}\n\nStack: ${error.stack}`;
  console.error('🔴 INITIALIZATION CRASH:', initError);
  saveCrash(initError);
}

/**
 * Global Error Boundary with full crash details
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: any;
  previousCrash: string | null;
}

class GlobalErrorBoundary extends Component<{ children: any }, ErrorBoundaryState> {
  constructor(props: { children: any }) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null, previousCrash: null };
  }

  async componentDidMount() {
    // Check for previous crash
    try {
      const crashLog = await AsyncStorage?.getItem('@crash_log');
      if (crashLog) {
        this.setState({ previousCrash: crashLog });
        await AsyncStorage.removeItem('@crash_log');
      }
    } catch (e) {
      console.error('Failed to read crash log:', e);
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('🔴 CRASH:', error.message);
    console.error('Stack:', error.stack);
    this.setState({ errorInfo });
    saveCrash(`${error.message}\n\n${error.stack}`);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null, previousCrash: null });
  };

  handleClearCrash = async () => {
    try {
      await AsyncStorage?.removeItem('@crash_log');
      this.setState({ previousCrash: null });
    } catch (e) {}
  };

  render() {
    // Show previous crash if exists
    if (this.state.previousCrash) {
      let crashData;
      try {
        crashData = JSON.parse(this.state.previousCrash);
      } catch {
        crashData = { error: this.state.previousCrash };
      }
      
      return (
        <View style={errorStyles.container}>
          <ScrollView contentContainerStyle={errorStyles.scrollContent}>
            <Text style={errorStyles.emoji}>⚠️</Text>
            <Text style={errorStyles.title}>קריסה קודמת נמצאה</Text>
            
            <View style={errorStyles.box}>
              <Text style={errorStyles.label}>שגיאה מהפעלה קודמת:</Text>
              <Text style={errorStyles.errorText}>{crashData.error}</Text>
              {crashData.timestamp && (
                <Text style={errorStyles.stackText}>Time: {crashData.timestamp}</Text>
              )}
            </View>
            
            <TouchableOpacity style={errorStyles.button} onPress={this.handleClearCrash}>
              <Text style={errorStyles.buttonText}>המשך</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      );
    }

    if (this.state.hasError) {
      return (
        <View style={errorStyles.container}>
          <ScrollView contentContainerStyle={errorStyles.scrollContent}>
            <Text style={errorStyles.emoji}>🔴</Text>
            <Text style={errorStyles.title}>האפליקציה קרסה</Text>
            
            <View style={errorStyles.box}>
              <Text style={errorStyles.label}>שגיאה:</Text>
              <Text style={errorStyles.errorText}>
                {this.state.error?.message || 'Unknown error'}
              </Text>
            </View>
            
            {this.state.error?.stack && (
              <View style={errorStyles.box}>
                <Text style={errorStyles.label}>Stack Trace:</Text>
                <Text style={errorStyles.stackText}>
                  {this.state.error.stack}
                </Text>
              </View>
            )}
            
            {this.state.errorInfo?.componentStack && (
              <View style={errorStyles.box}>
                <Text style={errorStyles.label}>Component Stack:</Text>
                <Text style={errorStyles.stackText}>
                  {this.state.errorInfo.componentStack}
                </Text>
              </View>
            )}
            
            <TouchableOpacity style={errorStyles.button} onPress={this.handleRetry}>
              <Text style={errorStyles.buttonText}>נסה שוב</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      );
    }
    return this.props.children;
  }
}

const errorStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0d13',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 60,
  },
  emoji: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ff4444',
    textAlign: 'center',
    marginBottom: 20,
  },
  box: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#deb7ff',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    color: '#ff6b6b',
  },
  stackText: {
    fontSize: 10,
    color: '#888',
    fontFamily: 'monospace',
  },
  button: {
    backgroundColor: '#deb7ff',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
    alignSelf: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#0f0d13',
    fontSize: 16,
    fontWeight: '600',
  },
});

/**
 * Root Layout with Privy Authentication
 */
export default function RootLayout() {
  // If initialization failed, show error screen
  if (initError) {
    const RN = require('react-native');
    return (
      <RN.View style={{ flex: 1, backgroundColor: '#0f0d13', padding: 24, paddingTop: 60 }}>
        <RN.ScrollView>
          <RN.Text style={{ fontSize: 48, textAlign: 'center', marginBottom: 12 }}>💥</RN.Text>
          <RN.Text style={{ fontSize: 22, fontWeight: 'bold', color: '#ff4444', textAlign: 'center', marginBottom: 20 }}>
            שגיאת אתחול
          </RN.Text>
          <RN.View style={{ backgroundColor: '#1a1a2e', borderRadius: 12, padding: 16, marginBottom: 12 }}>
            <RN.Text style={{ fontSize: 14, fontWeight: 'bold', color: '#deb7ff', marginBottom: 8 }}>
              השגיאה קרתה לפני שהאפליקציה נטענה:
            </RN.Text>
            <RN.Text style={{ fontSize: 12, color: '#ff6b6b', fontFamily: 'monospace' }}>
              {initError}
            </RN.Text>
          </RN.View>
        </RN.ScrollView>
      </RN.View>
    );
  }

  return (
    <GlobalErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <PrivyProvider>
            <AuthProvider>
              <Web3Provider>
                <StatusBar style="light" />
                {Platform?.OS === 'web' && InstallButton && <InstallButton />}
                <Stack
                  screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: colors.background },
                    animation: 'slide_from_right',
                  }}
                >
                  <Stack.Screen name="index" options={{ headerShown: false }} />
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                  <Stack.Screen name="scan" />
                  <Stack.Screen name="receive" />
                  <Stack.Screen name="directory" />
                  <Stack.Screen name="send" />
                  <Stack.Screen name="business" />
                  <Stack.Screen name="settings" />
                  <Stack.Screen name="transaction" />
                  <Stack.Screen name="review" />
                  <Stack.Screen name="ubi" />
                </Stack>
              </Web3Provider>
            </AuthProvider>
          </PrivyProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </GlobalErrorBoundary>
  );
}
