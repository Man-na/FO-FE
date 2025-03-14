import {colors} from '@/constants';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type AddMatchingCardProps = {
  onPress: () => void;
};

export const AddMatchingCard = ({onPress}: AddMatchingCardProps) => {
  return (
    <TouchableOpacity style={styles.addMatchingCard} onPress={onPress}>
      <View style={styles.plusIconContainer}>
        <Text style={styles.plusIcon}>+</Text>
      </View>
      <Text style={styles.addMatchingText}>새로운 매칭 시작하기</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addMatchingCard: {
    backgroundColor: colors.PINK_200,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
  },
  plusIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.PINK_200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  plusIcon: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.WHITE,
  },
  addMatchingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.GRAY_700,
  },
});
