import { ChangeEvent, FormEvent, useState } from 'react';

type Validation = {
  required?: {
    value: boolean;
    message: string;
  };
  pattern?: {
    value: RegExp;
    message: string;
  };
  custom?: {
    isValid: (value: any) => boolean;
    message: string;
  };
};

type ErrorRecord<T> = Partial<Record<keyof T, string>>;
type Validations<T extends {}> = Partial<Record<keyof T, Validation>>;

export const useForm = <T extends Record<keyof T, any> = {}>(options?: {
  validations?: Validations<T>;
  initialValues?: Partial<T>;
  onSubmit?: () => void;
}) => {
  const [data, setData] = useState<T>((options?.initialValues || {}) as T);
  const [errors, setErrors] = useState<ErrorRecord<T>>({});

  const checkValidation = (key: keyof T, value: unknown) => {
    let newErrors = '';
    const validation = options?.validations?.[key];

    if (validation?.required?.value && !value) {
      newErrors = validation?.required?.message;
    }

    const pattern = validation?.pattern;
    if (pattern?.value && !RegExp(pattern.value).test(String(value))) {
      newErrors = pattern.message;
    }

    const custom = validation?.custom;
    if (custom?.isValid && !custom.isValid(value)) {
      newErrors = custom.message;
    }

    return newErrors;
  };

  const handleChange =
    <S extends unknown>(key: keyof T, sanitizeFn?: (value: string) => S) =>
    (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | string | number
    ) => {
      let value;

      if (typeof e === 'object') {
        value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value;
      } else {
        value = e;
      }

      const error = checkValidation(key, value);
      if (error) setErrors((preV) => ({ ...preV, [key]: error }));
      else if (!error && errors[key]) {
        const { [key]: delV, ...keys } = errors;
        setErrors(keys as ErrorRecord<T>);
      }

      setData({
        ...data,
        [key]: value,
      });
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validations = options?.validations;

    if (validations) {
      let newErrors: ErrorRecord<T> = {};

      for (const key in validations) {
        const value = data[key];
        const error = checkValidation(key, value);

        if (error) newErrors = { ...newErrors, [key]: error };
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
    }

    setErrors({});
    if (options?.onSubmit) {
      options.onSubmit();
    }
  };

  return {
    data,
    handleChange,
    handleSubmit,
    errors,
  };
};

export default useForm;
