import useMutation from '@/hooks/useMutation';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  /* inset: 0; */
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
  const [confirm, { loading, data, error }] = useMutation('/api/users/confirm');

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
    // if (data.ok) router.push('/');
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
        <Button>submit</Button>
        {errors?.token?.message}
      </Form>
    </Wrapper>
  );
}
