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
      ? '#5b24ff'
      : '#865DFF'};
  padding: 5px 3px;
  border-radius: 10px;
  min-width: 48px;
  text-align: center;
  color: white;
  font-size: 12px;
  font-weight: 400 !important;
  :hover {
    background-color: ${(props) =>
      props.children === '마감' ? '' : '#5b24ff'};
  }
`;
