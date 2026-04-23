import React, { createContext, useContext, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

const { width } = Dimensions.get('window');

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastConfig {
  message: string;
  type: ToastType;
  duration?: number;
  subtitle?: string;
}

interface ToastContextType {
  showToast: (config: ToastConfig) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

const toastIcons: Record<ToastType, keyof typeof MaterialIcons.glyphMap> = {
  success: 'check-circle',
  error: 'error',
  info: 'info',
  warning: 'warning',
};

const toastColors: Record<ToastType, string> = {
  success: '#4CAF50',
  error: colors.error,
  info: colors.primary,
  warning: colors.tertiary,
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastConfig | null>(null);
  const translateY = useSharedValue(100);
  const opacity = useSharedValue(0);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  const showToast = useCallback((config: ToastConfig) => {
    setToast(config);
    translateY.value = 100;
    opacity.value = 0;

    translateY.value = withSequence(
      withTiming(0, { duration: 300 }),
      withTiming(0, { duration: config.duration || 3000 }),
      withTiming(100, { duration: 300 }, () => {
        runOnJS(hideToast)();
      })
    );

    opacity.value = withSequence(
      withTiming(1, { duration: 300 }),
      withTiming(1, { duration: config.duration || 3000 }),
      withTiming(0, { duration: 300 })
    );
  }, [translateY, opacity, hideToast]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Animated.View style={[styles.container, animatedStyle]}>
          <View style={[styles.toast, { borderLeftColor: toastColors[toast.type] }]}>
            <View style={[styles.iconContainer, { backgroundColor: `${toastColors[toast.type]}20` }]}>
              <MaterialIcons
                name={toastIcons[toast.type]}
                size={24}
                color={toastColors[toast.type]}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.message}>{toast.message}</Text>
              {toast.subtitle && (
                <Text style={styles.subtitle}>{toast.subtitle}</Text>
              )}
            </View>
          </View>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
    zIndex: 9999,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.surfaceContainer}F0`,
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  message: {
    color: colors.onSurface,
    fontSize: 14,
    fontWeight: '600',
  },
  subtitle: {
    color: colors.onSurfaceVariant,
    fontSize: 12,
    marginTop: 2,
  },
});
