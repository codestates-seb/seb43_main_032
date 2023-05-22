import styled from 'styled-components';
import Message from '@/components/Message';
import ProjectCardBox from '@/components/card_box/ProjectCardBox';
import CommunityCardBox from '@/components/card_box/CommunityCardBox';
import ProjectSkeleton from '@/components/skeleton/ProjectSkeleton';
import CommunityItemSkeleton from '@/components/skeleton/CommunityItemSkeleton';
import { useTopData } from '@/hooks/react-query/useTopData';

const Home = () => {
  const {
    topLikeProjectData,
    topViewProjectData,
    topViewCommunityData,
    topLikeCommunityData,
    topViewcommunityQuery,
    topLikecommunityQuery,
    topLikeProjectLoading,
    topViewProjectLoading,
    checkError,
  } = useTopData();

  if (checkError) return <Message>잠시 후 다시 시도해주세요.</Message>;
  return (
    <Box>
      <ProjectCardBox
        skeleton={topLikeProjectLoading && <ProjectSkeleton />}
        data={topLikeProjectData ? topLikeProjectData : []}
        title={'인기 프로젝트'}
      />
      <ProjectCardBox
        skeleton={topViewProjectLoading && <ProjectSkeleton />}
        data={topViewProjectData ? topViewProjectData : []}
        title={'주목 중인 프로젝트'}
      />
      <CommunityCardBox
        skeleton={
          topViewcommunityQuery.isLoading && <CommunityItemSkeleton count={5} />
        }
        data={topViewCommunityData ? topViewCommunityData : []}
        title={'인기 커뮤니티'}
      />
    </Box>
  );
};

export default Home;

const Box = styled.div`
  width: 100%;
  padding: var(--padding-2);
`;
