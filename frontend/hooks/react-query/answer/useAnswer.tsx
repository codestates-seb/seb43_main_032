import { useRouter } from 'next/router';
import { api } from '@/util/api';
import { UseMutationResult, useMutation } from 'react-query';
import { getCookie } from '@/util/cookie';
import { AxiosResponse } from 'axios';
import {
  DeleteAnswerMutation,
  EditAnswerMutation,
  LikeAnswerMutation,
  PostAnswerMutation,
} from '@/types/answer';

type Props = {
  answerRefetch: () => void;
  changeAnswerVal: (val: string) => void;
};

/**
 * 답글 CRUD
 */
export const useAnswer = ({ answerRefetch, changeAnswerVal }: Props) => {
  const router = useRouter();
  const { id } = router.query;

  //카테고리 설정
  const category: 'PROJECT' | 'ARTICLE' = router.asPath.includes('project')
    ? 'PROJECT'
    : 'ARTICLE';

  /**
   * 답글을 작성하는 이벤트
   */
  const postAnswer: PostAnswerMutation = useMutation(
    async ({ content }: { content: string }) => {
      if (!getCookie('accessToken')) {
        return alert('로그인부터 진행해주세요.');
      }
      if (content === '') {
        return alert('내용을 작성해주세요.');
      }
      const data = {
        content,
        uniteId: id,
        category,
      };
      return await api.post(`/answers`, data);
    },
    {
      onSuccess: () => {
        answerRefetch();
        changeAnswerVal('');
      },
      onError: () => {
        alert('잠시 후에 다시 시도해주세요.');
      },
    }
  );

  /**
   * 답글을 삭제하는 이벤트
   */
  const deleteAnswer: DeleteAnswerMutation = useMutation(
    async ({ answerId }: { answerId: number }) => {
      if (confirm('정말 답글을 삭제하시겠습니까?'))
        return await api.delete(`/answers/${answerId}`);
    },
    {
      onSuccess: () => {
        answerRefetch();
      },
      onError: () => {
        alert('잠시 후에 다시 시도해주세요.');
      },
    }
  );

  /**
   * 답글을 수정하는 이벤트
   */
  const editAnswer: EditAnswerMutation = useMutation(() => api.post('/likes'), {
    onSuccess: () => {
      answerRefetch();
    },
    onError: () => {
      alert('잠시 후에 다시 시도해주세요.');
    },
  });

  /**
   * 답글 좋아요
   */
  const likeAnswer: LikeAnswerMutation = useMutation(
    () =>
      api.post(`/likes`, {
        category: 'ANSWER',
        unitedId: id,
      }),
    {
      onSuccess: () => {
        answerRefetch();
      },
      onError: () => {
        alert('잠시 후에 다시 시도해주세요.');
      },
    }
  );

  /**
   * 답글 싫어요
   */
  const dislikeAnswer: LikeAnswerMutation = useMutation(
    () =>
      api.post(`/likes/undo`, {
        category: 'ANSWER',
        unitedId: id,
      }),
    {
      onSuccess: () => {
        answerRefetch();
      },
      onError: () => {
        alert('잠시 후에 다시 시도해주세요.');
      },
    }
  );

  return { postAnswer, deleteAnswer, editAnswer, likeAnswer, dislikeAnswer };
};
