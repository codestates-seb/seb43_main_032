import GridBox from '@/components/GridBox';
import Tag from '@/components/Tag';
import PeriodBox from '@/components/project/PeriodBox';
import StacksBox from '@/components/project/StacksBox';
import TagBox from '@/components/project/TagBox';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import ContentSkeleton from '@/components/skeleton/ContentSkeleton';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { api } from '@/util/api';
import { PostState, Project } from '@/types/types';
import Loading from '@/components/Loading';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
const ReactMarkdown = dynamic(() => import('@/components/ContentBox'), {
  ssr: false,
  loading: () => <ContentSkeleton />,
});

const ViewProject = () => {
  const router = useRouter();

  //data fetch
  const { isLoading, error, data } = useQuery<
    { post_data: Project; post_state: PostState },
    Error
  >(['project', router.query.id], () =>
    api(router.asPath).then((res) => res.data)
  );

  const wantJob = () => {
    api.post(`${router.asPath}/want`, { data: '프론트엔드' });
  };

  //직군 관련
  const jobs = data?.post_data?.jobs;
  const job = jobs?.map((x) => Object.keys(x)[0]);
  const jobCount = jobs?.map((x) => Object.values(x)[0]);

  if (isLoading) return <Loading />;
  if (error) return <p>잠시 후 다시 시도해주세요.</p>;
  if (data?.post_data)
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
              <div>{data.post_data.author}</div>
              <Tag>쪽지</Tag>
            </div>
          </div>
          <PeriodBox
            start={new Date(data.post_data.start)}
            end={new Date(data.post_data.end)}
          />
          <TagBox tags={data.post_data.tags} />
          <StacksBox select={data.post_data.stacks} />
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
                    {job === data?.post_state.want ? (
                      <Tag>취소</Tag>
                    ) : (
                      <Tag onClick={wantJob}>지원</Tag>
                    )}
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <button>팀원 리뷰</button>
          </div>
        </Side>
        <Main>
          <div className="title">
            <div className="nanum-bold">{data.post_data.title}</div>
            <Tag>모집 중</Tag>
          </div>
          <div className="sub noto-regular-13">
            <div>
              <span>작성일자</span> : {data.post_data.createAt}
            </div>
            <div>
              <span>조회 수</span> : {data.post_data.view}
            </div>
            <div>
              <span>댓글 수</span> : {data.post_data.comment.length}
            </div>
          </div>
          <ReactMarkdown content={data.post_data.content} />
          <div className="heart-box">
            <div>
              {data?.post_state.heart ? <AiFillHeart /> : <AiOutlineHeart />}
              <span>{data.post_data.heart}</span>
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
        :hover {
          background-color: #e1e7e5;
        }
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
      :hover {
        background-color: #e1e7e5;
      }
    }
  }
`;
