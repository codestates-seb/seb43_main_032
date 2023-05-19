import { AiFillFacebook, AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';
import styled from 'styled-components';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { useState } from 'react';
import { useRouter } from 'next/router';

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
              <P>&nbsp; Forgot Password&nbsp; |</P>
              <P onClick={onActionChange}>&nbsp;&nbsp;Sign Up</P>
            </>
          ) : (
            <P onClick={onActionChange}>Log In</P>
          )}
        </AuthActionBox>
        {isLogin ? <P>Or sign in with:</P> : <P>Or sign in with:</P>}
        <OAuthBtnBox>
          <OAuthButton>
            <FcGoogle size={40} />
          </OAuthButton>
          <OAuthButton>
            <AiFillFacebook size={40} color="#3C8AFF" />
          </OAuthButton>
          <OAuthButton style={{ backgroundColor: '#F2D800' }}>
            <RiKakaoTalkFill size={40} />
          </OAuthButton>
          <OAuthButton>
            <AiFillGithub size={40} />
          </OAuthButton>
        </OAuthBtnBox>
      </LoginContainer>
    </LoginWrapper>
  );
}

const LoginWrapper = styled.div`
  display: flex;
  width: 40%;
  min-width: 400px;
  padding: 20px;
  /* background-color: #fff; */
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
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
  margin-top: 10px;
  margin-bottom: ${({ isLogin }: { isLogin: Boolean }) =>
    isLogin ? '60px' : '40px'};
`;

const OAuthBtnBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 10px;
`;
const OAuthButton = styled.button`
  border: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;
