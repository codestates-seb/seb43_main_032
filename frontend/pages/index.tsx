//홈 페이지 입니다. 경로 '/'
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { api } from '@/util/api';
import Message from '@/components/Message';
import { Project } from '@/types/project';
import { Community } from '@/types/community';
import { useCommunity } from '@/hooks/react-query/useCommunity';
import ProjectCardBox from '@/components/card_box/ProjectCardBox';
import CommunityCardBox from '@/components/card_box/CommunityCardBox';
import ProjectSkeleton from '@/components/skeleton/ProjectSkeleton';
import CommunityItemSkeleton from '@/components/skeleton/CommunityItemSkeleton';

const Home = () => {
  // useQuery를 사용하여 데이터 fetch
  const { data, isLoading, error } = useQuery<
    {
      data: Project[];
      total: number;
    },
    Error
  >('projects', () => api('/project?size=4&page=1').then((res) => res.data));

  //커뮤니티 조회수 높은거 5개만 가져오면 될듯??
  const community_page_limit = 5;
  const queryKey = ['community', 'hot'];
  const address = `/community?size=${community_page_limit}&page=1`;
  const { communityQuery } = useCommunity<Community[]>({
    address,
    queryKey,
  });
  const projectData = data?.data;
  const communityData = communityQuery.data?.data;

  if (isLoading) return <Message>로딩중입니다.</Message>;
  if (error) return <Message>잠시 후 다시 시도해주세요.</Message>;
  if (!projectData || !communityData) return;
  return (
    <Box>
      <ProjectCardBox
        skeleton={isLoading && <ProjectSkeleton />}
        data={projectData}
        title={'인기 프로젝트'}
      />
      <CommunityCardBox
        skeleton={
          communityQuery.isLoading && <CommunityItemSkeleton count={5} />
        }
        data={communityData}
        title={'인기 커뮤니티'}
      />
      <ProjectCardBox
        skeleton={isLoading && <ProjectSkeleton />}
        data={projectData}
        title={'종료 프로젝트'}
      />
    </Box>
  );
};

export default Home;

const Box = styled.div`
  width: 100%;
  padding: var(--padding-2);
`;
