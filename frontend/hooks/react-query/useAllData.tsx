import { Project } from '@/types/project';
import { useQuery } from 'react-query';
import { Community } from '@/types/community';
import { getAllCommunity, getAllProject } from '@/util/api/getAllData';
import { User } from '@/types/user';
import { api } from '@/util/api';

export const useAllData = () => {
  const {
    data: projectData,
    isLoading: projectLoading,
    error: projectError,
    refetch: projectRefetch,
  } = useQuery<Project[], Error>('projects-all-data', () => getAllProject());

  const {
    data: communityData,
    isLoading: communityLoading,
    error: communityError,
    refetch: communityRefetch,
  } = useQuery<Community[], Error>('community-all-data', () =>
    getAllCommunity()
  );

  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
    refetch: userRefetch,
  } = useQuery<User[], Error>('user-all-data', () =>
    api('/members/find-all?size=1000&page=1').then((res) => res.data.data)
  );


  return {
    projectData,
    projectLoading,
    projectError,
    projectRefetch,
    communityData,
    communityLoading,
    communityError,
    communityRefetch,
    userData,
    userLoading,
    userError,
    userRefetch,
  };
};
