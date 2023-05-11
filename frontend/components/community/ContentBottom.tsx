import React from 'react';
import styled from 'styled-components';
import ContentItemList from './ContentItemList';

// 컨텐츠 보여주는 곳의 필터와 item 리스트 나눔
export default function ContentBottom() {
  return (
    <Container>
      <ContentItemList />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: var(--padding-2);
  background: #ffffff;
  border-radius: var(--radius-xl);
  position: relative;
  top: 20px;
`;
