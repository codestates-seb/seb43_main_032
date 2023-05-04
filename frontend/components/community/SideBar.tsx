import GridBox from '@/components/GridBox';
import React from 'react';
import styled from 'styled-components';

export default function SideBar() {
  const categoryTitle = ['질문하기', '프론트엔드', '백엔드', 'UX/UI'];

  return (
    <Container>
      {categoryTitle.map((title, idx) => (
        <Item className="nanum-regular" key={idx}>
          {title}
        </Item>
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--padding-2);
  box-shadow: 5px 0px 7px 0px rgba(122, 122, 122, 0.5);
`;

const Item = styled.button`
  width: 80%;
  background-color: white;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  margin-bottom: 16px;
  box-shadow: 2px 2px 7px 1px rgba(114, 114, 114, 0.75);

  &:first-child {
    background: #5959cb;
    color: white;

    &:hover {
      background: #2020ff !important;
    }
  }

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    color: white;
    background-color: gray;
    cursor: pointer;
  }
`;
