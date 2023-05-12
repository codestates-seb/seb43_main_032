import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import computer from '../public/images/bannerComputer.svg';
import dictionary from '../public/images/bannerDic.svg';
import message from '../public/images/bannerMsg.svg';
import right from '../public/images/circleLeft.svg';
import left from '../public/images/circleRight.svg';
import square from '../public/images/squareBg.svg';

export default function Slider({ isScrolled }: { isScrolled: boolean }) {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1280
  );
  const [showImages, setShowImages] = useState(true);
  const imgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () =>
      setWidth(typeof window !== 'undefined' ? window.innerWidth : 1280);
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
    }

    const timer = setTimeout(() => {
      setShowImages(false);
    }, 3000);

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!showImages && imgContainerRef.current) {
      imgContainerRef.current.classList.add('fade-out');
    }
  }, [showImages]);

  const imgWidth = width < 1280 ? true : false;

  return (
    <Container isScrolled={isScrolled}>
      <ImgContainer
        imgWidth={imgWidth}
        ref={imgContainerRef}
        showImg={showImages}
      >
        <div className="circleXL"></div>
        <Image src={right} alt="img5" className="right"></Image>
        <Image src={square} alt="img6" className="square"></Image>
        <Image src={left} alt="img4" className="left"></Image>
        <Image src={computer} alt="img1" className="computer"></Image>
        <Image src={message} alt="img2" className="message"></Image>
        <Image src={dictionary} alt="img3" className="dictionary"></Image>

        <div className="rightBox">
          <div className="textBox">
            <span>기획부터 개발까지</span>
            <span>사이드퀘스트</span>
          </div>
          <button className="noto-regular-13">
            <span className="text">프로젝트 함께하기</span>
          </button>
        </div>
      </ImgContainer>
      <ImgContainerTwo
        imgWidth={imgWidth}
        ref={imgContainerRef}
        showImg={showImages}
      >
        <div className="circleXL"></div>
        <Image src={right} alt="img5" className="right"></Image>
        <Image src={square} alt="img6" className="square"></Image>
        <Image src={left} alt="img4" className="left"></Image>
        <Image src={computer} alt="img1" className="computer"></Image>
        <Image src={message} alt="img2" className="message"></Image>
        <Image src={dictionary} alt="img3" className="dictionary"></Image>

        <div className="rightBox">
          <div className="textBox">
            <span>기획부터 개발까지</span>
            <span>사이드퀘스트</span>
          </div>
          <button className="noto-regular-13">
            <span className="text">프로젝트 함께하기</span>
          </button>
        </div>
      </ImgContainerTwo>
      <ImgContainerThree
        imgWidth={imgWidth}
        ref={imgContainerRef}
        showImg={showImages}
      >
        <div className="circleXL"></div>
        <Image src={right} alt="img5" className="right"></Image>
        <Image src={square} alt="img6" className="square"></Image>
        <Image src={left} alt="img4" className="left"></Image>
        <Image src={computer} alt="img1" className="computer"></Image>
        <Image src={message} alt="img2" className="message"></Image>
        <Image src={dictionary} alt="img3" className="dictionary"></Image>

        <div className="rightBox">
          <div className="textBox">
            <span>기획부터 개발까지</span>
            <span>사이드퀘스트</span>
          </div>
          <button className="noto-regular-13">
            <span className="text">프로젝트 함께하기</span>
          </button>
        </div>
      </ImgContainerThree>
    </Container>
  );
}

type Props = {
  imgWidth?: boolean;
  isScrolled?: boolean;
  showImg?: boolean;
};

const fadeOutAnimation = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(30px);
  }
`;

const Container = styled.div<Props>`
  position: relative;
  width: 100%;
  height: 660px;
  background: ${(props) =>
    props.isScrolled
      ? 'linear-gradient(#8b67ff, #dcbbff, #f7f0ff)'
      : 'linear-gradient(30deg, #f7f0ff, #dcbbff, #8b67ff)'};
  transition: background 0.5s ease;
  will-change: background;
