import React from 'react';
import AuthStackNavigator from '@/navigation/stack/AuthStackNavigator';
import MainDrawerNavigator from '@/navigation/drawer/MainDrawerNavigator';
import useAuth from '@/service/auth/queries/useAuth';

function RootNavigator(): React.JSX.Element {
  const {isLogin} = useAuth();

  return <>{isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />}</>;
}

export default RootNavigator;
