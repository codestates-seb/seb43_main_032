import React, { useMemo } from 'react';
import logo from '@/public/images/logoSymbolWhite.svg';
import Image from 'next/image';
import styled from 'styled-components';
import { FOOTER_DATA } from '@/constant/constant';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { isContactState } from '@/recoil/atom';

const Footer = () => {
  //메일봇 상태
  const [, setIsContact] = useRecoilState(isContactState);

  const onContact = (name: string, e: { preventDefault: () => void }) => {
    if (name === 'onContact') {
      e.preventDefault();
      setIsContact(true);
    }
  };

  //카테고리 이름들
  const categories = useMemo(() => Object.keys(FOOTER_DATA), []);

  return (
    <Box>
      <div>
        <Link href="/">
          <Image alt="logo" src={logo} />
        </Link>
      </div>
      <nav>
        {categories.map((category) => (
          <div key={category}>
            <div className="sub-btn">
              <span className="sub-btn-top">{category.toUpperCase()}</span>
            </div>
            <ul>
              {FOOTER_DATA[category].map((item) => (
                <li key={item.name}>
                  <a onClick={(e) => onContact(item.link, e)} href={item.link}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </Box>
  );
};

export default Footer;

const Box = styled.footer`
  padding: 0px calc((100% - 1280px) / 2);
  display: flex;
  padding-top: 20px;
  border-top: 1px solid #cacaca;
  background: linear-gradient(75deg, #8217f3 0%, #8217f3 30%, #4412e7 100%);
  color: white !important;
  margin-top: 50px;

  @media (max-width: 960px) {
    flex-direction: column;
  }

  .sub-btn {
    max-width: 140px;
    font-size: 12px;
  }
  .sub-btn-top {
    padding: 0;
  }

  > div {
    padding: var(--padding-1);
    @media (max-width: 960px) {
      padding: var(--padding-2);
    }
  }
  > nav {
    flex: 1;
    padding: var(--padding-1);
    display: flex;
    @media (max-width: 960px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 24px;
    }
    > div {
      width: calc(65% / 3);
      @media (max-width: 960px) {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-align: center;
      }
    }
    > div:first-child {
      width: 35%;
      @media (max-width: 960px) {
        width: 100%;
      }
    }
    ul {
      margin-top: 12px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  }
`;
