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
