import { UserState } from '@/types/user';
import { atom } from 'recoil';

export const userState = atom<UserState | null>({
  key: 'userState',
  default: null,
});
