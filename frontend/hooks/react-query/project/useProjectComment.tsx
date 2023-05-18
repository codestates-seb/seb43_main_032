import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { api } from '@/util/api';
import { Comment } from '@/types/comment';
import { PageInfo } from '@/types/types';

type CommentData = {
  data: Comment[];
  pageInfo: PageInfo;
};

export const useProjectComment = (answerId: number) => {
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, error, data, refetch } = useQuery<CommentData, Error>(
    ['project-comment-list', id, answerId],
    async () => {
      if (!router.route.includes('create')) {
        return await api(`/projects/${id}/answers/${answerId}/comments`).then(
          (res) => res.data
        );
      }
    }
  );

  return {
    commentQuery: { isLoading, error, data },
    commentRefetch: refetch,
  };
};
