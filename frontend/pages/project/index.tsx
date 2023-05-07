import Carousel from '@/components/project/ProjectCarousel';
import ProjectCard from '@/components/project/ProjectCard';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { api } from '@/util/api';
import { Project } from '@/types/types';
import Loading from '@/components/Loading';
import Error from '@/components/Error';

const ProjectHome = () => {
  const router = useRouter();
  const { isLoading, error, data } = useQuery<
    { data: Project[]; total: number },
    Error
  >('project', () =>
    api(`${router.asPath}?size=36&page=${1}`).then((res) => res.data)
  );

  if (isLoading) return <Loading />;
  if (error) return <Error>잠시 후 다시 시도해주세요.</Error>;
  if (data)
    return (
      <Box>
        <div className="special-box">
          <div>
            <div className="nanum-bold">신규 프로젝트</div>
            <div className="carousel-box">
              <Carousel projects={data.data.slice(0, 5)} />
            </div>
          </div>
          <div>
            <div className="nanum-bold">인기 프로젝트</div>
            <div className="carousel-box">
              <Carousel projects={data.data.slice(0, 5)} />
            </div>
          </div>
        </div>
        <div className="common-box">
          <div className="nanum-bold">전체 프로젝트</div>
          <div className="projects-box">
            {data.data.map((project) => (
              <ProjectCard key={project.id} size={'sm'} data={project} />
            ))}
          </div>
        </div>
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
`;
