import React, { useEffect } from 'react';
import styled from 'styled-components';
import Parallax from 'parallax-js';
import { useRouter } from 'next/router';

const CommuBanner = () => {
  useEffect(() => {
    const scene = document.getElementById('scene');
    if (scene) {
      const parallax = new Parallax(scene);
      return () => parallax.disable();
    }
  }, []);

  const checkSrc = () => {
    const router = useRouter().pathname;

    const home = [
      'https://i.postimg.cc/44LxkHX9/Space-BP.png',
      'https://i.postimg.cc/vH4HQ8mS/Space-RP.png',
      'https://i.postimg.cc/RV2Cqr6C/Space-PP.png',
      'https://i.postimg.cc/fyrzxp8K/Space-Meteors.png',
    ];

    const community = [
      'https://github.com/codestates-seb/seb43_main_032/assets/118104644/125dc4ef-735e-4bae-94aa-73b613c2be14',
      'https://github.com/codestates-seb/seb43_main_032/assets/118104644/9f8d0a08-83c4-4189-b4bf-cd5acbcf6168',
      'https://github.com/codestates-seb/seb43_main_032/assets/118104644/a991fdf0-6d26-42b3-8c20-f9c7b285638b',
      'https://github.com/codestates-seb/seb43_main_032/assets/118104644/93d290c9-b882-4ced-8b3b-e842b3fd12d4',
    ];
    if (router === '/') return home;
    if (router === '/community') return community;
    return [];
  };

  console.log(checkSrc());
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
