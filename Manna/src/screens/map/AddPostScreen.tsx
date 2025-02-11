import Octicons from '@react-native-vector-icons/octicons';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import {colors, mapNavigations} from '@/constants';
import useForm from '@/hooks/useForm';
import {MapStackParamList} from '@/navigation/stack/MapStackNavigator';
import {validateAddPost} from '@/utils';

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
}: AddPostScreenProps): React.JSX.Element => {
  const descriptionRef = useRef<TextInput | null>(null);
  const {values, errors, touched, getTextInputProps} =
    useForm<AddPostFormValues>(
      {
        title: '',
        description: '',
      },
      validateAddPost,
    );
  const {location} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <InputField
            value=""
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
