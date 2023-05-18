import styled from 'styled-components';
import AuthInput from './AuthInput';
import { useForm, FieldErrors } from 'react-hook-form';
import usePostApi from './usePostApi';
import { useEffect } from 'react';

interface ISignUpForm {
  nickName: string;
  email: string;
  password: string;
  verifyPw: string;
}
export default function SignUpForm() {
  const [signUp, { data, isLoading }] = usePostApi('signup');
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpForm>();
  console.log(watch('password'));
  const onValid = (data: ISignUpForm) => {
    console.log(data);
    signUp(data);
  };
  const onInValid = (errors: FieldErrors) => {
    console.log(errors);
  };
  useEffect(() => {
    data && console.log(data);
  }, [data]);
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onValid, onInValid)}>
        <AuthInput //
          register={register('nickName', {
            required: '닉네임을 입력해주세요',
          })}
          name="User Name"
        />
        <AuthInput //
          register={register('email', {
            required: 'Email을 입력해주세요',
          })}
          name="Email Address"
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
          name="Password"
          type="password"
        />
        {errors.password && <ErrMsg>{`${errors?.password?.message}`} </ErrMsg>}
        <AuthInput
          register={register('verifyPw', {
            required: '비밀번호를 입력해 주세요',
            validate: (value) =>
              value === watch('password') || '비밀번호가 일치하지 않습니다.',
          })}
          type="password"
        />
        {errors.verifyPw && <ErrMsg>{`${errors?.verifyPw?.message}`} </ErrMsg>}
        <Submit type="submit" value={'Sign Up'} />
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid red;
  border-radius: 10px;
  backdrop-filter: blur(5px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;
const Form = styled.form`
  width: 100%;
`;

const Submit = styled.input`
  width: 100%;
  border: none;
  margin-bottom: 20px;
  padding: 20px;
  margin-top: 50px;
  border-radius: 35px;
  /* background-color: #f0ecfc; */
  line-height: 42px;
  padding: 0;
  border: none;
  cursor: pointer;
  display: inline-block;
  box-shadow: 2px 2px 5px #babecc, -5px -5px 10px #ffffff73;
  overflow: hidden;

  &:hover {
    box-shadow: inset 2px 2px 5px #babecc, inset -5px -5px 10px #ffffff73;
  }
`;
const ErrMsg = styled.p`
  position: absolute;
  color: teal;
`;
