import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

export default function WriteReviewScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [rating, setRating] = useState(4);
  const [review, setReview] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tags = ['שירות מהיר', 'מחיר הוגן', 'אווירה נעימה', 'ניקיון'];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = () => {
    // TODO: Submit review
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Decorations */}
      <View style={styles.decorTop} />
      <View style={styles.decorBottom} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.spacer} />
        <Text style={styles.headerTitle}>כתיבת ביקורת</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <MaterialIcons name="close" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Business Header */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.businessHeader}>
          <LinearGradient
            colors={colors.gradientPrimary}
            style={styles.avatarGradient}
          >
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmBQp_rT0R4oCHweHTQVcvOidL7Ur6C3oifzm4BmNuL6vEeTvj2gcF6n5sjPl0Rwok5oLo0H5aACQ4mc1GNSCSM7Z4u-44e2h2Ner5wFLBhaOZ17uttIl0d72buEUuMWAyvccO4y7jVXe6a83fxpKE0CfJ6B6ontWYZg1qLLH_FV50JT9zJHapYmeJNO4Ak8WCsdg0mP_-HCQ_PyqWDgbjOnNy4I2znPHNM8Rx1dGMKPbc9HpFiqznKdm2cBM7St7NHoORjhnMcp4' }}
              style={styles.avatar}
            />
          </LinearGradient>
          <Text style={styles.businessName}>קפה נחת</Text>
          <Text style={styles.businessSubtitle}>ספרו לנו איך היה השירות שלכם</Text>
        </Animated.View>

        {/* Star Rating */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.ratingSection}>
          <View style={styles.starsRow}>
            {[5, 4, 3, 2, 1].map((star) => (
              <TouchableOpacity 
                key={star} 
                onPress={() => setRating(star)}
                activeOpacity={0.7}
              >
                <MaterialIcons 
                  name="star" 
                  size={40} 
                  color={star <= rating ? colors.primary : `${colors.outlineVariant}66`}
                  style={star <= rating && styles.activeStar}
                />
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.ratingLabel}>דרגו את החוויה</Text>
        </Animated.View>

        {/* Review Text */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.textSection}>
          <Text style={styles.inputLabel}>התגובה שלך</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="ספר לנו על החוויה שלך..."
              placeholderTextColor={`${colors.onSurfaceVariant}66`}
              multiline
              numberOfLines={6}
              value={review}
              onChangeText={setReview}
              textAlignVertical="top"
              textAlign="right"
            />
          </View>
        </Animated.View>

        {/* Category Tags */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.tagsSection}>
          <Text style={styles.tagsLabel}>מה אהבת במיוחד?</Text>
          <View style={styles.tagsContainer}>
            {tags.map((tag) => (
              <TouchableOpacity
                key={tag}
                style={[
                  styles.tag,
                  selectedTags.includes(tag) && styles.tagSelected
                ]}
                onPress={() => toggleTag(tag)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.tagText,
                  selectedTags.includes(tag) && styles.tagTextSelected
                ]}>
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </ScrollView>

      {/* Submit Button */}
      <BlurView intensity={80} tint="dark" style={styles.footer}>
        <TouchableOpacity onPress={handleSubmit} activeOpacity={0.9}>
          <LinearGradient
            colors={colors.gradientPrimary}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={styles.submitButton}
          >
            <Text style={styles.submitText}>שלח ביקורת</Text>
          </LinearGradient>
        </TouchableOpacity>
      </BlurView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  decorTop: {
    position: 'absolute',
    top: '25%',
    right: -80,
    width: 320,
    height: 320,
    backgroundColor: colors.primaryContainer,
    opacity: 0.1,
    borderRadius: 9999,
  },
  decorBottom: {
    position: 'absolute',
    bottom: '25%',
    left: -80,
    width: 320,
    height: 320,
    backgroundColor: colors.secondaryContainer,
    opacity: 0.1,
    borderRadius: 9999,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  closeButton: {
    padding: 8,
  },
  spacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  businessHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatarGradient: {
    padding: 4,
    borderRadius: 56,
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: colors.background,
  },
  businessName: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.onSurface,
    marginBottom: 4,
  },
  businessSubtitle: {
    fontSize: 16,
    color: colors.onSurfaceVariant,
    fontWeight: '500',
  },
  ratingSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  activeStar: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  ratingLabel: {
    fontSize: 12,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 2,
    opacity: 0.8,
  },
  textSection: {
    marginBottom: 32,
  },
  inputLabel: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    marginBottom: 12,
    textAlign: 'right',
    paddingRight: 8,
    opacity: 0.8,
  },
  textInputContainer: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}33`,
  },
  textInput: {
    padding: 20,
    fontSize: 16,
    color: colors.onSurface,
    minHeight: 160,
  },
  tagsSection: {
    marginBottom: 32,
  },
  tagsLabel: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginBottom: 12,
    textAlign: 'right',
    paddingRight: 8,
  },
  tagsContainer: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}33`,
  },
  tagSelected: {
    backgroundColor: `${colors.primaryContainer}4D`,
    borderColor: colors.primary,
  },
  tagText: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  tagTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  submitButton: {
    height: 56,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
  },
  submitText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
});
