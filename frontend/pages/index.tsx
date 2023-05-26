import styled from 'styled-components';
import ProjectCardBox from '@/components/card_box/ProjectCardBox';
import CommunityCardBox from '@/components/card_box/CommunityCardBox';
import ProjectSkeleton from '@/components/skeleton/ProjectSkeleton';
import CommunityItemSkeleton from '@/components/skeleton/CommunityItemSkeleton';
import { useTopData } from '@/hooks/react-query/useTopData';
import { useState } from 'react';
import UserCardBox from '@/components/card_box/UserCardBox';
import UserItemSkeleton from '@/components/skeleton/UserItemSkeleton';
import Head from 'next/head';
import Message from '@/components/Message';

const Home = () => {
  const {
    topLikeProjectData,
    topViewProjectData,
    topViewCommunityData,
    topLikeCommunityData,
    topMembersData,
    topViewcommunityQuery,
    topLikeProjectLoading,
    topViewProjectLoading,
    isLoadingMembers,
    checkError,
  } = useTopData();

  const [communityFilter, setCommunityFilter] = useState(0);
  const filterHandler = (idx: number) => {
    setCommunityFilter(idx);
  };
  const community = [topViewCommunityData, topLikeCommunityData];

  if (checkError) return <Message>잠시 후에 다시 시도해주세요.</Message>;
  return (
    <>
      <Head>
        <title>SIDE QUEST</title>
      </Head>
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
            topViewcommunityQuery.isLoading && (
              <CommunityItemSkeleton width="100%" gap="8px" count={5} />
            )
          }
          filterHandler={filterHandler}
          selected={communityFilter}
          data={community[communityFilter]}
        />
        <UserCardBox
          skeleton={isLoadingMembers && <UserItemSkeleton count={5} />}
          data={topMembersData ? topMembersData : []}
        />
      </Box>
    </>
  );
};

export default Home;

const Box = styled.div`
  width: 100%;
  padding: var(--padding-2);

  .community-box {
    > div {
      width: 100%;
    }
  }
`;
