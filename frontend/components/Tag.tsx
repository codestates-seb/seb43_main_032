import { TAG_COLOR } from '@/constant/constant';
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
  background-color: ${({ children }) =>
    TAG_COLOR.find((tag) => tag.name === children)?.backgroundColor ||
    '#e4e4e4'};
  padding: 5px 10px;
  border-radius: 10px;
  min-width: 48px;
  text-align: center;
  color: ${({ children }) =>
    TAG_COLOR.find((tag) => tag.name === children)?.color || '#767676'};
  font-size: 12px;
  font-weight: 400 !important;

  :hover {
    background-color: ${({ children }) =>
      children !== '마감' &&
      (TAG_COLOR.find((tag) => tag.name === children && tag.type === 'hover')
        ?.backgroundColor ||
        '#5b24ff')};
    color: ${({ children }) =>
      TAG_COLOR.find((tag) => tag.name === children && tag.type === 'hover')
        ?.color || 'white'};
  }
`;
