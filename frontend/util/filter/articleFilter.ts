import { Community } from '@/types/community';
import { Project } from '@/types/project';

type Props = {
  filter: number;
  allData: Project[] | Community[];
  searchVal: string;
  type: number;
};

//type 1은 프로젝트

export const articleFilter = ({ type, filter, allData, searchVal }: Props) => {
  if (type === 1 && filter === 0) {
    return;
  }
  if (allData.length !== 0 && filter === 0 && searchVal === '') {
    return allData;
  }
  if (allData.length === 0) {
    return [];
  }
  let filterData;
  if (filter === 1) {
    filterData = allData.reverse();
  }
  if (filter === 2) {
    filterData = allData.sort(
      (x, y) => (y as Project).views - (x as Project).views
    );
    if ((allData[0] as Project).views as Number) {
    }
    filterData = allData.sort(
      (x, y) => (y as Community).view - (x as Community).view
    );
  }
  if (filter === 3) {
    filterData = allData.sort((x, y) => y.totalLikes - x.totalLikes);
  }
  if (filter === 4) {
    filterData = allData.sort((x, y) => y.totalAnswers - x.totalAnswers);
  }
  if (searchVal !== '' && filter === 0) {
    filterData = (allData as []).filter(
      (data: Community | Project) =>
        data.title.includes(searchVal) ||
        data.content.includes(searchVal) ||
        data.memberInfo.name.includes(searchVal)
    );
    return filterData;
  }
  if (searchVal !== '') {
    filterData = (filterData as []).filter(
      (data: Community | Project) =>
        data.title.includes(searchVal) ||
        data.content.includes(searchVal) ||
        data.memberInfo.name.includes(searchVal)
    );
  }

  return filterData;
};
