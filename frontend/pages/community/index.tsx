import GridBox from '@/components/GridBox';
import Content from '@/components/community/Content';
import SideBar from '@/components/community/SideBar';
import styled from 'styled-components';

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
