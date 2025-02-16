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

import {AddPostHeaderRight} from '@/components/AddPostHeaderRight';
import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import {MarkerSelector} from '@/components/MarkerSelector';
import {colors, mapNavigations} from '@/constants';
import useForm from '@/hooks/useForm';
import {useGetAddress} from '@/hooks/useGetAddress';
import {MapStackParamList} from '@/navigation/stack/MapStackNavigator';
import {useMutateCreatePost} from '@/services/post/queries/useMutateCreatePost';
import {MarkerColor} from '@/types';
import {validateAddPost} from '@/utils';
import {ScoreInput} from '@/components/ScoreInput';

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
  const [markerColor, setMarkerColor] = useState<MarkerColor>('RED');
  const [score, setScore] = useState(5);
  const address = useGetAddress(location);

  const handleSubmit = useCallback(() => {
    const body = {
      date: new Date(),
      title: values.title,
      description: values.description,
      color: markerColor,
      score,
      imageUris: [],
    };
    createPost.mutate(
      {address, ...location, ...body},
      {onSuccess: () => navigation.goBack()},
    );
  }, [
    values.title,
    values.description,
    markerColor,
    score,
    createPost,
    address,
    location,
    navigation,
  ]);

  const handleSelectMarker = (name: MarkerColor) => {
    setMarkerColor(name);
  };

  const handleChangeScore = (value: number) => {
    setScore(value);
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
          <CustomButton variant="outlined" size="large" label="날짜 선택" />
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
});
