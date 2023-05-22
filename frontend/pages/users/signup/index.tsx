//회원가입 페이지 입니다. 경로 '/user/signup/'
import styled from 'styled-components';
import AuthContainer from '@/components/authAction/AuthContainer';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Image from 'next/image';
import loginImg from '../../../public/images/loginImg.svg';

//로그인 페이지 입니다. 경로 '/user/login/'

const SignUp = () => {
  const router = useRouter();
  useEffect(() => {
    window.scrollTo({
      top: 670,
      left: 0,
      behavior: 'smooth',
    });
  }, [router]);
  return (
    <Wrapper>
      <WrapperInset>
        <Contents>
          <TextBox>
            <span className="text">
              반갑습니다. 개발자의 성장을 돕는
              <br />
              사이드퀘스트입니다.
            </span>
          </TextBox>
          <Image src={loginImg} alt="loginImg" />
        </Contents>
        <AuthContainer isLogin={false} />
      </WrapperInset>
    </Wrapper>
  );
};

export default SignUp;

const Wrapper = styled.div`
  position: relative;
  border-radius: 10px;
  width: 100%;
  height: calc(100% - 80px);
  display: flex;
  align-items: center;
`;
const WrapperInset = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  height: 100%;
  border-radius: 15px;
  justify-content: space-around;
  margin-top: 3%;
`;
const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  height: 100%;

  img {
    width: 100%;
    opacity: 0.9;
  }
`;
const TextBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;

  span {
    font-size: 25px;
    color: white;
    font-weight: 700;
    line-height: 1.3;
  }
`;
const ImgBox = styled.div`
  display: flex;
  background-color: #d4d4d4;
  width: 80%;
  height: 400px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
`;
