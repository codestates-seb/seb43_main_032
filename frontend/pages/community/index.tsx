import Content from '@/components/community/Content';
import Head from 'next/head';
import styled from 'styled-components';

const Community = () => {
  return (
    <>
      <Head>
        <title>{`SIDE QUEST - 커뮤니티`}</title>
      </Head>
      <Box>
        <Content />
      </Box>
    </>
  );
};

export default Community;

const Box = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
