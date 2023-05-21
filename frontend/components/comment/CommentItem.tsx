import { loggedInUserState } from '@/recoil/atom';
import {
  Comment,
  DeleteCommentMutation,
  EditCommentMutation,
  LikeCommentMutation,
} from '@/types/comment';
import { elapsedTime } from '@/util/date';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiThumbUpFill, RiThumbUpLine } from 'react-icons/ri';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

type Props = {
  comment: Comment;
  editComment: EditCommentMutation;
  deleteComment: DeleteCommentMutation;
  likeComment: LikeCommentMutation;
  dislikeComment: LikeCommentMutation;
};

const CommentItem = ({
  dislikeComment,
  likeComment,
  comment,
  deleteComment,
  editComment,
}: Props) => {
  //content 관리
  const { register, watch } = useForm<{ content: string }>();

  //댓글 수정
  const [edit, setEdit] = useState(false);
  const editHandler = () => {
    setEdit(!edit);
  };

  //이벤트 함수들
  const deleteEvent = () => {
    if (confirm('정말 댓글을 삭제하시겠습니까?'))
      deleteComment.mutate({ commentId: comment.commentId });
  };
  const editEvent = () => {
    if (confirm('정말 댓글을 수정하시겠습니까?')) {
      const data = {
        commentId: comment.commentId,
        content: watch().content,
      };
      editComment.mutate(data);
      setEdit(false);
    }
  };
  const likeEvent = () => {
    likeComment.mutate({ category: 'COMMENT', uniteId: comment.commentId });
  };
  const dislikeEvent = () => {
    dislikeComment.mutate({ category: 'COMMENT', uniteId: comment.commentId });
  };

  return (
    <Box>
      <div className="top">
        <div className="left">
          <img src={comment.memberInfo.profileImageUrl} alt="user" />
          <div className="id-box">
            <span>{comment.memberInfo.name}</span>
          </div>
        </div>
        <div className="right">
          {comment.liked ? (
            <RiThumbUpFill onClick={dislikeEvent} size={12} />
          ) : (
            <RiThumbUpLine onClick={likeEvent} size={12} />
          )}
          <div className="like-num">100</div>
        </div>
      </div>
      <div className="middle">
        {edit ? (
          <input
            {...register('content', { value: comment.content })}
            type="text"
          />
        ) : (
          <>{comment.content}</>
        )}
      </div>
      <div className="bottom">
        {comment.author && (
          <>
            <div className="button-box">
              <button onClick={editHandler}>{edit ? '취소' : '수정'}</button>
              {edit ? (
                <button onClick={editEvent}>완료</button>
              ) : (
                <button onClick={deleteEvent}>삭제</button>
              )}
            </div>
          </>
        )}
        <span className="date">{elapsedTime(new Date(comment.createdAt))}</span>
      </div>
    </Box>
  );
};

export default CommentItem;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0px 0px 16px 30px;
  border: 2px solid #ececec;
  min-height: 100px;
  gap: 8px;
  border-radius: 10px;
  padding: 10px 20px;

  .top {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .left {
      width: 70%;
      display: flex;

      > img {
        background: wheat;
        width: 32px;
        height: 32px;
      }

      .id-box {
        margin-left: 16px;
      }
    }

    .right {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 5px;
      border: 1px solid rgb(215, 226, 235);
      border-radius: 5px;
      cursor: pointer;

      > input {
        width: 100%;
        padding: 4px;
        border: none;
        border-bottom: 1px solid black;
      }

      .like-num {
        font-size: 12px;
      }
    }
  }

  .bottom {
    display: flex;
    justify-content: space-between;

    .button-box {
      display: flex;
      gap: 8px;
      
      button {
        font-family: 'Pretendard';
        cursor: pointer;
        padding: 2px 10px;
        background: none;
        border: 1px solid rgb(215, 226, 235);
        border-radius: 5px;
        color: #171717;
        -webkit-transition: all 0.3s ease;
        transition: all 0.3s ease;
      }
    }

    .date {
      font-size: 12px;
      color: rgb(204, 206, 208);
    }
  }
`;
