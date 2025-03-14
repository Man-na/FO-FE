import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from '@/constants';

interface DaySelectionProps {
  selectedPriorities: {priority1: string | null; priority2: string | null};
  openDayPicker: (priority: 'priority1' | 'priority2') => void;
  removeDay: (priority: 'priority1' | 'priority2') => void;
}

export const DaySelection = ({
  selectedPriorities,
  openDayPicker,
  removeDay,
}: DaySelectionProps) => {
  return (
    <View style={styles.daySelectionContainer}>
      <Text style={styles.sectionTitle}>요일 선택하기</Text>

      {/* 1순위 요일 선택 */}
      <View style={styles.prioritySelectionContainer}>
        <Text style={styles.priorityText}>1순위 요일</Text>
        {selectedPriorities.priority1 ? (
          <View style={styles.selectedDayContainer}>
            <Text style={styles.selectedDayText}>
              {selectedPriorities.priority1}
            </Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeDay('priority1')}>
              <Text style={styles.removeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.dayPickerButton}
            onPress={() => openDayPicker('priority1')}>
            <Text style={styles.dayPickerButtonText}>가능 요일</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 2순위 요일 선택 */}
      <View style={styles.prioritySelectionContainer}>
        <Text style={styles.priorityText}>2순위 요일</Text>
        {selectedPriorities.priority2 ? (
          <View style={styles.selectedDayContainer}>
            <Text style={styles.selectedDayText}>
              {selectedPriorities.priority2}
            </Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeDay('priority2')}>
              <Text style={styles.removeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.dayPickerButton}
            onPress={() => openDayPicker('priority2')}>
            <Text style={styles.dayPickerButtonText}>가능 요일</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  daySelectionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  prioritySelectionContainer: {
    marginBottom: 15,
  },
  priorityText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  dayPickerButton: {
    backgroundColor: colors.GRAY_100,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.GRAY_300,
    alignItems: 'center',
  },
  dayPickerButtonText: {
    fontSize: 16,
    color: colors.GRAY_700,
  },
  selectedDayContainer: {
    flexDirection: 'row',
    backgroundColor: colors.PINK_200,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedDayText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  removeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.GRAY_300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: colors.WHITE,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
