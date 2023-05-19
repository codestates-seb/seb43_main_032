import { useQuery } from 'react-query';
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

  const postArticle = (data: PostData) => {
    return api
      .post('/articles', data)
      .then(() => router.push('/community'))
      .catch(() => alert('잠시 후에 다시 시도해주세요.'));
  };

  const editArticle = (data: PostData) => {
    return api
      .patch(`/articles/${id}`, data)
      .then(() => router.push('/community'))
      .catch(() => alert('잠시 후에 다시 시도해주세요.'));
  };

  const deleteArticle = () => {
    if (confirm('정말 삭제하시겠습니까?'))
      api
        .delete(`/articles/${id}`)
        .then(() => router.push('/'))
        .catch(() => alert('잠시 후에 다시 시도해주세요.'));
  };

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
