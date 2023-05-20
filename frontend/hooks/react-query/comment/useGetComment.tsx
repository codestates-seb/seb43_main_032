import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { api } from '@/util/api';
import { Comment } from '@/types/comment';
import { PageInfo } from '@/types/types';

type CommentData = {
  data: Comment[];
  pageInfo: PageInfo;
};

type Props = {
  answerId: number;
  params: string;
};

export const useGetComment = ({ answerId, params }: Props) => {
  const router = useRouter();
  const { id } = router.query;

  //카테고리 설정
  const category: 'PROJECT' | 'ARTICLE' = router.asPath.includes('project')
    ? 'PROJECT'
    : 'ARTICLE';

  const { isLoading, error, data, refetch } = useQuery<CommentData, Error>(
    [`${category}-comment-list`, id, answerId],
    async () => {
      if (router.route.includes('create')) {
        return;
      }
      if (category === 'ARTICLE') {
        return await await api(
          `/articles/${id}/answers/${answerId}/comments?${params}`
        ).then((res) => res.data);
      }
      if (category === 'PROJECT') {
        return await await api(
          `/projects/${id}/answers/${answerId}/comments?${params}`
        ).then((res) => res.data);
      }
    }
  );

  return {
    commentQuery: { isLoading, error, data },
    commentRefetch: refetch,
  };
};
