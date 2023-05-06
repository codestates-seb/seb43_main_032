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
import { Project } from '@/types/types';
import Loading from '@/components/Loading';
const ReactMarkdown = dynamic(() => import('@/components/ContentBox'), {
  ssr: false,
  loading: () => <ContentSkeleton />,
});

const ViewProject = () => {
  const router = useRouter();

  const { isLoading, error, data } = useQuery<Project, Error>(
    ['project', router.query.id],
    () => api(`${router.asPath}`).then((res) => res.data)
  );

  const jobs = data?.jobs;
  const job = jobs?.map((x) => Object.keys(x)[0]);
  const jobCount = jobs?.map((x) => Object.values(x)[0]);

  if (isLoading) return <Loading />;
  if (error) return <p>잠시 후 다시 시도해주세요.</p>;
  if (data)
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
              <div>{data.author}</div>
              <Tag>쪽지</Tag>
            </div>
          </div>
          <PeriodBox start={new Date(data.start)} end={new Date(data.end)} />
          <TagBox tags={data.tags} />
          <StacksBox select={data.stacks} />
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
                    <div className="light"></div>
                    <Tag>지원</Tag>
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
            <div className="nanum-bold">{data.title}</div>
            <Tag>모집 중</Tag>
          </div>
          <div className="sub noto-regular-13">
            <div>
              <span>작성일자</span> : {data.createAt}
            </div>
            <div>
              <span>조회 수</span> : {data.view}
            </div>
            <div>
              <span>댓글 수</span> : {data.comment.length}
            </div>
          </div>
          <ReactMarkdown content={data.content} />
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
