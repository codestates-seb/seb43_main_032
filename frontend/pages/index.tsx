import styled from 'styled-components';
import { useQuery } from 'react-query';
import { api } from '@/util/api';
import { Project } from '@/types/project';
import Message from '@/components/Message';
import { Community } from '@/types/community';
import { useCommunity } from '@/hooks/react-query/useCommunity';
import ContentCardbox from '@/components/ContentCardbox';

const Home = () => {
  //프로젝트 데이터
  const { data, isLoading, error } = useQuery<
    {
      data: Project[];
      total: number;
    },
    Error
  >('projects', () => api('/project?size=4&page=1').then((res) => res.data));

  //커뮤니티 조회수 높은거 5개만 가져오면 될듯??
  const community_page_limit = 5;
  const queryKey = ['community', 'filter'];
  const address = `/community?size=${community_page_limit}&page=1`; // 나중에 필터를 추가하면 넣으면 될듯?
  const { communityQuery, refetch } = useCommunity<Community[]>({
    address,
    queryKey,
  });

  if (isLoading) return <Message>로딩중입니다.</Message>;
  if (error) return <Message>잠시 후 다시 시도해주세요.</Message>;
  if (!data || !communityQuery.data) return;
  return (
    <Box>
      <ContentCardbox type={1} data={data.data} title={'인기 프로젝트'} />
      <ContentCardbox
        type={2}
        data={communityQuery.data.data}
        title={'인기 커뮤니티'}
      />
      <ContentCardbox type={1} data={data.data} title={'종료 프로젝트'} />
    </Box>
  );
};

export default Home;

const Box = styled.div`
  width: 100%;
  padding: var(--padding-2);
`;
