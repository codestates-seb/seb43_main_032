import { Project } from '@/types/project';
import { api } from '@/util/api';
import { useQuery } from 'react-query';
import { useCommunity } from './community/useCommunity';
import { Community } from '@/types/community';
import { useRouter } from 'next/router';
import { MemberInfo } from '@/types/types';

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

  //프로젝트 좋아요 높은 순 5개
  const {
    data: members,
    isLoading: isLoadingMembers,
    error: isErrorMembers,
    refetch: membersRefetch,
  } = useQuery<MemberInfo[], Error>('all-members', async () => {
    if (!id)
      return await api('/members/find-all?page=1&size=1000').then(
        (res) => res.data.data
      );
  });

  //데이터 모음
  const topLikeProjectData = topLikeProjects?.data?.projectList.slice(0, 4);
  const topViewProjectData = topViewProjects?.data?.projectList.slice(0, 4);
  const topViewCommunityData = topViewcommunityQuery.data?.data?.articleList;
  const topLikeCommunityData = topLikecommunityQuery.data?.data?.articleList;
  const topMembersData = members
    ?.sort((x, y) => y.totalStar - x.totalStar)
    .slice(0, 5);

  //에러체크
  const checkError =
    topLikeProjectError ||
    topViewProjectError ||
    topViewcommunityQuery.error ||
    topLikecommunityQuery.error ||
    isErrorMembers;

  return {
    topLikeProjectData,
    topViewProjectData,
    topViewCommunityData,
    topLikeCommunityData,
    topMembersData,
    topLikecommunityQuery,
    topViewcommunityQuery,
    topLikeProjectLoading,
    topViewProjectLoading,
    isLoadingMembers,
    topLikeProjectRefecth,
    topViewProjectRefecth,
    checkError,
  };
};
