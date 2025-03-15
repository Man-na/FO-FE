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
import {useNavigation} from '@react-navigation/native';

import {colors} from '@/constants';
import {
  AgeSelection,
  DayPickerModal,
  DaySelection,
} from '@/components/matching/rapid';
import {useCreateRapidMatching} from '@/services/matching';

export const RapidMatchingScreen = () => {
  const navigation = useNavigation();
  const [selectedPriorities, setSelectedPriorities] = useState<{
    priority1: string | null;
    priority2: string | null;
  }>({
    priority1: null,
    priority2: null,
  });
  const [dayPickerVisible, setDayPickerVisible] = useState<boolean>(false);
  const [currentPriority, setCurrentPriority] = useState<
    'priority1' | 'priority2' | null
  >(null);
  const [selectedAge, setSelectedAge] = useState<
    'none' | 'peer' | 'higher' | null
  >(null);

  const allDays: string[] = ['월', '화', '수', '목', '금', '토', '일'];

  const createRapidMatching = useCreateRapidMatching();

  const openDayPicker = (priority: 'priority1' | 'priority2'): void => {
    setCurrentPriority(priority);
    setDayPickerVisible(true);
  };

  const selectDay = (day: string): void => {
    if (
      (currentPriority === 'priority1' &&
        selectedPriorities.priority2 === day) ||
      (currentPriority === 'priority2' && selectedPriorities.priority1 === day)
    ) {
      Alert.alert('알림', '이미 선택된 요일입니다. 다른 요일을 선택해주세요.');
      return;
    }

    setSelectedPriorities({
      ...selectedPriorities,
      [currentPriority!]: day,
    });

    setDayPickerVisible(false);
  };

  const removeDay = (priority: 'priority1' | 'priority2'): void => {
    setSelectedPriorities({
      ...selectedPriorities,
      [priority]: null,
    });
  };

  const toggleAgeSelection = (age: 'none' | 'peer' | 'higher'): void => {
    if (selectedAge === age) {
      setSelectedAge(null);
    } else {
      setSelectedAge(age);
    }
  };

  const handleSubmit = (): void => {
    const selectedDays: string[] = [];
    if (selectedPriorities.priority1) {
      selectedDays.push(selectedPriorities.priority1);
    }
    if (selectedPriorities.priority2) {
      selectedDays.push(selectedPriorities.priority2);
    }

    if (selectedDays.length === 0) {
      Alert.alert('알림', '적어도 하나의 요일을 선택해주세요.');
      return;
    }

    if (selectedAge === null) {
      Alert.alert('알림', '연령대를 선택해주세요.');
      return;
    }

    let agePreference: string = '';
    switch (selectedAge) {
      case 'none':
        agePreference = '상관없음';
        break;
      case 'peer':
        agePreference = '또래매칭';
        break;
      case 'higher':
        agePreference = '높은매칭';
        break;
    }

    Alert.alert(
      '매칭 진행',
      `1순위: ${selectedPriorities.priority1 || '없음'}\n2순위: ${
        selectedPriorities.priority2 || '없음'
      }\n연령대: ${agePreference}\n매칭을 진행합니다.`,
      [
        {
          text: '확인',
          onPress: () => {
            createRapidMatching.mutate(
              {
                priority1Day: selectedPriorities.priority1,
                priority2Day: selectedPriorities.priority2,
                agePreference: selectedAge,
              },
              {onSuccess: () => navigation.goBack()},
            );
          },
        },
      ],
    );
  };

  const isMatchingButtonEnabled: boolean =
    (selectedPriorities.priority1 !== null ||
      selectedPriorities.priority2 !== null) &&
    selectedAge !== null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* 제목 및 설명 */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>빠른 매칭 진행하기</Text>
          <Text style={styles.headerDescription}>
            저녁 시간대, 미팅 가능 요일을 2가지를 선택해주세요. 시간은 향후
            채팅방에서 정해지게 됩니다.
          </Text>
        </View>

        {/* 요일 선택 */}
        <DaySelection
          selectedPriorities={selectedPriorities}
          openDayPicker={openDayPicker}
          removeDay={removeDay}
        />

        {/* 연령대 선택 */}
        <AgeSelection
          selectedAge={selectedAge}
          toggleAgeSelection={toggleAgeSelection}
        />

        {/* 주의사항 */}
        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>
            ⚠️ 빠른 매칭을 통해 매칭된 팅팅에서 참석 확정 진행을 하지 않을 시,
            다음 빠른 매칭 참여가 제한 될 수 있습니다.
          </Text>
        </View>

        {/* 빠른 매칭 진행하기 버튼 */}
        <TouchableOpacity
          style={[
            styles.proceedButton,
            !isMatchingButtonEnabled && styles.disabledButton,
          ]}
          onPress={handleSubmit}
          disabled={!isMatchingButtonEnabled}>
          <Text style={styles.proceedButtonText}>빠른 매칭 진행하기</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* 요일 선택 모달 */}
      <DayPickerModal
        visible={dayPickerVisible}
        onClose={() => setDayPickerVisible(false)}
        allDays={allDays}
        selectDay={selectDay}
        currentPriority={currentPriority}
      />
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
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  headerDescription: {
    fontSize: 16,
    color: colors.GRAY_500,
    lineHeight: 22,
  },
  warningContainer: {
    marginBottom: 30,
    padding: 15,
    backgroundColor: colors.GRAY_100,
    borderRadius: 10,
  },
  warningText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.GRAY_700,
    textAlign: 'center',
  },
  proceedButton: {
    backgroundColor: colors.PINK_500,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  disabledButton: {
    backgroundColor: colors.GRAY_300,
  },
  proceedButtonText: {
    color: colors.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
