import { Community } from '@/types/community';
import { Project } from '@/types/project';

type Props = {
  filter: number;
  allData: Project[] | Community[];
};

// 검색 필터도 이 안에 추가할듯

export const articleFilter = ({ filter, allData }: Props) => {
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
  return filterData;
};
