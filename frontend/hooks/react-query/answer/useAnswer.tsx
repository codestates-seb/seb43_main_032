import { useRouter } from 'next/router';
import { api } from '@/util/api';
import { useMutation } from 'react-query';
import { getCookie } from '@/util/cookie';
import {
  DeleteAnswerMutation,
  EditAnswerMutation,
  LikeAnswerMutation,
  PostAnswerMutation,
} from '@/types/answer';
import { confirmAlert, errorAlert } from '@/components/alert/Alert';
import { useRecoilValue } from 'recoil';
import { loggedInUserState } from '@/recoil/atom';
import { postStar } from '@/util/api/postStar';
import { loggedInUserId } from '@/recoil/selector';

type Props = {
  answerRefetch: () => void;
  changeAnswerVal: (val: string) => void;
  articleRefetch: () => void;
};

/**
 * 답글 CRUD
 */
export const useAnswer = ({
  answerRefetch,
  changeAnswerVal,
  articleRefetch,
}: Props) => {
  //로그인한 유저의아이디
  const memberId = useRecoilValue(loggedInUserId);

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
        return errorAlert('로그인이 필요합니다.', '답글 작성');
      }
      if (content === '') {
        return errorAlert('내용을 작성해주세요.', '답글 작성');
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
        postStar(memberId, 1);
        articleRefetch();
        answerRefetch();
        changeAnswerVal('');
      },
      onError: () => {
        errorAlert('잠시 후에 다시 시도해주세요.', '답글 작성');
      },
    }
  );

  /**
   * 답글을 삭제하는 이벤트
   */
  const deleteAnswer: DeleteAnswerMutation = useMutation(
    async ({ answerId }: { answerId: number }) => {
      confirmAlert('정말 답글을 삭제하시겠습니까?', '답글 삭제가').then(() =>
        api.delete(`/answers/${answerId}`)
      );
    },
    {
      onSuccess: () => {
        if (category === 'ARTICLE') {
          articleRefetch();
        }
        answerRefetch();
      },
      onError: () => {
        errorAlert('잠시 후에 다시 시도해주세요.', '답글 삭제');
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
      errorAlert('잠시 후에 다시 시도해주세요.', '답글 수정');
    },
  });

  /**
   * 답글 좋아요
   */
  const likeAnswer: LikeAnswerMutation = useMutation(
    ({ category, uniteId }: { category: 'ANSWER'; uniteId: number }) =>
      api.post(`/likes`, {
        category: category,
        uniteId: uniteId,
      }),
    {
      onSuccess: () => {
        answerRefetch();
      },
      onError: () => {
        errorAlert('잠시 후에 다시 시도해주세요.', '답글 좋아요');
      },
    }
  );

  /**
   * 답글 싫어요
   */
  const dislikeAnswer: LikeAnswerMutation = useMutation(
    ({ category, uniteId }: { category: 'ANSWER'; uniteId: number }) =>
      api.post(`/likes/undo`, {
        category: category,
        uniteId: uniteId,
      }),
    {
      onSuccess: () => {
        answerRefetch();
      },
      onError: () => {
        errorAlert('잠시 후에 다시 시도해주세요.', '좋아요 취소');
      },
    }
  );

  return { postAnswer, deleteAnswer, editAnswer, likeAnswer, dislikeAnswer };
};
