import { navModalState } from '@/recoil/atom';
import { NavProps } from '@/types/types';
import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

export default function ModalBg() {
  const [nav, setNav] = useRecoilState(navModalState);

  return <ModalNavBg nav={nav} onClick={() => setNav(!nav)}></ModalNavBg>;
}

const ModalNavBg = styled.div<NavProps>`
  position: fixed;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100vh;
  right: ${(props) => (props.nav ? '0' : '-100%')};
  transition: 0.6s;
`;
