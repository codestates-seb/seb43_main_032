import { useRef } from 'react';
/**
 * 무한스크롤을 위한 커스텀훅
 */
const useIntersectionObserver = (callback: () => void) => {
  // IntersectionObserver 객체를 useRef를 사용하여 생성
  const observer = useRef(
    new IntersectionObserver(
      // IntersectionObserver의 콜백 함수
      (entries) => {
        // entries 배열을 순회하며 isIntersecting이 true인 경우 콜백 함수 호출
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
          }
        });
      },
      // threshold 값 설정
      { threshold: 1 }
    )
  );
  // observe 함수 정의
  const observe = (element: Element) => {
    observer.current.observe(element);
  };
  // unobserve 함수 정의
  const unobserve = (element: Element) => {
    observer.current.unobserve(element);
  };
  // observe와 unobserve 함수를 배열로 반환
  return [observe, unobserve];
};

export default useIntersectionObserver;
