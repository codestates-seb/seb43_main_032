import { api } from '.';

/**
 * 멤버의 별 점수를 올려주는 이벤트
 * @param memberId 별 점수를 주고 싶은 멤버의 ID
 * @param star 주고싶은 별의 개수
 */
export const postStar = async(memberId: number | undefined, star: number) => {
  if (!memberId) {
    return;
  }
  const data = {
    memberId,
    star,
  };
  api.post(`/members/stars`, data);
};
