import AuthStackNavigator from '@/navigation/stack/AuthStackNavigator';
import MainTabNavigator from '@/navigation/tab/MainTabNavigator';
import useAuth from '@/services/auth/queries/useAuth';
import React from 'react';

function RootNavigator(): React.JSX.Element {
  const {isLogin} = useAuth();

  return <>{isLogin ? <MainTabNavigator /> : <AuthStackNavigator />}</>;
}

export default RootNavigator;
