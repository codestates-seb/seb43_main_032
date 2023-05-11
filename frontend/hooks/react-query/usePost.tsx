import { useQuery, useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { Article } from '@/types/types';
import { api } from '@/util/api';

export const usePost = () => {
  const router = useRouter();

  const { isLoading, error, data, refetch } = useQuery<Article, Error>(
    ['post', router.query.id],
    async () => {
      if (!router.route.includes('create')) {
        return await api(`community/post/${router.query.id}`).then(
          (res) => res.data
        );
      }
    }
  );

  return {
    postQuery: { isLoading, error, data },
  };
};
