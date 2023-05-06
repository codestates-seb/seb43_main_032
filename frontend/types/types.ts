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
  state: number;
  createAt: string;
  view: number;
  heart: number;
  comment: never[];
};

export type PostState = {
  id: number;
  heart: false;
  want: string;
};
