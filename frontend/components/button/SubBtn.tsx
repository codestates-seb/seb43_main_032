import React, { ReactNode } from 'react';
import styled from 'styled-components';

type Props = React.HTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

const SubBtn = (props: Props) => {
  return <Box {...props} />;
};

export default SubBtn;

const Box = styled.button`
  position: relative;
  padding: 8px;
  background: #9b7aff;
  border: none;
  border-radius: 3px;
  color: white;
  cursor: pointer;
  transition: background 0.3s ease;
  :hover {
    background: #6333ff;
  }
  :active {
    top: 1px;
  }
`;
