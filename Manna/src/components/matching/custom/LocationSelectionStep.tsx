import {colors} from '@/constants';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const LOCATIONS: {id: string; title: string}[] = [
  {id: 'any', title: '상관없음'},
  {id: 'gangnam', title: '강남'},
  {id: 'hongdae', title: '홍대/신촌'},
  {id: 'itaewon', title: '이태원'},
  {id: 'kondae', title: '건대/성수'},
  {id: 'jamsil', title: '잠실/방이'},
];

interface LocationSelectionStepProps {
  selectedLocation: string | null;
  onLocationSelect: (location: string) => void;
}

export const LocationSelectionStep = ({
  selectedLocation,
  onLocationSelect,
}: LocationSelectionStepProps) => {
  return (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>장소 선택하기</Text>
      <Text style={styles.stepDescription}>원하는 장소를 선택해주세요.</Text>
      <View style={styles.locationsContainer}>
        {LOCATIONS.map(location => (
          <TouchableOpacity
            key={location.id}
            style={[
              styles.locationButton,
              selectedLocation === location.id && styles.selectedLocationButton,
            ]}
            onPress={() => onLocationSelect(location.id)}>
            <Text
              style={[
                styles.locationButtonText,
                selectedLocation === location.id &&
                  styles.selectedLocationButtonText,
              ]}>
              {location.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stepContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 16,
    color: colors.GRAY_500,
    marginBottom: 24,
  },
  locationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  locationButton: {
    width: '48%',
    backgroundColor: colors.GRAY_100,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.GRAY_300,
  },
  selectedLocationButton: {
    backgroundColor: colors.PINK_200,
    borderColor: colors.PINK_400,
  },
  locationButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  selectedLocationButtonText: {
    color: colors.BLACK,
    fontWeight: 'bold',
  },
});
