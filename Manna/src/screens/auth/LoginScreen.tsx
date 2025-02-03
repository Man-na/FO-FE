import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import InputField from '@/components/InputField';

function LoginScreen(): React.JSX.Element {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const handleChangeText = (name: string, text: string) => {
    setValues({...values, [name]: text});
  };

  const handleBlur = (name: string) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="이메일"
          error={touched.email && !values.email ? '이메일을 입력하세요.' : ''}
          touched={touched.email}
          inputMode="email"
          value={values.email}
          onChangeText={(text: string) => handleChangeText('email', text)}
          onBlur={() => handleBlur('email')}
        />
        <InputField
          placeholder="비밀번호"
          error={
            touched.password && !values.password ? '비밀번호를 입력하세요.' : ''
          }
          touched={touched.password}
          secureTextEntry
          value={values.password}
          onChangeText={(text: string) => handleChangeText('password', text)}
          onBlur={() => handleBlur('password')}
        />
      </View>
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
  },
});

export default LoginScreen;
