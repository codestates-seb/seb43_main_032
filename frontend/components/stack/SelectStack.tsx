import { STACKS, STACKS_CATEGORIES } from '@/constant/constant';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import Stack from './Stack';
import Btn from '../button/Btn';

type Props = {
  offModal: () => void;
  stacks: string[];
  setStacks: Dispatch<SetStateAction<string[]>>;
};

const SelectStack = ({ setStacks, offModal, stacks }: Props) => {
  const categories = Object.keys(STACKS_CATEGORIES);

  //스택을 추가하는 함수
  const addStack = (stack: string) => {
    const idx = stacks.findIndex((x) => stack === x);
    if (idx !== -1) {
      return setStacks([...stacks.slice(0, idx), ...stacks.slice(idx + 1)]);
    }
    setStacks([...stacks, stack]);
  };

  //선택한 스택 리셋
  const resetStack = () => {
    setStacks([]);
  };

  return (
    <Box>
      <div>
        <div className="select-box">
          {categories.map((category) => (
            <div key={category} className="stack-box nanum-bold">
              <div>{STACKS_CATEGORIES[category]}</div>
              <ul>
                {Object.values(STACKS.find((stack) => stack[category])!)[0].map(
                  (skill) => (
                    <Stack
                      key={skill}
                      skill={skill}
                      addStack={addStack}
                      stacks={stacks}
                    />
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
        <div className="btn-box">
          <Btn onClick={resetStack}>
            <span>초기화</span>
          </Btn>
          <Btn onClick={offModal}>
            <span>선택완료</span>
          </Btn>
        </div>
      </div>
    </Box>
  );
};

export default SelectStack;

const Box = styled.div`
  position: absolute;
  top: -5%;
  width: 100%;
  display: flex;
  z-index: 11;
  justify-content: center;

  > div {
    border: 1px solid #eaebeb;
    box-shadow: var(--box-shadow);
    border-radius: var(--radius-def);
    width: 60%;
    height: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: var(--padding-1);
    padding-top: 0px;
    background-color: white;
    z-index: 2;
  }

  .select-box {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    padding: var(--padding-1);
  }

  .stack-box {
    display: flex;
    flex-direction: column;
    gap: 24px;

    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      width: 100%;
    }

    .focus {
      box-shadow: 0 2px 8px black, 0 1px 8px black;
    }
  }

  .btn-box {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 32px;
  }
`;
