import { Tech } from './project';

//로그인한 유저의 데이터 상태
export type UserState = {
  memberId: number;
  aboutMe: string;
  email: string;
  name: string;
  phone: string;
  position: string;
  profileImageUrl: string;
  totalStar: number;
  yearOfDev: number;
  location: string;
  techList: Tech[];
  totalProject: number;
};
export interface User {
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
  totalProject: number;
}

//로그인 또는 회원가입 할때 데이터 타입
export type LoginData = {
  name?: string;
  email: string;
  password: string | number;
};

export type Chat = {
  content: string;
  createdAt: string;
  email: string;
  name: string;
  receiverMemberId: number;
  senderMemberId: number;
  title: string;
  id: number;
};
