import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from '@/constants';

interface AgeSelectionProps {
  selectedAge: 'none' | 'peer' | 'higher' | null;
  toggleAgeSelection: (age: 'none' | 'peer' | 'higher') => void;
}

export const AgeSelection = ({
  selectedAge,
  toggleAgeSelection,
}: AgeSelectionProps) => {
  return (
    <View style={styles.ageSelectionContainer}>
      <Text style={styles.sectionTitle}>연령대 선택하기</Text>
      <View style={styles.ageButtonsContainer}>
        <TouchableOpacity
          style={[
            styles.ageButton,
            selectedAge === 'none' && styles.selectedAgeButton,
          ]}
          onPress={() => toggleAgeSelection('none')}>
          <Text
            style={[
              styles.ageButtonText,
              selectedAge === 'none' && styles.selectedAgeButtonText,
            ]}>
            상관없음
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.ageButton,
            selectedAge === 'peer' && styles.selectedAgeButton,
          ]}
          onPress={() => toggleAgeSelection('peer')}>
          <Text
            style={[
              styles.ageButtonText,
              selectedAge === 'peer' && styles.selectedAgeButtonText,
            ]}>
            또래매칭
          </Text>
          <Text style={styles.ageDiffText}>평균 나이대 ± 3</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.ageButton,
            selectedAge === 'higher' && styles.selectedAgeButton,
          ]}
          onPress={() => toggleAgeSelection('higher')}>
          <Text
            style={[
              styles.ageButtonText,
              selectedAge === 'higher' && styles.selectedAgeButtonText,
            ]}>
            높은매칭
          </Text>
          <Text style={styles.ageDiffText}>평균 나이대 ± 5</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ageSelectionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  ageButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ageButton: {
    width: '30%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: colors.GRAY_100,
    borderWidth: 1,
    borderColor: colors.GRAY_300,
    padding: 5,
  },
  selectedAgeButton: {
    backgroundColor: colors.PINK_200,
    borderColor: colors.PINK_400,
  },
  ageButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.GRAY_700,
    marginBottom: 4,
  },
  selectedAgeButtonText: {
    color: colors.BLACK,
  },
  ageDiffText: {
    fontSize: 10,
    color: colors.GRAY_500,
    textAlign: 'center',
  },
});
