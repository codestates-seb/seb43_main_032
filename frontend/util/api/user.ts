import { UserState } from '@/types/user';
import { api } from '.';

export async function getAuth(): Promise<UserState> {
  return api('/users/1') //
    .then((res) => res.data);
}

export async function getUsers(): Promise<UserState[]> {
  return api('/users') //
    .then((res) => res.data);
}

export async function getUserById(id: number): Promise<UserState> {
  return api(`/members/info/${id}`) //
    .then((res) => res.data);
}

export const setUserState = async () => {
  const data = await api('/members/info').then((res) => res.data.data);
  if (data) {
    return data;
  }
  return null;
};

export const getUserData = async (id: number) => {
  const data = await api(`/members/info/${id}`).then((res) => res.data.data);
  if (data) {
    return data;
  }
  return null;
};
