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
  let filterData;
  if (!category) {
    filterData = allData;
  } else {
    filterData = allData.filter((data) => data.category === category);
  }
  if (filter === 1) {
    filterData = filterData.sort(
      (x, y) =>
        new Date(x.createdAt).getTime() - new Date(y.createdAt).getTime()
    );
  }
  if (filter === 2) {
    filterData = filterData.sort((x, y) => y.view - x.view);
  }
  if (filter === 3) {
    filterData = filterData.sort((x, y) => y.totalLikes - x.totalLikes);
  }
  if (filter === 4) {
    filterData = filterData.sort((x, y) => y.totalAnswers - x.totalAnswers);
  }
  if (searchVal !== '') {
    filterData = filterData.filter(
      (data: Community) =>
        data.title.includes(searchVal) ||
        data.content.includes(searchVal) ||
        data.memberInfo.name.includes(searchVal) ||
        data.techList.map((tech) => tech.tech).includes(searchVal)
    );
    return filterData;
  }
  return filterData;
};
