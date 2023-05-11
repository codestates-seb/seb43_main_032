import React from 'react';
import styled from 'styled-components';
import PostAddPageContent from './PostAddPageContent';

export default function PostAddPage() {
  return (
    <Container>
      <PostAddPageContent />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: var(--padding-2);
`;
