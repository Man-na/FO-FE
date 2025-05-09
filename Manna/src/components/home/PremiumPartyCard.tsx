import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '@/constants';

interface PremiumPartyCardProps {
  title: string;
  description: string;
}

export const PremiumPartyCard = ({
  title,
  description,
}: PremiumPartyCardProps) => {
  return (
    <View style={styles.premiumCard}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.imageContainer}>
        <View style={styles.placeholderImage} />
      </View>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  premiumCard: {
    width: 150,
    borderRadius: 16,
    padding: 12,
    marginRight: 12,
    backgroundColor: colors.WHITE,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  placeholderImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 14,
    color: colors.GRAY_700,
    textAlign: 'center',
  },
});
