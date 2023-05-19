import styled from 'styled-components';
import EiditorSkeleton from './skeleton/EiditorSkeleton';
import dynamic from 'next/dynamic';
import hljs from 'highlight.js';
import Pagenation from './Pagenation';
import { RiThumbUpFill, RiThumbUpLine } from 'react-icons/ri';
import { AiFillStar } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useGetAnswer } from '@/hooks/react-query/answer/useGetAnswer';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { loggedInUserState } from '@/recoil/atom';

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
  maxHeight: '120px',
  spellChecker: false, //스펠체크 off
  status: false, //우측 하단 상태
  previewClass: ['markdown-body'], //github 마크다운 사용
  hideIcons: ['guide', 'fullscreen', 'side-by-side'], //버튼 가리기
};

type Props = {
  answerPageHandler: (page: number) => void;
  answerPage: number;
};

type Form = {
  category: 'PROJECT' | 'ARTICLE';
  postId: number;
  params: string;
};

const AnswerBox = ({ answerPageHandler, answerPage }: Props) => {
  //유저 데이터
  const loggedInUser = useRecoilValue(loggedInUserState);
  const router = useRouter();
  const { id } = router.query;

  //댓글 editor 관리
  const [answerVal, setAnswerVal] = useState('');
  const changeAnswerVal = (value: string) => {
    setAnswerVal(value);
  };

  //임시 댓글 작성 이벤트
  const addAnswer = () => {
    if (answerVal === '') {
      return alert('내용을 작성해주세요.');
    }
    if (!loggedInUser) {
      return alert('로그인을 해주세요.');
    }
    setAnswerVal('');
  };

  //댓글 호출 폼
  const getForm: Form = router.asPath.includes('project')
    ? {
        category: 'PROJECT',
        postId: Number(id),
        params: `size=5&page=${answerPage}`,
      }
    : {
        category: 'ARTICLE',
        postId: Number(id),
        params: `size=5&page=${answerPage}`,
      };

  //게시글에 해당하는 답글 데이터
  const { answerQuery, answerRefetch, answerPageCount } = useGetAnswer(getForm);

  //답글 데이터
  const answerData = answerQuery.data?.data;

  //답글 페이지가 바뀌면 refetch를 실행하기 위한 effect긴한데 answer페이지가 이미 상태로 들어가있어서 필요없을수도?? 상황보고 지울듯
  useEffect(() => {
    answerRefetch();
  }, [answerPage]);

  return (
    <Box>
      <div className="comment-write-box">
        <div className="comment-submit-box">
          <button onClick={addAnswer}>답글 작성</button>
        </div>
        <Editor
          content={answerVal}
          commentOptions={ANSWER_OPTIONS}
          changeContent={changeAnswerVal}
          type={'answer'}
        />
      </div>
      <div className="view-comment">
        <ul>
          {answerData &&
            answerData.map((answer, i) => (
              <li className="comment" key={`${answer}+${i}`}>
                <div className="like-box">
                  {/* 좋아요 추가되면 넣을 듯?*/}
                  {true ? (
                    <RiThumbUpLine size={30} />
                  ) : (
                    <RiThumbUpFill size={30} />
                  )}
                </div>
                <div className="content-box">
                  <div className="top">{answer.content}</div>
                  <div className="bottom">
                    <div className="update-box">
                      <button>댓글 작성</button>
                      <button>삭제</button>
                      <button>수정</button>
                    </div>
                    <div className="user-box">
                      <div className="user-img">
                        <img
                          src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1567008394/noticon/ohybolu4ensol1gzqas1.png"
                          alt="user"
                        />
                      </div>
                      <div className="user-detail">
                        <div className="user-id">{answer.memberInfo.name}</div>
                        <div className="user-star">
                          <AiFillStar />
                          {answer.memberInfo.totalStar}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <Pagenation
        onPageChange={answerPageHandler}
        page={answerPage}
        pageSize={answerPageCount ? Math.ceil(answerPageCount / 5) : 0}
      />
    </Box>
  );
};
export default AnswerBox;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 15px;
  > div {
    width: 100%;
  }

  .view-comment {
    ul {
      display: flex;
      flex-direction: column;
      gap: 16px;
      .comment {
        border: 1px solid black;
        min-height: 140px;
        display: flex;
        .like-box {
          min-width: 60px;
          padding: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          > svg {
            cursor: pointer;
          }
        }
        .content-box {
          display: flex;
          flex-direction: column;
          flex: 2;
          .top {
            padding: 12px;
            flex: 0.7;
          }
          .bottom {
            flex: 0.3;
            display: flex;
            justify-content: space-between;
            padding: 8px;
            .update-box {
              display: flex;
              align-items: center;
              gap: 16px;
              button {
                cursor: pointer;
              }
            }
            .user-box {
              display: flex;
              gap: 16px;
              .user-img {
                height: 40px;
                width: 40px;
                > img {
                  border-radius: 50%;
                  width: 100%;
                  height: 100%;
                }
              }
              .user-detail {
                display: flex;
                flex-direction: column;
                justify-content: center;
                .user-id {
                }
                .user-star {
                }
              }
            }
          }
        }
      }
    }
  }

  .comment-write-box {
    width: 100%;
    position: relative;
    .comment-submit-box {
      position: absolute;
      top: 6px;
      z-index: 2;
      right: 6px;
      button {
        height: 100%;
        padding: 10px 10px;
        font-size: 14px;
        border: none;
        cursor: pointer;
        transition: background 0.5s ease, color 0.5s ease;
        :hover {
          background: #9b7aff;
          color: white;
          border-radius: 5px;
        }
      }
    }
  }
`;
