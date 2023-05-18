import { api } from '@/util/api';
import axios from 'axios';
import { useQuery } from 'react-query';
// import { useRecoilState, useSetRecoilState } from 'recoil';

interface IProps {
  id?: number | undefined;
  keyword?: string | undefined;
  page?: number;
  pageSize?: number;
}

export default function useUser({ id, keyword, page, pageSize }: IProps) {
  // const setIsLoggedIn = useSetRecoilState(userStatus);
  // const queryClient = useQueryClient();

  const userQuery = useQuery(['users'], () => getUsers(page, pageSize));

  // const getUserStatus = useQuery(['loggedIn'], getStatus);
  // const getMyInfo = useQuery(['users', 'me'], getMe);
  // const setUserLogOut = useMutation(logOut, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['loggedIn']);
  //     setIsLoggedIn(false);
  //   },
  // });

  const getUserById = useQuery(['loggedIn', id], () => getUser(id));

  const searchUserByKeyword = useQuery(['users', keyword], () =>
    searchUser(keyword)
  );

  return {
    userQuery, //
    getUserById,
    // getUserStatus,
    // setUserLogOut,
    // getMyInfo,
    searchUserByKeyword,
  };
}

// async function getStatus(): Promise<boolean> {
//   const response = await axios.get('/api/users/status');
//   return response.data.ok;
// }
async function getUsers(page?: number, pageSize?: number) {
  const response = await fetch(
    'https://2e7e-1-228-217-180.ngrok-free.app/member/findAll?page=1&size=12'
  );
  return response;
}
// async function getMe() {
//   const response = await axios.get('/api/users/me');
//   return response.data;
// }

// const logOut = async () => {
//   const response = await fetch('/api/users/logout', {
//     method: 'POST',
//   });

//   if (!response.ok) {
//     throw new Error('Logout failed');
//   }
// };
const getUser = async (id: number | undefined) => {
  if (!id) return;
  const response = await axios.get(`/api/users/${id}`);
  return response.data;
};

export const searchUser = async (keyword: string | undefined) => {
  // if (!name) throw new Error('ID is undefined');
  if (!keyword) return;
  const response = await axios.get(`/api/users/search`, {
    params: { keyword },
  });
  return response.data;
};
