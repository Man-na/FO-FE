import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import useForm from '@/hooks/useForm';
import {validateSignup} from '@/utils';
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

export interface SignupFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
}

function SignupScreen(): React.JSX.Element {
  const {values, errors, touched, getTextInputProps} =
    useForm<SignupFormValues>(
      {
        email: '',
        password: '',
        passwordConfirm: '',
      },
      validateSignup,
    );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="이메일"
          error={
            touched.email && !values.email
              ? '이메일을 입력해주세요.'
              : errors.email
          }
          touched={touched.email}
          inputMode="email"
          {...getTextInputProps('email')}
        />
        <InputField
          placeholder="비밀번호"
          error={
            touched.password && !values.password
              ? '비밀번호를 입력해주세요.'
              : errors.password
          }
          touched={touched.password}
          secureTextEntry
          {...getTextInputProps('password')}
        />
        <InputField
          placeholder="비밀번호 확인"
          error={
            touched.passwordConfirm && !values.passwordConfirm
              ? '비밀번호를 입력해주세요.'
              : errors.passwordConfirm
          }
          touched={touched.passwordConfirm}
          secureTextEntry
          {...getTextInputProps('passwordConfirm')}
        />
      </View>
      <CustomButton label="회원가입" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});

export default SignupScreen;
