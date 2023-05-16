import styled from 'styled-components';
import Stack from '../stack/Stack';
import Btn from '../button/Btn';

type Props = {
  stacks: string[];
  onModal?: () => void;
};

const StacksBox = ({ stacks, onModal }: Props) => {
  return (
    <Box>
      <div className="title">프로젝트 메인 스택</div>
      <ul className="noto-regular-13">
        <li className="button-box">
          {stacks.length === 0 && onModal ? (
            <Btn onClick={onModal}>
              <span>스택 등록</span>
            </Btn>
          ) : (
            <ul onClick={onModal} className="select-tag-box">
              {stacks.map((skill) => (
                <Stack key={skill} skill={skill} />
              ))}
            </ul>
          )}
        </li>
      </ul>
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
    > li {
      box-shadow: var(--box-shadow);
    }
  }
`;
