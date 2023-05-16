import { Cookies } from 'react-cookie';
const cookies = new Cookies();

/**
 * @param name 설정할 쿠키 key
 * @param value 설정할 쿠키 값
 * @param minutes 유효 시간 (분)
 */
export const setCookie = (name: string, value: string, minutes: number) => {
  const date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000);
  const expires = 'expires=' + date.toUTCString();
  document.cookie = name + '=' + value + ';' + expires + ';path=/';
};

/**
 * @param name 조회하고 싶은 쿠키의 key
 * @returns 조회에 성공하면 쿠키를 반환, 실패하면 null
 */
export const getCookie = (name: string): string | null => {
  const cookieValue = cookies.get(name);
  return cookieValue || null;
};

/**
 * @param name 삭제할 쿠키의 key
 */
export const deleteCookie = (name: string) => {
  const expires = 'expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = name + '=;' + expires;
};
