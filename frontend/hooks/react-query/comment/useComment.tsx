import { useRouter } from 'next/router';
import { api } from '@/util/api';
import { UseMutationResult, useMutation } from 'react-query';
import {
  DeleteCommentMutation,
  EditCommentMutation,
  LikeCommentMutation,
  PostCommentMutation,
} from '@/types/comment';

type Props = {
  commentRefetch: () => void;
};

/**
 * 답글 CRUD
 */
export const useComment = ({ commentRefetch }: Props) => {
  const router = useRouter();
  const { id } = router.query;

  //카테고리 설정
  const category: 'PROJECT' | 'ARTICLE' = router.asPath.includes('project')
    ? 'PROJECT'
    : 'ARTICLE';

  /**
   * 댓글을 작성하는 이벤트
   */
  const postComment: PostCommentMutation = useMutation(
    ({ answerId, content }: { answerId: number; content: string }) => {
      const data = {
        content,
        uniteId: id,
        category,
      };
      return api.post(`/comments/${answerId}`, data);
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
  const deleteComment: DeleteCommentMutation = useMutation(
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
  const editComment: EditCommentMutation = useMutation(
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

  /**
   * 댓글 좋아요
   */
  const likeComment: LikeCommentMutation = useMutation(
    ({ category, uniteId }: { category: 'COMMENT'; uniteId: number }) =>
      api.post(`/likes`, {
        category: category,
        uniteId: uniteId,
      }),
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
   * 댓글 싫어요
   */
  const dislikeComment: LikeCommentMutation = useMutation(
    ({ category, uniteId }: { category: 'COMMENT'; uniteId: number }) =>
      api.post(`/likes/undo`, {
        category: category,
        uniteId: uniteId,
      }),
    {
      onSuccess: () => {
        commentRefetch();
      },
      onError: () => {
        alert('잠시 후에 다시 시도해주세요.');
      },
    }
  );

  return {
    postComment,
    deleteComment,
    editComment,
    likeComment,
    dislikeComment,
  };
};
