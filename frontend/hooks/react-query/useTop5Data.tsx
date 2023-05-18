import { Project } from '@/types/project';
import { api } from '@/util/api';
import { useQuery } from 'react-query';
import { useCommunity } from './community/useCommunity';
import { Community } from '@/types/community';

export const useTop5Data = () => {
  //프로젝트 좋아요 높은 순 5개
  const {
    data: topLikeProjects,
    isLoading: topLikeProjectLoading,
    error: topLikeProjectError,
  } = useQuery<
    {
      data: {
        projectList: Project[];
      };
    },
    Error
  >('projects', () => api('/projects/likes-top5').then((res) => res.data));

  //프로젝트 조회 수 높은 순 5개
  const {
    data: topViewProjects,
    isLoading: topViewProjectLoading,
    error: topViewProjectError,
  } = useQuery<
    {
      data: {
        projectList: Project[];
      };
    },
    Error
  >('projects', () => api('/projects/views-top5').then((res) => res.data));

  //커뮤니티 조회 수 높은 순 5개
  const queryKey = ['article', 'hot'];
  const address = `/articles/view-top5`;
  const { communityQuery } = useCommunity<{ articleList: Community[] }>({
    address,
    queryKey,
  });

  //데이터 모음
  const topLikeProjectData = topLikeProjects?.data?.projectList.slice(0, 4);
  const topViewProjectData = topViewProjects?.data?.projectList.slice(0, 4);
  const topViewcommunityData = communityQuery.data?.data?.articleList;

  return {
    topLikeProjectData,
    topViewProjectData,
    topViewcommunityData,
    communityQuery,
    topLikeProjectLoading,
    topViewProjectLoading,
    topLikeProjectError,
    topViewProjectError,
  };
};
