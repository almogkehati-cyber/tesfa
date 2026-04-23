import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

const languages = [
  { code: 'he', name: 'עברית', localName: 'Hebrew', abbr: 'עב' },
  { code: 'en', name: 'English', localName: 'אנגלית', abbr: 'EN' },
  { code: 'am', name: 'Amharic (አማርኛ)', localName: 'אמהרית', abbr: 'አማ' },
];

export default function LanguageScreen() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState('he');

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
        <Text style={styles.headerTitle}>שפת ממשק</Text>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-forward" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Instructions */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.instructions}>
          <Text style={styles.instructionText}>
            בחר את השפה המועדפת עליך לשימוש באפליקציה. תוכל לשנות זאת בכל עת.
          </Text>
        </Animated.View>

        {/* Language Options */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.languageList}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageOption,
                selectedLanguage === lang.code && styles.languageOptionActive
              ]}
              onPress={() => setSelectedLanguage(lang.code)}
              activeOpacity={0.7}
            >
              <View style={styles.radioContainer}>
                <View style={[
                  styles.radioOuter,
                  selectedLanguage === lang.code && styles.radioOuterActive
                ]}>
                  {selectedLanguage === lang.code && <View style={styles.radioInner} />}
                </View>
              </View>
              <View style={styles.languageInfo}>
                <Text style={styles.languageName}>{lang.name}</Text>
                <Text style={styles.languageLocalName}>{lang.localName}</Text>
              </View>
              <View style={[
                styles.languageAbbr,
                selectedLanguage === lang.code && styles.languageAbbrActive
              ]}>
                <Text style={[
                  styles.languageAbbrText,
                  selectedLanguage === lang.code && styles.languageAbbrTextActive
                ]}>
                  {lang.abbr}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Info Card */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <MaterialIcons name="info" size={16} color={colors.primary} />
            <Text style={styles.infoLabel}>טיפ</Text>
          </View>
          <Text style={styles.infoText}>
            שינוי השפה ישפיע על התפריטים, הכפתורים וההתראות במערכת. חלק מהתכנים המיוצרים על ידי משתמשים עשויים להישאר בשפת המקור שלהם.
          </Text>
        </Animated.View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSave} activeOpacity={0.9}>
          <LinearGradient
            colors={colors.gradientPrimary}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={styles.saveButton}
          >
            <Text style={styles.saveButtonText}>שמור שינויים</Text>
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
    color: colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  instructions: {
    marginBottom: 40,
  },
  instructionText: {
    fontSize: 18,
    color: colors.onSurfaceVariant,
    fontWeight: '500',
    lineHeight: 28,
  },
  languageList: {
    gap: 16,
    marginBottom: 48,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  languageOptionActive: {
    borderColor: `${colors.primary}4D`,
  },
  radioContainer: {
    marginLeft: 16,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.outlineVariant,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterActive: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primaryContainer}66`,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  languageInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  languageName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
  },
  languageLocalName: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    opacity: 0.7,
  },
  languageAbbr: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageAbbrActive: {
    backgroundColor: `${colors.primaryContainer}33`,
    borderWidth: 1,
    borderColor: `${colors.primary}33`,
  },
  languageAbbrText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
  },
  languageAbbrTextActive: {
    color: colors.primary,
  },
  infoCard: {
    backgroundColor: `${colors.primaryContainer}1A`,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}1A`,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  infoText: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    lineHeight: 22,
  },
  footer: {
    position: 'absolute',
    bottom: 96,
    left: 24,
    right: 24,
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
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
  },
});
