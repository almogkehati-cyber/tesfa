import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import { colors } from '../theme/colors';

export default function QRScannerScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Camera Background (placeholder) */}
      <Image
        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPwb1SVOd71gyXUM18WQ7rbNHclnHIjI4PV7mcdir_lzlgk38GP6rTB9kR4go2E2KvPPYIWPa7dbcZeObyuo6Z3DpsxEgKablLuQ66ZbMkepRcStN77UymJI4F90yZQciuhCcPfkm3wf3oqUR6qwdyt4-FuJLFeFj0wuWsRZlpDLuD4FYx8e0bCW09bjEiHvK3lc50ehenwZexc7vNYp65_5j4EgHBVPbc8lPN3scPU0XCJyr4bCo-ZkaFxDT4ghEDU4DtF0ShqlM' }}
        style={styles.cameraPreview}
      />

      {/* Scanner Mask */}
      <View style={styles.scannerMask}>
        {/* Top Bar */}
        <SafeAreaView style={styles.topBar}>
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={styles.closeButton}
          >
            <MaterialIcons name="close" size={24} color={colors.onSurface} />
          </TouchableOpacity>
          <View style={styles.titleRow}>
            <Text style={styles.title}>TESFA SCAN</Text>
            <View style={styles.titleIcon}>
              <MaterialIcons name="qr-code-scanner" size={20} color={colors.primary} />
            </View>
          </View>
        </SafeAreaView>

        {/* Scanner Frame */}
        <View style={styles.scannerFrameContainer}>
          <View style={styles.scannerFrame}>
            {/* Corners */}
            <View style={[styles.corner, styles.cornerTopLeft]} />
            <View style={[styles.corner, styles.cornerTopRight]} />
            <View style={[styles.corner, styles.cornerBottomLeft]} />
            <View style={[styles.corner, styles.cornerBottomRight]} />
            
            {/* Scan Line */}
            <Animated.View 
              entering={FadeIn.duration(1000)}
              style={styles.scanLine} 
            />
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionTitle}>סרוק קוד QR לביצוע תשלום</Text>
          <Text style={styles.instructionText}>
            מקם את הקוד בתוך המסגרת כדי להתחיל בתהליך התשלום המאובטח
          </Text>
        </View>

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <MaterialIcons name="flashlight-on" size={24} color={colors.onSurfaceVariant} />
              </View>
              <Text style={styles.actionLabel}>פנס</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <MaterialIcons name="image" size={24} color={colors.onSurfaceVariant} />
              </View>
              <Text style={styles.actionLabel}>גלריה</Text>
            </TouchableOpacity>
          </View>

          {/* My QR Card */}
          <TouchableOpacity 
            style={styles.myQrCard}
            onPress={() => router.push('/receive')}
            activeOpacity={0.8}
          >
            <MaterialIcons name="chevron-right" size={24} color={colors.onSurfaceVariant} style={styles.chevronRotate} />
            <View style={styles.myQrContent}>
              <Text style={styles.myQrLabel}>הקוד שלי</Text>
              <Text style={styles.myQrText}>הצג קוד לקבלת תשלום</Text>
            </View>
            <View style={styles.myQrIcon}>
              <MaterialIcons name="person" size={20} color={colors.primary} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Ambient Glow */}
      <View style={styles.ambientGlow} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  cameraPreview: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.4,
  },
  scannerMask: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  closeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${colors.surfaceContainer}99`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  titleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: -0.5,
  },
  scannerFrameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 48,
  },
  scannerFrame: {
    width: '100%',
    aspectRatio: 1,
    maxWidth: 280,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: colors.primary,
    borderWidth: 4,
  },
  cornerTopLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 24,
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 24,
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 24,
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 24,
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    height: 2,
    backgroundColor: colors.primary,
    opacity: 0.8,
  },
  instructionsContainer: {
    paddingHorizontal: 32,
    alignItems: 'center',
    gap: 16,
    marginBottom: 32,
  },
  instructionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 22,
  },
  bottomActions: {
    paddingHorizontal: 32,
    paddingBottom: 48,
    gap: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
  },
  actionButton: {
    alignItems: 'center',
    gap: 8,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.surfaceContainerHighest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLabel: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
  },
  myQrCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.surfaceContainer}66`,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}1A`,
  },
  chevronRotate: {
    transform: [{ rotate: '180deg' }],
  },
  myQrContent: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 12,
  },
  myQrLabel: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  myQrText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
  },
  myQrIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.surfaceContainerHighest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ambientGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 500,
    height: 500,
    backgroundColor: colors.primary,
    opacity: 0.05,
    borderRadius: 9999,
    transform: [{ translateX: -250 }, { translateY: -250 }],
    pointerEvents: 'none',
  },
});
