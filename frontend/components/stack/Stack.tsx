import { useState } from 'react';
import styled from 'styled-components';
import Bubble from './Bubble';

type Props = {
  tech: string;
  addStack?: (tech: string) => void;
  stacks?: string[];
};

const Stack = ({ tech, addStack, stacks }: Props) => {
  //모달
  const [modal, setModal] = useState(false);

  return (
    <Box
      onMouseEnter={() => setModal(true)}
      onMouseLeave={() => setModal(false)}
      onClick={() => addStack && addStack(tech)}
      key={tech}
      className={
        stacks && stacks.includes(tech) ? `focus bg-${tech}` : `bg-${tech}`
      }
    >
      {modal && <Bubble tech={tech} />}
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
