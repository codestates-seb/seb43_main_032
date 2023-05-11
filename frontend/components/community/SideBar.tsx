import { useRouter } from 'next/router';
import React from 'react';
import {
  FaClipboardList,
  FaDatabase,
  FaDesktop,
  FaPaintBrush,
  FaQuestion,
} from 'react-icons/fa';
import styled from 'styled-components';

export default function SideBar() {
  const router = useRouter();

  const categoryTitle = [
    {
      title: '질문하기',
      link: '/community/create',
      color: '#8216F5',
      icon: <FaQuestion color="#8216F5" />,
    },
    {
      title: '전체보기',
      link: '/community',
      color: '#09ADEA',
      icon: <FaClipboardList />,
    },
    {
      title: '프론트엔드',
      link: '/community/frontend',
      color: '#2af599',
      icon: <FaDesktop />,
    },
    {
      title: '백엔드',
      link: '/community/backend',
      color: '#F98BFE',
      icon: <FaDatabase />,
    },
    {
      title: 'UX/UI',
      link: '/community/uxui',
      color: '#4512EB',
      icon: <FaPaintBrush className="icon" />,
    },
  ];

  const currentPath = router.pathname;
  const currentId = router.query.id;

  const currentColor = categoryTitle.find(
    (item) =>
      item.link === currentPath || item.link === `/community/${currentId}`
  )?.color;

  return (
    <Container>
      {categoryTitle.map((item, idx) => (
        <div
          style={{
            width: '70%',
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          key={idx}
          onClick={() => router.push(item.link)}
        >
          <span
            className="icon"
            style={{
              color:
                (currentPath === '/community' && item.link === '/community') ||
                (currentPath === '/community/[id]' &&
                  item.link === `/community/${currentId}`)
                  ? currentColor
                  : '#6e6e6e',
            }}
          >
            {item.icon}
          </span>
          <span className="nanum-regular title">{item.title}</span>
        </div>
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
  padding-top: 65px;

  > div {
    width: 70%;
    background-color: white;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    margin-bottom: 24px;
    border-radius: 8px;
    transition: all 0.2s ease-in-out;

    > .icon {
      font-size: 18px;
      margin-right: 16px;
    }

    > .title {
      color: black;
      font-weight: 500;
      font-size: 14px;
    }

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      color: white;
      box-shadow: 1px 1px 5px #d9d9d9, -1px -1px 10px #e7e7e7;
      cursor: pointer;
    }
  }
`;
