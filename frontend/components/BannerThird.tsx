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
`;
