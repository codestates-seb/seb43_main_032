/**
 * @param str 스킬 이름
 * @returns 전달받은 스킬 이름을 첫 글자 대문자로 리턴
 */
export const formatSkill = (str: string) => {
  let result = str.charAt(0).toUpperCase() + str.slice(1);
  if (result.includes('_')) {
    let words = result.split('_');
    words = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    if (words[1].length === 2 || words[1].length === 3) {
      words[1] = words[1].toUpperCase();
    }
    result = words.join(' ');
  }
  return result;
};
