import { Tech } from './project';

export interface StackCategoryName {
  [key: string]: string;
}
export interface HeaderNav extends StackCategoryName {}

export interface Form extends StackCategoryName {}

export interface CommunityFilter extends StackCategoryName {}

export interface ProjectFilter {
  [key: string]: number;
}

export type ArrObj = { [key: string]: string[] };

export interface StackCategory {
  [key: string]: string[];
}

export type FooterCategory = { name: string; link: string };

export type FooterData = {
  [key: string]: FooterCategory[];
};

export type CommunityCategory = {
  title: string;
  link: string;
  icon: JSX.Element;
};

export type PageInfo = {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export type BannerProps = {
  imgWidth?: boolean;
  isScrolled?: boolean;
  showImg?: boolean;
};

export enum Filter {
  최신순 = 0,
  오래된순 = 1,
  조회순 = 2,
  찜순 = 3,
}

export type PageProps<T> = {
  data: T[];
  pageInfo: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
};

export type MemberInfo = {
  aboutMe: string;
  email: string;
  location: string;
  memberId: number;
  name: string;
  phone: string;
  position: string;
  profileImageUrl: string;
  techList: Tech[];
  totalStar: number;
  yearOfDev: number;
};

export type NavProps = {
  nav: boolean;
  isScrolled?: boolean;
};
