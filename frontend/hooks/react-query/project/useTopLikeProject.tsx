import { Project } from '@/types/project';
import { api } from '@/util/api';
import { useQuery } from 'react-query';

export const useTopLikeProject = () => {
  //프로젝트 좋아요 높은 순 5개
  const {
    data: topLikeProjects,
    isLoading: topLikeProjectLoading,
    error: topLikeProjectError,
    refetch: topLikeProjectRefecth,
  } = useQuery<
    {
      data: {
        projectList: Project[];
      };
    },
    Error
  >('projects-top-like-list', async () => {
    return await api('/projects/likes-top5').then((res) => res.data);
  });

  const topLikeProjectData = topLikeProjects?.data?.projectList.slice(0, 4);

  return {
    topLikeProjectData,
    topLikeProjectRefecth,
    topLikeProjectLoading,
    topLikeProjectError,
  };
};
