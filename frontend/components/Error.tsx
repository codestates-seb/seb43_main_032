import { ReactNode } from 'react';
import styled from 'styled-components';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

const Error = (props: Props) => <Box {...props} />;

export default Error;

const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 40px;
`;
