import { AiFillStar } from 'react-icons/ai';
import EiditorSkeleton from '../skeleton/EiditorSkeleton';
import dynamic from 'next/dynamic';
import hljs from 'highlight.js';
import { RiThumbUpFill, RiThumbUpLine } from 'react-icons/ri';
import {
  Answer,
  DeleteAnswerMutation,
  EditAnswerMutation,
  LikeAnswerMutation,
} from '@/types/answer';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CommentInput from '../comment/CommentInput';
import { getCookie } from '@/util/cookie';
import { useGetComment } from '@/hooks/react-query/comment/useGetComment';
import CommentBox from '../comment/CommentBox';
import { elapsedTime } from '@/util/date';
import { useComment } from '@/hooks/react-query/comment/useComment';

const Editor = dynamic(() => import('@/components/editor/Editor'), {
  ssr: false,
  loading: () => <EiditorSkeleton />,
});

//이상하게 Editor에서 조건부로 옵션을 설정하면 editor가 고장나서 상위에서 설정한 옵션을 내려주는 방식으로 해결하였음
const ANSWER_OPTIONS: EasyMDE.Options = {
  renderingConfig: {
    codeSyntaxHighlighting: true,
    hljs,
  }, //hljs 사용
  maxHeight: '67px',
  spellChecker: false, //스펠체크 off
  status: false, //우측 하단 상태
  previewClass: ['markdown-body'], //github 마크다운 사용
  hideIcons: ['guide', 'fullscreen', 'side-by-side'], //버튼 가리기
};

type Props = {
  answer: Answer;
  deleteAnswer: DeleteAnswerMutation;
  editAnswer: EditAnswerMutation;
  likeAnswer: LikeAnswerMutation;
  dislikeAnswer: LikeAnswerMutation;
  isAuthor: boolean;
};

const AnswerItem = ({
  answer,
  deleteAnswer,
  editAnswer,
  isAuthor,
  likeAnswer,
  dislikeAnswer,
}: Props) => {
  //답글 수정 관련
  const [edit, setEdit] = useState(false);
  const [editVal, setEditVal] = useState('');

  //editval 세팅
  useEffect(() => {
    setEditVal(answer.content);
  }, []);

  const onEdit = () => {
    if (confirm('정말 수정하시겠습니까?')) setEdit(true);
  };
  const offEdit = () => {
    setEdit(false);
  };
  const changeEditVal = (value: string) => {
    setEditVal(value);
  };
  const editEvent = () => {
    editAnswer.mutate({
      answerId: answer.answerId,
      content: editVal,
    });
    offEdit();
  };

  //이벤트 관련
  const deleteEvent = () => {
    deleteAnswer.mutate({ answerId: answer.answerId });
  };
  const likeEvent = () => {
    likeAnswer.mutate({ category: 'ANSWER', uniteId: answer.answerId });
  };
  const dislikeEvent = () => {
    dislikeAnswer.mutate({ category: 'ANSWER', uniteId: answer.answerId });
  };
  const likeHandler = () => {
    if (answer.liked) {
      return dislikeEvent();
    }
    likeEvent();
  };

  //댓글 input 관련
  const [comment, setComment] = useState(false);
  const commentHandler = () => {
    if (!getCookie('accessToken') && !comment) {
      return alert('로그인을 부탁드려요.');
    }
    setComment(!comment);
  };

  //댓글 데이터
  const { commentQuery, commentRefetch } = useGetComment({
    answerId: answer.answerId,
    params: 'size=999&page=1',
  });
  const commentLength = commentQuery.data?.pageInfo.totalElements;
  const commentData = commentQuery.data?.data;

  //comment 관련 함수
  const { deleteComment, editComment, likeComment, dislikeComment } =
    useComment({
      commentRefetch,
    });

  //댓글 조회
  const [viewComment, setViewComment] = useState(false);
  const viewCommentHandler = () => {
    setViewComment(!viewComment);
  };

  return (
    <>
      <Box>
        {edit ? (
          <>
            <Editor
              content={editVal}
              commentOptions={ANSWER_OPTIONS}
              changeContent={changeEditVal}
              type={'answer'}
            />
            <div className="edit-box">
              <button onClick={editEvent}>수정 완료</button>
              <button onClick={offEdit}>수정 취소</button>
            </div>
          </>
        ) : (
          <>
            <div className="content-box">
              <div className="top">
                <div className="top-left">
                  <div className="user-img">
                    <img src={answer.memberInfo.profileImageUrl} alt="user" />
                  </div>
                  <div className="user-detail">
                    <div className="user-id">{answer.memberInfo.name}</div>
                    <div className="user-star">
                      <AiFillStar fill="rgb(255, 153, 0)" />
                      {answer.memberInfo.totalStar}
                    </div>
                  </div>
                </div>
                <div className="like-box" onClick={likeHandler}>
                  {answer.liked ? (
                    <RiThumbUpFill size={16} fill="#d2c4ff" />
                  ) : (
                    <RiThumbUpLine size={16} fill="#8217f3 " />
                  )}
                  <div className="like-num">{answer.totalLikes}</div>
                </div>
              </div>
              <div className="content">{answer.content}</div>
              <div className="bottom">
                <div className="update-box">
                  {commentLength !== undefined && commentLength > 0 && (
                    <button onClick={viewCommentHandler}>
                      댓글 {commentLength}개
                    </button>
                  )}
                  <button onClick={commentHandler}>
                    {comment ? '댓글 취소' : '댓글 작성'}
                  </button>
                  {isAuthor && (
                    <>
                      <button onClick={deleteEvent}>삭제</button>
                      <button onClick={onEdit}>수정</button>
                    </>
                  )}
                </div>
                <div className="user-box">
                  <div>{elapsedTime(new Date(answer.createdAt))}</div>
                </div>
              </div>
            </div>
          </>
        )}
      </Box>
      {comment && (
        <CommentInput answer={answer} commentHandler={commentHandler} />
      )}
      {viewComment && commentData && (
        <CommentBox
          likeComment={likeComment}
          dislikeComment={dislikeComment}
          deleteComment={deleteComment}
          editComment={editComment}
          commentData={commentData}
        />
      )}
    </>
  );
};

