import { STACKS, STACKS_CATEGORIES } from '@/constant/constant';
import { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import Stack from './Stack';

type Props = {
  offModal: () => void;
  select: string[];
  setSelect: Dispatch<SetStateAction<string[]>>;
};

const SelectStack = ({ setSelect, offModal, select }: Props) => {
  const categories = Object.keys(STACKS_CATEGORIES);

  const addStack = (stack: string) => {
    const idx = select.findIndex((x) => stack === x);
    if (idx !== -1) {
      return setSelect([...select.slice(0, idx), ...select.slice(idx + 1)]);
    }
    setSelect([...select, stack]);
  };

  const resetStack = () => {
    setSelect([]);
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
                    <Stack skill={skill} addStack={addStack} select={select} />
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
        <div className="btn-box">
          <button onClick={resetStack}>초기화</button>
          <button onClick={offModal}>선택완료</button>
        </div>
      </div>
    </Box>
  );
};

export default SelectStack;

const Box = styled.div`
  position: absolute;
  top: 2%;
  width: 100%;
  display: flex;
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
    width: 30%;
    display: flex;
    justify-content: space-between;
    button {
      min-width: 80px;
      cursor: pointer;
      border: none;
      box-shadow: var(--box-shadow);
      padding: 8px;
      border-radius: var(--radius-def);
      background-color: #8216f5;
      color: white;
    }
  }
`;
