import styled from 'styled-components';
import AuthInput from './AuthInput';
import { useForm, FieldErrors } from 'react-hook-form';
import AuthCheckBox from './AuthCheckBox';
import LogoImage from '../../public/images/logoWhite.svg';
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
          name="Email"
          placeholder="Enter your email address"
          type="email"
        />
        <AuthInput
          register={register('password', {
            required: '비밀번호를 입력해 주세요',
          })}
          name="Password"
          placeholder="Enter your password"
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
  border-radius: 10px;
  line-height: 42px;
  box-shadow: 2px 2px 5px #767676;
  padding: 0;
  border: none;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  font-size: 15px;
  color: #616161;
  text-shadow: #e0e0e0 1px 1px 0;
  font-weight: 700;
  font-family: 'Pretendard';
  transition: all 1s;

  &:hover {
    box-shadow: inset 2px 2px 5px #babecc, inset -5px -5px 10px #ffffff73;
    color: #8217f3;
  }
`;
