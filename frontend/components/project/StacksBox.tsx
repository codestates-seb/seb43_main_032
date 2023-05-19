import styled from 'styled-components';
import Stack from '../stack/Stack';
import Btn from '../button/Btn';
import { Tech } from '@/types/project';
import SelectStack from '../stack/SelectStack';
import { useRouter } from 'next/router';

type Props = {
  stacks: Tech[];
  onModal?: () => void;
  selectStack: () => void;
  setStacks: React.Dispatch<React.SetStateAction<Tech[]>>;
  stack: boolean;
};

const StacksBox = ({
  stacks,
  onModal,
  selectStack,
  setStacks,
  stack,
}: Props) => {
  const router = useRouter().pathname;

  return (
    <Box>
      <div className="title">프로젝트 메인 스택</div>
      <ul className="noto-regular-13">
        <li className="button-box">
          {stacks.length === 0 && onModal ? (
            <Btn onClick={onModal}>
              <span>+</span>
            </Btn>
          ) : (
            <ul onClick={onModal} className="select-tag-box">
              {stacks.map((tech) => (
                <Stack key={tech.tech} tech={tech.tech} />
              ))}
              {router !== '/project/[id]' && (
                <Btn onClick={onModal}>
                  <span>+</span>
                </Btn>
              )}
            </ul>
          )}
        </li>
      </ul>
      {stack && (
        <SelectStack
          selectStack={selectStack}
          stacks={stacks}
          setStacks={setStacks}
        />
      )}
    </Box>
  );
};

export default StacksBox;

type BoxProps = {
  onModal?: () => void;
};

const Box = styled.div<BoxProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 30px;
  margin-bottom: 44px;

  > ul {
    margin-bottom: 12px;
  }

  > .title {
    font-size: 15px;
    margin-bottom: 10px;
    font-weight: 500;
  }

  .main-btn {
    padding: 4px;
  }

  .select-tag-box {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    > .button-box {
      box-shadow: var(--box-shadow);
    }
  }

  .search-btn {
    width: 24px;
    height: 24px;
    background: #9b7aff;
    border: none;
    border-radius: 3px;
    color: white;
    cursor: pointer;
    transition: background 0.3s ease;

    :hover {
      background: #6333ff;
    }

    > span {
      font-size: 20px;
    }
  }
`;
