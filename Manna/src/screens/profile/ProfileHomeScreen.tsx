import Ionicons from '@react-native-vector-icons/ionicons';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {ProfileCustomButton} from '@/components/profile';
import {colors, mainNavigations, profileNavigations} from '@/constants';
import {ProfileStackParamList} from '@/navigation/stack/ProfileStackNavigator';
import {MainTabParamList} from '@/navigation/tab/MainTabNavigator';
import {useAuth} from '@/services/auth';

type Navigation = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, typeof mainNavigations.PROFILE>,
  StackNavigationProp<ProfileStackParamList>
>;

export const ProfileHomeScreen = () => {
  const navigation = useNavigation<Navigation>();
  const {getProfileQuery, logoutMutation} = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const handlePressLogout = () => {
    logoutMutation.mutate(null);
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(previousState => !previousState);
  };

  const handleNavigate = (screen: string) => {
    console.log(`Navigate to ${screen}`);
  };

  if (getProfileQuery.isPending || getProfileQuery.isError) {
    return <></>;
  }
  const {nickname, imageUri} = getProfileQuery.data;

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.profileCard}>
        <View style={styles.profileContent}>
          <View style={styles.profileImageContainer}>
            {imageUri ? (
              <Image source={{uri: imageUri}} style={styles.avatar} />
            ) : (
              <View style={styles.placeholderImage}>
                <Text style={styles.placeholderText}>img</Text>
              </View>
            )}
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.nickname}>{nickname || '닉네임'}</Text>
            <ProfileCustomButton
              size="small"
              variant="outlined"
              label="프로필 편집"
              onPress={() =>
                navigation.navigate(profileNavigations.EDIT_PROFILE)
              }
            />
          </View>
        </View>
      </View>

      <View style={styles.settingsContainer}>
        <View style={styles.settingItem}>
          <Text style={styles.settingTitle}>팅팅 알림 설정</Text>
          <Switch
            trackColor={{false: colors.GRAY_300, true: colors.GRAY_500}}
            thumbColor={notificationsEnabled ? colors.BLACK : colors.GRAY_500}
            ios_backgroundColor={colors.GRAY_300}
            onValueChange={toggleNotifications}
            value={notificationsEnabled}
          />
        </View>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => handleNavigate('TeamingHistory')}>
          <Text style={styles.settingTitle}>팅팅후기</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.GRAY_500} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => handleNavigate('InviteFriends')}>
          <Text style={styles.settingTitle}>친구초대</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => handleNavigate('MyPosts')}>
          <Text style={styles.settingTitle}>내가 쓴 글</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.GRAY_500} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => handleNavigate('MyComments')}>
          <Text style={styles.settingTitle}>내가 쓴 댓글</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.GRAY_500} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => handleNavigate('PrivacyPolicy')}>
          <Text style={styles.settingTitle}>개인정보처리방침</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => handleNavigate('TermsOfService')}>
          <Text style={styles.settingTitle}>이용약관</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={handlePressLogout}>
          <Text style={styles.settingTitle}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.WHITE,
    padding: 8,
  },
  profileCard: {
    flexDirection: 'row',
    backgroundColor: colors.PINK_200,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
    borderRadius: 8,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  placeholderImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.GRAY_200,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.GRAY_500,
  },
  placeholderText: {
    color: colors.GRAY_500,
    fontSize: 16,
  },
  profileInfo: {
    justifyContent: 'center',
    gap: 8,
  },
  nickname: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingsContainer: {
    marginTop: 2,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.PINK_200,
    marginBottom: 4,
    height: 52,
  },
  settingTitle: {
    fontSize: 16,
    color: colors.BLACK,
  },
});
