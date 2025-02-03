import React from 'react';
import AuthStackNavigator from '@/navigation/stack/AuthStackNavigator';
import MainDrawerNavigator from '@/navigation/drawer/MainDrawerNavigator';

function RootNavigator(): React.JSX.Element {
  const isLoggedIn = false;

  return <>{isLoggedIn ? <MainDrawerNavigator /> : <AuthStackNavigator />}</>;
}

export default RootNavigator;
