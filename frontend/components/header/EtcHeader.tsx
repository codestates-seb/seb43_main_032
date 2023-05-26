import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import logo from '../../public/images/logo.svg';
import logoWhite from '../../public/images/logoSymbolWhite.svg';
import { useRouter } from 'next/router';

export default function EtcHeader() {
  const router = useRouter();

  //스크롤 높이 상태
  const [isScrolled, setIsScrolled] = useState(false);

  //스크롤 높이 상태 핸들러
  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  //스크롤이 10이상 내려오면 네비바의 배경을 입혀주기 위한 이펙트
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    if (window.scrollY > 10) {
      setIsScrolled(true);
    }
  }, []);

  return (
    <Container isScrolled={isScrolled}>
      <Image
        src={isScrolled ? logo : logoWhite}
        alt="logo"
        onClick={() => router.push('/')}
      />
      <span className="about" onClick={() => router.push('/about')}>
        서비스 소개
      </span>
    </Container>
  );
}

type ContainerProps = {
  isScrolled: boolean;
};

const Container = styled.div<ContainerProps>`
  padding: 0px calc((100% - 1280px) / 2);
  width: 100%;
  height: 60px;
  position: fixed;
  display: flex;
  z-index: 100;
  align-items: center;
  justify-content: space-between;
  background: ${(props) => (props.isScrolled ? 'white' : '')};

  img {
    height: 30px;
    cursor: pointer;
  }

  .about {
    font-size: 18px;
    color: white;
    cursor: pointer;
    padding-right: 40px;
    color: ${(props) => (props.isScrolled ? 'black' : '')};
  }
`;
