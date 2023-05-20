import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import img from '../../public/images/thirdFix.svg';
import board from '../../public/images/thirdBoard.svg';
import msg1 from '../../public/images/thirdMsg (1).svg';
import msgSec1 from '../../public/images/thireMsgSec1.svg';

export default function BannerFirst() {
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setNum((prev: number) => (prev + 1) % 3);
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, []);
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
