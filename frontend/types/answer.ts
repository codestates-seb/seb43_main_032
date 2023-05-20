import { UseMutationResult } from 'react-query';
import { MemberInfo } from './types';

export type Answer = {
  answerId: number;
  commentList: [
    {
      commentId: number;
      content: string;
      createdAt: string;
      memberInfo: MemberInfo;
      totalLikes: number;
    }
  ];
  liked: boolean;
  content: string;
  createdAt: string;
  memberInfo: MemberInfo;
  totalLikes: number;
  author:boolean
};

export type PostAnswerMutation = UseMutationResult<
  void,
  Error,
  { content: string },
  void
>;

export type DeleteAnswerMutation = UseMutationResult<
  void,
  Error,
  { answerId: number },
  void
>;

export type EditAnswerMutation = UseMutationResult<
  void,
  Error,
  { answerId: number; content: string },
  void
>;

export type LikeAnswerMutation = UseMutationResult<
  void,
  Error,
  {
    category: 'ANSWER';
    uniteId: number;
  },
  void
>;
