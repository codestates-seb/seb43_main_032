/**
 * 날짜를 입력받아 포멧팅에 맞게 날짜를 리턴해주는 함수
 * @param date
 * @returns 예시 23.05.11
 */
export const formatDate = (date: Date): string => {
  const year = date.getFullYear().toString().slice(2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}.${month}.${day}`;
};
