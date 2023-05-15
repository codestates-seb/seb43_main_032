//홈 페이지 입니다. 경로 '/'
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { api } from '@/util/api';
import ProjectCardbox from '@/components/project/ProjectCardbox';
import Message from '@/components/Message';
import { FcSms } from 'react-icons/fc';
import { useState } from 'react';
import { Modal } from '@/components/Modal';
import { Project } from '@/types/project';
import Message from '@/components/Message';
import { Community } from '@/types/community';
import { useCommunity } from '@/hooks/react-query/useCommunity';
import ContentCardbox from '@/components/ContentCardbox';

const Box = styled.div`
  width: 100%;
  padding: var(--padding-2);
`;

const Home = () => {
  const [isModal, setIsModal] = useState(false);
  
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
          <FcSms size={70} onClick={() => setIsModal(true)} className="icon" />
        {isModal ? <Modal setIsModal={setIsModal} /> : null}
    </Box>
  );
};

export default Home;
