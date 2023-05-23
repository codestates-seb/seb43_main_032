import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { api } from '@/util/api';
import { Answer } from '@/types/answer';
import { PageInfo } from '@/types/types';

type AnswerData = {
  data: Answer[];
  pageInfo: PageInfo;
};

type Props = {
  postId?: number;
  params: string;
};

export const useGetAnswer = ({ postId, params }: Props) => {
  const router = useRouter();
  const { id } = router.query;

  //카테고리 설정
  const category: 'PROJECT' | 'ARTICLE' = router.asPath.includes('project')
    ? 'PROJECT'
    : 'ARTICLE';

  const queryKey = postId
    ? [`${category}-answer-list`, postId]
    : [`${category}-answer-list`, id];

  const { isLoading, error, data, refetch } = useQuery<AnswerData, Error>(
    queryKey,
    async () => {
      if (router.route.includes('create')) {
        return;
      }
      if (category === 'ARTICLE') {
        if (postId) {
          return await api(`/articles/${postId}/answers?${params}`).then(
            (res) => res.data
          );
        }
        return await api(`/articles/${id}/answers?${params}`).then(
          (res) => res.data
        );
      }
      if (category === 'PROJECT') {
        if (postId) {
          return await api(`/projects/${postId}/answers?${params}`).then(
            (res) => res.data
          );
        }
        return await api(`/projects/${id}/answers?${params}`).then(
          (res) => res.data
        );
      }
    }
  );

  //답글의 총 개수
  const answerPageCount = data?.pageInfo.totalElements;

  return {
    answerQuery: { isLoading, error, data },
    answerRefetch: refetch,
    answerPageCount,
  };
};
