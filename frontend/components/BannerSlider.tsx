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

export default function BannerSlider({ isScrolled }: { isScrolled: boolean }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [current, setCurrent] = useState(1);
  const settings = {
    dots: true,
    infinite: true,
    autoPlay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    afterChange: (currentSlide: number) => {
      setActiveSlide(currentSlide);
    },
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

  .slick-arrow {
    position: absolute;
    left: 50%;
    display: flex;
    gap: 16px;
    .slick-next {
    }

    .slick-prev {
    }
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
