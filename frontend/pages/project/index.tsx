import Carousel from '@/components/Carousel';
import ProjectCard from '@/components/project/ProjectCard';
import styled from 'styled-components';

const Project = () => {
  const tags = ['AI', '금융'];
  const select = ['recoil', 'java'];
  const author = '김기획';
  const view = 555;
  const heart = 33;
  const title =
    '한국 투자 증권 api로 플젝 해보실분?!!?ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ';

  const arr = Array(5)
    .fill(1)
    .map((x, i) => x + i);
  return (
    <Box>
      <div className="special-box">
        <div>
          <div className="nanum-bold">신규 프로젝트</div>
          <div className="carousel-box">
            <Carousel projects={arr} />
          </div>
        </div>
        <div>
          <div className="nanum-bold">인기 프로젝트</div>
          <div className="carousel-box">
            <Carousel projects={arr} />
          </div>
        </div>
      </div>
      <div className="common-box">
        <div className="nanum-bold">전체 프로젝트</div>
        <div className="projects-box">
          <ProjectCard
            size={'sm'}
            view={view}
            heart={heart}
            author={author}
            tags={tags}
            select={select}
            title={title}
          />
          <ProjectCard
            size={'sm'}
            view={view}
            heart={heart}
            author={author}
            tags={tags}
            select={select}
            title={title}
          />
          <ProjectCard
            size={'sm'}
            view={view}
            heart={heart}
            author={author}
            tags={tags}
            select={select}
            title={title}
          />
          <ProjectCard
            size={'sm'}
            view={view}
            heart={heart}
            author={author}
            tags={tags}
            select={select}
            title={title}
          />
          <ProjectCard
            size={'sm'}
            view={view}
            heart={heart}
            author={author}
            tags={tags}
            select={select}
            title={title}
          />
        </div>
      </div>
    </Box>
  );
};

export default Project;

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