`;

const ImgContainer = styled.div<Props>`
  position: relative;
  width: ${(props) => (props.imgWidth ? '100%' : '1280px')};
  height: 100%;
  margin: 0 auto;
  opacity: ${(props) => (props.showImg ? 1 : 0)};
  transform: translateY(${(props) => (props.showImg ? 0 : '30px')});
  transition: opacity 0.5s ease, transform 0.5s ease;

  &.fade-out {
    animation: ${fadeOutAnimation} 0.5s forwards;
  }

  > .circleXL {
    position: absolute;
    width: 10%;
    top: 10%;
    left: 30%;
    opacity: 0.5;
    border-radius: 50%;
    background-color: transparent;
    box-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #fff, 0 0 40px #fff,
      0 0 30px #fff, 0 0 40px #fff, 0 0 50px #fff;
  }

  > .computer {
    position: absolute;
    top: 40%;
    left: 13%;
    animation: computer-move 2s ease-in-out infinite alternate;
  }

  > .message {
    position: absolute;
    top: 43%;
    left: 45%;
    animation: message-dictionary-move 2s ease-in-out infinite alternate;
  }

  > .dictionary {
    position: absolute;
    top: 68%;
    left: 5%;
    animation: message-dictionary-move 2s ease-in-out infinite alternate;
  }

  > .left {
    position: absolute;
    top: 20%;
    right: 0%;
  }

  > .right {
    position: absolute;
    top: 30%;
    left: 3%;
  }

  > .square {
    position: absolute;
    top: 20%;
    left: 27%;
  }

  > .rightBox {
    position: absolute;
    right: 5%;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: end;
    flex-direction: column;
    width: 50%;
    height: 100%;

    > .textBox {
      display: flex;
      flex-direction: column;
      align-items: end;
      position: absolute;

      > span {
        display: inline-block;
        font-family: 'Noto Sans', sans-serif;
        font-weight: 500;
        color: white;
        font-size: 45px;
        padding: 10px 0;
      }
      & span:nth-of-type(2) {
        font-weight: bold;
        color: hsl(261deg 80% 48%);
        text-shadow: -1px -1px 1px rgba(255, 255, 255, 0.1),
          1px 1px 1px rgba(0, 0, 0, 0.5);
      }

      &:first-child {
        margin-top: 30px;
      }
    }

    > button {
      position: absolute;
      top: 70%;
      font-size: 21px;
      padding: 0.7em 1.7em;
      border-radius: 0.5em;
      transition: all 0.5s ease;
      border: none;
      cursor: pointer;
      letter-spacing: 3px;
      background-color: hsl(261deg 80% 48%);
      color: hsl(0, 0%, 100%);
      box-shadow: rgb(93 24 220) 0px 7px 15px 0px;

      > .text {
        color: #f2f2f2;
        font-weight: 600;
      }
    }
  }

  button:active {
    letter-spacing: 3px;
    background: linear-gradient(-45deg, #c28aff, #9f4afa, #6333ff);
    color: hsl(0, 0%, 100%);
    box-shadow: rgb(93 24 220) 0px 0px 0px 0px;
    transform: translateY(1px);
    transition: 50ms;
  }

  @keyframes computer-move {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-30px);
    }
  }

  @keyframes message-dictionary-move {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(60px);
    }
  }

  @-webkit-keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @-moz-keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @-o-keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const ImgContainerTwo = styled.div<Props>`
  position: relative;
  width: ${(props) => (props.imgWidth ? '100%' : '1280px')};
  height: 100%;
  margin: 0 auto;
  opacity: ${(props) => (props.showImg ? 1 : 0)};
  transform: translateY(${(props) => (props.showImg ? 0 : '30px')});
  transition: opacity 0.5s ease, transform 0.5s ease;

  &.fade-out {
    animation: ${fadeOutAnimation} 0.5s forwards;
  }

  > .circleXL {
    position: absolute;
    width: 10%;
    top: 10%;
    left: 30%;
    opacity: 0.5;
    border-radius: 50%;
    background-color: transparent;
    box-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #fff, 0 0 40px #fff,
      0 0 30px #fff, 0 0 40px #fff, 0 0 50px #fff;
  }

  > .computer {
    position: absolute;
    top: 40%;
    left: 13%;
    animation: computer-move 2s ease-in-out infinite alternate;
  }

  > .message {
    position: absolute;
    top: 43%;
    left: 45%;
    animation: message-dictionary-move 2s ease-in-out infinite alternate;
  }

  > .dictionary {
    position: absolute;
    top: 68%;
    left: 5%;
    animation: message-dictionary-move 2s ease-in-out infinite alternate;
  }

  > .left {
    position: absolute;
    top: 20%;
    right: 0%;
  }

  > .right {
    position: absolute;
    top: 30%;
    left: 3%;
  }

  > .square {
    position: absolute;
    top: 20%;
    left: 27%;
  }

  > .rightBox {
    position: absolute;
    right: 5%;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: end;
    flex-direction: column;
    width: 50%;
    height: 100%;

    > .textBox {
      display: flex;
      flex-direction: column;
      align-items: end;
      position: absolute;

      > span {
        display: inline-block;
        font-family: 'Noto Sans', sans-serif;
        font-weight: 500;
        color: white;
        font-size: 45px;
        padding: 10px 0;
      }
      & span:nth-of-type(2) {
        font-weight: bold;
        color: hsl(261deg 80% 48%);
        text-shadow: -1px -1px 1px rgba(255, 255, 255, 0.1),
          1px 1px 1px rgba(0, 0, 0, 0.5);
      }

      &:first-child {
        margin-top: 30px;
      }
    }

    > button {
      position: absolute;
      top: 70%;
      font-size: 21px;
      padding: 0.7em 1.7em;
      border-radius: 0.5em;
      transition: all 0.5s ease;
      border: none;
      cursor: pointer;
      letter-spacing: 3px;
      background-color: hsl(261deg 80% 48%);
      color: hsl(0, 0%, 100%);
      box-shadow: rgb(93 24 220) 0px 7px 15px 0px;

      > .text {
        color: #f2f2f2;
        font-weight: 600;
      }
    }
  }

  button:active {
    letter-spacing: 3px;
    background: linear-gradient(-45deg, #c28aff, #9f4afa, #6333ff);
    color: hsl(0, 0%, 100%);
    box-shadow: rgb(93 24 220) 0px 0px 0px 0px;
    transform: translateY(1px);
    transition: 50ms;
  }

  @keyframes computer-move {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-30px);
    }
  }

  @keyframes message-dictionary-move {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(60px);
    }
  }

  @-webkit-keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @-moz-keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @-o-keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const ImgContainerThree = styled.div<Props>`
  position: relative;
  width: ${(props) => (props.imgWidth ? '100%' : '1280px')};
  height: 100%;
  margin: 0 auto;
  opacity: ${(props) => (props.showImg ? 1 : 0)};
  transform: translateY(${(props) => (props.showImg ? 0 : '30px')});
  transition: opacity 0.5s ease, transform 0.5s ease;

  &.fade-out {
    animation: ${fadeOutAnimation} 0.5s forwards;
  }

  > .circleXL {
    position: absolute;
    width: 10%;
    top: 10%;
    left: 30%;
    opacity: 0.5;
    border-radius: 50%;
    background-color: transparent;
    box-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #fff, 0 0 40px #fff,
      0 0 30px #fff, 0 0 40px #fff, 0 0 50px #fff;
  }

  > .computer {
    position: absolute;
    top: 40%;
    left: 13%;
    animation: computer-move 2s ease-in-out infinite alternate;
  }

  > .message {
    position: absolute;
    top: 43%;
    left: 45%;
    animation: message-dictionary-move 2s ease-in-out infinite alternate;
  }

  > .dictionary {
    position: absolute;
    top: 68%;
    left: 5%;
    animation: message-dictionary-move 2s ease-in-out infinite alternate;
  }

  > .left {
    position: absolute;
    top: 20%;
    right: 0%;
  }

  > .right {
    position: absolute;
    top: 30%;
    left: 3%;
  }

  > .square {
    position: absolute;
    top: 20%;
    left: 27%;
  }

  > .rightBox {
    position: absolute;
    right: 5%;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: end;
    flex-direction: column;
    width: 50%;
    height: 100%;

    > .textBox {
      display: flex;
      flex-direction: column;
      align-items: end;
      position: absolute;

      > span {
        display: inline-block;
        font-family: 'Noto Sans', sans-serif;
        font-weight: 500;
        color: white;
        font-size: 45px;
        padding: 10px 0;
      }
      & span:nth-of-type(2) {
        font-weight: bold;
        color: hsl(261deg 80% 48%);
        text-shadow: -1px -1px 1px rgba(255, 255, 255, 0.1),
          1px 1px 1px rgba(0, 0, 0, 0.5);
      }

      &:first-child {
        margin-top: 30px;
      }
    }

    > button {
      position: absolute;
      top: 70%;
      font-size: 21px;
      padding: 0.7em 1.7em;
      border-radius: 0.5em;
      transition: all 0.5s ease;
      border: none;
      cursor: pointer;
      letter-spacing: 3px;
      background-color: hsl(261deg 80% 48%);
      color: hsl(0, 0%, 100%);
      box-shadow: rgb(93 24 220) 0px 7px 15px 0px;

      > .text {
        color: #f2f2f2;
        font-weight: 600;
      }
    }
  }

  button:active {
    letter-spacing: 3px;
    background: linear-gradient(-45deg, #c28aff, #9f4afa, #6333ff);
    color: hsl(0, 0%, 100%);
    box-shadow: rgb(93 24 220) 0px 0px 0px 0px;
    transform: translateY(1px);
    transition: 50ms;
  }

  @keyframes computer-move {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-30px);
    }
  }

  @keyframes message-dictionary-move {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(60px);
    }
  }

  @-webkit-keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @-moz-keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @-o-keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;
