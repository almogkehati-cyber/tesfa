import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { colors } from '../../theme/colors';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'numeric';
  icon?: keyof typeof MaterialIcons.glyphMap;
  error?: string;
  disabled?: boolean;
  style?: ViewStyle;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  textAlign?: 'left' | 'right' | 'center';
}

export function Input({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  icon,
  error,
  disabled = false,
  style,
  autoCapitalize = 'none',
  textAlign = 'right',
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const focusAnim = useSharedValue(0);

  const animatedBorderStyle = useAnimatedStyle(() => ({
    borderColor: focusAnim.value === 1 
      ? colors.primary 
      : error 
        ? colors.error 
        : 'transparent',
    borderWidth: focusAnim.value === 1 || error ? 1 : 0,
  }));

  const handleFocus = () => {
    setIsFocused(true);
    focusAnim.value = withTiming(1, { duration: 200 });
  };

  const handleBlur = () => {
    setIsFocused(false);
    focusAnim.value = withTiming(0, { duration: 200 });
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Animated.View style={[styles.inputContainer, animatedBorderStyle]}>
        {icon && (
          <MaterialIcons
            name={icon}
            size={20}
            color={isFocused ? colors.primary : colors.onSurfaceVariant}
            style={styles.iconRight}
          />
        )}
        <TextInput
          style={[
            styles.input,
            icon && styles.inputWithIcon,
            secureTextEntry && styles.inputWithToggle,
            { textAlign },
          ]}
          placeholder={placeholder}
          placeholderTextColor={`${colors.outline}80`}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={!disabled}
          autoCapitalize={autoCapitalize}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.toggleButton}
          >
            <MaterialIcons
              name={isPasswordVisible ? 'visibility-off' : 'visibility'}
              size={20}
              color={colors.onSurfaceVariant}
            />
          </TouchableOpacity>
        )}
      </Animated.View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    color: colors.onSurfaceVariant,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    marginRight: 8,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    borderRadius: 12,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    color: colors.onSurface,
    fontSize: 16,
  },
  inputWithIcon: {
    paddingRight: 48,
  },
  inputWithToggle: {
    paddingLeft: 48,
  },
  iconRight: {
    position: 'absolute',
    right: 16,
    zIndex: 1,
  },
  toggleButton: {
    position: 'absolute',
    left: 16,
    padding: 4,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
    marginRight: 8,
    textAlign: 'right',
  },
});
