import { Project } from '@/types/project';

type Props = {
  filter: number;
  allData: Project[];
  searchVal: string;
};

export const projectFilter = ({ filter, allData, searchVal }: Props) => {
  if (filter === 0 && searchVal !== '') {
    return allData.filter(
      (data: Project) =>
        data.title.includes(searchVal) ||
        data.content.includes(searchVal) ||
        data.memberInfo.name.includes(searchVal)
    );
  }
  if (filter === 0) {
    return;
  }
  let filterData;
  if (filter === 1) {
    filterData = allData.reverse();
  }
  if (filter === 2) {
    filterData = allData.sort((x, y) => y.views - x.views);
  }
  if (filter === 3) {
    filterData = allData.sort((x, y) => y.totalLikes - x.totalLikes);
  }
  if (filter === 4) {
    filterData = allData.sort((x, y) => y.totalAnswers - x.totalAnswers);
  }
  if (searchVal !== '') {
    filterData = (filterData as []).filter(
      (data: Project) =>
        data.title.includes(searchVal) ||
        data.content.includes(searchVal) ||
        data.memberInfo.name.includes(searchVal)
    );
  }

  return filterData;
};
