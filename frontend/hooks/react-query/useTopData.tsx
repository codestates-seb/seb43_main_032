import { Project } from '@/types/project';
import { api } from '@/util/api';
import { useQuery } from 'react-query';
import { useCommunity } from './community/useCommunity';
import { Community } from '@/types/community';
import { useRouter } from 'next/router';

export const useTopData = () => {
  const router = useRouter();
  const { id } = router.query;

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
    if (!id) return await api('/projects/likes-top5').then((res) => res.data);
  });

  //프로젝트 조회 수 높은 순 5개
  const {
    data: topViewProjects,
    isLoading: topViewProjectLoading,
    error: topViewProjectError,
    refetch: topViewProjectRefecth,
  } = useQuery<
    {
      data: {
        projectList: Project[];
      };
    },
    Error
  >('projects-top-view-list', async () => {
    if (!id) return await api('/projects/views-top5').then((res) => res.data);
  });

  //커뮤니티 조회 수 높은 순 5개
  const queryKey = ['article-top-hot-list'];
  const address = `/articles/view-top5`;
  const { communityQuery } = useCommunity<{
    articleList: Community[];
  }>({
    address,
    queryKey,
  });

  //데이터 모음
  const topLikeProjectData = topLikeProjects?.data?.projectList.slice(0, 4);
  const topViewProjectData = topViewProjects?.data?.projectList.slice(0, 4);
  const topViewcommunityData = communityQuery.data?.data?.articleList;

  //
  const checkError =
    topLikeProjectError || topViewProjectError || communityQuery.error;

  return {
    topLikeProjectData,
    topViewProjectData,
    topViewcommunityData,
    communityQuery,
    topLikeProjectLoading,
    topViewProjectLoading,
    topLikeProjectRefecth,
    topViewProjectRefecth,
    checkError,
  };
};
