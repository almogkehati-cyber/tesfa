import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

type TabName = 'home' | 'activity' | 'guide' | 'profile';

interface TabItem {
  name: TabName;
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
}

const tabs: TabItem[] = [
  { name: 'home', icon: 'home', label: 'בית' },
  { name: 'activity', icon: 'receipt-long', label: 'פעילות' },
  { name: 'guide', icon: 'menu-book', label: 'מדריך' },
  { name: 'profile', icon: 'person', label: 'פרופיל' },
];

interface BottomTabBarProps {
  activeTab: TabName;
  onTabPress: (tab: TabName) => void;
}

export function BottomTabBar({ activeTab, onTabPress }: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      <BlurView intensity={80} tint="dark" style={styles.blurView}>
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TabButton
              key={tab.name}
              tab={tab}
              isActive={activeTab === tab.name}
              onPress={() => onTabPress(tab.name)}
            />
          ))}
        </View>
      </BlurView>
    </View>
  );
}

interface TabButtonProps {
  tab: TabItem;
  isActive: boolean;
  onPress: () => void;
}

function TabButton({ tab, isActive, onPress }: TabButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.9, { damping: 15 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 });
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
    >
      <Animated.View style={[styles.tabButton, animatedStyle]}>
        <MaterialIcons
          name={tab.icon}
          size={24}
          color={isActive ? colors.primary : colors.onSurfaceVariant}
          style={isActive && styles.activeIcon}
        />
        <Text style={[styles.tabLabel, isActive && styles.activeLabel]}>
          {tab.label}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 50,
  },
  blurView: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.12,
    shadowRadius: 40,
  },
  tabsContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
    backgroundColor: `${colors.surfaceContainer}CC`,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  activeIcon: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
    marginTop: 4,
    opacity: 0.6,
  },
  activeLabel: {
    color: colors.primary,
    opacity: 1,
  },
});
