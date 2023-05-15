import styled from 'styled-components';
import Skeleton from './Skeleton';

type Props = {
  count: number;
};

const CommunityItemSkeleton = ({ count }: Props) => {
  const skeletonBox = Array(count).fill(1);
  return (
    <Container>
      {skeletonBox.map((x, i) => (
        <Skeleton key={x + i} width={'100%'} height={'120px'} />
      ))}
    </Container>
  );
};

export default CommunityItemSkeleton;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
