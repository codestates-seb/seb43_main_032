import { useState, useCallback, ChangeEvent } from 'react';

type UseInputsType<T> = [
  form: T,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  reset: () => void
];

export const useInput = <T extends { [key: string]: string }>(
  initialForm: T
): UseInputsType<T> => {
  const [form, setForm] = useState<T>(initialForm);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  }, []);

  const reset = useCallback(() => setForm(initialForm), [initialForm]);
  return [form, onChange, reset];
};
