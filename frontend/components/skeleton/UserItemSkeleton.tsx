import Skeleton from './Skeleton';

type Props = {
  count: number;
};

const UserItemSkeleton = ({ count }: Props) => {
  const skeletonBox = Array(count).fill(1);
  return (
    <>
      {skeletonBox.map((x, i) => (
        <Skeleton key={x + i} width={'100%'} height={'300px'} />
      ))}
    </>
  );
};

export default UserItemSkeleton;
