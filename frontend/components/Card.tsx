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
  cursor: pointer;
  padding: var(--padding-2);
  width: ${(props) => `${props.width}`};
  border: 1px solid #e4e4e4;
  border-radius: var(--radius-def);
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 960px) {
    width: 100%;
  }
`;
