export type Community = {
  id: number;
  email: string;
  userStar: number;
  avatar: string;
  category: string;
  title: string;
  content: string;
  createdAt: string;
  heart: number;
  view: number;
  tags: string[];
  status?: null;
  comment: Comment | {}[];
};

export type Comment = {
  id: number;
  email: string;
  userStar: number;
  avatar: string;
  content: string;
};
