import React, { useEffect } from 'react';
import styled from 'styled-components';
import Parallax from 'parallax-js';
import { useRouter } from 'next/router';
import { bannerImageUrls } from '@/constant/constant';

const CommuBanner = () => {
  useEffect(() => {
    const scene = document.getElementById('scene');
    if (scene) {
      const parallax = new Parallax(scene);
      return () => parallax.disable();
    }
  }, []);
  const router = useRouter().pathname;

  const checkSrc = () => {
    return bannerImageUrls[router] || [];
  };

  return (
    <Container>
      <Scene id="scene">
        <Layer data-depth="1">
          <Image src={checkSrc()[0]} alt="Space-BP" />
        </Layer>
        <Layer data-depth="-1">
          <Image
            src="https://i.postimg.cc/vH4HQ8mS/Space-RP.png"
            alt="Space-RP"
          />
        </Layer>
        <Layer data-depth="2">
          <Image
            src="https://i.postimg.cc/RV2Cqr6C/Space-PP.png"
            alt="Space-PP"
          />
        </Layer>
        <Layer data-depth="0.5">
          <Image
            src="https://i.postimg.cc/fyrzxp8K/Space-Meteors.png"
            alt="Space-Meteors"
          />
        </Layer>
        <Layer data-depth=".1"></Layer>
      </Scene>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: url('https://i.postimg.cc/c4zCYgjS/Space-BG.png');
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

export default CommuBanner;
