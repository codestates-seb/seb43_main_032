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
import Tag from '../Tag';
import { useRouter } from 'next/router';
import { errorAlert } from '../alert/Alert';
import { postStar } from '@/util/api/postStar';
import SubBtn from '../button/SubBtn';

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
  articleRefetch: () => void;
  answerRefetch: () => void;
};

const AnswerItem = ({
  answer,
  deleteAnswer,
  editAnswer,
  isAuthor,
  likeAnswer,
  dislikeAnswer,
  articleRefetch,
  answerRefetch,
}: Props) => {
  const router = useRouter();
  //답글 수정 관련
  const [edit, setEdit] = useState(false);
  const [editVal, setEditVal] = useState('');

  //editval 세팅
  useEffect(() => {
    setEditVal(answer.content);
  }, []);
  const onEdit = () => {
    setEdit(true);
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
    if (!getCookie('accessToken')) {
      return errorAlert('로그인을 부탁드려요', '답글 좋아요');
    }
    if (answer.liked) {
      postStar(answer.memberInfo.memberId, -1);
      return dislikeEvent();
    }
    postStar(answer.memberInfo.memberId, 1);
    likeEvent();
  };

  //답글 input 관련
  const [comment, setComment] = useState(false);
  const commentHandler = () => {
    if (!getCookie('accessToken') && !comment) {
      return errorAlert('로그인이 필요합니다.', '답글 작성');
    }
    setComment(!comment);
  };

  //답글 데이터
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
      articleRefetch,
      answerRefetch,
    });

  //답글 조회
  const [viewComment, setViewComment] = useState(false);
  const viewCommentHandler = () => {
    setViewComment(!viewComment);
  };

  //작성자 페이지로 이동
  const moveAuthorPage = (memberId: number) => {
    router.push(`/users/${memberId}`);
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
              <SubBtn onClick={editEvent}>수정 완료</SubBtn>
              <SubBtn onClick={offEdit}>수정 취소</SubBtn>
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
                    <div className="user-id">
                      <span
                        onClick={() =>
                          moveAuthorPage(answer.memberInfo.memberId)
                        }
                        className="author-id"
                      >
                        {answer.memberInfo.name}
                      </span>
                      {answer.author && <Tag>작성자</Tag>}
                    </div>
                    <div className="user-star">
                      <AiFillStar fill="rgb(255, 153, 0)" />
                      {answer.memberInfo.totalStar}
                    </div>
                  </div>
                </div>
                <div className="like-box" onClick={likeHandler}>
                  <div className="like-num">
                    {answer.totalLikes > 100 ? '99+' : answer.totalLikes}
                  </div>
                  {answer.liked ? (
                    <RiThumbUpFill size={16} fill="#d2c4ff" />
                  ) : (
                    <RiThumbUpLine size={16} fill="#8217f3 " />
                  )}
                </div>
              </div>
              <div className="content">{answer.content}</div>
              <div className="bottom">
                <div className="update-box">
                  {commentLength !== undefined && commentLength > 0 && (
                    <button onClick={viewCommentHandler}>
                      답글 {commentLength}개
                    </button>
                  )}
                  <button onClick={commentHandler}>
                    {comment ? '답글 취소' : '답글 작성'}
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

  .author-id {
    cursor: pointer;
  }

  .edit-box {
    position: absolute;
    display: flex;
    gap: 16px;
    right: 32px;
    top: 22px;
    > button {
      padding: 4px;
    }
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
          > img {
            border-radius: 50%;
            height: 100%;
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
            display: flex;
            align-items: center;
            gap: 4px;
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
        min-width: 74px;
        padding: 4px 10px;
        border: 1px solid rgb(215, 226, 235);
        border-radius: 5px;
        cursor: pointer;
        .like-num {
          flex: 1;
          text-align: end;
        }
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
