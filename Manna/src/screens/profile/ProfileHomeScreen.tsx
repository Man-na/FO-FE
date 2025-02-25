import {ProfileCustomButton} from '@/components/common/ProfileCustomButton';
import {colors, mainNavigations, profileNavigations} from '@/constants';
import {ProfileStackParamList} from '@/navigation/stack/ProfileStackNavigator';
import {MainTabParamList} from '@/navigation/tab/MainTabNavigator';
import useAuth from '@/services/auth/queries/useAuth';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

type Navigation = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, typeof mainNavigations.PROFILE>,
  StackNavigationProp<ProfileStackParamList>
>;

interface ProfileHomeScreenProps {}

function ProfileHomeScreen({}: ProfileHomeScreenProps): React.JSX.Element {
  const {getProfileQuery} = useAuth();
  const navigation = useNavigation<Navigation>();

  if (getProfileQuery.isPending || getProfileQuery.isError) {
    return <></>;
  }
  const {nickname, imageUri} = getProfileQuery.data;

  return (
    <>
      <View style={styles.header}>
        {imageUri ? (
          <Image source={{uri: imageUri}} style={styles.avatar} />
        ) : (
          <Image
            source={require('@/assets/default-avatar.png')}
            style={styles.avatar}
          />
        )}
        <ProfileCustomButton
          size="medium"
          variant="outlined"
          label="프로필 편집"
          style={{position: 'absolute', right: 16, bottom: 16}}
          onPress={() => navigation.navigate(profileNavigations.EDIT_PROFILE)}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.profile}>
          <Text style={styles.nickname}>{nickname}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    backgroundColor: colors.PINK_200,
    width: '100%',
    height: 154,
  },
  avatar: {
    position: 'absolute',
    top: 77,
    left: 16,
    width: 154,
    height: 154,
    borderRadius: 154,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GRAY_500,
  },
  container: {
    marginTop: 77,
  },
  profile: {
    padding: 16,
    gap: 16,
  },
  nickname: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  introduce: {
    fontSize: 14,
  },
  tabContainer: {
    flexDirection: 'row',
  },
});

export default ProfileHomeScreen;
