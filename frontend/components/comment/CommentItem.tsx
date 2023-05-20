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
  //유저 데이터
  const loggedInUser = useRecoilValue(loggedInUserState);

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
      <div className="left">
        <img src={comment.memberInfo.profileImageUrl} alt="user" />
      </div>
      <div className="right">
        <div className="id-box">
          <span>{comment.memberInfo.name}</span>
          <span>{elapsedTime(new Date(comment.createdAt))}</span>
        </div>
        <div className="content-box">
          {edit ? (
            <input
              {...register('content', { value: comment.content })}
              type="text"
            />
          ) : (
            <>{comment.content}</>
          )}
        </div>
        <div className="like-box">
          {comment.liked ? (
            <RiThumbUpFill onClick={dislikeEvent} size={20} />
          ) : (
            <RiThumbUpLine onClick={likeEvent} size={20} />
          )}
          {loggedInUser?.email === comment.memberInfo.email && (
            <>
              <button onClick={editHandler}>{edit ? '취소' : '수정'}</button>
              {edit ? (
                <button onClick={editEvent}>완료</button>
              ) : (
                <button onClick={deleteEvent}>삭제</button>
              )}
            </>
          )}
        </div>
      </div>
    </Box>
  );
};

export default CommentItem;

const Box = styled.div`
  display: flex;
  margin: 16px 0px;
  gap: 8px;

  .right {
    width: 100%;
    .content-box {
      height: 24px;
      > input {
        width: 100%;
        padding: 4px;
        border: none;
        border-bottom: 1px solid black;
      }
    }
  }

  .left {
    width: 24px;
    height: 24px;
    > img {
      width: 100%;
      height: 100%;
    }
  }

  .id-box {
    display: flex;
    gap: 8px;
  }

  .like-box {
    display: flex;
    gap: 16px;
    > svg {
      cursor: pointer;
    }
  }
`;
