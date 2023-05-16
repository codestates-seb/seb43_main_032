import { UserState } from '@/types/user';
import { atom } from 'recoil';

export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: false,
});

export const userState = atom<UserState | null>({
  key: 'userState',
  default: null,
});
