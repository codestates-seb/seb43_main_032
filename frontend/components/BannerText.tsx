import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

export default function BannerText({ activeSlide }: { activeSlide: number }) {
  const router = useRouter();
  const title1 = [
    '프로젝트의 모든 것',
    '시작하는 나만의 이야기',
    '개발자 커뮤니티',
  ];
  const title2 = [
    '개발부터 디자인까지',
    '다양한 기술과 분야로',
    '도전과 성과를 나누는',
  ];
  const btnText = ['지금 시작하기', '프로젝트 시작하기', '커뮤니티 참여하기'];

  const link = ['users/login', 'project', 'community'];
  return (
    <Container activeSlide={activeSlide}>
      <div className="titleBox">
        <div className="title">
          {title2[activeSlide]}
          <br />
          {title1[activeSlide]}
        </div>
        <button onClick={() => router.push(link[activeSlide])}>
          <span className="text">{btnText[activeSlide]}</span>
        </button>
      </div>
    </Container>
  );
}

const Container = styled.div<{ activeSlide: number }>`
  width: 100%;
  max-width: 1280px;
  height: 100%;
  left: 50%;
  top: 0;
  position: absolute;
  transform: translateX(-50%);

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
      background-color: hsl(261deg 80% 48%);
      color: hsl(0, 0%, 100%);
      box-shadow: rgb(93 24 220) 0px 7px 15px 0px;

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
