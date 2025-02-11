import {LoginFormValues} from '@/screens/auth/LoginScreen';

const validateUser = (values: LoginFormValues) => {
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
};

const validateLogin = (values: LoginFormValues) => {
  return validateUser(values);
};

const validateSignup = (
  values: LoginFormValues & {passwordConfirm: string},
) => {
  const errors = validateUser(values);
  const signupErrors = {...errors, passwordConfirm: ''};

  if (values.password !== values.passwordConfirm) {
    signupErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
  }

  return signupErrors;
};

const validateAddPost = (values: {title: string}) => {
  const errors = {
    title: '',
    description: '',
  };

  if (values.title.trim() === '') {
    errors.title = '제목은 1~30자 이내로 입력해주세요.';
  }

  return errors;
};

export {validateLogin, validateSignup, validateAddPost};
