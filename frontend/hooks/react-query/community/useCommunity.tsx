import { useMutation, useQuery } from 'react-query';
import { api } from '@/util/api';
import { useRouter } from 'next/router';
import { PageInfo } from '@/types/types';
import { errorAlert } from '@/components/alert/Alert';
import { loggedInUserId } from '@/recoil/selector';
import { useRecoilValue } from 'recoil';
import { postStar } from '@/util/api/postStar';

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
  //로그인한 유저의아이디
  const memberId = useRecoilValue(loggedInUserId);
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

  //좋아요
  const likeCommunity = useMutation(
    () => api.post(`/likes`, { category: 'ARTICLE', uniteId: id }),
    {
      onSuccess: () => {
        refetch();
      },
      onError: () => {
        errorAlert('잠시 후에 다시 시도해주세요.', '좋아요');
      },
    }
  );

  //싫어요
  const dislikeCommunity = useMutation(
    () => api.post(`/likes/undo`, { category: 'ARTICLE', uniteId: id }),
    {
      onSuccess: () => {
        refetch();
      },
      onError: () => {
        errorAlert('잠시 후에 다시 시도해주세요.', '싫어요');
      },
    }
  );

  /**
   * 게시글 작성
   */
  const postArticle = useMutation(
    (data: PostData) => api.post('/articles', data),
    {
      onSuccess: () => {
        postStar(memberId, 3);
        router.push('/community').then(() => router.reload());
      },
      onError: () => {
        errorAlert('잠시 후에 다시 시도해주세요.', '게시글 작성');
      },
    }
  );

  /**
   * 게시글 수정
   */
  const editArticle = useMutation(
    (data: PostData) => api.patch(`/articles/${id}`, data),
    {
      onSuccess: () => {
        router.push('/community').then(() => router.reload());
      },
      onError: () => {
        errorAlert('잠시 후에 다시 시도해주세요.', '게시글 수정');
      },
    }
  );

  /**
   * 게시글 삭제
   */
  const deleteArticle = useMutation(() => api.delete(`/articles/${id}`), {
    onSuccess: () => {
      postStar(memberId, -3);
      router.push('/community').then(() => router.reload());
    },
    onError: () => {
      errorAlert('잠시 후에 다시 시도해주세요.', '게시글 삭제');
    },
  });

  /**
   * 수정 페이지로 이동
   */
  const moveEdit = () => {
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
    likeCommunity,
    dislikeCommunity,
  };
};
