import React, { useEffect } from 'react';
import styled from 'styled-components';
import Parallax from 'parallax-js';

const ParallaxBanner = () => {
  useEffect(() => {
    const scene = document.getElementById('scene');
    if (scene) {
      const parallax = new Parallax(scene);
      return () => parallax.disable();
    }
  }, []);

  const handleInfoClick = () => {
    const modal = document.getElementsByClassName('modal')[0];
    modal.classList.add('active');
  };

  const handleCloseClick = () => {
    const modal = document.getElementsByClassName('modal')[0];
    modal.classList.remove('active');
  };

  return (
    <Container>
      <Scene id="scene">
        <Layer data-depth="1">
          <Image
            src="https://i.postimg.cc/44LxkHX9/Space-BP.png"
            alt="Space-BP"
          />
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

const Scientist = styled.span`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-transform: uppercase;
  font-size: 50px;
  font-weight: 500;
  letter-spacing: 10px;
  white-space: nowrap;
  text-align: center;
  display: flex;
  flex-direction: column;

  .title {
    text-shadow: 0 0 30px;
    margin-top: 20px;
    font-size: 70px;
    font-weight: 700;
  }
`;

const About = styled.a`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.5);
  background-position: center;
  bottom: 1rem;
  right: 1rem;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: background 500ms;
  text-decoration: none;

  &:hover {
    background: rgba(255, 255, 255, 0.7)
      radial-gradient(circle, transparent 1%, rgba(255, 255, 255, 0.7) 1%)
      center/15000%;
  }

  &:active {
    background-color: rgb(255, 255, 255);
    background-size: 100%;
    transition: background 0s;
  }

  i {
    font-size: 1.5rem;
    color: rgb(255, 100, 100);
  }
`;

const Modal = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(0);
  transition: transform 500ms;

  &.active {
    transform: scale(1);
  }
`;

const ModalCard = styled.div`
  position: relative;
  background-color: rgb(255, 255, 255);
  padding: 3rem 5rem;
  transform: scale(0);
  transition: transform 500ms;

  @media (min-width: 505px) {
    border-radius: 1rem;
    width: 80%;
    height: 60%;
    max-width: 600px;
    min-height: 500px;
    overflow: hidden;
  }

  &.active {
    transform: scale(1);
  }

  p {
    margin: 2rem 0;
  }
`;

const ModalClose = styled.a`
  position: absolute;
  top: 1rem;
  right: 1rem;
  border-radius: 50%;
  width: 1.8em;
  height: 1.8em;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 500ms;
  text-decoration: none;
  color: rgb(33, 33, 33);
  font-size: 2rem;
  border: 2px dashed;
  transition: color 500ms, transform 250ms;

  &:hover {
    color: rgba(33, 33, 33, 0.3);
  }

  &:active {
    transform: rotate(360deg);
  }
`;

export default ParallaxBanner;
