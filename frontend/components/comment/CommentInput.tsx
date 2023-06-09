import { useComment } from '@/hooks/react-query/comment/useComment';
import { useGetComment } from '@/hooks/react-query/comment/useGetComment';
import { loggedInUserState } from '@/recoil/atom';
import { Answer } from '@/types/answer';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { errorAlert } from '../alert/Alert';

type Props = {
  commentHandler: () => void;
  answer: Answer;
};

const CommentInput = ({ commentHandler, answer }: Props) => {
  //유저 데이터
  const loggedInUser = useRecoilValue(loggedInUserState);

  //content 관리
  const { register, watch, reset } = useForm<{ content: string }>();

  //commentRefetch를 갖고오기 위함
  const { commentRefetch } = useGetComment({
    answerId: answer.answerId,
    params: 'size=999&page=1',
  });

  //comment 관련 함수
  const { postComment } = useComment({
    commentRefetch,
  });

  const postEvent = () => {
    if (watch().content === '') {
      return errorAlert('내용을 입력해주세요.', '댓글 작성');
    }
    const data = {
      ...watch(),
      answerId: answer.answerId,
    };
    postComment.mutate(data);
    reset();
    commentHandler();
  };

  return (
    <Box>
      <div className="top">
        <div className="user-img">
          <img src={loggedInUser?.profileImageUrl} />
        </div>
        <div className="content-box">
          <input
            {...register('content')}
            type="text"
            placeholder="댓글 추가..."
          />
        </div>
      </div>
      <div className="bottom">
        <div className="icon-box">
          {/* 아이콘 추가를 넣을걸 대비해서 만들어놓음 */}
        </div>
        <div className="btn-box">
          <button onClick={commentHandler}>취소</button>
          <button onClick={postEvent}>완료</button>
        </div>
      </div>
    </Box>
  );
};
export default CommentInput;

const Box = styled.div`
  border: 2px solid #ececec;
  border-radius: 10px;
  display: flex;
  padding: 12px 20px;
  flex-direction: column;
  gap: 8px;
  background: #f5f5f5;

  > .top {
    display: flex;
    align-items: center;
    .user-img {
      width: 40px;
      height: 40px;
      > img {
        width: 100%;
        height: 100%;
      }
    }
    .content-box {
      flex: 1;
      padding-left: 16px;
      > input {
        border: none;
        border-bottom: 1px solid #f5f5f5;
        padding: 4px;
        width: 100%;
        height: 40px;

        ::placeholder {
          font-family: 'Pretendard';
        }

        :focus {
          border-radius: 10px;
          outline: none;
          border: solid 1px #8217f3;
        }
      }
    }
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    padding-top: 8px;

    .icon-box {
    }
    .btn-box {
      display: flex;
      gap: 8px;
      button {
        font-family: 'Pretendard';
        cursor: pointer;
        padding: 2px 10px;
        background: white;
        border: 1px solid rgb(215, 226, 235);
        border-radius: 5px;
        color: #171717;
        -webkit-transition: all 0.3s ease;
        transition: all 0.3s ease;
      }
    }
  }
`;
