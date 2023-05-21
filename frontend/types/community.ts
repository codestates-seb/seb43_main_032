import { Tech } from './project';
import { MemberInfo } from './types';

export type Community = {
  articleId: number;
  category: string;
  content: string;
  createdAt: string;
  memberInfo: MemberInfo;
  techList: Tech[];
  title: string;
  totalAnswers: number;
  totalLikes: number;
  view: number;
  liked: boolean;
  author:boolean
};
