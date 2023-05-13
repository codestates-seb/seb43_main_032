import styled from 'styled-components';
import AuthInput from './AuthInput';
import { useForm, FieldErrors } from 'react-hook-form';
import AuthCheckBox from './AuthCheckBox';
import LogoImage from '../../public/images/logo.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useApi from '@/hooks/useApi';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '@/recoil/atom';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LogoBox = styled.div`
  width: 200px;
  margin-top: 50px;
  margin-bottom: 60px;
`;
const Form = styled.form`
  width: 100%;
`;
const OptionWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 40px;
  margin-bottom: 20px;
`;
const Submit = styled.input`
  width: 100%;
  border: none;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
`;
export interface ILoginForm {
  email: string;
  password: string;
  saveId: boolean;
  rememberMe: boolean;
}
export default function LoginForm() {
  const { register, watch, handleSubmit } = useForm<ILoginForm>();
  console.log(watch());
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [login, { data }] = useApi('/api/user/login');
  const onValid = (data: ILoginForm) => {
    console.log('valid');
    login(data);
  };
  const onInValid = (errors: FieldErrors) => {
    console.log(errors);
  };

  const router = useRouter();
  useEffect(() => {
    if (data?.ok) {
      //로그인 성공 모달 or 페이지 필요. (opstional)
      //일단 홈으로 이동.
      setIsLoggedIn(true);
      router.push('/');
    }
  }, [data]);
  return (
    <Wrapper>
      <LogoBox>
        <Image alt="logo" src={LogoImage} />
      </LogoBox>
      <Form onSubmit={handleSubmit(onValid, onInValid)}>
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
          })}
          name="비밀번호"
          type="password"
        />
        <OptionWrapper>
          <AuthCheckBox register={register('saveId')} name="아이디 저장하기" />
          <AuthCheckBox register={register('rememberMe')} name="자동 로그인" />
        </OptionWrapper>
        <Submit type="submit" value={'Log In'} />
      </Form>
    </Wrapper>
  );
}
