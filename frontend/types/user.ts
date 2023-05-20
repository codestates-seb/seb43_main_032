//로그인한 유저의 데이터 상태
export type UserState = {
  aboutMe: string;
  email: string;
  name: string;
  location: string;
  phone: string;
  position: string;
  profileImageUrl: string;
  techList: string[];
  totalStar: number;
  yearOfDev: number;
};

//로그인 또는 회원가입 할때 데이터 타입
export type LoginData = {
  name?: string;
  email: string;
  password: string | number;
};
