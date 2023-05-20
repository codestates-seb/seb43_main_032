import { BannerProps } from '@/types/types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import computer from '../../public/images/bannerComputer.svg';
import dictionary from '../../public/images/bannerDic.svg';
import message from '../../public/images/bannerMsg.svg';
import right from '../../public/images/circleLeft.svg';
import left from '../../public/images/circleRight.svg';
import square from '../../public/images/squareBg.svg';
import { useRouter } from 'next/router';

export default function BannerSecond() {
  const router = useRouter();
  return (
    <ImgContainer>
      <div className="right">
        <Image src={right} alt="img5"></Image>
      </div>
      <div className="square">
        <Image src={square} alt="img6"></Image>
      </div>
      <div className="left">
        <Image src={left} alt="img4"></Image>
      </div>
      <div className="itemBox2">
        <div className="dictionary">
          <Image src={dictionary} alt="img3"></Image>
        </div>
        <div className="computer">
          <Image src={computer} alt="img1"></Image>
        </div>
        <div className="message">
          <Image src={message} alt="img2"></Image>
        </div>
      </div>
      <div className="titleBox">
        <div className="title">
          다양한 기술과 분야로
          <br />
          시작하는 나만의 이야기
        </div>
        <button onClick={() => router.push('users/login')}>
          <span className="text">프로젝트 시작하기</span>
        </button>
      </div>
    </ImgContainer>
  );
}

const ImgContainer = styled.div<BannerProps>`
  position: relative;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  height: 660px;
  > .itemBox2 {
    display: flex;
    position: absolute;
    top: 40%;
    width: 100%;
    > .computer {
      width: 34%;
      min-width: 200px;
      animation: computer-move 2s ease-in-out infinite alternate;
      > img {
        width: 100%;
      }
    }

    > .message {
      width: 11%;
      min-width: 70px;
      animation: message-dictionary-move 2s ease-in-out infinite alternate;
      > img {
        width: 100%;
      }
    }

    > .dictionary {
      display: flex;
      justify-content: end;
      align-items: end;
      width: 9%;
      max-height: 250px;
      animation: message-dictionary-move 2s ease-in-out infinite alternate;
      > img {
        width: 100%;
      }
    }
  }

  > .left {
    width: 13%;
    min-width: 150px;
    position: absolute;
    top: 20%;
    right: 0%;
    > img {
      width: 100%;
    }
  }

  > .right {
    width: 7%;
    min-width: 150px;
    position: absolute;
    top: 30%;
    left: 3%;
    > img {
      width: 100%;
    }
  }

  > .square {
    width: 30%;
    min-width: 200px;
    position: absolute;
    top: 20%;
    left: 27%;
    > img {
      width: 100%;
    }
  }

  > .titleBox {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: end;
    width: 50%;
    height: 50%;
    top: 37%;
    right: 5%;
    color: white;
    text-align: end;
    transition: opacity 0.3s ease;
    > .title {
      font-size: 40px;
      font-weight: 600;
      line-height: 1.5;
    }
    > button {
      font-size: 21px;
      margin-top: 30px;
      padding: 0.7em 1.7em;
      border-radius: 0.5em;
      transition: all 0.5s ease;
      border: none;
      cursor: pointer;
      letter-spacing: 3px;
      background-color: #3a2287;
      color: hsl(0, 0%, 100%);
      box-shadow: #483290 0px 7px 15px 0px;

      > .text {
        color: #f2f2f2;
        font-weight: 600;
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
`;
