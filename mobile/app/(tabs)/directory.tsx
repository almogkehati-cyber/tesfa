import React, { useState } from 'react';
import InviteModal from '../../components/InviteModal';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

interface Business {
  id: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  reviewCount: number;
  image?: string;
  cashback?: number;
}

const categories = [
  { id: 'all', label: 'הכל' },
  { id: 'restaurants', label: 'מסעדות' },
  { id: 'groceries', label: 'מצרכים' },
  { id: 'services', label: 'שירותים' },
  { id: 'fashion', label: 'אופנה' },
];

export default function DirectoryScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // TODO: Fetch real businesses from API
  const [businesses] = useState<Business[]>([]);
  const [inviteModalVisible, setInviteModalVisible] = useState(false);

  const filteredBusinesses = businesses.filter((business) => {
    const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || business.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderBusinessCard = (business: Business, index: number) => (
    <Animated.View
      key={business.id}
      entering={FadeInDown.delay(index * 100).duration(400)}
    >
      <TouchableOpacity
        style={styles.businessCard}
        onPress={() => router.push(`/business/${business.id}` as any)}
        activeOpacity={0.9}
      >
        <View style={styles.businessImageContainer}>
          {business.image ? (
            <Image source={{ uri: business.image }} style={styles.businessImage} />
          ) : (
            <View style={styles.businessImagePlaceholder}>
              <MaterialIcons name="storefront" size={48} color={colors.onSurfaceVariant} />
            </View>
          )}
          {business.cashback && (
            <View style={styles.cashbackBadge}>
              <MaterialIcons name="auto-awesome" size={14} color={colors.white} />
              <Text style={styles.cashbackText}>{business.cashback}% Cashback</Text>
            </View>
          )}
        </View>
        <View style={styles.businessInfo}>
          <View style={styles.businessHeader}>
            <View>
              <Text style={styles.businessName}>{business.name}</Text>
              <Text style={styles.businessCategory}>{business.category} • {business.location}</Text>
            </View>
            <View style={styles.ratingBadge}>
              <MaterialIcons name="star" size={16} color={colors.tertiary} />
              <Text style={styles.ratingText}>{business.rating}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.profileButton}>
            <View style={styles.profilePlaceholder}>
              <MaterialIcons name="person" size={20} color={colors.onSurfaceVariant} />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.logo}>TESFA</Text>
        <TouchableOpacity style={styles.searchIconButton}>
          <MaterialIcons name="search" size={24} color={colors.onSurfaceVariant} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={24} color={colors.onSurfaceVariant} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="חיפוש עסקים"
            placeholderTextColor={`${colors.onSurfaceVariant}99`}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Category Chips */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => setSelectedCategory(category.id)}
              activeOpacity={0.8}
            >
              {selectedCategory === category.id ? (
                <LinearGradient
                  colors={['#7B2FBE', '#9B59F5']}
                  style={styles.categoryChipActive}
                >
                  <Text style={styles.categoryTextActive}>{category.label}</Text>
                </LinearGradient>
              ) : (
                <View style={styles.categoryChip}>
                  <Text style={styles.categoryText}>{category.label}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>ראה הכל</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>עסקים מומלצים</Text>
        </View>

        {/* Business List */}
        {filteredBusinesses.length > 0 ? (
          <View style={styles.businessList}>
            {filteredBusinesses.map((business, index) => renderBusinessCard(business, index))}
          </View>
        ) : (
          <Animated.View 
            entering={FadeInDown.duration(600)}
            style={styles.emptyState}
          >
            <View style={styles.emptyIconContainer}>
              <LinearGradient
                colors={['#7B2FBE', '#9B59F5']}
                style={styles.emptyIconBg}
              >
                <MaterialIcons name="storefront" size={48} color={colors.white} />
              </LinearGradient>
            </View>
            <Text style={styles.emptyTitle}>עדיין אין עסקים באזור שלך</Text>
            <Text style={styles.emptySubtitle}>הזמן אותם להצטרף לכלכלת טספה!</Text>
            <TouchableOpacity 
              style={styles.inviteButton}
              onPress={() => setInviteModalVisible(true)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#7B2FBE', '#9B59F5']}
                style={styles.inviteButtonGradient}
              >
                <MaterialIcons name="person-add" size={20} color={colors.white} />
                <Text style={styles.inviteButtonText}>הזמן עסקים</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        )}
      </ScrollView>

      {/* Invite Modal */}
      <InviteModal 
        visible={inviteModalVisible} 
        onClose={() => setInviteModalVisible(false)} 
      />
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
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerLeft: {
    width: 40,
  },
  logo: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: -0.5,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}33`,
    backgroundColor: colors.surfaceContainerHighest,
  },
  profilePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  searchContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    borderRadius: 16,
    marginHorizontal: 24,
    marginBottom: 24,
    paddingHorizontal: 16,
    height: 56,
  },
  searchIcon: {
    marginEnd: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.onSurface,
    textAlign: 'right',
  },
  categoriesScroll: {
    marginBottom: 24,
  },
  categoriesContent: {
    paddingHorizontal: 24,
    gap: 12,
    flexDirection: 'row-reverse',
  },
  categoryChip: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 9999,
    backgroundColor: colors.surfaceContainer,
  },
  categoryChipActive: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 9999,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },
  categoryTextActive: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  sectionHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.onSurface,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  businessList: {
    paddingHorizontal: 24,
    gap: 24,
  },
  businessCard: {
    backgroundColor: `${colors.surfaceContainer}99`,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}1A`,
  },
  businessImageContainer: {
    height: 192,
    width: '100%',
  },
  businessImage: {
    width: '100%',
    height: '100%',
  },
  businessImagePlaceholder: {
    flex: 1,
    backgroundColor: colors.surfaceContainerHighest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cashbackBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#22C55E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
  },
  cashbackText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
  },
  businessInfo: {
    padding: 20,
  },
  businessHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  businessName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 4,
  },
  businessCategory: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  ratingBadge: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surfaceContainerHighest,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  emptyIconContainer: {
    marginBottom: 32,
  },
  emptyIconBg: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.onSurface,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: 32,
  },
  inviteButton: {
    borderRadius: 9999,
    overflow: 'hidden',
  },
  inviteButtonGradient: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  inviteButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
});
