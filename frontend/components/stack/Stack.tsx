import { useState } from 'react';
import styled from 'styled-components';
import Bubble from './Bubble';
import { Tech } from '@/types/project';

type Props = {
  tech: string;
  addStack?: (tech: string) => void;
  stacks?: Tech[];
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
      className={`bg-${tech}`}
    >
      {stacks && stacks.some((el) => el.tech === tech) && (
        <div className="ball"></div>
      )}
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
  display: flex;
  justify-content: center;

  .ball {
    position: absolute;
    width: 10px;
    height: 10px;
    left: -5px;
    top: -5px;
    border-radius: 50%;
    background-color: #ff5454;
  }
`;
