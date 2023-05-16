import { api } from '.';
import { IUser } from '@/types/user';

export async function getAuth(): Promise<IUser> {
  return api('/users/1') //
    .then((res) => res.data);
}

export async function getUsers(): Promise<IUser[]> {
  return api('/users') //
    .then((res) => res.data);
}

export async function getUserById(id: number): Promise<IUser> {
  return api(`/users/${id}`) //
    .then((res) => res.data);
}
