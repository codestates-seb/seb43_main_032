import { atom } from 'recoil';

export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: true,
});

export const navModalState = atom({
  key: 'navModalState',
  default: false,
});
