import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showLogo?: boolean;
  onBackPress?: () => void;
  rightElement?: React.ReactNode;
}

export function Header({
  title,
  showBack = true,
  showLogo = true,
  onBackPress,
  rightElement,
}: HeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      {/* Right side - Back button (RTL) */}
      <View style={styles.sideContainer}>
        {showBack && (
          <TouchableOpacity
            onPress={handleBack}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name="arrow-forward"
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
        )}
        {title && <Text style={styles.title}>{title}</Text>}
      </View>

      {/* Center/Left side - Logo or custom element */}
      <View style={styles.sideContainer}>
        {showLogo && (
          <Text style={styles.logo}>TESFA</Text>
        )}
        {rightElement}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'transparent',
  },
  sideContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${colors.surfaceContainerHighest}80`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.onSurface,
    fontSize: 20,
    fontWeight: '700',
  },
  logo: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
});
