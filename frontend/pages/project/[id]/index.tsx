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
import Btn from '@/components/Btn';
import Position from '@/components/Position';
import Message from '@/components/Message';
const ReactMarkdown = dynamic(() => import('@/components/editor/ContentBox'), {
  ssr: false,
  loading: () => <ContentSkeleton />,
});

const ViewProject = () => {
  const router = useRouter();
  //react-query
  const { projectQuery, updateJob, updateHeart, updateState } = useProject();

  //직군 관련
  const jobs = projectQuery.data?.post_data?.jobs;
  const job = jobs?.map((x) => Object.keys(x)[0]);
  const jobCount = jobs?.map((x) => Object.values(x)[0]);

  //모든 지원이 꽉 찼을 때, 일어나는 이펙트
  useEffect(() => {
    if (
      jobCount &&
      jobCount?.filter((x) => x.current === x.want).length == jobCount?.length
    ) {
      updateState.mutate(2);
    }
  }, [projectQuery.data]);

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

  const postState = {
    1: '모집 중',
    2: '모집 완료',
    3: '진행 중',
    4: '종료',
  };

  const buttonState = {
    1: '',
    2: '프로젝트 시작',
    3: '프로젝트 종료',
    4: '팀원 리뷰',
  };

  const data = projectQuery.data?.post_data;

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
                <Position text={data.position!} />
              </div>
              <div>
                <img
                  src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1567008394/noticon/ohybolu4ensol1gzqas1.png"
                  alt="author"
                />
                <div>{data.author}</div>
                <Tag>쪽지</Tag>
              </div>
            </div>
          </div>
          <PeriodBox start={new Date(data.start)} end={new Date(data.end)} />
          <TagBox tags={data.tags} />
          <StacksBox stacks={data.stacks} />
          <div className="want-box">
            <div>모집 중인 직군</div>
            <div>
              <Btn>
                <span>지원자 확인</span>
              </Btn>
            </div>
            <ul>
              {jobCount &&
                job?.map((job, i) => (
                  <li className="nanum-regular" key={`${job}+${i}`}>
                    <div>{job}</div>
                    <div>
                      {jobCount[i].current}/{jobCount[i].want}
                    </div>
                    <div
                      className={
                        jobCount[i].current === jobCount[i].want
                          ? 'red light'
                          : 'green light'
                      }
                    ></div>
                    {jobCount[i].current === jobCount[i].want ? (
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
                    )}
                  </li>
                ))}
            </ul>
          </div>
          <div>
            {data.state !== 1 && (
              <button onClick={() => projectEvent(data.state)}>
                {buttonState[data.state]}
              </button>
            )}
          </div>
        </Side>
        <Main>
          <div className="title">
            <div className="nanum-bold">{data.title}</div>
            {<Tag>{postState[data.state]}</Tag>}
          </div>
          <div className="sub noto-regular-13">
            <div>
              <div>
                <span>작성일자</span> : {formatDate2(new Date(data.createAt))}
              </div>
              <div>
                <span>조회 수</span> : {data.view}
              </div>
              <div>
                <span>댓글 수</span> : {data.comment.length}
              </div>
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
              {projectQuery.data?.post_state.heart ? (
                <span>
                  <AiFillHeart />
                </span>
              ) : (
                <span>
                  <AiOutlineHeart />
                </span>
              )}
              <span>{data.heart}</span>
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
