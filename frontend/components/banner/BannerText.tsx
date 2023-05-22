import React from 'react';
import styled, { keyframes } from 'styled-components';

interface TextProps {
  x: string;
  y: string;
  textAnchor: string;
  text: string;
}

const BannerText = ({ text }: { text: string }) => {
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
          <Text x="50%" y="60%" textAnchor="middle" text={text}>
            {text}
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

const Text = styled.text<TextProps>`
  letter-spacing: 10px;
  stroke: #ffa5d8;
  font-size: 60px;
  font-weight: 700;
  stroke-width: 3;
  animation: ${keyframes`
    0% {
      stroke-dasharray: 0 50%;
      stroke-dashoffset: 20%;
      /* fill: ${({ text }) => {
        if (text === 'SIDE QUEST') return 'rgba(255, 0, 195, 0.8)';
        return '';
      }} */
    }
    100% {
      stroke-dasharray: 50% 0;
      stroke-dashoffset: -20%;
      fill: hsla(189, 68%, 75%, 0%);
    }
  `} 5s infinite alternate;
`;
