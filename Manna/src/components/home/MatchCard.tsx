import {colors} from '@/constants';
import {Meeting} from '@/screens/home';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';

interface MatchCardProps {
  meeting: Meeting;
  onPress: (meetingId: number) => void;
  isExpanded: boolean;
}

export const MatchCard = ({meeting, onPress, isExpanded}: MatchCardProps) => {
  const activeMales = meeting.participants.males.filter(
    male => male.active,
  ).length;
  const totalMales = meeting.participants.males.length;
  const activeFemales = meeting.participants.females.filter(
    female => female.active,
  ).length;
  const totalFemales = meeting.participants.females.length;

  return (
    <TouchableOpacity
      style={styles.matchCard}
      onPress={() => onPress(meeting.id)}>
      <View style={styles.cardHeader}>
        <View style={styles.dateContainer}>
          <MaterialIcons name="favorite" size={16} color={colors.PINK_400} />
          <Text style={styles.dateText}>{meeting.date}</Text>
        </View>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {activeFemales + activeMales} / {totalFemales + totalFemales}
          </Text>
        </View>
      </View>

      {isExpanded && (
        <View style={styles.expandedSection}>
          <View style={styles.cardBody}>
            <View style={styles.participantSummary}>
              <View style={styles.maleSummary}>
                <View style={[styles.genderIcon]}>
                  <MaterialIcons
                    name="person"
                    size={24}
                    color={colors.BLUE_300}
                  />
                </View>
                <Text style={styles.genderCount}>
                  {activeMales} / {totalMales}
                </Text>
              </View>
              <View style={styles.femaleSummary}>
                <View style={[styles.genderIcon]}>
                  <MaterialIcons
                    name="person"
                    size={24}
                    color={colors.PINK_300}
                  />
                </View>
                <Text style={styles.genderCount}>
                  {activeFemales} / {totalFemales}
                </Text>
              </View>
            </View>

            <View style={styles.statusSummary}>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{meeting.status}</Text>
              </View>
              <View style={styles.locationBadge}>
                <MaterialIcons name="place" size={16} color={colors.BLUE_400} />
                <Text style={styles.locationText}>{meeting.location}</Text>
              </View>
            </View>
          </View>

          <View style={styles.moodContainer}>
            <Text style={styles.moodText}>{meeting.mood}</Text>
          </View>

          <View style={styles.participantDetail}>
            <View style={styles.participantRow}>
              {meeting.participants.males.map((male, index) => (
                <View key={`male-${index}`} style={styles.participantItem}>
                  <MaterialIcons
                    name="person"
                    size={20}
                    color={colors.BLUE_300}
                  />

                  <View style={styles.checkmarkContainer}>
                    {male.active ? (
                      <MaterialIcons
                        name="check"
                        size={12}
                        color={colors.BLACK}
                      />
                    ) : (
                      <View />
                    )}
                  </View>
                </View>
              ))}

              {meeting.participants.females.map((female, index) => (
                <View key={`female-${index}`} style={styles.participantItem}>
                  <MaterialIcons
                    name="person"
                    size={20}
                    color={colors.PINK_300}
                  />
                  <View style={styles.checkmarkContainer}>
                    {female.active ? (
                      <MaterialIcons
                        name="check"
                        size={12}
                        color={colors.BLACK}
                      />
                    ) : (
                      <View />
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>

          <Text style={styles.matchMessage}>
            매칭이 확정되면 그룹 채팅방이 생성됩니다.
          </Text>

          <View style={styles.timeRemainingContainer}>
            <Text style={styles.timeRemainingText}>매칭 확정까지 남은시간</Text>
            <View style={styles.timeRemainingBadge}>
              <MaterialIcons name="schedule" size={16} color={colors.WHITE} />
              <Text style={styles.timeRemainingValue}>
                {meeting.timeRemaining}
              </Text>
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  matchCard: {
    backgroundColor: colors.WHITE,
    borderRadius: 24,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'column',
    shadowColor: colors.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.BLUE_400,
    borderRadius: 20,
    height: 40,
    paddingHorizontal: 16,
  },
  cardBody: {flexDirection: 'row'},
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 4,
    color: colors.WHITE,
  },
  progressContainer: {
    backgroundColor: colors.WHITE,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  progressText: {
    fontSize: 12,
    color: colors.BLACK,
  },
  participantSummary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  maleSummary: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: 100,
    backgroundColor: colors.BLUE_200,
    borderRadius: 12,
  },
  femaleSummary: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: 100,
    backgroundColor: colors.PINK_200,
    borderRadius: 12,
  },
  genderIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genderCount: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.GRAY_700,
  },
  statusSummary: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '60%',
    backgroundColor: colors.PINK_200,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 14,
    color: colors.BLACK,
    fontWeight: '500',
  },
  locationBadge: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '60%',
    paddingVertical: 6,
  },
  locationText: {
    fontSize: 14,
    color: colors.BLACK,
    marginLeft: 4,
  },
  expandedSection: {
    marginTop: 8,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    height: 40,
    backgroundColor: colors.GRAY_100,
  },
  moodText: {
    fontSize: 14,
    color: colors.BLACK,
  },
  participantDetail: {
    marginVertical: 20,
  },
  participantRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  participantItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
    marginBottom: 6,
  },
  checkmarkContainer: {
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchMessage: {
    fontSize: 12,
    color: colors.GRAY_500,
    marginBottom: 12,
  },
  timeRemainingContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.GRAY_200,
    paddingTop: 12,
  },
  timeRemainingText: {
    fontSize: 12,
    color: colors.GRAY_500,
    marginBottom: 8,
  },
  timeRemainingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.RED_500,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  timeRemainingValue: {
    fontSize: 12,
    color: colors.WHITE,
    fontWeight: 'bold',
    marginLeft: 4,
  },
});
