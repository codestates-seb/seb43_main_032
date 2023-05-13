import styled from 'styled-components';
import ProjectCard from './ProjectCard';
import { Project } from '@/types/project';
import { ReactNode } from 'react';

type Props = {
  data: Project[];
  title: string;
  children?: ReactNode;
};

const ProjectCardbox = ({ title, data, children }: Props) => {
  return (
    <Box>
      <div className="nanum-bold">{title}</div>
      <div className="projects-box">
        {data?.map((project: Project) => (
          <ProjectCard key={project.id} size={'sm'} data={project} />
        ))}
      </div>
      {children}
    </Box>
  );
};

export default ProjectCardbox;

const Box = styled.div`
  .projects-box {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin: 24px 0px;
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
