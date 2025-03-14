import {useEffect, useState} from 'react';

export const useForm = <T>(
  initialValue: T,
  validate: (values: T) => Record<keyof T, string>,
) => {
  const [values, setValues] = useState<T>(initialValue);
  const [touched, setTouched] = useState<Record<keyof T, boolean>>(
    {} as Record<keyof T, boolean>,
  );
  const [errors, setErrors] = useState<Record<keyof T, string>>(
    {} as Record<keyof T, string>,
  );

  const handleChangeText = (name: keyof T, text: string) => {
    setValues(prevValues => ({
      ...prevValues,
      [name]: text,
    }));
  };

  const handleBlur = (name: keyof T) => {
    setTouched(prevTouched => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  const getTextInputProps = (name: keyof T) => {
    const value = values[name];
    const onChangeText = (text: string) => handleChangeText(name, text);
    const onBlur = () => handleBlur(name);
    return {value, onChangeText, onBlur};
  };

  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
  }, [validate, values]);

  return {values, errors, touched, getTextInputProps};
};
