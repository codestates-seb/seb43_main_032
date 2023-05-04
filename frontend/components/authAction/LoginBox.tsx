import { AiFillFacebook, AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';
import styled from 'styled-components';

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
  height: 100%;
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
`;
const LogoBox = styled.div`
  width: 200px;
  height: 60px;
  background-color: wheat;
  margin-top: 50px;
  margin-bottom: 80px;
`;
const PBox = styled.div`
  width: 100%;
  margin: 5px;
`;
const P = styled.p.attrs({
  className: 'nanum-regular',
})`
  margin-bottom: 5px;
  flex-shrink: 0;
`;
const Input = styled.input`
  width: 100%;
  border: none;
  height: 40px;
  margin-bottom: 20px;
  border-radius: 10px;
  padding: 10px;
`;
const OptionWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-bottom: 40px;
`;
const OptionBox = styled.div`
  display: flex;
  gap: 10px;
`;
const CheckBox = styled.input`
  accent-color: black;
  height: 16px;
`;

const AuthActionBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 100px;
`;
const VerticalBar = styled.div`
  border-right: 1px solid black;
  height: 14px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 3px;
`;
const OAuthBtnBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 20px;
`;
const OAuthButton = styled.button`
  border: none;
  /* margin: 10px; */
  width: 75px;
  height: 75px;
  border-radius: 5px;
`;
export default function LoginBox() {
  return (
    <LoginWrapper>
      <LoginContainer>
        <LogoBox />
        <PBox>
          <P>이메일</P>
        </PBox>
        <Input />
        <PBox>
          <P>비밀번호</P>
        </PBox>
        <Input />
        <OptionWrapper>
          <OptionBox>
            <CheckBox type="checkbox" name="id" />
            <P>아이디 저장하기</P>
          </OptionBox>
          <OptionBox>
            <CheckBox type="checkbox" name="login" />
            <P>자동 로그인</P>
          </OptionBox>
        </OptionWrapper>
        <AuthActionBox>
          <P>아이디 찾기</P>
          <VerticalBar />
          <P>비밀번호 찾기</P>
          <VerticalBar />
          <P>회원가입</P>
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
