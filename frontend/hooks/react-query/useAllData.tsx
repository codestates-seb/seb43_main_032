import { Project } from '@/types/project';
import { useQuery } from 'react-query';
import { Community } from '@/types/community';
import { getAllCommunity, getAllProject } from '@/util/api/getAllData';

export const useAllData = () => {
  //프로젝트 좋아요 높은 순 5개
  const {
    data: projectData,
    isLoading: projectLoading,
    error: projectError,
    refetch: projectRefetch,
  } = useQuery<Project[], Error>('projects-all-data', () => getAllProject());

  //프로젝트 좋아요 높은 순 5개
  const {
    data: communityData,
    isLoading: communityLoading,
    error: communityError,
    refetch: communityRefetch,
  } = useQuery<Community[], Error>('community-all-data', () =>
    getAllCommunity()
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
  };
};
