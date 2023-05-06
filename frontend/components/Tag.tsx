import { ReactNode } from 'react';
import styled from 'styled-components';
type Props = React.HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

const Tag = (props: Props) => {
  return <TagBox className="tag" {...props} />;
};

export default Tag;

const TagBox = styled.div<Props>`
  background-color: ${(props) =>
    props.children === '취소' || props.children === '마감'
      ? '#f8baba'
      : '#d9d9d9'};
  padding: 5px;
  border-radius: var(--radius-sm);
  min-width: 48px;
  text-align: center;
  :hover {
    background-color: ${(props) =>
      props.children === '마감' ? '' : '#e1e7e5'};
  }
`;
