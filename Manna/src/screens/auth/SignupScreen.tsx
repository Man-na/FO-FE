import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import useForm from '@/hooks/useForm';
import useAuth from '@/service/auth/queries/useAuth';
import {validateSignup} from '@/utils';
import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';

export interface SignupFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
}

function SignupScreen(): React.JSX.Element {
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);

  const {values, errors, touched, getTextInputProps} =
    useForm<SignupFormValues>(
      {
        email: '',
        password: '',
        passwordConfirm: '',
      },
      validateSignup,
    );
  const {signupMutation, loginMutation} = useAuth();

  const handleSubmit = () => {
    const {email, password} = values;

    signupMutation.mutate(
      {email, password},
      {
        onSuccess: () => loginMutation.mutate({email, password}),
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          error={
            touched.email && !values.email
              ? '이메일을 입력해주세요.'
              : errors.email
          }
          touched={touched.email}
          inputMode="email"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          textContentType="oneTimeCode"
          error={
            touched.password && !values.password
              ? '비밀번호를 입력해주세요.'
              : errors.password
          }
          touched={touched.password}
          secureTextEntry
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          {...getTextInputProps('password')}
        />
        <InputField
          ref={passwordConfirmRef}
          placeholder="비밀번호 확인"
          error={
            touched.passwordConfirm && !values.passwordConfirm
              ? '비밀번호를 입력해주세요.'
              : errors.passwordConfirm
          }
          touched={touched.passwordConfirm}
          secureTextEntry
          onSubmitEditing={handleSubmit}
          {...getTextInputProps('passwordConfirm')}
        />
      </View>
      <CustomButton label="회원가입" onPress={handleSubmit} />
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
