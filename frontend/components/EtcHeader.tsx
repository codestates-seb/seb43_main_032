import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Logo from '../public/images/logoWhite.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function EtcHeader() {
  const router = useRouter();

  return (
    <Container>
      <Image src={Logo} alt="logo" onClick={() => router.push('/')} />
    </Container>
  );
}

const Container = styled.div`
  padding: 0px calc((100% - 1280px) / 2);
  height: 60px;
  position: fixed;
  display: flex;
  z-index: 100;
  align-items: center;

  img {
    height: 30px;
    cursor: pointer;
  }
`;
