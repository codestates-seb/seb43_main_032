import { Community } from '@/types/community';

type Props = {
  allData: Community[];
  category: string;
};

export const communityFilter = ({ allData, category }: Props) => {
  if (!category) {
    return allData;
  }
  return allData.filter((data) => data.category === category);
};
