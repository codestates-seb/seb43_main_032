import React from 'react';
import styled from 'styled-components';

export default function ContentBottomFilter() {
  return (
    <Container>
      <FilterBtn></FilterBtn>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  height: 10%;
  padding: 10px;
`;

const FilterBtn = styled.select`
  width: 200px;
  height: 30px;
  margin-right: 20px;
  border-radius: var(--radius-def);
`;
