import { useState } from 'react';
import styled from 'styled-components';

type Props = {
  skill: string;
  addStack: (skill: string) => void;
  select: string[];
};

const Stack = ({ skill, addStack, select }: Props) => {
  //모달
  const [modal, setModal] = useState(false);

  //스킬 이름 포멧팅
  const formatSkill = (str: string) => {
    let result = str.charAt(0).toUpperCase() + str.slice(1);
    if (result.includes('_')) {
      let words = result.split('_');
      words = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
      if (words[1].length === 2 || words[1].length === 3) {
        words[1] = words[1].toUpperCase();
      }
      result = words.join(' ');
    }
    return result;
  };

  return (
    <Box
      onMouseEnter={() => setModal(true)}
      onMouseLeave={() => setModal(false)}
      onClick={() => addStack(skill)}
      key={skill}
      className={select.includes(skill) ? `focus bg-${skill}` : `bg-${skill}`}
    >
      {modal && (
        <div className="speech-bubble">
          <span>{formatSkill(skill)}</span>
        </div>
      )}
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
  .speech-bubble {
    white-space: nowrap;
    position: absolute;
    padding: 8px;
    top: -40px;
    left: 30px;
    font-size: 12px;
    background: var(--main-color-1);
    border-radius: 0.4em;
    z-index: 2;
  }

  .speech-bubble:after {
    content: '';
    position: absolute;
    left: 0;
    top: 70%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-right-color: var(--main-color-1);
    border-left: 0;
    border-bottom: 0;
    margin-top: -10px;
    margin-left: -16px;
    transform: rotate(-15deg);
  }
`;
