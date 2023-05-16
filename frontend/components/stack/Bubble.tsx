import { formatSkill } from '@/util/stack/formatSkill';
import styled from 'styled-components';

const Bubble = ({ skill }: { skill: string }) => {
  return (
    <Box>
      <span>{formatSkill(skill)}</span>
    </Box>
  );
};

export default Bubble;

const Box = styled.div`
  white-space: nowrap;
  position: absolute;
  padding: 8px;
  top: -40px;
  left: 30px;
  font-size: 12px;
  background: #256ce1;
  color: #fff;
  border-radius: 0.4em;
  z-index: 2;

  :after {
    content: '';
    position: absolute;
    left: 0;
    top: 70%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-right-color: #256ce1;
    border-left: 0;
    border-bottom: 0;
    margin-top: -10px;
    margin-left: -16px;
    transform: rotate(-15deg);
  }
`;
