import ProjectCarousel from '@/components/project/ProjectCarousel';
import ProjectCard from '@/components/project/ProjectCard';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useInfiniteQuery } from 'react-query';
import { api } from '@/util/api';
import { Project } from '@/types/types';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { useRef, useEffect } from 'react';

const ProjectHome = () => {
  const router = useRouter();

  //데이터 fetch
  const PAGE_LIMIT = 4;
  const { isLoading, error, data, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      'projects',
      ({ pageParam = 1 }) =>
        api(`${router.asPath}?size=${PAGE_LIMIT}&page=${pageParam}`).then(
          (res) => res.data
        ),
      {
        getNextPageParam: (lastPage, allPages) => {
          if (lastPage.data.length < PAGE_LIMIT) {
            return null;
          }
          return allPages.length + 1;
        },
      }
    );

  //무한 스크롤 effect
  const target = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (
      target.current &&
      data?.pageParams[data.pageParams.length - 1] === null
    ) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (target.current) {
      observer.observe(target.current);
    }

    return () => {
      if (target.current) {
        observer.unobserve(target.current);
      }
    };
  }, [target.current, data?.pageParams]);

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
              page.data.map((project: Project) => (
                <ProjectCard key={project.id} size={'sm'} data={project} />
              ))
            )}
          </div>
        </div>
        <div ref={target} className="observer"></div>
        {!hasNextPage && (
          <div className="last-box nanum-bold blink">
            페이지가 존재하지 않습니다.
          </div>
        )}
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

  .last-box {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
  }
`;
