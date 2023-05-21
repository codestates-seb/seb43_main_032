import styled from 'styled-components';
import AuthInput from './AuthInput';
import { useForm, FieldErrors } from 'react-hook-form';
import LogoImage from '../../public/images/logo.svg';
import Image from 'next/image';
import usePostApi from '../../hooks/useLogin';

interface ILoginForm {
  email: string;
  password: string;
  saveId: boolean;
  rememberMe: boolean;
}
export default function LoginForm() {
  const [login] = usePostApi('members/login');
  const { register, handleSubmit } = useForm<ILoginForm>();

  const onValid = (data: ILoginForm) => {
    login(data);
  };
  const onInValid = (errors: FieldErrors) => {
    console.log(errors);
  };

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
          name="Email Address"
          // placeholder="Email Address"
          type="email"
        />
        <AuthInput
          register={register('password', {
            required: '비밀번호를 입력해 주세요',
          })}
          name="Password"
          type="password"
        />
        <OptionWrapper>
          {/* <AuthCheckBox register={register('saveId')} name="아이디 저장하기" />
          <AuthCheckBox register={register('rememberMe')} name="자동 로그인" /> */}
        </OptionWrapper>
        <Submit type="submit" value={'Log In'} />
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  backdrop-filter: blur(30px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const LogoBox = styled.div`
  width: 200px;
  margin-top: 30px;
  margin-bottom: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  position: relative;
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
  border-radius: 35px;
  line-height: 42px;
  box-shadow: 2px 2px 5px #babecc, -5px -5px 10px #ffffff73;
  padding: 0;
  border: none;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;

  &:hover {
    box-shadow: inset 2px 2px 5px #babecc, inset -5px -5px 10px #ffffff73;
  }
`;
