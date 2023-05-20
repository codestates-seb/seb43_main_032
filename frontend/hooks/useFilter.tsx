import { Community } from '@/types/community';
import { Project } from '@/types/project';
import { useEffect } from 'react';

type Props = {
  filter: number;
  allData: Project[] | Community[];
  setAllData: ([]) => void;
  refetch: () => void;
};

export const useFilter = ({ filter, allData, setAllData, refetch }: Props) => {
  useEffect(() => {
    if (filter === 0) {
      setAllData([]);
      refetch();
    }
    if (filter === 1) {
      setAllData(allData.reverse());
    }
    if (filter === 2) {
      if ((allData[0] as Project).views as Number) {
        return setAllData(
          allData.sort((x, y) => (y as Project).views - (x as Project).views)
        );
      }
      setAllData(
        allData.sort((x, y) => (y as Community).view - (x as Community).view)
      );
    }
    if (filter === 3) {
      setAllData(allData.sort((x, y) => y.totalLikes - x.totalLikes));
    }
    if (filter === 4) {
      setAllData(allData.sort((x, y) => y.totalAnswers - x.totalAnswers));
    }
  }, [filter]);
};
