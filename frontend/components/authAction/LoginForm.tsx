import styled from 'styled-components';
import AuthInput from './AuthInput';
import { useForm } from 'react-hook-form';
import AuthCheckBox from './AuthCheckbox';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LogoBox = styled.div`
  width: 200px;
  height: 60px;
  background-color: wheat;
  margin-top: 50px;
  margin-bottom: 80px;
`;

const OptionWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 40px;
  margin-bottom: 40px;
`;

export default function LoginForm() {
  const { register, watch, handleSubmit } = useForm();
  console.log(watch());
  return (
    <Wrapper>
      <LogoBox />
      <AuthInput //
        register={register('Email')}
        name="이메일"
        type="email"
      />
      <AuthInput
        register={register('password')}
        name="비밀번호"
        type="password"
      />
      <OptionWrapper>
        <AuthCheckBox name="아이디 저장하기" />
        <AuthCheckBox name="자동 로그인" />
      </OptionWrapper>
    </Wrapper>
  );
}
