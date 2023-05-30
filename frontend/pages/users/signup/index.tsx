import styled from 'styled-components';
import AuthContainer from '@/components/authAction/AuthContainer';
import Image from 'next/image';
import loginImg from '../../../public/images/loginImg.svg';
import Head from 'next/head';

const SignUp = () => {
  return (
    <>
      <Head>
        <title>{`SIDE QUEST - 회원가입`}</title>
      </Head>
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
    </>
  );
};

export default SignUp;

const Wrapper = styled.div`
  position: relative;
  border-radius: 10px;
  width: 100%;
  height: calc(100vh - 60px);
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
  @media (max-width: 960px) {
    flex-direction: column;
    gap: 40px;
  }
`;
const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 100%;

  @media (max-width: 960px) {
    display: none;
    width: 100%;
    justify-content: center;
    > div {
      flex-direction: column;
      align-items: center;
    }
  }

  img {
    width: 100%;
    opacity: 0.9;

    @media (max-width: 960px) {
      display: none;
    }
  }

  a {
    cursor: pointer;
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
