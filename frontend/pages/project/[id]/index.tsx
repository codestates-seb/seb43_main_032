import GridBox from '@/components/GridBox';
import Tag from '@/components/Tag';
import PeriodBox from '@/components/project/PeriodBox';
import StacksBox from '@/components/project/StacksBox';
import TagBox from '@/components/project/TagBox';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import ContentSkeleton from '@/components/skeleton/ContentSkeleton';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { formatDate2 } from '@/util/date';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Position from '@/components/Position';
import Message from '@/components/Message';
import { useRecoilValue } from 'recoil';
import { loggedInUserState } from '@/recoil/atom';
import { BUTTON_STATE } from '@/constant/constant';
import CommentBox from '@/components/CommentBox';
import { useProject } from '@/hooks/react-query/project/useProject';
const ReactMarkdown = dynamic(() => import('@/components/editor/ContentBox'), {
  ssr: false,
  loading: () => <ContentSkeleton />,
});

const ViewProject = () => {
  const router = useRouter();
  console.log(router.asPath)
  useEffect(() => {
    window.scrollTo({
      top: 600,
      left: 0,
      behavior: 'smooth',
    });
  }, [router]);

  //임시 데이터
  const [userHeart, setUserHeart] = useState(false);

  //프로젝트 데이터 요청
  const {
    // updateHeart,
    projectQuery,
    updateState,
    projectEvent,
    deleteProject,
    moveEdit,
  } = useProject();
  //데이터 치환
  const data = projectQuery.data?.data;

  //직군 데이터 관련
  const positions = data?.positionCrewList;

  //작성자 및 유저 데이터
  const loggedInUser = useRecoilValue(loggedInUserState);

  //모든 지원이 꽉 찼을 때, 일어나는 이펙트
  useEffect(() => {
    if (
      data?.positionCrewList.filter(
        (crew) => crew.number !== crew.acceptedNumber
      ).length === 0
    ) {
      updateState.mutate('모집 완료');
    }
  }, [projectQuery.data]);

  //댓글 editor 관리
  const [commentVal, setCommentVal] = useState('');
  const changeCommentVal = (value: string) => {
    setCommentVal(value);
  };

  //댓글 페이지 관리
  const [commentPage, setCommentPage] = useState(1);
  const commentPageHandler = (page: number) => {
    setCommentPage(page);
  };

  //임시 댓글 작성 이벤트
  const addComment = () => {
    if (commentVal === '') {
      return alert('내용을 작성해주세요.');
    }
    if (!loggedInUser) {
      return alert('먼저 로그인을 해주세요.');
    }
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
                <div className="user-title">{data.memberInfo.name}</div>
                <div className="noto-medium">
                  <Position text={data.writerPosition} />
                </div>
                {data.memberInfo.email !== loggedInUser?.email && (
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
                    {/* 서버 데이터가 들어오면 작업해줘야할 부분 */}
                    {3} <span>개</span>
                  </div>
                  <div className="detail-title">진행 프로젝트</div>
                </div>
                <div className="center-border"></div>
                <div className="detail-sub-box">
                  <div className="detail-num">
                    {data.memberInfo.totalStar} <span>개</span>
                  </div>
                  <div className="detail-title">평가 점수</div>
                </div>
              </div>
              {data.memberInfo.email !== loggedInUser?.email && (
                <Tag>쪽지 보내기</Tag>
              )}
            </div>
          </div>
          <PeriodBox
            start={new Date(data.startDate)}
            end={new Date(data.endDate)}
          />
          <TagBox tags={data.fieldList} />
          <StacksBox stacks={data.techList} />
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
                  {/* 지원자 리스트랑 비교해서 맞춰야함 */}
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
            {data.status !== '모집중' && (
              <button onClick={() => projectEvent(data.status)}>
                {BUTTON_STATE[data.status]}
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
              {data.memberInfo.email === loggedInUser?.email && (
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
                <span>작성일자</span> : {formatDate2(new Date(data.createdAt))}
              </div>
              <div>
                <span>조회 수</span> : {data.views}
              </div>
              <div>{/* <span>댓글 수</span> : {data.comment.length} */}</div>
            </div>
          </div>
          <ReactMarkdown content={data.content} />
          <div className="heart-box">
            <div
            // onClick={() => updateHeart.mutate()}
            >
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
          <CommentBox
            commentData={commentData}
            addComment={addComment}
            commentVal={commentVal}
            changeCommentVal={changeCommentVal}
            commentPageHandler={commentPageHandler}
            commentPage={commentPage}
          />
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
