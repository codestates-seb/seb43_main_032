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
  content: string;
  createdAt: string;
  memberInfo: MemberInfo;
  totalLikes: number;
};
