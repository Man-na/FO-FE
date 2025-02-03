import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Button, SafeAreaView, View} from 'react-native';
import {AuthStackParamList} from '../../navigation/stack/AuthStackNavigator';
import {authNavigations} from '../../constants';

type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_HOME
>;

function AuthHomeScreen({navigation}: AuthHomeScreenProps): React.JSX.Element {
  return (
    <SafeAreaView>
      <View>
        <Button
          title="로그인 화면으로 이동"
          onPress={() => navigation.navigate(authNavigations.LOGIN)}
        />
        <Button
          title="회원가입 화면으로 이동"
          onPress={() => navigation.navigate(authNavigations.SIGNUP)}
        />
      </View>
    </SafeAreaView>
  );
}

export default AuthHomeScreen;
