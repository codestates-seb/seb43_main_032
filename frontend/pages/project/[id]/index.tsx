import GridBox from '@/components/GridBox';
import styled from 'styled-components';

const ViewProject = () => {
  return (
    <GridBox>
      <Side>사이드</Side>
      <Main>메인</Main>
    </GridBox>
  );
};

export default ViewProject;

const Side = styled.div``;

const Main = styled.div``;
