import React from 'react';
import styled from 'styled-components';
import ContentBottomFilter from './ContentBottomFilter';
import ContentItemList from './ContentItemList';

export default function ContentBottom() {
  return (
    <Container>
      <ContentBottomFilter />
      <ContentItemList />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: var(--padding);
  background: #ffffff;
  border-radius: var(--radius-xl);
`;
