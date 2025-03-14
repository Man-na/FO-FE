import {colors} from '@/constants';
import {Meeting} from '@/screens/home';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface MatchCardProps {
  meeting: Meeting;
  onPress: (meetingId: number) => void;
}

export const MatchCard = ({meeting, onPress}: MatchCardProps) => {
  const statusColor = meeting.status === '자동매칭' ? '#F8C3C8' : '#F8A7AC';

  return (
    <TouchableOpacity
      style={styles.matchCard}
      onPress={() => onPress(meeting.id)}>
      <View style={styles.cardHeader}>
        <Text>{meeting.date}</Text>
        <View style={[styles.statusBadge, {backgroundColor: statusColor}]}>
          <Text style={styles.statusText}>{meeting.status}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <Text>
          현재 매칭 인원 [남자{' '}
          {
            meeting.participants.males.filter(male => male.active === true)
              .length
          }
          /{meeting.participants.males.length}명] [여자{' '}
          {
            meeting.participants.females.filter(
              female => female.active === true,
            ).length
          }
          /{meeting.participants.females.length}명]
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  matchCard: {
    backgroundColor: colors.PINK_200,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'column',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardBody: {
    paddingTop: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 14,
    color: colors.WHITE,
    fontWeight: '500',
  },
});
