import React from 'react';
import {Button, SafeAreaView, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../navigation/AuthStackNavigator';

type AuthHomeScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'AuthHome'
>;

type Props = {
  navigation: AuthHomeScreenNavigationProp;
};

function AuthHomeScreen({navigation}: Props): React.JSX.Element {
  return (
    <SafeAreaView>
      <View>
        <Button
          title="로그인 화면으로 이동"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </SafeAreaView>
  );
}

export default AuthHomeScreen;
