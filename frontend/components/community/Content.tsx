import React from 'react';
import styled from 'styled-components';
import ContentTop from './ContentTop';
import ContentBottom from './ContentBottom';

// community 페이지 우측 컨텐츠
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
  padding: var(--padding-2);
`;
