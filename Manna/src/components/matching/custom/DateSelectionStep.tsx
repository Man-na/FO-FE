import {Calendar} from '@/components/calendar/Calendar';
import {colors} from '@/constants';
import {MonthYear} from '@/utils';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface DateSelectionStepProps {
  monthYear: MonthYear;
  selectedDate: number;
  onPressDate: (date: number) => void;
  onChangeMonth: (increment: number) => void;
}

export const DateSelectionStep = ({
  monthYear,
  selectedDate,
  onPressDate,
  onChangeMonth,
}: DateSelectionStepProps) => {
  return (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>날짜 선택하기</Text>
      <Text style={styles.stepDescription}>원하는 날짜를 선택해주세요.</Text>
      <Calendar
        monthYear={monthYear}
        selectedDate={selectedDate}
        onPressDate={onPressDate}
        onChangeMonth={onChangeMonth}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  stepContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 16,
    color: colors.GRAY_500,
    marginBottom: 24,
  },
});
