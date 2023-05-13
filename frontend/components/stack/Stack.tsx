import { useState } from 'react';
import styled from 'styled-components';
import Bubble from './Bubble';

type Props = {
  skill: string;
  addStack?: (skill: string) => void;
  stacks?: string[];
};

const Stack = ({ skill, addStack, stacks }: Props) => {
  //모달
  const [modal, setModal] = useState(false);

  return (
    <Box
      onMouseEnter={() => setModal(true)}
      onMouseLeave={() => setModal(false)}
      onClick={() => addStack && addStack(skill)}
      key={skill}
      className={
        stacks && stacks.includes(skill) ? `focus bg-${skill}` : `bg-${skill}`
      }
    >
      {modal && <Bubble skill={skill} />}
    </Box>
  );
};

export default Stack;

const Box = styled.li`
  position: relative;
  cursor: pointer;
  min-width: 24px;
  min-height: 24px;
  box-shadow: var(--box-shadow);
`;
