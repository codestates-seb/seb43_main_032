import styled, { keyframes } from 'styled-components';
import { BannerProps } from '@/types/types';
import BannerFirst from './BannerFirst';
import BannerSecond from './BannerSecond';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useState } from 'react';
import BannerText from './BannerText';
import BannerThird from './BannerThird';

export default function BannerSlider({ isScrolled }: { isScrolled: boolean }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    autoPlay: true,
    autoPlaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
    afterChange: (currentSlide: number) => {
      setActiveSlide(currentSlide);
    },
  };

  return (
    <Container isScrolled={isScrolled}>
      {/* <StyledSlider {...settings}>
        <BannerFirst />
        <BannerSecond />
      </StyledSlider>
      {activeSlide === 0 && <BannerText activeSlide={activeSlide} />}
      {activeSlide === 1 && <button>2</button>} */}
      <BannerThird />
    </Container>
  );
}

const StyledSlider = styled(Slider)`
  height: 660px;
  width: 100%;

  .slick-active {
    animation: reSize 4s alternate;
  }

  .slick-dots {
    display: flex;
    li {
      button {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #ccc;
        border: none;
        cursor: pointer;
      }

      &.slick-active button {
        width: 5rem;
        background-color: #000;
      }
    }
  }

  @keyframes reSize {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.05);
    }
  }
`;

const Container = styled.div<BannerProps>`
  position: relative;
  width: 100%;
  height: 660px;
  background: linear-gradient(270deg, #8b67ff, #dcbbff, #e2c8ff);
  transition: background 0.5s ease;
`;
