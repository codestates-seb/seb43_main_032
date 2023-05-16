import React, { useEffect } from 'react';
import styled from 'styled-components';
import AuthInput from './AuthInput';
import { useForm, FieldErrors } from 'react-hook-form';
import useApi from '@/hooks/useApi';
import { useRouter } from 'next/router';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  width: 100%;
`;

const Submit = styled.input`
  width: 100%;
  border: none;
  margin-bottom: 20px;
  padding: 20px;
  margin-top: 60px;
  border-radius: 10px;
`;

const ErrMsg = styled.p`
  position: absolute;
  color: teal;
`;

interface ISignUpForm {
  name: string;
  email: string;
  password: string;
  verifyPw: string;
}

export default function SignUpForm() {
  const [signUp, { isLoading, data }] = useApi('/api/user/signup');
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpForm>();

  const onValid = (data: ISignUpForm) => {
    if (isLoading) return;
    console.log(data);
    signUp(data);
  };

  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  const router = useRouter();

  useEffect(() => {
    console.log('redirection');
    if (data?.ok) router.push('confirm');
  }, [data]);

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onValid, onInvalid)}>
        <AuthInput //
          register={register('name', {
            required: '닉네임을 입력해주세요',
          })}
          name="닉네임"
        />
        <AuthInput //
          register={register('email', {
            required: 'Email을 입력해주세요',
          })}
          name="이메일"
          type="email"
        />
        <AuthInput
          register={register('password', {
            required: '비밀번호를 입력해 주세요',
            minLength: {
              message: '비밀번호는 8자 이상이어야 합니다.',
              value: 8,
            },
          })}
          name="비밀번호"
          type="password"
        />
        {errors.password && <ErrMsg>{`${errors?.password?.message}`} </ErrMsg>}
        <AuthInput
          register={register('verifyPw', {
            required: '비밀번호를 입력해 주세요',
            validate: (value) =>
              value === getValues('password') ||
              '비밀번호가 일치하지 않습니다.',
          })}
          type="password"
        />
        {errors.verifyPw && <ErrMsg>{`${errors?.verifyPw?.message}`} </ErrMsg>}
        <Submit type="submit" value={isLoading ? 'Loading...' : 'Sign Up'} />
      </Form>
    </Wrapper>
  );
}
