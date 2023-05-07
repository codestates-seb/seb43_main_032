import GridBox from '@/components/GridBox';
import Tag from '@/components/Tag';
import PeriodBox from '@/components/project/PeriodBox';
import StacksBox from '@/components/project/StacksBox';
import TagBox from '@/components/project/TagBox';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import ContentSkeleton from '@/components/skeleton/ContentSkeleton';
import Loading from '@/components/Loading';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useProject } from '@/hooks/react-query/useProject';
import { formatDate2 } from '@/util/date';
import { useEffect } from 'react';
import Error from '@/components/Error';
const ReactMarkdown = dynamic(() => import('@/components/ContentBox'), {
  ssr: false,
  loading: () => <ContentSkeleton />,
});

const ViewProject = () => {
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

  //프로젝트 종료 시, 상태 3으로 변경
  const endProject = () => {
    if (confirm('정말 프로젝트를 종료하시겠습니까?')) {
      updateState.mutate(3);
    }
  };

  if (projectQuery.isLoading) return <Loading />;
  if (projectQuery.error) return <Error>잠시 후 다시 시도해주세요.</Error>;
  if (projectQuery.data?.post_data)
    return (
      <GridBox>
        <Side>
          <div className="author-box">
            <div>작성자</div>
            <div className="author noto-medium">
              <img
                src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1567008394/noticon/ohybolu4ensol1gzqas1.png"
                alt="author"
              />
              <div>{projectQuery.data.post_data.author}</div>
              <Tag>쪽지</Tag>
            </div>
          </div>
          <PeriodBox
            start={new Date(projectQuery.data.post_data.start)}
            end={new Date(projectQuery.data.post_data.end)}
          />
          <TagBox tags={projectQuery.data.post_data.tags} />
          <StacksBox select={projectQuery.data.post_data.stacks} />
          <div className="want-box">
            <div>모집 중인 직군</div>
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
            {projectQuery.data.post_data.state === 2 && (
              <button onClick={endProject}>프로젝트 종료</button>
            )}
            {projectQuery.data.post_data.state === 3 && (
              <button>팀원 리뷰</button>
            )}
          </div>
        </Side>
        <Main>
          <div className="title">
            <div className="nanum-bold">
              {projectQuery.data.post_data.title}
            </div>
            {projectQuery.data.post_data.state === 2 ? (
              <Tag>모집 완료</Tag>
            ) : (
              <Tag>모집 중</Tag>
            )}
          </div>
          <div className="sub noto-regular-13">
            <div>
              <span>작성일자</span> :{' '}
              {formatDate2(new Date(projectQuery.data.post_data.createAt))}
            </div>
            <div>
              <span>조회 수</span> : {projectQuery.data.post_data.view}
            </div>
            <div>
              <span>댓글 수</span> :{' '}
              {projectQuery.data.post_data.comment.length}
            </div>
          </div>
          <ReactMarkdown content={projectQuery.data.post_data.content} />
          <div className="heart-box">
            <div onClick={() => updateHeart.mutate()}>
              {projectQuery.data?.post_state.heart ? (
                <AiFillHeart />
              ) : (
                <AiOutlineHeart />
              )}
              <span>{projectQuery.data.post_data.heart}</span>
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
    span {
      font-weight: 900;
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
      font-size: 30px;
      > span {
        display: inline-block;
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

  button {
    cursor: pointer;
    border: none;
    padding: 8px 32px;
    font-weight: 700;
    border-radius: var(--radius-def);
    :hover {
      background-color: #e1e7e5;
    }
  }

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

  .want-box {
    display: flex;
    flex-direction: column;
    align-items: center;

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
