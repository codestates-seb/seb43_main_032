import { COMMUNITY_CATEGORY } from '@/constant/constant';
import { getCookie } from '@/util/cookie';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

export default function SideBar() {
  const router = useRouter();

  return (
    <Container>
      <ul>
        {COMMUNITY_CATEGORY.map((item) => (
          <li
            key={item.title}
            onClick={() => {
              if (!getCookie('accessToken') && item.title === '질문하기') {
                return alert('먼저 로그인을 해주세요.');
              }
              router.push(`/community/${item.link}`);
            }}
            className={
              router.asPath === `/community${item.link}`
                ? router.asPath === '/community'
                  ? 'icon all'
                  : `icon ${router.query.category}`
                : 'icon'
            }
          >
            <span
              className={
                router.asPath === `/community${item.link}`
                  ? router.asPath === '/community'
                    ? 'icon all'
                    : `icon ${router.query.category}`
                  : 'icon'
              }
            >
              {item.icon}
            </span>
            <span
              className={`nanum-regular title ${
                router.asPath === `/community${item.link}`
                  ? router.asPath === '/community'
                    ? 'icon allTitle'
                    : `icon ${router.query.category}Title`
                  : 'icon'
              }`}
            >
              {item.title}
            </span>
          </li>
        ))}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  border-radius: 15px;
  padding: 0 60px;
  margin-bottom: 50px;

  .all {
    background: white;
    border-radius: 10px;
    span {
      background: none;
    }

    .allTitle {
      color: #4512eb;
      font-weight: 700;
    }

    > svg {
      color: #09adea;
    }
  }
  .frontend {
    background: white;
    span {
      background: none;
    }

    .frontendTitle {
      color: #4512eb;
      font-weight: 700;
    }
    > svg {
      color: #2af599;
    }
  }
  .backend {
    background: white;
    span {
      background: none;
    }

    .backendTitle {
      color: #4512eb;
      font-weight: 700;
    }
    > svg {
      color: #f98bfe;
    }
  }
  .uxui {
    background: white;
    span {
      background: none;
    }

    .uxuiTitle {
      color: #4512eb;
      font-weight: 700;
    }
    > svg {
      color: #4512eb;
    }
  }
  .plan {
    background: white;
    span {
      background: none;
    }

    .planTitle {
      color: #4512eb;
      font-weight: 700;
    }
    > svg {
      color: #aac02f;
    }
  }
  .design {
    background: white;
    span {
      background: none;
    }

    .designTitle {
      color: #4512eb;
      font-weight: 700;
    }
    > svg {
      color: #a1f36b;
    }
  }
  .pm {
    background: white;
    span {
      background: none;
    }

    .pmTitle {
      color: #4512eb;
      font-weight: 700;
    }
    > svg {
      color: #3acec1;
    }
  }
  .businessplan {
    background: white;
    span {
      background: none;
    }

    .businessplanTitle {
      color: #4512eb;
      font-weight: 700;
    }
    > svg {
      color: #f1da8b;
    }
  }
  .marketing {
    background: white;
    span {
      background: none;
    }

    .marketingTitle {
      color: #4512eb;
      font-weight: 700;
    }
    > svg {
      color: #e48cb5;
    }
  }
  .android {
    background: white;
    span {
      background: none;
    }

    .androidTitle {
      color: #4512eb;
      font-weight: 700;
    }
    > svg {
      color: #53f8a6;
    }
  }
  .ios {
    background: white;
    span {
      background: none;
    }

    .iosTitle {
      color: #4512eb;
      font-weight: 700;
    }
    > svg {
      color: #c0c0c0;
    }
  }
  .etc {
    background: white;
    span {
      background: none;
    }

    .etcTitle {
      color: #4512eb;
      font-weight: 700;
    }
    > svg {
      color: #ff0606;
    }
  }

  > ul {
    width: 100%;
    display: flex;
    gap: 20px;

    li {
      display: flex;
      min-width: 75px;
      min-height: 75px;
      background-color: #c0c0c0;
      border-radius: 50%;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      gap: 10px;
      transition: all 0.2s ease-in-out;

      @media (max-width: 960px) {
        justify-content: center;
      }

      > .icon {
        font-size: 18px;
      }

      > .title {
        color: white;
        font-weight: 500;
        font-size: 14px;
      }

      &:hover {
        box-shadow: 1px 1px 3px #d9d9d9, -1px -1px 10px #e7e7e7;
        background: #4512eb;
        cursor: pointer;

        span.title {
          font-weight: 600;
        }
      }
    }
  }
`;
