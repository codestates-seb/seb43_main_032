import { api } from '.';
import { IUser } from '@/types/user';

export async function getAuth(): Promise<IUser> {
  return api('/users/1') //
    .then((res) => res.data);
}

export async function getUsers(): Promise<IUser[]> {
  return api('/member/findAll?page=1&size=12') //
    .then((res) => res.data);
}

export async function getUserById(id: number): Promise<IUser> {
  return api(`/member/info/${id}`) //
    .then((res) => res.data);
}

export const setUserState = async () => {
  const data = await api('/member/info').then((res) => res.data.data);
  if (data) {
    return data;
  }
  return null;
};

export const getUserData = async (id: number) => {
  const data = await api(`/member/info/${id}`).then((res) => res.data.data);
  if (data) {
    return data;
  }
  return null;
};
