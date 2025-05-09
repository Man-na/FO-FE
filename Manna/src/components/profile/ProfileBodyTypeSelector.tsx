import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useFormContext} from 'react-hook-form';
import {colors} from '@/constants';

type BodyTypeSelectorProps = {
  label: string;
};

export const ProfileBodyTypeSelector = ({label}: BodyTypeSelectorProps) => {
  const {setValue, watch} = useFormContext();
  const bodyType = watch('bodyType');

  const bodyTypes = [
    {id: 'slim', label: '슬림한'},
    {id: 'normal', label: '보통'},
    {id: 'muscular', label: '운동한'},
    {id: 'chubby', label: '통통한'},
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.buttonRows}>
        <View style={styles.buttonRow}>
          {bodyTypes.slice(0, 2).map(type => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.typeButton,
                bodyType === type.id && styles.selectedButton,
              ]}
              onPress={() => setValue('bodyType', type.id)}>
              <Text
                style={[
                  styles.buttonText,
                  bodyType === type.id && styles.selectedButtonText,
                ]}>
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.buttonRow}>
          {bodyTypes.slice(2, 4).map(type => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.typeButton,
                bodyType === type.id && styles.selectedButton,
              ]}
              onPress={() => setValue('bodyType', type.id)}>
              <Text
                style={[
                  styles.buttonText,
                  bodyType === type.id && styles.selectedButtonText,
                ]}>
                {type.label}
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
