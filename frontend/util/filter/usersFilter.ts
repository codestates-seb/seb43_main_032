import { POSITIONS, POST_COMMUNITY_CATEGORY } from '@/constant/constant';
import { UserState } from '@/types/user';

export const usersFilter = (
  data: UserState[] | undefined,
  filter: number,
  inputValue: string
) => {
  if (filter === -1 && inputValue !== '') {
    return data?.filter((data) => data.name.includes(inputValue));
  }
  if (filter === -1) {
    return data;
  }
  let filterData;
  if (filter !== -1) {
    filterData = data?.filter(
      (user) => user.position === POST_COMMUNITY_CATEGORY[POSITIONS[filter]]
    );
  }
  if (inputValue !== '') {
    filterData = filterData?.filter((data) => data.name.includes(inputValue));
  }
  return filterData;
};
