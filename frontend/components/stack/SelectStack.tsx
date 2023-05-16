import { STACKS, STACKS_CATEGORIES } from '@/constant/constant';
import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import Stack from './Stack';
import Btn from '../button/Btn';
import { Tech } from '@/types/project';

type Props = {
  selectStack: () => void;
  stacks: Tech[];
  setStacks: Dispatch<SetStateAction<Tech[]>>;
};

const SelectStack = ({ setStacks, selectStack, stacks }: Props) => {
  const categories = useMemo(() => Object.keys(STACKS_CATEGORIES), []);

  //스택을 추가하는 함수
  const addStack = (select: string) => {
    const idx = stacks.findIndex((stack) => select === stack.tech);
    if (idx !== -1) {
      return setStacks([...stacks.slice(0, idx), ...stacks.slice(idx + 1)]);
    }
    setStacks([...stacks, { tech: select }]);
  };

  //선택한 스택 리셋
  const resetSelectedStacks = useCallback(() => {
    setStacks([]);
  }, []);

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
                      tech={skill}
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
          <Btn onClick={resetSelectedStacks}>
            <span>초기화</span>
          </Btn>
          <Btn onClick={selectStack}>
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

    .search-btn {
      background: #9b7aff;
      padding: 8px 20px;
      color: white;
      border-radius: 5px;
      border: none;
      font-size: 15px;
      font-weight: 500;
      transition: background 0.3s ease-out;

      :hover {
        background: #6333ff;
      }
    }
  }
`;
