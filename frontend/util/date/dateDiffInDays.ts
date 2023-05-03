/**
 * 두 날짜 사이의 기간을 리턴해주는 함수입니다.
 * @param date1 시작일
 * @param date2 종료일
 * @returns 두 날짜 사이의 차
 */
export const dateDiffInDays = (date1: Date, date2: Date): number => {
  const diffInMs = Math.abs(date2.getTime() - date1.getTime());
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  return diffInDays;
};
