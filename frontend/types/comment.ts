import { UseMutationResult } from 'react-query';
import { MemberInfo } from './types';
import { AxiosResponse } from 'axios';

export type Comment = {
  commentId: number;
  content: string;
  createdAt: string;
  memberInfo: MemberInfo;
  totalLikes: number;
};

export type EditCommentMutation = UseMutationResult<
  AxiosResponse<void, void>,
  unknown,
  {
    commentId: number;
    content: string;
  },
  unknown
>;

export type DeleteCommentMutation = UseMutationResult<
  AxiosResponse<void, void>,
  unknown,
  {
    commentId: number;
  },
  unknown
>;
