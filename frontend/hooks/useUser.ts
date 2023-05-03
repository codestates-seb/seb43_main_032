import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';

export default function useUser() {
  const queryClient = useQueryClient();
  const userQuery = useQuery(['users'], () => getUsers(), {
    staleTime: 1000 * 60 * 5,
  });
  const getUser = (id: number) =>
    useQuery(['users', id], () => getUserById(id), {
      staleTime: 1000 * 60 * 5,
    });
  return { userQuery, getUser };
}

async function getUsers(): Promise<IUser[]> {
  return axios
    .get('/users') //
    .then((res) => res.data);
}

async function getUserById(id: number): Promise<IUser> {
  return axios
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
