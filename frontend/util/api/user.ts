import { api } from '.';

export async function getAuth(): Promise<IUser> {
  return api
    .get('/users/1') //
    .then((res) => res.data);
}

export async function getUsers(): Promise<IUser[]> {
  return api
    .get('/users') //
    .then((res) => res.data);
}

export async function getUserById(id: number): Promise<IUser> {
  return api
    .get(`/users/${id}`) //
    .then((res) => res.data);
}

export interface IUser {
  MEMBER_ID: number;
  EMAIL: string;
  USER_NAME: string;
  NICK_NAME: string;
  ABOUT_ME: string;
  YEAR_OF_DEV: number;
  CREACTED_AT: string;
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
  CREACTED_AT: '',
  UPDATED_AT: '',
  DELETED: '',
  PHONE_NUMBER: '',
  TOTAL_STAR: '',
  PROFILE_IMAGE: '',
};
