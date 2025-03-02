import {colors} from '@/constants';
import {useImagePicker} from '@/hooks/useImagePicker';
import {usePermission} from '@/hooks/usePermission';
import {useFormContext} from 'react-hook-form';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import MaterialIcons from '@react-native-vector-icons/material-icons';

export const PostWriteFooter = () => {
  const inset = useSafeAreaInsets();
  const {setValue, watch} = useFormContext();
  const imageUris = watch('imageUris');
  usePermission('PHOTO');

  const imagePicker = useImagePicker({
    initialImages: imageUris || [],
    mode: 'multiple',
    onSettled: () => {
      setValue('imageUris', imagePicker.imageUris);
    },
  });

  const handleOpenImagePicker = () => {
    imagePicker.handleChange();
  };

  return (
    <View style={[styles.container, {paddingBottom: inset.bottom}]}>
      <Pressable style={styles.footerIcon} onPress={handleOpenImagePicker}>
        <Ionicons name={'camera'} size={20} color={colors.BLACK} />
      </Pressable>
      <Pressable
        style={styles.footerIcon}
        onPress={() => setValue('isVoteOpen', true)}>
        <MaterialIcons name="how-to-vote" size={20} color={colors.BLACK} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 12,
    bottom: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.WHITE,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_300,
    flexDirection: 'row',
    gap: 10,
  },
  footerIcon: {
    backgroundColor: colors.GRAY_100,
    padding: 10,
    borderRadius: 5,
  },
});
