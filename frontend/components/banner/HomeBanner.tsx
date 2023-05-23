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

  const router = useRouter().pathname;
  const checkSrc = () => {
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

    const project = [
      'https://github.com/codestates-seb/seb43_main_032/assets/118104644/db86d318-53b3-4352-9f48-877ecf86399a',
      '',
      'https://github.com/codestates-seb/seb43_main_032/assets/118104644/152697f1-a6a0-44eb-b376-8b292c705cf4',
      'https://github.com/codestates-seb/seb43_main_032/assets/118104644/092aa01d-edec-4266-95d5-b131247e328c',
    ];

    const users = [
      'https://github.com/codestates-seb/seb43_main_032/assets/118104644/d47404b5-f890-4b26-bdcb-c31a89a83890',
      'https://github.com/codestates-seb/seb43_main_032/assets/118104644/08f59335-1efc-4b9e-9530-3a4a638512ab',
      'https://github.com/codestates-seb/seb43_main_032/assets/118104644/e0199dee-fc0e-4f23-86f4-7ec4688fba55',
    ];
    if (router === '/') return home;
    if (router === '/community') return community;
    if (router === '/project') return project;
    if (router === '/users') return users;
    return [];
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
  background-image: ${({ router }) => {
    if (router === '/') {
      return "url('https://i.postimg.cc/c4zCYgjS/Space-BG.png')";
    } else if (router === '/community') {
      return "url('https://github.com/codestates-seb/seb43_main_032/assets/118104644/adb4296f-a95d-4a17-9822-47d3032d750e')";
    } else if (router === '/project') {
      return "url('https://github.com/codestates-seb/seb43_main_032/assets/118104644/aa7be7d5-91e3-458e-8f22-0010d3e24025')";
    } else if (router === '/users') {
      return 'url(https://github.com/codestates-seb/seb43_main_032/assets/118104644/7fb4d6e9-0824-4607-8c81-cb868ea78c47)';
    } else {
      return '';
    }
  }};
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
