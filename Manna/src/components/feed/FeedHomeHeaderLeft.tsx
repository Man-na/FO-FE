import {colors} from '@/constants';
import {FeedStackParamList} from '@/navigation/stack/FeedStackNavigator';
import {MainTabParamList} from '@/navigation/tab/MainTabNavigator';
import Ionicons from '@react-native-vector-icons/ionicons';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {HeaderButton} from '../common/HeaderButton';

type FeedHomeHeaderLeftProps = CompositeNavigationProp<
  StackNavigationProp<FeedStackParamList>,
  DrawerNavigationProp<MainTabParamList>
>;

export const FeedHomeHeaderLeft = (navigation: FeedHomeHeaderLeftProps) => {
  return (
    <HeaderButton
      icon={<Ionicons name="menu" color={colors.BLACK} size={25} />}
      onPress={() => navigation.openDrawer()}
    />
  );
};
