import PeriodBox from '@/components/project/PeriodBox';
import TagBox from '@/components/project/TagBox';
import styled from 'styled-components';
import { useEffect } from 'react';
import Message from '@/components/Message';
import { BUTTON_STATE } from '@/constant/constant';
import { useProject } from '@/hooks/react-query/project/useProject';
import StacksBox from '@/components/project/StacksBox';
import GridBox from '@/components/common_box/GridBox';
import AuthorBox from '@/components/common_box/AuthorBox';
import { getCookie } from '@/util/cookie';
import MainArticleBox from '@/components/common_box/MainArticleBox';
import { useProjectApply } from '@/hooks/react-query/project/useProjectApply';
import Tag from '@/components/Tag';
import { useRecoilValue } from 'recoil';
import { loggedInUserState } from '@/recoil/atom';

const ViewProject = () => {
  const loggedInUser = useRecoilValue(loggedInUserState);
  //프로젝트 데이터 요청
  const {
    projectQuery,
    updateState,
    projectEvent,
    likeProject,
    dislikeProject,
    deleteProject,
    moveEdit,
    projectRefetch,
  } = useProject();

  //프로젝트 데이터 치환
  const data = projectQuery.data?.data;

  //좋아요 이벤트
  const likeHandler = () => {
    if (!getCookie('accessToken')) {
      return alert('로그인을 부탁드려요.');
    }
    if (data?.liked) {
      return dislikeProject.mutate();
    }
    likeProject.mutate();
  };

  //삭제 이벤트
  const deleteEvent = () => {
    deleteProject.mutate();
  };

  //직군 데이터 관련
  const positions = data?.positionCrewList;

  //지원 데이터 요청
  const {
    applyQuery,
    applyEvent,
    cancelEvent,
    acceptCancel,
    acceptApply,
    rejectApply,
    checkApply,
  } = useProjectApply({ projectRefetch });

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
              isAuthor={data.author}
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
                    {false ? (
                      <Tag>마감</Tag>
                    ) : checkApply?.position === position.position ? (
                      <Tag onClick={() => cancelEvent(position.position)}>
                        취소
                      </Tag>
                    ) : (
                      <Tag onClick={() => applyEvent(position.position)}>
                        지원
                      </Tag>
                    )}
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
          <MainArticleBox
            title={data.title}
            status={data.status}
            isAuthor={data.author}
            deleteEvent={deleteEvent}
            moveEdit={moveEdit}
            createAt={data.createdAt}
            view={data.views}
            totalAnswers={data.totalAnswers}
            content={data.content}
            likeHandler={likeHandler}
            liked={data.liked}
            totalLikes={data.totalLikes}
          />
        </>
      )}
    </GridBox>
  );
};

export default ViewProject;

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
