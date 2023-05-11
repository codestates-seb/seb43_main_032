import { AiFillFacebook, AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';
import styled from 'styled-components';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { useState } from 'react';
import { useRouter } from 'next/router';

const LoginWrapper = styled.div`
  display: flex;
  width: 40%;
  min-width: 400px;
  padding: 20px;
  background-color: #d9d9d9;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
`;
const LoginContainer = styled.div`
  width: 80%;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const P = styled.p.attrs({
  className: 'nanum-regular',
})`
  margin-bottom: 5px;
  flex-shrink: 0;
  cursor: pointer;
`;

const AuthActionBox = styled.div`
  display: flex;
  margin-bottom: ${({ isLogin }: { isLogin: Boolean }) =>
    isLogin ? '100px' : '50px'};
`;

const OAuthBtnBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 10px;
`;
const OAuthButton = styled.button`
  border: none;
  width: 75px;
  height: 75px;
  border-radius: 5px;
`;

export default function AuthContainer({ isLogin }: { isLogin: Boolean }) {
  const router = useRouter();
  const onActionChange = () => {
    isLogin ? router.push('/users/signup') : router.push('/users/login');
  };
  return (
    <LoginWrapper>
      <LoginContainer>
        {isLogin ? <LoginForm /> : <SignUpForm />}
        <AuthActionBox isLogin={isLogin}>
          {isLogin ? (
            <>
              <P>&nbsp; 비번찾기&nbsp; |</P>
              <P onClick={onActionChange}>&nbsp;&nbsp;회원가입</P>
            </>
          ) : (
            <P onClick={onActionChange}>로그인</P>
          )}
        </AuthActionBox>
        {isLogin ? <P>다른 계정으로 로그인</P> : <P>다른 계정으로 회원가입</P>}
        <OAuthBtnBox>
          <OAuthButton>
            <FcGoogle size={50} />
          </OAuthButton>
          <OAuthButton>
            <AiFillFacebook size={50} color="#3C8AFF" />
          </OAuthButton>
          <OAuthButton style={{ backgroundColor: '#F2D800' }}>
            <RiKakaoTalkFill size={50} />
          </OAuthButton>
          <OAuthButton>
            <AiFillGithub size={50} />
          </OAuthButton>
        </OAuthBtnBox>
      </LoginContainer>
    </LoginWrapper>
  );
}
