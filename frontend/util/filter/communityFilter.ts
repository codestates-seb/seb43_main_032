import { Community } from '@/types/community';

type Props = {
  allData: Community[];
  searchVal: string;
  filter: number;
  category: string;
};

export const communityFilter = ({
  allData,
  category,
  searchVal,
  filter,
}: Props) => {
  if (!category) {
    return allData;
  }
  return allData.filter((data) => data.category === category);
};
