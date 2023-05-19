import { formatSkill } from '@/util/stack/formatSkill';
import styled from 'styled-components';

const Bubble = ({ tech }: { tech: string }) => {
  return (
    <Box>
      <span>{formatSkill(tech)}</span>
    </Box>
  );
};

export default Bubble;

const Box = styled.div`
  white-space: nowrap;
  position: absolute;
  padding: 8px;
  font-size: 10px;
  background: #9b7aff;
  color: #fff;
  border-radius: 0.4em;
  z-index: 2;
  left: -50%;
  top: -110%;
`;
