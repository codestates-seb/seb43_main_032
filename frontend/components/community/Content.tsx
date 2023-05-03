import React from 'react';
import styled from 'styled-components';
import ContentTop from './ContentTop';
import ContentBottom from './ContentBottom';

export default function Content() {
  return (
    <Container>
      <ContentTop />
      <ContentBottom />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ebebeb;
  padding: var(--padding);
`;
