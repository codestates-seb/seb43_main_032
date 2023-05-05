import React from 'react';
import styled from 'styled-components';

export default function PostAddPageCaution() {
  return (
    <Container>
      <h1>좋은 질문 하는 법 들어갈 공간</h1>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 300px;
  background-color: white;
  border-radius: var(--radius-def);
  padding: var(--padding-2);
`;
