import { useRouter } from 'next/router';
import { api } from '@/util/api';
import { useMutation } from 'react-query';

type Props = {
  commentRefetch: () => void;
};

/**
 * 답글 CRUD
 */
export const useComment = ({ commentRefetch }: Props) => {
  const router = useRouter();
  const { id } = router.query;

  /**
   * 댓글을 작성하는 이벤트
   */
  const postComment = useMutation(
    ({ answerId, content }: { answerId: number; content: string }) => {
      if (router.asPath.includes('project')) {
        return api.post(`/comments/${answerId}`, {
          content,
          category: 'PROJECT',
          uniteId: id,
        });
      }
      return api.post(`/comments`, {
        content,
        category: 'COMMUNITY',
        uniteId: id,
      });
    },
    {
      onSuccess: () => {
        commentRefetch();
      },
      onError: () => {
        alert('잠시 후에 다시 시도해주세요.');
      },
    }
  );

  /**
   * 댓글을 삭제하는 이벤트
   */
  const deleteComment = useMutation(
    ({ commentId }: { commentId: number }) =>
      api.delete(`/comments/${commentId}`),
    {
      onSuccess: () => {
        commentRefetch();
      },
      onError: () => {
        alert('잠시 후에 다시 시도해주세요.');
      },
    }
  );

  /**
   * 댓글을 수정하는 이벤트
   */
  const editComment = useMutation(
    ({ commentId, content }: { commentId: number; content: string }) =>
      api.patch(`/comments/${commentId}`, { content }),
    {
      onSuccess: () => {
        commentRefetch();
      },
      onError: () => {
        alert('잠시 후에 다시 시도해주세요.');
      },
    }
  );

  return { postComment, deleteComment, editComment };
};
