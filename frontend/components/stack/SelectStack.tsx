import { STACKS, STACKS_CATEGORIES } from '@/constant/constant';
import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import Stack from './Stack';
import Btn from '../button/Btn';
import { Tech } from '@/types/project';

type Props = {
  selectStack?: () => void;
  stacks: Tech[];
  setStacks?: Dispatch<SetStateAction<Tech[]>>;
};

const SelectStack = ({ setStacks, selectStack, stacks }: Props) => {
  const categories = useMemo(() => Object.keys(STACKS_CATEGORIES), []);

  //스택을 추가하는 함수
  const addStack = (select: string) => {
    if (setStacks) {
      const idx = stacks.findIndex((stack) => select === stack.tech);
      if (idx !== -1) {
        return setStacks([...stacks.slice(0, idx), ...stacks.slice(idx + 1)]);
      }
      setStacks([...stacks, { tech: select }]);
    }
  };

  //선택한 스택 리셋
  const resetSelectedStacks = useCallback(() => {
    if (setStacks) setStacks([]);
  }, []);

  return (
    <Box>
      <div>
        <div className="btn-box">
          <div>
            <Btn onClick={resetSelectedStacks}>
              <span>초기화</span>
            </Btn>
            <Btn onClick={selectStack}>
              <span>완료</span>
            </Btn>
          </div>
        </div>
        <div className="select-box">
          {categories.map((category) => (
            <div key={category} className="stack-box nanum-bold">
              <div className="category">{STACKS_CATEGORIES[category]}</div>
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
      </div>
    </Box>
  );
};

export default SelectStack;

const Box = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;

  > div {
    overflow-y: scroll;
    overflow-x: hidden;
    position: relative;
    border: solid 2px #ececec;
    border-radius: var(--radius-def);

    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: white;
    z-index: 2;

    ::-webkit-scrollbar {
      width: 10px;
    }

    ::-webkit-scrollbar-thumb {
      height: 30%;
      background: #8217f3;

      border-radius: 10px;
    }

    ::-webkit-scrollbar-track {
      background: rgba(33, 122, 244, 0.1);
    }
  }

  .select-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 24px;
    padding: 0 20px;
  }

  .stack-box {
    display: flex;
    margin-top: 32px;
    flex-direction: column;

    &:first-child {
      margin-top: 16px;
    }

    .category {
      font-size: 15px;
      padding-left: 10px;
      border-left: solid 3px #6333ff;
    }

    ul {
      margin-top: 16px;
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      width: 100%;
    }
  }

  .btn-box {
    width: 100%;
    position: sticky;
    display: flex;
    top: 0px;
    justify-content: center;
    gap: 8px;
    padding: 8px 0px;
    background-color: white;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
    z-index: 10;

    > div {
      display: flex;
      gap: 16px;
    }

    .search-btn {
      background: #9b7aff;
      padding: 8px 20px;
      color: white;
      border-radius: 5px;
      border: none;
      transition: background 0.3s ease-out;
      width: 100%;
      height: auto;

      span {
        white-space: nowrap;
        font-size: 12px;
        font-weight: 500;
      }

      :hover {
        background: #6333ff;
      }
    }
  }
`;
