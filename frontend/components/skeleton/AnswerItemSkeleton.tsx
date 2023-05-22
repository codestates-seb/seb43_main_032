import Skeleton from './Skeleton';

const AnswerItemSkeleton = ({ count }: { count: number }) => {
  const itemCount = Array(count).fill(1);
  return (
    <>
      {itemCount.map((item, i) => (
        <Skeleton key={item + i} width={'100%'} height={'140px'} />
      ))}
    </>
  );
};

export default AnswerItemSkeleton;
