import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

export default function RegisterBusinessScreen() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    router.push('/business/verify-phone');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.switchButton}>
          <Text style={styles.switchText}>Switch to Personal</Text>
        </TouchableOpacity>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>רישום עסק</Text>
          <MaterialIcons name="storefront" size={24} color={colors.primary} />
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.heroContainer}>
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkQg83SpbPL_urF1JLop2vYN5kGQifjPCDK9oE8seycxfb_5qwxepgE-2O1r2eVdS2oXIR3ECgO3PxeyECb6BFDNthCkEhjHSyEHLgsWNO2kfFBGDZ5A4GvXc8wWXeH6XdQGWRAP1zBwyr_9x5Imd-G1tVIp3Jgh1X-Fyap9cp1mMaV1sWk_ywcsodMxjS6XtncqAdwuCw-38zNzmvs3EvhS32daISsqQB-rzEaksu8QO6N4aY_wWnRXMSBjFONMCalu5JBu_uBgg' }}
            style={styles.heroImage}
          />
          <LinearGradient
            colors={['transparent', colors.surfaceContainerLowest]}
            style={styles.heroGradient}
          />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>בואו נקים את המרחב שלכם</Text>
            <Text style={styles.heroSubtitle}>הצעד הראשון לניהול קהילה פיננסית</Text>
          </View>
        </Animated.View>

        {/* Form */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.form}>
          {/* Business Name */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>שם העסק</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="badge" size={24} color={colors.outline} />
              <TextInput
                style={styles.input}
                placeholder="לדוגמה: הקפה של הקהילה"
                placeholderTextColor={colors.outline}
                value={businessName}
                onChangeText={setBusinessName}
                textAlign="right"
              />
            </View>
          </View>

          {/* Category & Location */}
          <View style={styles.rowFields}>
            <View style={[styles.fieldContainer, { flex: 1 }]}>
              <Text style={styles.fieldLabel}>קטגוריה</Text>
              <View style={styles.inputContainer}>
                <MaterialIcons name="category" size={24} color={colors.outline} />
                <TextInput
                  style={styles.input}
                  placeholder="בחר קטגוריה"
                  placeholderTextColor={colors.outline}
                  value={category}
                  onChangeText={setCategory}
                  textAlign="right"
                />
              </View>
            </View>
            <View style={[styles.fieldContainer, { flex: 1 }]}>
              <Text style={styles.fieldLabel}>מיקום</Text>
              <View style={styles.inputContainer}>
                <MaterialIcons name="location-on" size={24} color={colors.outline} />
                <TextInput
                  style={styles.input}
                  placeholder="כתובת העסק"
                  placeholderTextColor={colors.outline}
                  value={location}
                  onChangeText={setLocation}
                  textAlign="right"
                />
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>תיאור העסק</Text>
            <View style={[styles.inputContainer, styles.textareaContainer]}>
              <TextInput
                style={[styles.input, styles.textarea]}
                placeholder="ספרו לנו קצת על מה אתם עושים..."
                placeholderTextColor={colors.outline}
                value={description}
                onChangeText={setDescription}
                textAlign="right"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Media Upload */}
          <TouchableOpacity style={styles.uploadArea} activeOpacity={0.7}>
            <View style={styles.uploadIcon}>
              <MaterialIcons name="add-a-photo" size={24} color={colors.primary} />
            </View>
            <Text style={styles.uploadTitle}>העלאת לוגו או תמונת נושא</Text>
            <Text style={styles.uploadHint}>JPG, PNG עד 5MB</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Submit */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.submitSection}>
          <TouchableOpacity onPress={handleSubmit} activeOpacity={0.9}>
            <LinearGradient
              colors={colors.gradientPrimary}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>סיום רישום ויצירת חשבון</Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.termsText}>
            בלחיצה על הכפתור הנך מאשר את{' '}
            <Text style={styles.termsLink}>תנאי השימוש</Text>
            {' '}ו<Text style={styles.termsLink}>מדיניות הפרטיות</Text> של הפלטפורמה.
          </Text>
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
    paddingVertical: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
  },
  switchButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
  },
  switchText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroContainer: {
    height: 192,
    marginHorizontal: 24,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 32,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  heroContent: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  form: {
    paddingHorizontal: 24,
    gap: 24,
  },
  fieldContainer: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
    marginRight: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}33`,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: colors.onSurface,
    marginLeft: 12,
  },
  rowFields: {
    flexDirection: 'row',
    gap: 16,
  },
  textareaContainer: {
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  textarea: {
    height: 100,
    paddingTop: 8,
  },
  uploadArea: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: `${colors.outlineVariant}33`,
    padding: 24,
    alignItems: 'center',
    gap: 12,
  },
  uploadIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${colors.primaryContainer}33`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.onSurface,
  },
  uploadHint: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  submitSection: {
    paddingHorizontal: 24,
    paddingTop: 32,
    gap: 16,
  },
  submitButton: {
    height: 56,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 32,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onPrimary,
  },
  termsText: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 32,
  },
  termsLink: {
    color: colors.primary,
  },
});
