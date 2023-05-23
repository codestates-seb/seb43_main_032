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
          <ImgBox>
            <div className={`bg-${checkSrc()[0]}`}></div>
          </ImgBox>
        </Layer>
        <Layer data-depth="-1">
          <ImgBox>
            <div className={`bg-${checkSrc()[1]}`}></div>
          </ImgBox>
        </Layer>
        <Layer data-depth="2">
          <ImgBox>
            <div className={`bg-${checkSrc()[2]}`}></div>
          </ImgBox>
        </Layer>
        <Layer data-depth="0.5">
          <ImgBox>
            <div className={`bg-${checkSrc()[3]}`}></div>
          </ImgBox>
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
  height: 660px;
  overflow: hidden;
  background: ${({ router }) => BANNER_BACKGROUND_IMAGES[router] || ''};
`;

const Scene = styled.ul`
  height: 100%;
  width: 100%;
`;

const Layer = styled.li`
  height: 100%;
  width: 100%;
`;

const ImgBox = styled.div`
  width: 30vw;
  height: 100vh;
  position: absolute;
  top: 50%;
  left: 50%;
`;

export default Banner;

{
  /* <Layer data-depth="1">
<ImgBox src={checkSrc()[0]} alt="Space-BP" />
</Layer>
<Layer data-depth="-1">
<ImgBox src={checkSrc()[1]} alt="Space-RP" />
</Layer>
<Layer data-depth="2">
<ImgBox src={checkSrc()[2]} alt="Space-PP" />
</Layer>
<Layer data-depth="0.5">
<ImgBox src={checkSrc()[3]} alt="Space-Meteors" />
</Layer> */
}
