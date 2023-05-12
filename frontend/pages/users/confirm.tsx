import useMutation from '@/hooks/useApi';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: gray;
`;
const Form = styled.form`
  display: flex;
  padding: 100px;
  background-color: teal;
`;
const Input = styled.input``;
const Button = styled.button`
  border: none;
  padding: 20px;
`;
interface IForm {
  token: number;
}
export default function confirm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const [confirm, { isLoading, data, error }] =
    useMutation('/api/users/confirm');

  const onValid = (data: IForm) => {
    console.log(data);
    console.log(process.env.EMAIL_API);
    confirm(data);
  };
  const onInValid = (e: FieldErrors) => {
    console.log(e);
  };
  const router = useRouter();
  useEffect(() => {
    if (data?.ok) {
      //회원가입이 성공적으로 이루어 졌음을 알릴 page 혹은 modal 필요
      //일단 login 페이지 으로 이동시킴
      router.push('/users/login');
    }
  }, [data]);

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onValid, onInValid)}>
        <Input
          placeholder="token.."
          {...register('token', {
            required: '인증번호를 넣어주세요',
          })}
          type="number"
        />
        <Button>{isLoading ? 'Loading...' : 'Submit'}</Button>
        {errors?.token?.message}
      </Form>
    </Wrapper>
  );
}
