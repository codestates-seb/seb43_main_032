import { Project } from '@/types/project';
import { User, UserState } from '@/types/user';
import { api } from '@/util/api';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Community } from '@/types/community';
import { getCookie } from '@/util/cookie';

interface IProps {
  id?: number | undefined;
  keyword?: string | undefined;
  page?: number;
  pageSize?: number;
  userPage?: number;
  userPageSize?: number;
  projectData?: Project[];
  communityData?: Community[];
}

export default function useUser({
  id,
  keyword,
  page,
  pageSize,
  userPage,
  userPageSize,
  projectData,
  communityData,
}: IProps) {
  const queryClient = useQueryClient();

  const userQuery = useQuery(['users', userPage], () =>
    getUsers(userPage, userPageSize)
  );

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

  const updateUser = useMutation(
    (updatedData: { [key: string]: any }) => api.patch('/members', updatedData),
    {
      onSuccess: () => {
        // 수정이 성공하면 'users' 쿼리를 무효화하여 다시 가져옵니다.
        queryClient.invalidateQueries(['users', 'me']);
      },
    }
  );
  const userAnswers = useQuery(['users', 'answers'], getUserAnswers);

  const getMyProjects = useQuery(['users', 'projects', 'me'], getMyProject);

  const allProjcetsQuery = useQuery(['projects', 'all'], () =>
    api(`/projects/findAll?size=1000&page=1`).then((res) => res.data.data)
  );
  return {
    userQuery, //
    getUserById,
    getMyInfo,
    getProjectByUserId,
    getPostsByUserId,
    updateUser,
    userAnswers,
    getMyProjects,
    allProjcetsQuery,
  };
}

export async function getUsers(
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
async function getMe(): Promise<User | undefined> {
  if (!getCookie('accessToken')) return;
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

async function getUserAnswers() {
  const response = await api.get('/members/info/answers');
  return response.data.data;
}

async function getMyProject() {
  const response = await api.get('/members/info/projects');
  return response.data.data;
}
