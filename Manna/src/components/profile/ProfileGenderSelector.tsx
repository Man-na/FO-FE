import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useFormContext} from 'react-hook-form';
import {colors} from '@/constants';

type GenderSelectorProps = {
  label: string;
};

export const ProfileGenderSelector = ({label}: GenderSelectorProps) => {
  const {setValue, watch} = useFormContext();
  const gender = watch('gender');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === 'male' && styles.selectedButton,
          ]}
          onPress={() => setValue('gender', 'male')}>
          <Text
            style={[
              styles.buttonText,
              gender === 'male' && styles.selectedButtonText,
            ]}>
            남자
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === 'female' && styles.selectedButton,
          ]}
          onPress={() => setValue('gender', 'female')}>
          <Text
            style={[
              styles.buttonText,
              gender === 'female' && styles.selectedButtonText,
            ]}>
            여자
          </Text>
        </TouchableOpacity>
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
