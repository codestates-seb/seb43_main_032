import ProjectCarousel from '@/components/project/ProjectCarousel';
import ProjectCard from '@/components/project/ProjectCard';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useInfiniteQuery } from 'react-query';
import { api } from '@/util/api';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { useRef, useEffect } from 'react';
import ProjectSkeleton from '@/components/skeleton/ProjectSkeleton';
import Link from 'next/link';
import { Project } from '@/types/project';

type PageProps = { data: Project[]; total: number };

const ProjectHome = () => {
  const router = useRouter();

  //데이터 fetch
  const page_limit = 4;
  const { isLoading, error, data, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery(
      'projects',
      ({ pageParam = 1 }) =>
        api(`${router.asPath}?size=${page_limit}&page=${pageParam}`).then(
          (res) => res.data
        ),
      {
        getNextPageParam: (lastPage: PageProps, allPages: PageProps[]) => {
          console.log(lastPage);
          if (lastPage.data.length < page_limit) {
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
      data?.pageParams &&
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
        <div className="link-box">
          <Link href={`${router.asPath}/create`} className="main-btn">
            프로젝트 작성
          </Link>
        </div>
        <div className="special-box">
          <div>
            <div className="nanum-bold">신규 프로젝트</div>
            <div className="carousel-box">
              <ProjectCarousel
                projects={data.pages ? data.pages[0].data : []}
              />
            </div>
          </div>
          <div>
            <div className="nanum-bold">인기 프로젝트</div>
            <div className="carousel-box">
              <ProjectCarousel
                projects={data.pages ? data.pages[0].data : []}
              />
            </div>
          </div>
        </div>
        <div className="common-box">
          <div className="nanum-bold">전체 프로젝트</div>
          <div className="projects-box">
            {data.pages &&
              data.pages.map((page) =>
                page.data.map((project: Project) => (
                  <ProjectCard key={project.id} size={'sm'} data={project} />
                ))
              )}
          </div>
          {isFetching && hasNextPage && <ProjectSkeleton />}
        </div>
        <div ref={target} className="observer"></div>
        {!isFetching && !hasNextPage && (
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

  .link-box {
    display: flex;
    justify-content: end;
    margin-bottom: 16px;
    > a {
      width: auto;
    }
  }
  .special-box {
    width: 100%;
    grid-gap: 16px;
    display: flex;
    @media (max-width: 980px) {
      display: flex;
      flex-direction: column;
    }

    > div {
      border: 1px solid #dfdede;
      padding: var(--padding-1);
      width: 50%;
      margin-bottom: 56px;
      @media (max-width: 980px) {
        width: 100%;
        > div {
          margin-bottom: 12px;
        }
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
      margin-top: 24px;
      margin-bottom: 4px;
      gap: 16px;
      @media (max-width: 1300px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (max-width: 980px) {
        display: flex;
        flex-direction: column;
        gap: 2px;
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
