import GridBox from '@/components/GridBox';
import Content from '@/components/community/Content';
import SideBar from '@/components/community/SideBar';
import styled from 'styled-components';

//커뮤니티 홈 페이지 입니다. 경로 '/community/'
const Community = () => {
  return (
    <GridBox>
      <SideBar />
      <Content />
    </GridBox>
  );
};

export default Community;

export const MinusTop = styled.div``;
