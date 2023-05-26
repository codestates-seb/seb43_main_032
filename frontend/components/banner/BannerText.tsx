import { BANNER_TEXTS } from '@/constant/constant';
import { useRouter } from 'next/router';
import React from 'react';
import styled, { keyframes } from 'styled-components';

interface TextProps {
  x: string;
  y: string;
  textAnchor: string;
  text: string;
}

const BannerText = () => {
  const router = useRouter().pathname;
  return (
    <Wrapper>
      <Patterns>
        <Svg>
          <defs>
            <PolkaDotsPattern
              id="polka-dots"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <circle fill="#be9ddf" cx="25" cy="25" r="3"></circle>
            </PolkaDotsPattern>
          </defs>
          <Text x="50%" y="60%" textAnchor="middle" text={BANNER_TEXTS[router]}>
            {BANNER_TEXTS[router]}
          </Text>
        </Svg>
      </Patterns>
    </Wrapper>
  );
};

export default BannerText;

const Wrapper = styled.div`
  height: 100%;
  margin: 0;
`;

const Patterns = styled.div`
  height: 100%;
`;

const Svg = styled.svg`
  width: 100%;
  height: 100%;
`;

const PolkaDotsPattern = styled.pattern`
  circle {
    fill: #be9ddf;
  }
`;

const strokeAnimation = keyframes`
  0% {
    stroke-dasharray: 0 50%;
    stroke-dashoffset: 20%;
    fill: white;
  }
  100% {
    stroke-dasharray: 50% 0;
    stroke-dashoffset: -20%;
    fill: hsla(189, 68%, 75%, 0%);
  }
`;

const Text = styled.text<TextProps>`
  letter-spacing: 10px;
  stroke: ${({ text }) => {
    if (text === 'SIDE QUEST') {
      return 'rgba(228, 0, 190, 0.8)';
    } else if (text === 'COMMUNITY') {
      return 'rgb(25, 163, 255)';
    } else if (text === 'PROJECT') {
      return 'rgb(201,86,154)';
    } else if (text === 'USERS') {
      return 'rgb(158, 23, 255)';
    } else {
      return 'rgba(228, 0, 190, 0.8)';
    }
  }};
  font-size: 70px;
  font-weight: 700;
  stroke-width: 5;
  animation: ${strokeAnimation} 5s infinite alternate;
  @media (max-width: 768px) {
    font-size: 40px;
  }
`;
