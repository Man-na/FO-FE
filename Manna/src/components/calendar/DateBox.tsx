import {colors} from '@/constants';
import React from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';

interface DateBoxProps {
  date: number;
  isToday: boolean;
  selectedDate: number;
  onPressDate: (date: number) => void;
}

const deviceWidth = Dimensions.get('window').width;
const boxWidth = (deviceWidth - 32) / 7;

export const DateBox = ({
  date,
  isToday,
  selectedDate,
  onPressDate,
}: DateBoxProps) => {
  return (
    <Pressable
      style={styles.container}
      onPress={() => onPressDate(date)}
      disabled={date <= 0}>
      {date > 0 && (
        <>
          <View
            style={[
              styles.dateContainer,
              selectedDate === date && styles.selectedContainer,
              selectedDate === date && isToday && styles.selectedTodayContainer,
            ]}>
            <Text
              style={[
                styles.dateText,
                isToday && styles.todayText,
                selectedDate === date && styles.selectedDateText,
                selectedDate === date && isToday && styles.selectedTodayText,
              ]}>
              {date}
            </Text>
          </View>
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: boxWidth,
    height: boxWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_200,
    alignItems: 'center',
  },
  dateContainer: {
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 28,
  },
  selectedContainer: {
    backgroundColor: colors.BLACK,
  },
  selectedTodayContainer: {
    backgroundColor: colors.PINK_700,
  },
  dateText: {
    fontSize: 16,
    color: colors.BLACK,
  },
  todayText: {
    color: colors.PINK_700,
    fontWeight: 'bold',
  },
  selectedDateText: {
    color: colors.WHITE,
    fontWeight: 'bold',
  },
  selectedTodayText: {
    color: colors.WHITE,
  },
  scheduleIndicator: {
    marginTop: 2,
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: colors.GRAY_500,
  },
});
