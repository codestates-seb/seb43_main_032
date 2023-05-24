import React from 'react';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import logo from '../public/images/symbol.svg';
import StarBg from '@/components/StarBg';

const aboutPage = () => {
  return (
    <Container>
      <Background className="bg" />
      <Background className="bg bg2" />
      <StarBg />
      <Background className="bg bg3" />
      <div className="box">
        <div className="text-box">
          <div className="title">SIDE QUEST</div>
          <div className="sub-title">사이드 퀘스트</div>
          <div className="text">
            개발자와 디자이너 등 다양한 색을 가진
            <br />각 분야의 전문가들이 모여
            <br />더 멋진 앞날을 꿈꾸는 곳입니다.
          </div>
          <div className="text">
            단순한 호기심이나 취업을 위한 포트폴리오 제작부터,
            <br /> 각자의 목표를 이루기 위한 도전과정을 함께 완성해나가는
            곳이며,
            <br />
            개인의 역량을 존중하고 다양한 프로젝트와 경험을 통해
            <br />
            함께 성장할 수 있는 환경을 제공하고자 합니다.
          </div>
          <div className="text">
            서로를 존중하며 소통하고, 협업하는 문화를 바탕으로
            <br />
            아이디어를 발전시키며 끊임없이 변화하고 발전하는
            <br />
            여러분의 앞날을 응원하겠습니다.
          </div>
        </div>
        <div className="symbol-box">
          <Image src={logo} alt="logo" />
        </div>
      </div>
    </Container>
  );
};

export default aboutPage;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;

  .box {
    padding: 60px calc((100% - 1280px) / 2);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    .text-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 20px;
      color: white;
      width: 50%;
      height: 100%;
      font-size: 23px;
      word-wrap: break-word;
      line-height: 1.3;
      font-weight: 100;
      padding-left: 10%;
      @media (max-width: 960px) {
        font-size: 18px;
      }
      @media (max-width: 768px) {
        font-size: 15px;
        width: 100%;
        padding: 0 10px;
      }

      .title {
        font-size: 70px;
        font-weight: bold;

        @media (max-width: 960px) {
          font-size: 50px;
        }
        @media (max-width: 768px) {
          font-size: 30px;
        }
      }

      .sub-title {
        font-weight: 500;
        margin-top: -10px;
        margin-bottom: 20px;
      }
    }

    .symbol-box {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      @media (max-width: 768px) {
        display: none;
      }
      img {
        width: 70%;
        height: auto;
      }
    }
  }
`;

const slideAnimation = keyframes`
  0% {
    transform: translateX(-25%);
  }
  100% {
    transform: translateX(25%);
  }
`;

const Background = styled.div`
  animation: ${slideAnimation} 3s ease-in-out infinite alternate;
  background-image: linear-gradient(-60deg, #0e0039 50%, #000000 50%);
  bottom: 0;
  left: -50%;
  opacity: 0.7;
  position: fixed;
  right: -50%;
  top: 0;
  z-index: -1;

  &.bg2 {
    animation-direction: alternate-reverse;
    animation-duration: 4s;
  }

  &.bg3 {
    animation-duration: 5s;
  }
`;
