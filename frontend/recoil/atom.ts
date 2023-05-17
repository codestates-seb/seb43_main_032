import { UserState } from '@/types/user';
import { atom } from 'recoil';

export const loggedInUserState = atom<UserState | null>({
  key: 'loggedInUserState',
  default: null,
});
export const navModalState = atom({
  key: 'navModalState',
  default: false,
});
