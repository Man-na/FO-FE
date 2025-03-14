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
      <View style={styles.imageContainer}>
        <View style={styles.placeholderImage} />
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  premiumCard: {
    width: 150,
    backgroundColor: colors.PINK_200,
    borderRadius: 16,
    padding: 12,
    marginRight: 12,
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
    borderRadius: 40,
    backgroundColor: '#E0E0E0',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 14,
    color: colors.GRAY_700,
    textAlign: 'center',
  },
});
