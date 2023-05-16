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
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Position from '@/components/Position';
import Message from '@/components/Message';
import Btn from '@/components/button/Btn';
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
  //react-query
  const { projectQuery, updateJob, updateHeart, updateState } = useProject();
  const data = projectQuery.data?.data;

  //직군 관련
  const positions = data?.positionCrewList;

  //모든 지원이 꽉 찼을 때, 일어나는 이펙트
  // useEffect(() => {
  //   if (
  //     jobCount &&
  //     jobCount?.filter((x) => x.current === x.want).length == jobCount?.length
  //   ) {
  //     updateState.mutate(2);
  //   }
  // }, [projectQuery.data]);

  //세부 기능 추가 이후에 업데이트 해야할듯???
  const projectEvent = (state: number) => {
    if (state === 2 && confirm('정말 프로젝트를 시작하시겠습니까?')) {
      updateState.mutate(3);
    }
    if (state === 3 && confirm('정말 프로젝트를 종료하시겠습니까?')) {
      updateState.mutate(4);
    }
  };

  //edit 이동
  const moveEdit = () => {
    router.push(`${router.asPath}/edit`);
  };

  //세부 기능 추가 이후에 업데이트 해야할듯??? 아마도 숫자 관리가 아닌 only string 일듯?
  const postState: { [key: string]: number } = {
    '모집 중': 1,
    '모집 완료': 2,
    '진행 중': 3,
    종료: 4,
  };

  //세부 기능 추가 이후에 업데이트 해야할듯??? 아마도 숫자 관리가 아닌 only string 일듯?
  const buttonState: { [key: number]: string } = {
    1: '',
    2: '프로젝트 시작',
    3: '프로젝트 종료',
    4: '팀원 리뷰',
  };

  if (projectQuery.isLoading) return <Message>로딩중입니다.</Message>;
  if (projectQuery.error) return <Message>잠시 후 다시 시도해주세요.</Message>;
  if (data)
    return (
      <GridBox>
        <Side>
          <div className="author-box">
            <div>작성자</div>
            <div className="author noto-medium">
              <div className="noto-medium">
                <Position text={data.writerPosition} />
              </div>
              <div>
                <img
                  src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1567008394/noticon/ohybolu4ensol1gzqas1.png"
                  alt="author"
                />
                {/* <div>{data.author}</div> */}
                <Tag>쪽지</Tag>
              </div>
            </div>
          </div>
          <PeriodBox
            start={new Date(data.startDate)}
            end={new Date(data.endDate)}
          />
          <TagBox tags={data.fieldList} />
          <StacksBox stacks={data.techStackList} />
          <div className="want-box">
            <div>모집 중인 직군</div>
            <div>
              <Btn>
                <span>지원자 확인</span>
              </Btn>
            </div>
            <ul>
              {positions?.map((position, i) => (
                <li className="nanum-regular" key={`${position.position}+${i}`}>
                  <div>{position.position}</div>
                  <div>
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
            {postState[data.status] !== 1 && (
              <button onClick={() => projectEvent(postState[data.status])}>
                {buttonState[postState[data.status]]}
              </button>
            )}
          </div>
        </Side>
        <Main>
          <div className="title">
            <div className="nanum-bold">{data.title}</div>
            {<Tag>{data.status}</Tag>}
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
            <div>
              <a onClick={moveEdit} className="main-btn">
                <span>프로젝트 수정</span>
              </a>
            </div>
          </div>
          <ReactMarkdown content={data.content} />
          <div className="heart-box">
            <div onClick={() => updateHeart.mutate()}>
              {/* {projectQuery.data?.post_state.heart ? (
                <span>
                  <AiFillHeart />
                </span>
              ) : (
                <span>
                  <AiOutlineHeart />
                </span>
              )} */}
              <span>{data.totalLikes}</span>
            </div>
          </div>
          <div className="comment-box">댓글창</div>
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

  > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    > div:first-child {
      font-family: var(--font-nanum);
      font-size: 23px;
      font-weight: 700;
    }
  }

  .author-box {
    .author {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 12px;
      > div:last-child {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 16px;
        > img {
          width: 40px;
          height: 40px;
        }
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
    display: flex;
    flex-direction: column;
    align-items: center;

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
        padding: 16px 0px;
        border-bottom: 1px solid #e4e4e7;
        > div:first-child {
          flex: 1;
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
