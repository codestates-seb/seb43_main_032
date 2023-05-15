import { BannerProps } from '@/types/types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import computer from '../public/images/bannerComputer.svg';
import dictionary from '../public/images/bannerDic.svg';
import message from '../public/images/bannerMsg.svg';
import right from '../public/images/circleLeft.svg';
import left from '../public/images/circleRight.svg';
import square from '../public/images/squareBg.svg';
import { useRouter } from 'next/router';

export default function BannerSecond() {
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
