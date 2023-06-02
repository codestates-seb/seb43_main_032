import Content from '@/components/community/Content';
import Head from 'next/head';
import styled from 'styled-components';
import { getAllCommunity } from '@/util/api/getAllData';
import { AllCommunity } from '@/types/community';

const Community = ({ communityData }: { communityData: AllCommunity }) => {
  return (
    <>
      <Head>
        <title>{`SIDE QUEST - 커뮤니티`}</title>
      </Head>
      <Box>
        <Content communityData={communityData} />
      </Box>
    </>
  );
};

export default Community;

export async function getServerSideProps() {
  const communityData = await getAllCommunity();

  return {
    props: { communityData },
  };
}

const Box = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
