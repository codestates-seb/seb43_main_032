import { useMutation, useQuery } from 'react-query';
import { api } from '@/util/api';
import { useRouter } from 'next/router';
import { PageInfo } from '@/types/types';

type Props = {
  address: string;
  queryKey: (string | number | string[] | undefined)[];
};

type PostData = {
  title: string;
  category: string;
  content: string;
  techList: string[];
};

export const useCommunity = <T extends {}>({ address, queryKey }: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, error, data, refetch } = useQuery<
    {
      data: T;
      pageInfo: PageInfo;
    },
    Error
  >(queryKey, async () => {
    if (!router.route.includes('create')) {
      return await api(address).then((res) => res.data);
    }
  });

  const postArticle = useMutation(
    (data: PostData) => api.post('/articles', data),
    {
      onSuccess: () => {
        router.push('/community').then(() => refetch());
      },
      onError: () => {
        alert('잠시 후에 다시 시도해주세요.');
      },
    }
  );

  const editArticle = useMutation(
    (data: PostData) => api.patch(`/articles/${id}`, data),
    {
      onSuccess: () => {
        router.push('/community').then(() => refetch());
      },
      onError: () => {
        alert('잠시 후에 다시 시도해주세요.');
      },
    }
  );

  const deleteArticle = useMutation(() => api.delete(`/articles/${id}`), {
    onSuccess: () => {
      router.push('/community').then(() => refetch());
    },
    onError: () => {
      alert('잠시 후에 다시 시도해주세요.');
    },
  });

  const moveEdit = () => {
    if (confirm('정말 수정하시겠습니까?'))
      router.push(`/community/post/${id}/edit`);
  };

  return {
    communityQuery: {
      isLoading,
      error,
      data,
    },
    refetch,
    moveEdit,
    deleteArticle,
    postArticle,
    editArticle,
  };
};
