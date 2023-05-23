import styled from 'styled-components';
import { AiTwotoneLike } from 'react-icons/ai';
import Stack from '../stack/Stack';
import { useRouter } from 'next/router';
import { Project, Tech } from '@/types/project';

export default function UserProjectCard({ project }: { project: Project }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/project/${project.projectId}`);
  };
  return (
    <Wrapper onClick={handleClick}>
      <ContentContainer>
        <CardInfo>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>
            {project.title}
          </h1>
          <span>
            {`프로젝트 기간 : ${project.startDate}~ ${project.endDate}`}
          </span>
        </CardInfo>
        <TagContainer>
          {project.techList.map((stack: Tech) => (
            <Stack key={stack.tech} tech={stack.tech} />
          ))}
        </TagContainer>
        <span>
          Lorem ipsum dolor sit amet consectetur. Sit penatibus maecenas
          sollicitudin augue ac facilisi at varius tincidunt. Risus volutpat
          gravida a pharetra. Tortor semper ultrices.Lorem ipsum dolor sit amet
          consectetur. Sit penatibus maecenas sollicitudin augue ac facilisi at
          varius tincidunt. Risus volutpat gravida a pharetra. Tortor semper
          ultrices.
        </span>
      </ContentContainer>
      <StarRaiting>
        <AiTwotoneLike size={30} style={{ color: '#6C82CA' }} />
        <p style={{ marginTop: '5px' }}>{project.totalLikes}</p>
      </StarRaiting>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: center;
  border-radius: var(--radius-def);
  cursor: pointer;
  box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.25);
  -webkit-box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.25);
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const CardInfo = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  h1 {
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const TagContainer = styled.div`
  padding: 10px;
  padding-left: 0;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;
const StarRaiting = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 20px;
`;
