import { BannerProps } from '@/types/types';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import card from '../public/images/second-card.svg';
import etc from '../public/images/second-etc.svg';
import secMessage from '../public/images/second-message.svg';
import post from '../public/images/second-post.svg';
import user from '../public/images/second-user.svg';
import { useRouter } from 'next/router';

export default function BannerThird() {
  const router = useRouter();

  return (
    <ImgContainerTwo>
      <div className="etc">
        <Image src={etc} alt="etcImg" />
      </div>
      <div className="post">
        <Image src={post} alt="postImg" className="post" />
      </div>
      <div className="card">
        <Image
          src={card}
          alt="cardImg"
          className="animate__animated animate__headShake animate__infinite animate-duration-2"
        />
      </div>
      <div className="user">
        <Image src={user} alt="userImg" />
      </div>
      <div className="message">
        <Image
          src={secMessage}
          alt="msgImg"
          className="animate__animated animate__heartBeat animate__infinite animate-duration-2"
        />
      </div>
      <div className="titleBox">
        <div className="title">
          도전과 성과를 나누는
          <br />
          개발자 커뮤니티
        </div>
        <button onClick={() => router.push('users/login')}>
          <span className="text">커뮤니티 참여하기</span>
        </button>
      </div>
    </ImgContainerTwo>
  );
}

const ImgContainerTwo = styled.div<BannerProps>`
  position: relative;
  width: 100%;
  max-width: 1280px;
  height: 660px;
  margin: 0 auto;

  > .etc {
    width: auto;
    position: absolute;
    left: 13%;
    bottom: 5%;

    > img {
      width: 100%;
    }
  }
  > .post {
    width: 30%;
    min-width: 280px;
    position: absolute;
    left: 10%;
    bottom: 5%;

    > img {
      width: 100%;
    }
  }

  .card {
    width: 20%;
    min-width: 140px;
    position: absolute;
    left: 30%;
    bottom: 45%;

    > img {
      width: 100%;
    }
  }

  .cardRes {
    position: absolute;
    left: 3%;
    bottom: 45%;
  }

  > .user {
    width: 20%;
    min-width: 140px;
    position: absolute;
    left: 0%;
    bottom: 28%;

    > img {
      width: 100%;
    }
  }

  > .message {
    position: absolute;
    left: 14%;
    bottom: 59%;
    width: 14%;
    transform: scaleX(-1);
    min-width: 100px;
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
`;
