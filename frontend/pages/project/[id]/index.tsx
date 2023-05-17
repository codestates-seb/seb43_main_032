import GridBox from '@/components/GridBox';
import Tag from '@/components/Tag';
import PeriodBox from '@/components/project/PeriodBox';
import StacksBox from '@/components/project/StacksBox';
import TagBox from '@/components/project/TagBox';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import ContentSkeleton from '@/components/skeleton/ContentSkeleton';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useProject } from '@/hooks/react-query/useProject';
import { formatDate2 } from '@/util/date';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Position from '@/components/Position';
import Message from '@/components/Message';
import { getUserData } from '@/util/api/user';
import { useRecoilValue } from 'recoil';
import { loggedInUserState } from '@/recoil/atom';
import { UserState } from '@/types/user';
import { api } from '@/util/api';
import hljs from 'highlight.js';
import EiditorSkeleton from '@/components/skeleton/EiditorSkeleton';
import Btn from '@/components/button/Btn';
const ReactMarkdown = dynamic(() => import('@/components/editor/ContentBox'), {
  ssr: false,
  loading: () => <ContentSkeleton />,
});

const Editor = dynamic(() => import('@/components/editor/Editor'), {
  ssr: false,
  loading: () => <EiditorSkeleton />,
});

//이상하게 Editor에서 조건부로 옵션을 설정하면 editor가 고장나서 상위에서 설정한 옵션을 내려주는 방식으로 해결하였음
const COMMENT_OPTIONS: EasyMDE.Options = {
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

const ViewProject = () => {
  const router = useRouter();
  useEffect(() => {
    window.scrollTo({
      top: 600,
      left: 0,
      behavior: 'smooth',
    });
  }, [router]);

  //임시 데이터
  const [userHeart, setUserHeart] = useState(false);
  const project = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  //프로젝트 데이터 요청
  const { projectQuery, updateJob, updateHeart, updateState } = useProject();
  const data = projectQuery.data?.data;
  //직군 관련
  const positions = data?.positionCrewList;

  //작성자 및 유저 데이터
  const loggedInUser = useRecoilValue(loggedInUserState);
  const [writerState, setWriterState] = useState<UserState>();
  useEffect(() => {
    if (data) getUserData(data?.memberId).then((res) => setWriterState(res));
  }, [projectQuery.isLoading]);

  //모든 지원이 꽉 찼을 때, 일어나는 이펙트
  // useEffect(() => {
  //   if (
  //     jobCount &&
  //     jobCount?.filter((x) => x.current === x.want).length == jobCount?.length
  //   ) {
  //     updateState.mutate(2);
  //   }
  // }, [projectQuery.data]);

  //프로젝트 진행상황 관리 이벤트
  const projectEvent = (state: string) => {
    if (state === '모집 완료' && confirm('정말 프로젝트를 시작하시겠습니까?')) {
      updateState.mutate(3);
    }
    if (state === '진행 중' && confirm('정말 프로젝트를 종료하시겠습니까?')) {
      updateState.mutate(4);
    }
  };

  //프로젝트 삭제
  const deleteProject = () => {
    if (confirm('정말 삭제하시겠습니까?'))
      api.delete(`/project/${data?.projectId}`).then(() => router.push('/'));
  };

  //edit 이동
  const moveEdit = () => {
    if (confirm('정말 수정하시겠습니까?')) router.push(`${router.asPath}/edit`);
  };

  //세부 기능 추가 이후에 업데이트 해야할듯??? 아마도 숫자 관리가 아닌 only string 일듯?
  const buttonState: { [key: string]: string } = {
    '모집 중': '',
    '모집 완료': '프로젝트 시작',
    '진행 중': '프로젝트 종료',
    종료: '팀원 리뷰',
  };

  //댓글 관리
  const [commentVal, setCommentVal] = useState('');
  const changeCommentVal = (value: string) => {
    setCommentVal(value);
  };

  //임시 댓글 작성 이벤트
  const addComment = () => {
    setCommentData([...commentData, commentVal]);
    setCommentVal('');
  };

  const [commentData, setCommentData] = useState<string[]>([]);

  if (projectQuery.isLoading) return <Message>로딩중입니다.</Message>;
  if (projectQuery.error) return <Message>잠시 후 다시 시도해주세요.</Message>;
  if (data)
    return (
      <GridBox>
        <Side>
          <div className="author-box">
            <div className="author noto-medium">
              <div className="top">
                <img
                  src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1567008394/noticon/ohybolu4ensol1gzqas1.png"
                  alt="author"
                />
                <div className="user-title">{writerState?.name}</div>
                <div className="noto-medium">
                  <Position text={data.writerPosition} />
                </div>
                {writerState?.email !== loggedInUser?.email && (
                  <div
                    className="saveStar"
                    onClick={() => setUserHeart(!userHeart)}
                  >
                    <span className="icon-box">
                      {userHeart ? (
                        <AiOutlineHeart fill={'#ececec'} />
                      ) : (
                        <AiFillHeart fill="red" />
                      )}
                    </span>
                  </div>
                )}
              </div>
              <div className="detail-box">
                <div className="detail-sub-box">
                  <div className="detail-num">
                    {project.length} <span>개</span>
                  </div>
                  <div className="detail-title">진행 프로젝트</div>
                </div>
                <div className="center-border"></div>
                <div className="detail-sub-box">
                  <div className="detail-num">
                    {data.totalLikes} <span>개</span>
                  </div>
                  <div className="detail-title">평가 점수</div>
                </div>
              </div>
              {writerState?.email !== loggedInUser?.email && (
                <Tag>쪽지 보내기</Tag>
              )}
            </div>
          </div>
          <PeriodBox
            start={new Date(data.startDate)}
            end={new Date(data.endDate)}
          />
          <TagBox tags={data.fieldList} />
          <StacksBox stacks={data.techStackList} />
          <div className="want-box">
            <div className="title">모집 중인 직군</div>
            <ul>
              {positions?.map((position, i) => (
                <li className="nanum-regular" key={`${position.position}+${i}`}>
                  <div className="job">{position.position}</div>
                  <div className="needNum">
                    {position.acceptedNumber}/{position.number}
                  </div>
                  <div
                    className={
                      position.acceptedNumber === position.number
                        ? 'red light'
                        : 'green light'
                    }
                  ></div>
                  {/* {position.acceptedNumber === position.number ? (
                    <Tag>마감</Tag>
                  ) : job === projectQuery.data?.post_state.want ? (
                    <Tag
                      onClick={() =>
                        updateJob.mutate({ job, update: 'cancle' })
                      }
                    >
                      취소
                    </Tag>
                  ) : (
                    <Tag
                      onClick={() =>
                        projectQuery.data?.post_state.want === '' &&
                        updateJob.mutate({ job, update: 'want' })
                      }
                    >
                      지원
                    </Tag>
                  )} */}
                </li>
              ))}
            </ul>
          </div>
          <div>
            {data.status !== '모집 중' && (
              <button onClick={() => projectEvent('모집 중')}>
                {buttonState['모집 중']}
              </button>
            )}
          </div>
        </Side>
        <Main>
          <div className="title">
            <div className="left">
              <div className="nanum-bold">{data.title}</div>
              {<Tag>{data.status}</Tag>}
            </div>
            <div className="right">
              {writerState?.email === loggedInUser?.email && (
                <>
                  <a onClick={deleteProject} className="main-btn">
                    <span>프로젝트 삭제</span>
                  </a>
                  <a onClick={moveEdit} className="main-btn">
                    <span>프로젝트 수정</span>
                  </a>
                </>
              )}
            </div>
          </div>
          <div className="sub noto-regular-13">
            <div>
              <div>
                {/* <span>작성일자</span> : {formatDate2(new Date(data.createAt))} */}
              </div>
              <div>
                <span>조회 수</span> : {data.views}
              </div>
              <div>{/* <span>댓글 수</span> : {data.comment.length} */}</div>
            </div>
          </div>
          <ReactMarkdown content={data.content} />
          <div className="heart-box">
            <div onClick={() => updateHeart.mutate()}>
              {/*서버작업전 보여주기 용 */}
              {false ? (
                <span>
                  <AiFillHeart />
                </span>
              ) : (
                <span>
                  <AiOutlineHeart />
                </span>
              )}
              <span>{data.totalLikes}</span>
            </div>
          </div>
          <div className="comment-box">
            <div>
              <ul>
                {commentData.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div className="comment-write-box">
              <div className="comment-submit-box">
                <Btn onClick={addComment}>댓글 작성</Btn>
              </div>
              <Editor
                content={commentVal}
                commentOptions={COMMENT_OPTIONS}
                changeContent={changeCommentVal}
                type={'comment'}
              />
            </div>
          </div>
        </Main>
      </GridBox>
    );
};

export default ViewProject;

const Main = styled.div`
  padding: var(--padding-1);
  display: flex;
  flex-direction: column;
  gap: 32px;

  .comment-box {
    display: flex;
    flex-direction: column;
    font-size: 15px;

    > div {
      width: 100%;
    }
    .comment-write-box {
      width: 100%;
      position: relative;
      .comment-submit-box {
        position: absolute;
        top: 13px;
        z-index: 2;
        right: 10px;
      }
    }
  }

  .title {
    display: flex;
    justify-content: space-between;
  }

  .left {
    display: flex;
  }

  .right {
    display: flex;
    gap: 16px;
    flex-direction: column;
  }

  .main-btn {
    cursor: pointer;
  }

  > div {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .sub {
    display: flex;
    width: 100%;
    justify-content: space-between;
    @media (max-width: 768px) {
      flex-direction: column;
    }
    > div:first-child {
      display: flex;
      gap: 8px;
      @media (max-width: 414px) {
        flex-direction: column;
        align-items: center;
      }
    }
  }

  .heart-box {
    width: 100%;
    display: flex;
    justify-content: center;
    > div {
      gap: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border: 1px solid #c4c4c4;
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
  }
`;

const Side = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: var(--padding-1);

  .author-box {
    border: solid 1px #c4c4c4;
    padding: 40px 30px 20px;
    border-radius: 15px;
    display: flex;
    .author {
      display: flex;
      align-items: center;
      flex-direction: column;

      .top {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
        border-bottom: solid 1px #c4c4c4;
        padding-bottom: 20px;

        > img {
          border-radius: 50%;
          box-shadow: 0px 0px 11px 11px rgba(234, 234, 234, 0.77);
        }

        > .user-title {
          color: #9f9f9f;
          font-size: 18px;
        }

        > .saveStar {
          position: absolute;
          width: 50px;
          height: 50px;
          background-color: #cecece;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          top: 0;
          right: 0;
          cursor: pointer;

          > .icon-box {
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 30px;
          }
        }
      }

      > .detail-box {
        display: flex;
        width: 80%;
        justify-content: space-between;
        margin-bottom: 24px;

        > .center-border {
          width: 1px;
          border: solid 1px #cecece;
        }

        > .detail-sub-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          > .detail-num {
            padding: 10px;
            font-size: 24px;

            > span {
              font-size: 15px;
              color: #828282;
            }
          }

          > .detail-title {
            font-size: 12px;
          }
        }
      }

      > div:last-child {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 16px;
        > div {
          font-weight: 900;
        }
        .tag {
          cursor: pointer;
        }
      }
    }
  }

  .want-box {
    width: 100%;
    padding: 0 30px;
    display: flex;
    flex-direction: column;

    > .title {
      width: 100%;
      font-size: 15px;
      margin-bottom: 10px;
      font-weight: 500;
      .left {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
    }

    .main-btn {
      > span {
        padding: 8px 24px;
      }
    }

    > ul {
      flex-direction: column;
      width: 70%;
      min-width: 190px;
      @media (max-width: 960px) {
        width: 30%;
      }
      > li {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 0px;
        border-bottom: 1px solid #e4e4e7;
        font-size: 13px;
        > div:first-child {
          flex: 1;
        }

        > .job {
          font-size: 13px;
        }

        > .needNum {
          font-size: 13px;
        }
      }
    }

    .light {
      height: 16px;
      width: 16px;
      background-color: #94f184;
      border-radius: 50%;
    }

    .green {
      background-color: #94f184;
    }
    .red {
      background-color: #f8baba;
    }

    .tag {
      font-size: 13px;
      font-weight: 900;
      cursor: pointer;
    }
  }
`;
