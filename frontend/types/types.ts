// 기타 타입 선언을 해주시면 됩니다. 특정 타입들은 새 파일을 생성해주세요.

export interface StackCategoryName {
  [key: string]: string;
}

export type ArrObj = { [key: string]: string[] };

export type BannerProps = {
  imgWidth?: boolean;
  isScrolled?: boolean;
  showImg?: boolean;
};
export interface HeaderNav extends StackCategoryName {}

export interface Form extends StackCategoryName {}

export interface ProjectFilter extends StackCategoryName {}

export interface CommunityFilter extends StackCategoryName {}

export interface StackCategory {
  [key: string]: string[];
}

export interface FooterCategory extends StackCategory {}

export type CommunityCategory = {
  title: string;
  link: string;
  icon: JSX.Element;
};

export type PageInfo = {
  page: number;
  size: number;
  totalElement: number;
  totalPages: number;
};

export type NavProps = {
  isScrolled?: boolean;
  nav: boolean;
};
