import { BannerProps } from '@/types/types';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import card1 from '../public/images/second-card1.svg';
import card2 from '../public/images/second-card2.svg';
import card3 from '../public/images/second-card3.svg';
import etc from '../public/images/second-etc.svg';
import secMessage from '../public/images/second-message.svg';
import post from '../public/images/second-post.svg';
import user from '../public/images/second-user.svg';
import { useRouter } from 'next/router';

export default function BannerSecond({ imgWidth }: { imgWidth: boolean }) {
  const router = useRouter();

  return (
    <ImgContainerTwo
      imgWidth={imgWidth}
      // ref={imgContainerRef}
      // showImg={showImages}
    >
      <Image src={etc} alt="etcImg" className="etc"></Image>
      <Image src={post} alt="postImg" className="post"></Image>
      <Image
        src={card1}
        alt="cardImg"
        className="card1 animate__animated animate__headShake animate__infinite animate-duration-2"
      ></Image>
      <Image
        src={card2}
        alt="card2Img"
        className="card2 animate__animated animate__headShake animate__infinite animate-duration-2"
      ></Image>
      <Image
        src={card3}
        alt="card3Img"
        className="card3 animate__animated animate__headShake animate__infinite animate-duration-2"
      ></Image>
      <Image src={user} alt="userImg" className="user"></Image>
      <Image
        src={secMessage}
        alt="msgImg"
        className="message animate__animated animate__heartBeat animate__infinite animate-duration-2"
      ></Image>

      <div className="leftBox">
        <div className="textBox">
          <span>함께 배우고 성장하는</span>
          <span>사이드퀘스트</span>
        </div>
        <button
          className="noto-regular-13"
          onClick={() => router.push('/community')}
        >
          <span className="text">커뮤니티 둘러보기</span>
        </button>
      </div>
    </ImgContainerTwo>
  );
}

const ImgContainerTwo = styled.div<BannerProps>`
  position: relative;
  width: ${(props) => (props.imgWidth ? '100%' : '1280px')};
  height: 100%;
  margin: 0 auto;
  /* opacity: ${(props) => (props.showImg ? 1 : 0)}; */
  /* transform: translateY(${(props) => (props.showImg ? 0 : '30px')}); */
  transition: opacity 0.5s ease, transform 0.5s ease;

  > .etc {
    position: absolute;
    right: 3%;
    bottom: 5%;
  }

  > .post {
    position: absolute;
    right: 10%;
    bottom: 5%;
  }

  > .card1 {
    position: absolute;
    right: 30%;
    bottom: 42%;
  }

  > .card2 {
    position: absolute;
    right: 37%;
    bottom: 42%;
  }

  > .card3 {
    position: absolute;
    right: 44%;
    bottom: 42%;
  }

  > .user {
    position: absolute;
    right: 0%;
    bottom: 28%;
  }

  > .message {
    position: absolute;
    right: 14%;
    bottom: 59%;
  }

  > .leftBox {
    position: absolute;
    left: 5%;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    width: 50%;
    height: 100%;

    > .textBox {
      display: flex;
      flex-direction: column;
      align-items: start;
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
