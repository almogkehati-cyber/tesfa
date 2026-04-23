import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

export default function EditProfileScreen() {
  const router = useRouter();
  const [name, setName] = useState('ישראל ישראלי');
  const [email, setEmail] = useState('israel.i@vault.co.il');
  const [biometricEnabled, setBiometricEnabled] = useState(true);

  const handleSave = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <MaterialIcons name="settings" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>עריכת פרופיל</Text>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-forward" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar Upload */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7l-9mWyJroqcRiH3SA1I643rbp6JyWih-wgzkMehh9yopw7Sht28uzL0qmPUK3hD5QztWgp3goAe02VUPuGJSeS60YjXiuebMzkG2HqqEY_sREerOM6TbzTUv0dAy-cCX_6Bbk4ldlAr9h1u8XQk6ZptXVFxkK6-JwQLThGPKwatp70XqavaP63Gf8gAJ-d33b6fKonnZLsPJu4-bp_qrdJeSe06kkCDJou_VGWZb-eDpkoYctnb3udtx16N6fOXT0lA7zGktnNU' }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editAvatarButton}>
              <LinearGradient
                colors={colors.gradientPrimary}
                style={styles.editAvatarGradient}
              >
                <MaterialIcons name="edit" size={20} color={colors.white} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <Text style={styles.avatarHint}>לחץ לשינוי תמונת הפרופיל</Text>
        </Animated.View>

        {/* Form */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.form}>
          {/* Name Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>שם מלא</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="person" size={24} color={`${colors.onSurfaceVariant}99`} />
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="הזן שם מלא"
                placeholderTextColor={`${colors.onSurfaceVariant}66`}
                textAlign="right"
              />
            </View>
          </View>

          {/* Email Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>דוא"ל</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="mail" size={24} color={`${colors.onSurfaceVariant}99`} />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="example@email.com"
                placeholderTextColor={`${colors.onSurfaceVariant}66`}
                keyboardType="email-address"
                textAlign="right"
              />
            </View>
          </View>
        </Animated.View>

        {/* Security Section */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.securitySection}>
          <Text style={styles.sectionLabel}>אבטחה והגדרות</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <MaterialIcons name="chevron-left" size={24} color={colors.onSurfaceVariant} />
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>שינוי סיסמה</Text>
              <Text style={styles.menuSubtitle}>עדכון פרטי גישה לחשבון</Text>
            </View>
            <View style={styles.menuIcon}>
              <MaterialIcons name="lock" size={24} color={colors.primary} />
            </View>
          </TouchableOpacity>

          <View style={styles.menuItem}>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ false: colors.surfaceVariant, true: colors.primaryContainer }}
              thumbColor={colors.white}
            />
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>אימות ביומטרי</Text>
              <Text style={styles.menuSubtitle}>שימוש בטביעת אצבע לכניסה מהירה</Text>
            </View>
            <View style={styles.menuIcon}>
              <MaterialIcons name="fingerprint" size={24} color={colors.primary} />
            </View>
          </View>
        </Animated.View>

        {/* Actions */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.actions}>
          <TouchableOpacity onPress={handleSave} activeOpacity={0.9}>
            <LinearGradient
              colors={colors.gradientPrimary}
              style={styles.saveButton}
            >
              <Text style={styles.saveButtonText}>שמור שינויים</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelButtonText}>ביטול וחזרה</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLowest,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    height: 64,
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 48,
    marginTop: 32,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 4,
    borderColor: colors.surfaceContainerHighest,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 4,
    right: 4,
  },
  editAvatarGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: colors.surfaceContainerLowest,
  },
  avatarHint: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    marginTop: 16,
    opacity: 0.8,
  },
  form: {
    gap: 24,
    marginBottom: 32,
  },
  fieldContainer: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    paddingHorizontal: 8,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}33`,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: colors.onSurface,
  },
  securitySection: {
    gap: 16,
    marginBottom: 48,
  },
  sectionLabel: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 2,
    paddingHorizontal: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 16,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainerHighest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContent: {
    flex: 1,
    marginRight: 16,
    alignItems: 'flex-end',
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.onSurface,
  },
  menuSubtitle: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  actions: {
    gap: 16,
  },
  saveButton: {
    height: 56,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  cancelButton: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: colors.onSurfaceVariant,
  },
});
