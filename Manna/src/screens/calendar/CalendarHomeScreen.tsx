import {Calendar} from '@/components/calendar/Calendar';
import {EventList} from '@/components/calendar/EventList';
import {colors} from '@/constants';
import {useGetCalendarMarkers} from '@/services/calendar/queries/useGetCalendarMarkers';
import {getMonthYearDetails, getNewMonthYear} from '@/utils';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

interface CalendarHomeScreenProps {}

function CalendarHomeScreen({}: CalendarHomeScreenProps): React.JSX.Element {
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [selectedDate, setSelectedDate] = useState(0);
  const {
    data: markers,
    isPending,
    isError,
  } = useGetCalendarMarkers(monthYear.year, monthYear.month);

  const moveToToday = () => {
    setSelectedDate(new Date().getDate());
    setMonthYear(getMonthYearDetails(new Date()));
  };

  useEffect(() => {
    moveToToday();
  }, []);

  if (isPending || isError) {
    return <></>;
  }

  const handlePressDate = (date: number) => {
    setSelectedDate(date);
  };

  const handleUpdateMonth = (increment: number) => {
    setSelectedDate(0);
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        monthYear={monthYear}
        schedules={markers}
        selectedDate={selectedDate}
        onPressDate={handlePressDate}
        onChangeMonth={handleUpdateMonth}
        moveToToday={moveToToday}
      />
      <EventList markers={markers[selectedDate]} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

export default CalendarHomeScreen;
