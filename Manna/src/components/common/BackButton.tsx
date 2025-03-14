import {colors} from '@/constants';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable} from 'react-native';

export const BackButton = () => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.goBack()}>
      <MaterialIcons name="arrow-back" size={28} color={colors.BLACK} />
    </Pressable>
  );
};
