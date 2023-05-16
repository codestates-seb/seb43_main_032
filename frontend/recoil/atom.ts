import { UserState } from '@/types/user';
import { atom } from 'recoil';

export const userState = atom<UserState | null>({
  key: 'userState',
  default: null,
});
export const navModalState = atom({
  key: 'navModalState',
  default: false,
});

export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: true,
});
