import Ionicons from '@react-native-vector-icons/ionicons';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import React from 'react';
import {useFormContext, useWatch} from 'react-hook-form';
import {Alert, Pressable, StyleSheet, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {colors} from '@/constants';
import {useUploadImages} from '@/services/feed';
import {getFormDataImages} from '@/utils';

export const FeedWriteFooter = () => {
  const inset = useSafeAreaInsets();
  const {control, setValue} = useFormContext();
  const [imageUris] = useWatch({control, name: ['imageUris']});
  const uploadImages = useUploadImages();

  const addImageUris = (uris: string[]) => {
    if (imageUris.length + uris.length > 5) {
      Alert.alert('이미지 개수 초과', '추가 가능한 이미지는 최대 5개입니다.');
      return;
    }
    setValue('imageUris', [...imageUris, ...uris.map(uri => ({uri}))]);
  };

  const handleOpenImagePicker = async () => {
    const remaining = 5 - imageUris.length;
    if (remaining <= 0) {
      Alert.alert('이미지 개수 초과', '이미 5개의 이미지를 가지고 있습니다.');
      return;
    }

    try {
      const images = await ImagePicker.openPicker({
        multiple: true,
        mediaType: 'photo',
        maxFiles: remaining,
      });

      const formData = getFormDataImages('images', images);
      uploadImages.mutate(formData, {
        onSuccess: (data: string[]) => addImageUris(data),
      });
    } catch (error: any) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        Alert.alert('Error', '이미지 선택 중 오류가 발생했습니다.');
      }
    }
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
