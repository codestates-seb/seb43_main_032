import React from 'react';
import styled from 'styled-components';
import PostAddPageCaution from './PostAddPageCaution';
import PostAddPageContent from './PostAddPageContent';

export default function PostAddPage() {
  return (
    <Container>
      <PostAddPageCaution />
      <PostAddPageContent />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  background-color: gray;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: var(--padding-2);
`;
