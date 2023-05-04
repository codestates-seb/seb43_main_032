import { ReactNode } from 'react';
import styled from 'styled-components';
type Props = {
  children: ReactNode;
};

const Tag = (props: Props) => {
  return <TagBox {...props} />;
};

export default Tag;

const TagBox = styled.div`
  background-color: #d9d9d9;
  padding: 5px;
  border-radius: var(--radius-sm);
  min-width: 48px;
  text-align: center;
`;