export default AnswerItem;

const Box = styled.li`
  width: 100%;
  border: 2px solid #ececec;
  border-radius: 10px;
  min-height: 140px;
  display: flex;
  position: relative;
  padding: 10px 20px;

  .edit-box {
    position: absolute;
    display: flex;
    gap: 16px;
    right: 8px;
    top: 12px;
  }

  .content-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 2;
    .top {
      display: flex;
      justify-content: space-between;
      border-radius: 5px;
      color: #535353;

      .top-left {
        width: 70%;
        display: flex;
        .user-img {
          width: 40px;
          height: 40px;
          background-color: black;

          > img {
            border-radius: 50%;
            width: 100%;
          }
        }
        .user-detail {
          display: flex;
          flex-direction: column;
          margin-left: 16px;
          width: 70%;
          gap: 4px;
          .user-id {
            color: #171717;
            font-size: 15px;
          }
          .user-star {
            color: #171717;
            font-size: 12px;
            vertical-align: middle;
          }
        }
      }

      .like-box {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        padding: 4px 10px;
        border: 1px solid rgb(215, 226, 235);
        border-radius: 5px;
        cursor: pointer;
      }
    }

    .bottom {
      flex: 0.3;
      display: flex;
      justify-content: space-between;
      .update-box {
        display: flex;
        align-items: center;
        gap: 8px;
        button {
          font-family: 'Pretendard';
          cursor: pointer;
          padding: 2px 10px;
          background: none;
          border: 1px solid rgb(215, 226, 235);
          border-radius: 5px;
          color: #171717;
          transition: all 0.3s ease;

          :hover {
            background: #d2c4ff;
            color: white;
          }
        }
      }
      .user-box {
        display: flex;
        align-items: center;
        gap: 16px;
        font-size: 12px;
        color: rgb(204, 206, 208);
      }
    }
  }
`;
