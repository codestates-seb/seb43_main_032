/**
 * api에서 엑세스 토큰을 활용하기 위한 함수
 * @param key 로컬스토리지 키 값
 * @returns 해당하는 데이터
 */
export const tokenLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(key);
    return data;
  }
};
