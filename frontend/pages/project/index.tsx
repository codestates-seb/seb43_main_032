import ProjectCarousel from '@/components/project/ProjectCarousel';
import ProjectCard from '@/components/project/ProjectCard';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useInfiniteQuery } from 'react-query';
import { api } from '@/util/api';
import { Project } from '@/types/types';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { useState, useRef, useEffect } from 'react';

const ProjectHome = () => {
  const router = useRouter();
  const target = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState(1);
  const PAGE_LIMIT = 4;
  const { isLoading, error, data, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      'projects',
      () =>
        api(`${router.asPath}?size=${PAGE_LIMIT}&page=${page}`).then(
          (res) => res.data
        ),
      {
        getNextPageParam: (lastPage, allPages) => {
          if (lastPage.data.length < PAGE_LIMIT) {
            return null; // 모든 데이터를 가져왔으므로 null을 반환하여 더 이상 페이지를 로드하지 않음
          }
          return allPages.length + 1; // 다음 페이지를 로드하기 위해 페이지 번호를 반환
        },
      }
    );
  console.log(data);

  const projectList = data?.pages.flatMap((page) => page.data) ?? [];
  console.log(projectList);
  if (isLoading) return <Loading />;
  if (error) return <Error>잠시 후 다시 시도해주세요.</Error>;
  if (data)
    return (
      <Box>
        <div className="special-box">
          <div>
            <div className="nanum-bold">신규 프로젝트</div>
            <div className="carousel-box">
              <ProjectCarousel projects={data.pages[0].data.slice(0, 5)} />
            </div>
          </div>
          <div>
            <div className="nanum-bold">인기 프로젝트</div>
            <div className="carousel-box">
              <ProjectCarousel projects={data.pages[0].data.slice(0, 5)} />
            </div>
          </div>
        </div>
        <div className="common-box">
          <div className="nanum-bold">전체 프로젝트</div>
          <div className="projects-box">
            {data.pages.map((page) =>
              projectList.map((project: Project) => (
                <ProjectCard key={project.id} size={'sm'} data={project} />
              ))
            )}
          </div>
        </div>
        <div ref={target} className="observer"></div>
      </Box>
    );
};

export default ProjectHome;

const Box = styled.div`
  padding: var(--padding-1);
  .special-box {
    width: 100%;
    grid-gap: 16px;
    display: flex;
    @media (max-width: 980px) {
      display: flex;
      flex-direction: column;
    }

    > div {
      width: 50%;
      margin-bottom: 56px;
      @media (max-width: 980px) {
        width: 100%;
      }
    }

    .slick-slider {
      > button {
        display: none !important;
      }
    }
  }

  .common-box {
    .projects-box {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      margin: 24px 0px;
      gap: 16px;
      @media (max-width: 1300px) {
        grid-template-columns: repeat(3, 1fr);
      }
      @media (max-width: 980px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (max-width: 680px) {
        grid-template-columns: repeat(1, 1fr);
      }
    }
  }

  .observer {
    height: 5vh;
  }
`;
