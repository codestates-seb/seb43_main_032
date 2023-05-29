import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

export default function LoginBg() {
  const router = useRouter();
  return (
    <Container>
      <svg
        className="css-waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path
            id="wave-pattern"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          ></path>
        </defs>
        <g className="animated-waves">
          <use
            href="#wave-pattern"
            x="48"
            y="0"
            fill="rgba(244, 175, 255, 0.7)"
          ></use>
          <use
            href="#wave-pattern"
            x="48"
            y="3"
            fill="rgba(215, 123, 255, 0.5)"
          ></use>
          <use
            href="#wave-pattern"
            x="48"
            y="5"
            fill="rgba(197, 117, 255, 0.612)"
          ></use>
          <use
            href="#wave-pattern"
            x="48"
            y="7"
            fill="rgba(144, 79, 255, 0.3)"
          ></use>
        </g>
      </svg>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  width: 100vw;
  height: 100%;
  z-index: -1;
  background: linear-gradient(75deg, #8217f3 0%, #8217f3 30%, #4412e7 100%);

  .css-waves {
    position: absolute;
    top: calc(100% - 15vh);
    width: 100%;
    height: 15vh;
    min-height: 100px;
    max-height: 150px;

    @media (max-width: 640px) {
      height: 40vh;
      max-height: none;
    }
  }

  /* Here we declare the SVG node that we wish to animate. */

  .animated-waves > use {
    animation: infinite-waves 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
  }
  .animated-waves > use:nth-child(1) {
    animation-delay: -2s;
    animation-duration: 7s;
  }
  .animated-waves > use:nth-child(2) {
    animation-delay: -3s;
    animation-duration: 10s;
  }
  .animated-waves > use:nth-child(3) {
    animation-delay: -4s;
    animation-duration: 13s;
  }
  .animated-waves > use:nth-child(4) {
    animation-delay: -5s;
    animation-duration: 20s;
  }
  @keyframes infinite-waves {
    0% {
      transform: translate3d(-90px, 0, 0);
    }
    100% {
      transform: translate3d(85px, 0, 0);
    }
  }
  /* Mobile Optimization */
  /* @media (max-width: 768px) {
    .css-waves {
      height: 40px;
      min-height: 40px;
    }
  } */
`;
