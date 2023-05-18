export type Community = {
  id: number;
  name: string;
  profileImageUrl: string;
  totalStar: number;
  title: string;
  content: string;
  category: CategoryType;
  totalLikes: number;
  techStackList: TechTag[];
  view: number;
};

enum CategoryType {
  Community = 0,
  Project = 1,
}

export type Comment = {
  id: number;
  email: string;
  userStar: number;
  avatar: string;
  content: string;
};

export type TechTag = {
  tech: string;
};
