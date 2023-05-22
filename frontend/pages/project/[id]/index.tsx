import PeriodBox from '@/components/project/PeriodBox';
import TagBox from '@/components/project/TagBox';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
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
import ApplyBox from '@/components/common_box/ApplyBox';
import SubBtn from '@/components/button/SubBtn';
import { errorAlert } from '@/components/alert/Alert';

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
      return errorAlert('로그인이 필요합니다.', '게시글 좋아요');
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

  //인원이 모두 마감되었다면 일어날 이벤트
  const checkComplteApply =
    data?.positionCrewList.filter((crew) => crew.number !== crew.acceptedNumber)
      .length === 0;
  const completeApply = () => {
    if (checkComplteApply) {
      updateState.mutate('모집 완료');
    }
  };

  //직군 데이터 관련
  const positions = data?.positionCrewList;

  //지원자 속해있는지 체크
  const acceptedCrewList = data?.acceptedCrewList;
  const acceptedPostion = acceptedCrewList?.find(
    (crew) => crew.memberId === loggedInUser?.memberId
  );

  //지원 데이터 요청
  const {
    applyQuery,
    checkApply,
    applyEvent,
    cancelEvent,
    acceptEvent,
    rejectEvent,
    acceptedCancleEvent,
  } = useProjectApply({ projectRefetch, acceptedPostion, completeApply });

  //확정된 버튼의 hover 관리
  const [acceptedHover, setAcceptedHover] = useState(false);
  const hoverHandler = () => {
    setAcceptedHover(!acceptedHover);
  };

  if (projectQuery.error) return <Message>잠시 후 다시 시도해주세요.</Message>;
  if (projectQuery.isLoading || !data || !applyQuery.data)
    return <Message>로딩중입니다.</Message>;
  return (
    <GridBox>
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
            {positions?.map((position) => (
              <li className="nanum-regular" key={position.position}>
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
                {data.author ? (
                  <></>
                ) : (
                  <>
                    {acceptedPostion &&
                    acceptedPostion.position === position.position ? (
                      <Tag
                        onClick={() => acceptedCancleEvent(position.position)}
                        onMouseEnter={hoverHandler}
                        onMouseLeave={hoverHandler}
                      >
                        {acceptedHover ? '취소' : '확정'}
                      </Tag>
                    ) : position.acceptedNumber === position.number ? (
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
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
        {data.author && (
          <ApplyBox
            crewList={applyQuery.data?.data}
            acceptEvent={acceptEvent}
            rejectEvent={rejectEvent}
          />
        )}
        <div>
          {data.author && data.status !== '모집중' && (
            <SubBtn onClick={() => projectEvent(data.status)}>
              {BUTTON_STATE[data.status]}
            </SubBtn>
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
        articleRefetch={projectRefetch}
      />
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
