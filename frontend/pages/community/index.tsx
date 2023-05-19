import GridBox from '@/components/GridBox';
import Content from '@/components/community/Content';
import SideBar from '@/components/community/SideBar';
import styled from 'styled-components';

const Community = () => {
  return (
    <Box>
      <SideBar />
      <Content />
    </Box>
  );
};

export default Community;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: auto;
`;

const Box = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 20px 10px;
  @media (max-width: 960px) {
    display: flex;
    flex-direction: column;
  }
`;
