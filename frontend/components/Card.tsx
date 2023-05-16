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
  padding-bottom: 5px;
  width: ${(props) => `${props.width}`};
  border: 1px solid #ebebeb;
  display: flex;
  flex-direction: column;
  justify-content: end;
  overflow: hidden;
  transition: box-shadow 0.1s ease-in-out;

  border-radius: 15px;

  @media (max-width: 960px) {
    width: 100%;
  }

  :hover {
    box-shadow: 14px 11px 12px 3px rgba(0, 0, 0, 0.06);
  }
`;
