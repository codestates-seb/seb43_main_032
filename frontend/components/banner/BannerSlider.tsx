import styled, { keyframes } from 'styled-components';
import { BannerProps } from '@/types/types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useEffect, useRef, useState } from 'react';
import { FaCaretSquareLeft, FaCaretSquareRight } from 'react-icons/fa';
import { useRouter } from 'next/router';
import HomeBanner from './HomeBanner';
import CommuBanner from './CommuBanner';
import BannerText from './BannerText';

const CustomDot = ({
  onClick,
  active,
}: {
  onClick: () => void;
  active: boolean;
}) => (
  <div
    style={{
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      background: active ? 'blue' : 'gray',
      marginLeft: '5px',
      cursor: 'pointer',
    }}
    onClick={onClick}
  />
);

export default function BannerSlider({ isScrolled }: { isScrolled: boolean }) {
  const [activeSlide, setActiveSlide] = useState(0); // 활성된 슬라이드 번호
  const [current, setCurrent] = useState(1);
  const [autoplayPaused, setAutoplayPaused] = useState(false); // autoplay 일시 정지 여부 상태 변수
  const router = useRouter().pathname; // 주소값에 따른 슬라이드 여부

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const slickBox: HTMLElement | null =
        document.querySelector('.slick-dots');
      const arrowBox: HTMLElement | null =
        document.querySelector('.slick-arrow');
      if (slickBox) {
        slickBox.style.backgroundColor = '';
        slickBox.style.borderRadius = '';
      }
      if (arrowBox) {
        arrowBox.style.bottom = '10%';
      }
    }
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoPlay: !autoplayPaused, // autoplay 일시 정지 여부에 따라 값 변경
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    speed: 1000,
    autoplay: true,
    afterChange: (currentSlide: number) => {
      setActiveSlide(currentSlide);
      setAutoplayPaused(true); // 슬라이드 이동 후 autoplay 일시 정지 설정
      setTimeout(() => setAutoplayPaused(false), 6000); // 3초 후에 autoplay 일시 정지 해제
    },
    nextArrow: <FaCaretSquareRight fill="#c28aff" />,
    prevArrow: <FaCaretSquareLeft fill="#c28aff" />,
    appendDots: (dots: React.ReactNode) => (
      // 페이징 요소들을 감싸는 컨테이너 커스터마이징
      <div
        style={{
          backgroundColor: '#ddd',
          borderRadius: '10px',
          padding: '10px',
        }}
      >
        <ul style={{ margin: '0px' }}> {dots} </ul>
      </div>
    ),
    customPaging: (i: number) => (
      <CustomDot active={i === activeSlide} onClick={() => setCurrent(i)} />
    ),
  };

  const bannerTxt = () => {
    if (router === '/') return 'SIDE QUEST';
    if (router === '/community') return 'COMMUNITY';
    if (router === '/project') return 'PROJECT';
    if (router === '/users') return 'USERS';
    return '';
  };

  // slick 기본 스타일 수정

  // 클래스 명으로 index를 따오기

  return (
    <Container isScrolled={isScrolled}>
      <div className="bg">
        <HomeBanner />
      </div>
      <TitleBox>
        <span>프로젝트의 모든 것</span>
        <span>개발부터 디자인까지</span>
        <BannerText text={bannerTxt()} />
      </TitleBox>
    </Container>
  );
}

const StyledSlider = styled(Slider)`
  transition: opacity 0.3s ease, transform 0.3s ease;
  position: relative;

  .slick-track {
    transition: transform 0.5s ease-in-out;
  }

  .slick-slider {
    display: flex;
    position: relative;
    transition: transform 0.5s ease-in-out;
  }

  .slick-slide {
    transition: transform 1s ease;
  }

  .slick-active {
  }

  .slick-arrow {
    z-index: 10;
    width: 50px;
    height: 50px;
    background: rgba($bk, 0.2);
    border-radius: 50%;
    transition: background 0.5s;
    position: absolute;
    top: 80%;
    &:hover {
      fill: rgba(#c28aff, 0.9);

      &::before {
        fill: rgba(#c28aff, 0.5);
      }
    }
    &::before {
      font-family: 'Line Awesome Free';
      font-weight: 900;
      font-size: 49px;
      transition: all 0.5s;
    }
  }

  .slick-prev {
    left: 90%;

    &::before {
      content: '\f137';
    }
  }

  .slick-next {
    right: 30px;

    &::before {
      content: '\f138';
    }
  }

  .slick-dots {
    position: absolute;
    right: 5%;
    bottom: 5%;
    width: auto;
    z-index: 50;
    background-color: none !important;

    ul {
      display: flex;
      gap: 16px;
    }
  }

  @keyframes reSize {
    0% {
      transform: scale(1);
    }
    80% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const Container = styled.div<BannerProps>`
  position: relative;
  width: 100%;
  height: 660px;

  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const TitleBox = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-transform: uppercase;
  font-size: 30px;
  font-weight: 500;
  letter-spacing: 10px;
  white-space: nowrap;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .title {
    text-shadow: 0 0 30px;
    margin-top: 20px;
    font-size: 70px;
    font-weight: 700;
  }
`;
