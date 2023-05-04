import { STACKS, STACKS_CATEGORIES } from '@/constant/constant';
import styled from 'styled-components';

const SelectStack = () => {
  const categories = Object.keys(STACKS_CATEGORIES);

  return (
    <Box>
      <div>
        <div className="title nanum-bold">스택을 선택해주세요.</div>
        <div className="select-box">
          {categories.map((category) => (
            <div className="stack-box nanum-bold">
              <div>{STACKS_CATEGORIES[category]}</div>
              <ul>
                {Object.values(STACKS.find((stack) => stack[category])!)[0].map(
                  (skill) => (
                    <li className={`bg-${skill}`}></li>
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
  position: absolute;
  border: 1px solid black;
  border-radius: var(--radius-def);
  width: auto;
  height: auto;
  top: 5%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: var(--padding-1);

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
      gap: 8px;
      width: 100%;
      li {
        min-width: 24px;
        min-height: 24px;
        box-shadow: 0 4px 2px hsla(0, 0%, 0%, 0.05),
          0 1px 8px hsla(0, 0%, 0%, 0.05);
      }
    }
  }
`;
