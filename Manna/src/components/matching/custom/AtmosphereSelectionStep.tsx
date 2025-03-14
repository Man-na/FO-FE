import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from '@/constants';

const ATMOSPHERE_OPTIONS: {id: string; title: string}[] = [
  {id: 'fun', title: '다 같이 미친듯이 놀자! 🎮🔥'},
  {id: 'chill', title: '술게임은 적당히, 대화 위주로! 🍷🗯️'},
  {id: 'friendly', title: '처음 만나도 친구처럼 편하게! 🤝'},
  {id: 'values', title: '서로의 가치관이 궁금한 사람들끼리 🤔'},
  {id: 'mbti', title: 'MBTI, 연애 스타일 등 심도 있는 이야기 🧩'},
  {id: 'relaxed', title: '편하게 마시고 떠들고! 가벼운 술자리 🍻'},
  {id: 'hobby', title: '텐션보다는 분위기! 차분한 분위기 좋아하는 사람들 🛋️'},
  {id: 'cool', title: '쿨하고 자유로운 만남, 가벼운 썸 느낌 🧊'},
];

interface AtmosphereSelectionStepProps {
  selectedAtmosphere: string[];
  onAtmosphereSelect: (atmosphere: string) => void;
}

export const AtmosphereSelectionStep = ({
  selectedAtmosphere,
  onAtmosphereSelect,
}: AtmosphereSelectionStepProps) => {
  return (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>선호 분위기 설정</Text>
      <Text style={styles.stepDescription}>
        선호하는 팅팅 분위기를 2가지 이상 선택해주세요.
      </Text>
      <View style={styles.atmosphereContainer}>
        {ATMOSPHERE_OPTIONS.map(option => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.atmosphereButton,
              selectedAtmosphere.includes(option.id) &&
                styles.selectedAtmosphereButton,
            ]}
            onPress={() => onAtmosphereSelect(option.id)}>
            <Text
              style={[
                styles.atmosphereButtonText,
                selectedAtmosphere.includes(option.id) &&
                  styles.selectedAtmosphereButtonText,
              ]}>
              {option.title}
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
  atmosphereContainer: {
    marginBottom: 20,
  },
  atmosphereButton: {
    backgroundColor: colors.GRAY_100,
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.GRAY_300,
  },
  selectedAtmosphereButton: {
    backgroundColor: colors.PINK_200,
    borderColor: colors.PINK_400,
  },
  atmosphereButtonText: {
    fontSize: 16,
  },
  selectedAtmosphereButtonText: {
    color: colors.BLACK,
    fontWeight: 'bold',
  },
});
