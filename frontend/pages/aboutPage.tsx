import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const aboutPage = () => {
  return (
    <Section>
      <Container>
        <Left>
          <Title>"프로젝트 매치!"</Title>
          <WhatWeDo>
            <Line src="./images/line.png" />
            <Subtitle>Side Quest</Subtitle>
          </WhatWeDo>
          <Desc>
            프로젝트를 시작하려는데 필요한 전문 기술을 갖춘 팀원을 찾기가
            어렵나요?
            <br />
            아니면 열정만 가득하고 경험을 쌓기를 원하나 적합한 프로젝트를 찾지
            못하고 계시나요?
            <br />
            이제는 걱정하지 마세요.
            <br />
            "Side Quest"에서 당신의 문제를 해결해드릴 것입니다.
          </Desc>
          <Button>
            <Link href="/project">Learn More</Link>
          </Button>
        </Left>
        <Right>
          {/* 3d model */}
          <Img src="./images/moon.jpg" />
        </Right>
      </Container>
    </Section>
  );
};

export default aboutPage;

const Section = styled.div`
  width: 120%;
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  color: white;
  align-items: center;
  justify-content: space-between;
  background-image: url('./images/bg.jpeg');

  @media only screen and (max-width: 768px) {
    height: 200vh;
  }
`;

const Container = styled.div`
  height: 100%;
  scroll-snap-align: center;
  width: 1400px;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Left = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;

  @media only screen and (max-width: 768px) {
    flex: 1;
    align-items: center;
  }
`;

const Title = styled.h1`
  font-size: 74px;

  @media only screen and (max-width: 768px) {
    text-align: center;
  }
`;

const WhatWeDo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Line = styled.img`
  height: 5px;
`;

const Subtitle = styled.h2`
  color: #da4ea2;
  font-size: 19px;
`;

const Desc = styled.p`
  font-size: 19px;
  color: lightgray;
  line-height: 40px;
  @media only screen and (max-width: 768px) {
    padding: 20px;
    text-align: center;
  }
`;

const Button = styled.button`
  background-color: #842dda;
  color: white;
  font-weight: 500;
  width: 100px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  background-color: rgba(156, 161, 160, 0.3);
  animation: glow 1s infinite;
  transition: 0.5s;
  Link {
    display: block;
    width: 100%;
    height: 100%;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 700;
    padding-top: 15%;
    padding-right: 2.5%;
    margin-right: 0px;
    font-size: 1.2rem;
    transition: 0.3s;
    opacity: 0;
  }
  Link:hover {
    transition: 0.3s;
    opacity: 1;
    font-weight: 700;
  }

  button:hover {
    transform: translateX(-20px) rotate(30deg);
    border-radius: 5px;
    background-color: #c3bacc;
    transition: 0.5s;
    border: 2px solid rgb(93, 52, 168);
  }

  @keyframes glow {
    0% {
      box-shadow: 5px 5px 20px rgb(93, 52, 168), -5px -5px 20px rgb(93, 52, 168);
    }

    50% {
      box-shadow: 5px 5px 20px rgb(81, 224, 210),
        -5px -5px 20px rgb(81, 224, 210);
    }
    100% {
      box-shadow: 5px 5px 20px rgb(93, 52, 168), -5px -5px 20px rgb(93, 52, 168);
    }
  }
`;

const Right = styled.div`
  flex: 3;
  position: relative;
  @media only screen and (max-width: 768px) {
    flex: 1;
    width: 100%;
  }
`;

const Img = styled.img`
  width: 800px;
  height: 600px;
  object-fit: contain;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  animation: animate 2s infinite ease alternate;

  @media only screen and (max-width: 768px) {
    width: 300px;
    height: 300px;
  }

  @keyframes animate {
    to {
      transform: translateY(20px);
    }
  }
`;
