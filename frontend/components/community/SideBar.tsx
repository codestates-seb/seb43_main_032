import GridBox from '@/components/GridBox';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

export default function SideBar() {
  const router = useRouter();

  // const test = (url) => {
  //   router.push(url);
  // };
  // Link = navigate => next에서는 못 쓰고
  // 클라이언트에서 한 번 로드된 페이지는 다시 활용하는 방식
  // 대신 최신화가 되지 않음
  // 장점은 로딩이 거의 없음, 다시 활용하니깐

  const categoryTitle = [
    { title: '질문하기', link: '/community/create' },
    { title: '전체보기', link: '/community' },
    { title: '프론트엔드', link: '/community/frontend' },
    { title: '백엔드', link: '/community/backend' },
    { title: 'UX/UI', link: '/community/uxui' },
  ];

  return (
    <Container>
      {categoryTitle.map((item, idx) => (
        <Link href={item.link} key={idx}>
          <span className="nanum-regular" key={idx}>
            {item.title}
          </span>
        </Link>
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--padding-2);
  box-shadow: 5px 0px 7px 0px rgba(122, 122, 122, 0.5);

  > a {
    width: 80%;
    background-color: white;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    margin-bottom: 16px;
    box-shadow: 2px 2px 7px 1px rgba(114, 114, 114, 0.75);

    &:first-child {
      background: #5959cb;
      color: white;

      &:hover {
        background: #2020ff !important;
      }
    }

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      color: white;
      background-color: gray;
      cursor: pointer;
    }
  }
`;
