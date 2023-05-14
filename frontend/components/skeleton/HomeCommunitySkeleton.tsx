import styled from 'styled-components';
import Skeleton from './Skeleton';

const HomeCommunitySkeleton = () => {
  return (
    <Container>
      <Skeleton width={'100%'} height={'120px'} />
      <Skeleton width={'100%'} height={'120px'} />
      <Skeleton width={'100%'} height={'120px'} />
      <Skeleton width={'100%'} height={'120px'} />
      <Skeleton width={'100%'} height={'120px'} />
    </Container>
  );
};

export default HomeCommunitySkeleton;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
