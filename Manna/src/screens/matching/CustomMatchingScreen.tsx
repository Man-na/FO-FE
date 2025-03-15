import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  AtmosphereSelectionStep,
  DateSelectionStep,
  LocationSelectionStep,
} from '@/components/matching/custom';
import {colors} from '@/constants';
import {useCreateCustomMatching} from '@/services/matching';
import {getMonthYearDetails, getNewMonthYear} from '@/utils';

export const CustomMatchingScreen = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedAtmosphere, setSelectedAtmosphere] = useState<string[]>([]);
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [selectedDate, setSelectedDate] = useState<number>(0);

  const createCustomMatching = useCreateCustomMatching();

  const handlePressDate = (date: number): void => {
    setSelectedDate(date);
  };

  const handleUpdateMonth = (increment: number): void => {
    setSelectedDate(0);
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };

  const goToNextStep = (): void => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      Alert.alert(
        '매칭 진행',
        `날짜: ${monthYear.year}-${monthYear.month}-${selectedDate}\n장소: ${selectedLocation}\n매칭을 진행합니다.`,
        [
          {
            text: '확인',
            onPress: () => {
              createCustomMatching.mutate(
                {
                  meetingDate: `${monthYear.year}-${monthYear.month}-${selectedDate}`,
                  location: selectedLocation,
                  agePreference: '상관없음',
                  atmospheres: selectedAtmosphere,
                },
                {onSuccess: () => navigation.goBack()},
              );
            },
          },
        ],
      );
    }
  };

  const handleAtmosphereSelection = (atmosphere: string): void => {
    if (selectedAtmosphere.includes(atmosphere)) {
      setSelectedAtmosphere(
        selectedAtmosphere.filter(item => item !== atmosphere),
      );
    } else {
      setSelectedAtmosphere([...selectedAtmosphere, atmosphere]);
    }
  };

  const isNextButtonEnabled = (): boolean => {
    switch (currentStep) {
      case 1:
        return selectedDate !== 0;
      case 2:
        return selectedLocation !== null;
      case 3:
        return selectedAtmosphere.length >= 2;
      default:
        return false;
    }
  };

  const renderCurrentStep = (): JSX.Element | null => {
    switch (currentStep) {
      case 1:
        return (
          <DateSelectionStep
            monthYear={monthYear}
            selectedDate={selectedDate}
            onPressDate={handlePressDate}
            onChangeMonth={handleUpdateMonth}
          />
        );
      case 2:
        return (
          <LocationSelectionStep
            selectedLocation={selectedLocation}
            onLocationSelect={setSelectedLocation}
          />
        );
      case 3:
        return (
          <AtmosphereSelectionStep
            selectedAtmosphere={selectedAtmosphere}
            onAtmosphereSelect={handleAtmosphereSelection}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView style={styles.content}>{renderCurrentStep()}</ScrollView>
        <View style={styles.footer}>
          {currentStep > 1 && (
            <TouchableOpacity
              style={styles.prevButton}
              onPress={() => setCurrentStep(currentStep - 1)}>
              <Text style={styles.prevButtonText}>이전</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[
              styles.nextButton,
              !isNextButtonEnabled() && styles.disabledNextButton,
            ]}
            disabled={!isNextButtonEnabled()}
            onPress={goToNextStep}>
            <Text style={styles.nextButtonText}>
              {currentStep === 3 ? '빠른 매칭 진행하기' : '다음'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.GRAY_200,
  },
  prevButton: {
    flex: 1,
    backgroundColor: colors.GRAY_300,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 8,
  },
  prevButtonText: {
    color: colors.BLACK,
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButton: {
    flex: 2,
    backgroundColor: colors.BLUE_500,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledNextButton: {
    backgroundColor: colors.GRAY_300,
  },
});
