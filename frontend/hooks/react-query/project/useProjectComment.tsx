import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { api } from '@/util/api';
import { Comment } from '@/types/comment';

export const useProjectComment = (answerId: number) => {
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, error, data, refetch } = useQuery<Comment, Error>(
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
  };
};
