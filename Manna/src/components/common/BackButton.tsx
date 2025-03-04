import {useNavigation} from '@react-navigation/native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import {Pressable} from 'react-native';
import {colors} from '@/constants';
import React from 'react';

export const BackButton = (): React.JSX.Element => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.goBack()}>
      <MaterialIcons name="arrow-back" size={28} color={colors.BLACK} />
    </Pressable>
  );
};
