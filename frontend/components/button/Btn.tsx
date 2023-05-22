import React, { ReactNode } from 'react';
import styled from 'styled-components';

type Props = React.HTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

const Btn = (props: Props) => {
  return <Box className="search-btn" {...props} />;
};

export default Btn;

const Box = styled.button``;
