import { Project } from '@/types/project';
import { UserState } from '@/types/user';
import { api } from '@/util/api';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useAllData } from './useAllData';
import { Community } from '@/types/community';
// import { useRecoilState, useSetRecoilState } from 'recoil';

interface IProps {
  id?: number | undefined;
  keyword?: string | undefined;
  page?: number;
  pageSize?: number;
  projectData?: Project[];
  communityData?: Community[];
}

export default function useUser({
  id,
  keyword,
  page,
  pageSize,
  projectData,
  communityData,
}: IProps) {
  // const setIsLoggedIn = useSetRecoilState(userStatus);
  // const queryClient = useQueryClient();
  console.log('projectData hook', projectData);

  const userQuery = useQuery(['users', page], () => getUsers(page, pageSize));

  const getMyInfo = useQuery(['users', 'me'], getMe);

  const getUserById = useQuery(['loggedIn', id], () => getUser(id));

  const getProjectByUserId = useQuery(
    ['userProjects', id, page, projectData?.length],
    () => getUserProjects(id, page, pageSize, projectData)
  );

  const getPostsByUserId = useQuery(
    ['userProjects', id, page, communityData?.length],
    () => getUserPosts(id, page, pageSize, communityData)
  );

  const searchUserByKeyword = useQuery(['users', keyword], () =>
    searchUser(keyword)
  );
  const allProjcetsQuery = useQuery(['projects', 'all'], () =>
    api(`/projects/findAll?size=1000&page=1`).then((res) => res.data.data)
  );

  return {
    userQuery, //
    getUserById,
    getMyInfo,
    searchUserByKeyword,
    getProjectByUserId,
    getPostsByUserId,
    allProjcetsQuery,
  };
}

// async function getStatus(): Promise<boolean> {
//   const response = await axios.get('/api/users/status');
//   return response.data.ok;
// }
async function getUsers(
  page?: number,
  pageSize?: number
): Promise<UserState[]> {
  const response = await api.get('/members/find-all', {
    params: {
      page,
      size: pageSize,
    },
  });
  return response.data.data;
}
async function getMe() {
  const response = await api.get('/members/info');
  return response.data.data;
}

const getUser = async (
  id: number | undefined
): Promise<UserState | undefined> => {
  if (!id) return;
  const response = await api.get(`/members/info/${id}`);
  return response.data.data;
};

const getUserProjects = async (
  id: number | undefined,
  page?: number,
  pageSize?: number,
  projectData?: Project[]
): Promise<Project[] | undefined> => {
  if (!id || !page || !pageSize) {
    return;
  }
  const startIdx = (page - 1) * pageSize;
  console.log('projectData', projectData);
  return (
    projectData &&
    projectData
      .filter((proj) => proj.memberInfo.memberId === id)
      .splice(startIdx, pageSize)
  );
};
const getUserPosts = async (
  id: number | undefined,
  page?: number,
  pageSize?: number,
  communityData?: Community[]
): Promise<Community[] | undefined> => {
  if (!id || !page || !pageSize) {
    console.log();
    return;
  }
  const startIdx = (page - 1) * pageSize;
  return (
    communityData &&
    communityData
      .filter((post) => post.memberInfo.memberId === id)
      .splice(startIdx, pageSize)
  );
};
export const searchUser = async (
  keyword: string | undefined
): Promise<UserState | undefined> => {
  //endpoint 수정 필요
  if (!keyword) return;
  const response = await axios.get(`/members/find`, {
    params: { keyword },
  });
  return response.data;
};
