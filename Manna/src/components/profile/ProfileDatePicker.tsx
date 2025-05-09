import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import {useFormContext} from 'react-hook-form';
import {colors} from '@/constants';

type DatePickerProps = {
  label: string;
  name: string;
};

export const ProfileDatePicker = ({label, name}: DatePickerProps) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const {setValue, watch} = useFormContext();

  // 초기 날짜는 폼에서 가져오거나 없으면 현재 날짜 사용
  const storedDate = watch(name);
  const initialDate = storedDate ? new Date(storedDate) : new Date(1997, 9, 29); // 이미지에 있는 기본 날짜 사용

  const [selectedYear, setSelectedYear] = useState(initialDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(
    initialDate.getMonth() + 1,
  );
  const [selectedDay, setSelectedDay] = useState(initialDate.getDate());

  // 년도, 월, 일 목록 생성
  const years = Array.from(
    {length: 100},
    (_, i) => new Date().getFullYear() - i,
  );
  const months = Array.from({length: 12}, (_, i) => i + 1);
  const days = Array.from({length: 31}, (_, i) => i + 1);

  const formatDate = () => {
    return `${selectedYear} / ${String(selectedMonth).padStart(
      2,
      '0',
    )} / ${String(selectedDay).padStart(2, '0')}`;
  };

  const handleConfirm = () => {
    // ISO 형식의 날짜 문자열 생성
    const date = new Date(selectedYear, selectedMonth - 1, selectedDay);
    setValue(name, date.toISOString());
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.inputText}>
          {storedDate
            ? formatDate()
            : `${selectedYear} / ${String(selectedMonth).padStart(
                2,
                '0',
              )} / ${String(selectedDay).padStart(2, '0')}`}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>취소</Text>
              </TouchableOpacity>
              <Text style={styles.headerTitle}>날짜 선택</Text>
              <TouchableOpacity onPress={handleConfirm}>
                <Text style={styles.confirmText}>확인</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.pickerContainer}>
              {/* 년도 선택 */}
              <View style={styles.pickerColumn}>
                <Text style={styles.pickerColumnLabel}>년</Text>
                <ScrollView
                  contentContainerStyle={styles.scrollContent}
                  showsVerticalScrollIndicator={false}>
                  {years.map(year => (
                    <TouchableOpacity
                      key={`year-${year}`}
                      style={[
                        styles.pickerItem,
                        selectedYear === year && styles.selectedItem,
                      ]}
                      onPress={() => setSelectedYear(year)}>
                      <Text
                        style={[
                          styles.pickerItemText,
                          selectedYear === year && styles.selectedItemText,
                        ]}>
                        {year}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* 월 선택 */}
              <View style={styles.pickerColumn}>
                <Text style={styles.pickerColumnLabel}>월</Text>
                <ScrollView
                  contentContainerStyle={styles.scrollContent}
                  showsVerticalScrollIndicator={false}>
                  {months.map(month => (
                    <TouchableOpacity
                      key={`month-${month}`}
                      style={[
                        styles.pickerItem,
                        selectedMonth === month && styles.selectedItem,
                      ]}
                      onPress={() => setSelectedMonth(month)}>
                      <Text
                        style={[
                          styles.pickerItemText,
                          selectedMonth === month && styles.selectedItemText,
                        ]}>
                        {month}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* 일 선택 */}
              <View style={styles.pickerColumn}>
                <Text style={styles.pickerColumnLabel}>일</Text>
                <ScrollView
                  contentContainerStyle={styles.scrollContent}
                  showsVerticalScrollIndicator={false}>
                  {days.map(day => (
                    <TouchableOpacity
                      key={`day-${day}`}
                      style={[
                        styles.pickerItem,
                        selectedDay === day && styles.selectedItem,
                      ]}
                      onPress={() => setSelectedDay(day)}>
                      <Text
                        style={[
                          styles.pickerItemText,
                          selectedDay === day && styles.selectedItemText,
                        ]}>
                        {day}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: colors.GRAY_800,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: colors.GRAY_300,
    borderRadius: 24,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  inputText: {
    fontSize: 16,
    color: colors.GRAY_700,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY_200,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cancelText: {
    fontSize: 16,
    color: colors.GRAY_600,
  },
  confirmText: {
    fontSize: 16,
    color: colors.BLUE_400,
    fontWeight: '600',
  },
  pickerContainer: {
    flexDirection: 'row',
    height: 200,
    padding: 10,
  },
  pickerColumn: {
    flex: 1,
    alignItems: 'center',
  },
  pickerColumnLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: colors.GRAY_700,
  },
  scrollContent: {
    paddingVertical: 8,
  },
  pickerItem: {
    height: 40,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
    borderRadius: 20,
  },
  selectedItem: {
    backgroundColor: colors.BLUE_400,
  },
  pickerItemText: {
    fontSize: 16,
    color: colors.GRAY_700,
  },
  selectedItemText: {
    fontWeight: '600',
    color: colors.WHITE,
  },
});
