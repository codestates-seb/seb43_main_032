import { UseMutationResult } from 'react-query';
import { MemberInfo } from './types';
import { AxiosResponse } from 'axios';

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
  content: string;
  createdAt: string;
  memberInfo: MemberInfo;
  totalLikes: number;
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
