import styled, { keyframes } from 'styled-components';
import { BannerProps } from '@/types/types';
import BannerFirst from './BannerFirst';
import BannerSecond from './BannerSecond';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useEffect, useState } from 'react';
import BannerText from './BannerText';
import BannerThird from './BannerThird';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

export default function BannerSlider({ isScrolled }: { isScrolled: boolean }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [current, setCurrent] = useState(1);
  const [autoplayPaused, setAutoplayPaused] = useState(false); // autoplay 일시 정지 여부 상태 변수

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
        <AiOutlineArrowRight />
      </Div>
    ),
    prevArrow: (
      <DivPre>
        <AiOutlineArrowLeft />
      </DivPre>
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
  width: 100%;
  transition: opacity 0.3s ease, transform 0.3s ease;
  position: relative;

  .slick-track {
    transition: transform 0.5s ease-in-out;
  }

  .slick-slide {
    transition: transform 0.5s ease-in-out;
  }

  .slick-active {
    transform: scale();
  }

  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }

  > ul {
    width: 100%;
    max-width: 1280px;
    display: flex !important;
    position: absolute;
    bottom: 10%;
    margin: 0 auto;
  }

  .slick-dots {
    display: flex !important;
    gap: 16px;
    li {
      button {
        width: 100px;
        height: 10px;
        background-color: #ccc;
        border: none;
        cursor: pointer;
      }

      &::before {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #ccc;
        border: none;
        cursor: pointer;
      }
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
  z-index: 99;
  text-align: right;
  line-height: 30px;
  background: black;
`;

const DivPre = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  left: 16px;
  z-index: 99;
  text-align: left;
  line-height: 30px;
  background-color: black;
`;
