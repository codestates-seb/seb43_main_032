import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import img from '../public/images/thirdFix.svg';
import board from '../public/images/thirdBoard.svg';
import msg1 from '../public/images/thirdMsg (1).svg';
import msgSec1 from '../public/images/thireMsgSec1.svg';
import { useRouter } from 'next/router';

export default function BannerFirst() {
  const router = useRouter();

  return (
    <ImgContainer>
      <div className="mainImg">
        <div className="boardImg">
          <Image src={board} alt="boardImg" />
        </div>
        <div className="bannerImg">
          <Image src={img} alt="bannerImg" />
        </div>
        <div className="msg">
          <Image src={msg1} alt="msgImg"></Image>
        </div>
        <div className="msgSec">
          <Image src={msgSec1} alt="msgImg2"></Image>
        </div>
      </div>
      <div className="titleBox">
        <div className="title">
          프로젝트의 모든 것
          <br />
          개발부터 디자인까지
        </div>
        <button onClick={() => router.push('users/login')}>
          <span className="text">지금 시작하기</span>
        </button>
      </div>
    </ImgContainer>
  );
}

const ImgContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  height: 660px;

  > .mainImg {
    position: relative;
    width: 50%;
    min-width: 300px;
    height: 100%;
    > .bannerImg {
      left: 5%;
      top: 20%;
      position: absolute;
      > img {
        width: 100%;
      }
    }

    > .boardImg {
      position: absolute;
      left: 25%;
      top: 28%;
      width: 50%;
      min-width: 150px;
      animation: reSize 3s infinite ease-in-out;
      > img {
        width: 100%;
      }
    }

    > .msg {
      position: absolute;
      left: 80%;
      top: 55%;
      width: 15%;
      > img {
        width: 100%;
      }
    }

    > .msgSec {
      position: absolute;
      left: 10%;
      top: 40%;
      width: 15%;

      @media (max-width: 768px) {
        right: 10%;
      }
      > img {
        width: 100%;
      }
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

  @keyframes reSize {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
`;
