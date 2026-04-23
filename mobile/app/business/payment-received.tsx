import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

export default function PaymentReceivedScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = React.useState(true);

  const handleClose = () => {
    setModalVisible(false);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <MaterialIcons name="account-balance-wallet" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>הגדרות עסק</Text>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-forward" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Background Content (blurred) */}
      <View style={styles.bgContent}>
        <View style={styles.bgCard}>
          <View style={styles.bgCardHeader}>
            <View style={styles.bgCircle} />
            <View style={styles.bgTextBlock}>
              <Text style={styles.bgLabel}>סה"כ הכנסות</Text>
              <Text style={styles.bgValue}>₪42,500.00</Text>
            </View>
          </View>
          <View style={styles.bgChart}>
            <View style={styles.bgChartGradient} />
          </View>
        </View>
        <View style={styles.bgList}>
          <View style={styles.bgListItem} />
          <View style={styles.bgListItem} />
          <View style={styles.bgListItem} />
        </View>
      </View>

      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleClose}
      >
        <BlurView intensity={20} style={styles.modalOverlay}>
          <Animated.View entering={FadeIn.duration(300)} style={styles.modalContainer}>
            <View style={styles.modalCard}>
              {/* Header Icon */}
              <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.modalHeader}>
                <LinearGradient
                  colors={colors.gradientPrimary}
                  style={styles.iconContainer}
                >
                  <MaterialIcons name="check-circle" size={40} color={colors.onPrimary} />
                </LinearGradient>
                <Text style={styles.modalTitle}>תשלום התקבל!</Text>
                <Text style={styles.modalSubtitle}>התקבלה העברה חדשה לחשבון העסקי</Text>
              </Animated.View>

              {/* Transaction Details */}
              <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.detailsCard}>
                {/* Customer Info */}
                <View style={styles.customerRow}>
                  <View style={styles.verifiedIcon}>
                    <MaterialIcons name="verified-user" size={24} color={colors.primary} />
                  </View>
                  <View style={styles.customerInfo}>
                    <Text style={styles.customerName}>יוסי אברהמי</Text>
                    <Text style={styles.customerId}>מזהה: #TRX-9821</Text>
                  </View>
                  <View style={styles.customerAvatar}>
                    <Text style={styles.avatarText}>י״א</Text>
                  </View>
                </View>

                <View style={styles.divider} />

                {/* Amount */}
                <View style={styles.amountSection}>
                  <Text style={styles.amountLabel}>סכום העסקה</Text>
                  <View style={styles.amountRow}>
                    <Text style={styles.amountValue}>₪1,250</Text>
                    <Text style={styles.amountDecimals}>.00</Text>
                  </View>
                </View>
              </Animated.View>

              {/* Actions */}
              <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.actions}>
                <TouchableOpacity onPress={handleClose} activeOpacity={0.9}>
                  <LinearGradient
                    colors={['#7b2fbe', '#9b59f5']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.primaryButton}
                  >
                    <Text style={styles.primaryButtonText}>אישור וסגירה</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryButton}>
                  <MaterialIcons name="share" size={20} color={colors.primary} />
                  <Text style={styles.secondaryButtonText}>שתף קבלה</Text>
                </TouchableOpacity>
              </Animated.View>

              {/* Glow */}
              <View style={styles.modalGlow} />
            </View>
          </Animated.View>
        </BlurView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  bgContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    opacity: 0.4,
  },
  bgCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 32,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}1A`,
    marginBottom: 24,
  },
  bgCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  bgCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${colors.primary}33`,
  },
  bgTextBlock: {
    alignItems: 'flex-end',
  },
  bgLabel: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  bgValue: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.onSurface,
  },
  bgChart: {
    height: 128,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 8,
    overflow: 'hidden',
  },
  bgChartGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: `${colors.primary}1A`,
  },
  bgList: {
    gap: 16,
  },
  bgListItem: {
    height: 64,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: `${colors.surfaceContainerLowest}99`,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
  },
  modalCard: {
    backgroundColor: `${colors.surfaceContainer}CC`,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: `${colors.primary}33`,
    overflow: 'hidden',
  },
  modalHeader: {
    alignItems: 'center',
    paddingTop: 32,
    paddingHorizontal: 32,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 40,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  detailsCard: {
    marginTop: 32,
    marginHorizontal: 24,
    padding: 24,
    backgroundColor: `${colors.surfaceContainerHighest}66`,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}1A`,
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  verifiedIcon: {
    padding: 4,
  },
  customerInfo: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 16,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
  },
  customerId: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  customerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.secondaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.secondary,
  },
  divider: {
    height: 1,
    backgroundColor: `${colors.outlineVariant}33`,
    marginVertical: 24,
  },
  amountSection: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  amountLabel: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginBottom: 4,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  amountValue: {
    fontSize: 40,
    fontWeight: '800',
    color: colors.primary,
  },
  amountDecimals: {
    fontSize: 20,
    fontWeight: '700',
    color: `${colors.primary}B3`,
  },
  actions: {
    padding: 24,
    paddingTop: 32,
    gap: 16,
  },
  primaryButton: {
    height: 56,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  secondaryButton: {
    height: 48,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: `${colors.primary}33`,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  modalGlow: {
    position: 'absolute',
    bottom: -80,
    right: -80,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: colors.primary,
    opacity: 0.2,
  },
});
