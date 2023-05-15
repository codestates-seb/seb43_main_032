import styled from 'styled-components';
import { Project } from '@/types/project';
import { ReactNode } from 'react';
import ProjectCard from '../project/ProjectCard';

type Props = {
  data: Project[];
  title: string;
  skeleton?: ReactNode;
  children?: ReactNode;
};

const ProjectCardBox = ({ title, data, skeleton, children }: Props) => {
  return (
    <Box>
      <div className="nanum-bold">
        <div className="sub-title">{title === '인기 프로젝트' && 'HOT'}</div>
        <div>{title}</div> {children}
      </div>
      <div className="projects-box">
        {data?.map((project: Project) => (
          <ProjectCard key={project.id} size={'sm'} data={project} />
        ))}
      </div>
      {skeleton}
    </Box>
  );
};

export default ProjectCardBox;

const Box = styled.div`
  > .nanum-bold {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .sub-title {
      font-size: 14px;
      color: red;
    }
  }
  .projects-box {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin: 16px 0px;
    margin-bottom: 24px;
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
`;
