import useAuth from '@/service/auth/queries/useAuth';
import React from 'react';
import {Button, Text, View} from 'react-native';

function MapHomeScreen(): React.JSX.Element {
  const {logoutMutation} = useAuth();
  return (
    <View>
      <Text>맵 스크린</Text>
      <Button title="로그아웃" onPress={() => logoutMutation.mutate(null)} />
    </View>
  );
}

export default MapHomeScreen;
