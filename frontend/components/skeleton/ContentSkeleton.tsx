import styled from 'styled-components';

import Skeleton from './Skeleton';

const ContentSkeleton = () => {
  return (
    <Container>
      <Skeleton width={'100%'} height={'70vh'} />
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

export default ContentSkeleton;
