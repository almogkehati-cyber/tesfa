import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

export default function GuideScreen() {
  const guides = [
    { icon: 'account-balance-wallet', title: 'מהו TSF?', desc: 'הכר את המטבע הקהילתי שלנו' },
    { icon: 'payments', title: 'החזר כספי', desc: 'איך מקבלים 60% החזר על קניות' },
    { icon: 'volunteer-activism', title: 'UBI יומי', desc: 'הכנסה בסיסית לכל חבר קהילה' },
    { icon: 'store', title: 'עסקים מקומיים', desc: 'היכן ניתן לשלם ב-TSF' },
    { icon: 'security', title: 'אבטחה', desc: 'שמור על הארנק שלך מוגן' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>מדריך</Text>
        <Text style={styles.subtitle}>למד איך להפיק את המירב מ-TESFA</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {guides.map((guide, index) => (
          <Animated.View 
            key={index}
            entering={FadeInDown.delay(index * 100).duration(400)}
          >
            <TouchableOpacity style={styles.guideCard} activeOpacity={0.8}>
              <MaterialIcons name="chevron-left" size={24} color={colors.primary} />
              <View style={styles.guideContent}>
                <Text style={styles.guideTitle}>{guide.title}</Text>
                <Text style={styles.guideDesc}>{guide.desc}</Text>
              </View>
              <View style={styles.guideIcon}>
                <MaterialIcons name={guide.icon as any} size={24} color={colors.primary} />
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.onSurface,
    textAlign: 'right',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.onSurfaceVariant,
    textAlign: 'right',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
    gap: 16,
  },
  guideCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  guideIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: `${colors.primaryContainer}33`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideContent: {
    flex: 1,
    alignItems: 'flex-end',
  },
  guideTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 4,
  },
  guideDesc: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
});
