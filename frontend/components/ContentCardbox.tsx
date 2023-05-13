import styled from 'styled-components';
import ProjectCard from './project/ProjectCard';
import { Project } from '@/types/project';
import { ReactNode } from 'react';
import { Community } from '@/types/community';
import ContentItem from './community/ContentItem';

type Props = {
  data: Project[] | Community[];
  title: string;
  type: number;
  children?: ReactNode;
};

const ContentCardbox = ({ type, title, data, children }: Props) => {
  return (
    <Box>
      <div className="nanum-bold">{title}</div>
      {type === 1 ? (
        <div className="projects-box">
          {(data as Project[])?.map((project: Project) => (
            <ProjectCard key={project.id} size={'sm'} data={project} />
          ))}
        </div>
      ) : (
        <div className="community-box">
          {(data as Community[])?.map((article: Community) => (
            <ContentItem {...article} key={article.id} />
          ))}
        </div>
      )}
      {children}
    </Box>
  );
};

export default ContentCardbox;

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
  .community-box {
    display: grid;
    display: flex;
    flex-direction: column;
    margin: 24px 0px;
    gap: 2px;
  }
`;
