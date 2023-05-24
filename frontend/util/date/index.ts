/**
 * 날짜를 입력받아 포멧팅에 맞게 날짜를 리턴해주는 함수, 프로젝트 기간에 활용
 * @param date
 * @returns 예시 23.05.11
 */
export const formatDate = (date: Date): string => {
  if (date) {
    const year = date.getFullYear().toString().slice();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  return '';
};

/**
 * 날짜를 입력받아 포멧팅에 맞게 날짜를 리턴해주는 함수, 작성일자에 활용
 * @param date
 * @returns 예시 2023년 4월 1일
 */
export const formatDate2 = (date: Date): string => {
  const year = date.getFullYear().toString();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}년 ${month}월 ${day}일`;
};

/**
 * 날짜를 입력받아 포멧팅에 맞게 날짜를 리턴해주는 함수, 작성일자에 활용
 * @param date
 * @returns 예시 2023-04-01
 */
export const formatDate3 = (date: Date): string => {
  const year = date.getFullYear().toString();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

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

/**
 * 현재 시간을 params로 넣으면 상대 시간을 리턴
 */
export const elapsedTime = (date: Date) => {
  const start = new Date(date);
  const end = new Date(); // 현재 날짜
  const startTimestamp = start.getTime();
  const endTimestamp = end.getTime();
  const diff = (endTimestamp - startTimestamp) / 1000; // 경과 시간

  const times = [
    { name: '년', milliSeconds: 60 * 60 * 24 * 365 },
    { name: '개월', milliSeconds: 60 * 60 * 24 * 30 },
    { name: '일', milliSeconds: 60 * 60 * 24 },
    { name: '시간', milliSeconds: 60 * 60 },
    { name: '분', milliSeconds: 60 },
  ];

  // 년 단위부터 알맞는 단위 찾기
  for (const value of times) {
    const betweenTime = Math.floor(diff / value.milliSeconds);

    // 큰 단위는 0보다 작은 소수 단위 나옴
    if (betweenTime > 0) {
      return `${betweenTime}${value.name} 전`;
    }
  }

  // 모든 단위가 맞지 않을 시
  return '방금 전';
};
