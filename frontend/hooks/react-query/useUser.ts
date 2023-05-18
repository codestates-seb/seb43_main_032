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
  const getMyInfo = useQuery(['users', 'me'], getMe);
  // const setUserLogOut = useMutation(logOut, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['loggedIn']);
  //     setIsLoggedIn(false);
  //   },
  // });

  const getUserById = useQuery(['loggedIn', id], () => getUser(id));

  const getProjectByUserId = useQuery(['userProjects', id], () =>
    getUserProjects(id)
  );

  const getPostsByUserId = useQuery(['userProjects', id], () =>
    getUserPosts(id)
  );

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
    getProjectByUserId,
    getPostsByUserId,
  };
}

// async function getStatus(): Promise<boolean> {
//   const response = await axios.get('/api/users/status');
//   return response.data.ok;
// }
async function getUsers(page?: number, pageSize?: number) {
  const response = await api.get('/member/findall', {
    params: {
      page,
      size: pageSize,
    },
  });
  return response;
}
async function getMe() {
  const response = await axios.get('/member/info');
  return response.data;
}

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
  const response = await axios.get(`/member/info/${id}`);
  return response.data;
};

const getUserProjects = async (id: number | undefined) => {
  if (!id) return;
  const response = await axios.get(`/member/${id}/projects`);
  return response.data;
};
const getUserPosts = async (id: number | undefined) => {
  if (!id) return;
  const response = await axios.get(`/member/${id}/articles`);
  return response.data;
};
export const searchUser = async (keyword: string | undefined) => {
  //endpoint 수정 필요
  if (!keyword) return;
  const response = await axios.get(`/member/find`, {
    params: { keyword },
  });
  return response.data;
};
