import styled, { keyframes } from 'styled-components';
import { BannerProps } from '@/types/types';
import BannerFirst from './BannerFirst';
import BannerSecond from './BannerSecond';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useEffect, useRef, useState } from 'react';
import BannerText from './BannerText';
import BannerThird from './BannerThird';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { TbMoodLookLeft, TbMoodLookRight } from 'react-icons/tb';
import { FaCaretSquareLeft, FaCaretSquareRight } from 'react-icons/fa';

export default function BannerSlider({ isScrolled }: { isScrolled: boolean }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [current, setCurrent] = useState(1);
  const [autoplayPaused, setAutoplayPaused] = useState(false); // autoplay 일시 정지 여부 상태 변수
  const sliderRef = useRef<Slider>(null);

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
    nextArrow: (
      <Div>
        <FaCaretSquareRight fill="white" />
      </Div>
    ),
    prevArrow: (
      <DivPre>
        <FaCaretSquareLeft fill="white" />
      </DivPre>
    ),
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
      // 각 페이징 요소 커스터마이징
      <li
        key={i}
        style={{
          width: '30px',
          color: 'blue',
          border: '1px blue solid',
        }}
        onClick={() => {
          if (sliderRef.current) {
            sliderRef.current.slickGoTo(i, true); // Use the second parameter to enable animation
          }
        }}
      >
        {i + 1}
      </li>
    ),
  };

  // 클래스 명으로 index를 따오기

  return (
    <Container isScrolled={isScrolled}>
      <Background activeSlide={activeSlide} />
      <StyledSlider {...settings}>
        <BannerFirst />
        <BannerSecond />
        <BannerThird />
      </StyledSlider>
      <BannerText activeSlide={activeSlide} />
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

  .slick-active {
    transform: scale();
  }

  .slick-prev::before,
  .slick-next::before {
    position: absolute;
    top: 0;
    opacity: 0;
    display: none;
  }

  .slick-dots {
    position: absolute;
    right: 5%;
    bottom: 5%;
    width: auto;
    z-index: 100;

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
`;

const Background = styled.div<{ activeSlide: number }>`
  width: 100%;
  height: 100%;
  background-color: ${({ activeSlide }) => {
    if (activeSlide === 1) {
      return 'black';
    } else if (activeSlide === 2) {
      return 'red';
    } else {
      return 'blue';
    }
  }};
  position: absolute;
  top: 0;
  transition: background-color 0.5s ease;
`;

const Div = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 16px;
  bottom: 100px;
  z-index: 99;
  text-align: right;
  line-height: 30px;

  > svg {
    width: 100%;
    height: 100%;
  }
`;

const DivPre = styled.div`
  position: absolute;
  left: 90%;
  bottom: 10%;
  z-index: 99999;
  text-align: left;
  line-height: 30px;
  transform: translateY(-50%);
  > svg {
    width: 100%;
    height: 100%;
    position: absolute;
  }
`;
