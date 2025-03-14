import {colors} from '@/constants';
import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

interface ProfileCustomButtonProps extends PressableProps {
  label: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'standard' | 'filled' | 'outlined';
  style?: StyleProp<ViewStyle>;
}

export const ProfileCustomButton = ({
  label,
  size = 'large',
  variant = 'filled',
  style = null,
  ...props
}: ProfileCustomButtonProps) => {
  return (
    <Pressable
      style={({pressed}) => [
        styles.container,
        styles[size],
        styles[variant],
        props.disabled && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}
      {...props}>
      <Text style={styles[`${variant}Text`]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  large: {
    width: '100%',
    height: 44,
  },
  medium: {
    height: 38,
    alignSelf: 'center',
    paddingHorizontal: 12,
  },
  small: {
    height: 32,
    alignSelf: 'center',
    paddingHorizontal: 12,
  },
  filled: {
    backgroundColor: colors.PINK_500,
  },
  standard: {},
  outlined: {
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    borderColor: colors.PINK_500,
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    backgroundColor: colors.GRAY_300,
  },
  standardText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.PINK_500,
  },
  filledText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.WHITE,
  },
  outlinedText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.PINK_500,
  },
});
