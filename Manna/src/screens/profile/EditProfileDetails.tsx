// screens/profile/EditProfileDetailsScreen.tsx
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  ProfileBodyTypeSelector,
  ProfileDatePicker,
  ProfileGenderSelector,
  ProfileHeightInput,
  ProfileMBTISelector,
  ProfileNicknameInput,
} from '@/components/profile';
import {colors, profileNavigations} from '@/constants';
import {ProfileStackParamList} from '@/navigation/stack/ProfileStackNavigator';
import {useAuth} from '@/services/auth';

type ProfileDetailsFormValues = {
  gender: string;
  birthDate: string;
  height: string;
  bodyType: string;
  nickname: string;
  mbti: string[];
};

type EditProfileDetailsScreenNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  typeof profileNavigations.EDIT_PROFILE_DETAILS
>;

export const EditProfileDetailsScreen = () => {
  const navigation = useNavigation<EditProfileDetailsScreenNavigationProp>();
  const {getProfileQuery} = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  // Get profile data from the query, or use default values
  const userData = getProfileQuery.data || {};

  const methods = useForm<ProfileDetailsFormValues>({
    defaultValues: {
      gender: userData.gender || '',
      birthDate: userData.birthDate || '',
      height: userData.height?.toString() || '',
      bodyType: userData.bodyType || '',
      nickname: userData.nickname || '',
      mbti: userData.mbti || [],
    },
  });

  const onSubmit = methods.handleSubmit(data => {
    // Here you would update the profile data
    console.log('Form submitted:', data);
    navigation.goBack();
  });

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const renderProgressBar = () => {
    const progress = (currentStep / totalSteps) * 100;

    return (
      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressBar,
            {width: `${progress}%`, backgroundColor: '#ff90a8'},
          ]}
        />
      </View>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <ProfileGenderSelector label="성별" />
            <ProfileDatePicker label="나이" name="birthDate" />
            <ProfileHeightInput label="키" name="height" />
            <ProfileBodyTypeSelector label="체형" />
          </>
        );
      case 2:
        return (
          <>
            <ProfileNicknameInput label="닉네임" />
            <ProfileMBTISelector />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.headerText}>프로필</Text>
        <FormProvider {...methods}>
          <View style={styles.formContainer}>{renderStepContent()}</View>
        </FormProvider>
      </ScrollView>

      {renderProgressBar()}

      <TouchableOpacity style={styles.nextButton} onPress={nextStep}>
        <Text style={styles.nextButtonText}>
          {currentStep === totalSteps ? '완료' : '다음으로'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  formContainer: {
    marginBottom: 24,
  },
  progressContainer: {
    height: 4,
    backgroundColor: colors.GRAY_200,
    width: '100%',
  },
  progressBar: {
    height: '100%',
  },
  nextButton: {
    backgroundColor: colors.BLUE_400,
    paddingVertical: 16,
    borderRadius: 30,
    marginHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    color: colors.WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
});
