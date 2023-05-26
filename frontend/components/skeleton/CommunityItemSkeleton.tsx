import styled from 'styled-components';
import Skeleton from './Skeleton';

type Props = {
  count: number;
  gap: string;
  width: string;
};

const CommunityItemSkeleton = ({ width, gap, count }: Props) => {
  const skeletonBox = Array(count).fill(1);
  return (
    <Container gap={gap}>
      {skeletonBox.map((x, i) => (
        <Skeleton key={x + i} width={width} height={'120px'} />
      ))}
    </Container>
  );
};

export default CommunityItemSkeleton;

type ContainerProps = {
  gap: string;
};

const Container = styled.div<ContainerProps>`
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => props.gap};
`;
