import styled from 'styled-components';

import Skeleton from './skeleton/Skeleton';

const EiditorSkeleton = () => {
  return (
    <Container>
      <Skeleton width={'100%'} height={'49px'} />
      <Skeleton width={'100%'} height={'422px'} />
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
`;

export default EiditorSkeleton;
