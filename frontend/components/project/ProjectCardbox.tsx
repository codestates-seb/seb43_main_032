import styled from 'styled-components';
import ProjectCard from './ProjectCard';
import { Project } from '@/types/project';

type Props = {
  data: Project[];
  title: string;
};

const ProjectCardbox = ({ title, data }: Props) => {
  return (
    <Box>
      <div className="nanum-bold">{title}</div>
      <div className="projects-box">
        {data &&
          data.map((project: Project) => (
            <ProjectCard key={project.id} size={'sm'} data={project} />
          ))}
      </div>
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
    @media (max-width: 980px) {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
  }
`;
