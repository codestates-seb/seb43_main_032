import { atom } from 'recoil';

export const isLoggedInState = atom<boolean>({
  key: 'isLoggedInState',
  default: false,
});

export const checkState = atom({
  key: 'checkState',
  default: false,
});

// 데이터 필터링
export const filterState = atom({
  key: 'filterState',
  default: 'sorted',
});
