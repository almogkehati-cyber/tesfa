import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

const warningItems = [
  {
    icon: 'security',
    title: 'פרטיות ונתוני GDPR',
    text: 'בהתאם לתקנות הגנת הפרטיות (GDPR), כל המידע האישי והעסקי שלך יוסר מבסיסי הנתונים הפעילים שלנו תוך 30 יום. חלק מהנתונים עשויים להישמר בארכיון מוצפן למטרות רגולטוריות בלבד.',
  },
  {
    icon: 'account-balance',
    title: 'יתרה פיננסית',
    text: 'לא ניתן למחוק חשבון עם יתרה חיובית. וודאו שכל הכספים הועברו לחשבון הבנק המקושר לפני אישור המחיקה.',
  },
  {
    icon: 'token',
    title: 'נכסים דיגיטליים',
    text: 'גישה לכל נכסי הקהילה, המדריכים והכלים העסקיים הבלעדיים תיחסם באופן מיידי ולא תתאפשר שחזור של היסטוריית הפעילות.',
  },
];

export default function DeleteBusinessAccountScreen() {
  const router = useRouter();
  const [confirmed, setConfirmed] = useState(false);

  const handleDelete = () => {
    if (confirmed) {
      router.replace('/business/delete-success');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <MaterialIcons name="account-balance-wallet" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>מחיקת חשבון</Text>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-forward" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Warning Icon */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.warningSection}>
          <View style={styles.warningIcon}>
            <MaterialIcons name="warning" size={40} color={colors.error} />
          </View>
          <Text style={styles.warningTitle}>האם אתם בטוחים?</Text>
          <Text style={styles.warningText}>
            מחיקת חשבון העסק היא פעולה בלתי הפיכה. כל המידע הפיננסי, היסטוריית העסקאות והגדרות הארנק יימחקו לצמיתות מהשרתים שלנו.
          </Text>
        </Animated.View>

        {/* Warning Cards */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.cardsSection}>
          {warningItems.map((item, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardIcon}>
                <MaterialIcons name={item.icon as any} size={24} color={colors.primary} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardText}>{item.text}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        {/* Confirmation Checkbox */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)}>
          <TouchableOpacity 
            style={styles.checkbox}
            onPress={() => setConfirmed(!confirmed)}
            activeOpacity={0.8}
          >
            <View style={[styles.checkboxBox, confirmed && styles.checkboxBoxChecked]}>
              {confirmed && <MaterialIcons name="check" size={16} color={colors.white} />}
            </View>
            <Text style={styles.checkboxLabel}>
              אני מאשר/ת שהבנתי את ההשלכות וברצוני למחוק את החשבון.
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.actions}>
          <TouchableOpacity 
            onPress={handleDelete} 
            activeOpacity={0.9}
            disabled={!confirmed}
            style={[styles.deleteButtonWrapper, !confirmed && styles.buttonDisabled]}
          >
            <LinearGradient
              colors={['#93000A', '#B71C1C']}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>מחק חשבון לצמיתות</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelButtonText}>ביטול וחזרה להגדרות</Text>
          </TouchableOpacity>
        </Animated.View>
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
    flexDirection: 'row-reverse',
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  warningSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  warningIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.errorContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: colors.error,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
  },
  warningTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 16,
  },
  warningText: {
    fontSize: 16,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 24,
  },
  cardsSection: {
    gap: 16,
    marginBottom: 40,
  },
  card: {
    flexDirection: 'row-reverse',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 24,
    gap: 16,
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.surfaceContainerHighest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 4,
  },
  cardText: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    lineHeight: 22,
  },
  checkbox: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: `${colors.surfaceContainerHighest}4D`,
    borderRadius: 16,
    padding: 16,
    gap: 16,
    marginBottom: 48,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}1A`,
  },
  checkboxBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.outlineVariant,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxBoxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: colors.onSurface,
  },
  actions: {
    gap: 16,
  },
  deleteButtonWrapper: {},
  buttonDisabled: {
    opacity: 0.5,
  },
  deleteButton: {
    height: 56,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.error,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  deleteButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  cancelButton: {
    height: 56,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}33`,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.onSurface,
  },
});
