import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import logo from '@/public/images/logoSymbolWhite.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function EtcHeader() {
  const router = useRouter();

  return (
    <Container>
      <Image src={logo} alt="logo" onClick={() => router.push('/')} />
      <span className="about" onClick={() => router.push('/about')}>
        서비스 소개
      </span>
    </Container>
  );
}

const Container = styled.div`
  padding: 0px calc((100% - 1280px) / 2);
  width: 100%;
  height: 60px;
  position: fixed;
  display: flex;
  z-index: 100;
  align-items: center;
  justify-content: space-between;

  img {
    height: 30px;
    cursor: pointer;
  }

  .about {
    font-size: 18px;
    color: white;
    cursor: pointer;
    padding-right: 40px;
  }
`;
