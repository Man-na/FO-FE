import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import useForm from '@/hooks/useForm';
import {validateLogin} from '@/utils';
import useAuth from '@/service/auth/queries/useAuth';

export interface LoginFormValues {
  email: string;
  password: string;
}

function LoginScreen(): React.JSX.Element {
  const passwordRef = useRef<TextInput | null>(null);
  const {loginMutation} = useAuth();
  const {values, errors, touched, getTextInputProps} = useForm<LoginFormValues>(
    {
      email: '',
      password: '',
    },
    validateLogin,
  );

  const handleSubmit = () => {
    loginMutation.mutate(values);
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
          error={
            touched.password && !values.password
              ? '비밀번호를 입력해주세요.'
              : errors.password
          }
          touched={touched.password}
          secureTextEntry
          returnKeyType="join"
          blurOnSubmit={false}
          onSubmitEditing={handleSubmit}
          {...getTextInputProps('password')}
        />
      </View>
      <CustomButton
        label="로그인"
        variant="filled"
        size="large"
        onPress={handleSubmit}
      />
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

export default LoginScreen;
