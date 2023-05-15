export interface IUser {
  MEMBER_ID: number;
  EMAIL: string;
  USER_NAME: string;
  NICK_NAME: string;
  ABOUT_ME: string;
  YEAR_OF_DEV: number;
  CREATED_AT: string;
  UPDATED_AT: string;
  DELETED: string;
  PHONE_NUMBER: string;
  TOTAL_STAR: string;
  PROFILE_IMAGE: string;
}

export const EmptyUser: IUser = {
  MEMBER_ID: 0,
  EMAIL: '',
  USER_NAME: '',
  NICK_NAME: '',
  ABOUT_ME: '',
  YEAR_OF_DEV: 0,
  CREATED_AT: '',
  UPDATED_AT: '',
  DELETED: '',
  PHONE_NUMBER: '',
  TOTAL_STAR: '',
  PROFILE_IMAGE: '',
};
