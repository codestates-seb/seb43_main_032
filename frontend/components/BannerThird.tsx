import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

export default function BannerThird() {
  return <ImgContainer></ImgContainer>;
}

const ImgContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  height: 660px;
  background-color: gray;
`;
