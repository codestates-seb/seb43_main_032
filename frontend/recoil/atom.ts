import { atom } from 'recoil';

// community
// 검색어 입력 저장
export const searchState = atom({
  key: 'searchState',
  default: '',
});
