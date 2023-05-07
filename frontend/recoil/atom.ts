import { atom } from 'recoil';

export const isLoginState = atom({
  key: 'isLoginState',
  default: false,
});

// community
// 검색어 입력 저장
export const searchState = atom({
  key: 'searchState',
  default: '',
});

// 데이터 가져오기
export const resetSearchState = atom({
  key: 'resetSearchState',
  default: true,
});
