import React, { useEffect } from 'react';
import styled from 'styled-components';
import Parallax from 'parallax-js';
import { useRouter } from 'next/router';
import {
  BANNER_BACKGROUND_IMAGES,
  BANNSER_IMAGES_URLS,
} from '@/constant/constant';

const Banner = () => {
  const router = useRouter().pathname;
  useEffect(() => {
    const scene = document.getElementById('scene');
    if (scene) {
      const parallax = new Parallax(scene);
      return () => parallax.disable();
    }
  }, []);

  const checkSrc = () => {
    return BANNSER_IMAGES_URLS[router] || [];
  };

  return (
    <Container router={router}>
      <Scene id="scene">
        <Layer data-depth="1">
          <Image src={checkSrc()[0]} alt="Space-BP" />
        </Layer>
        <Layer data-depth="-1">
          <Image src={checkSrc()[1]} alt="Space-RP" />
        </Layer>
        <Layer data-depth="2">
          <Image src={checkSrc()[2]} alt="Space-PP" />
        </Layer>
        <Layer data-depth="0.5">
          <Image src={checkSrc()[3]} alt="Space-Meteors" />
        </Layer>
        <Layer data-depth=".1"></Layer>
      </Scene>
    </Container>
  );
};

interface ContainerProps {
  router: string;
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: ${({ router }) => BANNER_BACKGROUND_IMAGES[router] || ''};
  background-attachment: fixed;
  background-size: cover;
`;

const Scene = styled.ul`
  height: 100%;
  width: 100%;
`;

const Layer = styled.li`
  height: 100%;
  width: 100%;
`;

const Image = styled.img`
  width: auto;
  height: 100vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default Banner;
