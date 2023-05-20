import { UseMutationResult } from 'react-query';
import { MemberInfo } from './types';

export type Comment = {
  commentId: number;
  content: string;
  createdAt: string;
  memberInfo: MemberInfo;
  totalLikes: number;
  liked: boolean;
  author:boolean
};

export type PostCommentMutation = UseMutationResult<
  void,
  Error,
  { answerId: number; content: string },
  void
>;

export type EditCommentMutation = UseMutationResult<
  void,
  Error,
  { commentId: number; content: string },
  void
>;

export type DeleteCommentMutation = UseMutationResult<
  void,
  Error,
  { commentId: number },
  void
>;

export type LikeCommentMutation = UseMutationResult<
  void,
  Error,
  {
    category: 'COMMENT';
    uniteId: number;
  },
  void
>;
