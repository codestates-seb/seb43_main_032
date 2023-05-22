import {
  AiFillFacebook,
  AiFillGithub,
  AiFillGoogleCircle,
} from 'react-icons/ai';
import { RiKakaoTalkFill } from 'react-icons/ri';
import styled from 'styled-components';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { useRouter } from 'next/router';

type AuthBtn = {
  provider: string;
};

export default function AuthContainer({ isLogin }: { isLogin: Boolean }) {
  const router = useRouter();
  const onActionChange = () => {
    isLogin ? router.push('/users/signup') : router.push('/users/login');
  };

  return (
    <>
      <LoginWrapper>
        <LoginContainer>
          {isLogin ? <LoginForm /> : <SignUpForm />}
          <AuthActionBox>
            {isLogin ? (
              <div className="top">
                <P>Forgot Password</P>
                <P onClick={onActionChange}>Sign Up</P>
              </div>
            ) : (
              <P onClick={onActionChange}>Log In</P>
            )}
            {isLogin ? (
              <div className="bottom">
                <span>Or sign in with:</span>
              </div>
            ) : (
              <div className="bottom">
                <span>Or sign in with:</span>
              </div>
            )}
          </AuthActionBox>
          <OAuthBtnBox>
            <OAuthButton provider="google">
              <AiFillGoogleCircle size={24} />
            </OAuthButton>
            <OAuthButton provider="facebook">
              <AiFillFacebook size={24} />
            </OAuthButton>
            <OAuthButton provider="kakao">
              <RiKakaoTalkFill size={24} />
            </OAuthButton>
            <OAuthButton provider="github">
              <AiFillGithub size={24} />
            </OAuthButton>
          </OAuthBtnBox>
        </LoginContainer>
      </LoginWrapper>
    </>
  );
}

const LoginWrapper = styled.div`
  display: flex;
  width: 30%;
  min-width: 400px;
  padding: 20px;
  background: linear-gradient(
    130deg,
    rgba(255, 255, 255, 0.5) 3%,
    rgba(255, 255, 255, 0.1)
  );
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.5);
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
  color: #d5d5d5;
  font-size: 13px;

  :hover {
    color: white;
  }
`;

const AuthActionBox = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 10px;
  align-items: center;

  .top {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }

  .bottom {
    margin: 20px 0;
    display: flex;
    justify-content: center;
    color: #d5d5d5;
    font-size: 12px;
  }
`;

const OAuthBtnBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  width: 100%;
  justify-content: space-between;
  margin: 10px 0;
`;
const OAuthButton = styled.button<AuthBtn>`
  border: none;
  border-radius: 5px;
  background-color: ${(props) => {
    if (props.provider === 'google') return '#acacac';
    if (props.provider === 'facebook') return '#1771E6';
    if (props.provider === 'kakao') return '#ECD500';
    if (props.provider === 'github') return 'black';
    return 'transparent';
  }};
  padding: 5px 0;
  transition: background-color 0.3s, color 0.3s;
  color: #ececec;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 1);
    color: ${(props) => {
      if (props.provider === 'google') return '#acacac';
      if (props.provider === 'facebook') return '#1771E6';
      if (props.provider === 'kakao') return '#ECD500';
      if (props.provider === 'github') return 'black';
      return 'inherit';
    }};
  }
`;
