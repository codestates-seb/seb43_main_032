import usePostApi from '@/hooks/usePostApi';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import styled from 'styled-components';

interface IForm {
  token: number;
}
export default function confirm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  //회원 가입 인증 endpoint 변경 필요
  const [confirm, { isLoading, data, error }] = usePostApi('/members/confirm');

  const onValid = (data: IForm) => {
    console.log(data);
    console.log(process.env.EMAIL_API);
    confirm(data);
  };
  const onInValid = (e: FieldErrors) => {
    console.log(e);
  };
  useEffect(() => {
    if (data?.ok) {
      //회원가입이 성공적으로 이루어 졌음을 알릴 page 혹은 modal 필요
      //일단 login 페이지 으로 이동시킴
      router.push('/users/login');
    }
  }, [data]);

  if (error) return router.push('/404');
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onValid, onInValid)}>
        <InputContainer>
          <Input
            placeholder="token.."
            {...register('token', {
              required: '인증번호를 넣어주세요',
            })}
            type="number"
          />
          <Button>{isLoading ? 'Loading...' : '인증'}</Button>
          {errors?.token?.message}
        </InputContainer>
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 100px;
  background-color: teal;
`;
const InputContainer = styled.div`
  height: 50px;
`;
const Input = styled.input`
  height: 100%;
`;
const Button = styled.button`
  border: none;
  height: 100%;
  padding: 10px;
`;
