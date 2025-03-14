import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {colors} from '@/constants';

interface DayPickerModalProps {
  visible: boolean;
  onClose: () => void;
  allDays: string[];
  selectDay: (day: string) => void;
  currentPriority: 'priority1' | 'priority2' | null;
}

export const DayPickerModal = ({
  visible,
  onClose,
  allDays,
  selectDay,
  currentPriority,
}: DayPickerModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {currentPriority === 'priority1' ? '1순위' : '2순위'} 요일 선택
          </Text>
          <View style={styles.dayScrollContainer}>
            <ScrollView
              style={styles.dayScroll}
              showsVerticalScrollIndicator={true}>
              {allDays.map(day => (
                <TouchableOpacity
                  key={day}
                  style={styles.dayOption}
                  onPress={() => selectDay(day)}>
                  <Text style={styles.dayOptionText}>{day}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>취소</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: colors.WHITE,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dayScrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dayScroll: {
    height: 200,
    width: '70%',
    borderWidth: 1,
    borderColor: colors.GRAY_300,
    borderRadius: 10,
  },
  dayOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY_200,
    alignItems: 'center',
  },
  dayOptionText: {
    fontSize: 18,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.GRAY_300,
    borderRadius: 10,
  },
  cancelButtonText: {
    color: colors.BLACK,
    fontSize: 16,
    fontWeight: '500',
  },
});
