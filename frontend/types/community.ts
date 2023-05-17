export type Community = {
  id: number;
  name: string;
  profileImageUrl: string;
  totalStar: number;
  title: string;
  content: string;
  category: string;
  views: number;
  totalLikes: number;
  techStackList: FiledTag[];
  view: number;
};

export type Comment = {
  id: number;
  email: string;
  userStar: number;
  avatar: string;
  content: string;
};

export type FiledTag = {
  field: string;
};
