import {colors} from '@/constants';
import Ionicons from '@react-native-vector-icons/ionicons';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const PopularFeedCard = () => {
  return (
    <View style={styles.notificationCard}>
      <Text style={styles.notificationTitle}>제목 제목 제목</Text>
      <Text style={styles.notificationContent}>
        본문본문본문본문본문본문본문본문본문본문본문
      </Text>
      <View style={styles.reactionContainer}>
        <Text style={styles.reactionText}>자유 게시판</Text>
        <View style={styles.counters}>
          <View style={styles.counterItem}>
            <Ionicons name="close-outline" size={18} color="#888" />
            <Text style={styles.counterText}>10</Text>
          </View>
          <View style={styles.counterItem}>
            <Ionicons name="close-outline" size={18} color="#888" />
            <Text style={styles.counterText}>10</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  notificationCard: {
    backgroundColor: colors.PINK_200,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  notificationContent: {
    fontSize: 14,
    color: colors.GRAY_700,
    marginBottom: 12,
  },
  reactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reactionText: {
    fontSize: 14,
    color: colors.GRAY_500,
  },
  counters: {
    flexDirection: 'row',
  },
  counterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  counterText: {
    marginLeft: 4,
    fontSize: 14,
    color: colors.GRAY_500,
  },
});
