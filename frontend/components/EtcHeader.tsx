import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Logo from '../public/images/logoWhite.svg';

export default function EtcHeader() {
  return (
    <Container>
      <a href="/">
        <Image src={Logo} alt="logo" />
      </a>
    </Container>
  );
}

const Container = styled.div`
  padding: 0px calc((100% - 1280px) / 2);
  height: 60px;
  position: fixed;
  display: flex;
  align-items: center;

  img {
    height: 30px;
  }
`;
