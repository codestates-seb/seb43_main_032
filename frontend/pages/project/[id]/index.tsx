import Tag from '@/components/Tag';
import PeriodBox from '@/components/project/PeriodBox';
import TagBox from '@/components/project/TagBox';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import ContentSkeleton from '@/components/skeleton/ContentSkeleton';
import { formatDate2 } from '@/util/date';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Message from '@/components/Message';
import { useRecoilValue } from 'recoil';
import { loggedInUserState } from '@/recoil/atom';
import { BUTTON_STATE } from '@/constant/constant';
import { useProject } from '@/hooks/react-query/project/useProject';
import AnswerBox from '@/components/answer/AnswerBox';
import StacksBox from '@/components/project/StacksBox';
import HeartBox from '@/components/common_box/HeartBox';
import GridBox from '@/components/common_box/GridBox';
import AuthorBox from '@/components/common_box/AuthorBox';
const ReactMarkdown = dynamic(() => import('@/components/editor/ContentBox'), {
  ssr: false,
  loading: () => <ContentSkeleton />,
});

const ViewProject = () => {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo({
      top: 600,
      left: 0,
      behavior: 'smooth',
    });
  }, [router]);

  //프로젝트 데이터 요청
  const {
    projectQuery,
    updateState,
    projectEvent,
    likeProject,
    dislikeProject,
    deleteProject,
    moveEdit,
  } = useProject();

  //데이터 치환
  const data = projectQuery.data?.data;

  //좋아요 이벤트
  const likeHandler = () => {
    if (data?.liked) {
      return dislikeProject.mutate();
    }
    likeProject.mutate();
  };

  //직군 데이터 관련
  const positions = data?.positionCrewList;

  //유저 데이터
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

  if (projectQuery.error) return <Message>잠시 후 다시 시도해주세요.</Message>;
  return (
    <GridBox>
      {projectQuery.isLoading || !data ? (
        <Message>로딩중입니다.</Message>
      ) : (
        <>
          <Side>
            <AuthorBox
              userImg={data.memberInfo.profileImageUrl}
              userName={data.memberInfo.name}
              isAuthor={data.memberInfo.email !== loggedInUser?.email}
              totalStar={data.memberInfo.totalStar}
            />
            <PeriodBox
              start={new Date(data.startDate)}
              end={new Date(data.endDate)}
            />
            <TagBox tags={data.fieldList} />
            <StacksBox stacks={data.techList} stack={false} />
            <div className="want-box">
              <div className="title">모집 중인 직군</div>
              <ul>
                {positions?.map((position, i) => (
                  <li
                    className="nanum-regular"
                    key={`${position.position}+${i}`}
                  >
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
                    <a
                      onClick={() => deleteProject.mutate()}
                      className="main-btn"
                    >
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
                  <span>작성일자</span> :{' '}
                  {formatDate2(new Date(data.createdAt))}
                </div>
                <div>
                  <span>조회 수</span> : {data.views}
                </div>
                <div>
                  <span>답글 수</span> : {data.totalAnswers}
                </div>
              </div>
            </div>
            <ReactMarkdown content={data.content} />
            <HeartBox
              likeHandler={likeHandler}
              liked={data.liked}
              totalLikes={data.totalLikes}
            />
            <AnswerBox />
          </Main>
        </>
      )}
    </GridBox>
  );
};

export default ViewProject;

const Main = styled.div`
  width: 100%;
  padding: var(--padding-1);
  display: flex;
  flex-direction: column;
  gap: 32px;

  .title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: solid 1px #ececec;
    padding: 10px;
  }

  .left {
    display: flex;
    gap: 20px;
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
`;

const Side = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: var(--padding-1);

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
