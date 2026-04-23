import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

const numpadKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'backspace'];

export default function RefundExecuteScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [amount, setAmount] = useState(params.amount?.toString() || '0');
  const customerName = params.name?.toString() || 'איתי אברהמי';
  const txId = params.txId?.toString() || 'TRX-8829';

  const handleKeyPress = (key: string) => {
    if (key === 'backspace') {
      setAmount(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
    } else if (key === '.') {
      if (!amount.includes('.')) {
        setAmount(prev => prev + '.');
      }
    } else {
      if (amount === '0') {
        setAmount(key);
      } else {
        setAmount(prev => prev + key);
      }
    }
  };

  const handleConfirm = () => {
    router.push({ 
      pathname: '/business/refund-success', 
      params: { amount, name: customerName, txId } 
    });
  };

  const formattedAmount = parseFloat(amount).toLocaleString('he-IL', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <MaterialIcons name="history" size={24} color={colors.onSurfaceVariant} />
        </TouchableOpacity>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>ביצוע זיכוי</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <MaterialIcons name="arrow-forward" size={24} color="#6366F1" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        {/* Amount Display */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.amountSection}>
          <Text style={styles.amountLabel}>סכום לזיכוי</Text>
          <View style={styles.amountRow}>
            <Text style={styles.amountValue}>{formattedAmount}</Text>
            <Text style={styles.amountCurrency}>TSF</Text>
          </View>
        </Animated.View>

        {/* Transaction Context Card */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.contextCard}>
          <View style={styles.contextGlow} />
          <View style={styles.contextHeader}>
            <View style={styles.contextIcon}>
              <MaterialIcons name="person" size={24} color="#6366F1" />
            </View>
            <View>
              <Text style={styles.contextLabel}>לקוח</Text>
              <Text style={styles.contextName}>{customerName}</Text>
            </View>
          </View>
          <View style={styles.contextGrid}>
            <View style={styles.contextItem}>
              <Text style={styles.contextItemLabel}>עסקה מקורית</Text>
              <Text style={styles.contextItemValue}>#{txId}</Text>
            </View>
            <View style={styles.contextItem}>
              <Text style={styles.contextItemLabel}>תאריך</Text>
              <Text style={styles.contextItemValue}>12 פבר׳ 2024</Text>
            </View>
          </View>
        </Animated.View>

        {/* Numpad */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.numpad}>
          {numpadKeys.map((key) => (
            <TouchableOpacity 
              key={key} 
              style={styles.numpadKey}
              onPress={() => handleKeyPress(key)}
              activeOpacity={0.7}
            >
              {key === 'backspace' ? (
                <MaterialIcons name="backspace" size={24} color={colors.onSurface} />
              ) : (
                <Text style={styles.numpadKeyText}>{key}</Text>
              )}
            </TouchableOpacity>
          ))}
        </Animated.View>
      </View>

      {/* Confirm Button */}
      <View style={styles.bottomAction}>
        <TouchableOpacity onPress={handleConfirm} activeOpacity={0.9}>
          <LinearGradient
            colors={['#7B2FBE', '#9B59F5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.confirmButton}
          >
            <Text style={styles.confirmButtonText}>אישור זיכוי</Text>
            <MaterialIcons name="check-circle" size={24} color={colors.white} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1A',
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  headerButton: {
    padding: 8,
    borderRadius: 9999,
  },
  headerLeft: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 9999,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  amountSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  amountLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
    letterSpacing: 2,
    marginBottom: 8,
  },
  amountRow: {
    flexDirection: 'row-reverse',
    alignItems: 'baseline',
    gap: 8,
  },
  amountValue: {
    fontSize: 56,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: -2,
  },
  amountCurrency: {
    fontSize: 24,
    fontWeight: '700',
    color: '#6366F1',
  },
  contextCard: {
    backgroundColor: '#12122A',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    marginBottom: 32,
    overflow: 'hidden',
  },
  contextGlow: {
    position: 'absolute',
    top: -64,
    right: -64,
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  contextHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  contextIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
  },
  contextLabel: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  contextName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
  },
  contextGrid: {
    flexDirection: 'row-reverse',
    gap: 16,
  },
  contextItem: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  contextItemLabel: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  contextItemValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
  },
  numpad: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: 12,
  },
  numpadKey: {
    width: '31%',
    height: 64,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  numpadKeyText: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.onSurface,
  },
  bottomAction: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 16,
    backgroundColor: 'linear-gradient(to top, #0A0A1A, transparent)',
  },
  confirmButton: {
    height: 64,
    borderRadius: 9999,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: 'rgba(123, 47, 190, 0.4)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 30,
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
});
