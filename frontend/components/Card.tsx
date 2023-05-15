import React, { ReactNode } from 'react';
import styled from 'styled-components';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  width: string;
  onClick?: () => void;
};

const Card = (props: Props) => <Box {...props} />;

export default Card;

const Box = styled.div<Props>`
  position: relative;
  cursor: pointer;
  padding-bottom: 30px;
  width: ${(props) => `${props.width}`};
  border: 2px solid #e4e4e4;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
  transition: transform 90ms ease-in-out;

  @media (max-width: 960px) {
    width: 100%;
  }

  :hover {
    transform: translateY(-20px);
    border: solid 4px;
  }
`;
