import { ReactNode } from 'react';
import styled from 'styled-components';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

const Message = (props: Props) => <Box {...props} />;

export default Message;

const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 40px;
`;
