import styled from 'styled-components';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

type Props = {
  likeHandler: () => void;
  liked: boolean;
  totalLikes: number;
};

const HeartBox = ({ totalLikes, liked, likeHandler }: Props) => {
  return (
    <Box>
      <div onClick={likeHandler}>
        {liked ? (
          <span>
            <AiFillHeart />
          </span>
        ) : (
          <span>
            <AiOutlineHeart />
          </span>
        )}
        <span>{totalLikes}</span>
      </div>
    </Box>
  );
};

export default HeartBox;

const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  > div {
    gap: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 2px solid #ececec;
    border-radius: var(--radius-def);
    padding: 16px;
    min-width: 110px;
    font-size: 30px;

    > span {
      display: flex;
      justify-content: center;
      flex: 1;
      text-align: center;
    }

    > span:last-child {
      padding-bottom: 5px;
    }
  }
`;
