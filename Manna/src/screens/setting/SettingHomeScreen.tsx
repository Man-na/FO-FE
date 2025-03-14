import Octicons from '@react-native-vector-icons/octicons';
import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import {SettingItem} from '@/components/setting';
import {colors} from '@/constants';
import {useAuth} from '@/services/auth';

export const SettingHomeScreen = () => {
  const {logoutMutation} = useAuth();

  const handlePressLogout = () => {
    logoutMutation.mutate(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.space} />
        <SettingItem
          title="로그아웃"
          onPress={handlePressLogout}
          color={colors.RED_500}
          icon={<Octicons name={'sign-out'} color={colors.RED_500} size={16} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  space: {
    height: 30,
  },
});

export default SettingHomeScreen;
