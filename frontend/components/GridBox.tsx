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
  width: 100%;
  display: grid;
  grid-auto-flow: row;
  grid-gap: 16px;
  grid-template-columns: 3fr 9fr;
`;
