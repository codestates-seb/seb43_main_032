import { useRouter } from 'next/router';
import { api } from '@/util/api';
import { useMutation } from 'react-query';
import { getCookie } from '@/util/cookie';

type Props = {
  answerRefetch: () => void;
  category: 'PROJECT' | 'ARTICLE';
  changeAnswerVal: (val: string) => void;
};

/**
 * 답글 CRUD
 */
export const useAnswer = ({
  answerRefetch,
  category,
  changeAnswerVal,
}: Props) => {
  const router = useRouter();
  const { id } = router.query;

  /**
   * 답글을 작성하는 이벤트
   */
  const postAnswer = useMutation(
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
  const deleteAnswer = useMutation(
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
  const editAnswer = useMutation(
    ({ answerId, content }: { answerId: number; content: string }) =>
      api.patch(`/answers/${answerId}`, { content }),
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

  return { postAnswer, deleteAnswer, editAnswer };
};
