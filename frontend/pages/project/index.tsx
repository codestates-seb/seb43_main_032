import ProjectCarousel from '@/components/project/ProjectCarousel';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useInfiniteQuery } from 'react-query';
import { api } from '@/util/api';
import { useRef, useEffect, useState, useMemo } from 'react';
import ProjectSkeleton from '@/components/skeleton/ProjectSkeleton';
import Link from 'next/link';
import { Project } from '@/types/project';
import Message from '@/components/Message';
import { useForm } from 'react-hook-form';
import Btn from '@/components/button/Btn';
import { BsSearch } from 'react-icons/bs';
import { PROJECT_FILTER } from '@/constant/constant';
import ProjectCardBox from '@/components/card_box/ProjectCardBox';
import { Filter, Form, PageProps } from '@/types/types';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { getAllProject } from '@/util/api/getAllProject';
const page_limit = 4;

const ProjectHome = () => {
  const router = useRouter();
  const { register, watch } = useForm<Form>();
  const search = router.query.search;
  const [filter, setFilter] = useState<Filter>(0);
  const filterNames = useMemo(() => Object.keys(PROJECT_FILTER), []);
  const filterHandler = (name: string) => {
    setFilter(PROJECT_FILTER[name]);
  };

  //서버에서 필터링 작업이 완성되기 전, 눈속임을 위한 필터 데이터
  const [allData, setAllData] = useState<Project[]>([]);
  const [filterData, setFilterData] = useState<Project[]>([]);
  const [onSearch, setOnSearch] = useState(false);
  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setOnSearch(!onSearch);
  };

  useEffect(() => {
    getAllProject().then((res) => setAllData(res));
  }, []);

  //필터 변경 시, 이펙트
  useEffect(() => {
    if (filter === 0) {
      setFilterData([]);
      refetch();
    }
    if (filter === 1) {
      setFilterData(allData.reverse());
    }
    if (filter === 2) {
      setFilterData(allData.sort((x, y) => y.views - x.views));
    }
    if (filter === 3) {
      setFilterData(allData.sort((x, y) => y.totalLikes - x.totalLikes));
    }
  }, [filter]);

  useEffect(() => {
    setFilterData(
      allData.filter((data) => data.title.includes(watch().search))
    );
  }, [onSearch]);

  //주소, 서버 필터 작업 전까지 주석처리
  const address = () => {
    // if (search && filter) {
    //   return `/projects/findAll&size=${page_limit}&filter=${filter}`;
    // }
    // if (search || filter) {
    //   return `/projects/findAll&size=${page_limit}`;
    // }
    return `/projects/findAll?size=${page_limit}`;
  };

  //쿼리 키, 서버 필터 작업 전까지 주석처리
  const queryKey = () => {
    // if (search && filter) {
    //   return ['projects', search, filter];
    // }
    // if (search || filter) {
    //   return ['projects', search || filter];
    // }
    return 'projects';
  };

  //라우터 이동 시,
  useEffect(() => {
    if (watch().search !== '') {
      window.scrollTo({
        top: 600,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [router]);

  //무한스크롤 데이터
  const {
    isLoading,
    error,
    data,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery(
    queryKey(),
    ({ pageParam = 1 }) =>
      api(`${address()}&page=${pageParam}`)
        .then((res) => res.data)
        .catch(() => {}),
    {
      getNextPageParam: (
        lastPage: PageProps<Project>,
        allPages: PageProps<Project>[]
      ) => {
        if (allPages[allPages.length - 1] === undefined) {
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
      data?.pageParams[data.pageParams.length - 1]
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

  if (isLoading) return <Message>로딩중입니다.</Message>;
  if (error) return <Message>잠시 후 다시 시도해주세요.</Message>;
  if (data)
    return (
      <Box>
        <div className="special-box">
          <div className="main-box">
            <span className="sub-title">NEW</span>
            <div className="nanum-bold title">신규 프로젝트</div>
            <div className="carousel-box">
              <ProjectCarousel
                projects={data.pages ? data.pages[0].data : []}
              />
            </div>
          </div>
          <div className="main-box">
            <span className="sub-title">HOT</span>
            <div className="nanum-bold title">인기 프로젝트</div>
            <div className="carousel-box">
              <ProjectCarousel
                projects={data.pages ? data.pages[0].data : []}
              />
            </div>
          </div>
        </div>
        <ProjectCardBox
          title={search ? `${search}의 결과입니다.` : '전체 프로젝트'}
          data={
            filterData.length !== 0
              ? filterData
              : data.pages?.flatMap((page) => page.data)
          }
          skeleton={isFetching && hasNextPage && <ProjectSkeleton />}
        >
          <div className="filter-box noto-regular-13">
            <div className="filter-sub-box">
              {filterNames.map((name) => (
                <div
                  key={name}
                  className={PROJECT_FILTER[name] === filter ? 'focus' : ''}
                  onClick={() => filterHandler(name)}
                >
                  {name}
                </div>
              ))}
            </div>
            <div className="search-box">
              <form onSubmit={onSubmit}>
                <input
                  {...register('search')}
                  type="text"
                  placeholder="검색어를 입력해주세요."
                />
                <Btn>
                  <BsSearch fill={'white'} />
                </Btn>
              </form>
              <div className="link-box">
                <Link href={`${router.asPath}/create`} className="link-btn">
                  <span>프로젝트 작성</span>
                </Link>
              </div>
            </div>
          </div>
        </ProjectCardBox>
        <div ref={target} className="observer"></div>
        <div
          className="upBtn"
          onClick={() =>
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
          }
        >
          <AiOutlineArrowUp fill="white" size={30} />
        </div>
      </Box>
    );
};

export default ProjectHome;

const Box = styled.div`
  padding: var(--padding-1);
  width: 100%;

  .filter-box {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;

    .filter-sub-box {
      height: 100%;
      display: flex;
      gap: 8px;
      div {
        height: 100%;
        padding: 10px 10px;
        font-size: 14px;
        cursor: pointer;
        transition: background 0.5s ease, color 0.5s ease;
        :hover {
          background: #9b7aff;
          color: white;
          border-radius: 5px;
        }
      }
    }

    .focus {
      background-color: #6333ff;
      color: white;
      border-radius: 5px;
    }
    .search-box {
      display: flex;
      width: 50%;
      > form {
        display: flex;
        width: 100%;
        > input {
          width: 80%;
          padding: 8px 13px;
          border-radius: 10px;
          font-size: 14px;
          border: solid 2px #8e8e8e;

          :focus,
          :active {
            background-color: white;
            outline: solid 2px #9b7aff;
          }

          ::placeholder {
            color: #cdcdcd;
          }
        }

        button {
          width: 20%;
          margin-left: 8px;
          background: #d2c4ff;
          padding: 0 10px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
        }
      }
    }
  }

  .link-box {
    display: flex;
    > a {
      width: auto;
      padding: 10px 15px;
      background: #d2c4ff;
      border-radius: 10px;

      span {
        font-size: 15px;
        color: white;
      }
    }
  }
  .special-box {
    width: 100%;
    grid-gap: 16px;
    display: flex;
    justify-content: space-around;
    @media (max-width: 960px) {
      display: flex;
      flex-direction: column;
    }

    > .main-box {
      padding: var(--padding-1);
      width: 35%;
      margin-bottom: 56px;
      .sub-title {
        font-size: 14px;
        color: red;
      }

      .title {
        margin-bottom: 16px;
      }
      @media (max-width: 960px) {
        width: 100%;
        > div {
          margin-bottom: 12px;
        }
      }

      .carousel-box {
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
      @media (max-width: 960px) {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
    }
  }

  .observer {
    height: 5vh;
  }

  .upBtn {
    position: fixed;
    bottom: 5%;
    right: 5%;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #be6eff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;
