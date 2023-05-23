import styled from 'styled-components';
import { BannerProps } from '@/types/types';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import HomeBanner from './HomeBanner';
import BannerText from './BannerText';
import { bannerTexts } from '@/constant/constant';

export default function BannerSlider({ isScrolled }: { isScrolled: boolean }) {
  const router = useRouter().pathname;

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

  const bannerTxt = () => {
    return bannerTexts[router] || '';
  };

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
