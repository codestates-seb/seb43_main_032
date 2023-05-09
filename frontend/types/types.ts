// 기타 타입 선언을 해주시면 됩니다. 특정 타입들은 새 파일을 생성해주세요.

export type DefaultObj = {
  [key: string]: string;
};

export type job = {
  [key: string]: { want: number; current: number };
};

export type Project = {
  id: number;
  author: string;
  start: Date;
  end: Date;
  tags: string[];
  stacks: string[];
  jobs: job[];
  title: string;
  content: string;
  state: 1 | 2 | 3;
  createAt: string;
  view: number;
  heart: number;
  comment: never[];
};

export type PostState = {
  id: number;
  heart: boolean;
  want: string;
};

export type Article = {
  id: number;
  email: string;
  userStar: number;
  avatar: string;
  category: string;
  title: string;
  content: null;
  createdAt: string;
  heart: number;
  view: number;
  tags: string[];
  status: null;
  comment: never[];
};
