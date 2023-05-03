import React from 'react';
import styled from 'styled-components';

export default function ContentTop() {
  return (
    <Container>
      <SearchInput placeholder="검색어를 입력하세요." />
      <SearchBtn />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 60%;
  height: 40%;
  box-shadow: 2px 2px 7px 1px rgba(114, 114, 114, 0.75);
  border-radius: var(--radius-def);
  border: none;
  margin-right: 16px;
  padding: 5px 10px;
  &:focus,
  :active {
    outline: none;
    border: none;
  }
  /* ::placeholder */
`;

const SearchBtn = styled.button`
  width: 10%;
  height: 40%;
  box-shadow: 2px 2px 7px 1px rgba(114, 114, 114, 0.75);
  border-radius: var(--radius-def);
  border: none;
  background: white;
  cursor: pointer;

  &:hover {
    background-color: #6e6e6e;
  }
`;
