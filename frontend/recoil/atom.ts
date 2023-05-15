import { atom } from 'recoil';

export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: false,
});

export const checkState = atom({
  key: 'checkState',
  default: false,
});
