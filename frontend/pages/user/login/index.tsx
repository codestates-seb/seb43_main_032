import styled from 'styled-components';
import LoginBox from '@/components/authAction/LoginBox';

//로그인 페이지 입니다. 경로 '/user/login/'
const Wrapper = styled.div`
  position: relative;
  height: 100vh;
`;
const WrapperInset = styled.div`
  position: absolute;
  display: flex;
  top: 20px;
  right: 0px;
  bottom: 20px;
  left: 0px;
  border-radius: 15px;
  justify-content: space-around;
  align-items: center;

  background-color: #515151;
`;
const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 40%;
  height: 80%;
`;
const TextBox = styled.div`
  display: flex;
  width: 80%;
  height: 30%;
  justify-content: flex-start;
  align-items: center;
`;
const ImgBox = styled.div`
  display: flex;
  background-color: teal;
  width: 80%;
  height: 60%;
  justify-content: center;
  align-items: center;
`;
const Login = () => {
  return (
    <Wrapper>
      <WrapperInset>
        <Contents>
          <TextBox>
            <span className="nanum-bold">
              A-Z 개발 시작부터,
              <br />
              <br />
              쉽고 빠른 나만의 팀원까지
            </span>
          </TextBox>
          <ImgBox>img here</ImgBox>
        </Contents>
        <LoginBox />
      </WrapperInset>
    </Wrapper>
  );
};

export default Login;
