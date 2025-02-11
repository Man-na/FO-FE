import MainDrawerNavigator from '@/navigation/drawer/MainDrawerNavigator';
import AuthStackNavigator from '@/navigation/stack/AuthStackNavigator';
import useAuth from '@/services/auth/queries/useAuth';
import React from 'react';

function RootNavigator(): React.JSX.Element {
  const {isLogin} = useAuth();

  return <>{isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />}</>;
}

export default RootNavigator;
