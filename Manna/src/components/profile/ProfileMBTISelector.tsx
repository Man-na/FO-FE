import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useFormContext} from 'react-hook-form';
import {colors} from '@/constants';

export const ProfileMBTISelector = () => {
  const {setValue, watch} = useFormContext();
  const mbti = watch('mbti') || {};

  // MBTI 그룹 정의
  const groups = [
    {name: 'attitude', options: ['E', 'I']},
    {name: 'perceiving', options: ['S', 'N']},
    {name: 'judging', options: ['T', 'F']},
    {name: 'lifestyle', options: ['J', 'P']},
  ];

  // 버튼에 표시할 MBTI 타입 순서
  const mbtiTypes = ['E', 'S', 'T', 'J', 'I', 'N', 'F', 'P'];

  const selectMBTIType = (type: string) => {
    // 어떤 그룹에 속하는지 찾기
    let selectedGroup = '';
    for (const group of groups) {
      if (group.options.includes(type)) {
        selectedGroup = group.name;
        break;
      }
    }

    if (selectedGroup) {
      // 해당 그룹의 값 업데이트
      setValue('mbti', {
        ...mbti,
        [selectedGroup]: type,
      });
    }
  };

  // 타입이 선택되었는지 확인
  const isSelected = (type: string) => {
    return Object.values(mbti).includes(type);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>MBTI</Text>
      <View style={styles.mbtiGrid}>
        <View style={styles.mbtiRow}>
          {mbtiTypes.slice(0, 4).map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.mbtiButton,
                isSelected(type) && styles.selectedButton,
              ]}
              onPress={() => selectMBTIType(type)}>
              <Text
                style={[
                  styles.mbtiText,
                  isSelected(type) && styles.selectedButtonText,
                ]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.mbtiRow}>
          {mbtiTypes.slice(4).map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.mbtiButton,
                isSelected(type) && styles.selectedButton,
              ]}
              onPress={() => selectMBTIType(type)}>
              <Text
                style={[
                  styles.mbtiText,
                  isSelected(type) && styles.selectedButtonText,
                ]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
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
    color: colors.GRAY_700,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.GRAY_200,
  },
  selectedButton: {
    backgroundColor: colors.BLUE_400,
  },
  buttonText: {
    fontSize: 16,
    color: colors.GRAY_500,
  },
  selectedButtonText: {
    color: colors.WHITE,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: colors.GRAY_300,
    borderRadius: 24,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  inputText: {
    fontSize: 16,
    color: colors.GRAY_700,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unit: {
    position: 'absolute',
    right: 16,
    color: colors.GRAY_500,
  },
  buttonRows: {},
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.GRAY_200,
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    marginLeft: 8,
    fontSize: 12,
  },
  mbtiGrid: {
    gap: 8,
  },
  mbtiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  mbtiButton: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.GRAY_200,
    borderRadius: 8,
  },
  mbtiText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.GRAY_700,
  },
});
