import ProjectCard from '@/components/project/ProjectCard';
import styled from 'styled-components';

const Project = () => {
  const tags = ['AI', '금융'];
  const select = ['recoil', 'java'];
  return (
    <Box>
      <div className="special-box">
        <div>
          <div className="nanum-bold">신규 프로젝트</div>
          <ProjectCard size={'lg'} tags={tags} select={select} />
        </div>
        <div>
          <div className="nanum-bold">인기 프로젝트</div>
          <div className="card-box">
            <ProjectCard size={'lg'} tags={tags} select={select} />
          </div>
        </div>
      </div>
      <div className="common-box">
        <div className="nanum-bold">전체 프로젝트</div>
        <div className="projects-box">
          <ProjectCard size={'sm'} tags={tags} select={select} />
          <ProjectCard size={'sm'} tags={tags} select={select} />
          <ProjectCard size={'sm'} tags={tags} select={select} />
          <ProjectCard size={'sm'} tags={tags} select={select} />
          <ProjectCard size={'sm'} tags={tags} select={select} />
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
    display: grid;
    grid-gap: 16px;
    grid-template-columns: 6fr 6fr;
    @media (max-width: 980px) {
      display: flex;
      flex-direction: column;
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
