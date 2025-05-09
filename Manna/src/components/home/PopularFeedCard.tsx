import {colors} from '@/constants';
import Ionicons from '@react-native-vector-icons/ionicons';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const PopularFeedCard = () => {
  return (
    <View style={styles.notificationCard}>
      <Text style={styles.notificationTitle}>첫 매칭 후기 썰푼 ㄷㅏ</Text>
      <Text style={styles.notificationContent}>
        어제 강남에서 4대4 매칭했음..{'\n'}첫 매 칭이라 얼떨떨하게
        장소갔는데거...
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
    backgroundColor: colors.WHITE,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '600',
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
