import styled from 'styled-components';
import { BannerProps } from '@/types/types';
import React, { useEffect } from 'react';
import Banner from './Banner';
import BannerText from './BannerText';

export default function BannerSlider() {
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

  return (
    <Container>
      <Banner />
      <TitleBox>
        <div>프로젝트의 모든 것</div>
        <div>개발부터 디자인까지</div>
        <BannerText />
      </TitleBox>
    </Container>
  );
}

const Container = styled.div<BannerProps>`
  position: relative;
  width: 100%;
  height: 660px;
`;

const TitleBox = styled.div`
  position: absolute;
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
  width: 100%;
`;
