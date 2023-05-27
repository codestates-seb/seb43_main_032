import ProjectCarousel from '@/components/project/ProjectCarousel';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useRef, useEffect, useState, SetStateAction } from 'react';
import ProjectSkeleton from '@/components/skeleton/ProjectSkeleton';
import Link from 'next/link';
import { Project } from '@/types/project';
import Message from '@/components/Message';
import { useForm } from 'react-hook-form';
import ProjectCardBox from '@/components/card_box/ProjectCardBox';
import { Filter, Form } from '@/types/types';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { ARTICLE_FILTER } from '@/constant/constant';
import { useInfinityProject } from '@/hooks/react-query/project/useInfinityProject';
import { useAllData } from '@/hooks/react-query/useAllData';
import { projectFilter } from '@/util/filter/projectFilter';
import { useTopData } from '@/hooks/react-query/useTopData';
import Head from 'next/head';
import { useRecoilState } from 'recoil';
import { propjectTagState } from '@/recoil/atom';

const ProjectHome = () => {
  const router = useRouter();
  const [projectTag] = useRecoilState(propjectTagState);
  const [searchVal, setSearchVal] = useState('');
  const { isLoading, error, data, fetchNextPage, hasNextPage, isFetching } =
    useInfinityProject();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setSearchVal(projectTag);
  }, [projectTag]);

  const searchValHandler = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchVal(e.target.value);
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const { topLikeProjectData } = useTopData();

  //서버에서 필터링 작업이 완성되기 전, 눈속임을 위한 필터 데이터
  const [filter, setFilter] = useState<Filter>(0);
  const filterHandler = (idx: number) => {
    setFilter(idx);
  };
  const [allData, setAllData] = useState<Project[]>([]);

  //전체 데이터 세팅
  const { projectData, projectLoading } = useAllData();
  useEffect(() => {
    if (projectData) setAllData(projectData);
  }, [projectLoading]);

  const filterData = projectFilter({
    filter,
    allData,
    searchVal,
  });

  //무한 스크롤 effect
  const target = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (target.current && !hasNextPage) {
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

    if (target.current && filter === 0 && searchVal === '') {
      observer.observe(target.current);
    }

    return () => {
      if (target.current) {
        observer.unobserve(target.current);
      }
    };
  }, [target.current, data?.pageParams, filter, searchVal]);

  if (error) return <Message>잠시 후에 다시 시도해주세요.</Message>;
  if (isLoading) return <Message>로딩중입니다.</Message>;
  if (data)
    return (
      <>
        <Head>
          <title>{`SIDE QUEST - 프로젝트`}</title>
        </Head>
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
                  projects={topLikeProjectData ? topLikeProjectData : []}
                />
              </div>
            </div>
          </div>
          <ProjectCardBox
            title={
              searchVal !== '' && searchVal
                ? `${searchVal}의 결과입니다.`
                : '전체 프로젝트'
            }
            data={
              filterData && filterData?.length > 0
                ? (filterData as Project[])
                : data.pages?.flatMap((page) => page.data)
            }
            skeleton={isFetching && <ProjectSkeleton />}
          >
            <div className="filter-box noto-regular-13">
              <div className="filter-sub-box">
                {ARTICLE_FILTER.map((name, idx) => (
                  <div
                    key={name}
                    className={idx === filter ? 'focus' : ''}
                    onClick={() => filterHandler(idx)}
                  >
                    {name}
                  </div>
                ))}
              </div>
              <div className="search-box">
                <div>
                  <input
                    type="text"
                    onChange={searchValHandler}
                    value={searchVal}
                    placeholder="검색어를 입력해주세요."
                  />
                </div>
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
            onClick={() =>
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            }
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={
              isHovered
                ? 'animate__animated animate__bounce animate__infinite animate-duration-2 upBtn'
                : 'upBtn'
            }
          >
            <AiOutlineArrowUp fill="white" size={30} />
          </div>
        </Box>
      </>
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

    @media (max-width: 768px) {
      gap: 20px;
      flex-direction: column;
    }

    .filter-sub-box {
      height: 100%;
      display: flex;
      gap: 8px;
      div {
        height: 100%;
        padding: 10px;
        font-size: 14px;
        cursor: pointer;
        transition: background 0.5s ease, color 0.5s ease;
        :hover {
          background: #9b7aff;
          color: white;
          border-radius: 5px;
        }
        @media (max-width: 768px) {
          padding: 6px;
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
      justify-content: end;
      gap: 10px;

      > div {
        display: flex;
        > input {
          width: 100%;
          padding: 8px 13px;
          border-radius: 5px;
          font-size: 14px;
          border: solid 2px #ececec;
          outline: none;

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
          border-radius: 5px;
          border: none;
          cursor: pointer;
        }
      }
    }
  }

  .link-box {
    display: flex;
    > a {
      transition: all 0.3s;
      width: auto;
      padding: 10px 15px;
      background: #d2c4ff;
      border-radius: 5px;

      span {
        font-size: 15px;
        color: white;
        @media (max-width: 768px) {
          font-size: 12px;
        }
      }
    }

    :hover {
      a {
        background: #6333ff;
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
        font-weight: 700;
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
    bottom: 100px;
    right: 25px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #be6eff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s;

    :hover {
      background: #6333ff;
    }
  }
`;
