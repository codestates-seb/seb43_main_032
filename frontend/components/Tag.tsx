import { ReactNode } from 'react';
import styled from 'styled-components';
type Props = {
  children: ReactNode;
};

const Tag = (props: Props) => {
  console.log(props.children);
  return <TagBox className="tag" {...props} />;
};

export default Tag;

const TagBox = styled.div<Props>`
  background-color: ${(props) =>
    props.children === '취소' ? '#f8baba' : '#d9d9d9'};
  padding: 5px;
  border-radius: var(--radius-sm);
  min-width: 48px;
  text-align: center;
`;
