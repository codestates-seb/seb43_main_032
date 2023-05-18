import { MemberInfo } from './types';

export type Comment = {
  commentId: number;
  content: string;
  createdAt: string;
  memberInfo: MemberInfo;
  totalLikes: number;
};
