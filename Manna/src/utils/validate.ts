import {LoginFormValues} from '@/screens/auth/LoginScreen';

function validateUser(values: LoginFormValues) {
  const errors = {
    email: '',
    password: '',
  };

  // 올바른 이메일 형식 검사
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }

  // 비밀번호 길이 검사 (8~20자)
  if (
    values.password.length &&
    (values.password.length < 8 || values.password.length > 20)
  ) {
    errors.password = '비밀번호는 8~20자 사이로 입력해주세요.';
  }

  return errors;
}

function validateLogin(values: LoginFormValues) {
  return validateUser(values);
}

function validateSignup(values: LoginFormValues & {passwordConfirm: string}) {
  const errors = validateUser(values);
  const signupErrors = {...errors, passwordConfirm: ''};

  if (values.password !== values.passwordConfirm) {
    signupErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
  }

  return signupErrors;
}

export {validateLogin, validateSignup};
