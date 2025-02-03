export interface FormValues {
  email: string;
  password: string;
}

function validateLogin(values: FormValues) {
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

export {validateLogin};
