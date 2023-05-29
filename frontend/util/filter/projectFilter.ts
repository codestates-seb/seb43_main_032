import { Project } from '@/types/project';
import { formatSkill } from '../stack/formatSkill';

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
        data.memberInfo.name.includes(searchVal) ||
        data.techList
          .map((tech) => formatSkill(tech.tech))
          .includes(searchVal) ||
        data.fieldList.map((tag) => tag.field).includes(searchVal)
    );
  }
  let filterData;
  if (filter === 1) {
    filterData = allData.sort(
      (x, y) =>
        new Date(x.createdAt).getTime() - new Date(y.createdAt).getTime()
    );
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
  if (searchVal !== '' && filterData) {
    filterData = filterData.filter(
      (data: Project) =>
        data.title.includes(searchVal) ||
        data.content.includes(searchVal) ||
        data.memberInfo.name.includes(searchVal) ||
        data.techList
          .map((tech) => formatSkill(tech.tech))
          .includes(searchVal) ||
        data.fieldList.map((tag) => tag.field).includes(searchVal)
    );
  }

  return filterData;
};
