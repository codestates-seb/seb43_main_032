//홈 페이지 입니다. 경로 '/'
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { api } from '@/util/api';
import ProjectCardbox from '@/components/project/ProjectCardbox';
import { Project } from '@/types/types';

// const Banner = styled.div`
//   width: 100%;
//   height: 600px;
//   background-color: #dcdcdc;
// `;

const Box = styled.div`
  width: 100%;
  padding: var(--padding-2);
  > div {
  }
`;

const Home = () => {
  // useQuery를 사용하여 데이터 fetch
  const { data, isLoading, error } = useQuery<
    {
      data: Project[];
      total: number;
    },
    Error
  >('projects', () => api('/project?size=4&page=1').then((res) => res.data));

  // 만약 데이터가 없다면 아무것도 반환하지 않음
  if (isLoading) return <Message>로딩중입니다.</Message>;
  if (error) return <Message>잠시 후 다시 시도해주세요.</Message>;
  if (!data) return;
  return (
    <Box>
      <ProjectCardbox data={data.data} title={'주목할만한 프로젝트'} />
      <ProjectCardbox data={data.data} title={'프로젝트 자랑하기'} />
    </Box>
  );
};

export default Home;

const Box = styled.div`
  width: 100%;
  padding: var(--padding-2);
`;
