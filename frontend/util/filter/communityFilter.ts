import { Community } from '@/types/community';

type Props = {
  allData: Community[];
  category: string;
};

export const communityFilter = ({ allData, category }: Props) => {
  return allData.filter((data) => data.category === category);
};
