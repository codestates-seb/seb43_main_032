import styled from 'styled-components';
import ProjectCardBox from '@/components/card_box/ProjectCardBox';
import CommunityCardBox from '@/components/card_box/CommunityCardBox';
import { useState } from 'react';
import UserCardBox from '@/components/card_box/UserCardBox';
import Head from 'next/head';
import { api } from '@/util/api';
import { MemberInfo } from '@/types/types';

const Home = ({
  topLikeProjectData,
  topViewProjectData,
  topViewCommunityData,
  topLikeCommunityData,
  topMembersData,
}: any) => {
  const [communityFilter, setCommunityFilter] = useState(0);
  const filterHandler = (idx: number) => {
    setCommunityFilter(idx);
  };
  const community = [topViewCommunityData, topLikeCommunityData];

  return (
    <>
      <Head>
        <title>SIDE QUEST</title>
      </Head>
      <Box>
        <ProjectCardBox data={topLikeProjectData} title={'인기 프로젝트'} />
        <ProjectCardBox
          data={topViewProjectData}
          title={'주목 중인 프로젝트'}
        />
        <CommunityCardBox
          filterHandler={filterHandler}
          selected={communityFilter}
          data={community[communityFilter]}
        />
        <UserCardBox data={topMembersData} />
      </Box>
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  const topLikeProjectData = await api('/projects/likes-top5').then((res) =>
    res.data.data.projectList.slice(0, 4)
  );
  const topViewProjectData = await api('/projects/views-top5').then((res) =>
    res.data.data.projectList.slice(0, 4)
  );
  const topViewCommunityData = await api('/articles/view-top5').then(
    (res) => res.data.data.articleList
  );
  const topLikeCommunityData = await api('/articles/likes-top5').then(
    (res) => res.data.data.articleList
  );
  const topMembersData = await api('/members/find-all?page=1&size=1000').then(
    (res) =>
      res.data.data
        ?.sort((x: MemberInfo, y: MemberInfo) => y.totalStar - x.totalStar)
        .slice(0, 5)
  );

  return {
    props: {
      topLikeProjectData,
      topViewProjectData,
      topViewCommunityData,
      topLikeCommunityData,
      topMembersData,
    },
  };
}

const Box = styled.div`
  width: 100%;
  padding: var(--padding-2);

  .community-box {
    > div {
      width: 100%;
    }
  }
`;
