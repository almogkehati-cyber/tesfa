import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Header } from '../components/ui';
import { colors } from '../theme/colors';

const categories = ['הכל', 'מסעדות', 'מצרכים', 'שירותים', 'אופנה'];

const businesses = [
  {
    id: '1',
    name: 'ביסטרו השף',
    category: 'מסעדות • תל אביב',
    rating: 4.9,
    cashback: 60,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtwzt5jorbLu0jggnhIVt713yHTIZ2gkCi-Su7Ir0MLvZOdyc_VnVn_ohLqZHv_NydyIAkzSuujeXG7tCZQhcOBnoOAeoh_-nMS_HfgaewkT9BCLGkncsVoYeZLGHUWfHPrRGMvx0bVKA7pNgK-9dNKVcJuu0YXnckadGg4FbUwHKsGSJl0rhv-CMpEEn7tWqAcQG4trbsRPaB9ZQhnM_7OkrhryHJOkqnKSLjSAVKQ3-q2yx3F65CB_XCkxI3EfCYHRo-EXK2_AQ',
  },
  {
    id: '2',
    name: 'מרקט הבוטיק',
    category: 'מצרכים • הרצליה',
    rating: 4.7,
    cashback: 60,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-QLTfqBjVltSb4CyIKnt5ggbltQKDwJUenSfcmL8onObQGUSaqIpTG2YKNfMxCL8lwmm3m90aDJD5I98FdkVtdtK59a0WatQJRght2CNoAwScpKP1dy7jauqnkqPEEoAUzFTvpYo-Lw85wPEzgTOTQ3cBnLBOK2iAdBw1wonhxRj_boRaWRoQdu17itfzPyOhy94NTsYylN7_EycvMCn9Y1pD_oG24rL2iV_-szZ6ZdSD-HQkpcpZpiEMyTMDC0N53fOcMFU_rHA',
  },
  {
    id: '3',
    name: 'ספא הרמוניה',
    category: 'שירותים • רמת גן',
    rating: 4.8,
    reviews: 124,
    cashback: 60,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnksFoQVX-ECA8TZ3Pc9OK4BrmLwAC6Z0o6LEWoph6lsNxuEELSnqLe-OoQaFviK1amfKtma2bsSnlUc4ox9KfvcKqIdLHj7cmf9V8OfxUTrXYh-_La-9tOXs1NeEftEokA8hR1izknRK0qhVtWswOl5x5n1yJNF9gI_hMkKrldX-77UF1QmMa_MsnAUArJwAeiyls6Q_kG77zgZad1ZExLUc4LVGnClSZCzNm4cD4J2seYKPaTRc9-2Ck6M-pvj9uRb_ouwtCMd8',
    compact: true,
  },
];

export default function DirectoryScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('הכל');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header showLogo />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <MaterialIcons name="search" size={24} color={colors.onSurfaceVariant} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="חיפוש עסקים"
            placeholderTextColor={`${colors.onSurfaceVariant}99`}
            value={searchQuery}
            onChangeText={setSearchQuery}
            textAlign="right"
          />
        </View>
      </View>

      {/* Category Chips */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
        style={styles.categoriesScroll}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setActiveCategory(category)}
            activeOpacity={0.8}
          >
            {activeCategory === category ? (
              <LinearGradient
                colors={colors.gradientPrimary}
                style={styles.categoryChipActive}
              >
                <Text style={styles.categoryTextActive}>{category}</Text>
              </LinearGradient>
            ) : (
              <View style={styles.categoryChip}>
                <Text style={styles.categoryText}>{category}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Business Directory */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeader}>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>ראה הכל</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>עסקים מומלצים</Text>
        </View>

        {businesses.map((business, index) => (
          <Animated.View 
            key={business.id}
            entering={FadeInDown.delay(index * 100).duration(400)}
          >
            <TouchableOpacity 
              style={business.compact ? styles.businessCardCompact : styles.businessCard}
              onPress={() => router.push(`/business/${business.id}`)}
              activeOpacity={0.9}
            >
              {business.compact ? (
                <>
                  <Image source={{ uri: business.image }} style={styles.businessImageSmall} />
                  <View style={styles.businessInfoCompact}>
                    <View style={styles.businessHeaderCompact}>
                      <Text style={styles.businessName}>{business.name}</Text>
                      <View style={styles.cashbackBadgeSmall}>
                        <Text style={styles.cashbackTextSmall}>{business.cashback}% Cashback</Text>
                      </View>
                    </View>
                    <Text style={styles.businessCategory}>{business.category}</Text>
                    <View style={styles.ratingRow}>
                      <MaterialIcons name="star" size={14} color={colors.tertiary} />
                      <Text style={styles.ratingText}>{business.rating} ({business.reviews} חוות דעת)</Text>
                    </View>
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.businessImageContainer}>
                    <Image source={{ uri: business.image }} style={styles.businessImage} />
                    <View style={styles.cashbackBadge}>
                      <MaterialIcons name="auto-awesome" size={14} color={colors.onPrimaryFixed} />
                      <Text style={styles.cashbackText}>{business.cashback}% Cashback</Text>
                    </View>
                  </View>
                  <View style={styles.businessInfo}>
                    <View style={styles.businessHeader}>
                      <View>
                        <Text style={styles.businessName}>{business.name}</Text>
                        <Text style={styles.businessCategory}>{business.category}</Text>
                      </View>
                      <View style={styles.ratingBadge}>
                        <MaterialIcons name="star" size={16} color={colors.tertiary} />
                        <Text style={styles.ratingValue}>{business.rating}</Text>
                      </View>
                    </View>
                  </View>
                </>
              )}
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
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    borderRadius: 16,
    height: 56,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginLeft: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.onSurface,
  },
  categoriesScroll: {
    maxHeight: 56,
    marginBottom: 24,
  },
  categoriesContainer: {
    paddingHorizontal: 24,
    gap: 12,
    flexDirection: 'row',
  },
  categoryChip: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 9999,
    backgroundColor: colors.surfaceContainer,
  },
  categoryChipActive: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 9999,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
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
  businessCard: {
    backgroundColor: `${colors.surfaceContainer}99`,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}33`,
  },
  businessCardCompact: {
    backgroundColor: `${colors.surfaceContainer}99`,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderWidth: 1,
    borderColor: `${colors.outlineVariant}33`,
  },
  businessImageContainer: {
    height: 192,
    position: 'relative',
  },
  businessImage: {
    width: '100%',
    height: '100%',
  },
  businessImageSmall: {
    width: 96,
    height: 96,
    borderRadius: 16,
  },
  cashbackBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
  },
  cashbackText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.onPrimaryFixed,
  },
  cashbackBadgeSmall: {
    backgroundColor: `#4CAF501A`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: `#4CAF5033`,
  },
  cashbackTextSmall: {
    fontSize: 10,
    fontWeight: '700',
    color: '#4CAF50',
  },
  businessInfo: {
    padding: 20,
  },
  businessInfoCompact: {
    flex: 1,
    justifyContent: 'space-between',
    height: 96,
  },
  businessHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  businessHeaderCompact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  businessName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
  },
  businessCategory: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    marginTop: 4,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surfaceContainerHighest,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.onSurface,
  },
});
