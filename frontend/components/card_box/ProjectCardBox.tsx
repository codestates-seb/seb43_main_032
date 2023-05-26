import styled from 'styled-components';
import { Project } from '@/types/project';
import { ReactNode } from 'react';
import ProjectCard from '../project/ProjectCard';
import { useRouter } from 'next/router';

type Props = {
  data: Project[];
  title: string;
  skeleton?: ReactNode;
  children?: ReactNode;
};

const ProjectCardBox = ({ title, data, skeleton, children }: Props) => {
  const router = useRouter();

  return (
    <Box>
      <div className="nanum-bold">
        <div className="title-box">
          <div className="sub-title">{title === '인기 프로젝트' && 'HOT'}</div>
          <div>{title}</div> {children}
        </div>
        {router.pathname === '/' && title === '인기 프로젝트' && (
          <div
            className="more"
            onClick={() => router.push('/project')}
          >{`더 보기 >`}</div>
        )}
      </div>
      <div className="projects-box">
        {data?.map((project: Project) => (
          <ProjectCard key={project.projectId} size={'sm'} data={project} />
        ))}
      </div>
      {skeleton}
    </Box>
  );
};

export default ProjectCardBox;

const Box = styled.div`
  margin-bottom: 40px;
  > .nanum-bold {
    display: flex;
    justify-content: space-between;
    align-items: end;

    .title-box {
      display: flex;
      flex-direction: column;
      width: 100%;
      .sub-title {
        font-size: 14px;
        color: red;
      }
    }

    .more {
      font-size: 14px;
      font-weight: 400;
      color: #a6a6a6;
      cursor: pointer;
      white-space: nowrap;
    }
  }
  .projects-box {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-top: 16px;
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
