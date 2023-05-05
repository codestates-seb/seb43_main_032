import { AiFillFacebook, AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';
import styled from 'styled-components';
import AuthInput from './AuthInput';
import LoginForm from './LoginForm';

const LoginWrapper = styled.div`
  display: flex;
  width: 40%;
  height: 80%;
  background-color: #d9d9d9;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
`;
const LoginContainer = styled.div`
  width: 75%;
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
`;

const AuthActionBox = styled.div`
  margin-bottom: 100px;
`;

const OAuthBtnBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 20px;
`;
const OAuthButton = styled.button`
  border: none;
  width: 75px;
  height: 75px;
  border-radius: 5px;
`;
export default function AuthContainer() {
  return (
    <LoginWrapper>
      <LoginContainer>
        <LoginForm />
        <AuthActionBox>
          <P>아이디 찾기 &nbsp; |&nbsp; 비밀번호 찾기&nbsp; |&nbsp; 회원가입</P>
        </AuthActionBox>
        <P>다른 계정으로 로그인</P>
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
