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

export type DeleteAnswerMutation = UseMutationResult<
  AxiosResponse<void, void> | undefined,
  unknown,
  {
    answerId: number;
  },
  unknown
>;

export type EditAnswerMutation = UseMutationResult<
  AxiosResponse<void, void>,
  unknown,
  {
    answerId: number;
    content: string;
  },
  unknown
>;
