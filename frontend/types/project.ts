export type Job = {
  [key: string]: { want: number; current: number };
};

export type PostState = {
  id: number;
  heart: boolean;
  want: string;
};

enum ProjectState {
  '모집 중' = 1,
  '모집 완료' = 2,
  '진행 중' = 3,
  '종료' = 4,
}

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
  state: ProjectState;
  createAt: string;
  view: number;
  heart: number;
  comment: never[];
  position?: string;
};
