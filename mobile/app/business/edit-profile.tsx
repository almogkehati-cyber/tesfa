import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

export default function EditBusinessProfileScreen() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState('TESFA Business');
  const [category, setCategory] = useState('ניהול פיננסי');
  const [location, setLocation] = useState('שדרות רוטשילד 42, תל אביב');
  const [description, setDescription] = useState('פתרונות פיננסיים מתקדמים לקהילה. אנחנו מאמינים בחדשנות, שקיפות ובניית עתיד כלכלי בטוח יותר לכולם.');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <MaterialIcons name="account-balance-wallet" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>עריכת פרופיל עסק</Text>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-forward" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Cover & Logo */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.mediaSection}>
          {/* Cover Image */}
          <View style={styles.coverContainer}>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtZEhV_DtJgBSTics0sQ6dw3ZLX947bQ3IIsdgR_aChV8Wd__GfDIYwQaqbMBUacScDIZQhs1df7kvxFru5PQ75DltRZGOUCBEs8taNsTNy5VVqR3AuLKD5cdobv7OpLPQIoc3Wj0lTM4XMPBoMfQ-vrNgI26scaCvltI60O68kf5PnntKaa72-pUMuxQA-xLcHyAUBeQCBkQ93LuQ-AFoQXW8UZLtdmMASGhgk1XGKRt8_HM_sf-Vi1EJaXSaFVP_6S0Sw31BnSY' }}
              style={styles.coverImage}
            />
            <TouchableOpacity style={styles.coverButton}>
              <MaterialIcons name="photo-camera" size={16} color={colors.primary} />
              <Text style={styles.coverButtonText}>החלף תמונת נושא</Text>
            </TouchableOpacity>
          </View>
          
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAixOlSHAdOf6HCaEsO_SldJBWvJa2v97mbP0c03v7qvNynsuFALFZFC0eu6crVVeq8JDvbp0msa7NbnB7-1kJkKCpsqHpv3LWIV4dPdee5qGO0yGJSEtIXfJanFRHWDYR2UKZW1TUmYyOsuFNcowap_5MwCbID1AWNyGtQpIwK5NBXvBsh7DmRo2MGyLsqusKRy2XIp9Hcmse7gXiPTNmSlqSL40LFZia5zFfnuvpq3RPVNeG948CVgeKbikwk4K6g6lXmZFzrJVE' }}
              style={styles.logoImage}
            />
            <TouchableOpacity style={styles.logoButton}>
              <MaterialIcons name="add-a-photo" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Form */}
        <View style={styles.form}>
          {/* Basic Info */}
          <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.row}>
            <View style={styles.field}>
              <Text style={styles.label}>שם העסק</Text>
              <TextInput
                style={styles.input}
                value={businessName}
                onChangeText={setBusinessName}
                textAlign="right"
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>קטגוריה</Text>
              <TouchableOpacity style={styles.selectInput}>
                <Text style={styles.selectValue}>{category}</Text>
                <MaterialIcons name="expand-more" size={20} color={colors.onSurfaceVariant} />
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Operating Hours */}
          <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.section}>
            <Text style={styles.sectionTitle}>שעות פעילות</Text>
            <View style={styles.hoursContainer}>
              <View style={styles.hoursRow}>
                <View style={styles.hoursInputs}>
                  <TextInput style={styles.timeInput} placeholder="09:00" placeholderTextColor={colors.primary} />
                  <Text style={styles.hoursDivider}>—</Text>
                  <TextInput style={styles.timeInput} placeholder="18:00" placeholderTextColor={colors.primary} />
                </View>
                <Text style={styles.hoursLabel}>ראשון - חמישי</Text>
              </View>
              <View style={styles.hoursRow}>
                <View style={styles.hoursInputs}>
                  <TextInput style={styles.timeInput} placeholder="08:30" placeholderTextColor={colors.primary} />
                  <Text style={styles.hoursDivider}>—</Text>
                  <TextInput style={styles.timeInput} placeholder="13:00" placeholderTextColor={colors.primary} />
                </View>
                <Text style={styles.hoursLabel}>יום שישי</Text>
              </View>
            </View>
          </Animated.View>

          {/* Location */}
          <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.section}>
            <Text style={styles.label}>מיקום העסק</Text>
            <View style={styles.locationInput}>
              <MaterialIcons name="location-on" size={24} color={colors.primary} style={styles.locationIcon} />
              <TextInput
                style={styles.locationTextInput}
                value={location}
                onChangeText={setLocation}
                textAlign="right"
                placeholder="הזן כתובת מלאה..."
                placeholderTextColor={colors.onSurfaceVariant}
              />
            </View>
            <View style={styles.mapPlaceholder}>
              <Image
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzgf4qwdv9uXnAxT49dC_Bn2Q_jO-mECCEyIbBDe3dZ6Q84Svu0T0JWrNMQZ38qZl0DT7gH8bNhhIo9_-9K_6T5eEoQ3P1hIkw8UCvK_STzFVGV8JNT9mSzaMVhj6J9cjlmRLL-FmyHrNaymDhqTVt_5J-kor4GFMdFqqx_a9qUYFxbGwgtHkWFDs0dw-4J765qboClVm2-w7HXtRwQhgKafVioYtbg8B6NpLztjIpYLP3R94uzlZhVrZEsQxycAmsaCYThX5l0Kc' }}
                style={styles.mapImage}
              />
            </View>
          </Animated.View>

          {/* Description */}
          <Animated.View entering={FadeInDown.delay(500).duration(400)} style={styles.section}>
            <Text style={styles.label}>תיאור העסק</Text>
            <TextInput
              style={styles.textarea}
              value={description}
              onChangeText={setDescription}
              textAlign="right"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </Animated.View>

          {/* Save Button */}
          <Animated.View entering={FadeInDown.delay(600).duration(400)} style={styles.saveSection}>
            <TouchableOpacity activeOpacity={0.9}>
              <LinearGradient
                colors={['#7B2FBE', '#9B59F5']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                style={styles.saveButton}
              >
                <Text style={styles.saveButtonText}>שמירת שינויים</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>
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
    paddingBottom: 120,
  },
  mediaSection: {
    marginBottom: 32,
  },
  coverContainer: {
    height: 192,
    marginHorizontal: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  coverImage: {
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  coverButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -70 }, { translateY: -16 }],
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
    backgroundColor: `${colors.surfaceContainerHighest}CC`,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}33`,
  },
  coverButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  logoContainer: {
    width: 96,
    height: 96,
    marginTop: -48,
    marginEnd: 24,
    borderRadius: 16,
    borderWidth: 4,
    borderColor: colors.surface,
    overflow: 'hidden',
    backgroundColor: colors.surfaceContainerHighest,
  },
  logoImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  logoButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -10 }, { translateY: -10 }],
  },
  form: {
    paddingHorizontal: 24,
    gap: 32,
  },
  row: {
    flexDirection: 'row-reverse',
    gap: 16,
  },
  field: {
    flex: 1,
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
    marginEnd: 8,
  },
  input: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: colors.onSurface,
  },
  selectInput: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectValue: {
    fontSize: 16,
    color: colors.onSurface,
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    marginEnd: 8,
  },
  hoursContainer: {
    gap: 12,
  },
  hoursRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}1A`,
  },
  hoursLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.onSurface,
  },
  hoursInputs: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 12,
  },
  timeInput: {
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 12,
    color: colors.primary,
    minWidth: 50,
    textAlign: 'center',
  },
  hoursDivider: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  locationInput: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    borderRadius: 16,
    paddingLeft: 16,
  },
  locationIcon: {
    marginEnd: 8,
  },
  locationTextInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: colors.onSurface,
  },
  mapPlaceholder: {
    height: 192,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}33`,
  },
  mapImage: {
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  textarea: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: colors.onSurface,
    minHeight: 120,
  },
  saveSection: {
    paddingTop: 16,
  },
  saveButton: {
    height: 56,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
});
