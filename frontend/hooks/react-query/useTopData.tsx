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
  const viewAddress = `/articles/view-top5`;
  const viewQueryKey = ['article-top-view-list'];
  const { communityQuery: topViewcommunityQuery } = useCommunity<{
    articleList: Community[];
  }>({
    address: viewAddress,
    queryKey: viewQueryKey,
  });

  //커뮤니티 하트 수 높은 순 5개
  const likeQueryKey = ['article-top-heart-list'];
  const likeAddress = `/articles/likes-top5`;
  const { communityQuery: topLikecommunityQuery } = useCommunity<{
    articleList: Community[];
  }>({
    address: likeAddress,
    queryKey: likeQueryKey,
  });

  //데이터 모음
  const topLikeProjectData = topLikeProjects?.data?.projectList.slice(0, 4);
  const topViewProjectData = topViewProjects?.data?.projectList.slice(0, 4);
  const topViewCommunityData = topViewcommunityQuery.data?.data?.articleList;
  const topLikeCommunityData = topLikecommunityQuery.data?.data.articleList;

  //에러체크
  const checkError =
    topLikeProjectError ||
    topViewProjectError ||
    topViewcommunityQuery.error ||
    topLikecommunityQuery.error;

  return {
    topLikeProjectData,
    topViewProjectData,
    topViewCommunityData,
    topLikeCommunityData,
    topLikecommunityQuery,
    topViewcommunityQuery,
    topLikeProjectLoading,
    topViewProjectLoading,
    topLikeProjectRefecth,
    topViewProjectRefecth,
    checkError,
  };
};
