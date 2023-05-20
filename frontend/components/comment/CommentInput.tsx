import { loggedInUserState } from '@/recoil/atom';
import { Form } from '@/types/types';
import { useForm } from 'react-hook-form';
import { RiThumbUpFill, RiThumbUpLine } from 'react-icons/ri';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const CommentInput = ({ commentHandler }: { commentHandler: () => void }) => {
  //유저 데이터
  const loggedInUser = useRecoilValue(loggedInUserState);

  // content 관리
  const { register, watch } = useForm<Form>();

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
        <div className="like-box">
          {/* 좋아요 추가되면 넣을 듯?*/}
          {true ? <RiThumbUpLine size={30} /> : <RiThumbUpFill size={30} />}
        </div>
        <div className="btn-box">
          <button onClick={commentHandler}>취소</button>
          <button>완료</button>
        </div>
      </div>
    </Box>
  );
};
export default CommentInput;

const Box = styled.div`
  display: flex;
  padding: 12px 20px;
  flex-direction: column;
  gap: 8px;

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
        border-bottom: 1px solid black;
        padding: 4px;
        width: 100%;
        height: 40px;
      }
    }
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    padding-top: 8px;

    .like-box {
      > svg {
        cursor: pointer;
      }
    }
    .btn-box {
      display: flex;
      gap: 16px;
    }
  }
`;
