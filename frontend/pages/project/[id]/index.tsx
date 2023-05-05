import GridBox from '@/components/GridBox';
import Tag from '@/components/Tag';
import PeriodBox from '@/components/project/PeriodBox';
import StacksBox from '@/components/project/StacksBox';
import TagBox from '@/components/project/TagBox';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import ContentSkeleton from '@/components/skeleton/ContentSkeleton';
import { EX } from '@/constant/constant';
const ReactMarkdown = dynamic(() => import('@/components/ContentBox'), {
  ssr: false,
  loading: () => <ContentSkeleton />,
});

const ViewProject = () => {
  const tags = ['ㅇㅇ', 'ㅋㅋㅋㅋ', '리코일'];
  const job = [{ 프론트엔드: 1 }, { 백엔드: 2 }];
  const jobs = job.map((job) => Object.keys(job)[0]);
  const jobCount = job.map((job) => Object.values(job)[0]);
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
            <div>김기획</div>
            <Tag>쪽지</Tag>
          </div>
        </div>
        <PeriodBox start={new Date()} end={new Date()} />
        <TagBox tags={tags} />
        <StacksBox select={['recoil', 'java']} />
        <div className="want-box">
          <div>모집 중인 직군</div>
          <ul>
            {jobs.map((job, i) => (
              <li className="nanum-regular" key={`${job}+${i}`}>
                <div>{job}</div>
                <div>0/{jobCount[i]}</div>
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
          <div className="nanum-bold">
            한국 투자 증권 api로 플젝 해보실분?!!?
          </div>
          <Tag>모집 중</Tag>
        </div>
        <div className="sub noto-regular-13">
          <div>
            <span>작성일자</span> : 2023년 4월 1일
          </div>
          <div>
            <span>조회 수</span> : 27
          </div>
          <div>
            <span>댓글 수</span> : 28
          </div>
        </div>
        <ReactMarkdown content={EX} />
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
