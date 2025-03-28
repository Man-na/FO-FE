import {colors} from '@/constants';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ProfileCustomButton} from './ProfileCustomButton';

interface FixedBottomCTAProps {
  label: string;
  onPress: () => void;
}

export const FixedBottomCTA = ({label, onPress}: FixedBottomCTAProps) => {
  const inset = useSafeAreaInsets();

  return (
    <View style={[styles.fixed, {paddingBottom: inset.bottom || 12}]}>
      <ProfileCustomButton label={label} onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  fixed: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_300,
    paddingTop: 12,
    paddingHorizontal: 16,
  },
});
