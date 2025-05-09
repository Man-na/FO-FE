import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Image, SafeAreaView, StyleSheet, View, Text} from 'react-native';

import {ProfileCustomButton} from '@/components/profile';
import {colors, mainNavigations, profileNavigations} from '@/constants';
import {ProfileStackParamList} from '@/navigation/stack/ProfileStackNavigator';
import {MainTabParamList} from '@/navigation/tab/MainTabNavigator';
import {useAuth} from '@/services/auth';

type Navigation = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, typeof mainNavigations.PROFILE>,
  StackNavigationProp<ProfileStackParamList>
>;

type FormValues = {
  nickname: string;
};

export const EditProfileScreen = () => {
  const {getProfileQuery} = useAuth();
  const nickname = getProfileQuery.data?.nickname || '';
  const imageUri = getProfileQuery.data?.imageUri || '';
  const navigation = useNavigation<Navigation>();

  const profileForm = useForm<FormValues>({
    defaultValues: {
      nickname,
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <FormProvider {...profileForm}>
        <View style={styles.container}>
          <View style={styles.avatarContainer}>
            <Image
              source={
                imageUri
                  ? {
                      uri: imageUri,
                    }
                  : require('@/assets/default-avatar.png')
              }
              style={styles.avatar}
            />
            <ProfileCustomButton
              size="medium"
              variant="outlined"
              label="아바타 변경"
              style={{marginTop: 16}}
              onPress={() =>
                navigation.navigate(profileNavigations.EDIT_AVATAR)
              }
            />
          </View>

          <View style={styles.profileInfoContainer}>
            <Text style={styles.nicknameText}>{nickname || '닉네임'}</Text>

            <View style={styles.profileDetailsList}>
              {/* Here we can display summary of profile details when available */}
              <Text style={styles.profileDetailText}>
                {getProfileQuery.data?.gender === 'male'
                  ? '남자'
                  : getProfileQuery.data?.gender === 'female'
                  ? '여자'
                  : '성별 미설정'}
              </Text>
              <Text style={styles.profileDetailText}>
                {getProfileQuery.data?.birthDate
                  ? new Date(getProfileQuery.data.birthDate).getFullYear() +
                    '년생'
                  : '생년월일 미설정'}
              </Text>
              <Text style={styles.profileDetailText}>
                {getProfileQuery.data?.height
                  ? getProfileQuery.data.height + 'cm'
                  : '키 미설정'}
              </Text>
            </View>

            <ProfileCustomButton
              size="large"
              variant="filled"
              label="프로필 편집"
              style={styles.editProfileButton}
              onPress={() =>
                navigation.navigate(profileNavigations.EDIT_PROFILE_DETAILS)
              }
            />
          </View>
        </View>
      </FormProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  container: {
    flex: 1,
    margin: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  avatar: {
    width: 154,
    height: 154,
    borderRadius: 154,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GRAY_500,
  },
  profileInfoContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  nicknameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  profileDetailsList: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 32,
  },
  profileDetailText: {
    fontSize: 16,
    color: colors.GRAY_700,
    backgroundColor: colors.GRAY_200,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  editProfileButton: {
    width: '100%',
    marginTop: 16,
  },
  inputContainer: {
    gap: 16,
  },
});
