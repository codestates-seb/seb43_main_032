import { formatSkill } from '@/util/stack/formatSkill';
import styled from 'styled-components';

const Bubble = ({ bubbleTop, tech }: { bubbleTop?: string; tech: string }) => {
  return (
    <Box bubbleTop={bubbleTop}>
      <span>{formatSkill(tech)}</span>
    </Box>
  );
};

export default Bubble;

type BoxProps = {
  bubbleTop?: string;
};

const Box = styled.div<BoxProps>`
  white-space: nowrap;
  position: absolute;
  padding: 8px;
  font-size: 10px;
  background: #9b7aff;
  color: #fff;
  border-radius: 0.4em;
  z-index: 2;
  top: ${(props) => (props.bubbleTop ? props.bubbleTop : '-112%')};
`;
