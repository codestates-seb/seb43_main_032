import { atom } from 'recoil';

export const isLoginState = atom({
  key: 'isLoginState',
  default: false,
});

// community
// 검색어 입력 저장
export const searchState = atom<string | null>({
  key: 'searchState',
  default: '',
});

// 데이터 초기화(검색어 삭제)
export const resetSearchState = atom({
  key: 'resetSearchState',
  default: true,
});

// 데이터 필터링
export const filterState = atom({
  key: 'filterState',
  default: 'sorted',
});
