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
import styled from 'styled-components';
import { confirmAlert } from '../alert/Alert';
import Tag from '../Tag';
import { useRouter } from 'next/router';
import { postStar } from '@/util/api/postStar';

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
  const router = useRouter();
  //content 관리
  const { register, watch } = useForm<{ content: string }>();

  //댓글 수정
  const [edit, setEdit] = useState(false);
  const editHandler = () => {
    setEdit(!edit);
  };

  //이벤트 함수들
  const deleteEvent = () => {
    confirmAlert('정말 삭제하시겠습니까?', '댓글 삭제가').then(() =>
      deleteComment.mutate({ commentId: comment.commentId })
    );
  };

  const editEvent = () => {
    confirmAlert('정말 댓글을 수정하시겠습니까?', '댓글 수정이').then(() => {
      const data = {
        commentId: comment.commentId,
        content: watch().content,
      };
      editComment.mutate(data);
      setEdit(false);
    });
  };
  const likeEvent = () => {
    likeComment.mutate({ category: 'COMMENT', uniteId: comment.commentId });
  };
  const dislikeEvent = () => {
    dislikeComment.mutate({ category: 'COMMENT', uniteId: comment.commentId });
  };
  const likeHandler = () => {
    if (comment.liked) {
      postStar(comment.memberInfo.memberId, -1);
      return dislikeEvent();
    }
    postStar(comment.memberInfo.memberId, 1);
    likeEvent();
  };

  //작성자 페이지로 이동
  const moveAuthorPage = (memberId: number) => {
    router.push(`/users/${memberId}`);
  };

  return (
    <Box>
      <div className="top">
        <div className="left">
          <img src={comment.memberInfo.profileImageUrl} alt="user" />
          <div className="id-box">
            <span
              onClick={() => moveAuthorPage(comment.memberInfo.memberId)}
              className="author-id"
            >
              {comment.memberInfo.name}
            </span>
            {comment.author && <Tag>작성자</Tag>}
          </div>
        </div>
        <div onClick={likeHandler} className="right">
          <div className="like-num">
            {comment.totalLikes > 100 ? '99+' : comment.totalLikes}
          </div>
          {comment.liked ? (
            <RiThumbUpFill size={12} />
          ) : (
            <RiThumbUpLine size={12} />
          )}
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

  .author-id {
    cursor: pointer;
  }

  .top {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .left {
      width: 70%;
      display: flex;

      > img {
        border-radius: 50%;
        background: wheat;
        width: 32px;
        height: 32px;
      }

      .id-box {
        margin-left: 16px;
        display: flex;
        align-items: center;
        gap: 4px;
      }
    }

    .right {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 5px;
      min-width: 55px;
      border: 1px solid rgb(215, 226, 235);
      border-radius: 5px;
      cursor: pointer;

      .like-num {
        font-size: 12px;
        flex: 1;
        text-align: end;
      }
    }
  }

  .middle {
    input {
      width: 100%;
      padding: 4px;
      padding-bottom: 10px;
      border: none;
      outline: none;
      border-bottom: 1px solid #d1cfcf;
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
