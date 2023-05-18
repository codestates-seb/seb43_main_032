import { COMMUNITY_CATEGORY } from '@/constant/constant';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

export default function SideBar() {
  const router = useRouter();

  return (
    <Container>
      <div className="top-category">CATEGORY</div>
      <ul>
        {COMMUNITY_CATEGORY.map((item) => (
          <li
            key={item.title}
            onClick={() => {
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
            <span className="nanum-regular title">{item.title}</span>
          </li>
        ))}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  margin-bottom: 20px;
  padding: 0 20px;
  background: #9b7aff;

  .top-category {
    width: 100%;
    height: 7%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-weight: 500;
    color: white;
  }

  .all {
    background: white;
    > svg {
      color: #09adea;
    }
  }
  .frontend {
    > svg {
      color: #2af599;
    }
  }
  .backend {
    > svg {
      color: #f98bfe;
    }
  }
  .uxui {
    > svg {
      color: #4512eb;
    }
  }
  .plan {
    > svg {
      color: #aac02f;
    }
  }
  .design {
    > svg {
      color: #a1f36b;
    }
  }
  .pm {
    > svg {
      color: #3acec1;
    }
  }
  .businessplan {
    > svg {
      color: #f1da8b;
    }
  }
  .marketing {
    > svg {
      color: #e48cb5;
    }
  }
  .android {
    > svg {
      color: #53f8a6;
    }
  }
  .ios {
    > svg {
      color: #c0c0c0;
    }
  }
  .etc {
    > svg {
      color: #ff0606;
    }
  }

  > ul {
    width: 100%;
    li {
      width: 100%;
      display: flex;
      justify-content: start;
      align-items: center;
      color: white;
      padding: 10px 20px;
      margin-bottom: 12px;
      transition: all 0.2s ease-in-out;
      @media (max-width: 960px) {
        justify-content: center;
      }

      > .icon {
        font-size: 18px;
        margin-right: 16px;
      }

      > .title {
        color: white;
        font-weight: 500;
        font-size: 14px;
      }

      &:hover {
        box-shadow: 1px 1px 5px #d9d9d9, -1px -1px 10px #e7e7e7;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 10px;
        cursor: pointer;
      }
    }
  }
`;
