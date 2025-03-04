import {ProfileCustomButton} from '@/components/common/ProfileCustomButton';
import {colors, mainNavigations, profileNavigations} from '@/constants';
import {ProfileStackParamList} from '@/navigation/stack/ProfileStackNavigator';
import {MainTabParamList} from '@/navigation/tab/MainTabNavigator';
import {useAuth} from '@/services/auth';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';

type Navigation = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, typeof mainNavigations.PROFILE>,
  StackNavigationProp<ProfileStackParamList>
>;

type FormValues = {
  nickname: string;
};

interface EditProfileScreenProps {}

function EditProfileScreen({}: EditProfileScreenProps): React.JSX.Element {
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
    <SafeAreaView>
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
        </View>
      </FormProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  inputContainer: {
    gap: 16,
  },
});

export default EditProfileScreen;
