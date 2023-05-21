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
      ? '#dfd5d5'
      : '#e4e4e4'};
  background-color: ${(props) => props.children === '확정' && '#49e256'};
  padding: 5px 10px;
  border-radius: 10px;
  min-width: 48px;
  text-align: center;
  color: ${(props) =>
    props.children === '취소' || props.children === '마감'
      ? '#f03232'
      : '#767676'};
  color: ${(props) => props.children === '확정' && '#ffffff'};
  font-size: 12px;
  font-weight: 400 !important;
  :hover {
    background-color: ${(props) =>
      props.children === '마감' ? '' : '#5b24ff'};
    background-color: ${(props) => props.children === '취소' && ' #ec5353;'};
    color: white;
  }
`;
