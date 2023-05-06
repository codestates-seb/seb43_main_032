import { ReactNode } from 'react';
import styled from 'styled-components';
type Props = {
  children: ReactNode;
};

const GridBox = (props: Props) => {
  return <Box {...props} />;
};

export default GridBox;

const Box = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-auto-flow: row;
  grid-gap: 16px;
  grid-template-columns: 3fr 9fr;
  @media (max-width: 960px) {
    display: flex;
    flex-direction: column;
  }
`;
