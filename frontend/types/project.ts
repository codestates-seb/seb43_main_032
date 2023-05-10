export type Job = {
  [key: string]: { want: number; current: number };
};

export type Project = {
  id: number;
  author: string;
  start: Date;
  end: Date;
  tags: string[];
  stacks: string[];
  jobs: Job[];
  title: string;
  content: string;
  state: 1 | 2 | 3 | 4;
  createAt: string;
  view: number;
  heart: number;
  comment: never[];
  position?: string;
};

export type PostState = {
  id: number;
  heart: boolean;
  want: string;
};
