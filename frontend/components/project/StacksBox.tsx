import styled from 'styled-components';
import Stack from '../stack/Stack';

type Props = {
  select: string[];
  onModal?: () => void;
};

const StacksBox = ({ select, onModal }: Props) => {
  return (
    <Box onModal={onModal}>
      <div>프로젝트 메인 스택</div>
      <ul className="noto-regular-13">
        <li className="button-box">
          {select.length === 0 && onModal ? (
            <button onClick={onModal}>스택 등록</button>
          ) : (
            <ul onClick={onModal} className="select-tag-box">
              {select.map((skill) => (
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
  align-items: center;
  justify-content: center;
  flex-direction: column;
  > ul {
    cursor: ${(props) => (props.onModal ? 'pointer' : '')};
  }
  .select-tag-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    > li {
      box-shadow: var(--box-shadow);
    }
  }
`;
