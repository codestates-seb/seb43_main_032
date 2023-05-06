import styled from 'styled-components';

type Props = {
  postEvent: () => void;
};

const PostBtn = ({ postEvent }: Props) => {
  return (
    <Box>
      <button onClick={postEvent} className="nanum-bold">
        작성 완료
      </button>
    </Box>
  );
};

export default PostBtn;

const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  padding: var(--padding-2);
  button {
    cursor: pointer;
    border: none;
    padding: 8px 32px;
    border-radius: var(--radius-def);
    font-size: 18px;
    font-weight: 700;
    :hover {
      background-color: #e1e7e5;
    }
  }
`;
