import {AddPostHeaderRight} from '@/components/AddPostHeaderRight';
import CustomButton from '@/components/CustomButton';
import {DatePickerOption} from '@/components/DatePickerOption';
import {ImageInput} from '@/components/ImageInput';
import InputField from '@/components/InputField';
import {MarkerSelector} from '@/components/MarkerSelector';
import {PreviewImageList} from '@/components/PreviewImageList';
import {ScoreInput} from '@/components/ScoreInput';
import {colors, mapNavigations} from '@/constants';
import useForm from '@/hooks/useForm';
import {useGetAddress} from '@/hooks/useGetAddress';
import {useImagePicker} from '@/hooks/useImagePicker';
import {useModal} from '@/hooks/useModal';
import {usePermission} from '@/hooks/usePermission';
import {MapStackParamList} from '@/navigation/stack/MapStackNavigator';
import {useMutateCreatePost} from '@/services/post/queries/useMutateCreatePost';
import {MarkerColor} from '@/types';
import {getDateWithSeparator, validateAddPost} from '@/utils';
import Octicons from '@react-native-vector-icons/octicons';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

interface AddPostFormValues {
  title: string;
  description: string;
}

type AddPostScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigations.ADD_POST
>;

export const AddPostScreen = ({
  route,
  navigation,
}: AddPostScreenProps): React.JSX.Element => {
  const {location} = route.params;
  const descriptionRef = useRef<TextInput | null>(null);
  const {values, errors, touched, getTextInputProps} =
    useForm<AddPostFormValues>(
      {
        title: '',
        description: '',
      },
      validateAddPost,
    );
  const createPost = useMutateCreatePost();
  const address = useGetAddress(location);
  const {isVisible, show, hide} = useModal();
  const [markerColor, setMarkerColor] = useState<MarkerColor>('RED');
  const [score, setScore] = useState(5);
  const [date, setDate] = useState(new Date());
  const [isPicked, setIsPicked] = useState(false);
  const imagePicker = useImagePicker({initialImages: []});
  usePermission('PHOTO');

  const handleSubmit = useCallback(() => {
    const body = {
      date,
      title: values.title,
      description: values.description,
      color: markerColor,
      score,
      imageUris: imagePicker.imageUris,
    };
    createPost.mutate(
      {address, ...location, ...body},
      {onSuccess: () => navigation.goBack()},
    );
  }, [
    date,
    values.title,
    values.description,
    markerColor,
    score,
    createPost,
    address,
    location,
    navigation,
    imagePicker.imageUris,
  ]);

  const handleSelectMarker = (name: MarkerColor) => {
    setMarkerColor(name);
  };

  const handleChangeScore = (value: number) => {
    setScore(value);
  };

  const handleChangeDate = (pickedDate: Date) => {
    setDate(pickedDate);
  };

  const handleConfirmDate = () => {
    setIsPicked(true);
    hide();
  };

  useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => <AddPostHeaderRight onSubmit={handleSubmit} />,
    });
  }, [navigation, handleSubmit]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <InputField
            value={address}
            disabled
            icon={
              <Octicons name="location" size={16} color={colors.GRAY_500} />
            }
          />
          <CustomButton
            variant="outlined"
            size="large"
            label={isPicked ? getDateWithSeparator(date, '.') : '날짜 선택'}
            onPress={show}
          />
          <InputField
            placeholder="제목을 입력하세요."
            error={errors.title}
            touched={touched.title}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => descriptionRef.current?.focus()}
            {...getTextInputProps('title')}
          />
          <InputField
            ref={descriptionRef}
            placeholder="기록하고 싶은 내용을 입력하세요. (선택)"
            error={errors.description}
            touched={touched.description}
            multiline
            returnKeyType="next"
            {...getTextInputProps('description')}
          />
          <MarkerSelector
            score={score}
            markerColor={markerColor}
            onPressMarker={handleSelectMarker}
          />
          <ScoreInput score={score} onChangeScore={handleChangeScore} />
          <View style={styles.imagesViewer}>
            <ImageInput onChange={imagePicker.handleChange} />
            <PreviewImageList
              imageUris={imagePicker.imageUris}
              onDelete={imagePicker.delete}
              onChangeOrder={imagePicker.changeOrder}
            />
          </View>
          <DatePickerOption
            date={date}
            isVisible={isVisible}
            onChangeDate={handleChangeDate}
            onConfirmDate={handleConfirmDate}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 20,
  },
  imagesViewer: {
    flexDirection: 'row',
  },
});
